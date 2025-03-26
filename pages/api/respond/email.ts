import type { NextApiRequest, NextApiResponse } from "next"
import { verifyToken } from "@/lib/auth"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import generateWithTunedModel from "../components/generateWithTunedModel"

export default async function emailResponse(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const token = await verifyToken(req)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const { emailContent, emailSubject, emailFrom } = req.body

  try {
    const client = await clientPromise
    const db = client.db()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Update or create usage record
    await db.collection("usage").updateOne(
      {
        userId: new ObjectId(token._id),
        date: today,
      },
      {
        $inc: { responseCount: 1 },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    )

    // Get current usage count
    const usage = await db.collection("usage").findOne({
      userId: new ObjectId(token._id),
      date: today,
    })

    // Check if user has exceeded free tier limit
    const dailyLimit = 50 // Adjust based on user's plan
    if (usage && usage.responseCount > dailyLimit) {
      return res.status(429).json({
        message: "Daily response generation limit exceeded",
        limit: dailyLimit,
        count: usage.responseCount,
      })
    }

    // Fetch the tuned model from the database or use a default one
    let tunedModelRecord = await db.collection("tuned_models").findOne({
      userId: new ObjectId(token._id),
      type: "respond",
    })

    if (!tunedModelRecord) {
      // If no user-specific model exists, use a general one
      tunedModelRecord = await db.collection("tuned_models").findOne({
        type: "respond",
      })
    }

    // If no response model exists yet, use the summarization model
    if (!tunedModelRecord) {
      tunedModelRecord = await db.collection("tuned_models").findOne({
        type: "summarize",
      })
    }

    if (!tunedModelRecord) {
      return res.status(404).json({ message: "No suitable model found for response generation" })
    }

    const tunedModel = tunedModelRecord.tunedModel

    // Generate email response using the tuned model
    const prompt = `Generate a professional email response to the following email:
Subject: ${emailSubject}
From: ${emailFrom}
Content: ${emailContent}

Write a concise, professional response that addresses the key points in the email.`

    const response = await generateWithTunedModel(tunedModel, prompt)

    res.status(200).json({
      response,
      usage: {
        daily: usage?.responseCount || 1,
        limit: dailyLimit,
      },
    })
  } catch (error) {
    console.error("Error generating email response:", error)
    res.status(500).json({ message: "Error generating email response" })
  }
}



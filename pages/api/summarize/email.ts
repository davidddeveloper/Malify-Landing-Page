import type { NextApiRequest, NextApiResponse } from "next"
import { verifyToken } from "@/lib/auth"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import generateWithTunedModel from "../components/generateWithTunedModel"
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export default async function email(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const token = await verifyToken(req)
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const { emailContent } = req.body

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
        $inc: { summarizeCount: 1 },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    )

    // Get current usage count
    const usage = await db.collection("usage").findOne({
      userId: new ObjectId(token._id),
      date: today,
    })

    // Check if user has exceeded free tier limit (e.g., 10 summaries per day)
    const dailyLimit = 200 // You can adjust this or make it dynamic based on user's plan
    if (usage && usage.summarizeCount > dailyLimit) {
      return res.status(429).json({
        message: "Daily limit exceeded",
        limit: dailyLimit,
        count: usage.summarizeCount,
      })
    }

    console.log('summarizing in progress.....')
    // Generate email summary
    //const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    //const result = await model.generateContent(`Summarize this email: ${emailContent}`)
    //const summary = result.response.text()

    // Fetch the tuned model from the database
    let tunedModelRecord = await db.collection("tuned_models").findOne({
      userId: new ObjectId(token._id),
    });

    if (!tunedModelRecord) {
      tunedModelRecord = await db.collection("tuned_models").findOne({});
    }

    if (!tunedModelRecord) {
      return res.status(404).json({ message: "Tuned model not found" });
    }

    const tunedModel = tunedModelRecord.tunedModel;

    // Generate email summary using the tuned model
    const summary = await generateWithTunedModel(tunedModel, `${emailContent}`);

    res.status(200).json({
      summary,
      usage: {
        daily: usage?.summarizeCount || 1,
        limit: dailyLimit,
      },
    })
  } catch (error) {
    console.error("Error summarizing email:", error)
    res.status(500).json({ message: "Error summarizing email" })
  }
}


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

    // Generate email classification
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    //const result = await model.generateContent(`Summarize this email: ${emailContent}`)
    //const summary = result.response.text()

    // Fetch the tuned model from the database
    let tunedModelRecord = await db.collection("tuned_models").findOne({
      userId: new ObjectId(token._id),
      type: 'classify'
    });

    if (!tunedModelRecord) {
      tunedModelRecord = await db.collection("tuned_models").findOne({type: 'classify'});
    }

    if (!tunedModelRecord) {
      return res.status(404).json({ message: "Tuned model not found" });
    }

    const tunedModel = tunedModelRecord.tunedModel;

    // classifying email using the tuned model
    const classification = await generateWithTunedModel(tunedModel, `${emailContent}`);

    res.status(200).json({
      classification
    })
  } catch (error) {
    console.error("Error classifying email:", error)
    res.status(500).json({ message: "Error classifying email" })
  }
}


import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import model from "../pages/api/components/tuneModel"

// This script can be run to create a tuned model specifically for email responses
// It can be executed via a one-time admin API endpoint or directly in a development environment

async function tuneModelForResponses(userId?: string) {
  try {
    const modelInfo = {
      modelName: "email-response-model",
      type: "respond",
    }

    // Create the tuned model
    const tunedModel = await model(modelInfo)

    if (!tunedModel) {
      console.error("Failed to create tuned model for responses")
      return false
    }

    // Store the model in the database
    const client = await clientPromise
    const db = client.db()

    // If userId is provided, associate the model with that user
    // Otherwise, create it as a general model
    const modelRecord = {
      tunedModel,
      createdAt: new Date(),
      type: "respond",
    }

    if (userId) {
      Object.assign(modelRecord, { userId: new ObjectId(userId) })
    }

    await db.collection("tuned_models").insertOne(modelRecord)

    console.log("Successfully created and stored response model:", tunedModel)
    return tunedModel
  } catch (error) {
    console.error("Error creating response model:", error)
    return false
  }
}

export default tuneModelForResponses



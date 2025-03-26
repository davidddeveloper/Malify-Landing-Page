import type { NextApiRequest, NextApiResponse } from "next"
import { verifyToken } from "@/lib/auth"
import tuneModelForResponses from "@/data/tuneModelForResponses"

// This is an admin-only endpoint to create the response model
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const token = await verifyToken(req)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // In a production environment, you would add additional checks here
  // to ensure only admins can access this endpoint

  try {
    const result = await tuneModelForResponses()

    if (!result) {
      return res.status(500).json({ message: "Failed to create response model" })
    }

    res.status(200).json({
      message: "Response model created successfully",
      modelId: result,
    })
  } catch (error) {
    console.error("Error creating response model:", error)
    res.status(500).json({ message: "Error creating response model" })
  }
}



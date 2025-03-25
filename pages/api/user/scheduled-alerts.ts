import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getToken } from "next-auth/jwt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req })
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const client = await clientPromise
  const db = client.db()

  const { date, description } = await req.body;

    

  if (req.method === "POST") {
    const { date, description } = req.body

    try {
      // Check for existing alert (case-insensitive and same date)
      const existingAlert = await db.collection("scheduledAlerts").findOne({
        userId: new ObjectId(token.sub),
        description: { $regex: new RegExp(`^${description}$`, "i") },
        date: {
        $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
        },
      })

      if (existingAlert) {
        return res.status(409).json({ error: "An alert with this description and date already exists" });
      }
      const alert = {
        id: new ObjectId().toString(),
        userId: new ObjectId(token.sub),
        date: new Date(date),
        description,
        isActive: true,
        createdAt: new Date(),
      };

      await db.collection("scheduledAlerts").insertOne(alert)

      res.status(200).json(alert)
    } catch (error) {
      console.error("Error creating scheduled alert:", error)
      res.status(500).json({ message: "Error creating scheduled alert" })
    }
  } else if (req.method === "DELETE") {
    const { alertId } = req.query

    try {
      await db.collection("scheduledAlerts").deleteOne({
        id: alertId,
        userId: new ObjectId(token.sub),
      })

      res.status(200).json({ message: "Alert deleted successfully" })
    } catch (error) {
      console.error("Error deleting scheduled alert:", error)
      res.status(500).json({ message: "Error deleting scheduled alert" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
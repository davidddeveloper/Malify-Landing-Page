import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getToken } from "next-auth/jwt"

//interface ImportantEmailRule {
//  id: string
//  type: "sender" | "subject" | "content"
//  value: string
//  priority: "high" | "medium" | "low"
//}

//interface ScheduledAlert {
//  id: string
//  date: Date
//  description: string
//  isActive: boolean
//}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req })
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const client = await clientPromise
  const db = client.db()

  if (req.method === "GET") {
    try {
      const preferences = await db.collection("preferences").findOne({
        userId: new ObjectId(token.sub),
      })
      const importantRules = await db.collection("importantRules").find({
        userId: new ObjectId(token.sub),
      }).toArray()
      const scheduledAlerts = await db.collection("scheduledAlerts").find({
        userId: new ObjectId(token.sub),
      }).toArray()
      console.log('this is the user preferences', preferences, importantRules, scheduledAlerts)
      if (preferences != null) {
        preferences['importantEmailRules'] = importantRules
        preferences['scheduledAlerts'] = scheduledAlerts
      }
      res.status(200).json(
        preferences || {
          importantEmailRules: [],
          scheduledAlerts: [],
          theme: "light",
          emailFrequency: "daily",
          notificationPreferences: { email: true, push: true },
        },
      )
    } catch (error) {
      console.error("Error fetching preferences:", error)
      res.status(500).json({ message: "Error fetching preferences" })
    }
  } else if (req.method === "POST") {
    const { theme, emailFrequency, notificationPreferences, importantEmailRules, scheduledAlerts } = req.body

    try {
      //const result = 
      await db.collection("preferences").updateOne(
        { userId: new ObjectId(token.sub) },
        {
          $set: {
            theme,
            emailFrequency,
            notificationPreferences,
            importantEmailRules,
            scheduledAlerts,
            updatedAt: new Date(),
          },
        },
        { upsert: true },
      )

      const updatedPreferences = await db.collection("preferences").findOne({
        userId: new ObjectId(token.sub),
      })

      res.status(200).json(updatedPreferences)
    } catch (error) {
      console.error("Error updating preferences:", error)
      res.status(500).json({ message: "Error updating preferences" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}


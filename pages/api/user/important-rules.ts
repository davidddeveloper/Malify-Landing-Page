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

  //const { type, value, priority } = await req.body;

  if (req.method === "POST") {
    const { type, value, priority } = req.body

    try {
      // Check for existing rule (case-insensitive)
      const existingRule = await db.collection("importantRules").findOne({
        userId: new ObjectId(token.sub),
        type,
        value: { $regex: new RegExp(`^${value}$`, "i") },
      })

      if (existingRule) {
        return res.status(409).json({ error: `A rule for this ${type} already exists` });
      }

      const rule = {
        id: new ObjectId().toString(),
        userId: new ObjectId(token.sub),
        type,
        value,
        priority,
        createdAt: new Date(),
      }

      await db.collection("importantRules").insertOne(rule)

      res.status(200).json(rule)
    } catch (error) {
      console.error("Error creating importance rule:", error)
      res.status(500).json({ message: "Error creating importance rule" })
    }
  } else if (req.method === "DELETE") {
    const { ruleId } = req.query

    try {
      await db.collection("importantRules").deleteOne({
        id: ruleId,
        userId: new ObjectId(token.sub),
      })

      res.status(200).json({ message: "Rule deleted successfully" })
    } catch (error) {
      console.error("Error deleting importance rule:", error)
      res.status(500).json({ message: "Error deleting importance rule" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}


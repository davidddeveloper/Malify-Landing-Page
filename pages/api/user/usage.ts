import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { getToken } from "next-auth/jwt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const token = await getToken({ req })
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const client = await clientPromise
    const db = client.db()

    // Get today's usage
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayUsage = await db.collection("usage").findOne({
      userId: new ObjectId(token.sub),
      date: today,
    })

    // Get this month's total usage
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const monthlyUsage = await db
      .collection("usage")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(token.sub),
            date: { $gte: startOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$summarizeCount" },
          },
        },
      ])
      .toArray()

    // Get all-time usage
    const allTimeUsage = await db
      .collection("usage")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(token.sub),
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$summarizeCount" },
          },
        },
      ])
      .toArray()

    res.status(200).json({
      daily: {
        count: todayUsage?.summarizeCount || 0,
        limit: 10, // You can make this dynamic based on user's plan
      },
      monthly: {
        count: monthlyUsage[0]?.total || 0,
        limit: 300, // You can make this dynamic based on user's plan
      },
      allTime: allTimeUsage[0]?.total || 0,
    })
  } catch (error) {
    console.error("Error fetching usage:", error)
    res.status(500).json({ message: "Error fetching usage statistics" })
  }
}
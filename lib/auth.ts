import type { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function verifyToken(req: NextApiRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      return null
    }

    const client = await clientPromise
    const db = client.db()

    const user = await db.collection("users").findOne({
      _id: new ObjectId(token.sub),
    })

    return {
      ...user,
      accessToken: token.accessToken as string,
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}
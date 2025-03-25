/* eslint-disable */
import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI // Ensure this matches the callback URL in NextAuth.js
);

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, confirmPassword, firstName, lastName } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      name: `${firstName} ${lastName}`,
      hashedPassword,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);
    console.log("User registered successfully:", newUser);

    // Start the OAuth2 flow for Gmail
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/gmail.modify"],
      prompt: "consent",
      redirect_uri: process.env.GOOGLE_REDIRECT_URI, // Ensure this matches your NextAuth callback URL
    });

    console.log('this is the authUrl', authUrl);
    return res.status(200).json({ authUrl });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

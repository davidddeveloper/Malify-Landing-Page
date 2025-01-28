import bcrypt from 'bcrypt';
import User from '@/models/User';
import clientPromise from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      console.log(db.databaseName)

      const existingUser = await db.collection('users').findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        name: `${firstName} ${lastName}`,
        hashedPassword,
        createdAt: new Date()
      };
      
      console.log("Saving new user:", newUser);

      await db.collection('users').insertOne(newUser);
      console.log("User registered successfully:", newUser);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
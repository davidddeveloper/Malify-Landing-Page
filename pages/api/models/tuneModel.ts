import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { verifyToken } from "@/lib/auth"
import model from "../components/tuneModel"
import generateWithTunedModel from "../components/generateWithTunedModel"

const tuneModel = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const client = await clientPromise;
            const db = client.db();

            const result = await db.collection("tuned_models").find({}).toArray();
            res.status(200).json({ tuned_models: result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal error" });
        }
        return;
    }
    
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
      }
    
      const token = await verifyToken(req)
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
      }
    const { body } = req;
    
    const modelName = body.name;
    const type = body.type;

    if (!modelName) return res.status(401).send({"error": "Unauthorized"})
    console.log("We are here!", body, modelName)

    //optionally accept trained data in the form [{"input_text": "text", "output_text": "text"}]
    //const trainingData = req.data;
    
    const tunedModel = await model({modelName, type});
    //const expiration = 60 * 60 * 700; // 29d

    //redisClient.client.set(tunnedModel, user._id.toString(), 'EX', expiration)
    try {
        const client = await clientPromise;
        const db = client.db();

        if (type === 'classify') {
            await db.collection("tuned_models").insertOne({
                userId: new ObjectId(token._id),
                tunedModel,
                createdAt: new Date(),
                type: 'classify'
            });
        } else {
            await db.collection("tuned_models").insertOne({
                userId: new ObjectId(token._id),
                tunedModel,
                createdAt: new Date(),
                type: 'summarize'
            });
        }


        res.status(200).json({ "tuned_model": tunedModel });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Internal error' });
    }
}

export default tuneModel;
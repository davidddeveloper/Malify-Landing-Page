import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
//import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
//import authOptions from "./auth/[...nextauth]"; // Path to NextAuth options
import extractBody from "./components/extractBody"
import { getToken } from "next-auth/jwt"

//interface Email {
//    id: string;
//    snippet: string;
//    subject: string;
//    from: string;
//    date: string;
//    body: string;
//}

interface MessagePayload {
    headers: { name: string; value: string }[];
    parts: MessagePart[];
    mimeType: string;
    body: {
        data: string;
    };
}
interface MessagePart {
    mimeType: string;
    body: {
        data: string;
    };
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end(); // Method Not Allowed
    }

    const token = await getToken({ req })
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const accessToken = token.accessToken as string
    if (!accessToken) {
        return res.status(401).json({ message: "Gmail access token not found" })
    }

    try {
        // Get the current user's session
        const session = await getSession({ req });
        console.log('this is the session', session)
        if (!session || !session.user.accessToken) {
            //console.log('this is the session', session.user.accessToken)
            return res.status(401).json({ message: "Not authenticated" });
        }

        // Authenticate with Google using the session's access token
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: session.user.accessToken });

        const gmail = google.gmail({ version: "v1", auth: oauth2Client });

        // Fetch the latest 5 emails
        const response = await gmail.users.messages.list({
            userId: "me",
            maxResults: 10,
        });

        console.log('this is the response', response)

        const messages = response.data.messages || [];

        console.log('this is the messages', messages)

        // Fetch email details
        const emails = await Promise.all(
            messages.map(async (msg) => {
                const email = await gmail.users.messages.get({
                    userId: "me",
                    id: msg.id!,
                    format: "full"
                });

                //return {
                //    id: email.data.id!,
                //    snippet: email.data.snippet!,
                //};

                const payload = email.data.payload as MessagePayload;
                const body = extractBody(payload);
                
                // Subject
                const subjectHeader = payload.headers.find(header => header.name === 'Subject');
                const subject = subjectHeader ? subjectHeader.value : 'No Subject';

                // From
                const fromHeader = payload.headers.find(header => header.name === 'From');
                const from = fromHeader ? fromHeader.value : 'No From';

                // Date 
                const DateHeader = payload.headers.find(header => header.name === 'Date');
                const date = DateHeader ? DateHeader.value : 'No Date'

                
                return {
                    id: email.data.id!,
                    snippet: email.data.snippet!,
                    subject,
                    from,
                    date,
                    body,
                }
            })
        );

        res.status(200).json(emails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching emails" });
    }
}

import type { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"
import { getToken } from "next-auth/jwt"

export default async function sendResponse(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const token = await getToken({ req })
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const accessToken = token.accessToken as string
  if (!accessToken) {
    return res.status(401).json({ message: "Gmail access token not found" })
  }

  const { messageId, responseText, subject } = req.body

  if (!messageId || !responseText) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  try {
    // Authenticate with Google using the session's access token
    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({ access_token: accessToken })

    const gmail = google.gmail({ version: "v1", auth: oauth2Client })

    // Get the original message to extract the recipient
    const originalMessage = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "metadata",
      metadataHeaders: ["From", "Subject", "Message-ID", "References", "In-Reply-To"],
    })

    const headers = originalMessage.data.payload?.headers || []
    const fromHeader = headers.find((h) => h.name === "From")
    const subjectHeader = headers.find((h) => h.name === "Subject")
    const messageIdHeader = headers.find((h) => h.name === "Message-ID")

    // Extract email address from the From header
    const fromEmail = fromHeader?.value || ""
    const emailRegex = /<([^>]+)>|([^\s<]+@[^\s>]+)/
    const match = fromEmail.match(emailRegex)
    const toEmail = match ? match[1] || match[2] : fromEmail

    // Create reply subject
    const replySubject =
      subject || (subjectHeader?.value?.startsWith("Re:") ? subjectHeader.value : `Re: ${subjectHeader?.value || ""}`)

    // Create email content
    const emailContent = [
      `To: ${toEmail}`,
      `Subject: ${replySubject}`,
      "Content-Type: text/plain; charset=utf-8",
      "MIME-Version: 1.0",
    ]

    // Add threading headers if available
    if (messageIdHeader?.value) {
      emailContent.push(`In-Reply-To: ${messageIdHeader.value}`)
      emailContent.push(`References: ${messageIdHeader.value}`)
    }

    // Add blank line between headers and body
    emailContent.push("", responseText)

    // Encode the email in base64
    const encodedEmail = Buffer.from(emailContent.join("\r\n"))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")

    // Send the email
    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
        threadId: originalMessage.data.threadId,
      },
    })

    res.status(200).json({
      message: "Response sent successfully",
      messageId: response.data.id,
    })
  } catch (error) {
    console.error("Error sending email response:", error)
    res.status(500).json({ message: "Error sending email response" })
  }
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, Edit, Copy } from "lucide-react"
import { toast } from "sonner"

interface EmailResponseGeneratorProps {
  emailId: string
  emailSubject: string
  emailFrom: string
  emailContent: string
  onClose: () => void
}

export default function EmailResponseGenerator({
  emailId,
  emailSubject,
  emailFrom,
  emailContent,
  onClose,
}: EmailResponseGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [editedResponse, setEditedResponse] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const generateResponse = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/respond/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent,
          emailSubject,
          emailFrom,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to generate response")
      }

      const data = await response.json()
      setGeneratedResponse(data.response)
      setEditedResponse(data.response)
    } catch (error) {
      console.error("Error generating response:", error)
      toast.error("Failed to generate response. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const sendResponse = async () => {
    setIsSending(true)
    try {
      const response = await fetch("/api/respond/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: emailId,
          responseText: isEditing ? editedResponse : generatedResponse,
          subject: `Re: ${emailSubject}`,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to send response")
      }

      toast.success("Response sent successfully!")
      onClose()
    } catch (error) {
      console.error("Error sending response:", error)
      toast.error("Failed to send response. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(isEditing ? editedResponse : generatedResponse)
    toast.success("Response copied to clipboard!")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>AI-Generated Email Response</CardTitle>
        <CardDescription>
          Generate a professional response to this email. You can edit it before sending.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-md">
          <p className="font-semibold">From: {emailFrom}</p>
          <p className="font-semibold">Subject: {emailSubject}</p>
          <div className="mt-2 text-sm max-h-40 overflow-y-auto">
            {emailContent.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {!generatedResponse && !isGenerating && (
          <Button onClick={generateResponse} className="w-full">
            Generate Response
          </Button>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Generating professional response...</p>
          </div>
        )}

        {generatedResponse && (
          <>
            {isEditing ? (
              <Textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                className="min-h-[200px]"
                placeholder="Edit your response here..."
              />
            ) : (
              <div className="bg-card border rounded-md p-4 min-h-[200px] whitespace-pre-wrap">{generatedResponse}</div>
            )}
          </>
        )}
      </CardContent>
      {generatedResponse && (
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Preview" : "Edit"}
            </Button>
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={sendResponse} disabled={isSending}>
              {isSending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              Send Response
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}



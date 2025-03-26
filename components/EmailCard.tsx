"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Reply, Archive } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import EmailResponseGenerator from "./EmailResponseGenerator"

interface EmailCardProps {
  id: string
  from: string
  subject: string
  date: string
  snippet: string
  body: string
  importance: "high" | "medium" | "low"
}

export default function EmailCard({ id, from, subject, date, snippet, body, importance }: EmailCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [responseDialogOpen, setResponseDialogOpen] = useState(false)

  // Extract sender name from email format "Name <email@example.com>"
  const senderName = from.match(/^([^<]+)/)?.[1]?.trim() || from

  // Get initials for avatar
  const initials = senderName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  // Format date
  const formattedDate = new Date(date).toLocaleString()

  // Importance badge color
  const importanceColor = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  }

  return (
    <>
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(senderName)}&background=random`}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{senderName}</CardTitle>
                <CardDescription className="text-xs">{from}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${importanceColor[importance]} text-white`}>
                {importance.charAt(0).toUpperCase() + importance.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            </div>
          </div>
          <h3 className="font-semibold mt-2">{subject}</h3>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            {expanded ? (
              <div className="whitespace-pre-wrap">{body}</div>
            ) : (
              <div className="line-clamp-2">{snippet}</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded? "Show Less": "Read More"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" title="Mark as important">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Reply" onClick={() => setResponseDialogOpen(true)}>
              <Reply className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" title="Archive">
              <Archive className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="max-w-4xl">
          <EmailResponseGenerator
            emailId={id}
            emailSubject={subject}
            emailFrom={from}
            emailContent={body}
            onClose={() => setResponseDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}



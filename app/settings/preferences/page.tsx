"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface ImportantEmailRule {
  id: string
  type: "sender" | "subject" | "content"
  value: string
  priority: "high" | "medium" | "low"
}

interface ScheduledAlert {
  id: string
  date: Date
  description: string
  isActive: boolean
}

interface Preferences {
  theme: "light" | "dark" | "system"
  emailFrequency: "realtime" | "hourly" | "daily" | "weekly"
  notificationPreferences: {
    email: boolean
    push: boolean
    desktop: boolean
  }
}

export default function PreferencesPage() {
  //const { data: session, status } = useSession()
  const router = useRouter()

  const [importantRules, setImportantRules] = useState<ImportantEmailRule[]>([])
  const [scheduledAlerts, setScheduledAlerts] = useState<ScheduledAlert[]>([])
  const [preferences, setPreferences] = useState<Preferences>({
    theme: "system",
    emailFrequency: "daily",
    notificationPreferences: {
      email: true,
      push: true,
      desktop: true,
    },
  })
  const [loading, setLoading] = useState(true)

  // New rule form state
  const [newRule, setNewRule] = useState<Omit<ImportantEmailRule, "id">>({
    type: "sender",
    value: "",
    priority: "medium",
  })

  // New alert form state
  const [newAlert, setNewAlert] = useState<Omit<ScheduledAlert, "id" | "isActive">>({
    date: new Date(),
    description: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchPreferences()
    }
  }, [status, router])

  const fetchPreferences = async () => {
    try {
      const response = await fetch("/api/user/preferences")
      const data = await response.json()
      setImportantRules(data.importantEmailRules || [])
      setScheduledAlerts(data.scheduledAlerts || [])
      setPreferences({
        theme: data.theme || "system",
        emailFrequency: data.emailFrequency || "daily",
        notificationPreferences: data.notificationPreferences || {
          email: true,
          push: true,
          desktop: true,
        },
      })
      setLoading(false)
    } catch (error) {
      console.error("Error fetching preferences:", error)
      toast.error("Failed to load preferences")
    }
  }

  const updatePreferences = async (updates: Partial<Preferences>) => {
    try {
      const updatedPreferences = { ...preferences, ...updates }
      const response = await fetch("/api/user/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPreferences),
      })


      if (!response.ok) throw new Error("Failed to update preferences")
    

      setPreferences(updatedPreferences)
      toast.success("Preferences updated successfully")
    } catch (error) {
      console.error("Error updating preferences:", error)
      toast.error("Failed to update preferences")
    }
  }

  const addImportantRule = async () => {
    if (!newRule.value.trim()) {
      toast.error("Please enter a value for the rule")
      return
    }

    // Check for duplicates (case-insensitive)
    const isDuplicate = importantRules.some(
      (rule) => rule.type === newRule.type && rule.value.toLowerCase() === newRule.value.toLowerCase(),
    )

    if (isDuplicate) {
      toast.error(`A rule for this ${newRule.type} already exists`)
      return
    }

    try {
      const response = await fetch("/api/user/important-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRule),
      })

      if (!response.ok) {
        if (response.status === 409) {
            toast.error('Rule already exist')
        }
        throw new Error("Failed to add rule")
    }

      const rule = await response.json()
      setImportantRules([...importantRules, rule])
      setNewRule({ type: "sender", value: "", priority: "medium" })
      toast.success("Rule added successfully")
    } catch (error) {
      console.error("Error adding rule:", error)
      toast.error("Failed to add rule")
    }
  }

  const deleteRule = async (ruleId: string) => {
    try {
      const response = await fetch(`/api/user/important-rules?ruleId=${ruleId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete rule")

      setImportantRules(importantRules.filter((rule) => rule.id !== ruleId))
      toast.success("Rule deleted successfully") // Updated toast
    } catch (error) {
      console.error("Error deleting rule:", error)
      toast.error("Failed to delete rule") // Updated toast
    }
  }

  const addScheduledAlert = async () => {
    if (!newAlert.description.trim()) {
      toast.error("Please enter a description for the alert")
      return
    }

    // Check for duplicates (case-insensitive)
    const isDuplicate = scheduledAlerts.some(
      (alert) =>
        alert.description.toLowerCase() === newAlert.description.toLowerCase() &&
        format(new Date(alert.date), "yyyy-MM-dd") === format(newAlert.date, "yyyy-MM-dd"),
    )

    if (isDuplicate) {
      toast.error("An alert with this description and date already exists")
      return
    }

    try {
      const response = await fetch("/api/user/scheduled-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAlert),
      })

      if (!response.ok) {
        if (response.status === 409) {
            toast.error('Rule already exist')
        }
        throw new Error("Failed to add alert")
      }

      const alert = await response.json()
      setScheduledAlerts([...scheduledAlerts, alert])
      setNewAlert({ date: new Date(), description: "" })
      toast.success("Alert scheduled successfully")
    } catch (error) {
      console.error("Error adding alert:", error)
      toast.error("Failed to schedule alert")
    }
  }

  const deleteAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/user/scheduled-alerts?alertId=${alertId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete alert")

      setScheduledAlerts(scheduledAlerts.filter((alert) => alert.id !== alertId))
      toast.success("Alert deleted successfully") // Updated toast
    } catch (error) {
      console.error("Error deleting alert:", error)
      toast.error("Failed to delete alert") // Updated toast
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Email Preferences</h1>

      {/* General Preferences Section */}
      <Card>
        <CardHeader>
          <CardTitle>General Preferences</CardTitle>
          <CardDescription>Customize your email and notification settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value: "light" | "dark" | "system") => updatePreferences({ theme: value })}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Label>Email Digest Frequency</Label>
              <Select
                value={preferences.emailFrequency}
                onValueChange={(value: "realtime" | "hourly" | "daily" | "weekly") =>
                  updatePreferences({ emailFrequency: value })
                }
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                How often you want to receive email digests of your important messages
              </p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <Label>Notification Settings</Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={preferences.notificationPreferences.email}
                    onCheckedChange={(checked) =>
                      updatePreferences({
                        notificationPreferences: {
                          ...preferences.notificationPreferences,
                          email: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Switch
                    checked={preferences.notificationPreferences.push}
                    onCheckedChange={(checked) =>
                      updatePreferences({
                        notificationPreferences: {
                          ...preferences.notificationPreferences,
                          push: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Desktop Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications on your desktop</p>
                  </div>
                  <Switch
                    checked={preferences.notificationPreferences.desktop}
                    onCheckedChange={(checked) =>
                      updatePreferences({
                        notificationPreferences: {
                          ...preferences.notificationPreferences,
                          desktop: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Email Rules Section */}
      <Card>
        <CardHeader>
          <CardTitle>Important Email Rules</CardTitle>
          <CardDescription>Define rules to identify important emails automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label>Rule Type</Label>
              <Select
                value={newRule.type}
                onValueChange={(value: "sender" | "subject" | "content") => setNewRule({ ...newRule, type: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sender">Sender</SelectItem>
                  <SelectItem value="subject">Subject</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                placeholder={`Enter ${newRule.type}`}
                value={newRule.value}
                onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                className="w-[250px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={newRule.priority}
                onValueChange={(value: "high" | "medium" | "low") => setNewRule({ ...newRule, priority: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addImportantRule}>
              <Plus className="mr-2 h-4 w-4" /> Add Rule
            </Button>
          </div>

          <div className="space-y-4">
            {importantRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">
                    {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}: {rule.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Priority: {rule.priority.charAt(0).toUpperCase() + rule.priority.slice(1)}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteRule(rule.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Alerts</CardTitle>
          <CardDescription>Set up alerts for expected important emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !newAlert.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newAlert.date ? format(newAlert.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newAlert.date}
                    onSelect={(date) => date && setNewAlert({ ...newAlert, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="Enter description"
                value={newAlert.description}
                onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                className="w-[350px]"
              />
            </div>

            <Button onClick={addScheduledAlert}>
              <Plus className="mr-2 h-4 w-4" /> Add Alert
            </Button>
          </div>

          <div className="space-y-4">
            {scheduledAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{alert.description}</p>
                  <p className="text-sm text-muted-foreground">Date: {format(new Date(alert.date), "PPP")}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteAlert(alert.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


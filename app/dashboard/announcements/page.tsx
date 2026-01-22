"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Announcement = {
  id: string
  title: string
  body: string
  audience: string
  date: string
}

export default function AnnouncementsPage() {
  const [list, setList] = useState<Announcement[]>([
    {
      id: "1",
      title: "PTM on Friday",
      body: "Parent-Teacher meeting at 2PM.",
      audience: "Parents",
      date: "2025-10-20",
    },
    {
      id: "2",
      title: "Science Fair",
      body: "Project submissions by next week.",
      audience: "Students",
      date: "2025-10-25",
    },
  ])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Post Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Short headline" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="audience">Audience</Label>
            <Input id="audience" placeholder="Students / Teachers / Parents" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="body">Message</Label>
            <Textarea id="body" placeholder="Announcement details..." />
          </div>
          <Button>Publish</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-3">
            {list.map((a) => (
              <li key={a.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{a.title}</h3>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{a.body}</p>
                <div className="mt-2 text-xs">
                  Audience: <span className="font-medium">{a.audience}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

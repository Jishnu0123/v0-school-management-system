"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExamsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Exam</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="exam-title">Title</Label>
            <Input id="exam-title" placeholder="Mid-term Exam" />
          </div>
          <div className="grid gap-2">
            <Label>Class</Label>
            <Select defaultValue="10">
              <SelectTrigger>
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="exam-notes">Notes</Label>
            <Textarea id="exam-notes" placeholder="Instructions, timings, syllabus..." />
          </div>
          <Button>Create Exam</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enter Marks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2">
            <Label>Subject</Label>
            <Select defaultValue="math">
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="roll">Roll No</Label>
              <Input id="roll" placeholder="S1001" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="marks">Marks</Label>
              <Input id="marks" type="number" placeholder="0-100" />
            </div>
          </div>
          <Button>Add Entry</Button>
          <div className="pt-2">
            <Button variant="outline">Generate Results</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Megaphone, Trash2, Filter } from "lucide-react"

type Announcement = {
  id: string
  title: string
  body: string
  audience: string
  date: string
  createdBy: string
}

export default function AnnouncementsPage() {
  const [role, setRole] = useState<string>('admin')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    body: "",
    audience: "Students",
  })

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'admin'
    setRole(savedRole)
  }, [])

  useEffect(() => {
    fetchAnnouncements()
  }, [filter])

  const fetchAnnouncements = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.append('audience', filter)
      
      const response = await fetch(`/api/announcements?${params}`)
      const data = await response.json()
      setAnnouncements(data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    if (!newAnnouncement.title || !newAnnouncement.body) {
      alert('Please fill in all fields')
      return
    }

    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newAnnouncement, createdBy: "Admin" }),
      })
      
      if (response.ok) {
        setNewAnnouncement({ title: "", body: "", audience: "Students" })
        fetchAnnouncements()
      }
    } catch (error) {
      console.error('Error publishing announcement:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return
    
    try {
      const response = await fetch(`/api/announcements?id=${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        fetchAnnouncements()
      }
    } catch (error) {
      console.error('Error deleting announcement:', error)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {role !== 'student' && role !== 'parent' ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Post Announcement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                placeholder="Short headline"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="audience">Audience</Label>
              <Select
                value={newAnnouncement.audience}
                onValueChange={(val) => setNewAnnouncement({ ...newAnnouncement, audience: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Students">Students</SelectItem>
                  <SelectItem value="Teachers">Teachers</SelectItem>
                  <SelectItem value="Parents">Parents</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                value={newAnnouncement.body}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, body: e.target.value })}
                placeholder="Announcement details..."
                rows={6}
              />
            </div>
            <Button onClick={handlePublish} className="w-full">
              <Megaphone className="w-4 h-4 mr-2" />
              Publish Announcement
            </Button>
          </CardContent>
        </Card>
      ) : role === 'parent' ? (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-purple-600" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Megaphone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">Stay Informed</h3>
                <p className="text-sm text-purple-700">
                  Get important updates from school administration about events, holidays, and policies that affect your child.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Check for Updates</h4>
              <ul className="space-y-2 text-sm text-purple-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                  Important school announcements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                  Holiday schedules and events
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                  Parent-teacher updates
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Recent Announcements</CardTitle>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Students">Students</SelectItem>
                <SelectItem value="Teachers">Teachers</SelectItem>
                <SelectItem value="Parents">Parents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No announcements found</div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-lg p-4 bg-card hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          announcement.audience === 'Students' ? 'bg-blue-100 text-blue-800' :
                          announcement.audience === 'Teachers' ? 'bg-green-100 text-green-800' :
                          announcement.audience === 'Parents' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {announcement.audience}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{announcement.body}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>📅 {announcement.date}</span>
                        <span>By {announcement.createdBy}</span>
                      </div>
                    </div>
                    {role !== 'student' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(announcement.id)}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      )}
    </div>
  )
}

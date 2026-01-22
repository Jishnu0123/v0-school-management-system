"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, UserPlus, Search, TrendingUp } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { dummyStudentPerformance, dummyStudents } from "@/lib/dummy-data"

type Teacher = {
  id: string
  name: string
  subjects: string
  classes: string
  contact: string
  phone: string
  experience: string
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showPerformance, setShowPerformance] = useState(false)
  const [role, setRole] = useState<string>("")
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subjects: "",
    classes: "",
    contact: "",
    phone: "",
    experience: "",
  })

  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || 'teacher'
    setRole(userRole)
    fetchTeachers()
  }, [search])

  const fetchTeachers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      
      const response = await fetch(`/api/teachers?${params}`)
      const data = await response.json()
      setTeachers(data)
    } catch (error) {
      console.error('Error fetching teachers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTeacher = async () => {
    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher),
      })
      
      if (response.ok) {
        setNewTeacher({ name: "", subjects: "", classes: "", contact: "", phone: "", experience: "" })
        setShowAddForm(false)
        fetchTeachers()
      }
    } catch (error) {
      console.error('Error adding teacher:', error)
    }
  }

  const handleDeleteTeacher = async (id: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return
    
    try {
      const response = await fetch(`/api/teachers?id=${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        fetchTeachers()
      }
    } catch (error) {
      console.error('Error deleting teacher:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Student Performance Section */}
      {(role === 'teacher' || role === 'admin') && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Student Performance Analytics
            </CardTitle>
            <Button variant="outline" onClick={() => setShowPerformance(!showPerformance)}>
              {showPerformance ? 'Hide' : 'View'} Analytics
            </Button>
          </CardHeader>
          {showPerformance && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Performance Trend Chart */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Subject Performance Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dummyStudentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="math" stroke="#8884d8" name="Math" />
                      <Line type="monotone" dataKey="english" stroke="#82ca9d" name="English" />
                      <Line type="monotone" dataKey="science" stroke="#ffc658" name="Science" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Subject Comparison */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Average Scores by Subject</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { subject: 'Hindi', score: 88 },
                      { subject: 'English', score: 85 },
                      { subject: 'Math', score: 91 },
                      { subject: 'Science', score: 89 },
                      { subject: 'Social', score: 86 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Student Performance Table */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Student-wise Performance</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-2">Student Name</th>
                        <th className="text-left p-2">Class</th>
                        <th className="text-left p-2">Hindi</th>
                        <th className="text-left p-2">English</th>
                        <th className="text-left p-2">Math</th>
                        <th className="text-left p-2">Science</th>
                        <th className="text-left p-2">Social</th>
                        <th className="text-left p-2">Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyStudents.map((student) => {
                        const perf = student.performance as any
                        const average = Math.round((perf.hindi + perf.english + perf.math + perf.science + perf.social) / 5)
                        return (
                          <tr key={student.id} className="border-b last:border-0 hover:bg-muted/20">
                            <td className="p-2 font-medium">{student.name}</td>
                            <td className="p-2">{student.class}-{student.section}</td>
                            <td className="p-2"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{perf.hindi}</span></td>
                            <td className="p-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{perf.english}</span></td>
                            <td className="p-2"><span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{perf.math}</span></td>
                            <td className="p-2"><span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">{perf.science}</span></td>
                            <td className="p-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">{perf.social}</span></td>
                            <td className="p-2 font-semibold text-right">{average}%</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-balance">Teachers Management</CardTitle>
          {role === 'admin' && (
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && role === 'admin' && (
            <div className="p-4 border rounded-lg bg-muted/30 space-y-3">
              <h3 className="font-semibold">Add New Teacher</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="subjects">Subjects</Label>
                  <Input
                    id="subjects"
                    value={newTeacher.subjects}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value })}
                    placeholder="Math, Physics"
                  />
                </div>
                <div>
                  <Label htmlFor="classes">Classes</Label>
                  <Input
                    id="classes"
                    value={newTeacher.classes}
                    onChange={(e) => setNewTeacher({ ...newTeacher, classes: e.target.value })}
                    placeholder="9-10"
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Email</Label>
                  <Input
                    id="contact"
                    type="email"
                    value={newTeacher.contact}
                    onChange={(e) => setNewTeacher({ ...newTeacher, contact: e.target.value })}
                    placeholder="teacher@school.gov"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={newTeacher.experience}
                    onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                    placeholder="10 years"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddTeacher}>Save Teacher</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : teachers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No teachers found</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Subjects</th>
                    <th className="text-left p-3">Classes</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Experience</th>
                    {role === 'admin' && <th className="text-left p-3">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="p-3 font-medium">{teacher.name}</td>
                      <td className="p-3">{teacher.subjects}</td>
                      <td className="p-3">{teacher.classes}</td>
                      <td className="p-3 text-xs">{teacher.contact}</td>
                      <td className="p-3">{teacher.experience}</td>
                      {role === 'admin' && (
                        <td className="p-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteTeacher(teacher.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
            <div>Total Teachers: {teachers.length}</div>
            <div>Showing {teachers.length} results</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Trash2, UserPlus, Search, BookOpen, User } from "lucide-react"
import { dummyStudentClasses, dummyStudentPerformance } from "@/lib/dummy-data"

type Student = {
  id: string
  name: string
  roll: string
  class: string
  section: string
  attendance: string
  email: string
  phone: string
  address: string
}

export default function StudentsPage() {
  const [role, setRole] = useState<string>("")
  const [studentId, setStudentId] = useState<string>("")
  const [students, setStudents] = useState<Student[]>([])
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showMyClasses, setShowMyClasses] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    roll: "",
    class: "9",
    section: "A",
    email: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || 'admin'
    const storedStudentId = localStorage.getItem('studentId') || ''
    setRole(userRole)
    setStudentId(storedStudentId)
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [search, classFilter, sectionFilter, role, studentId])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (classFilter !== 'all') params.append('class', classFilter)
      if (sectionFilter !== 'all') params.append('section', sectionFilter)
      
      const response = await fetch(`/api/students?${params}`)
      const data = await response.json()
      let filtered = data
      if (role === 'student' && studentId) {
        filtered = data.filter((s: Student) => s.id === studentId || s.roll === studentId)
      } else if (role === 'parent' && studentId) {
        filtered = data.filter((s: Student) => s.id === studentId || s.roll === studentId)
      }
      setStudents(filtered)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddStudent = async () => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newStudent, attendance: "0%" }),
      })
      
      if (response.ok) {
        setNewStudent({ name: "", roll: "", class: "9", section: "A", email: "", phone: "", address: "" })
        setShowAddForm(false)
        fetchStudents()
      }
    } catch (error) {
      console.error('Error adding student:', error)
    }
  }

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return
    
    try {
      const response = await fetch(`/api/students?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchStudents()
      }
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  }

  if (role === 'student' || role === 'parent') {
    const myProfile = students[0]
    const myResults = dummyStudentPerformance.map((item, idx) => ({
      id: `exam-${idx + 1}`,
      exam: `${item.month} Assessment`,
      score: item.score,
      grade: item.score >= 90 ? 'A' : item.score >= 80 ? 'B' : 'C',
      remark: item.score >= 85 ? 'Keep it up!' : 'Focus on practice',
    }))
    const upcomingExams = [
      { id: 'up-1', title: 'Maths Midterm', date: '12 Feb 2026', syllabus: 'Ch 5-8 Algebra & Geometry' },
      { id: 'up-2', title: 'Science Practical', date: '18 Feb 2026', syllabus: 'Lab safety + Physics experiments' },
      { id: 'up-3', title: 'English Literature', date: '24 Feb 2026', syllabus: 'Poems 3-5, Novel Chapters 6-9' },
    ]

    const headerTitle = role === 'parent' ? 'My Child\'s Profile' : 'My Classes'
    const headerIcon = role === 'parent' ? <User className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />

    if (!myProfile) {
      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-balance">No profile found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">We could not find a profile for this account.</p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              {headerIcon}
              {headerTitle}
            </CardTitle>
            {role === 'student' && (
              <Button variant="outline" onClick={() => setShowMyClasses(!showMyClasses)}>
                {showMyClasses ? 'Hide' : 'View'} Classes
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {role === 'parent' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-sm"><strong>Name:</strong> {myProfile.name}</p>
                <p className="text-sm"><strong>Roll No:</strong> {myProfile.roll}</p>
                <p className="text-sm"><strong>Class:</strong> {myProfile.class}-{myProfile.section}</p>
                <p className="text-sm"><strong>Attendance:</strong> {myProfile.attendance}</p>
                <p className="text-sm"><strong>Email:</strong> {myProfile.email}</p>
                <p className="text-sm"><strong>Phone:</strong> {myProfile.phone}</p>
                <p className="text-sm"><strong>Address:</strong> {myProfile.address}</p>
              </div>
            ) : (
              showMyClasses && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dummyStudentClasses.map((classItem, idx) => (
                    <Card key={idx} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">{classItem.name}</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p><strong>Teacher:</strong> {classItem.teacher}</p>
                          <p><strong>Time:</strong> {classItem.time}</p>
                          <p><strong>Room:</strong> {classItem.room}</p>
                          <p><strong>Recent Score:</strong> <span className="text-green-600 font-semibold">{classItem.marks}%</span></p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-balance">Students Management</CardTitle>
          {role === 'admin' && (
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && role === 'admin' && (
            <div className="p-4 border rounded-lg bg-muted/30 space-y-3">
              <h3 className="font-semibold">Add New Student</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="roll">Roll No</Label>
                  <Input
                    id="roll"
                    value={newStudent.roll}
                    onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
                    placeholder="S1009"
                  />
                </div>
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Select value={newStudent.class} onValueChange={(val) => setNewStudent({ ...newStudent, class: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Select value={newStudent.section} onValueChange={(val) => setNewStudent({ ...newStudent, section: val })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="student@school.gov"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="9876543210"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddStudent}>Save Student</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Class</Label>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Section</Label>
              <Select value={sectionFilter} onValueChange={setSectionFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading students...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No students found</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Roll</th>
                      <th className="text-left p-3">Class</th>
                      <th className="text-left p-3">Attendance</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Phone</th>
                      {role === 'admin' && <th className="text-left p-3">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="p-3 font-medium">{student.name}</td>
                        <td className="p-3">{student.roll}</td>
                        <td className="p-3">{student.class}-{student.section}</td>
                        <td className="p-3">{student.attendance}</td>
                        <td className="p-3">{student.email}</td>
                        <td className="p-3">{student.phone}</td>
                        {role === 'admin' && (
                          <td className="p-3">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteStudent(student.id)}
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
              </div>

              <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
                <div>Total Students: {students.length}</div>
                <div>Showing {students.length} results</div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AttendanceTrend } from "@/components/charts/attendance-trend"
import { AttendanceAnalytics } from "@/components/charts/attendance-analytics"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, XCircle, MessageSquare, BookOpen } from "lucide-react"

type Student = {
  id: string
  name: string
  roll: string
  class: string
  section: string
}

// Teacher's assigned classes for attendance
const teacherAssignedClasses = [
  { id: "1", class: "10", section: "A", subject: "Mathematics", label: "Class 10-A (Mathematics)" },
  { id: "2", class: "10", section: "B", subject: "Mathematics", label: "Class 10-B (Mathematics)" },
  { id: "3", class: "9", section: "A", subject: "Mathematics", label: "Class 9-A (Mathematics)" },
]

export default function AttendancePage() {
  const [role, setRole] = useState<string>('admin')
  const [studentId, setStudentId] = useState<string>('')
  const [cls, setCls] = useState("10")
  const [section, setSection] = useState("A")
  const [selectedTeacherClass, setSelectedTeacherClass] = useState("1")
  const [students, setStudents] = useState<Student[]>([])
  const [present, setPresent] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string>("")
  const [remark, setRemark] = useState<string>("")
  const [showRemarkModal, setShowRemarkModal] = useState(false)

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'admin'
    const savedStudentId = localStorage.getItem('studentId') || ''
    setRole(savedRole)
    setStudentId(savedStudentId)
  }, [])

  useEffect(() => {
    if (role === 'teacher') {
      const assignedClass = teacherAssignedClasses.find(c => c.id === selectedTeacherClass)
      if (assignedClass) {
        setCls(assignedClass.class)
        setSection(assignedClass.section)
      }
    }
    fetchStudents()
  }, [cls, section, selectedTeacherClass, role, studentId])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if ((role === 'student' || role === 'parent') && studentId) {
        params.append('studentId', studentId)
      } else {
        params.append('class', cls)
        params.append('section', section)
      }
      
      const response = await fetch(`/api/students?${params}`)
      const data = await response.json()
      let filtered = data
      if ((role === 'student' || role === 'parent') && studentId) {
        filtered = data.filter((s: Student) => s.id === studentId || s.roll === studentId)
      }
      setStudents(filtered)
      
      // Initialize all as present by default
      const initialPresent: Record<string, boolean> = {}
      filtered.forEach((s: Student) => {
        initialPresent[s.roll] = true
      })
      setPresent(initialPresent)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAttendance = async () => {
    setSaveStatus("Saving...")
    try {
      const today = new Date().toISOString().split('T')[0]
      const records = students.map(student => ({
        studentId: student.roll,
        studentName: student.name,
        class: student.class,
        section: student.section,
        date: today,
        status: present[student.roll] ? "present" : "absent"
      }))

      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records }),
      })

      if (response.ok) {
        setSaveStatus("✓ Attendance saved successfully!")
        setTimeout(() => setSaveStatus(""), 3000)
      } else {
        setSaveStatus("✗ Failed to save attendance")
      }
    } catch (error) {
      console.error('Error saving attendance:', error)
      setSaveStatus("✗ Error saving attendance")
    }
  }

  const markAllPresent = () => {
    const allPresent: Record<string, boolean> = {}
    students.forEach(s => {
      allPresent[s.roll] = true
    })
    setPresent(allPresent)
  }

  const markAllAbsent = () => {
    const allAbsent: Record<string, boolean> = {}
    students.forEach(s => {
      allAbsent[s.roll] = false
    })
    setPresent(allAbsent)
  }

  const presentCount = Object.values(present).filter(p => p).length
  const absentCount = students.length - presentCount

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-8 h-8" />
          {role === 'teacher' ? 'Mark Attendance' : role === 'student' ? 'My Attendance' : 'Attendance Monitoring'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {role === 'teacher' ? 'Record daily attendance for students' : role === 'student' ? 'View your attendance record' : 'View attendance across classes'}
        </p>
      </div>

      {/* Role-Based Access Control */}
      {role === 'parent' && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900">Parent View</h3>
                <p className="text-sm text-purple-700 mt-1">
                  You can view your child's attendance record.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {role === 'admin' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">View Only Mode</h3>
                <p className="text-sm text-blue-700 mt-1">
                  You can monitor attendance data. Only teachers can mark attendance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {role === 'parent' && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900">Parent View</h3>
                <p className="text-sm text-purple-700 mt-1">
                  You can view your child's attendance record.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{role === 'student' ? 'My Attendance Record' : 'Attendance Overview'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {role === 'teacher' && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Select Your Class</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    You can only take attendance for your assigned classes.
                  </p>
                  <Select value={selectedTeacherClass} onValueChange={setSelectedTeacherClass}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherAssignedClasses.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={markAllPresent} variant="outline" size="sm">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    All Present
                  </Button>
                  <Button onClick={markAllAbsent} variant="outline" size="sm">
                    <XCircle className="w-4 h-4 mr-1" />
                    All Absent
                  </Button>
                </div>
              </div>
            )}

            {role !== 'student' && role !== 'teacher' && role !== 'parent' && (
              <div className="flex flex-wrap items-end gap-3">
                <div className="w-40">
                  <Label>Class</Label>
                  <Select value={cls} onValueChange={setCls}>
                    <SelectTrigger>
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Label>Section</Label>
                  <Select value={section} onValueChange={setSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading attendance...</div>
            ) : students.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No data available</div>
            ) : (
              <>
                {role === 'student' ? (
                  <>
                    <div className="space-y-4">
                      {students.length > 0 && (
                        <>
                          <div className="p-4 border rounded-lg bg-muted/30">
                            <h4 className="font-semibold mb-3">My Attendance Status</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Roll No:</strong> {students[0].roll}</p>
                              <p><strong>Name:</strong> {students[0].name}</p>
                              <p><strong>Status:</strong> <span className={present[students[0].roll] ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {present[students[0].roll] ? 'Present' : 'Absent'}
                              </span></p>
                            </div>
                          </div>

                          <AttendanceAnalytics presentDays={184} absentDays={16} />
                        </>
                      )}
                    </div>
                  </>
                ) : role === 'parent' ? (
                  <>
                    <div className="space-y-4">
                      {students.length > 0 && (
                        <>
                          <div className="p-4 border rounded-lg bg-muted/30">
                            <h4 className="font-semibold mb-3">My Child's Attendance</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Roll No:</strong> {students[0].roll}</p>
                              <p><strong>Name:</strong> {students[0].name}</p>
                              <p><strong>Class:</strong> {students[0].class}-{students[0].section}</p>
                              <p><strong>Status:</strong> <span className={present[students[0].roll] ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {present[students[0].roll] ? 'Present' : 'Absent'}
                              </span></p>
                            </div>
                          </div>

                          <AttendanceAnalytics presentDays={184} absentDays={16} title="Child's Attendance Analytics (2026)" />
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-4 text-sm p-3 bg-muted/30 rounded-lg">
                      <div>
                        <span className="font-semibold">Total:</span> {students.length}
                      </div>
                      <div className="text-green-600">
                        <span className="font-semibold">Present:</span> {presentCount}
                      </div>
                      <div className="text-red-600">
                        <span className="font-semibold">Absent:</span> {absentCount}
                      </div>
                      <div>
                        <span className="font-semibold">%:</span> {students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0}%
                      </div>
                    </div>

                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b bg-muted/50">
                            <th className="text-left p-3">Roll</th>
                            <th className="text-left p-3">Name</th>
                            <th className="text-center p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((s) => (
                            <tr key={s.roll} className="border-b last:border-0 hover:bg-muted/20">
                              <td className="p-3 font-medium">{s.roll}</td>
                              <td className="p-3">{s.name}</td>
                              <td className="p-3">
                                <div className="flex items-center justify-center gap-2">
                                  {role === 'teacher' ? (
                                    <>
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                          type="radio"
                                          name={`attendance-${s.roll}`}
                                          checked={!!present[s.roll]}
                                          onChange={() => setPresent(p => ({ ...p, [s.roll]: true }))}
                                          className="accent-green-600"
                                        />
                                        <span className="text-xs text-green-600 font-semibold">P</span>
                                      </label>
                                      <label className="flex items-center gap-1 cursor-pointer">
                                        <input
                                          type="radio"
                                          name={`attendance-${s.roll}`}
                                          checked={!present[s.roll]}
                                          onChange={() => setPresent(p => ({ ...p, [s.roll]: false }))}
                                          className="accent-red-600"
                                        />
                                        <span className="text-xs text-red-600 font-semibold">A</span>
                                      </label>
                                    </>
                                  ) : (
                                    <span className={present[s.roll] ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                      {present[s.roll] ? 'Present' : 'Absent'}
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {role === 'teacher' && (
                  <div className="flex items-center gap-3">
                    <Button onClick={handleSaveAttendance} className="w-full">
                      Save Attendance
                    </Button>
                    {saveStatus && (
                      <span className={`text-sm whitespace-nowrap ${saveStatus.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                        {saveStatus}
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {role === 'student' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Attendance Remark
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Add a remark or leave a message about your attendance
                </p>
                <div className="space-y-2">
                  <Textarea
                    placeholder="e.g., I was absent on 20-Jan due to illness. Medical certificate attached."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                <Button onClick={() => {
                  alert('Remark submitted successfully. Your teacher will review it.')
                  setRemark('')
                }} className="w-full">
                  Submit Remark
                </Button>
              </CardContent>
            </Card>
          )}

          <AttendanceTrend />
        </div>
      </div>
    </div>
  )
}

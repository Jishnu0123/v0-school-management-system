"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Calendar, Trophy, MessageSquare } from "lucide-react"

type Exam = {
  id: string
  title: string
  class: string
  section: string
  subject: string
  date: string
  totalMarks: number
  notes: string
}

type Mark = {
  id: string
  examId: string
  studentId: string
  studentName: string
  marksObtained: number
  totalMarks: number
}

export default function ExamsPage() {
  const [role, setRole] = useState<string>('admin')
  const [exams, setExams] = useState<Exam[]>([])
  const [marks, setMarks] = useState<Mark[]>([])
  const [remarkInputs, setRemarkInputs] = useState<Record<string, string>>({})
  const [submittedRemarks, setSubmittedRemarks] = useState<Record<string, boolean>>({})
  const [newExam, setNewExam] = useState({
    title: "",
    class: "10",
    section: "A",
    subject: "Math",
    date: "",
    totalMarks: 100,
    notes: "",
  })
  const [newMark, setNewMark] = useState({
    examId: "",
    studentId: "",
    studentName: "",
    marksObtained: 0,
  })
  const [selectedExam, setSelectedExam] = useState<string>("")

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'admin'
    setRole(savedRole)
    fetchExams()
  }, [])

  useEffect(() => {
    if (selectedExam) {
      fetchMarks(selectedExam)
    }
  }, [selectedExam])

  const fetchExams = async () => {
    try {
      const response = await fetch('/api/exams?type=exams')
      const data = await response.json()
      setExams(data)
    } catch (error) {
      console.error('Error fetching exams:', error)
    }
  }

  const fetchMarks = async (examId: string) => {
    try {
      const response = await fetch(`/api/exams?type=marks&examId=${examId}`)
      const data = await response.json()
      setMarks(data)
    } catch (error) {
      console.error('Error fetching marks:', error)
    }
  }

  const handleCreateExam = async () => {
    try {
      const response = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'exam', ...newExam }),
      })
      
      if (response.ok) {
        setNewExam({ title: "", class: "10", section: "A", subject: "Math", date: "", totalMarks: 100, notes: "" })
        fetchExams()
      }
    } catch (error) {
      console.error('Error creating exam:', error)
    }
  }

  const handleAddMark = async () => {
    if (!selectedExam) {
      alert('Please select an exam first')
      return
    }

    const exam = exams.find(e => e.id === selectedExam)
    if (!exam) return

    try {
      const response = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'mark',
          examId: selectedExam,
          ...newMark,
          totalMarks: exam.totalMarks,
        }),
      })
      
      if (response.ok) {
        setNewMark({ examId: "", studentId: "", studentName: "", marksObtained: 0 })
        fetchMarks(selectedExam)
      }
    } catch (error) {
      console.error('Error adding mark:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-8 h-8" />
          {role === 'teacher' ? 'Manage Exams & Marks' : role === 'student' ? 'My Exam Results' : 'Exam Results Monitoring'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {role === 'teacher' ? 'Create exams and enter student marks' : role === 'student' ? 'View your exam results and add remarks' : 'Monitor exam schedules and results'}
        </p>
      </div>

      {/* Role-Based Access Control */}
      {role === 'admin' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">View Only Mode</h3>
                <p className="text-sm text-blue-700 mt-1">
                  You can monitor exam schedules and results. Only teachers can create exams and enter marks.
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
                  You can view your child's exam schedules and results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {role === 'teacher' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Create Exam
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="exam-title">Exam Title</Label>
                <Input
                  id="exam-title"
                  value={newExam.title}
                  onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                  placeholder="Mid-term Exam"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Class</Label>
                <Select value={newExam.class} onValueChange={(val) => setNewExam({ ...newExam, class: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Section</Label>
                <Select value={newExam.section} onValueChange={(val) => setNewExam({ ...newExam, section: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Subject</Label>
                <Select value={newExam.subject} onValueChange={(val) => setNewExam({ ...newExam, subject: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Math">Math</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="total-marks">Total Marks</Label>
                <Input
                  id="total-marks"
                  type="number"
                  value={newExam.totalMarks}
                  onChange={(e) => setNewExam({ ...newExam, totalMarks: parseInt(e.target.value) || 100 })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exam-date">Date</Label>
              <Input
                id="exam-date"
                type="date"
                value={newExam.date}
                onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exam-notes">Notes</Label>
              <Textarea
                id="exam-notes"
                value={newExam.notes}
                onChange={(e) => setNewExam({ ...newExam, notes: e.target.value })}
                placeholder="Instructions, timings, syllabus..."
              />
            </div>
            <Button onClick={handleCreateExam} className="w-full">Create Exam</Button>
          </CardContent>
        </Card>
        )}

        {role === 'teacher' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Enter Marks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                <Label>Select Exam</Label>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an exam" />
                </SelectTrigger>
                <SelectContent>
                  {exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.title} - {exam.subject} (Class {exam.class}{exam.section})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="student-id">Student Roll No</Label>
              <Input
                id="student-id"
                value={newMark.studentId}
                onChange={(e) => setNewMark({ ...newMark, studentId: e.target.value })}
                placeholder="S1001"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="student-name">Student Name</Label>
              <Input
                id="student-name"
                value={newMark.studentName}
                onChange={(e) => setNewMark({ ...newMark, studentName: e.target.value })}
                placeholder="Student Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="marks">Marks Obtained</Label>
              <Input
                id="marks"
                type="number"
                value={newMark.marksObtained}
                onChange={(e) => setNewMark({ ...newMark, marksObtained: parseInt(e.target.value) || 0 })}
                placeholder="0-100"
              />
            </div>
            <Button onClick={handleAddMark} className="w-full">Add Marks</Button>

            {marks.length > 0 && (
              <div className="pt-4">
                <h4 className="font-semibold mb-2 text-sm">Recent Entries:</h4>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {marks.map((mark) => (
                    <div key={mark.id} className="text-sm p-2 bg-muted/30 rounded flex justify-between">
                      <span>{mark.studentName} ({mark.studentId})</span>
                      <span className="font-semibold">{mark.marksObtained}/{mark.totalMarks}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        )}

        {role === 'student' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                My Published Results & Remarks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add one remark per published result. Remarks are enabled only for exams with published marks.
              </p>

              <div className="space-y-3">
                {exams.slice(0, 3).map((exam, idx) => {
                  const mark = marks.find((m) => m.examId === exam.id) || {
                    examId: exam.id,
                    studentId: 's1',
                    studentName: 'You',
                    marksObtained: 80 + idx * 3,
                    totalMarks: exam.totalMarks,
                  }
                  const submitted = submittedRemarks[exam.id]
                  return (
                    <div key={exam.id} className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{exam.title} - {exam.subject}</p>
                          <p className="text-xs text-muted-foreground">Class {exam.class}{exam.section} • {exam.date}</p>
                        </div>
                        <span className="text-sm font-semibold">
                          {mark.marksObtained}/{mark.totalMarks}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Status: Published</p>
                      <div className="space-y-2">
                        <Label>Remark (one per exam)</Label>
                        <Textarea
                          placeholder="Share your remark about this exam"
                          value={remarkInputs[exam.id] || ''}
                          onChange={(e) => setRemarkInputs((prev) => ({ ...prev, [exam.id]: e.target.value }))}
                          disabled={submitted}
                          className="min-h-[90px]"
                        />
                        <Button
                          onClick={() => {
                            if (!remarkInputs[exam.id]) {
                              alert('Please enter a remark before submitting.')
                              return
                            }
                            setSubmittedRemarks((prev) => ({ ...prev, [exam.id]: true }))
                            alert('Remark submitted for this exam. You cannot submit again for this exam.')
                          }}
                          disabled={submitted}
                          className="w-full"
                        >
                          {submitted ? 'Remark Submitted' : 'Submit Remark'}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          {exams.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No exams scheduled</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3">Title</th>
                    <th className="text-left p-3">Subject</th>
                    <th className="text-left p-3">Class</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Total Marks</th>
                    <th className="text-left p-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam) => (
                    <tr key={exam.id} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="p-3 font-medium">{exam.title}</td>
                      <td className="p-3">{exam.subject}</td>
                      <td className="p-3">{exam.class}{exam.section}</td>
                      <td className="p-3">{exam.date}</td>
                      <td className="p-3">{exam.totalMarks}</td>
                      <td className="p-3 text-xs text-muted-foreground">{exam.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Users,
  ChevronRight,
  ArrowLeft,
  TrendingUp,
  BarChart3,
  Search,
  GraduationCap,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Teacher's assigned classes
const teacherClasses = [
  {
    id: "1",
    name: "Class 10-A",
    subject: "Mathematics",
    students: 32,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 201",
  },
  {
    id: "2",
    name: "Class 10-B",
    subject: "Mathematics",
    students: 28,
    schedule: "Tue, Thu - 10:00 AM",
    room: "Room 203",
  },
  {
    id: "3",
    name: "Class 9-A",
    subject: "Mathematics",
    students: 35,
    schedule: "Mon, Wed, Fri - 11:00 AM",
    room: "Room 105",
  },
]

// Students in each class
const classStudents: Record<string, any[]> = {
  "1": [
    { id: "s1", name: "Aarav Kumar", roll: "1", attendance: "92%", avgMarks: 88, performance: { unit1: 85, unit2: 88, midterm: 90, unit3: 87, final: 92 } },
    { id: "s2", name: "Diya Sharma", roll: "2", attendance: "95%", avgMarks: 94, performance: { unit1: 92, unit2: 94, midterm: 96, unit3: 93, final: 95 } },
    { id: "s3", name: "Arjun Patel", roll: "3", attendance: "88%", avgMarks: 82, performance: { unit1: 78, unit2: 80, midterm: 84, unit3: 82, final: 86 } },
    { id: "s4", name: "Priya Singh", roll: "4", attendance: "96%", avgMarks: 91, performance: { unit1: 88, unit2: 90, midterm: 93, unit3: 91, final: 93 } },
    { id: "s5", name: "Rahul Verma", roll: "5", attendance: "90%", avgMarks: 79, performance: { unit1: 75, unit2: 78, midterm: 80, unit3: 79, final: 83 } },
    { id: "s6", name: "Ananya Reddy", roll: "6", attendance: "93%", avgMarks: 86, performance: { unit1: 84, unit2: 85, midterm: 88, unit3: 86, final: 87 } },
    { id: "s7", name: "Vikram Joshi", roll: "7", attendance: "87%", avgMarks: 76, performance: { unit1: 72, unit2: 74, midterm: 78, unit3: 76, final: 80 } },
    { id: "s8", name: "Sneha Gupta", roll: "8", attendance: "94%", avgMarks: 89, performance: { unit1: 86, unit2: 88, midterm: 91, unit3: 89, final: 91 } },
  ],
  "2": [
    { id: "s9", name: "Karan Malhotra", roll: "1", attendance: "91%", avgMarks: 85, performance: { unit1: 82, unit2: 84, midterm: 87, unit3: 85, final: 87 } },
    { id: "s10", name: "Ishita Kapoor", roll: "2", attendance: "97%", avgMarks: 92, performance: { unit1: 90, unit2: 91, midterm: 94, unit3: 92, final: 93 } },
    { id: "s11", name: "Rohan Sharma", roll: "3", attendance: "85%", avgMarks: 78, performance: { unit1: 74, unit2: 76, midterm: 80, unit3: 78, final: 82 } },
    { id: "s12", name: "Meera Nair", roll: "4", attendance: "94%", avgMarks: 88, performance: { unit1: 85, unit2: 87, midterm: 90, unit3: 88, final: 90 } },
    { id: "s13", name: "Aditya Roy", roll: "5", attendance: "89%", avgMarks: 81, performance: { unit1: 78, unit2: 80, midterm: 83, unit3: 81, final: 83 } },
    { id: "s14", name: "Kavya Iyer", roll: "6", attendance: "96%", avgMarks: 95, performance: { unit1: 93, unit2: 94, midterm: 97, unit3: 95, final: 96 } },
  ],
  "3": [
    { id: "s15", name: "Siddharth Das", roll: "1", attendance: "93%", avgMarks: 84, performance: { unit1: 81, unit2: 83, midterm: 86, unit3: 84, final: 86 } },
    { id: "s16", name: "Tanvi Mehta", roll: "2", attendance: "95%", avgMarks: 90, performance: { unit1: 88, unit2: 89, midterm: 92, unit3: 90, final: 91 } },
    { id: "s17", name: "Harsh Pandey", roll: "3", attendance: "88%", avgMarks: 77, performance: { unit1: 73, unit2: 75, midterm: 79, unit3: 77, final: 81 } },
    { id: "s18", name: "Pooja Rani", roll: "4", attendance: "92%", avgMarks: 86, performance: { unit1: 83, unit2: 85, midterm: 88, unit3: 86, final: 88 } },
    { id: "s19", name: "Nikhil Saxena", roll: "5", attendance: "90%", avgMarks: 83, performance: { unit1: 80, unit2: 82, midterm: 85, unit3: 83, final: 85 } },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function MyClassesPage() {
  const [view, setView] = useState<"classes" | "students" | "performance">("classes")
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleClassClick = (classItem: any) => {
    setSelectedClass(classItem)
    setView("students")
  }

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student)
    setView("performance")
  }

  const handleBack = () => {
    if (view === "performance") {
      setSelectedStudent(null)
      setView("students")
    } else if (view === "students") {
      setSelectedClass(null)
      setView("classes")
    }
  }

  const getStudentsForClass = () => {
    if (!selectedClass) return []
    const students = classStudents[selectedClass.id] || []
    if (searchTerm) {
      return students.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.roll.includes(searchTerm)
      )
    }
    return students
  }

  const getPerformanceChartData = () => {
    if (!selectedStudent) return []
    const perf = selectedStudent.performance
    return [
      { name: "Unit Test 1", marks: perf.unit1 },
      { name: "Unit Test 2", marks: perf.unit2 },
      { name: "Mid Term", marks: perf.midterm },
      { name: "Unit Test 3", marks: perf.unit3 },
      { name: "Final", marks: perf.final },
    ]
  }

  const getGradeDistribution = () => {
    if (!selectedClass) return []
    const students = classStudents[selectedClass.id] || []
    const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 }
    students.forEach((s) => {
      if (s.avgMarks >= 90) grades.A++
      else if (s.avgMarks >= 80) grades.B++
      else if (s.avgMarks >= 70) grades.C++
      else if (s.avgMarks >= 60) grades.D++
      else grades.F++
    })
    return Object.entries(grades).map(([name, value]) => ({ name, value }))
  }

  // Classes View
  if (view === "classes") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            My Classes
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your assigned classes and track student performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teacherClasses.map((classItem) => (
            <Card
              key={classItem.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:border-primary"
              onClick={() => handleClassClick(classItem)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{classItem.name}</CardTitle>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <CardDescription>{classItem.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{classItem.students} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span>{classItem.schedule}</span>
                  </div>
                  <div className="text-muted-foreground">{classItem.room}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Class Overview Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Teaching Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">3</div>
                <div className="text-sm text-muted-foreground">Total Classes</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">95</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">85%</div>
                <div className="text-sm text-muted-foreground">Avg Attendance</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">82%</div>
                <div className="text-sm text-muted-foreground">Avg Performance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Students List View
  if (view === "students" && selectedClass) {
    const students = getStudentsForClass()
    const gradeData = getGradeDistribution()

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {selectedClass.name}
            </h1>
            <p className="text-muted-foreground">
              {selectedClass.subject} • {selectedClass.schedule}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Student List */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Students ({students.length})
                  </CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search student..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleStudentClick(student)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Roll No: {student.roll}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Attendance</p>
                          <p
                            className={`font-semibold ${
                              parseInt(student.attendance) >= 90
                                ? "text-green-600"
                                : parseInt(student.attendance) >= 75
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {student.attendance}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Avg Marks</p>
                          <p
                            className={`font-semibold ${
                              student.avgMarks >= 85
                                ? "text-green-600"
                                : student.avgMarks >= 70
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {student.avgMarks}%
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Class Analytics */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={gradeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {gradeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Highest Score</span>
                  <span className="font-semibold text-green-600">
                    {Math.max(...students.map((s) => s.avgMarks))}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lowest Score</span>
                  <span className="font-semibold text-red-600">
                    {Math.min(...students.map((s) => s.avgMarks))}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class Average</span>
                  <span className="font-semibold">
                    {Math.round(
                      students.reduce((a, b) => a + b.avgMarks, 0) / students.length
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pass Rate</span>
                  <span className="font-semibold text-blue-600">
                    {Math.round(
                      (students.filter((s) => s.avgMarks >= 60).length /
                        students.length) *
                        100
                    )}
                    %
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Student Performance View
  if (view === "performance" && selectedStudent && selectedClass) {
    const chartData = getPerformanceChartData()
    const perf = selectedStudent.performance

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {selectedStudent.name}
            </h1>
            <p className="text-muted-foreground">
              {selectedClass.name} • Roll No: {selectedStudent.roll}
            </p>
          </div>
        </div>

        {/* Student Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </span>
                </div>
                <p className="font-semibold">{selectedStudent.name}</p>
                <p className="text-sm text-muted-foreground">
                  Roll No: {selectedStudent.roll}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-3xl font-bold text-green-600">
                {selectedStudent.avgMarks}%
              </div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-3xl font-bold text-blue-600">
                {selectedStudent.attendance}
              </div>
              <p className="text-sm text-muted-foreground">Attendance</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-3xl font-bold text-purple-600">
                {selectedStudent.avgMarks >= 90
                  ? "A"
                  : selectedStudent.avgMarks >= 80
                  ? "B"
                  : selectedStudent.avgMarks >= 70
                  ? "C"
                  : selectedStudent.avgMarks >= 60
                  ? "D"
                  : "F"}
              </div>
              <p className="text-sm text-muted-foreground">Grade</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Marks progression throughout the year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="marks"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="Marks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exam-wise Performance</CardTitle>
              <CardDescription>Detailed marks breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="marks" fill="#82ca9d" name="Marks" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Marks Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Marks Record</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3">Exam</th>
                  <th className="text-left p-3">Marks Obtained</th>
                  <th className="text-left p-3">Total Marks</th>
                  <th className="text-left p-3">Percentage</th>
                  <th className="text-left p-3">Grade</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Unit Test 1", marks: perf.unit1, total: 100 },
                  { name: "Unit Test 2", marks: perf.unit2, total: 100 },
                  { name: "Mid Term Exam", marks: perf.midterm, total: 100 },
                  { name: "Unit Test 3", marks: perf.unit3, total: 100 },
                  { name: "Final Exam", marks: perf.final, total: 100 },
                ].map((exam, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="p-3 font-medium">{exam.name}</td>
                    <td className="p-3">{exam.marks}</td>
                    <td className="p-3">{exam.total}</td>
                    <td className="p-3">{exam.marks}%</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          exam.marks >= 90
                            ? "bg-green-100 text-green-800"
                            : exam.marks >= 80
                            ? "bg-blue-100 text-blue-800"
                            : exam.marks >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : exam.marks >= 60
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {exam.marks >= 90
                          ? "A"
                          : exam.marks >= 80
                          ? "B"
                          : exam.marks >= 70
                          ? "C"
                          : exam.marks >= 60
                          ? "D"
                          : "F"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          exam.marks >= 40
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {exam.marks >= 40 ? "Pass" : "Fail"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Teacher Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Teacher Notes & Remarks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Strengths:</strong>
              </p>
              <p className="text-sm">
                {selectedStudent.avgMarks >= 85
                  ? "Excellent performance. Shows great understanding of concepts. Active in class discussions."
                  : selectedStudent.avgMarks >= 70
                  ? "Good performance. Shows consistent effort. Could participate more in class."
                  : "Needs improvement. Extra attention required. Recommend additional practice."}
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Areas for Improvement:</strong>
              </p>
              <p className="text-sm">
                {selectedStudent.avgMarks >= 85
                  ? "Can take on more challenging problems. Consider participating in math olympiads."
                  : selectedStudent.avgMarks >= 70
                  ? "Focus on problem-solving techniques. Practice more complex problems."
                  : "Need to strengthen basics. Regular practice recommended. Consider extra classes."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

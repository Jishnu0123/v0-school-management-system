import { NextRequest, NextResponse } from 'next/server'

// Mock exams data
let exams = [
  { id: "1", title: "Mid-term Exam", class: "10", section: "A", subject: "Math", date: "2026-02-10", totalMarks: 100, notes: "Chapters 1-5" },
  { id: "2", title: "Mid-term Exam", class: "10", section: "A", subject: "Physics", date: "2026-02-12", totalMarks: 100, notes: "Chapters 1-4" },
  { id: "3", title: "Unit Test 1", class: "9", section: "A", subject: "English", date: "2026-01-28", totalMarks: 50, notes: "Grammar and Comprehension" },
]

let marks = [
  { id: "1", examId: "1", studentId: "S1001", studentName: "Aarav Sharma", marksObtained: 87, totalMarks: 100 },
  { id: "2", examId: "1", studentId: "S1002", studentName: "Priya Singh", marksObtained: 92, totalMarks: 100 },
  { id: "3", examId: "2", studentId: "S1001", studentName: "Aarav Sharma", marksObtained: 78, totalMarks: 100 },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get('type') // 'exams' or 'marks'
  const classFilter = searchParams.get('class')
  const examId = searchParams.get('examId')

  if (type === 'marks') {
    let filtered = marks
    if (examId) {
      filtered = filtered.filter(m => m.examId === examId)
    }
    return NextResponse.json(filtered)
  }

  let filtered = exams
  if (classFilter) {
    filtered = filtered.filter(e => e.class === classFilter)
  }

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const type = body.type // 'exam' or 'mark'

    if (type === 'mark') {
      const newMark = {
        id: String(marks.length + 1),
        ...body,
      }
      marks.push(newMark)
      return NextResponse.json(newMark, { status: 201 })
    }

    const newExam = {
      id: String(exams.length + 1),
      ...body,
    }
    exams.push(newExam)
    return NextResponse.json(newExam, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

// Mock attendance data
let attendanceRecords = [
  { id: "1", studentId: "S1001", studentName: "Aarav Sharma", class: "10", section: "A", date: "2026-01-22", status: "present" },
  { id: "2", studentId: "S1002", studentName: "Priya Singh", class: "10", section: "A", date: "2026-01-22", status: "present" },
  { id: "3", studentId: "S1003", studentName: "Rahul Verma", class: "10", section: "B", date: "2026-01-22", status: "absent" },
  { id: "4", studentId: "S1001", studentName: "Aarav Sharma", class: "10", section: "A", date: "2026-01-21", status: "present" },
  { id: "5", studentId: "S1002", studentName: "Priya Singh", class: "10", section: "A", date: "2026-01-21", status: "present" },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const classFilter = searchParams.get('class')
  const sectionFilter = searchParams.get('section')
  const date = searchParams.get('date')
  const studentId = searchParams.get('studentId')

  let filtered = attendanceRecords

  if (classFilter) {
    filtered = filtered.filter(r => r.class === classFilter)
  }

  if (sectionFilter) {
    filtered = filtered.filter(r => r.section === sectionFilter)
  }

  if (date) {
    filtered = filtered.filter(r => r.date === date)
  }

  if (studentId) {
    filtered = filtered.filter(r => r.studentId === studentId)
  }

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newRecords = body.records || [body]
    
    const addedRecords = newRecords.map((record: any) => ({
      id: String(attendanceRecords.length + 1),
      ...record,
      date: record.date || new Date().toISOString().split('T')[0],
    }))

    attendanceRecords.push(...addedRecords)
    return NextResponse.json(addedRecords, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

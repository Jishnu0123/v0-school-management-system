import { NextRequest, NextResponse } from 'next/server'

// Mock data storage (in production, this would be a database)
let students = [
  { id: "1", name: "Aarav Sharma", roll: "S1001", class: "10", section: "A", attendance: "95%", email: "aarav@school.gov", phone: "9876543210", address: "New Delhi" },
  { id: "2", name: "Priya Singh", roll: "S1002", class: "10", section: "A", attendance: "92%", email: "priya@school.gov", phone: "9876543211", address: "Mumbai" },
  { id: "3", name: "Rahul Verma", roll: "S1003", class: "10", section: "B", attendance: "89%", email: "rahul@school.gov", phone: "9876543212", address: "Bangalore" },
  { id: "4", name: "Ananya Reddy", roll: "S1004", class: "9", section: "A", attendance: "97%", email: "ananya@school.gov", phone: "9876543213", address: "Chennai" },
  { id: "5", name: "Arjun Patel", roll: "S1005", class: "9", section: "B", attendance: "91%", email: "arjun@school.gov", phone: "9876543214", address: "Ahmedabad" },
  { id: "6", name: "Diya Gupta", roll: "S1006", class: "10", section: "B", attendance: "94%", email: "diya@school.gov", phone: "9876543215", address: "Pune" },
  { id: "7", name: "Vivaan Kumar", roll: "S1007", class: "9", section: "A", attendance: "88%", email: "vivaan@school.gov", phone: "9876543216", address: "Kolkata" },
  { id: "8", name: "Isha Mehta", roll: "S1008", class: "10", section: "A", attendance: "96%", email: "isha@school.gov", phone: "9876543217", address: "Hyderabad" },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')
  const classFilter = searchParams.get('class')
  const sectionFilter = searchParams.get('section')

  let filteredStudents = students

  if (search) {
    filteredStudents = filteredStudents.filter(s => 
      s.name.toLowerCase().includes(search.toLowerCase()) || 
      s.roll.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (classFilter) {
    filteredStudents = filteredStudents.filter(s => s.class === classFilter)
  }

  if (sectionFilter) {
    filteredStudents = filteredStudents.filter(s => s.section === sectionFilter)
  }

  return NextResponse.json(filteredStudents)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newStudent = {
      id: String(students.length + 1),
      ...body,
    }
    students.push(newStudent)
    return NextResponse.json(newStudent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const index = students.findIndex(s => s.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }
    students[index] = { ...students[index], ...body }
    return NextResponse.json(students[index])
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const index = students.findIndex(s => s.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    students.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

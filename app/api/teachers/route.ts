import { NextRequest, NextResponse } from 'next/server'

// Mock data storage
let teachers = [
  { id: "1", name: "Meera Iyer", subjects: "Math, Physics", classes: "9-10", contact: "meera@school.gov", phone: "9876500001", experience: "12 years" },
  { id: "2", name: "Arun Nair", subjects: "English", classes: "8-10", contact: "arun@school.gov", phone: "9876500002", experience: "8 years" },
  { id: "3", name: "S. Kumar", subjects: "History", classes: "7-9", contact: "kumar@school.gov", phone: "9876500003", experience: "15 years" },
  { id: "4", name: "Priya Menon", subjects: "Chemistry", classes: "9-10", contact: "priya.m@school.gov", phone: "9876500004", experience: "10 years" },
  { id: "5", name: "Rajesh Sharma", subjects: "Biology", classes: "9-10", contact: "rajesh@school.gov", phone: "9876500005", experience: "7 years" },
  { id: "6", name: "Lakshmi Devi", subjects: "Computer Science", classes: "8-10", contact: "lakshmi@school.gov", phone: "9876500006", experience: "5 years" },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')

  let filteredTeachers = teachers

  if (search) {
    filteredTeachers = filteredTeachers.filter(t => 
      t.name.toLowerCase().includes(search.toLowerCase()) || 
      t.subjects.toLowerCase().includes(search.toLowerCase())
    )
  }

  return NextResponse.json(filteredTeachers)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newTeacher = {
      id: String(teachers.length + 1),
      ...body,
    }
    teachers.push(newTeacher)
    return NextResponse.json(newTeacher, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const index = teachers.findIndex(t => t.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }
    teachers[index] = { ...teachers[index], ...body }
    return NextResponse.json(teachers[index])
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

    const index = teachers.findIndex(t => t.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
    }

    teachers.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

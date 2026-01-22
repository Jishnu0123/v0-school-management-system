import { NextRequest, NextResponse } from 'next/server'

// Mock data storage
let announcements = [
  {
    id: "1",
    title: "PTM on Friday",
    body: "Parent-Teacher meeting at 2PM in the school auditorium. All parents are requested to attend.",
    audience: "Parents",
    date: "2026-01-24",
    createdBy: "Admin"
  },
  {
    id: "2",
    title: "Science Fair",
    body: "Project submissions by next week. Topics should be related to environmental science.",
    audience: "Students",
    date: "2026-01-30",
    createdBy: "Admin"
  },
  {
    id: "3",
    title: "Sports Day",
    body: "Annual sports day on February 5th. All students must participate.",
    audience: "Students",
    date: "2026-02-05",
    createdBy: "Admin"
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const audience = searchParams.get('audience')

  let filtered = announcements

  if (audience) {
    filtered = filtered.filter(a => a.audience === audience)
  }

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newAnnouncement = {
      id: String(announcements.length + 1),
      ...body,
      date: new Date().toISOString().split('T')[0],
    }
    announcements.unshift(newAnnouncement)
    return NextResponse.json(newAnnouncement, { status: 201 })
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

    const index = announcements.findIndex(a => a.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    }

    announcements.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

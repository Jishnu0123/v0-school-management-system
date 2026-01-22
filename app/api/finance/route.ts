import { NextResponse } from 'next/server'

// Mock fee data
let feeRecords = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Aarav Kumar',
    class: '10',
    section: 'A',
    totalFees: 12000,
    paidAmount: 8000,
    pendingAmount: 4000,
    dueDate: '2026-02-15',
    status: 'partial',
    transactions: [
      { id: 't1', amount: 5000, date: '2025-12-10', method: 'Online', receipt: 'REC001' },
      { id: 't2', amount: 3000, date: '2026-01-15', method: 'Cash', receipt: 'REC002' },
    ],
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Diya Sharma',
    class: '9',
    section: 'B',
    totalFees: 12000,
    paidAmount: 12000,
    pendingAmount: 0,
    dueDate: '2026-02-15',
    status: 'paid',
    transactions: [
      { id: 't3', amount: 12000, date: '2025-12-01', method: 'Online', receipt: 'REC003' },
    ],
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Arjun Patel',
    class: '8',
    section: 'A',
    totalFees: 12000,
    paidAmount: 0,
    pendingAmount: 12000,
    dueDate: '2026-01-31',
    status: 'overdue',
    transactions: [],
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Ananya Singh',
    class: '10',
    section: 'A',
    totalFees: 12000,
    paidAmount: 6000,
    pendingAmount: 6000,
    dueDate: '2026-02-28',
    status: 'partial',
    transactions: [
      { id: 't4', amount: 6000, date: '2026-01-10', method: 'Cheque', receipt: 'REC004' },
    ],
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'Ishaan Verma',
    class: '9',
    section: 'A',
    totalFees: 12000,
    paidAmount: 12000,
    pendingAmount: 0,
    dueDate: '2026-02-15',
    status: 'paid',
    transactions: [
      { id: 't5', amount: 6000, date: '2025-12-15', method: 'Online', receipt: 'REC005' },
      { id: 't6', amount: 6000, date: '2026-01-05', method: 'Online', receipt: 'REC006' },
    ],
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get('studentId')
  const classFilter = searchParams.get('class')
  const status = searchParams.get('status')

  let filtered = [...feeRecords]

  if (studentId) {
    filtered = filtered.filter((f) => f.studentId === studentId)
  }

  if (classFilter) {
    filtered = filtered.filter((f) => f.class === classFilter)
  }

  if (status) {
    filtered = filtered.filter((f) => f.status === status)
  }

  return NextResponse.json({ fees: filtered })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { action, ...data } = body

  if (action === 'payment') {
    // Add payment transaction
    const { feeId, amount, method } = data
    const feeRecord = feeRecords.find((f) => f.id === feeId)

    if (!feeRecord) {
      return NextResponse.json({ error: 'Fee record not found' }, { status: 404 })
    }

    const transaction = {
      id: `t${Date.now()}`,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      method,
      receipt: `REC${String(Date.now()).slice(-6)}`,
    }

    feeRecord.transactions.push(transaction)
    feeRecord.paidAmount += transaction.amount
    feeRecord.pendingAmount = feeRecord.totalFees - feeRecord.paidAmount

    // Update status
    if (feeRecord.pendingAmount === 0) {
      feeRecord.status = 'paid'
    } else if (feeRecord.paidAmount > 0) {
      feeRecord.status = 'partial'
    }

    return NextResponse.json({ success: true, feeRecord, receipt: transaction.receipt })
  }

  if (action === 'create') {
    // Create new fee record
    const newFee = {
      id: String(feeRecords.length + 1),
      ...data,
      paidAmount: 0,
      pendingAmount: data.totalFees,
      status: 'pending',
      transactions: [],
    }
    feeRecords.push(newFee)
    return NextResponse.json({ success: true, fee: newFee })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  const index = feeRecords.findIndex((f) => f.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Fee record not found' }, { status: 404 })
  }

  feeRecords[index] = { ...feeRecords[index], ...updates }
  return NextResponse.json({ success: true, fee: feeRecords[index] })
}

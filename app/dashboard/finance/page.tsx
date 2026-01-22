"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  FileText,
} from "lucide-react"
import { dummyFeeRequests, dummyStudents } from "@/lib/dummy-data"

type FeeRecord = {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  totalFees: number
  paidAmount: number
  pendingAmount: number
  dueDate: string
  status: 'paid' | 'partial' | 'pending' | 'overdue'
  transactions: Array<{
    id: string
    amount: number
    date: string
    method: string
    receipt: string
  }>
}

type FeeRequest = {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  type: string
  amount: number
  reason: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function FinancePage() {
  const [role, setRole] = useState<string>('admin')
  const [fees, setFees] = useState<FeeRecord[]>([])
  const [feeRequests, setFeeRequests] = useState<FeeRequest[]>(dummyFeeRequests)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestForm, setRequestForm] = useState({
    type: 'discount_request',
    amount: '',
    reason: '',
  })
  const [requestStatusFilter, setRequestStatusFilter] = useState('all')

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'admin'
    setRole(savedRole)
    fetchFees()
  }, [])

  const fetchFees = async () => {
    try {
      const res = await fetch('/api/finance')
      const data = await res.json()
      setFees(data.fees || [])
    } catch (error) {
      console.error('Failed to fetch fees:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!selectedFee || !paymentAmount) return

    try {
      const res = await fetch('/api/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'payment',
          feeId: selectedFee.id,
          amount: parseFloat(paymentAmount),
          method: paymentMethod,
        }),
      })

      const data = await res.json()
      if (data.success) {
        alert(`Payment successful! Receipt: ${data.receipt}`)
        fetchFees()
        setSelectedFee(null)
        setPaymentAmount('')
      }
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    }
  }

  const handleSubmitRequest = async () => {
    if (!requestForm.amount || !requestForm.reason) {
      alert('Please fill all fields')
      return
    }

    const newRequest: FeeRequest = {
      id: String(feeRequests.length + 1),
      studentId: '1',
      studentName: 'Student Name',
      class: '10',
      section: 'A',
      type: requestForm.type,
      amount: parseFloat(requestForm.amount),
      reason: requestForm.reason,
      date: new Date().toLocaleDateString(),
      status: 'pending',
    }

    setFeeRequests([...feeRequests, newRequest])
    setRequestForm({ type: 'discount_request', amount: '', reason: '' })
    setShowRequestForm(false)
    alert('Request submitted successfully!')
  }

  const handleUpdateRequestStatus = (requestId: string, status: 'approved' | 'rejected') => {
    setFeeRequests(
      feeRequests.map((req) =>
        req.id === requestId ? { ...req, status } : req
      )
    )
  }

  const filteredFees = fees.filter((fee) => {
    const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = classFilter === 'all' || fee.class === classFilter
    const matchesStatus = statusFilter === 'all' || fee.status === statusFilter
    return matchesSearch && matchesClass && matchesStatus
  })

  const filteredRequests = feeRequests.filter((req) =>
    requestStatusFilter === 'all' ? true : req.status === requestStatusFilter
  )

  const totalCollected = fees.reduce((sum, fee) => sum + fee.paidAmount, 0)
  const totalPending = fees.reduce((sum, fee) => sum + fee.pendingAmount, 0)
  const totalFees = fees.reduce((sum, fee) => sum + fee.totalFees, 0)

  if (loading) {
    return <div className="p-8 text-center">Loading finance data...</div>
  }

  // Student View - Fee Status (View Only)
  if (role === 'student') {
    const studentFee = fees[0]
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <DollarSign className="w-8 h-8" />
            My Fee Status
          </h1>
          <p className="text-muted-foreground mt-1">View your fee payment details and receipts</p>
        </div>

        {/* View Only Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">View Only Access</h3>
                <p className="text-sm text-blue-700 mt-1">
                  You can view your fee status and download receipts. For payments, please contact your parent/guardian.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {studentFee ? (
          <>
            {/* Fee Status Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{studentFee.totalFees.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">Academic Year 2025-26</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₹{studentFee.paidAmount.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round((studentFee.paidAmount / studentFee.totalFees) * 100)}% Completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
                  <AlertCircle className={`h-4 w-4 ${studentFee.pendingAmount > 0 ? 'text-orange-600' : 'text-green-600'}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${studentFee.pendingAmount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    ₹{studentFee.pendingAmount.toLocaleString()}
                  </div>
                  {studentFee.pendingAmount > 0 ? (
                    <p className="text-xs text-muted-foreground mt-1">Due: {studentFee.dueDate}</p>
                  ) : (
                    <p className="text-xs text-green-600 mt-1">Fully Paid</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payment Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Payment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-semibold">Overall Status</p>
                      <p className="text-sm text-muted-foreground">Academic Year 2025-26</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-semibold ${
                      studentFee.status === 'paid' ? 'bg-green-100 text-green-700' :
                      studentFee.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                      studentFee.status === 'overdue' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {studentFee.status === 'paid' ? '✓ PAID' :
                       studentFee.status === 'partial' ? 'PARTIAL' :
                       studentFee.status === 'overdue' ? 'OVERDUE' :
                       'PENDING'}
                    </span>
                  </div>

                  {studentFee.pendingAmount > 0 && (
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                      <p className="font-semibold text-orange-900">Pending Payment</p>
                      <p className="text-sm text-orange-700 mt-1">
                        You have ₹{studentFee.pendingAmount.toLocaleString()} pending. 
                        Please ask your parent/guardian to make the payment before {studentFee.dueDate}.
                      </p>
                    </div>
                  )}

                  {studentFee.pendingAmount === 0 && (
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
                      <p className="font-semibold text-green-900">✓ All Fees Paid</p>
                      <p className="text-sm text-green-700 mt-1">
                        Your fees for the academic year have been paid in full. Thank you!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment History with Receipts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Payment History & Receipts
                </CardTitle>
                <CardDescription>View and download your payment receipts</CardDescription>
              </CardHeader>
              <CardContent>
                {studentFee.transactions.length > 0 ? (
                  <div className="space-y-3">
                    {studentFee.transactions.map((txn) => (
                      <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">₹{txn.amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">
                              {txn.date} • {txn.method.charAt(0).toUpperCase() + txn.method.slice(1)} Payment
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Receipt No: {txn.receipt}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            alert(`Downloading receipt: ${txn.receipt}\nAmount: ₹${txn.amount}\nDate: ${txn.date}`)
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Receipt
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No payment history available</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Payment receipts will appear here once payments are made
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Fee Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Breakdown</CardTitle>
                <CardDescription>Detailed fee structure for current academic year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Tuition Fee</span>
                    <span className="font-semibold">₹{Math.round(studentFee.totalFees * 0.6).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Library Fee</span>
                    <span className="font-semibold">₹{Math.round(studentFee.totalFees * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Sports Fee</span>
                    <span className="font-semibold">₹{Math.round(studentFee.totalFees * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Lab Fee</span>
                    <span className="font-semibold">₹{Math.round(studentFee.totalFees * 0.15).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Miscellaneous</span>
                    <span className="font-semibold">₹{Math.round(studentFee.totalFees * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 mt-2">
                    <span className="font-bold">Total Fees</span>
                    <span className="font-bold text-lg">₹{studentFee.totalFees.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No fee records found for your account</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Please contact the administration office for assistance
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // Parent View - Make Payment
  if (role === 'parent') {
    const childFee = fees[0]
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <CreditCard className="w-8 h-8" />
            Fee Payment
          </h1>
          <p className="text-muted-foreground mt-1">Pay your child's school fees</p>
        </div>

        {childFee ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Fee Details - {childFee.studentName}</CardTitle>
                <CardDescription>Class {childFee.class}-{childFee.section}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label className="text-muted-foreground">Total Fees</Label>
                    <p className="text-2xl font-bold">₹{childFee.totalFees.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Paid</Label>
                    <p className="text-2xl font-bold text-green-600">₹{childFee.paidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Pending</Label>
                    <p className="text-2xl font-bold text-orange-600">₹{childFee.pendingAmount.toLocaleString()}</p>
                  </div>
                </div>

                {childFee.pendingAmount > 0 && (
                  <div className="border-t pt-4 space-y-4">
                    <h3 className="font-semibold">Make Payment</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Payment Amount</Label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          max={childFee.pendingAmount}
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum: ₹{childFee.pendingAmount.toLocaleString()}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online Payment</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="netbanking">Net Banking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={() => {
                          setSelectedFee(childFee)
                          handlePayment()
                        }}
                        className="w-full"
                        disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay ₹{paymentAmount || '0'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                {childFee.transactions.length > 0 ? (
                  <div className="space-y-3">
                    {childFee.transactions.map((txn) => (
                      <div key={txn.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">₹{txn.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{txn.date} • {txn.method}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Receipt: {txn.receipt}</p>
                          <Button variant="ghost" size="sm" className="mt-1">
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No payment history</p>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No fee records found for your child</p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // Admin View - Finance Monitoring & Fee Requests Management
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <DollarSign className="w-8 h-8" />
          Finance Monitoring
        </h1>
        <p className="text-muted-foreground mt-1">Monitor fee collection and manage fee requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{fees.length} students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalFees > 0 ? Math.round((totalCollected / totalFees) * 100) : 0}% collected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {fees.filter((f) => f.status !== 'paid').length} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {feeRequests.filter((r) => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Fee requests to review</p>
          </CardContent>
        </Card>
      </div>

      {/* Fee Requests Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Fee Requests & Discounts
          </CardTitle>
          <CardDescription>Manage student requests for discounts, waivers, and payment plans</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={requestStatusFilter} onValueChange={setRequestStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredRequests.length > 0 ? (
            <div className="space-y-3">
              {filteredRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{request.studentName}</h4>
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          Class {request.class}-{request.section}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          request.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {request.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Type:</strong> {request.type.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Amount:</strong> ₹{request.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Reason:</strong> {request.reason}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Submitted: {request.date}</p>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleUpdateRequestStatus(request.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No {requestStatusFilter === 'all' ? 'requests' : requestStatusFilter + ' requests'} found</p>
          )}
        </CardContent>
      </Card>

      {/* Fee Records Section */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Collection Status</CardTitle>
          <CardDescription>{filteredFees.length} records found</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Search Student</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredFees.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3">Student Name</th>
                    <th className="text-left p-3">Class</th>
                    <th className="text-left p-3">Total Fees</th>
                    <th className="text-left p-3">Paid</th>
                    <th className="text-left p-3">Pending</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFees.map((fee) => (
                    <tr key={fee.id} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="p-3 font-medium">{fee.studentName}</td>
                      <td className="p-3">{fee.class}-{fee.section}</td>
                      <td className="p-3">₹{fee.totalFees.toLocaleString()}</td>
                      <td className="p-3 text-green-600 font-medium">₹{fee.paidAmount.toLocaleString()}</td>
                      <td className="p-3 text-orange-600 font-medium">₹{fee.pendingAmount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          fee.status === 'paid' ? 'bg-green-100 text-green-700' :
                          fee.status === 'partial' ? 'bg-blue-100 text-blue-700' :
                          fee.status === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {fee.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground text-center py-4">No fee records found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

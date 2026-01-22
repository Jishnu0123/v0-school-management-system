"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Download, FileText, Search, Plus } from "lucide-react"

type Certificate = {
  id: string
  studentId: string
  studentName: string
  class: string
  section: string
  type: 'achievement' | 'participation' | 'completion' | 'merit'
  title: string
  description: string
  issueDate: string
  issuedBy: string
}

const mockCertificates: Certificate[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Aarav Kumar',
    class: '10',
    section: 'A',
    type: 'achievement',
    title: 'Academic Excellence Award',
    description: 'For outstanding performance in annual examinations 2025-26',
    issueDate: '2026-01-15',
    issuedBy: 'Principal',
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Diya Sharma',
    class: '9',
    section: 'B',
    type: 'participation',
    title: 'Science Fair Participation',
    description: 'For active participation in Annual Science Exhibition',
    issueDate: '2026-01-10',
    issuedBy: 'Science Department',
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Arjun Patel',
    class: '8',
    section: 'A',
    type: 'merit',
    title: 'Merit Certificate',
    description: 'For achieving 95% in Mathematics',
    issueDate: '2026-01-20',
    issuedBy: 'Mathematics Department',
  },
]

export default function CertificatesPage() {
  const [role, setRole] = useState<string>('admin')
  const [studentId, setStudentId] = useState<string>('')
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'admin'
    const savedStudentId = localStorage.getItem('studentId') || '1'
    setRole(savedRole)
    setStudentId(savedStudentId)
  }, [])

  const generateCertificatePDF = (cert: Certificate) => {
    // Create a certificate HTML document
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Certificate - ${cert.studentName}</title>
        <style>
          @page { size: A4 landscape; margin: 0; }
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .certificate {
            background: white;
            padding: 60px;
            border: 20px solid #f0a500;
            border-radius: 20px;
            max-width: 900px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            position: relative;
          }
          .certificate::before {
            content: '';
            position: absolute;
            top: 30px;
            left: 30px;
            right: 30px;
            bottom: 30px;
            border: 3px solid #ddd;
            border-radius: 10px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            font-size: 60px;
            color: #f0a500;
            margin-bottom: 10px;
          }
          .school-name {
            font-size: 32px;
            font-weight: bold;
            color: #333;
            margin: 10px 0;
          }
          .cert-title {
            font-size: 48px;
            color: #667eea;
            margin: 30px 0;
            text-transform: uppercase;
            letter-spacing: 3px;
          }
          .cert-type {
            display: inline-block;
            padding: 8px 20px;
            background: ${cert.type === 'achievement' ? '#fbbf24' : cert.type === 'participation' ? '#3b82f6' : cert.type === 'merit' ? '#8b5cf6' : '#10b981'};
            color: white;
            border-radius: 20px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .content {
            text-align: center;
            margin: 40px 0;
            line-height: 2;
          }
          .student-name {
            font-size: 42px;
            font-weight: bold;
            color: #667eea;
            border-bottom: 3px solid #f0a500;
            display: inline-block;
            padding: 10px 30px;
            margin: 20px 0;
          }
          .description {
            font-size: 20px;
            color: #555;
            margin: 30px auto;
            max-width: 700px;
          }
          .class-info {
            font-size: 18px;
            color: #666;
            margin: 20px 0;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            margin-top: 60px;
            padding-top: 30px;
            border-top: 2px solid #ddd;
          }
          .signature {
            text-align: center;
          }
          .signature-line {
            width: 200px;
            border-top: 2px solid #333;
            margin: 40px auto 10px;
          }
          .signature-name {
            font-weight: bold;
            color: #333;
          }
          .signature-title {
            color: #666;
            font-size: 14px;
          }
          .date {
            text-align: right;
            color: #666;
          }
          .seal {
            position: absolute;
            bottom: 80px;
            left: 80px;
            width: 120px;
            height: 120px;
            border: 5px solid #f0a500;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(240, 165, 0, 0.1);
            font-size: 14px;
            font-weight: bold;
            color: #f0a500;
            text-align: center;
            transform: rotate(-15deg);
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="seal">SCHOOL<br/>SEAL</div>
          <div class="header">
            <div class="logo">🏫</div>
            <div class="school-name">Government School</div>
            <div style="color: #666; margin-top: 5px;">Ministry of Education</div>
            <div style="margin-top: 20px;">
              <span class="cert-type">${cert.type}</span>
            </div>
          </div>
          
          <h1 class="cert-title">Certificate of ${cert.type}</h1>
          
          <div class="content">
            <div style="font-size: 20px; color: #555;">This is to certify that</div>
            <div class="student-name">${cert.studentName}</div>
            <div class="class-info">Class ${cert.class}-${cert.section} • Roll No: ${cert.studentId}</div>
            <div class="description">${cert.description}</div>
            <div style="font-size: 22px; color: #667eea; margin-top: 30px; font-weight: bold;">${cert.title}</div>
          </div>
          
          <div class="footer">
            <div class="signature">
              <div class="signature-line"></div>
              <div class="signature-name">${cert.issuedBy}</div>
              <div class="signature-title">Authorized Signatory</div>
            </div>
            <div class="date">
              <div style="font-weight: bold; color: #333;">Issue Date</div>
              <div style="font-size: 18px; margin-top: 10px;">${new Date(cert.issueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div style="margin-top: 5px; font-size: 12px;">Certificate ID: ${cert.id.toUpperCase().padStart(8, '0')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
    
    // Open in new window for printing/saving as PDF
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(certificateHTML)
      printWindow.document.close()
      
      // Trigger print dialog after content loads
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || cert.type === typeFilter
    const matchesStudent = role === 'student' ? cert.studentId === studentId : true
    return matchesSearch && matchesType && matchesStudent
  })

  const getCertificateColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'participation': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'completion': return 'bg-green-100 text-green-700 border-green-300'
      case 'merit': return 'bg-purple-100 text-purple-700 border-purple-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Award className="w-8 h-8" />
            Certificates
          </h1>
          <p className="text-muted-foreground mt-1">
            {role === 'admin' ? 'Manage and issue student certificates' : 'View your certificates'}
          </p>
        </div>
        {role === 'admin' && (
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Issue Certificate
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{role === 'student' ? 'My Certificates' : 'Total Certificates'}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{role === 'student' ? certificates.filter(c => c.studentId === studentId).length : certificates.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievement</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {role === 'student' ? certificates.filter(c => c.studentId === studentId && c.type === 'achievement').length : certificates.filter(c => c.type === 'achievement').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participation</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {role === 'student' ? certificates.filter(c => c.studentId === studentId && c.type === 'participation').length : certificates.filter(c => c.type === 'participation').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Merit</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {role === 'student' ? certificates.filter(c => c.studentId === studentId && c.type === 'merit').length : certificates.filter(c => c.type === 'merit').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Search Student or Certificate</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {role === 'admin' ? 'Search to view certificates' : 'Search your certificates'}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Certificate Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="participation">Participation</SelectItem>
                  <SelectItem value="completion">Completion</SelectItem>
                  <SelectItem value="merit">Merit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  if (filteredCertificates.length > 0) {
                    alert(`Preparing ${filteredCertificates.length} certificate(s) for download. Each will open in a new tab.`)
                    filteredCertificates.forEach((cert, index) => {
                      setTimeout(() => generateCertificatePDF(cert), index * 500)
                    })
                  }
                }}
                disabled={filteredCertificates.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Download All ({filteredCertificates.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Show certificates only if search term exists for admin, or always for students */}
      {(role !== 'admin' || searchTerm.trim().length > 0) ? (
        <>
          {/* Certificates Grid */}
          {filteredCertificates.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((cert) => (
                <Card key={cert.id} className={`border-2 ${getCertificateColor(cert.type)}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Award className="w-8 h-8 mb-2" />
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                        {cert.type.toUpperCase()}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <CardDescription className="text-foreground/70">{cert.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Student:</span>
                        <span>{cert.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Class:</span>
                        <span>{cert.class}-{cert.section}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Issue Date:</span>
                        <span>{cert.issueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Issued By:</span>
                        <span>{cert.issuedBy}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => generateCertificatePDF(cert)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No certificates found matching your search</p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="py-12">
            <div className="text-center">
              <Search className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-blue-900 mb-2">Search to View Certificates</h3>
              <p className="text-blue-700">
                Enter a student name or certificate title in the search box above to view certificates
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Certificate Modal */}
      {showCreateModal && role === 'admin' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Design & Issue Certificate</CardTitle>
              <CardDescription>Create a new certificate for a student</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Student Name</Label>
                <Input placeholder="Enter student name" id="certStudentName" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Student ID</Label>
                  <Input placeholder="e.g., 101" id="certStudentId" />
                </div>

                <div className="space-y-2">
                  <Label>Class & Section</Label>
                  <div className="flex gap-2">
                    <Input placeholder="10" id="certClass" className="w-1/2" />
                    <Input placeholder="A" id="certSection" className="w-1/2" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Certificate Type</Label>
                <Select>
                  <SelectTrigger id="certType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="achievement">🏆 Achievement</SelectItem>
                    <SelectItem value="participation">🎯 Participation</SelectItem>
                    <SelectItem value="completion">✅ Completion</SelectItem>
                    <SelectItem value="merit">⭐ Merit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Certificate Title</Label>
                <Input placeholder="e.g., Academic Excellence Award" id="certTitle" />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input placeholder="e.g., For outstanding performance in..." id="certDesc" />
              </div>

              <div className="space-y-2">
                <Label>Issued By</Label>
                <Select>
                  <SelectTrigger id="certIssuedBy">
                    <SelectValue placeholder="Select authority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Vice Principal">Vice Principal</SelectItem>
                    <SelectItem value="Head of Department">Head of Department</SelectItem>
                    <SelectItem value="Class Teacher">Class Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => {
                  const newCert: Certificate = {
                    id: String(certificates.length + 1),
                    studentId: (document.getElementById('certStudentId') as HTMLInputElement)?.value || '0',
                    studentName: (document.getElementById('certStudentName') as HTMLInputElement)?.value || 'Student Name',
                    class: (document.getElementById('certClass') as HTMLInputElement)?.value || '10',
                    section: (document.getElementById('certSection') as HTMLInputElement)?.value || 'A',
                    type: ((document.getElementById('certType') as HTMLSelectElement)?.value || 'achievement') as any,
                    title: (document.getElementById('certTitle') as HTMLInputElement)?.value || 'Certificate',
                    description: (document.getElementById('certDesc') as HTMLInputElement)?.value || 'For excellent performance',
                    issueDate: new Date().toISOString().split('T')[0],
                    issuedBy: ((document.getElementById('certIssuedBy') as HTMLSelectElement)?.value || 'Principal'),
                  }
                  setCertificates([...certificates, newCert])
                  setShowCreateModal(false)
                  alert(`Certificate issued successfully! You can now search for "${newCert.studentName}" to view and download it.`)
                }}>
                  <Award className="w-4 h-4 mr-2" />
                  Issue Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

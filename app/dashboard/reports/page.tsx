"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileText, Download, FileSpreadsheet, Calendar } from "lucide-react"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("attendance")
  const [classFilter, setClassFilter] = useState("all")
  const [format, setFormat] = useState("pdf")

  const handleDownload = (type: string, format: string) => {
    // Simulate download
    const filename = `${type}-report-${new Date().toISOString().split('T')[0]}.${format}`
    alert(`Downloading ${filename}...\n\nThis is a demo. In production, this would generate and download a real ${format.toUpperCase()} file.`)
  }

  const generateReport = () => {
    handleDownload(reportType, format)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate Custom Report
          </CardTitle>
          <CardDescription>Select report parameters and download in your preferred format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="students">Student List</SelectItem>
                  <SelectItem value="teachers">Teacher List</SelectItem>
                  <SelectItem value="exams">Exam Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Class Filter</Label>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={generateReport} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Generate & Download Report
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              Attendance Reports
            </CardTitle>
            <CardDescription>Daily, weekly, or monthly attendance summaries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={() => handleDownload('attendance-daily', 'pdf')} className="flex-1">
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button onClick={() => handleDownload('attendance-daily', 'csv')} variant="outline" className="flex-1">
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                CSV
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Includes class-wise and student-wise attendance data
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-secondary" />
              Performance Reports
            </CardTitle>
            <CardDescription>Subject-wise performance and grade distributions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={() => handleDownload('performance', 'pdf')} className="flex-1">
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button onClick={() => handleDownload('performance', 'csv')} variant="outline" className="flex-1">
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                CSV
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Academic performance analysis with charts
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileSpreadsheet className="w-5 h-5 text-accent" />
              Student Lists
            </CardTitle>
            <CardDescription>Export student data by class or section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={() => handleDownload('students', 'pdf')} className="flex-1">
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button onClick={() => handleDownload('students', 'xlsx')} variant="outline" className="flex-1">
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                Excel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Complete student directory with contact info
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-chart-1" />
              Teacher Directory
            </CardTitle>
            <CardDescription>Staff information and subject assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={() => handleDownload('teachers', 'pdf')} className="flex-1">
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button onClick={() => handleDownload('teachers', 'csv')} variant="outline" className="flex-1">
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                CSV
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Teaching staff details with subjects
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-chart-2" />
              Exam Schedule
            </CardTitle>
            <CardDescription>Upcoming exams and test calendars</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={() => handleDownload('exam-schedule', 'pdf')} className="flex-1">
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button onClick={() => handleDownload('exam-schedule', 'csv')} variant="outline" className="flex-1">
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                CSV
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Exam timetables and important dates
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-chart-3" />
              Result Cards
            </CardTitle>
            <CardDescription>Individual student result cards and certificates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button onClick={() => handleDownload('results', 'pdf')} className="flex-1">
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button onClick={() => handleDownload('results', 'xlsx')} variant="outline" className="flex-1">
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                Excel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Printable report cards with marks
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

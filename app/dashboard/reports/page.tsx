import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Download daily, weekly, or monthly attendance summaries.</p>
          <div className="flex gap-2">
            <Button>Download PDF</Button>
            <Button variant="outline">Download CSV</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Subject-wise performance and overall grade distributions.</p>
          <div className="flex gap-2">
            <Button>Download PDF</Button>
            <Button variant="outline">Download CSV</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Student Lists</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Export student lists by class, section, or entire school.</p>
          <div className="flex gap-2">
            <Button>Download PDF</Button>
            <Button variant="outline">Download CSV</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

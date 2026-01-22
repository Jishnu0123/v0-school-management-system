"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const rows = [
  { name: "Aarav Sharma", roll: "S1001", class: "10", section: "A", attendance: "95%" },
  { name: "Priya Singh", roll: "S1002", class: "10", section: "A", attendance: "92%" },
  { name: "Rahul Verma", roll: "S1003", class: "10", section: "B", attendance: "89%" },
]

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-balance">Students</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Search students..." className="w-48" />
            <Button variant="outline">Edit</Button>
            <Button variant="destructive">Delete</Button>
            <Button>Add Student</Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Roll No</th>
                <th className="text-left p-3">Class</th>
                <th className="text-left p-3">Section</th>
                <th className="text-left p-3">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.roll} className="border-b last:border-0">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.roll}</td>
                  <td className="p-3">{r.class}</td>
                  <td className="p-3">{r.section}</td>
                  <td className="p-3">{r.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

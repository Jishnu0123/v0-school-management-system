"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const rows = [
  { name: "Meera Iyer", subjects: "Math, Physics", classes: "9-10", contact: "meera@school.gov" },
  { name: "Arun Nair", subjects: "English", classes: "8-10", contact: "arun@school.gov" },
  { name: "S. Kumar", subjects: "History", classes: "7-9", contact: "kumar@school.gov" },
]

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-balance">Teachers</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Search teachers..." className="w-48" />
            <Button variant="outline">Edit</Button>
            <Button variant="destructive">Delete</Button>
            <Button>Add Teacher</Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Subjects</th>
                <th className="text-left p-3">Classes</th>
                <th className="text-left p-3">Contact</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-b last:border-0">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.subjects}</td>
                  <td className="p-3">{r.classes}</td>
                  <td className="p-3">{r.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

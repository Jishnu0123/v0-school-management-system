"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AttendanceTrend } from "@/components/charts/attendance-trend"

const students = [
  { name: "Aarav Sharma", roll: "S1001" },
  { name: "Priya Singh", roll: "S1002" },
  { name: "Rahul Verma", roll: "S1003" },
]

export default function AttendancePage() {
  const [cls, setCls] = useState("10")
  const [section, setSection] = useState("A")
  const [present, setPresent] = useState<Record<string, boolean>>({})

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-40">
              <Select value={cls} onValueChange={setCls}>
                <SelectTrigger>
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-32">
              <Select value={section} onValueChange={setSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Save Attendance</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3">Roll</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Present</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.roll} className="border-b last:border-0">
                    <td className="p-3">{s.roll}</td>
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        aria-label={`Mark ${s.name} present`}
                        className="size-4 accent-[var(--color-primary)]"
                        checked={!!present[s.roll]}
                        onChange={(e) => setPresent((p) => ({ ...p, [s.roll]: e.target.checked }))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AttendanceTrend />
    </div>
  )
}

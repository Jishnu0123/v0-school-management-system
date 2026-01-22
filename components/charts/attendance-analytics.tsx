"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AttendanceAnalyticsProps {
  presentDays: number
  absentDays: number
  title?: string
}

export function AttendanceAnalytics({ presentDays, absentDays, title = 'Attendance Analytics (2026)' }: AttendanceAnalyticsProps) {
  const total = presentDays + absentDays
  const presentPercentage = total > 0 ? Math.round((presentDays / total) * 100) : 0
  const absentPercentage = total > 0 ? Math.round((absentDays / total) * 100) : 0

  const data = [
    { name: 'Present', value: presentDays, percentage: presentPercentage },
    { name: 'Absent', value: absentDays, percentage: absentPercentage },
  ]

  const COLORS = ['#10b981', '#ef4444']

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  color: "var(--color-popover-foreground)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
                formatter={(value: any, name: any, props: any) => [
                  `${value} days`,
                  props.payload.name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-muted-foreground text-xs">Present Days</p>
            <p className="text-lg font-bold text-green-600">{presentDays}</p>
            <p className="text-xs text-green-600">{presentPercentage}%</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-muted-foreground text-xs">Absent Days</p>
            <p className="text-lg font-bold text-red-600">{absentDays}</p>
            <p className="text-xs text-red-600">{absentPercentage}%</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-muted-foreground text-xs">Total Days</p>
            <p className="text-lg font-bold text-blue-600">{total}</p>
            <p className="text-xs text-blue-600">100%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

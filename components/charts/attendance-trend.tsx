"use client"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { day: "Mon", pct: 92 },
  { day: "Tue", pct: 94 },
  { day: "Wed", pct: 91 },
  { day: "Thu", pct: 95 },
  { day: "Fri", pct: 93 },
]

interface AttendanceTrendProps {
  title?: string
}

export function AttendanceTrend({ title = 'Attendance Trend' }: AttendanceTrendProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                color: "var(--color-popover-foreground)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="pct" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

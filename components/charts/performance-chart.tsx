"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { subject: "Math", avg: 78 },
  { subject: "Science", avg: 82 },
  { subject: "English", avg: 74 },
  { subject: "History", avg: 80 },
  { subject: "Geography", avg: 76 },
]

interface PerformanceChartProps {
  title?: string
}

export function PerformanceChart({ title = 'Performance by Subject' }: PerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" />
            <XAxis dataKey="subject" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                color: "var(--color-popover-foreground)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="avg" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

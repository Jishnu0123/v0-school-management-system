import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MetricCard({
  title,
  value,
  hint,
}: {
  title: string
  value: string | number
  hint?: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {hint ? <div className="text-xs text-muted-foreground mt-1">{hint}</div> : null}
      </CardContent>
    </Card>
  )
}

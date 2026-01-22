"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<string>("admin")

  const handleLogin = () => {
    // Store role in localStorage
    localStorage.setItem('userRole', role)
    // Redirect to dashboard with role parameter
    router.push(`/dashboard?role=${role}`)
  }

  const speak = () => {
    try {
      const utter = new SpeechSynthesisUtterance(
        "This is the login page. Enter your email, password, and select your role. You can also say: Go to dashboard, to continue in demo mode.",
      )
      speechSynthesis.cancel()
      speechSynthesis.speak(utter)
    } catch {}
  }

  const voiceAssist = () => {
    const Rec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!Rec) {
      alert("Speech recognition not supported in this browser.")
      return
    }
    const rec = new Rec()
    rec.lang = "en-US"
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript?.toLowerCase?.() || ""
      if (t.includes("go to dashboard")) {
        localStorage.setItem('userRole', 'admin')
        window.location.href = "/dashboard"
      }
    }
    rec.start()
  }

  return (
    <main className="min-h-dvh flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-balance">School Management Login</CardTitle>
          <CardDescription>Sign in with your email and role to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@school.gov" defaultValue="admin@school.gov" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" defaultValue="password" />
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
          <div className="flex items-center justify-between pt-1">
            <Button variant="outline" size="sm" onClick={speak} aria-label="Screen reader help">
              Accessibility help
            </Button>
            <Button variant="secondary" size="sm" onClick={voiceAssist} aria-label="Voice assistance">
              Voice assistance
            </Button>
          </div>
          <div className="text-center pt-2">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

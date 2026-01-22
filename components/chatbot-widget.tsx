"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Mic, Send, Volume2, X, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

type Msg = { role: "user" | "assistant"; content: string }

export default function ChatbotWidget({ startOpen = false }: { startOpen?: boolean }) {
  const [open, setOpen] = useState(startOpen)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help with navigation and school management tasks. Try: 'Go to students', 'Go to attendance', 'Go to finance', 'Go to certificates', 'Go to reports', or ask a question.",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [recognizing, setRecognizing] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const router = useRouter()
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const speak = (text: string) => {
    try {
      const utter = new SpeechSynthesisUtterance(text)
      speechSynthesis.cancel()
      speechSynthesis.speak(utter)
      setSpeaking(true)
      utter.onend = () => setSpeaking(false)
    } catch {}
  }

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content) return
    setMessages((m) => [...m, { role: "user", content }])
    setInput("")
    const lower = content.toLowerCase()

    // Navigation commands
    if (lower.includes("go to students")) {
      router.push("/dashboard/students")
      const msg = "Navigating to Students page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to teachers")) {
      router.push("/dashboard/teachers")
      const msg = "Navigating to Teachers page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to attendance")) {
      router.push("/dashboard/attendance")
      const msg = "Navigating to Attendance page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to exams") || lower.includes("go to marks")) {
      router.push("/dashboard/exams")
      const msg = "Navigating to Exams and Marks page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to finance") || lower.includes("go to fees")) {
      router.push("/dashboard/finance")
      const msg = "Navigating to Finance page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to certificate")) {
      router.push("/dashboard/certificates")
      const msg = "Navigating to Certificates page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to reports")) {
      router.push("/dashboard/reports")
      const msg = "Navigating to Reports page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to announcements")) {
      router.push("/dashboard/announcements")
      const msg = "Navigating to Announcements page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to profile")) {
      router.push("/dashboard/profile")
      const msg = "Navigating to Profile page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to settings")) {
      router.push("/dashboard/settings")
      const msg = "Navigating to Settings page."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }
    if (lower.includes("go to dashboard") || lower.includes("go to home")) {
      router.push("/dashboard")
      const msg = "Navigating to Dashboard."
      setMessages((m) => [...m, { role: "assistant", content: msg }])
      speak(msg)
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      })
      const data = await res.json().catch(() => ({}))
      const textResp = data?.text || "I couldn't process that right now. Please try again later."
      setMessages((m) => [...m, { role: "assistant", content: textResp }])
      speak(textResp)
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "There was an error reaching the assistant." }])
    } finally {
      setLoading(false)
    }
  }

  const handleVoice = () => {
    const Rec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!Rec) {
      setMessages((m) => [...m, { role: "assistant", content: "Speech recognition not supported in this browser." }])
      return
    }
    const rec = new Rec()
    rec.lang = "en-US"
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript
      handleSend(transcript)
    }
    rec.onend = () => setRecognizing(false)
    rec.onerror = () => setRecognizing(false)
    setRecognizing(true)
    rec.start()
  }

  return (
    <>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          size="icon"
          className="fixed bottom-4 right-4 rounded-full h-12 w-12"
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}

      <div
        className={cn(
          "fixed bottom-4 right-4 w-[min(100vw-1rem,360px)] transition-all",
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
        role="dialog"
        aria-label="AI Assistant"
      >
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-sm">AI Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="h-64 overflow-y-auto rounded-md border p-2 bg-muted/30">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "mb-2 max-w-[85%] rounded-md px-2 py-1 text-sm",
                    m.role === "user" ? "ml-auto bg-primary/15" : "mr-auto bg-secondary",
                  )}
                  aria-live="polite"
                >
                  {m.content}
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="secondary" size="icon" onClick={handleVoice} aria-label="Voice input">
                <Mic className={cn("h-4 w-4", recognizing && "animate-pulse")} />
              </Button>
              <Input
                placeholder="Ask something…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                aria-label="Chat input"
              />
              <Button onClick={() => handleSend()} disabled={loading} aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => speak("Voice enabled. I can read answers aloud.")}
                aria-label="Read last message"
              >
                <Volume2 className={cn("h-4 w-4", speaking && "animate-pulse")} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

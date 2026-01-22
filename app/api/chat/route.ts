import type { NextRequest } from "next/server"
import { generateText } from "ai"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    const safePrompt = typeof prompt === "string" ? prompt.slice(0, 1000) : "Hello!"
    const { text } = await generateText({
      model: "openai/gpt-5-mini",
      prompt: `You are a concise, inclusive assistant for a Government School Management System. Keep answers brief, helpful, and accessible.\nUser: ${safePrompt}`,
    })
    return Response.json({ text })
  } catch {
    return Response.json({ text: "Assistant is unavailable right now." }, { status: 200 })
  }
}

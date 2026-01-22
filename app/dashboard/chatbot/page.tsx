import ChatbotWidget from "@/components/chatbot-widget"

export default function ChatbotPage() {
  return (
    <div className="grid place-items-center min-h-[50dvh] text-center space-y-2">
      <div>
        <h1 className="text-xl font-semibold">AI Chatbot</h1>
        <p className="text-muted-foreground">Use the floating assistant at the bottom-right for text or voice chat.</p>
      </div>
      <ChatbotWidget startOpen />
    </div>
  )
}

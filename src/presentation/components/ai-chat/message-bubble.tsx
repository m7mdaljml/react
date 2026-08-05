type Sender = "user" | "assistant"

interface MessageBubbleProps {
  sender: Sender
  content: string
}

const MessageBubble = ({ sender, content }: MessageBubbleProps) => {
  const isUser = sender === "user"
  return (
    <div className={`d-flex ${isUser ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className={`px-3 py-2 rounded-3 ${isUser ? "bg-primary text-white" : "bg-light border"}`}
        style={{ maxWidth: "75%", whiteSpace: "pre-wrap" }}
      >
        <p className="mb-0">{content}</p>
      </div>
    </div>
  )
}

export default MessageBubble

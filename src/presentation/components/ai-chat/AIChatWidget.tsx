import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaTrash, FaTimes } from "react-icons/fa"
import { fetchAiResponse } from "../../services/aiApi"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput"

interface Message {
  role: "user" | "assistant"
  content: string
}

const AIChatWidget = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, open])

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", content: text }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    try {
      const response = await fetchAiResponse([...messages, userMsg])
      const aiMsg: Message = { role: "assistant", content: response }
      setMessages(prev => [...prev, aiMsg])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: t("aiChat.errorResponse") }])
    } finally {
      setLoading(false)
    }
  }

  const deleteConversation = () => {
    setMessages([])
  }

  return (
    <>
      {open && (
        <div
          className="card shadow-lg border-0"
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 380,
            height: 520,
            display: "flex",
            flexDirection: "column",
            zIndex: 1050,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div className="card-header bg-primary text-white d-flex align-items-center gap-2 py-3 px-3">
            <div
              className="rounded-circle bg-white d-flex align-items-center justify-content-center"
              style={{ width: 32, height: 32 }}
            >
              <span className="text-primary fw-bold small">AI</span>
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-0 text-white">{t("aiChat.assistant")}</h6>
            </div>
            {messages.length > 0 && (
              <button
                className="btn btn-sm text-white border-0 p-1"
                onClick={deleteConversation}
                title={t("aiChat.delete")}
              >
                <FaTrash size={14} />
              </button>
            )}
            <button
              className="btn btn-sm text-white border-0 p-1"
              onClick={() => setOpen(false)}
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div
            ref={bodyRef}
            className="card-body overflow-auto d-flex flex-column gap-2 bg-light"
            style={{ flex: 1, padding: "0.75rem" }}
          >
            {messages.length === 0 && (
              <div className="text-center text-muted m-auto">
                <p className="mb-1 fw-medium">{t("aiChat.startConversation")}</p>
                <small>{t("aiChat.typeBelow")}</small>
              </div>
            )}
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} sender={msg.role} content={msg.content} />
            ))}
          </div>

          <div className="card-footer bg-white border-top-0 px-3 py-2">
            <ChatInput onSend={sendMessage} disabled={loading} />
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "none",
          zIndex: 1050,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
        className="bg-primary text-white"
      >
        <span className="fw-bold" style={{ fontSize: 20 }}>
          AI
        </span>
      </button>
    </>
  )
}

export default AIChatWidget

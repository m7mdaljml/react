import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { fetchAiResponse } from "../../services/aiApi";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatWindow = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const response = await fetchAiResponse([...messages, userMsg]);
      const aiMsg: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("aiChat.errorResponse") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const deleteConversation = () => {
    setMessages([]);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "calc(100vh - 56px)", padding: "1rem" }}
    >
      <div
        className="card shadow-sm"
        style={{
          width: 650,
          maxWidth: "100%",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="card-header bg-white d-flex align-items-center gap-2 py-3">
          <div
            className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36 }}
          >
            <span className="text-white fw-bold small">AI</span>
          </div>
          <div>
            <h6 className="mb-0">{t("aiChat.assistant")}</h6>
            <small className="text-muted">
              {loading ? t("aiChat.typing") : t("aiChat.online")}
            </small>
          </div>
          {!loading && messages.length > 0 && (
            <button
              className="btn btn-outline-danger btn-sm ms-auto px-3 rounded-pill d-flex align-items-center gap-2"
              onClick={deleteConversation}
              title={t("aiChat.delete")}
            >
              {t("aiChat.delete")} <FaTrash />
            </button>
          )}
        </div>

        <div className="card-body overflow-auto d-flex flex-column gap-2">
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

        <div className="card-footer bg-white border-top-0 pt-0">
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

import { useState } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  onSend: (message: string) => void
  disabled?: boolean
}

const ChatInput = ({ onSend, disabled }: Props) => {
  const { t } = useTranslation()
  const [input, setInput] = useState("")

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    onSend(trimmed)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="input-group">
      <textarea
        className="form-control border-0 bg-body-tertiary"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("aiChat.inputPlaceholder")}
        disabled={disabled}
        rows={1}
        style={{ resize: "none" }}
      />
      <button
        className="btn btn-primary d-flex align-items-center gap-1 px-3"
        onClick={handleSend}
        disabled={disabled || !input.trim()}
      >
        {t("aiChat.send")}
      </button>
    </div>
  )
}

export default ChatInput

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactEmail } from "../../services/contact-email";

type Props = {
  question: string;
  onSent: (email: string) => void;
  onCancel: () => void;
};

const EmailPrompt = ({ question, onSent, onCancel }: Props) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed)) {
      setError(t("aiChat.emailInvalid"));
      return;
    }

    setError("");
    setSending(true);
    try {
      await sendContactEmail(trimmed, question);
      onSent(trimmed);
    } catch {
      setError(t("aiChat.emailSendError"));
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="d-flex justify-content-start">
      <div
        className="px-3 py-2 rounded-3 bg-light border"
        style={{ maxWidth: "85%" }}
      >
        <p className="mb-1 small text-muted">{t("aiChat.leaveEmail")}</p>
        <div className="input-group input-group-sm">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("aiChat.emailPlaceholder")}
            disabled={sending}
            autoFocus
          />
          <button
            className="btn btn-primary"
            onClick={handleSend}
            disabled={sending || !email.trim()}
          >
            {sending ? t("aiChat.sending") : t("aiChat.send")}
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={onCancel}
            disabled={sending}
          >
            {t("aiChat.cancel")}
          </button>
        </div>
        {error && <div className="text-danger small mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default EmailPrompt;

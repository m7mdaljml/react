import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/navbar";
import AIChatWidget from "../components/ai-chat/AIChatWidget";

const Presentation = () => {
  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const handleLanguageChanged = () => {
      setLoading(true);
      setFadingOut(false);

      setTimeout(() => {
        setFadingOut(true);
        setTimeout(() => {
          setLoading(false);
          setFadingOut(false);
        }, 400);
      }, 1000);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  return (
    <div>
      <Navbar />
      {loading && (
        <div className={`lang-loader-overlay ${fadingOut ? "fade-out" : ""}`}>
          <div className="lang-loader-dots">
            <span />
            <span />
            <span />
          </div>
          <p className=" mt-3 fw-bold">{t("changingLanguage")}</p>
        </div>
      )}

      <div>
        <Outlet />
      </div>

      <AIChatWidget />
    </div>
  );
};

export default Presentation;

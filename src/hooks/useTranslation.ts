import { useEffect, useState } from "react";
import { getAppLanguage } from "../utils/appSettings";
import { translations } from "../utils/translations";

export const useTranslation = () => {
  const [lang, setLang] = useState(getAppLanguage());

  useEffect(() => {
    const update = () => {
      setLang(getAppLanguage());
    };

    window.addEventListener("app-settings-change", update);
    return () =>
      window.removeEventListener("app-settings-change", update);
  }, []);

  return translations[lang];
};
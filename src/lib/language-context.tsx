import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "fr" | "en";

const STORAGE_KEY = "portfolio-locale";
const DEFAULT_LOCALE: Locale = "fr";

const LanguageContext = createContext<{ locale: Locale; toggleLocale: () => void } | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "en") setLocale(stored);
    } catch {
      // localStorage unavailable — fall back to default locale
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // localStorage unavailable (private mode) — locale still applies for this session
    }
  }, [locale]);

  const toggleLocale = () => setLocale((l) => (l === "fr" ? "en" : "fr"));

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

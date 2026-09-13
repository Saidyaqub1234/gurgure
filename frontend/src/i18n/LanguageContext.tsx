import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { LANGUAGES, TRANSLATIONS } from './translations';
import type { LangCode } from './translations';

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): LangCode {
  try {
    const saved = localStorage.getItem('lang') as LangCode | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) return saved;
  } catch {}
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => getInitialLang());

  const meta = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = meta.code === 'fa' ? 'fa-AF' : meta.code;
    document.documentElement.dir = meta.dir;
  }, [meta]);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    try {
      localStorage.setItem('lang', code);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string) => TRANSLATIONS[lang]?.[key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t, dir: meta.dir, isRTL: meta.dir === 'rtl' }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

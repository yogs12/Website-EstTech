import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { translations } from '../lib/translations';

type Language = 'en' | 'id';

// Define the type for the translation dictionary
type TranslationKey = keyof typeof translations;
type TranslationValue = typeof translations[TranslationKey];
type TranslationFunction = (key: TranslationKey, ...args: any[]) => string;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to get nested value from translations
const getTranslation = (key: TranslationKey): TranslationValue | undefined => {
    return translations[key];
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'id') ? savedLanguage : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = useCallback<TranslationFunction>((key, ...args) => {
    const translationEntry = getTranslation(key);
    if (!translationEntry) {
      console.warn(`Translation key '${key}' not found.`);
      return String(key);
    }
    const translation = translationEntry[language] || translationEntry['en'];
    if (typeof translation === 'function') {
      return (translation as (...a: any[]) => string)(...args);
    }
    return translation || String(key);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
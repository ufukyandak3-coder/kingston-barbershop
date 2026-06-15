import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Language, Dictionary } from '../types'
import { en } from '../locales/en'
import { pl } from '../locales/pl'

const dictionaries: Record<Language, Dictionary> = { en, pl }

interface LanguageContextType {
  language: Language
  t: Dictionary
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pl')
  const toggle = () => setLanguage((l) => (l === 'en' ? 'pl' : 'en'))

  return (
    <LanguageContext.Provider value={{ language, t: dictionaries[language], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

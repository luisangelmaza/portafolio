import { createContext, useContext, useState } from 'react';
import translations from '../data/translations';

const LanguageContext = createContext();

// Provider que envuelve la app y da acceso al idioma
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es');
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook para usar el idioma desde cualquier componente
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  return context;
}

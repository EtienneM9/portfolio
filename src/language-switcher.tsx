import React, { createContext, useContext, useState } from 'react';

// Création du contexte de langue
const LanguageContext = createContext({
  language: 'fr',
  setLanguage: (lang: string) => {}
});

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => useContext(LanguageContext);

// Composant Provider pour la langue
import { ReactNode } from 'react';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('fr');

  const value = {
    language,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Composant de sélection de langue
export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      <button
        onClick={() => setLanguage('fr')}
        className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
          language === 'fr' ? 'border-white scale-110' : 'border-transparent'
        }`}
      >
        <div className="w-full h-full grid grid-cols-3">
          <div className="bg-blue-700"></div>
          <div className="bg-white"></div>
          <div className="bg-red-600"></div>
        </div>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
          language === 'en' ? 'border-white scale-110' : 'border-transparent'
        }`}
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-blue-600">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-5">
              <div className="col-span-3 row-span-3 bg-white">
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-red-600" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 0)' }}></div>
                  <div className="absolute inset-0 bg-red-600 rotate-90" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 0)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface HeaderProps {
  onNavigate: (target: 'list' | 'agent') => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  listingMode: 'buy' | 'rent' | 'new';
  onNavigateToListings: (mode: 'buy' | 'rent' | 'new') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isAuthenticated, onLogout, theme, toggleTheme, listingMode, onNavigateToListings }) => {
  const { t, language, setLanguage } = useTranslation();

  const handleNavClick = (e: React.MouseEvent, target: 'list' | 'agent') => {
    e.preventDefault();
    onNavigate(target);
  };

  const handleListingsNavClick = (e: React.MouseEvent, mode: 'buy' | 'rent' | 'new') => {
    e.preventDefault();
    onNavigateToListings(mode);
  };
  
  const getNavLinkClass = (mode: 'buy' | 'rent' | 'new') => {
    const baseClass = "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition duration-300";
    if (listingMode === mode && window.location.pathname !== '/agent') { // A bit of a hack to prevent active state on agent page
      return "text-blue-600 dark:text-blue-400 font-bold transition duration-300";
    }
    return baseClass;
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center cursor-pointer"
            onClick={(e) => handleListingsNavClick(e as any, 'buy')}
          >
             <i className="fas fa-city text-blue-600 text-3xl"></i>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white ml-2">Est Tech</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" onClick={(e) => handleListingsNavClick(e, 'buy')} className={getNavLinkClass('buy')}>{t('header.buy')}</a>
            <a href="#" onClick={(e) => handleListingsNavClick(e, 'rent')} className={getNavLinkClass('rent')}>{t('header.rent')}</a>
            <a href="#" onClick={(e) => handleListingsNavClick(e, 'new')} className={getNavLinkClass('new')}>{t('header.newProjects')}</a>
            <a href="#" onClick={(e) => handleNavClick(e, 'agent')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition duration-300 cursor-pointer">{t('header.agents')}</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full p-1">
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-2 py-0.5 text-xs font-bold rounded-full transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('id')} 
                className={`px-2 py-0.5 text-xs font-bold rounded-full transition-colors ${language === 'id' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                ID
              </button>
            </div>
            <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            {isAuthenticated ? (
              <button 
                onClick={onLogout}
                className="font-bold py-2 px-4 rounded-lg transition duration-300 bg-gray-700 text-white hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                {t('header.logout')}
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('agent')}
                className="font-bold py-2 px-4 rounded-lg transition duration-300 bg-blue-600 text-white hover:bg-blue-700"
              >
                {t('header.login')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

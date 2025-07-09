import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import AgentCenter from './components/AgentCenter';
import Auth from './components/Auth';
import ChatView from './components/ChatView';
import { useProperties } from './hooks/useProperties';
import type { Property } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { properties, loading } = useProperties();
  const [view, setView] = useState<'list' | 'detail' | 'agent' | 'auth' | 'chat'>('list');
  const [listingMode, setListingMode] = useState<'buy' | 'rent' | 'new'>('buy');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'buyer' | 'agent' | null>(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<'chat' | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Reset scroll position when view changes
    window.scrollTo(0, 0);
  }, [view, selectedProperty]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setView('detail');
  };

  const handleNavigate = (targetView: 'list' | 'agent') => {
    setSelectedProperty(null);
    setRedirectAfterLogin(null); // Clear redirects when navigating manually
    if (targetView === 'agent' && !isAuthenticated) {
      setView('auth');
    } else if (targetView === 'agent' && isAuthenticated && userRole === 'agent') {
      setView('agent');
    }
     else {
      setView(targetView);
    }
    
    if (targetView === 'list') {
        setListingMode('buy');
    }
  };
  
  const handleNavigateToListings = (mode: 'buy' | 'rent' | 'new') => {
    setView('list');
    setListingMode(mode);
    setSelectedProperty(null); // Deselect property when changing list mode
  };

  const handleGoBackToList = () => {
    setSelectedProperty(null);
    setRedirectAfterLogin(null);
    setView('list');
  };
  
  const handleGoBackToDetail = useCallback(() => {
     if (selectedProperty) {
       setView('detail');
     } else {
       handleGoBackToList();
     }
   }, [selectedProperty]);

  const handleLogin = (role: 'buyer' | 'agent') => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (redirectAfterLogin === 'chat' && selectedProperty) {
        setView('chat');
        setRedirectAfterLogin(null);
    } else if (role === 'agent') {
        setView('agent');
    } else {
        setView('list');
        setListingMode('buy');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setRedirectAfterLogin(null);
    setView('list');
    setListingMode('buy');
  };
  
  const handleContactAgent = () => {
     if (isAuthenticated) {
       setView('chat');
     } else {
       setRedirectAfterLogin('chat');
       setView('auth');
     }
   };

  const renderContent = () => {
    if (loading && view === 'list') {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (view) {
      case 'detail':
        return <PropertyDetail property={selectedProperty!} onBack={handleGoBackToList} onContactAgent={handleContactAgent} listingMode={listingMode} />;
      case 'agent':
        return <AgentCenter onBack={handleGoBackToList} />;
      case 'auth':
        return <Auth onLogin={handleLogin} onBack={handleGoBackToList} />;
      case 'chat':
        return <ChatView property={selectedProperty!} onBack={handleGoBackToDetail} />;
      case 'list':
      default:
        return <PropertyList properties={properties} onSelectProperty={handleSelectProperty} listingMode={listingMode} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <Header 
          onNavigate={handleNavigate} 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
          theme={theme}
          toggleTheme={toggleTheme}
          listingMode={listingMode}
          onNavigateToListings={handleNavigateToListings}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;

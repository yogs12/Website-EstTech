import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface AuthProps {
  onLogin: (role: 'buyer' | 'agent') => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'agent' | null>(null);
  
  if (!selectedRole) {
    return <RoleSelection onBack={onBack} onSelectRole={setSelectedRole} />;
  }

  return <LoginForm onLogin={() => onLogin(selectedRole)} onBack={() => setSelectedRole(null)} role={selectedRole} />;
};

// --- Sub-components for better organization ---

interface RoleSelectionProps {
  onBack: () => void;
  onSelectRole: (role: 'buyer' | 'agent') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onBack, onSelectRole }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[60vh] flex flex-col justify-center animate-fade-in">
        <button onClick={onBack} className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition duration-300 self-start">
            <i className="fas fa-arrow-left mr-2"></i>
            {t('auth.backToListings')}
        </button>
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t('auth.welcome')}</h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                {t('auth.getStarted')}
            </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            <RoleCard 
                icon="fa-home"
                title={t('auth.iamBuyer')}
                description={t('auth.buyerDesc')}
                onClick={() => onSelectRole('buyer')}
            />
            <RoleCard 
                icon="fa-briefcase"
                title={t('auth.iamAgent')}
                description={t('auth.agentDesc')}
                onClick={() => onSelectRole('agent')}
            />
        </div>
    </div>
  );
};

interface RoleCardProps {
    icon: string;
    title: string;
    description: string;
    onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description, onClick }) => (
    <div onClick={onClick} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center">
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <i className={`fas ${icon} text-3xl`}></i>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
);


interface LoginFormProps {
  onLogin: () => void;
  onBack: () => void;
  role: 'buyer' | 'agent';
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onBack, role }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const { t } = useTranslation();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(activeTab === 'login' ? t('auth.loginSuccess', role) : t('auth.signupSuccess', role));
    onLogin();
  };
  
  const roleText = role === 'agent' ? 'Agent' : 'Buyer';

  const renderInput = (id: string, type: string, label: string, icon: string) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className={`fas ${icon} text-gray-400`}></i>
        </div>
        <input
          type={type}
          id={id}
          name={id}
          required
          className="appearance-none block w-full pl-10 px-3 py-2 border bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {activeTab === 'signup' && renderInput('signup-name', 'text', t('auth.fullName'), 'fa-user')}
      {renderInput('email', 'email', t('auth.email'), 'fa-envelope')}
      {role === 'agent' && activeTab === 'signup' && renderInput('phone', 'tel', t('auth.phone'), 'fa-phone')}
      {renderInput('password', 'password', t('auth.password'), 'fa-lock')}
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {activeTab === 'login' ? t('auth.signIn') : t('auth.createAccount')}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-[60vh] flex flex-col justify-center animate-fade-in">
        <button onClick={onBack} className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition duration-300 self-start">
            <i className="fas fa-arrow-left mr-2"></i>
            {t('auth.backToSelection')}
        </button>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white capitalize">{t('auth.portalAccess', role)}</h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.signInContinue')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button onClick={() => setActiveTab('login')} className={`w-1/2 py-4 text-center font-medium text-sm transition-colors duration-300 ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                      {t('auth.signIn')}
                  </button>
                  <button onClick={() => setActiveTab('signup')} className={`w-1/2 py-4 text-center font-medium text-sm transition-colors duration-300 ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                      {role === 'agent' ? t('auth.becomeAgent') : t('auth.createAccount')}
                  </button>
              </div>
          </div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default Auth;
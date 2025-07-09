import React from 'react';
import FileUpload from './FileUpload';
import { useTranslation } from '../contexts/LanguageContext';

interface AgentCenterProps {
  onBack: () => void;
}

const AgentCenter: React.FC<AgentCenterProps> = ({ onBack }) => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the file upload here.
    alert(t('agent.submitAlert'));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-8 animate-fade-in max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition duration-300">
        <i className="fas fa-arrow-left mr-2"></i>
        {t('propertyDetail.back')}
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">{t('agent.title')}</h1>
        <p className="text-md text-gray-500 dark:text-gray-400 mt-2">{t('agent.subtitle')}</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('agent.requiredDocs')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{t('agent.docsDesc')}</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
            <li>{t('agent.doc1')}</li>
            <li>{t('agent.doc2')}</li>
            <li>{t('agent.doc3')}</li>
          </ul>
        </div>
        
        <FileUpload />

        <div className="mt-8 text-right">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg">
              {t('agent.submitButton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentCenter;
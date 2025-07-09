import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Est Tech</h3>
            <p className="text-gray-400 text-sm">{t('footer.motto')}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.careers')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.tos')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.discover')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">{t('footer.jakarta')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.bali')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.bandung')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.newApts')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.follow')}</h4>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>{t('footer.copyright', new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
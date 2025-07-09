import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  propertyType: string;
  setPropertyType: (type: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  propertyType,
  setPropertyType,
  onSearch,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg -mt-16 relative z-10 mb-12">
      <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="search-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('propertyList.locationLabel')}</label>
          <input
            type="text"
            id="search-location"
            placeholder={t('propertyList.searchPlaceholder')}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('propertyList.typeLabel')}</label>
          <select
            id="property-type"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="All">{t('propertyList.allTypes')}</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-300">
          <i className="fas fa-search mr-2"></i>
          {t('propertyList.searchButton')}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
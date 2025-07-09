import React, { useState, useMemo } from 'react';
import PropertyCard from './PropertyCard';
import SearchBar from './SearchBar';
import type { Property } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface PropertyListProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  listingMode: 'buy' | 'rent' | 'new';
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onSelectProperty, listingMode }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const filteredProperties = useMemo(() => {
    let baseList = properties;
    if (listingMode === 'rent') {
      baseList = properties.filter(p => p.rentalPrice);
    } else if (listingMode === 'new') {
      baseList = properties.filter(p => p.isNewProject);
    }
    
    return baseList.filter(property => {
      const searchTermMatch = searchTerm.toLowerCase() === '' ? true :
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const propertyTypeMatch = propertyType === 'All' ? true :
        property.type === propertyType;
        
      return searchTermMatch && propertyTypeMatch;
    });
  }, [properties, searchTerm, propertyType, listingMode]);

  const handleSearch = () => {
    // The filtering is live via useMemo, but this can be used for explicit search actions in the future.
    console.log('Searching for:', { searchTerm, propertyType });
  };

  const getTitle = () => {
    if (searchTerm || propertyType !== 'All') {
      return t('propertyList.showingResults', filteredProperties.length);
    }
    switch (listingMode) {
      case 'rent':
        return t('propertyList.forRent');
      case 'new':
        return t('propertyList.newProjectsList');
      case 'buy':
      default:
        return t('propertyList.featured');
    }
  };


  return (
    <div>
        <div className="h-64 bg-cover bg-center rounded-lg shadow-xl" style={{backgroundImage: "url('https://picsum.photos/seed/hero/1200/400')"}}>
            <div className="h-full bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <h2 className="text-4xl text-white font-bold text-center px-4">{t('propertyList.heroTitle')}</h2>
            </div>
        </div>

      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        onSearch={handleSearch}
      />

      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {getTitle()}
      </h2>
      
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} listingMode={listingMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <i className="fas fa-search text-5xl text-gray-400 dark:text-gray-500 mb-4"></i>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{t('propertyList.noResultsTitle')}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t('propertyList.noResultsSubtitle')}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;

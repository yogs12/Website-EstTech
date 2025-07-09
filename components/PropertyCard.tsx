import React from 'react';
import type { Property } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  listingMode: 'buy' | 'rent' | 'new';
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect, listingMode }) => {
  const { t } = useTranslation();

  const formatRentalPrice = (rentalPrice: Property['rentalPrice']) => {
    if (!rentalPrice) return '';
    if (rentalPrice.perDay) {
      return `${formatPrice(rentalPrice.perDay)} ${t('price.perDay')}`;
    }
    if (rentalPrice.perMonth) {
      return `${formatPrice(rentalPrice.perMonth)} ${t('price.perMonth')}`;
    }
    if (rentalPrice.perYear) {
      return `${formatPrice(rentalPrice.perYear)} ${t('price.perYear')}`;
    }
    return '';
  };

  const displayPrice = listingMode === 'rent' && property.rentalPrice 
    ? formatRentalPrice(property.rentalPrice)
    : formatPrice(property.price);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(property)}
    >
      <div className="relative">
        <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{property.isNewProject ? t('header.newProjects') : t('propertyCard.featured')}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">{property.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><i className="fas fa-map-marker-alt mr-1"></i>{property.address}</p>
        <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">{displayPrice}</p>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-3">
          <span title={t('propertyCard.bedrooms')}>
            <i className="fas fa-bed mr-1 text-gray-400 dark:text-gray-500"></i> {property.bedrooms}
          </span>
          <span title={t('propertyCard.bathrooms')}>
            <i className="fas fa-bath mr-1 text-gray-400 dark:text-gray-500"></i> {property.bathrooms}
          </span>
          <span title={t('propertyCard.area')}>
            <i className="fas fa-ruler-combined mr-1 text-gray-400 dark:text-gray-500"></i> {property.area} m²
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

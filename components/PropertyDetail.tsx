import React, { useState } from 'react';
import type { Property, Room } from '../types';
import VirtualTour from './VirtualTour';
import { useTranslation } from '../contexts/LanguageContext';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onContactAgent: () => void;
  listingMode: 'buy' | 'rent' | 'new';
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onBack, onContactAgent, listingMode }) => {
  const [activeRoom, setActiveRoom] = useState<Room>(property.rooms[0]);
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-8 animate-fade-in transition-colors duration-300">
      <button onClick={onBack} className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition duration-300">
        <i className="fas fa-arrow-left mr-2"></i>
        {t('propertyDetail.back')}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">{property.title}</h1>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-2 mb-4"><i className="fas fa-map-marker-alt mr-2"></i>{property.address}</p>

          <div className="mb-6">
            <VirtualTour activeRoom={activeRoom} />
          </div>

          <div className="mb-6">
             <h3 className="text-xl font-bold mb-3 dark:text-white">{t('propertyDetail.exploreRooms')}</h3>
            <div className="flex flex-wrap gap-2">
              {property.rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    activeRoom.id === room.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          </div>
            
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">{t('propertyDetail.description')}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{property.description}</p>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-inner sticky top-24">
            <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">{displayPrice}</p>
            <div className="grid grid-cols-3 gap-4 text-center my-6">
              <div>
                <i className="fas fa-bed text-2xl text-blue-500"></i>
                <p className="font-bold dark:text-white">{property.bedrooms}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('propertyDetail.beds')}</p>
              </div>
              <div>
                <i className="fas fa-bath text-2xl text-blue-500"></i>
                <p className="font-bold dark:text-white">{property.bathrooms}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('propertyDetail.baths')}</p>
              </div>
              <div>
                <i className="fas fa-ruler-combined text-2xl text-blue-500"></i>
                <p className="font-bold dark:text-white">{property.area} m²</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('propertyCard.area')}</p>
              </div>
            </div>
            <button 
              onClick={onContactAgent}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-lg"
            >
                {t('propertyDetail.contactAgent')}
            </button>
             <button className="w-full mt-3 bg-white dark:bg-gray-700 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 font-bold py-3 px-4 rounded-lg transition duration-300 text-lg">
                {t('propertyDetail.saveProperty')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

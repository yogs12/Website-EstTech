import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Room } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface VirtualTourProps {
  activeRoom: Room;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ activeRoom }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(0);
  const [bgPosition, setBgPosition] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const tourRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    // Reset position when room changes
    setBgPosition(50); 

    const img = new Image();
    img.src = activeRoom.panoramaUrl;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false); // handle error case
  }, [activeRoom]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setX(e.pageX - (tourRef.current?.offsetLeft ?? 0));
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && tourRef.current) {
      const currentX = e.pageX - tourRef.current.offsetLeft;
      const walk = (currentX - x) * 0.2; // control sensitivity
      const newBgPosition = bgPosition - walk;
      
      // Clamp the value between 0 and 100
      const clampedPosition = Math.max(0, Math.min(100, newBgPosition));

      setBgPosition(clampedPosition);
      setX(currentX);
    }
  }, [isDragging, x, bgPosition]);

  useEffect(() => {
    if(isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);


  const tourStyle: React.CSSProperties = {
    backgroundImage: `url(${activeRoom.panoramaUrl})`,
    backgroundPosition: `${bgPosition}% 50%`,
    backgroundSize: '200% 100%',
  };

  return (
    <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner select-none">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          <p className="text-white mt-4">{t('propertyDetail.loadingTour')}</p>
        </div>
      )}
      <div
        ref={tourRef}
        className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={tourStyle}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 text-white p-2 bg-black/50 rounded-lg pointer-events-none">
          <h4 className="font-bold text-lg">{activeRoom.name}</h4>
          <p className="text-sm">{t('propertyDetail.tourDrag')}</p>
        </div>
         <div className="absolute top-4 right-4 text-white text-2xl p-2 bg-black/50 rounded-full pointer-events-none">
          <i className="fas fa-arrows-alt-h"></i>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;

export interface Room {
  id: string;
  name: string;
  panoramaUrl: string;
}

export interface Property {
  id:string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  imageUrl: string;
  description: string;
  rooms: Room[];
  type: 'House' | 'Apartment' | 'Villa' | 'Land';
  isNewProject?: boolean;
  rentalPrice?: {
    perDay?: number;
    perMonth?: number;
    perYear?: number;
  };
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

import React, { useState, useEffect } from 'react';
import type { Property } from '../types';

const mockProperties: Property[] = [
  {
    id: 'prop1',
    title: 'Modern Villa with Ocean View',
    price: 4500000000,
    address: 'Canggu, Bali',
    bedrooms: 4,
    bathrooms: 5,
    area: 500,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop',
    description: 'A stunning modern villa located in the heart of Canggu, offering breathtaking ocean views and luxurious amenities. Perfect for families or as a high-yield investment property.',
    type: 'Villa',
    rentalPrice: { perDay: 3500000 },
    rooms: [
      { id: 'living', name: 'Living Room', panoramaUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2048&auto=format&fit=crop' },
      { id: 'kitchen', name: 'Kitchen', panoramaUrl: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2048&auto=format&fit=crop' },
      { id: 'master_bedroom', name: 'Master Bedroom', panoramaUrl: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2048&auto=format&fit=crop' },
      { id: 'pool', name: 'Pool Area', panoramaUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
  {
    id: 'prop2',
    title: 'Cozy Downtown Apartment',
    price: 1200000000,
    address: 'SCBD, Jakarta',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    description: 'A chic and cozy apartment in a prime location. Fully furnished with modern interior design, ready to move in. Close to public transportation and shopping centers.',
    type: 'Apartment',
    rentalPrice: { perMonth: 15000000 },
    rooms: [
      { id: 'living', name: 'Living Area', panoramaUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2048&auto=format&fit=crop' },
      { id: 'bedroom', name: 'Bedroom', panoramaUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16da31?q=80&w=2048&auto=format&fit=crop' },
      { id: 'kitchenette', name: 'Kitchenette', panoramaUrl: 'https://images.unsplash.com/photo-1565329243548-52114c125431?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
  {
    id: 'prop3',
    title: 'Spacious Family House',
    price: 2500000000,
    address: 'Pondok Indah, Jakarta',
    bedrooms: 5,
    bathrooms: 3,
    area: 350,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    description: 'An expansive and comfortable family home in a prestigious neighborhood. Features a large garden, private swimming pool, and a two-car garage. Ideal for a growing family.',
    type: 'House',
    rentalPrice: { perYear: 250000000 },
    rooms: [
      { id: 'exterior', name: 'Exterior', panoramaUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2048&auto=format&fit=crop' },
      { id: 'living_room', name: 'Living Room', panoramaUrl: 'https://images.unsplash.com/photo-1600607686527-6fb88629f4d0?q=80&w=2048&auto=format&fit=crop' },
      { id: 'dining_room', name: 'Dining Room', panoramaUrl: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2048&auto=format&fit=crop' },
      { id: 'backyard', name: 'Backyard', panoramaUrl: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
    {
    id: 'prop4',
    title: 'Minimalist House in Bandung',
    price: 950000000,
    address: 'Dago, Bandung',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    description: 'A beautifully designed minimalist house with cool mountain air. The open-plan living space creates a bright and airy atmosphere. Perfect for young professionals or couples.',
    type: 'House',
    rooms: [
      { id: 'living', name: 'Living Room', panoramaUrl: 'https://images.unsplash.com/photo-1617103996722-a8d51a84f332?q=80&w=2048&auto=format&fit=crop' },
      { id: 'study', name: 'Study Room', panoramaUrl: 'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?q=80&w=2048&auto=format&fit=crop' },
      { id: 'bedroom', name: 'Main Bedroom', panoramaUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce0687954?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
  {
    id: 'prop5',
    title: 'Modern High-Rise Apartment in Surabaya',
    price: 1800000000,
    address: 'Pakuwon, Surabaya',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
    description: 'Experience city living at its finest in this modern apartment with stunning city views. Features access to a sky gym, infinity pool, and is just steps away from a major shopping mall.',
    type: 'Apartment',
    isNewProject: true,
    rentalPrice: { perMonth: 20000000 },
    rooms: [
      { id: 'living', name: 'Living Room', panoramaUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2048&auto=format&fit=crop' },
      { id: 'bedroom', name: 'Master Bedroom', panoramaUrl: 'https://images.unsplash.com/photo-1616594039964-ae9197a4a6ce?q=80&w=2048&auto=format&fit=crop' },
      { id: 'view', name: 'City View', panoramaUrl: 'https://images.unsplash.com/photo-1519994824364-f18b991a8737?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
  {
    id: 'prop6',
    title: 'Strategic Plot of Land near Sentul',
    price: 750000000,
    address: 'Sentul, Bogor',
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    description: 'A prime plot of land in a developing area near Sentul. Perfect for building a custom villa or for long-term investment. Close to toll road access and natural attractions.',
    type: 'Land',
    rooms: [
      { id: 'view1', name: 'North View', panoramaUrl: 'https://images.unsplash.com/photo-1444312015383-0209742c8814?q=80&w=2048&auto=format&fit=crop' },
      { id: 'view2', name: 'South View', panoramaUrl: 'https://images.unsplash.com/photo-1473646535316-b1a14151a66a?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
  {
    id: 'prop7',
    title: 'Classic Javanese House (Joglo)',
    price: 2100000000,
    address: 'Sleman, Yogyakarta',
    bedrooms: 4,
    bathrooms: 3,
    area: 400,
    imageUrl: 'https://images.unsplash.com/photo-1620241609125-2c35a823e2ae?q=80&w=800&auto=format&fit=crop',
    description: 'Authentic Javanese Joglo house renovated with modern comforts. Features intricate wood carvings, a spacious yard, and a serene, culturally-rich environment.',
    type: 'House',
    rooms: [
      { id: 'pendopo', name: 'Pendopo (Main Hall)', panoramaUrl: 'https://images.unsplash.com/photo-1629080590393-a1f736b04391?q=80&w=2048&auto=format&fit=crop' },
      { id: 'garden', name: 'Garden', panoramaUrl: 'https://images.unsplash.com/photo-1585145074323-e20938a4d422?q=80&w=2048&auto=format&fit=crop' },
      { id: 'bedroom', name: 'Bedroom', panoramaUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
  {
    id: 'prop8',
    title: 'Luxury Private Villa in Seminyak',
    price: 6800000000,
    address: 'Seminyak, Bali',
    bedrooms: 3,
    bathrooms: 4,
    area: 450,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop',
    description: 'An exquisite private villa just minutes from the beach. Designed for ultimate relaxation and entertainment, featuring a large private pool, sun deck, and open-plan living area.',
    type: 'Villa',
    rentalPrice: { perDay: 5000000 },
    rooms: [
        { id: 'pool', name: 'Poolside', panoramaUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2048&auto=format&fit=crop' },
        { id: 'living', name: 'Open Living Area', panoramaUrl: 'https://images.unsplash.com/photo-1615571022219-eb45cf737f14?q=80&w=2048&auto=format&fit=crop' },
        { id: 'suite', name: 'Master Suite', panoramaUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
  {
    id: 'prop9',
    title: 'Compact Studio Apartment BSD',
    price: 650000000,
    address: 'BSD City, Tangerang',
    bedrooms: 1,
    bathrooms: 1,
    area: 32,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
    description: 'A smart and compact studio apartment in the heart of BSD. Ideal for students or single professionals. Fully furnished and located within a complex with complete facilities.',
    type: 'Apartment',
    isNewProject: true,
    rentalPrice: { perMonth: 7000000 },
    rooms: [
        { id: 'main', name: 'Studio Area', panoramaUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c015d?q=80&w=2048&auto=format&fit=crop' },
        { id: 'bathroom', name: 'Bathroom', panoramaUrl: 'https://images.unsplash.com/photo-1582595697553-4e6f119025aa?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
  {
    id: 'prop10',
    title: 'Suburban Family Home',
    price: 1500000000,
    address: 'Cimanggis, Depok',
    bedrooms: 4,
    bathrooms: 2,
    area: 180,
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop',
    description: 'A comfortable home in a quiet suburban neighborhood. Close to schools, hospitals, and commuter line stations. Perfect for families looking for a peaceful living environment.',
    type: 'House',
    isNewProject: true,
    rooms: [
        { id: 'living', name: 'Living Room', panoramaUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2048&auto=format&fit=crop' },
        { id: 'kitchen', name: 'Kitchen', panoramaUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2048&auto=format&fit=crop' },
        { id: 'yard', name: 'Front Yard', panoramaUrl: 'https://images.unsplash.com/photo-1549517045-bc93de075e53?q=80&w=2048&auto=format&fit=crop' },
    ],
  },
];

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { properties, loading };
};
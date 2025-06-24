export const mockProducts = [
  {
    _id: '1',
    name: 'Premium Wireless Headphones',
    description:
      'High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    images: [
      'https://placehold.co/600x600/000000/FFFFFF?text=Main+Image',
      'https://placehold.co/600x600/333333/FFFFFF?text=Side+View',
      'https://placehold.co/600x600/666666/FFFFFF?text=Back+View',
      'https://placehold.co/600x600/999999/FFFFFF?text=Detail',
    ],
    category: {
      _id: 'cat1',
      name: 'Electronics',
    },
    stock: 25,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and long battery life.',
    price: 399.99,
    images: [
      'https://placehold.co/600x600/1976d2/FFFFFF?text=Watch+Main',
      'https://placehold.co/600x600/1565c0/FFFFFF?text=Watch+Side',
    ],
    category: {
      _id: 'cat1',
      name: 'Electronics',
    },
    stock: 0,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

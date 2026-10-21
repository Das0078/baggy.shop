export interface CategoryProduct {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  category: 'T-shirts' | 'Shorts' | 'Shirts' | 'Hoodie' | 'Jeans';
  dressStyle: 'Casual' | 'Formal' | 'Party' | 'Gym';
  color: string; // Color name or hex
  sizes: string[];
}

export const categoryProducts: CategoryProduct[] = [
  {
    id: 'cp-1',
    name: 'Gradient Graphic T-shirt',
    image: '/images/products/gradient-graphic.png',
    rating: 3.5,
    price: 145,
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#FFFFFF',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
  {
    id: 'cp-2',
    name: 'Polo with Tipping Details',
    image: '/images/products/polo-tipping.png',
    rating: 4.5,
    price: 180,
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#F50606',
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: 'cp-3',
    name: 'Black Striped T-shirt',
    image: '/images/products/black-striped.png',
    rating: 5.0,
    price: 120,
    originalPrice: 150,
    discountBadge: '-30%',
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#000000',
    sizes: ['XX-Small', 'Small', 'Medium', 'Large', 'X-Large'],
  },
  {
    id: 'cp-4',
    name: 'Skinny Fit Jeans',
    image: '/images/products/skinny-jeans.png',
    rating: 3.5,
    price: 240,
    originalPrice: 260,
    discountBadge: '-20%',
    category: 'Jeans',
    dressStyle: 'Casual',
    color: '#063AF5',
    sizes: ['Medium', 'Large', 'X-Large', 'XX-Large'],
  },
  {
    id: 'cp-5',
    name: 'Checkered Shirt',
    image: '/images/products/checkered-shirt.png',
    rating: 4.5,
    price: 180,
    category: 'Shirts',
    dressStyle: 'Casual',
    color: '#F50606',
    sizes: ['Small', 'Medium', 'Large'],
  },
  {
    id: 'cp-6',
    name: 'Sleeve Striped T-shirt',
    image: '/images/products/sleeve-striped.png',
    rating: 4.5,
    price: 130,
    originalPrice: 160,
    discountBadge: '-30%',
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#F57906',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
  {
    id: 'cp-7',
    name: 'Vertical Striped Shirt',
    image: '/images/products/vertical-striped.png',
    rating: 5.0,
    price: 212,
    originalPrice: 232,
    discountBadge: '-20%',
    category: 'Shirts',
    dressStyle: 'Casual',
    color: '#00C12B',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
  {
    id: 'cp-8',
    name: 'Courage Graphic T-shirt',
    image: '/images/products/courage-tshirt.png',
    rating: 4.0,
    price: 145,
    category: 'T-shirts',
    dressStyle: 'Casual',
    color: '#F57906',
    sizes: ['Medium', 'Large'],
  },
  {
    id: 'cp-9',
    name: 'Loose Fit Bermuda Shorts',
    image: '/images/products/bermuda-shorts.png',
    rating: 3.0,
    price: 80,
    category: 'Shorts',
    dressStyle: 'Casual',
    color: '#06CAF5',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
];

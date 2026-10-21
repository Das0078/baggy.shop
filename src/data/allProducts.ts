export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  dressStyle?: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  details: string[];
  faqs: { question: string; answer: string }[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  verified: boolean;
  content: string;
  date: string;
}

export const defaultProduct: ProductDetail = {
  id: 'one-life-graphic-tshirt',
  name: 'ONE LIFE GRAPHIC T-SHIRT',
  category: 'T-shirts',
  dressStyle: 'Casual',
  price: 260,
  originalPrice: 300,
  discountBadge: '-40%',
  rating: 4.5,
  reviewCount: 451,
  description:
    'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
  images: [
    '/images/products/onelife-main.png',
    '/images/products/onelife-thumb1.png',
    '/images/products/onelife-thumb2.png',
    '/images/products/onelife-thumb3.png',
  ],
  colors: [
    { name: 'Olive Green', hex: '#4F583D' },
    { name: 'Deep Teal', hex: '#2F4858' },
    { name: 'Midnight Navy', hex: '#22263C' },
  ],
  sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  details: [
    '100% Combed Heavyweight Cotton (240 GSM)',
    'Pre-shrunk fabric to preserve structured oversized silhouette',
    'Custom puff screen-printed "ONE LIFE" typography across chest',
    'Reinforced ribbed crew collar with shoulder-to-shoulder taping',
    'Machine wash cold, tumble dry low or hang dry',
  ],
  faqs: [
    {
      question: 'What is the fit of this t-shirt?',
      answer:
        'This piece features our signature boxy, relaxed oversized streetwear fit. If you prefer a tailored look, we recommend sizing down.',
    },
    {
      question: 'How do I care for the puff print graphic?',
      answer:
        'Wash inside out in cold water on gentle cycle. Do not iron directly over the graphic.',
    },
    {
      question: 'What are the shipping and return policies?',
      answer:
        'We offer free worldwide shipping on orders over $150 and 30-day hassle-free returns or exchanges.',
    },
  ],
};

export const productCatalog: Record<string, ProductDetail> = {
  'one-life-graphic-tshirt': defaultProduct,
  'na-1': {
    ...defaultProduct,
    id: 'na-1',
    name: 'T-SHIRT WITH TAPE DETAILS',
    price: 120,
    originalPrice: undefined,
    discountBadge: undefined,
    images: [
      '/images/products/tshirt-tape.png',
      '/images/products/onelife-thumb1.png',
      '/images/products/onelife-thumb3.png',
    ],
  },
  'na-2': {
    ...defaultProduct,
    id: 'na-2',
    name: 'SKINNY FIT JEANS',
    category: 'Jeans',
    price: 240,
    originalPrice: 260,
    discountBadge: '-20%',
    rating: 3.5,
    images: [
      '/images/products/skinny-jeans.png',
      '/images/products/bermuda-shorts.png',
    ],
  },
  'na-3': {
    ...defaultProduct,
    id: 'na-3',
    name: 'CHECKERED SHIRT',
    category: 'Shirts',
    price: 180,
    originalPrice: undefined,
    discountBadge: undefined,
    images: [
      '/images/products/checkered-shirt.png',
      '/images/products/vertical-striped.png',
    ],
  },
  'na-4': {
    ...defaultProduct,
    id: 'na-4',
    name: 'SLEEVE STRIPED T-SHIRT',
    price: 130,
    originalPrice: 160,
    discountBadge: '-30%',
    images: [
      '/images/products/sleeve-striped.png',
      '/images/products/black-striped.png',
    ],
  },
  'ts-1': {
    ...defaultProduct,
    id: 'ts-1',
    name: 'VERTICAL STRIPED SHIRT',
    category: 'Shirts',
    price: 212,
    originalPrice: 232,
    discountBadge: '-20%',
    rating: 5.0,
    images: [
      '/images/products/vertical-striped.png',
      '/images/products/checkered-shirt.png',
    ],
  },
  'ts-2': {
    ...defaultProduct,
    id: 'ts-2',
    name: 'COURAGE GRAPHIC T-SHIRT',
    price: 145,
    originalPrice: undefined,
    discountBadge: undefined,
    rating: 4.0,
    images: [
      '/images/products/courage-tshirt.png',
      '/images/products/gradient-graphic.png',
    ],
  },
  'ts-3': {
    ...defaultProduct,
    id: 'ts-3',
    name: 'LOOSE FIT BERMUDA SHORTS',
    category: 'Shorts',
    price: 80,
    originalPrice: undefined,
    discountBadge: undefined,
    rating: 3.0,
    images: [
      '/images/products/bermuda-shorts.png',
      '/images/products/skinny-jeans.png',
    ],
  },
  'ts-4': {
    ...defaultProduct,
    id: 'ts-4',
    name: 'FADED SKINNY JEANS',
    category: 'Jeans',
    price: 210,
    originalPrice: undefined,
    discountBadge: undefined,
    images: [
      '/images/products/faded-skinny-jeans.png',
      '/images/products/skinny-jeans.png',
    ],
  },
  'cp-1': {
    ...defaultProduct,
    id: 'cp-1',
    name: 'GRADIENT GRAPHIC T-SHIRT',
    price: 145,
    originalPrice: undefined,
    discountBadge: undefined,
    rating: 3.5,
    images: [
      '/images/products/gradient-graphic.png',
      '/images/products/courage-tshirt.png',
    ],
  },
  'cp-2': {
    ...defaultProduct,
    id: 'cp-2',
    name: 'POLO WITH TIPPING DETAILS',
    price: 180,
    originalPrice: undefined,
    discountBadge: undefined,
    rating: 4.5,
    images: [
      '/images/products/polo-tipping.png',
      '/images/products/tshirt-tape.png',
    ],
  },
  'cp-3': {
    ...defaultProduct,
    id: 'cp-3',
    name: 'BLACK STRIPED T-SHIRT',
    price: 120,
    originalPrice: 150,
    discountBadge: '-30%',
    rating: 5.0,
    images: [
      '/images/products/black-striped.png',
      '/images/products/sleeve-striped.png',
    ],
  },
  'cp-4': {
    ...defaultProduct,
    id: 'cp-4',
    name: 'SKINNY FIT JEANS',
    category: 'Jeans',
    price: 240,
    originalPrice: 260,
    discountBadge: '-20%',
    rating: 3.5,
    images: [
      '/images/products/skinny-jeans.png',
      '/images/products/faded-skinny-jeans.png',
    ],
  },
  'cp-5': {
    ...defaultProduct,
    id: 'cp-5',
    name: 'CHECKERED SHIRT',
    category: 'Shirts',
    price: 180,
    rating: 4.5,
    images: [
      '/images/products/checkered-shirt.png',
      '/images/products/vertical-striped.png',
    ],
  },
  'cp-6': {
    ...defaultProduct,
    id: 'cp-6',
    name: 'SLEEVE STRIPED T-SHIRT',
    category: 'T-shirts',
    price: 130,
    originalPrice: 160,
    discountBadge: '-30%',
    rating: 4.5,
    images: [
      '/images/products/sleeve-striped.png',
      '/images/products/black-striped.png',
    ],
  },
  'cp-7': {
    ...defaultProduct,
    id: 'cp-7',
    name: 'VERTICAL STRIPED SHIRT',
    category: 'Shirts',
    price: 212,
    originalPrice: 232,
    discountBadge: '-20%',
    rating: 5.0,
    images: [
      '/images/products/vertical-striped.png',
      '/images/products/checkered-shirt.png',
    ],
  },
  'cp-8': {
    ...defaultProduct,
    id: 'cp-8',
    name: 'COURAGE GRAPHIC T-SHIRT',
    category: 'T-shirts',
    price: 145,
    rating: 4.0,
    images: [
      '/images/products/courage-tshirt.png',
      '/images/products/gradient-graphic.png',
    ],
  },
  'cp-9': {
    ...defaultProduct,
    id: 'cp-9',
    name: 'LOOSE FIT BERMUDA SHORTS',
    category: 'Shorts',
    price: 80,
    rating: 3.0,
    images: [
      '/images/products/bermuda-shorts.png',
      '/images/products/skinny-jeans.png',
    ],
  },
  'na-5': {
    ...defaultProduct,
    id: 'na-5',
    name: 'VERTICAL STRIPED SHIRT',
    category: 'Shirts',
    price: 212,
    originalPrice: 232,
    discountBadge: '-20%',
    rating: 5.0,
    images: [
      '/images/products/vertical-striped.png',
      '/images/products/checkered-shirt.png',
    ],
  },
  'na-6': {
    ...defaultProduct,
    id: 'na-6',
    name: 'COURAGE GRAPHIC T-SHIRT',
    category: 'T-shirts',
    price: 145,
    rating: 4.0,
    images: [
      '/images/products/courage-tshirt.png',
      '/images/products/gradient-graphic.png',
    ],
  },
  'ts-5': {
    ...defaultProduct,
    id: 'ts-5',
    name: 'T-SHIRT WITH TAPE DETAILS',
    category: 'T-shirts',
    price: 120,
    rating: 4.5,
    images: [
      '/images/products/tshirt-tape.png',
      '/images/products/onelife-thumb1.png',
    ],
  },
  'ts-6': {
    ...defaultProduct,
    id: 'ts-6',
    name: 'CHECKERED SHIRT',
    category: 'Shirts',
    price: 180,
    rating: 4.5,
    images: [
      '/images/products/checkered-shirt.png',
      '/images/products/vertical-striped.png',
    ],
  },
};

export const sampleProductReviews: ReviewItem[] = [
  {
    id: 'r-1',
    author: 'Samantha D.',
    rating: 5,
    verified: true,
    content:
      'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It’s become my go-to shirt for casual outings.',
    date: 'Posted on August 14, 2023',
  },
  {
    id: 'r-2',
    author: 'Alex M.',
    rating: 5,
    verified: true,
    content:
      'The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I’m quite picky about aesthetics, and this shirt definitely gets a thumbs up from me.',
    date: 'Posted on August 15, 2023',
  },
  {
    id: 'r-3',
    author: 'Ethan R.',
    rating: 4.5,
    verified: true,
    content:
      'This t-shirt is a must-have for anyone who appreciates modern streetwear style. The minimalist design combined with the tailored fit makes it a standout piece in my wardrobe.',
    date: 'Posted on August 16, 2023',
  },
  {
    id: 'r-4',
    author: 'Olivia P.',
    rating: 5,
    verified: true,
    content:
      'As a fashion enthusiast, I’m always on the lookout for unique pieces. The subtle details and heavyweight feel of the fabric are incredible. Definitely buying in more colors!',
    date: 'Posted on August 17, 2023',
  },
  {
    id: 'r-5',
    author: 'Liam K.',
    rating: 4.5,
    verified: true,
    content:
      'This shirt is a fusion of comfort and urban style. The fit is perfectly oversized without looking sloppy. Customer service from baGGy was also exceptional.',
    date: 'Posted on August 18, 2023',
  },
  {
    id: 'r-6',
    author: 'Ava H.',
    rating: 5,
    verified: true,
    content:
      'I’m blown away by the craftsmanship. The drape is effortless, and the graphic hasn’t faded even after several washes. Truly a premium wardrobe staple.',
    date: 'Posted on August 19, 2023',
  },
];

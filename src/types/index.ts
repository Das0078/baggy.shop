export interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  category: 'new-arrivals' | 'top-selling';
  tagline?: string;
  swatches?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  comment: string;
}

export interface DressStyleItem {
  id: string;
  title: string;
  image: string;
  gridSpan: 'sm' | 'lg';
}

export interface NavLinkItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

declare global {
  interface Window {
    __splashActive?: boolean;
    __splashCompleted?: boolean;
    __replaySplash?: () => void;
  }
}


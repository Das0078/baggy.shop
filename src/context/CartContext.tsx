import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

export interface CartItem {
  id: string; // composite key: `${productId}-${size}-${color}`
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  maxLimit: number; // 5 for standard, 6 for discounted products
}

export interface AddProductPayload {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  image: string;
  size?: string;
  color?: string;
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: AddProductPayload) => { success: boolean; message: string };
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => { success: boolean; message?: string };
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  discountAmount: number;
  discountRate: number; // e.g. 0.2 for 20%
  deliveryFee: number;
  total: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'baggy_cart_items';
const PROMO_STORAGE_KEY = 'baggy_promo_code';

// Default initial items from Cart (1) 1.png design
const initialCartItems: CartItem[] = [
  {
    id: 'cp-1-Large-White',
    productId: 'cp-1',
    name: 'Gradient Graphic T-shirt',
    price: 145,
    image: '/images/products/gradient-graphic.png',
    size: 'Large',
    color: 'White',
    quantity: 1,
    maxLimit: 5, // normal product: max 5
  },
  {
    id: 'na-3-Medium-Red',
    productId: 'na-3',
    name: 'Checkered Shirt',
    price: 180,
    image: '/images/products/checkered-shirt.png',
    size: 'Medium',
    color: 'Red',
    quantity: 1,
    maxLimit: 5, // normal product: max 5
  },
  {
    id: 'na-2-Large-Blue',
    productId: 'na-2',
    name: 'Skinny Fit Jeans',
    price: 240,
    originalPrice: 260,
    discountBadge: '-20%',
    image: '/images/products/skinny-jeans.png',
    size: 'Large',
    color: 'Blue',
    quantity: 1,
    maxLimit: 6, // discounted product: max 6
  },
];

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback on JSON error
    }
    return initialCartItems;
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    return localStorage.getItem(PROMO_STORAGE_KEY) || 'BAGGY20';
  });

  const [discountRate, setDiscountRate] = useState<number>(0.2); // Default 20% discount as shown in Cart (1) 1.png
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota or error handling
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
    } catch {
      // Storage error handling
    }
  }, [promoCode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const clearToast = () => setToastMessage(null);

  // Helper to determine product max limit
  const getProductMaxLimit = (hasDiscount: boolean): number => {
    return hasDiscount ? 6 : 5;
  };

  // Add to cart with limit rules
  const addToCart = (product: AddProductPayload): { success: boolean; message: string } => {
    const size = product.size || 'Large';
    const color = product.color || 'Default';
    const addQty = product.quantity && product.quantity > 0 ? product.quantity : 1;
    const hasDiscount = Boolean(product.discountBadge || (product.originalPrice && product.originalPrice > product.price));
    const maxLimit = getProductMaxLimit(hasDiscount);
    const cartItemId = `${product.id}-${size}-${color}`;

    let result = { success: true, message: `Added ${product.name} to bag!` };

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);

      if (existingIndex > -1) {
        const existing = prevItems[existingIndex];
        const newTotal = existing.quantity + addQty;

        if (newTotal > maxLimit) {
          const allowedAdd = Math.max(0, maxLimit - existing.quantity);
          if (allowedAdd <= 0) {
            result = {
              success: false,
              message: `Maximum limit of ${maxLimit} reached for this ${hasDiscount ? 'discounted' : 'standard'} item.`,
            };
            showToast(result.message);
            return prevItems;
          }
          result = {
            success: true,
            message: `Added ${allowedAdd} items. Reached limit of ${maxLimit}.`,
          };
          showToast(result.message);
          const updated = [...prevItems];
          updated[existingIndex] = { ...existing, quantity: maxLimit };
          return updated;
        }

        const updated = [...prevItems];
        updated[existingIndex] = { ...existing, quantity: newTotal };
        result = { success: true, message: `Updated bag quantity to ${newTotal}.` };
        showToast(result.message);
        return updated;
      }

      // Brand new item
      const initialQty = Math.min(addQty, maxLimit);
      if (addQty > maxLimit) {
        result = {
          success: true,
          message: `Added ${initialQty} items (capped at max limit of ${maxLimit}).`,
        };
      } else {
        result = { success: true, message: `Added ${product.name} to bag!` };
      }
      showToast(result.message);

      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        discountBadge: product.discountBadge,
        image: product.image,
        size,
        color,
        quantity: initialQty,
        maxLimit,
      };

      return [...prevItems, newItem];
    });

    return result;
  };

  // Remove from cart
  const removeFromCart = (itemId: string) => {
    setItems((prev) => {
      const removed = prev.find((item) => item.id === itemId);
      if (removed) {
        showToast(`Removed ${removed.name} from bag.`);
      }
      return prev.filter((item) => item.id !== itemId);
    });
  };

  // Update quantity with max limit validation
  const updateQuantity = (itemId: string, newQty: number): { success: boolean; message?: string } => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return { success: true, message: 'Item removed from bag.' };
    }

    let result: { success: boolean; message?: string } = { success: true };

    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === itemId) {
          if (newQty > item.maxLimit) {
            const hasDiscount = item.maxLimit === 6;
            const msg = `Maximum limit of ${item.maxLimit} reached for this ${hasDiscount ? 'discounted' : 'standard'} item.`;
            showToast(msg);
            result = { success: false, message: msg };
            return { ...item, quantity: item.maxLimit };
          }
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });

    return result;
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    showToast('Your bag has been emptied.');
  };

  // Apply promo code logic
  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      return { success: false, message: 'Please enter a promo code.' };
    }

    if (clean === 'BAGGY20' || clean === 'DISCOUNT20' || clean === 'FIRST20') {
      setPromoCode(clean);
      setDiscountRate(0.2);
      const msg = 'Promo code applied: 20% discount!';
      showToast(msg);
      return { success: true, message: msg };
    }

    if (clean === 'BAGGY30' || clean === 'VIP30') {
      setPromoCode(clean);
      setDiscountRate(0.3);
      const msg = 'VIP promo code applied: 30% discount!';
      showToast(msg);
      return { success: true, message: msg };
    }

    const msg = 'Invalid promo code. Try BAGGY20 or BAGGY30';
    showToast(msg);
    return { success: false, message: msg };
  };

  // Financial calculations
  const { totalCount, subtotal, discountAmount, deliveryFee, total } = useMemo(() => {
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    const sub = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const disc = Math.round(sub * discountRate);
    const delivery = sub > 0 ? 15 : 0;
    const finalTotal = Math.max(0, sub - disc + delivery);

    return {
      totalCount: count,
      subtotal: sub,
      discountAmount: disc,
      deliveryFee: delivery,
      total: finalTotal,
    };
  }, [items, discountRate]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        discountAmount,
        discountRate,
        deliveryFee,
        total,
        promoCode,
        applyPromoCode,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

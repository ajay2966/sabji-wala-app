import { ImageSourcePropType } from 'react-native';

export type Category = 'Leafy' | 'Roots' | 'Fruit veg' | 'Fruits' | 'Others';
export type OrderStatus = 'pending' | 'confirmed' | 'rejected';

export type User = {
  id: string;
  name: string;
  mobile: string;
  address: string;
  createdAt: string;
};
export type Product = {
  id: string;
  name: string;
  emoji: string;
  imageSource?: ImageSourcePropType;
  category: Category;
  pricePerKg: number;
  description: string;
  inStock: boolean;
};
export type CartItem = { productId: string; qtyKg: number };
export type OrderItem = CartItem &
  Pick<Product, 'name' | 'emoji' | 'pricePerKg'>;
export type Order = {
  id: number;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  address: string;
  deliverySlot: 'Morning' | 'Evening';
  paymentMethod: 'COD';
  status: OrderStatus;
  rejectReason?: string;
  createdAt: string;
  updatedAt: string;
};

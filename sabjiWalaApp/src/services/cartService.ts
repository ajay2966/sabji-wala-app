import { STORAGE_KEYS } from '../config/constants';
import { getItem, setItem } from '../storage/storage';
import { CartItem } from '../types/models';

const key = (userId: string) => `${STORAGE_KEYS.carts}:${userId}`;
export const getCart = (userId: string) => getItem<CartItem[]>(key(userId), []);
export const saveCart = (userId: string, cart: CartItem[]) =>
  setItem(key(userId), cart);

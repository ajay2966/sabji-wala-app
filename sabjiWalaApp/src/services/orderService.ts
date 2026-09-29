import { STORAGE_KEYS } from '../config/constants';
import { getItem, setItem } from '../storage/storage';
import { Order } from '../types/models';

export const getOrders = () => getItem<Order[]>(STORAGE_KEYS.orders, []);
export const saveOrders = (orders: Order[]) =>
  setItem(STORAGE_KEYS.orders, orders);
export async function nextOrderId() {
  const next = await getItem<number>(STORAGE_KEYS.orderCounter, 1001);
  await setItem(STORAGE_KEYS.orderCounter, next + 1);
  return next;
}

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { DELIVERY_FEE } from '../config/constants';
import * as authService from '../services/authService';
import * as cartService from '../services/cartService';
import * as orderService from '../services/orderService';
import { loadProducts } from '../services/productService';
import { clearStorage, getItem, setItem } from '../storage/storage';
import { CartItem, Order, OrderItem, Product, User } from '../types/models';

type State = {
  hydrated: boolean;
  users: User[];
  session: string | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  address: string;
};
const initialState: State = {
  hydrated: false,
  users: [],
  session: null,
  products: [],
  cart: [],
  orders: [],
  address: '',
};
type Action =
  | { type: 'hydrate'; payload: Omit<State, 'hydrated'> }
  | { type: 'set'; key: keyof Omit<State, 'hydrated'>; value: any };
function reducer(state: State, action: Action): State {
  if (action.type === 'hydrate') return { hydrated: true, ...action.payload };
  return { ...state, [action.key]: action.value };
}

type ContextValue = State & {
  register: (
    name: string,
    mobile: string,
    address: string,
  ) => Promise<string | null>;
  login: (mobile: string) => Promise<string | null>;
  logout: () => Promise<void>;
  addToCart: (productId: string, qtyKg?: number) => Promise<void>;
  updateCart: (productId: string, qtyKg: number) => Promise<void>;
  placeOrder: (
    address: string,
    deliverySlot: 'Morning' | 'Evening',
  ) => Promise<Order>;
  refreshOrders: () => Promise<void>;
  resetAppData: () => Promise<void>;
};
const AppContext = createContext<ContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      const users = await authService.getUsers();
      const session = await authService.getSession();
      const products = await loadProducts();
      const orders = await orderService.getOrders();
      const cart = session ? await cartService.getCart(session) : [];
      const address = session ? await getItem(`address:${session}`, '') : '';
      dispatch({
        type: 'hydrate',
        payload: { users, session, products, orders, cart, address },
      });
    })();
  }, []);

  const register = async (name: string, mobile: string, address: string) => {
    if (state.users.some(user => user.mobile === mobile)) return 'exists';
    const user: User = {
      id: `user-${Date.now()}`,
      name,
      mobile,
      address,
      createdAt: new Date().toISOString(),
    };
    const users = [...state.users, user];
    await authService.saveUsers(users);
    await authService.saveSession(user.id);
    dispatch({ type: 'set', key: 'users', value: users });
    dispatch({ type: 'set', key: 'session', value: user.id });
    await setItem(`address:${user.id}`, address);
    dispatch({ type: 'set', key: 'address', value: address });
    return null;
  };
  const login = async (mobile: string) => {
    const user = state.users.find(item => item.mobile === mobile);
    if (!user) return 'missing';
    await authService.saveSession(user.id);
    const cart = await cartService.getCart(user.id);
    const address = user.address || (await getItem(`address:${user.id}`, ''));
    dispatch({ type: 'set', key: 'session', value: user.id });
    dispatch({ type: 'set', key: 'cart', value: cart });
    dispatch({ type: 'set', key: 'address', value: address });
    return null;
  };
  const logout = async () => {
    await authService.saveSession(null);
    dispatch({ type: 'set', key: 'session', value: null });
    dispatch({ type: 'set', key: 'cart', value: [] });
  };
  const persistCart = async (cart: CartItem[]) => {
    if (!state.session) return;
    await cartService.saveCart(state.session, cart);
    dispatch({ type: 'set', key: 'cart', value: cart });
  };
  const addToCart = async (productId: string, qtyKg = 1) => {
    const existing = state.cart.find(item => item.productId === productId);
    await persistCart(
      existing
        ? state.cart.map(item =>
            item.productId === productId
              ? { ...item, qtyKg: item.qtyKg + qtyKg }
              : item,
          )
        : [...state.cart, { productId, qtyKg }],
    );
  };
  const updateCart = async (productId: string, qtyKg: number) =>
    await persistCart(
      state.cart
        .map(item => (item.productId === productId ? { ...item, qtyKg } : item))
        .filter(item => item.qtyKg > 0),
    );
  const placeOrder = async (
    address: string,
    deliverySlot: 'Morning' | 'Evening',
  ) => {
    if (!state.session) throw new Error('Not logged in');
    const orderItems: OrderItem[] = state.cart.map(item => {
      const product = state.products.find(p => p.id === item.productId)!;
      return {
        ...item,
        name: product.name,
        emoji: product.emoji,
        pricePerKg: product.pricePerKg,
      };
    });
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.pricePerKg * item.qtyKg,
      0,
    );
    const now = new Date().toISOString();
    const order: Order = {
      id: await orderService.nextOrderId(),
      userId: state.session,
      items: orderItems,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      address,
      deliverySlot,
      paymentMethod: 'COD',
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    const orders = [order, ...state.orders];
    await orderService.saveOrders(orders);
    await cartService.saveCart(state.session, []);
    await setItem(`address:${state.session}`, address);
    dispatch({ type: 'set', key: 'orders', value: orders });
    dispatch({ type: 'set', key: 'cart', value: [] });
    dispatch({ type: 'set', key: 'address', value: address });
    return order;
  };
  const refreshOrders = async () =>
    dispatch({
      type: 'set',
      key: 'orders',
      value: await orderService.getOrders(),
    });
  const resetAppData = async () => clearStorage();
  return (
    <AppContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        addToCart,
        updateCart,
        placeOrder,
        refreshOrders,
        resetAppData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}

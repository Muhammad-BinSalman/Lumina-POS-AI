
import { create } from 'zustand';
import { StoreState, ViewMode, AppSection, Product, Customer } from './types';

export const useStore = create<StoreState>((set) => ({
  view: 'landing',
  section: 'dashboard',
  isDarkMode: true,
  isSidebarOpen: true,
  cart: [],
  detectedCustomer: null,

  setView: (view: ViewMode) => set({ view }),
  setSection: (section: AppSection) => set({ section }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  addToCart: (product: Product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1, discount: 0 }] };
  }),

  removeFromCart: (productId: string) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),

  updateCartQty: (productId: string, qty: number) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === productId ? { ...item, quantity: Math.max(0, qty) } : item
    ).filter(item => item.quantity > 0)
  })),

  updateCartDiscount: (productId: string, discount: number) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, discount: Math.max(0, discount) } : item
    )
  })),

  clearCart: () => set({ cart: [], detectedCustomer: null }),

  setDetectedCustomer: (customer: Customer | null) => set({ detectedCustomer: customer }),
}));

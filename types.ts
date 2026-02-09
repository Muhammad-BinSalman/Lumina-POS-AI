
export type ViewMode = 'landing' | 'app';
export type AppSection = 'dashboard' | 'finance' | 'pos' | 'cashier' | 'products' | 'customers' | 'orders' | 'reports' | 'insights' | 'settings';

export type UserRole = 'owner' | 'manager' | 'cashier';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  storeId: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  trending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  discount?: number; // percentage or fixed
}

export interface Customer {
  id: string;
  name: string;
  lastVisit: string;
  totalSpent: number;
  avatar: string;
  preferences?: string[];
}

export interface SaleRecord {
  id: string;
  customerName: string;
  customerAvatar: string;
  amount: number;
  time: string;
  status: 'completed' | 'pending';
}

export interface StoreState {
  view: ViewMode;
  section: AppSection;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  cart: CartItem[];
  detectedCustomer: Customer | null;
  setView: (view: ViewMode) => void;
  setSection: (section: AppSection) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  updateCartDiscount: (productId: string, discount: number) => void;
  clearCart: () => void;
  setDetectedCustomer: (customer: Customer | null) => void;
}

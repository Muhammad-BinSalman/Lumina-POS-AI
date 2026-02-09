
import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const STORAGE_KEY = 'lumina_auth_user';

const getInitialUser = (): User | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : { id: 'u1', name: 'Marcus Smith', role: 'owner', storeId: 'nyc-01' };
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  isAuthenticated: !!getInitialUser(),
  loginAs: (role: UserRole) => {
    const names = {
      owner: 'Sarah Connor',
      manager: 'James Carter',
      cashier: 'Alex Rivera'
    };
    const newUser: User = { 
      id: `u-${role}`, 
      name: names[role], 
      role, 
      storeId: 'nyc-01' 
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },
}));

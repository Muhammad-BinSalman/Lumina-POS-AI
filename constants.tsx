
import React from 'react';
import { 
  Zap, Shield, TrendingUp, Mic, BarChart3, Store,
  Smartphone, Laptop, Headphones, Watch, MousePointer2, Camera
} from 'lucide-react';
import { Product, Customer, SaleRecord } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'AirPods Max', category: 'Audio', price: 549, stock: 12, image: 'https://picsum.photos/seed/airpods/400/400', trending: true },
  { id: '2', name: 'MacBook Pro M3', category: 'Computing', price: 1999, stock: 5, image: 'https://picsum.photos/seed/macbook/400/400' },
  { id: '3', name: 'Apple Watch Ultra', category: 'Wearables', price: 799, stock: 8, image: 'https://picsum.photos/seed/watch/400/400', trending: true },
  { id: '4', name: 'iPhone 15 Pro', category: 'Mobile', price: 999, stock: 15, image: 'https://picsum.photos/seed/iphone/400/400' },
  { id: '5', name: 'Magic Mouse', category: 'Accessories', price: 79, stock: 25, image: 'https://picsum.photos/seed/mouse/400/400' },
  { id: '6', name: 'Studio Display', category: 'Monitors', price: 1599, stock: 3, image: 'https://picsum.photos/seed/display/400/400' },
  { id: '7', name: 'HomePod Mini', category: 'Audio', price: 99, stock: 30, image: 'https://picsum.photos/seed/homepod/400/400' },
  { id: '8', name: 'iPad Air', category: 'Tablets', price: 599, stock: 10, image: 'https://picsum.photos/seed/ipad/400/400' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Alex Rivera', lastVisit: '2 hours ago', totalSpent: 4250, avatar: 'https://i.pravatar.cc/150?u=alex', preferences: ['Audio', 'Computing'] },
  { id: 'c2', name: 'Sarah Chen', lastVisit: 'Just now', totalSpent: 12900, avatar: 'https://i.pravatar.cc/150?u=sarah', preferences: ['Mobile', 'Accessories'] },
  { id: 'c3', name: 'Marcus Jones', lastVisit: 'Yesterday', totalSpent: 850, avatar: 'https://i.pravatar.cc/150?u=marcus' },
];

export const RECENT_SALES: SaleRecord[] = [
  { id: 'S1024', customerName: 'Alex Rivera', customerAvatar: 'https://i.pravatar.cc/150?u=alex', amount: 549.00, time: '14:20 PM', status: 'completed' },
  { id: 'S1023', customerName: 'Sarah Chen', customerAvatar: 'https://i.pravatar.cc/150?u=sarah', amount: 2499.00, time: '13:15 PM', status: 'completed' },
  { id: 'S1022', customerName: 'Jordan Smith', customerAvatar: 'https://i.pravatar.cc/150?u=jordan', amount: 79.50, time: '12:45 PM', status: 'completed' },
  { id: 'S1021', customerName: 'Anonymous', customerAvatar: 'https://i.pravatar.cc/150?u=anon', amount: 120.00, time: '11:30 AM', status: 'pending' },
];

export const FEATURES = [
  { icon: <Zap className="w-6 h-6 text-cyan-400" />, title: 'AI Smart Checkout', desc: 'Auto-detect items and suggest add-ons in milliseconds.' },
  { icon: <Camera className="w-6 h-6 text-indigo-400" />, title: 'Facial Recognition', desc: 'Greet regulars by name and pull up their history instantly.' },
  { icon: <TrendingUp className="w-6 h-6 text-emerald-400" />, title: 'Predictive Inventory', desc: 'Never run out of stock with AI-driven demand forecasting.' },
  { icon: <Mic className="w-6 h-6 text-rose-400" />, title: 'Voice & Gesture', desc: 'Hands-free operation for busy service environments.' },
  { icon: <BarChart3 className="w-6 h-6 text-purple-400" />, title: 'AI Insights', desc: 'Real-time data crunching to maximize your store margins.' },
  { icon: <Store className="w-6 h-6 text-blue-400" />, title: 'Multi-store Cloud', desc: 'Sync inventory and sales across global locations seamlessly.' },
];


import React from 'react';
import { 
  LayoutDashboard, ShoppingCart, Receipt, Package, Users, 
  History, BarChart2, Sparkles, Settings, LogOut, ChevronLeft, Zap, Box, 
  LineChart, Shield
} from 'lucide-react';
import { useStore } from '../store';
import { useAuthStore } from '../stores/useAuthStore';
import { AppSection } from '../types';

export const Sidebar: React.FC = () => {
  const { section, setSection, isSidebarOpen, toggleSidebar, setView } = useStore();
  const { user } = useAuthStore();

  const role = user?.role || 'cashier';

  // Navigation filtering logic
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['owner', 'manager'] },
    { id: 'finance', label: 'Finance', icon: LineChart, roles: ['owner'], highlight: true },
    { id: 'pos', label: 'POS Terminal', icon: ShoppingCart, roles: ['owner', 'manager', 'cashier'] },
    { id: 'cashier', label: 'Cashier Flow', icon: Receipt, roles: ['owner', 'manager', 'cashier'] },
    { id: 'products', label: 'Products', icon: Package, roles: ['owner', 'manager'] },
    { id: 'customers', label: 'Customers', icon: Users, roles: ['owner', 'manager'] },
    { id: 'orders', label: 'Orders', icon: History, roles: ['owner', 'manager', 'cashier'] },
    { id: 'reports', label: 'Reports', icon: BarChart2, roles: ['owner', 'manager'] },
    { id: 'insights', label: 'AI Insights', icon: Sparkles, roles: ['owner'] },
  ].filter(item => item.roles.includes(role));

  return (
    <aside className={`fixed left-0 top-0 h-full z-40 bg-[#0F0F0F] border-r border-white/5 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="min-w-[40px] h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          {isSidebarOpen && <span className="text-xl font-bold tracking-tight font-satoshi whitespace-nowrap">LUMINA</span>}
        </div>
        <button onClick={toggleSidebar} className="p-1 hover:bg-white/5 rounded-lg text-slate-500">
          <ChevronLeft className={`transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-grow px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = section === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSection(item.id as AppSection)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group
                ${isActive 
                  ? 'bg-indigo-600/10 text-indigo-400' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}
                ${item.highlight ? 'mt-2 mb-2 border border-indigo-500/20 bg-indigo-500/5' : ''}
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
              {isSidebarOpen && <span className="font-medium whitespace-nowrap text-sm">{item.label}</span>}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-4 px-3 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        {role !== 'cashier' && isSidebarOpen && (
          <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Box className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Store</span>
            </div>
            <select className="bg-transparent text-xs w-full outline-none font-bold text-slate-300">
              <option>Flagship NYC</option>
              <option>Warehouse NJ</option>
            </select>
          </div>
        )}
        
        {role === 'owner' && (
          <button onClick={() => setSection('settings')} className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium text-sm">Settings</span>}
          </button>
        )}

        <button onClick={() => setView('landing')} className="w-full flex items-center gap-4 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

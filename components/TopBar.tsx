
import React, { useState } from 'react';
import { Search, Bell, Plus, User, Moon, Sun, Command, ChevronDown, Shield, LogOut } from 'lucide-react';
import { useStore } from '../store';
import { useAuthStore } from '../stores/useAuthStore';
import { UserRole } from '../types';

export const TopBar: React.FC = () => {
  const { isDarkMode, toggleTheme, isSidebarOpen } = useStore();
  const { user, loginAs, logout } = useAuthStore();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  return (
    <header className={`h-16 fixed top-0 right-0 left-0 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 z-30 px-6 flex items-center justify-between transition-all ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
      <div className="flex items-center gap-4 flex-grow max-w-2xl">
        <div className="relative group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="AI Search products, transactions, or financial data..." 
            className="w-full bg-slate-900/50 border border-white/5 rounded-full py-2 pl-12 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[10px] text-slate-500 font-bold">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher for Demo */}
        <div className="relative">
          <button 
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-all"
          >
            <Shield className="w-3 h-3 text-indigo-400" />
            {user?.role}
            <ChevronDown className="w-3 h-3" />
          </button>
          
          {isRoleMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsRoleMenuOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase">Switch Role (Demo)</div>
                {(['owner', 'manager', 'cashier'] as UserRole[]).map(role => (
                  <button 
                    key={role}
                    onClick={() => { loginAs(role); setIsRoleMenuOpen(false); window.location.reload(); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all capitalize
                      ${user?.role === role ? 'bg-indigo-600 text-white' : 'hover:bg-white/5 text-slate-400'}
                    `}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button onClick={toggleTheme} className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full border border-[#0A0A0A]" />
        </button>

        <div className="h-8 w-px bg-white/5 mx-1" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{user?.name}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.role}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/10">
            <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden">
              <img src={`https://i.pravatar.cc/150?u=${user?.id}`} alt="User" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

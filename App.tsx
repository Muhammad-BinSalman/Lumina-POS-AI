
import React, { useEffect } from 'react';
import { useStore } from './store';
import { useAuthStore } from './stores/useAuthStore';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardHome } from './components/DashboardHome';
import { PosTerminal } from './components/PosTerminal';
import { CashierCheckout } from './components/CashierCheckout';
import { FinanceDashboard } from './components/FinanceDashboard';

const App: React.FC = () => {
  const { view, section, setSection, isDarkMode, isSidebarOpen } = useStore();
  const { user, isAuthenticated } = useAuthStore();

  // Role-based routing logic
  useEffect(() => {
    if (view === 'app' && user) {
      // Redirect cashiers away from restricted dashboards
      if (user.role === 'cashier' && (section === 'dashboard' || section === 'finance' || section === 'reports')) {
        setSection('cashier');
      }
      // Redirect managers away from finance
      if (user.role === 'manager' && section === 'finance') {
        setSection('dashboard');
      }
    }
  }, [view, section, user, setSection]);

  if (view === 'landing') {
    return <LandingPage />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0A0A0A] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar />
      <TopBar />
      
      <main className={`pt-24 px-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-satoshi capitalize">{section.replace('-', ' ')}</h1>
              <p className="text-slate-500 text-sm mt-1">
                Store: {user?.storeId.toUpperCase()} • Role: <span className="text-indigo-400 font-bold uppercase text-xs">{user?.role}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="hidden sm:block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-500">
                  CTRL + S Search
               </div>
               <div className="hidden sm:block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-500">
                  CTRL + D Sale
               </div>
            </div>
          </div>

          {/* Role Protected Rendering */}
          {section === 'dashboard' && <DashboardHome />}
          {section === 'finance' && user?.role === 'owner' && <FinanceDashboard />}
          {section === 'pos' && <PosTerminal />}
          {section === 'cashier' && <CashierCheckout />}
          
          {/* Fallback for unauthorized or missing modules */}
          {(!['dashboard', 'finance', 'pos', 'cashier'].includes(section) || (section === 'finance' && user?.role !== 'owner')) && (
            <div className="h-[500px] flex flex-col items-center justify-center bg-slate-900/50 rounded-3xl border border-white/5 text-center px-6">
              <div className="p-5 bg-indigo-600/10 rounded-2xl mb-6">
                 {section === 'finance' ? (
                   <svg className="w-16 h-16 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                 ) : (
                   <svg className="w-16 h-16 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                 )}
              </div>
              <h2 className="text-2xl font-bold">
                {section === 'finance' ? 'Unauthorized Access' : 'Module Optimization'}
              </h2>
              <p className="text-slate-500 mt-2 max-w-sm">
                {section === 'finance' 
                  ? 'The Finance suite is only accessible to store owners. Please contact your administrator if you believe this is an error.' 
                  : `The ${section} suite is currently being optimized by Lumina AI for your role.`}
              </p>
              <button 
                onClick={() => setSection(user?.role === 'cashier' ? 'cashier' : 'dashboard')} 
                className="mt-8 px-10 py-3 bg-indigo-600 rounded-full font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-transform"
              >
                Back to Safe Zone
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;


import React from 'react';
import { 
  TrendingUp, Users, ShoppingBag, ArrowUpRight, 
  ArrowDownRight, Sparkles, BrainCircuit, Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RECENT_SALES } from '../constants';

const CHART_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 4800 },
  { name: 'Fri', sales: 6500 },
  { name: 'Sat', sales: 8000 },
  { name: 'Sun', sales: 7200 },
];

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Today's Revenue", value: "$12,450.80", icon: TrendingUp, change: "+12.5%", positive: true },
          { label: "Active Orders", value: "84", icon: ShoppingBag, change: "+5.2%", positive: true },
          { label: "Avg. Ticket Size", value: "$148.20", icon: Users, change: "-2.1%", positive: false },
          { label: "Restock Prediction", value: "3 Items", icon: BrainCircuit, change: "Critical", positive: false, alert: true },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-indigo-500/50 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-600/10 rounded-xl">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${card.positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {card.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {card.change}
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{card.label}</h3>
              <div className="text-2xl font-bold tracking-tight">{card.value}</div>
              {card.alert && (
                <div className="mt-3 text-[10px] bg-rose-500/10 text-rose-400 py-1 px-2 rounded-lg border border-rose-500/20 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Restock needed for: AirPods Max
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Forecast */}
        <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold font-satoshi">Weekly Sales Forecast</h3>
              <p className="text-slate-400 text-sm">AI-driven predictive analysis for this week</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-indigo-600 rounded-full text-xs font-bold">7 Days</button>
              <button className="px-4 py-1.5 bg-white/5 rounded-full text-xs font-bold hover:bg-white/10">30 Days</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Side Panel */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold font-satoshi">Lumina AI Insights</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">Trending Item</h4>
              <p className="text-sm font-medium mb-1">AirPods Max demand is up 42%</p>
              <p className="text-slate-400 text-xs italic">"Restock within 48 hours to avoid stockout."</p>
            </div>

            <div className="p-4 bg-cyan-600/10 border border-cyan-500/20 rounded-xl">
              <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">Customer Pattern</h4>
              <p className="text-sm font-medium mb-1">Sarah Chen just entered</p>
              <p className="text-slate-400 text-xs">Based on history, Sarah is 85% likely to purchase MacBook Pro accessories today.</p>
            </div>

            <div className="p-4 bg-amber-600/10 border border-amber-500/20 rounded-xl">
              <h4 className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">Inventory Alert</h4>
              <p className="text-sm font-medium mb-1">Magic Mouse overstock</p>
              <p className="text-slate-400 text-xs">"Bundle with MacBook Pro for 15% off to clear 8 units."</p>
            </div>
          </div>

          <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all border border-white/10">
            View All Insights
          </button>
        </div>
      </div>

      {/* Recent Transactions & Traffic Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-satoshi">Recent Transactions</h3>
            <button className="text-indigo-400 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Customer</th>
                  <th className="pb-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Order ID</th>
                  <th className="pb-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Amount</th>
                  <th className="pb-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Time</th>
                  <th className="pb-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {RECENT_SALES.map((sale) => (
                  <tr key={sale.id} className="group hover:bg-white/2 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={sale.customerAvatar} className="w-8 h-8 rounded-full" alt="" />
                        <span className="font-medium text-sm">{sale.customerName}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-400">{sale.id}</td>
                    <td className="py-4 text-sm font-bold">${sale.amount.toFixed(2)}</td>
                    <td className="py-4 text-sm text-slate-400">{sale.time}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${sale.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Heatmap (Mock) */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
          <h3 className="text-xl font-bold font-satoshi mb-2">Store Traffic Heatmap</h3>
          <p className="text-xs text-slate-400 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live feed tracking 12 customers
          </p>
          
          <div className="relative aspect-square bg-slate-800/50 rounded-xl border border-white/5 flex items-center justify-center">
            {/* Mock Layout Grid */}
            <div className="grid grid-cols-4 grid-rows-4 w-full h-full gap-2 p-4">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-lg transition-all duration-1000 ${
                    [0, 5, 6, 10, 15].includes(i) 
                    ? 'bg-rose-500/40 animate-pulse' 
                    : [1, 4, 9, 14].includes(i) 
                      ? 'bg-amber-500/20' 
                      : 'bg-indigo-500/10'
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-slate-900/90 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold shadow-2xl">
                High Activity: Tech Zone
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold">14</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">ENTRIES</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">8.4m</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">AVG VISIT</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">34%</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">CONV RATE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

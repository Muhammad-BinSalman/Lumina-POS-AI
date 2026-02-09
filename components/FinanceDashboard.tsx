
import React from 'react';
import { 
  TrendingUp, TrendingDown, ArrowUpRight, BrainCircuit, 
  Info, DollarSign, PieChart, LineChart as LucideLineChart, 
  Search, MessageSquare, AlertCircle, Zap 
} from 'lucide-react';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, 
  PieChart as RechartsPieChart, Pie, Cell 
} from 'recharts';
import { 
  FINANCE_KPI_DATA, PROFIT_LOSS_CHART, 
  EXPENSE_DISTRIBUTION, AI_FINANCE_INSIGHTS 
} from '../data/mockFinance';

export const FinanceDashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-satoshi flex items-center gap-2">
            Finance Overview <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] rounded uppercase">Owner View</span>
          </h2>
          <p className="text-slate-500 text-sm">Real-time consolidated profit & loss data for NYC-01</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-white/5 p-1 rounded-xl">
          <button className="px-4 py-1.5 bg-indigo-600 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-600/20">Monthly</button>
          <button className="px-4 py-1.5 text-slate-500 hover:text-white text-xs font-bold transition-all">Quarterly</button>
          <button className="px-4 py-1.5 text-slate-500 hover:text-white text-xs font-bold transition-all">Yearly</button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {FINANCE_KPI_DATA.map((kpi, i) => (
          <div key={i} className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl hover:border-indigo-500/30 transition-all group relative cursor-help">
            <div className="absolute top-3 right-3 text-slate-600 group-hover:text-indigo-400 transition-colors">
              <Info className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</h4>
            <div className="text-xl font-bold tracking-tight mb-2">{kpi.value}</div>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold ${kpi.change.includes('+') ? 'text-emerald-500' : kpi.change === 'Stable' ? 'text-slate-500' : 'text-rose-500'}`}>
                {kpi.change}
              </span>
              <div className="w-16 h-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kpi.sparkline.map((v, idx) => ({ v, idx }))}>
                    <Area type="monotone" dataKey="v" stroke={kpi.change.includes('+') ? '#10b981' : '#4f46e5'} fill="transparent" strokeWidth={1.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* P&L Analysis */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold font-satoshi flex items-center gap-2 text-lg">
                Profit & Loss Trend <LucideLineChart className="w-4 h-4 text-indigo-400" />
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-indigo-600 rounded-full" /> Revenue</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-slate-700 rounded-full" /> Expenses</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-cyan-400 rounded-full" /> Profit</div>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={PROFIT_LOSS_CHART}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid #1E293B' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar dataKey="expenses" fill="#334155" radius={[4, 4, 0, 0]} barSize={24} />
                  <Line type="monotone" dataKey="profit" stroke="#22D3EE" strokeWidth={3} dot={{ fill: '#22D3EE', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Expense Breakdown */}
             <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                <h3 className="font-bold font-satoshi mb-6 flex items-center gap-2">
                  Expense Distribution <PieChart className="w-4 h-4 text-indigo-400" />
                </h3>
                <div className="h-[250px] flex items-center">
                  <ResponsiveContainer width="60%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={EXPENSE_DISTRIBUTION}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {EXPENSE_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="w-[40%] space-y-3">
                    {EXPENSE_DISTRIBUTION.map((entry, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-slate-400">{entry.name}</span>
                        </div>
                        <span>{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
             </div>

             {/* Revenue Channels */}
             <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl flex flex-col justify-center">
                <h3 className="font-bold font-satoshi mb-6 flex items-center gap-2">
                  Channel Performance <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </h3>
                <div className="space-y-6">
                  {[
                    { name: 'Direct Sales', value: 78, trend: '+5%' },
                    { name: 'E-commerce', value: 42, trend: '+12%' },
                    { name: 'Marketplace', value: 24, trend: '-2%' }
                  ].map((chan, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400">{chan.name}</span>
                        <span className="text-indigo-400">{chan.trend}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${chan.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* AI Finance Copilot */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 bg-indigo-500/10 blur-[60px] rounded-full -z-10" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <BrainCircuit className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold font-satoshi text-lg leading-tight">AI Finance Copilot</h3>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Active Insight Engine</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {AI_FINANCE_INSIGHTS.map((insight, idx) => {
                const Icon = insight.icon === 'TrendingDown' ? TrendingDown : 
                             insight.icon === 'BrainCircuit' ? BrainCircuit : 
                             insight.icon === 'Zap' ? Zap : AlertCircle;
                return (
                  <div key={idx} className={`p-4 rounded-2xl border transition-all hover:translate-x-1 cursor-pointer
                    ${insight.type === 'critical' ? 'bg-rose-500/5 border-rose-500/20 text-rose-200' :
                      insight.type === 'warning' ? 'bg-amber-500/5 border-amber-500/20 text-amber-200' :
                      insight.type === 'positive' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-200' :
                      'bg-indigo-500/5 border-indigo-500/20 text-indigo-200'}
                  `}>
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-80">{insight.title}</div>
                        <p className="text-xs leading-relaxed opacity-90">{insight.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative group/input">
              <input 
                type="text" 
                placeholder="Ask AI Finance anything..." 
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-indigo-500/50 transition-all"
              />
              <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-indigo-400" />
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Cash Forecast (30D)</h4>
            <div className="flex items-end gap-3 h-24">
              {[60, 65, 55, 70, 85, 95, 110].map((h, idx) => (
                <div key={idx} className="flex-grow bg-indigo-600/20 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all duration-1000" 
                    style={{ height: `${h}%` }}
                  />
                  {idx === 6 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-indigo-600 text-[10px] font-bold rounded shadow-lg">
                      $410k
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { useStore } from '../store';
import { FEATURES } from '../constants';
import { ChevronRight, Play, CheckCircle2, Menu, X, Globe, Zap, Cpu } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setView, isDarkMode } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0A0A0A] text-white' : 'bg-white text-slate-900'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-opacity-80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-bold tracking-tight font-satoshi">LUMINA<span className="text-indigo-500">POS</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          <a href="#demo" className="hover:text-indigo-400 transition-colors">Demo</a>
          <a href="#blog" className="hover:text-indigo-400 transition-colors">Blog</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => setView('app')} className="px-4 py-2 hover:text-indigo-400 transition-colors">Log in</button>
          <button onClick={() => setView('app')} className="px-6 py-2 bg-indigo-600 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 animate-glow">
            Start Free Trial
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Abstract Background Decor */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-cyan-400/10 blur-[80px] rounded-full animate-pulse -z-10" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-indigo-400 mb-8 animate-bounce">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
          NEXT-GEN AI RETAIL ENGINE
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-tight font-satoshi">
          The AI POS that thinks <br />
          <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">faster than your cashier</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Real-time inventory • Facial recognition • Predictive restocking • Zero training. 
          Manage your entire retail empire with the intelligence of Lumina.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button onClick={() => setView('app')} className="px-8 py-4 bg-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all flex items-center gap-2 group">
            Get Started Free <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2">
            <Play className="w-5 h-5 fill-current text-indigo-400" /> Watch 90s Demo
          </button>
        </div>

        <div className="mt-20 relative w-full max-w-5xl group">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10 transition-transform hover:scale-[1.01] duration-500">
            <img src="https://picsum.photos/seed/posdashboard/1200/800" alt="Dashboard Preview" className="w-full opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>
        </div>
      </header>

      {/* Trusted By */}
      <section className="py-12 border-y border-white/5 bg-white/2">
        <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-widest mb-8">Powering modern commerce for</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale contrast-125">
          <span className="text-2xl font-bold">NIKE</span>
          <span className="text-2xl font-bold italic">Starbucks</span>
          <span className="text-2xl font-bold">WHOLE FOODS</span>
          <span className="text-2xl font-bold">Supreme</span>
          <span className="text-2xl font-bold">Apple</span>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-satoshi">Retail intelligence at every touchpoint</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Lumina isn't just a checkout tool—it's a predictive engine designed to optimize your bottom line through advanced computer vision and neural networks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className="p-8 bg-white/2 border border-white/5 rounded-2xl hover:bg-white/5 hover:-translate-y-2 transition-all cursor-default group">
              <div className="mb-4 bg-slate-900 p-3 rounded-lg inline-block group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 font-satoshi">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tier */}
      <section id="pricing" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-satoshi">Flexible plans for growing retailers</h2>
            <p className="text-slate-400">Choose the intelligence level that fits your store today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$49', features: ['Up to 2 terminals', 'Standard POS', 'Email support', 'Basic reports'] },
              { name: 'Pro', price: '$149', features: ['Unlimited terminals', 'AI Smart Checkout', 'Facial Recognition', 'Priority support'], popular: true },
              { name: 'Enterprise', price: 'Custom', features: ['Multi-store Sync', 'Full AI Suite', 'API Access', 'Account Manager'] },
            ].map((p, i) => (
              <div key={i} className={`p-10 rounded-2xl border ${p.popular ? 'border-indigo-500 bg-indigo-500/5 relative' : 'border-white/10 bg-white/2'} flex flex-col`}>
                {p.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-xs font-bold rounded-full">MOST POPULAR</span>}
                <h3 className="text-2xl font-bold mb-2 font-satoshi">{p.name}</h3>
                <div className="text-4xl font-bold mb-6">{p.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                <div className="space-y-4 mb-10 flex-grow">
                  {p.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" /> {feat}
                    </div>
                  ))}
                </div>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${p.popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white/10 hover:bg-white/20'}`}>
                  Select {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-slate-500">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-white">
              <Zap className="text-indigo-500 w-6 h-6 fill-current" />
              <span className="text-xl font-bold font-satoshi">LUMINA</span>
            </div>
            <p className="text-sm mb-6 max-w-xs">Revolutionizing retail with predictive AI and beautiful design.</p>
            <div className="flex gap-4">
              <Globe className="w-5 h-5 hover:text-white cursor-pointer" />
              <Cpu className="w-5 h-5 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white cursor-pointer">AI POS</li>
              <li className="hover:text-white cursor-pointer">Inventory</li>
              <li className="hover:text-white cursor-pointer">Insights</li>
              <li className="hover:text-white cursor-pointer">App Store</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Press</li>
              <li className="hover:text-white cursor-pointer">Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Status</li>
              <li className="hover:text-white cursor-pointer">API Docs</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs">
          <span>© 2025 Lumina POS Systems Inc. All rights reserved.</span>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security</span>
            <span className="hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>
      </footer>
    </div>
  );
};


import React from 'react';
import { 
  Search, Plus, Minus, Trash2, Camera, User, 
  CreditCard, Banknote, Smartphone, Split, Bitcoin, Sparkles
} from 'lucide-react';
import { useStore } from '../store';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS } from '../constants';

export const PosTerminal: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateCartQty, detectedCustomer, setDetectedCustomer, clearCart } = useStore();
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [isScanning, setIsScanning] = React.useState(false);

  const categories = ['All', 'Audio', 'Computing', 'Mobile', 'Wearables', 'Accessories'];
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setDetectedCustomer(MOCK_CUSTOMERS[1]); // Mock detecting Sarah
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-100px)] flex gap-6 overflow-hidden">
      {/* Product Selection (70%) */}
      <div className="flex-grow flex flex-col gap-6">
        {/* Toolbar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-2xl py-3 pl-12 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-white/5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap
                  ${category === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2">
          {filteredProducts.map((p) => (
            <div 
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden cursor-pointer group hover:border-indigo-500/50 hover:-translate-y-1 transition-all"
            >
              <div className="aspect-square relative bg-white/5">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {p.trending && (
                  <div className="absolute top-2 right-2 bg-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg shadow-indigo-600/30">
                    <Sparkles className="w-3 h-3" /> TRENDING
                  </div>
                )}
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-all" />
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{p.category}</div>
                <h4 className="font-bold text-sm mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">{p.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold tracking-tight">${p.price}</div>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.stock < 10 ? 'bg-rose-500/10 text-rose-400' : 'bg-white/5 text-slate-500'}`}>
                    STOCK: {p.stock}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Panel (30%) */}
      <div className="w-[400px] flex flex-col gap-6 bg-slate-900/50 border border-white/5 rounded-3xl p-6 relative">
        {/* Customer Detection Mockup */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 relative overflow-hidden group">
          {isScanning && (
            <div className="absolute inset-0 z-10 bg-indigo-600/20 flex flex-col items-center justify-center backdrop-blur-sm">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
              <div className="text-xs font-bold uppercase tracking-widest animate-pulse">Scanning Face...</div>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">AI Recognition</h3>
            {!detectedCustomer && (
              <button onClick={handleScan} className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold hover:underline">
                <Camera className="w-3 h-3" /> Scan Customer
              </button>
            )}
          </div>

          {detectedCustomer ? (
            <div className="flex items-center gap-4">
              <img src={detectedCustomer.avatar} className="w-12 h-12 rounded-full border-2 border-indigo-500" alt="" />
              <div>
                <div className="font-bold">Welcome back, {detectedCustomer.name.split(' ')[0]} 👋</div>
                <div className="text-[10px] text-slate-500 font-medium">VIP MEMBER • {detectedCustomer.totalSpent.toLocaleString()} Spent</div>
              </div>
              <button onClick={() => setDetectedCustomer(null)} className="ml-auto text-slate-600 hover:text-rose-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 opacity-40">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium">Customer not identified</div>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-10">
              <ShoppingBag className="w-16 h-16 mb-4" />
              <div className="text-xl font-bold">Cart is empty</div>
              <div className="text-sm">Scan items to start sale</div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-grow min-w-0">
                  <h5 className="font-bold text-sm truncate">{item.name}</h5>
                  <div className="text-slate-400 text-xs mb-2">${item.price} each</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-white/10">
                      <button onClick={() => updateCartQty(item.id, item.quantity - 1)} className="p-1 hover:text-indigo-400"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.id, item.quantity + 1)} className="p-1 hover:text-indigo-400"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="text-sm font-bold ml-auto">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold tracking-tight py-2">
            <span>Total</span>
            <span className="text-indigo-400">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payments Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all gap-1 group">
            <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Card</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all gap-1 group">
            <Smartphone className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Mobile Pay</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all gap-1 group">
            <Banknote className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Cash</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all gap-1 group">
            <Bitcoin className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Crypto</span>
          </button>
        </div>

        <button 
          onClick={() => { alert('Sale completed! Reciept sent to customer.'); clearCart(); }}
          disabled={cart.length === 0}
          className="w-full py-5 bg-indigo-600 rounded-3xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:grayscale"
        >
          COMPLETE SALE
        </button>

        {/* AI Assistant Button */}
        <div className="absolute -right-3 bottom-24 translate-x-1/2">
           <button className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 border-4 border-[#0A0A0A] group relative">
             <BrainCircuit className="w-6 h-6 animate-pulse" />
             <div className="absolute right-full mr-4 px-4 py-2 bg-indigo-900/90 backdrop-blur-md rounded-2xl border border-indigo-500/30 text-xs font-bold w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-left leading-relaxed">
               <span className="text-cyan-400 block mb-1">AI Suggestion</span>
               Customers often add Apple Care+ with {cart[0]?.name || 'this item'} (87% conversion).
             </div>
           </button>
        </div>
      </div>
    </div>
  );
};

const ShoppingBag: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

const BrainCircuit: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105V21h2v-2h2a2 2 0 0 0 2-2v-2h3"/><path d="M9 14h.01"/><path d="M12 9h.01"/><path d="M15 12h.01"/><path d="M21 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M21 12v1a5 5 0 0 1-5 5h-2"/></svg>
);

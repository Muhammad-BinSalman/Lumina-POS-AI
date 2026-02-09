
import React, { useEffect, useRef, useState } from 'react';
import { 
  Search, Plus, Minus, Trash2, Camera, Scan, 
  CreditCard, Banknote, Smartphone, Split, 
  Sparkles, X, CheckCircle, Receipt, Percent
} from 'lucide-react';
import { useStore } from '../store';
import { MOCK_PRODUCTS, MOCK_CUSTOMERS } from '../constants';
import { generateReceiptPDF } from '../lib/receipt';

export const CashierCheckout: React.FC = () => {
  const { 
    cart, addToCart, removeFromCart, updateCartQty, 
    updateCartDiscount, clearCart, detectedCustomer, setDetectedCustomer 
  } = useStore();
  
  const [searchInput, setSearchInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Card' | 'Mobile' | 'Split'>('Card');
  const [receivedAmount, setReceivedAmount] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input for scanner support
  useEffect(() => {
    inputRef.current?.focus();
  }, [isSuccess]);

  const handleProductAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = searchInput.toLowerCase();
    const product = MOCK_PRODUCTS.find(p => 
      p.id === query || p.name.toLowerCase().includes(query)
    );
    if (product) {
      addToCart(product);
      setSearchInput('');
    }
  };

  const subtotal = cart.reduce((acc, item) => {
    const price = item.price * item.quantity;
    const discount = price * ((item.discount || 0) / 100);
    return acc + (price - discount);
  }, 0);
  
  const discountTotal = cart.reduce((acc, item) => {
    return acc + (item.price * item.quantity * ((item.discount || 0) / 100));
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const changeDue = receivedAmount ? parseFloat(receivedAmount) - total : 0;

  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    
    const orderNum = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Generate PDF
    generateReceiptPDF(
      cart, 
      { subtotal, tax, total, discount: discountTotal },
      paymentMethod,
      detectedCustomer,
      orderNum
    );

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      clearCart();
      setReceivedAmount('');
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      handleCompleteSale();
    }
    if (e.key === 'Escape') {
      setSearchInput('');
    }
  };

  if (isSuccess) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/20 animate-bounce">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-2 font-satoshi">Sale Completed!</h2>
        <p className="text-slate-500 mb-8">Receipt has been generated and downloaded.</p>
        <button 
          onClick={() => { setIsSuccess(false); clearCart(); }}
          className="px-8 py-3 bg-indigo-600 rounded-full font-bold hover:bg-indigo-700 transition-all"
        >
          New Transaction
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto" onKeyDown={handleKeyDown}>
      {/* Search & Scan Area */}
      <div className="sticky top-0 z-20 bg-[#0A0A0A]/80 backdrop-blur-md pt-2 pb-4">
        <form onSubmit={handleProductAdd} className="relative group max-w-3xl mx-auto">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <Scan className="w-6 h-6" />
          </div>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Scan barcode or type product name... (Press Enter to Add)" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-slate-900 border-2 border-white/5 rounded-3xl py-6 pl-16 pr-24 text-xl font-medium focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-2xl"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-600 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            Scanner Ready
          </div>
        </form>
        <div className="flex justify-center gap-4 mt-4">
          {['Drinks', 'Snacks', 'Electronics', 'Wearables'].map(cat => (
            <button key={cat} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
        {/* Cart List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
              <h3 className="font-bold flex items-center gap-2">
                <Receipt className="w-5 h-5 text-indigo-400" /> Current Cart
              </h3>
              <button onClick={clearCart} className="text-xs font-bold text-rose-500 hover:underline">Clear Items</button>
            </div>
            
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/2 border-b border-white/5">
                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase">Item</th>
                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase text-center">Quantity</th>
                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase text-right">Discount</th>
                    <th className="p-4 text-[10px] font-bold text-slate-500 uppercase text-right">Subtotal</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-20 text-center opacity-20">
                        <Scan className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-xl font-bold">Waiting for input...</p>
                      </td>
                    </tr>
                  ) : (
                    cart.map(item => (
                      <tr key={item.id} className="group hover:bg-white/2 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden shrink-0 shadow-lg">
                              <img src={item.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                              <div className="font-bold text-sm">{item.name}</div>
                              <div className="text-xs text-slate-500">${item.price}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => updateCartQty(item.id, item.quantity - 1)} className="p-1.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                            <button onClick={() => updateCartQty(item.id, item.quantity + 1)} className="p-1.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                            <input 
                              type="number" 
                              value={item.discount || 0}
                              onChange={(e) => updateCartDiscount(item.id, parseInt(e.target.value))}
                              className="w-8 bg-transparent text-right outline-none text-amber-500 font-bold text-sm"
                            />
                            <Percent className="w-3 h-3 text-amber-500" />
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="font-bold text-lg">
                            ${(item.price * item.quantity * (1 - (item.discount || 0) / 100)).toFixed(2)}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-600 hover:text-rose-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Add Section */}
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Popular Items</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MOCK_PRODUCTS.slice(0, 4).map(p => (
                <div 
                  key={p.id} 
                  onClick={() => addToCart(p)}
                  className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500/50 transition-all active:scale-95 group"
                >
                  <img src={p.image} className="w-16 h-16 rounded-xl mb-3 group-hover:scale-110 transition-transform" alt="" />
                  <div className="font-bold text-xs truncate w-full">{p.name}</div>
                  <div className="text-indigo-400 font-bold text-sm mt-1">${p.price}</div>
                  <div className="mt-3 p-1.5 bg-indigo-600 rounded-full">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Totals & Payment */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 rounded-3xl border border-white/5 p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 bg-indigo-600/5 blur-[80px] rounded-full -z-10" />
            
            <div className="space-y-4">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-amber-500 font-medium">
                <span>Discounts</span>
                <span>-${discountTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Payable</span>
                  <span className="text-5xl font-black tracking-tighter text-indigo-400">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-2 gap-3 pt-6">
              {[
                { id: 'Card', icon: CreditCard, label: 'Credit Card' },
                { id: 'Cash', icon: Banknote, label: 'Cash Payment' },
                { id: 'Mobile', icon: Smartphone, label: 'Mobile Pay' },
                { id: 'Split', icon: Split, label: 'Split Bill' },
              ].map(method => (
                <button 
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2
                    ${paymentMethod === method.id 
                      ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' 
                      : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/20'}
                  `}
                >
                  <method.icon className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase">{method.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'Cash' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="text-xs font-bold text-slate-500 uppercase">Received Amount</div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-10 pr-4 font-bold text-xl outline-none focus:border-indigo-500/50"
                  />
                </div>
                {receivedAmount && (
                  <div className="flex justify-between items-center p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <span className="text-xs font-bold text-emerald-500 uppercase">Change Due</span>
                    <span className="text-lg font-bold text-emerald-400">${changeDue.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={handleCompleteSale}
              disabled={cart.length === 0}
              className="w-full py-6 bg-indigo-600 rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 disabled:opacity-50 disabled:grayscale group"
            >
              COMPLETE SALE
              <div className="text-[10px] font-bold opacity-60 uppercase mt-1 tracking-widest group-hover:scale-105 transition-transform">
                Generate & Print Receipt
              </div>
            </button>
            
            <div className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              Shortcut: CTRL + D to Complete
            </div>
          </div>

          {/* AI Customer Insight Overlay */}
          {detectedCustomer && (
            <div className="bg-cyan-600/10 border border-cyan-500/20 p-6 rounded-3xl space-y-3 animate-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Customer Loyalty</h4>
              </div>
              <div className="flex items-center gap-4">
                <img src={detectedCustomer.avatar} className="w-12 h-12 rounded-full border-2 border-cyan-500/30" alt="" />
                <div>
                  <div className="font-bold">{detectedCustomer.name}</div>
                  <div className="text-[10px] text-slate-500">Member since 2023 • 12 Orders</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 italic">
                "Sarah usually prefers digital receipts. Points balance: 450 pts (Redeem for $4.50)"
              </p>
              <button className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-[10px] font-bold text-cyan-400 uppercase tracking-widest transition-all">
                Redeem 450 Points
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

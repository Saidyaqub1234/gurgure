import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiShoppingCart, FiTrash2, FiArrowLeft, FiPlus, FiMinus, FiCheckCircle } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { useLanguage } from '@/i18n/LanguageContext';
import { submitPrintOrder } from '@/api';
import type { PrintCartItem } from '@/types';
import { printModeLabel } from './PrintShop';

function getCart(): PrintCartItem[] {
  try {
    const raw = localStorage.getItem('print_cart');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCart(items: PrintCartItem[]) {
  localStorage.setItem('print_cart', JSON.stringify(items));
}

function getStoredCustomer() {
  try {
    const raw = localStorage.getItem('customer');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export default function PrintCart() {
  const navigate = useNavigate();
  const { lang, t, isRTL } = useLanguage();
  const [settings, setSettings] = useState<any>(null);
  const [items, setItems] = useState<PrintCartItem[]>(() => getCart());
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState<{ orderNo: string; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(() => {
    const c = getStoredCustomer();
    return { name: c?.name || '', email: c?.email || '', phone: c?.phone || '', address: '', notes: '' };
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { getSettings } = await import('@/api');
        const s = await getSettings();
        setSettings(s);
      } catch {}
    };
    fetchData();
  }, []);

  const totals = useMemo(() => {
    let total = 0;
    items.forEach(it => {
      const p = it.price;
      if (p?.mode === 'estimated' && p.estimate_low != null && p.estimate_high != null) {
        total += (p.estimate_low + p.estimate_high) / 2;
      } else if (p?.mode === 'quote') {
        total += p.total || 0;
      } else if (p) {
        total += p.total;
      }
    });
    return { total };
  }, [items]);

  const removeItem = (key: string) => {
    saveCart(items.filter(it => it.key !== key));
    setItems(getCart());
  };

  const changeQty = (key: string, delta: number) => {
    const next = items.map(it => {
      if (it.key !== key) return it;
      const min = it.price?.qty && it.price.qty > 0 ? it.price.qty : 1;
      const qty = Math.max(min, it.qty + delta);
      return { ...it, qty };
    });
    saveCart(next);
    setItems(getCart());
  };

  const placeOrder = async () => {
    if (!form.name.trim()) { setError(t('Please enter your name.')); return; }
    if (items.length === 0) return;
    setPlacing(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        email: form.email || null,
        phone: form.phone || null,
        address: form.address || null,
        notes: form.notes || null,
        items: items.map(it => ({ slug: it.slug, qty: it.qty, selections: it.selections })),
      };
      const order = await submitPrintOrder(payload);
      saveCart([]);
      setItems([]);
      setDone({ orderNo: order.order_no, total: order.total });
      window.scrollTo(0, 0);
    } catch (e: any) {
      const msg = e?.response?.data?.errors
        ? Object.values(e.response.data.errors).flat()[0]
        : e?.response?.data?.message || e?.message || t('Order failed');
      setError(msg);
    } finally {
      setPlacing(false);
    }
  };

  if (done) {
    return (
      <PublicLayout settings={settings}>
        <section className="pt-32 pb-24 min-h-screen">
          <div className="max-w-xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-green/10 flex items-center justify-center">
              <FiCheckCircle className="w-10 h-10 text-brand-green" />
            </motion.div>
            <h1 className="text-3xl font-heading font-bold text-brand-blue mb-3">{t('Order Submitted!')}</h1>
            <p className="text-neutral-500 mb-6">{t('Thank you! Our print team will confirm your order shortly.')}</p>
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-brand p-6 mb-8">
              <p className="text-sm text-neutral-400 mb-1">{t('Order number')}</p>
              <p className="font-mono font-bold text-xl text-brand-blue">{done.orderNo}</p>
              <p className="text-sm text-neutral-500 mt-3">
                {t('Total')}: <span className="font-mono font-bold text-brand-green">AFN {Number(done.total).toLocaleString()}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/print" className="px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold hover:shadow-brand-glow transition-all">{t('Continue Shopping')}</Link>
              <Link to="/" className="px-6 py-3 rounded-xl border border-neutral-200 text-neutral-600 font-semibold hover:bg-neutral-50 transition-all">{t('Back to Home')}</Link>
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>GURGURE | Print Cart</title>
      </Helmet>

      <section className="pt-28 pb-20 min-h-screen bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/print" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-blue transition-colors mb-8">
            <FiArrowLeft className={isRTL ? 'rotate-180' : ''} /> {t('Back to Print Shop')}
          </Link>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-blue mb-2">{t('Your Cart')}</h1>
          <p className="text-neutral-500 mb-10">{t('Review your print items and add your contact details to place the order.')}</p>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-brand-sm p-16 text-center">
              <FiShoppingCart className="w-14 h-14 text-neutral-300 mx-auto mb-4" />
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-2">{t('Your cart is empty')}</h2>
              <p className="text-neutral-500 mb-6">{t('Add some print products to get started.')}</p>
              <Link to="/print" className="inline-flex px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold hover:shadow-brand-glow transition-all">{t('Browse Products')}</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
              <div className="space-y-4">
                {items.map(item => {
                  const p = item.price;
                  const display =
                    p?.mode === 'estimated' && p.estimate_low != null
                      ? `AFN ${Number(p.estimate_low).toLocaleString()} – ${Number(p.estimate_high).toLocaleString()}`
                      : p ? `AFN ${Number(p.total).toLocaleString()}` : 'AFN …';
                  return (
                    <div key={item.key} className="bg-white rounded-2xl border border-neutral-100 shadow-brand-sm p-5 flex gap-5">
                      <div className="w-20 h-20 shrink-0 rounded-xl bg-gradient-card flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <span className="text-2xl opacity-20 font-heading font-bold">{item.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link to={`/print/${item.slug}`} className="font-heading font-bold text-brand-blue hover:text-brand-blue-light transition-colors">{item.name}</Link>
                            <p className="text-xs text-neutral-400 mt-0.5">{printModeLabel(item.price_mode, t)}</p>
                          </div>
                          <button onClick={() => removeItem(item.key)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors" title={t('Remove')}>
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.selectedNames.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.selectedNames.map((n, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500 text-[11px] font-medium">{n}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button onClick={() => changeQty(item.key, -1)} className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50"><FiMinus className="w-3.5 h-3.5" /></button>
                            <span className="font-mono font-semibold text-brand-blue w-12 text-center">{item.qty.toLocaleString()}</span>
                            <button onClick={() => changeQty(item.key, 1)} className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-50"><FiPlus className="w-3.5 h-3.5" /></button>
                          </div>
                          <span className="font-mono font-bold text-brand-blue">{display}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Checkout */}
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-brand p-6">
                  <h2 className="font-heading font-bold text-brand-blue mb-4">{t('Contact Details')}</h2>
                  {error && <div className="px-4 py-3 rounded-xl bg-red-500/10 text-red-600 text-sm font-medium mb-4">{error}</div>}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-500 mb-1 block">{t('Full Name')} *</label>
                      <input className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-500 mb-1 block">{t('Email')}</label>
                      <input type="email" className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-500 mb-1 block">{t('Phone')}</label>
                      <input className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-500 mb-1 block">{t('Address')}</label>
                      <input className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-500 mb-1 block">{t('Notes')}</label>
                      <textarea rows={2} className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder={t('Delivery preferences, branding notes…')} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-100 shadow-brand p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-500">{t('Items')}</span>
                    <span className="font-mono font-semibold text-neutral-700">{items.length}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                    <span className="font-heading font-bold text-brand-blue">{t('Total')}</span>
                    <span className="font-heading font-bold text-2xl font-mono text-brand-green">AFN {Number(totals.total).toLocaleString()}</span>
                  </div>
                  {items.some(i => i.price_mode !== 'instant') && (
                    <p className="text-xs text-neutral-400 mt-3">{t('Includes estimated / quote items - final price confirmed on quoting.')}</p>
                  )}
                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="w-full mt-5 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-semibold hover:shadow-brand-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {placing && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {t('Place Order')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiShoppingCart, FiMinus, FiPlus, FiArrowLeft, FiClock, FiTag, FiTruck } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { useLanguage } from '@/i18n/LanguageContext';
import { getPrintProduct, calculatePrintPrice } from '@/api';
import type { PrintProduct, PrintPriceBreakdown, PrintCartItem } from '@/types';
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

let uid = 0;

export default function PrintConfigurator() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { lang, t, isRTL } = useLanguage();
  const [settings, setSettings] = useState<any>(null);
  const [product, setProduct] = useState<PrintProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState(100);
  const [selections, setSelections] = useState<Record<number, number[]>>({});
  const [price, setPrice] = useState<PrintPriceBreakdown | null>(null);
  const [pricing, setPricing] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const p = await getPrintProduct(slug as string);
        setProduct(p);
        const defs: Record<number, number[]> = {};
        p.option_groups.forEach(g => {
          const d = g.options.filter(o => o.is_default).map(o => o.id);
          if (g.type === 'checkbox') {
            defs[g.id] = d;
          } else if (d.length > 0) {
            defs[g.id] = [d[0]];
          }
          // Passed-in selection preserved for pre-configured cart edits.
        });
        setSelections(defs);
        setQty(p.min_quantity || 1);
        window.scrollTo(0, 0);
      } catch (e: any) {
        setError(e?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, lang]);

  const fetchPrice = useCallback(async () => {
    if (!product) return;
    setPricing(true);
    setPriceError(null);
    try {
      const b = await calculatePrintPrice(product.slug, qty, selections);
      setPrice(b);
    } catch (e: any) {
      const msg = e?.response?.data?.errors?.selections?.[0] || e?.message || 'Pricing failed';
      setPriceError(msg);
      setPrice(null);
    } finally {
      setPricing(false);
    }
  }, [product, qty, selections]);

  useEffect(() => {
    const timeout = setTimeout(fetchPrice, 250);
    return () => clearTimeout(timeout);
  }, [qty, selections, fetchPrice]);

  const missingRequired = useMemo(() => {
    if (!product) return [];
    return product.option_groups.filter(g => g.required && (!selections[g.id] || selections[g.id].length === 0));
  }, [product, selections]);

  const toggleOption = (groupId: number, optionId: number, type: string) => {
    setSelections(prev => {
      const cur = prev[groupId] || [];
      if (type === 'checkbox') {
        const next = cur.includes(optionId) ? cur.filter(id => id !== optionId) : [...cur, optionId];
        return { ...prev, [groupId]: next };
      }
      return { ...prev, [groupId]: [optionId] };
    });
  };

  const selectedNames = (() => {
    if (!product) return [];
    const names: string[] = [];
    product.option_groups.forEach(g => {
      (selections[g.id] || []).forEach(oid => {
        const o = g.options.find(x => x.id === oid);
        if (o) names.push(o.name);
      });
    });
    return names;
  })();

  const canAdd = !!price && missingRequired.length === 0 && !priceError;

  const addToCart = () => {
    if (!product || !price || !canAdd) return;
    const capacity = uid++;
    const item: PrintCartItem = {
      key: `${product.slug}-${capacity}-${Date.now()}`,
      slug: product.slug,
      product_id: product.id,
      name: product.name,
      image: product.image,
      price_mode: product.price_mode,
      unit_label: product.unit_label,
      qty: price.qty,
      selections: JSON.parse(JSON.stringify(selections)),
      selectedNames,
      price,
    };
    const existing = [...getCart(), item];
    saveCart(existing);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !product) return <PublicLayout settings={settings}><ErrorState message={error || 'Not found'} /></PublicLayout>;

  const modeCls = product.price_mode === 'instant' ? 'text-brand-green' : product.price_mode === 'estimated' ? 'text-amber-600' : 'text-brand-purple-light';

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>GURGURE | {product.name}</title>
      </Helmet>

      <section className="pt-28 pb-20 min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/print" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-blue transition-colors mb-8">
            <FiArrowLeft className={isRTL ? 'rotate-180' : ''} /> {t('Back to Print Shop')}
          </Link>

          {/* Header */}
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-brand-sm overflow-hidden mb-8">
            <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue-light/70">{t(product.category)}</span>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-blue mt-2 mb-3">{product.name}</h1>
                <p className="text-neutral-500 max-w-2xl mb-5">{product.short_description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue text-xs font-medium">
                    <FiClock className="w-3.5 h-3.5" /> {product.turnaround || t('Standard turnaround')}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${product.price_mode === 'instant' ? 'bg-brand-green/10 text-brand-green' : product.price_mode === 'estimated' ? 'bg-amber-500/10 text-amber-600' : 'bg-brand-purple/10 text-brand-purple-light'}`}>
                    <FiTag className="w-3.5 h-3.5" /> {printModeLabel(product.price_mode, t)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-xs font-medium">
                    <FiTruck className="w-3.5 h-3.5" /> {t('Min quantity')}: {product.min_quantity}
                  </span>
                </div>
              </div>

              <div className={`hidden lg:block relative rounded-2xl bg-gradient-card ${isRTL ? 'lg:order-first' : ''}`}>
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl opacity-15">{product.name.charAt(0)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
            {/* Options */}
            <div className="space-y-6">
              {/* Quantity */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-bold text-brand-blue">{t('Quantity')}</h2>
                  <span className="text-xs text-neutral-400">{t('Minimum')} {product.min_quantity}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQty(Math.max(product.min_quantity || 1, qty - 1))} className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors">
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    onChange={e => setQty(Math.max(product.min_quantity || 1, parseInt(e.target.value) || 1))}
                    className="w-32 text-center text-xl font-mono font-bold text-brand-blue rounded-xl border border-neutral-200 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  />
                  <button onClick={() => setQty(qty + 1)} className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors">
                    <FiPlus className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-neutral-400">{qty.toLocaleString()} {product.unit_label || t('units')}</span>
                </div>
              </div>

              {product.option_groups.map(group => {
                const selected = selections[group.id] || [];
                return (
                  <div key={group.id} className="bg-white rounded-2xl border border-neutral-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="font-heading font-bold text-brand-blue">{group.name}</h3>
                      {group.required ? (
                        <span className="px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-wide">*</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-400 text-[10px] font-semibold uppercase tracking-wide">{t('Optional')}</span>
                      )}
                    </div>
                    <div className={`grid gap-3 ${group.type === 'checkbox' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
                      {group.options.map(opt => {
                        const active = selected.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            onClick={() => toggleOption(group.id, opt.id, group.type)}
                            className={`relative text-left p-4 rounded-xl border-2 transition-all ${active ? 'border-brand-blue bg-brand-blue/5' : 'border-neutral-100 hover:border-neutral-300 bg-white'}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className={`text-sm font-medium ${active ? 'text-brand-blue' : 'text-neutral-700'}`}>{opt.name}</p>
                                {opt.description && <p className="text-xs text-neutral-400 mt-1">{opt.description}</p>}
                              </div>
                              {opt.price > 0 && (
                                <span className="text-xs font-mono font-semibold text-brand-blue-light whitespace-nowrap">
                                  {opt.price_type === 'per_unit' ? `+AFN ${opt.price}/u` : `+AFN ${opt.price}`}
                                </span>
                              )}
                            </div>
                            <div className={`absolute top-3 right-3 w-5 h-5 rounded-md border-2 flex items-center justify-center ${active ? 'bg-brand-blue border-brand-blue' : 'border-neutral-300'} ${group.type === 'checkbox' ? '' : 'rounded-full'}`}>
                              {active && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price panel */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-brand p-6">
                <h2 className="font-heading font-bold text-brand-blue mb-5 flex items-center justify-between">
                  {t('Your Price')}
                  <span className={`text-xs font-bold uppercase tracking-wider ${modeCls}`}>{printModeLabel(product.price_mode, t)}</span>
                </h2>

                {missingRequired.length > 0 && (
                  <div className="px-4 py-3 rounded-xl bg-amber-500/10 text-amber-700 text-sm font-medium mb-4">
                    {t('Please choose:')} {missingRequired.map(g => g.name).join(', ')}
                  </div>
                )}
                {priceError && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/10 text-red-600 text-sm font-medium mb-4">{priceError}</div>
                )}

                {pricing && !price && (
                  <div className="flex items-center justify-center py-10">
                    <div className="w-8 h-8 border-4 border-neutral-200 border-t-brand-blue rounded-full animate-spin" />
                  </div>
                )}

                {price && (
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">{t('Unit price')} ({qty.toLocaleString()} ×)</span>
                      <span className="font-mono font-semibold text-neutral-800">AFN {String(Number(price.unit_price).toFixed(2))}</span>
                    </div>
                    <div className="border-t border-dashed border-neutral-200 pt-3 space-y-2">
                      {price.line_items.map((li, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-neutral-500">{li.label}</span>
                          <span className="font-mono text-neutral-700">AFN {Number(li.amount).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {product.price_mode === 'estimated' && price.estimate_low != null && (
                      <div className="px-4 py-3 rounded-xl bg-amber-500/10 text-amber-700 text-sm">
                        <p className="font-semibold">{t('Estimated range')}</p>
                        <p className="font-mono mt-1">AFN {Number(price.estimate_low).toLocaleString()} – {Number(price.estimate_high).toLocaleString()}</p>
                        <p className="text-xs mt-1 opacity-80">{t('Final price confirmed after our design check.')}</p>
                      </div>
                    )}
                    {product.price_mode === 'quote' && (
                      <div className="px-4 py-3 rounded-xl bg-brand-purple/10 text-brand-purple-light text-sm">
                        <p className="font-semibold mb-1">{t('Request a quote')}</p>
                        <p className="text-xs">{t('This is a guide price. Our team prepares a detailed quote for you.')}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                      <span className="font-heading font-bold text-brand-blue">{t('Total')}</span>
                      <span className={`font-heading font-bold text-2xl font-mono ${modeCls}`}>AFN {Number(price.total).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={addToCart}
                  disabled={!canAdd}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-semibold hover:shadow-brand-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {added ? t('Added to Cart ✓') : t('Add to Cart')}
                </button>
                <button
                  onClick={() => navigate('/print/cart')}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-brand-blue text-brand-blue font-semibold hover:bg-brand-blue/5 transition-all"
                >
                  {t('View Cart')}
                </button>
                <p className="text-center text-xs text-neutral-400 mt-4">
                  {t('Prices are in Afghanis (AFN) incl. printing, options and setup.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiShoppingCart, FiTruck, FiCheckCircle, FiTag } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { useLanguage } from '@/i18n/LanguageContext';
import { getPrintProducts } from '@/api';
import type { PrintProduct, PrintPriceMode } from '@/types';

const CATEGORY_ICONS: Record<string, string> = {
  'Business Stationery': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  'Marketing': 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  'Large Format': 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  'Apparel': 'M16 7a4 4 0 11-8 0M5 7a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V7z',
  'Promotional': 'M16.5 3.5a3 3 0 014.2 4.2l-9 9a3 3 0 01-4.2-4.2l9-9zM8.5 7.5l8 8M15 2l.5 2M18 5l2-.5',
  'Paper': 'M7 21h10a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zm0 0h10',
  'Signage': 'M12 3v18M3 6h18M5 6l-2 18M19 6l2 18M9 6v3M15 6v3M7 9h10v12a1 1 0 01-1 1H8a1 1 0 01-1-1V9z',
  'Exhibition Events': 'M8 21V9m8 12V9m-8 0a4 4 0 118 0m-8 0H4a1 1 0 01-1-1V4a1 1 0 011-1h16a1 1 0 011 1v4a1 1 0 01-1 1h-4m-8 0v4a4 4 0 008 0v-4',
};

const MODE_META: Record<PrintPriceMode, { label: string; cls: string; dot: string }> = {
  instant: { label: 'Instant Price', cls: 'bg-brand-green/10 text-brand-green', dot: 'bg-brand-green' },
  estimated: { label: 'Estimate', cls: 'bg-amber-500/10 text-amber-600', dot: 'bg-amber-500' },
  quote: { label: 'Request Quote', cls: 'bg-brand-purple/10 text-brand-purple-light', dot: 'bg-brand-purple-light' },
};

export function printModeLabel(mode: PrintPriceMode, t: (k: string) => string): string {
  return mode === 'instant' ? t('Instant Price') : mode === 'estimated' ? t('Estimate') : t('Request Quote');
}

export default function PrintShop() {
  const { lang, t } = useLanguage();
  const [settings, setSettings] = useState<any>(null);
  const [products, setProducts] = useState<PrintProduct[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [activeCat, setActiveCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPrintProducts();
        setProducts(res.data);
        setCategories(res.categories || []);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lang]);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error) return <PublicLayout settings={settings}><ErrorState message={error} /></PublicLayout>;

  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>GURGURE | Print Shop</title>
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] bg-gradient-hero" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl bg-brand-blue/30" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full blur-3xl bg-brand-green/20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-medium tracking-wide uppercase mb-6">
              <FiTag className="w-3.5 h-3.5" /> GURGURE Print
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
              {t('Web-to-Print = Instant Quotes, Real Prices')}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mb-8">
              {t('Pick a product, select your options and quantity, and get a transparent price instantly in Afghanis — no email back-and-forth.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/print/cart" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold hover:shadow-brand-glow transition-all">
                <FiShoppingCart className="w-4 h-4" /> {t('View Cart')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-2.5 mb-12">
          <button
            onClick={() => setActiveCat('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCat === 'All' ? 'bg-brand-blue text-white shadow-brand' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
          >
            {t('All')} ({products.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCat(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCat === cat.name ? 'bg-brand-blue text-white shadow-brand' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
            >
              {t(cat.name)} ({cat.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => {
            const mode = MODE_META[product.price_mode] || MODE_META.instant;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/print/${product.slug}`}
                  className="group block bg-white rounded-2xl border border-neutral-100 shadow-brand-sm hover:shadow-card-hover transition-all overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] bg-gradient-card flex items-center justify-center p-8">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-brand/15 text-brand-blue flex items-center justify-center">
                        <svg className="w-10 h-10 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={CATEGORY_ICONS[product.category] || 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z'} />
                        </svg>
                      </div>
                    )}
                    <span className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${mode.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${mode.dot}`} />
                      {printModeLabel(product.price_mode, t)}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue-light/60">{t(product.category)}</span>
                    <h3 className="text-lg font-heading font-bold text-brand-blue mt-1 group-hover:text-brand-blue-light transition-colors">{product.name}</h3>
                    <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{product.short_description}</p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-100">
                      <div>
                        <p className="text-[11px] text-neutral-400">{t('Starting from')}</p>
                        <p className="font-bold text-brand-blue font-mono">
                          {product.starting_price != null ? `AFN ${Number(product.starting_price).toLocaleString()}` : t('Request Quote')}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green">
                        {t('Configure')} <FiCheckCircle className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-neutral-400">{t('No products in this category yet.')}</div>
        )}
      </section>

      {/* How it works */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{t('How It Works')}</h2>
            <div className="w-20 h-1 bg-gradient-brand rounded-full mt-4 mb-6 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('1. Configure'), desc: t('Pick a product and fine-tune size, material, colours and finishing.') },
              { title: t('2. Get the Price'), desc: t('See the full price breakdown immediately — printing, options and setup.') },
              { title: t('3. Order & Track'), desc: t('Submit your order. We confirm production and keep you updated.') },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-brand flex items-center justify-center">
                  {i === 1 ? <FiTruck className="w-6 h-6 text-white" /> : <FiCheckCircle className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiArrowRight, FiCheck, FiCpu, FiMonitor, FiTag, FiUploadCloud, FiHelpCircle } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getSoftwareProduct } from '@/api';
import type { Settings, SoftwareProduct } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

function priceText(p: SoftwareProduct, t: (k: string) => string): string {
  if (p.pricing_mode === 'quote' || p.price == null) return t('Request Quote');
  const unit =
    p.price_unit === 'monthly' ? t('/month') :
    p.price_unit === 'annual' ? t('/year') :
    p.price_unit === 'one_time' ? ` ${t('one-time')}` : '';
  return `${p.price.toLocaleString('en-US')} AFN${unit}`;
}

export default function SoftwareDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [product, setProduct] = useState<SoftwareProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, productData] = await Promise.all([
          getSettings(),
          getSoftwareProduct(slug as string),
        ]);
        setSettings(settingsData);
        setProduct(productData);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, lang]);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings || !product) return <PublicLayout><ErrorState message={error || 'Product not found'} onRetry={() => window.location.reload()} /></PublicLayout>;

  const isQuote = product.pricing_mode === 'quote' || product.price == null;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>{product.name} - {settings.site_name}</title>
        <meta name="description" content={product.tagline || product.description || ''} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/software" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> {t('Back to Software')}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <FiCpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wide">{product.category}</span>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white">{product.name}</h1>
            </div>
          </div>
          <p className="text-lg text-white/80 max-w-3xl">{product.tagline || product.description}</p>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-neutral-200 p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiHelpCircle className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-heading font-bold text-brand-blue">{t('The Problem')}</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">{product.problem || product.description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <FiCheck className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xl font-heading font-bold text-brand-blue">{t('Our Solution')}</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">{product.solution || product.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      {(product.features && product.features.length > 0) && (
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-heading font-bold text-brand-blue text-center mb-12">{t('Key Features')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {product.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-neutral-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
                    <FiCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-neutral-700 pt-1.5">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Screenshots / Demo */}
      {((product.screenshots && product.screenshots.length > 0) || product.demo_url) && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-heading font-bold text-brand-blue text-center mb-12">{t('See It In Action')}</h2>
            {product.screenshots && product.screenshots.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
                {product.screenshots.map((src, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
                    <img src={src} alt={`${product.name} screenshot ${i + 1}`} className="w-full h-48 object-cover" />
                  </div>
                ))}
              </div>
            )}
            {product.demo_url && (
              <div className="text-center">
                <a href={product.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors">
                  <FiMonitor className="w-4 h-4" /> {t('Launch Live Demo')}
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-brand-blue text-center mb-12">{t('Pricing')}</h2>
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 text-center border border-neutral-200 shadow-sm">
            {isQuote ? (
              <>
                <FiTag className="w-8 h-8 mx-auto text-brand-cyan mb-4" />
                <h3 className="text-2xl font-heading font-bold text-brand-blue mb-3">{t('Custom quotation')}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                  {t('Complex systems need careful scoping. Tell us about your requirements and our team prepares a detailed, itemized quote.')}
                </p>
                <Link to="/quote" className="btn-primary w-full justify-center">
                  {t('Request a Quote')} <FiArrowRight className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm font-semibold text-brand-cyan uppercase tracking-wide">{t('License')}</span>
                <h3 className="text-4xl font-heading font-bold text-brand-blue my-3">{priceText(product, t)}</h3>
                {product.setup_fee > 0 && (
                  <p className="text-sm text-neutral-500 mb-2">{t('Setup / implementation')}: {product.setup_fee.toLocaleString('en-US')} AFN</p>
                )}
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                  {t('Includes deployment, training and local support. Hosting and maintenance available.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/quote" className="btn-primary flex-1 justify-center">
                    {t('Buy / Get Started')} <FiArrowRight className="w-5 h-5" />
                  </Link>
                  <Link to="/contact" className="btn-outline flex-1 justify-center">
                    {t('Request a Demo')}
                  </Link>
                </div>
              </>
            )}
            {product.setup_fee > 0 && isQuote && (
              <p className="text-xs text-neutral-400 mt-4">{t('Setup / implementation')} {t('priced per deployment')}.</p>
            )}
          </div>
        </div>
      </section>

      {/* Why GURGURE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <FiUploadCloud className="w-6 h-6 text-white" />, title: t('Hosted by GURGURE'), desc: t('Deployed on our managed infrastructure with backups and monitoring.') },
              { icon: <FiMonitor className="w-6 h-6 text-white" />, title: t('Trained & supported'), desc: t('We train your team and remain available for support and improvements.') },
              { icon: <FiTag className="w-6 h-6 text-white" />, title: t('Built around you'), desc: t('Configured to your workflows, data and reporting — not a rigid template.') },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-neutral-50 border border-neutral-200 p-8 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">{b.icon}</div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{b.title}</h3>
                <p className="text-sm text-neutral-500">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-6"
          >
            {t('Let\'s talk about your system.')}
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/quote" className="btn-primary text-lg bg-white text-brand-blue hover:bg-white/90">
              {t('Request a Quote')} <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
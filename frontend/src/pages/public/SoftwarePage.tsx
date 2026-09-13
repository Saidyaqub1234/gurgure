import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCpu } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getSoftwareProducts } from '@/api';
import type { Settings, SoftwareProduct } from '@/types';

function pricingLabel(p: SoftwareProduct): string {
  if (p.pricing_mode === 'quote') return 'Request Quote';
  if (p.price == null) return 'Request Quote';
  const unit =
    p.price_unit === 'monthly' ? '/month' :
    p.price_unit === 'one_time' ? ' one-time' :
    p.price_unit === 'annual' ? '/year' : '';
  return `${p.price.toLocaleString('en-US')} AFN${unit}`;
}

export default function SoftwarePage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [active, setActive] = useState<string>('All');
  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [all, setAll] = useState<SoftwareProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, softwareData] = await Promise.all([
          getSettings(),
          getSoftwareProducts(),
        ]);
        setSettings(settingsData);
        setCategories(softwareData.categories || []);
        setAll(softwareData.data || []);
        if (catParam && softwareData.categories?.some((c) => c.name === catParam)) {
          setActive(catParam);
          setProducts((softwareData.data || []).filter((p) => p.category === catParam));
        } else {
          setProducts(softwareData.data || []);
        }
      } catch (e: any) {
        setError(e?.message || 'Failed');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [catParam]);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Software & Digital Products - {settings.site_name}</title>
        <meta name="description" content="Business systems, institutional software, education platforms and database solutions built, hosted and supported by GURGURE." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Software & Digital Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            Ready-to-deploy systems for business, education, institutions and platforms — analyzed,
            designed, developed and delivered by GURGURE.
          </motion.p>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-10 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => { setActive('All'); setProducts(all); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === 'All' ? 'bg-gradient-brand text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All Software
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => { setActive(c.name); setProducts(all.filter((p) => p.category === c.name)); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === c.name ? 'bg-gradient-brand text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {c.name}
              <span className="ml-1.5 opacity-60">({c.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Systems We Build & Host"
            subtitle="Each product follows the same journey: we analyze your needs, design the system, develop it around your workflow, and deliver it with training and support."
          />
          {products.length === 0 ? (
            <p className="text-center text-neutral-400">No software products in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="card flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 text-2xl">
                    <FiCpu className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wide mb-1">{p.category}</span>
                  <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{p.name}</h3>
                  <p className="text-sm text-neutral-500 flex-1">{p.tagline || p.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-blue">{pricingLabel(p)}</span>
                    <Link
                      to={`/software/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-brand-cyan font-semibold text-sm hover:gap-2.5 transition-all"
                    >
                      Details <FiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How software licensing works */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="How It Works"
            subtitle="One source-backed operating framework for every deployment."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Analyze', desc: 'We map your processes, data and reporting needs.' },
              { step: '02', title: 'Design', desc: 'We configure the system around your real workflow.' },
              { step: '03', title: 'Develop', desc: 'We build, test and migrate your data with you.' },
              { step: '04', title: 'Deliver', desc: 'We deploy, train your team and provide ongoing support.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center border border-neutral-200"
              >
                <span className="text-4xl font-heading font-bold text-brand-cyan/30">{s.step}</span>
                <h3 className="mt-3 text-lg font-heading font-bold text-brand-blue">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{s.desc}</p>
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
            Need a system that doesn't exist here yet?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/80 max-w-2xl mx-auto mb-8"
          >
            We build custom systems too. Describe what your organization needs and get a tailored quote.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/quote" className="btn-primary text-lg bg-white text-brand-blue hover:bg-white/90">
              Request a Quote <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
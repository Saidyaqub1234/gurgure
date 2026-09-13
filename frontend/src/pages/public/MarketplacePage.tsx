import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiPackage, FiUsers, FiTruck, FiMonitor, FiFileText, FiStar } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings } from '@/api';
import type { Settings } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

const categories = [
  { icon: <FiPackage className="w-6 h-6 text-white" />, title: 'Products', desc: 'Suppliers list physical and digital products — equipment, materials, software and supplies.' },
  { icon: <FiUsers className="w-6 h-6 text-white" />, title: 'Professional Services', desc: 'Consultants, agencies and freelancers can offer their services in one searchable directory.' },
  { icon: <FiTruck className="w-6 h-6 text-white" />, title: 'Suppliers & Vendors', desc: 'Verified suppliers can create profiles, respond to RFQs and reach new buyers.' },
  { icon: <FiMonitor className="w-6 h-6 text-white" />, title: 'Partner Software', desc: 'Third-party software and tools that integrate with GURGURE services and clients.' },
  { icon: <FiFileText className="w-6 h-6 text-white" />, title: 'RFQs & Tenders', desc: 'Buyers post requests and qualified suppliers respond with competitive bids.' },
  { icon: <FiStar className="w-6 h-6 text-white" />, title: 'Business Opportunities', desc: 'Partnerships, wholesale programs and collaborative opportunities.' },
];

export default function MarketplacePage() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch((e: any) => setError(e?.message || 'Failed'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Marketplace - {settings.site_name}</title>
        <meta name="description" content="A connected marketplace where buyers discover suppliers, products, services, software and business opportunities." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Marketplace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            Connecting buyers with suppliers, services, software and opportunities — in one integrated
            marketplace under the GURGURE ecosystem.
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lg text-neutral-600 leading-relaxed">
            GURGURE is building a marketplace where buyers can discover suppliers, compare products and
            services, post RFQs and find business opportunities — all connected to one account, one ecosystem.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="inline-block mt-6 px-4 py-2 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-semibold">
            Now building — launching progressively
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card bg-white flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4">{c.icon}</div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{c.title}</h3>
                <p className="text-sm text-neutral-500 flex-1">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it will work */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { emoji: '📝', title: 'Register', desc: 'Create a supplier or buyer account within your GURGURE portal.' },
              { emoji: '🔍', title: 'Discover', desc: 'Browse suppliers, list products, or post RFQs and opportunities.' },
              { emoji: '🤝', title: 'Connect', desc: 'Respond to inquiries, receive quotes and start working together.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                <span className="text-4xl mb-4 block">{s.emoji}</span>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Want to join the marketplace?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/80 max-w-2xl mx-auto mb-8">
            Let us know your role and we'll notify you when supplier accounts are ready.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/contact" className="btn-primary text-lg bg-white text-brand-blue hover:bg-white/90">
              Register Your Interest <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
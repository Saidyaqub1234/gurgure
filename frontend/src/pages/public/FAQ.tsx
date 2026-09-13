import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiChevronDown, FiArrowRight, FiUsers, FiBriefcase, FiTarget, FiCode, FiBook, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getFAQs } from '@/api';
import type { Settings, FAQ } from '@/types';

const categoryIcons: Record<string, React.ReactNode> = {
  'General Questions': <FiUsers className="w-5 h-5" />,
  'Process Questions': <FiBriefcase className="w-5 h-5" />,
  'Pricing & Investment Questions': <FiTarget className="w-5 h-5" />,
  'Timeline & Delivery Questions': <FiTrendingUp className="w-5 h-5" />,
  'Services Questions': <FiCode className="w-5 h-5" />,
};

const defaultCategoryOrder = ['General Questions', 'Process Questions', 'Pricing & Investment Questions', 'Timeline & Delivery Questions', 'Services Questions'];

function FAQAccordion({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-brand-blue/20 bg-gradient-card shadow-brand-sm' : 'border-neutral-200 bg-white hover:border-neutral-300'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <h3 className="text-base font-heading font-semibold text-brand-blue pr-4">{faq.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0"
        >
          <FiChevronDown className="w-4 h-4 text-neutral-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-neutral-100">
              <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, f] = await Promise.all([getSettings(), getFAQs()]);
      setSettings(s);
      setFaqs(f);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={fetchData} /></PublicLayout>;

  const filtered = search
    ? faqs.filter(
        f =>
          f.question.toLowerCase().includes(search.toLowerCase()) ||
          f.answer.toLowerCase().includes(search.toLowerCase())
      )
    : faqs;

  const grouped = filtered.reduce<Record<string, FAQ[]>>((acc, faq) => {
    const cat = faq.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>FAQ - {settings.site_name}</title>
        <meta name="description" content={`Frequently asked questions - ${settings.site_name}`} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/70 max-w-3xl mx-auto mb-10"
          >
            Everything you need to know about working with GURGURE — from our process to pricing and timelines.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-lg mx-auto relative"
          >
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">No results found. Try a different search term.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.keys(grouped).sort((a, b) => {
                const aIdx = defaultCategoryOrder.indexOf(a);
                const bIdx = defaultCategoryOrder.indexOf(b);
                return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
              }).map((category) => {
                const items = grouped[category];
                return (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                        {categoryIcons[category] || <FiUsers className="w-5 h-5" />}
                      </div>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-heading font-bold text-brand-blue"
                      >
                        {category}
                      </motion.h2>
                    </div>
                    <div className="space-y-3">
                      {items.map((faq, i) => {
                        const accordionKey = `${category}-${faq.id || i}`;
                        return (
                          <motion.div
                            key={accordionKey}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                          >
                            <FAQAccordion
                              faq={faq}
                              isOpen={openId === accordionKey}
                              onToggle={() => setOpenId(openId === accordionKey ? null : accordionKey)}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-6">
              <FiBook className="w-8 h-8 text-brand-blue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-blue mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              We're here to help. Reach out directly — we'll respond within 24 hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 btn-primary font-semibold rounded-xl text-white"
            >
              Contact Us
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

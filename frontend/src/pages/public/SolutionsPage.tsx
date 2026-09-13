import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiBriefcase, FiTrendingUp, FiCheckCircle, FiAward, FiGlobe, FiDollarSign, FiLayers } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings } from '@/api';
import type { Settings } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

const journeys = [
  {
    slug: 'start-a-business',
    icon: <FiBriefcase className="w-6 h-6 text-white" />,
    key: 'Start a Business',
    descKey: 'desc_start',
    links: [
      { href: '/services', labelKey: 'Business Planning & Strategy' },
      { href: '/branding', labelKey: 'Branding & Identity' },
      { href: '/development', labelKey: 'Website Development' },
      { href: '/software', labelKey: 'Business Software' },
      { href: '/quote', labelKey: 'Request a Quote' },
    ],
  },
  {
    slug: 'grow-a-business',
    icon: <FiTrendingUp className="w-6 h-6 text-white" />,
    key: 'Grow a Business',
    descKey: 'desc_grow',
    links: [
      { href: '/services', labelKey: 'Strategic Management' },
      { href: '/digital', labelKey: 'Digital Marketing' },
      { href: '/software', labelKey: 'CRM & Business Systems' },
      { href: '/print', labelKey: 'Print & Merchandise' },
      { href: '/quote', labelKey: 'Request a Quote' },
    ],
  },
  {
    slug: 'build-an-organization',
    icon: <FiCheckCircle className="w-6 h-6 text-white" />,
    key: 'Build an Organization',
    descKey: 'desc_org',
    links: [
      { href: '/enterprise', labelKey: 'Enterprise Services' },
      { href: '/technology', labelKey: 'ICT Infrastructure' },
      { href: '/software', labelKey: 'MIS / MEAL & Databases' },
      { href: '/training', labelKey: 'Training & Capacity Building' },
      { href: '/quote', labelKey: 'Request a Quote' },
    ],
  },
  {
    slug: 'build-a-brand',
    icon: <FiAward className="w-6 h-6 text-white" />,
    key: 'Build a Brand',
    descKey: 'desc_brand',
    links: [
      { href: '/branding', labelKey: 'Branding & Design' },
      { href: '/portfolio', labelKey: 'Our Work' },
      { href: '/print', labelKey: 'Print Shop' },
      { href: '/case-studies', labelKey: 'Case Studies' },
      { href: '/quote', labelKey: 'Request a Quote' },
    ],
  },
  {
    slug: 'go-digital',
    icon: <FiGlobe className="w-6 h-6 text-white" />,
    key: 'Go Digital',
    descKey: 'desc_digital',
    links: [
      { href: '/development', labelKey: 'Website Development' },
      { href: '/digital', labelKey: 'Digital & ICT' },
      { href: '/software', labelKey: 'E-Commerce & Portals' },
      { href: '/technology', labelKey: 'Hosting Solutions' },
      { href: '/quote', labelKey: 'Request a Quote' },
    ],
  },
  {
    slug: 'find-investment',
    icon: <FiDollarSign className="w-6 h-6 text-white" />,
    key: 'Find Investment',
    descKey: 'desc_invest',
    links: [
      { href: '/ventures', labelKey: 'GURGURE Ventures' },
      { href: '/services', labelKey: 'Business Planning' },
      { href: '/quote', labelKey: 'Investor Pitch Decks' },
      { href: '/contact', labelKey: 'Contact Us' },
    ],
  },
  {
    slug: 'custom-solution',
    icon: <FiLayers className="w-6 h-6 text-white" />,
    key: 'Custom Solution',
    descKey: 'desc_custom',
    links: [
      { href: '/quote', labelKey: 'Request a Custom Quote' },
      { href: '/contact', labelKey: 'Talk to Our Team' },
      { href: '/software', labelKey: 'Existing Software' },
      { href: '/services', labelKey: 'All Services' },
    ],
  },
];

export default function SolutionsPage() {
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
        <title>Solutions - {settings.site_name}</title>
        <meta name="description" content="Not sure where to start? Choose a journey and we guide you to the right services, software and support." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            One platform for your whole journey. Start where you are — we'll guide you to the right
            services, software and support.
          </motion.p>
        </div>
      </section>

      {/* Journeys */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Choose Your Journey"
            subtitle="Every organization starts somewhere. Pick the path that matches what you're trying to achieve today."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeys.map((j, i) => (
              <motion.div
                key={j.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="card flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4">{j.icon}</div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{t(j.key)}</h3>
                <p className="text-sm text-neutral-500 flex-1 mb-4">{t(j.descKey)}</p>
                <ul className="space-y-1.5 mb-5">
                  {j.links.map((l) => (
                    <li key={l.href + l.labelKey}>
                      <Link to={l.href} className="inline-flex items-center gap-2 text-sm text-brand-cyan hover:text-brand-blue transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        {t(l.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it fits together */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="One Platform. One Ecosystem."
            subtitle="Whatever you choose, it all lives under one GURGURE account."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { emoji: '📋', title: 'Solutions', desc: 'Find your path through the ecosystem.' },
              { emoji: '🛠️', title: 'Services', desc: 'Hire GURGURE to do the work.' },
              { emoji: '💾', title: 'Software', desc: 'Buy and deploy our systems.' },
              { emoji: '👤', title: 'My GURGURE', desc: 'Manage everything from one dashboard.' },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center border border-neutral-200"
              >
                <div className="text-4xl mb-4">{b.emoji}</div>
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
            Not sure which path fits?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/80 max-w-2xl mx-auto mb-8">
            Tell us what you want to achieve and we'll recommend the right combination.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/contact" className="btn-primary text-lg bg-white text-brand-blue hover:bg-white/90">
              {t('Talk to Our Team')} <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
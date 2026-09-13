import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getServices } from '@/api';
import type { Settings, Service } from '@/types';

const integrationBenefits = [
  { icon: '🔗', title: 'One relationship', desc: 'No juggling multiple vendors. Single point of accountability.' },
  { icon: '🎯', title: 'Tailored solutions', desc: 'Every engagement fits your sector, size, and ambition.' },
  { icon: '🏗️', title: 'Sustainable outcomes', desc: 'We build foundations that lasting organizations stand on.' },
];

export default function ServicesPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, servicesData] = await Promise.all([
          getSettings(),
          getServices(),
        ]);
        setSettings(settingsData);
        setServices(servicesData);
      } catch (e: any) {
        setError(e?.message || 'Failed');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Our Services - {settings.site_name}</title>
        <meta name="description" content="Integrated solutions that connect strategy, branding, technology, and growth — all under one roof." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            Integrated solutions that connect strategy, branding, technology, and growth — all under one roof.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Integrated Practice Areas"
            subtitle="Interconnected services designed to work together — or stand alone — based on your needs."
          />
          {services.length === 0 ? (
            <p className="text-center text-neutral-400">No services available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 text-2xl">
                    {s.icon || '📋'}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-500 flex-1">{s.description}</p>
                  {s.items && s.items.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {s.items.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs text-neutral-400 flex items-start gap-1.5">
                          <span className="text-brand-cyan mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to={s.image ? `/services/${s.slug}` : `/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-brand-cyan font-semibold text-sm mt-4 hover:gap-2.5 transition-all"
                  >
                    Learn More <FiArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* One Partner. Total Integration */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="One Partner. Total Integration."
            subtitle="When every part of your organization is connected, the whole becomes greater than the sum of its parts."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {integrationBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center border border-neutral-200"
              >
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-2">{b.title}</h3>
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
            Wherever you are in your growth journey — let's start the conversation.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/quote" className="btn-primary text-lg">
              Get a Free Quote <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

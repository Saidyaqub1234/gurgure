import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getService, getSettings } from '@/api';
import type { Settings, Service } from '@/types';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        const [settingsData, serviceData] = await Promise.all([
          getSettings(),
          getService(slug),
        ]);
        setSettings(settingsData);
        setService(serviceData);
      } catch (e: any) {
        setError(e?.message || 'Failed to load service');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !service || !settings) return <PublicLayout><ErrorState message={error || 'Service not found'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>{service.title} - {settings.site_name}</title>
        <meta name="description" content={service.description || ''} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <FiArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="text-6xl mb-6">{service.icon || '📋'}</div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              {service.title}
            </h1>
            {service.description && (
              <p className="text-lg text-white/80 max-w-3xl">
                {service.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Service Items */}
      {service.items && service.items.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-brand-blue mb-8">What We Deliver</h2>
              <div className="space-y-4">
                {service.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-brand flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-neutral-600">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service Image */}
      {service.image && (
        <section className="py-12 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6">
            <img src={service.image} alt={service.title} className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg" />
          </div>
        </section>
      )}

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
            Interested in {service.title}?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-white/80 max-w-2xl mx-auto mb-8"
          >
            Let's discuss how we can help you achieve your goals.
          </motion.p>
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

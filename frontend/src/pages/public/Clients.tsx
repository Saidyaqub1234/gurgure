import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiExternalLink, FiX } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { getSettings, getClients } from '@/api';
import type { Settings, Client } from '@/types';

function ClientModal({ client, onClose }: { client: Client; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors">
          <FiX className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-2xl mx-auto mb-4 bg-neutral-100 flex items-center justify-center overflow-hidden">
            {client.logo ? (
              <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-3" />
            ) : (
              <span className="text-3xl font-heading font-bold text-neutral-300">{client.name.charAt(0)}</span>
            )}
          </div>
          <h2 className="text-2xl font-heading font-bold text-brand-blue">{client.name}</h2>
          {client.sector && (
            <span className="inline-block mt-2 px-3 py-1 bg-brand-blue/5 text-brand-blue text-xs font-medium rounded-full">{client.sector}</span>
          )}
        </div>

        {client.description && (
          <p className="text-neutral-600 leading-relaxed mb-6">{client.description}</p>
        )}

        {client.website && (
          <a
            href={client.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-sm"
          >
            Visit Website <FiExternalLink className="w-4 h-4" />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Clients() {
  const [currentImage, setCurrentImage] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroImages = settings?.hero_images?.length ? settings.hero_images : [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
  ];

  useEffect(() => {
    if (!heroImages.length) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, cl] = await Promise.all([getSettings(), getClients()]);
      setSettings(s);
      setClients(cl);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={fetchData} /></PublicLayout>;

  const published = clients.filter(c => c.is_published);
  const sectors = ['All', ...new Set(published.map(c => c.sector).filter(Boolean))];
  const filtered = filter === 'All' ? published : published.filter(c => c.sector === filter);

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Our Clients - {settings.site_name}</title>
        <meta name="description" content={`Our clients and partners - ${settings.site_name}`} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImages.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImage === i ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            {settings.page_hero_data?.clients?.title || 'Our Clients & Partners'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            {settings.page_hero_data?.clients?.subtitle || 'Trusted by leading organizations across Afghanistan and beyond.'}
          </motion.p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentImage ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Filter */}
      {sectors.length > 1 && (
        <section className="py-8 bg-white border-b border-neutral-100 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setFilter(sector || 'All')}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    filter === sector
                      ? 'bg-brand-blue text-white shadow-brand-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <EmptyState title="No clients found" message="No clients match the selected filter." />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((client, i) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  onClick={() => setSelectedClient(client)}
                  className="card flex flex-col items-center justify-center text-center cursor-pointer group min-h-[160px]"
                >
                  <div className="w-20 h-20 rounded-2xl mb-4 bg-neutral-50 flex items-center justify-center overflow-hidden group-hover:bg-brand-blue/5 transition-colors">
                    {client.logo ? (
                      <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-2 transition-transform group-hover:scale-110" />
                    ) : (
                      <span className="text-2xl font-heading font-bold text-neutral-300 group-hover:text-brand-blue transition-colors">{client.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-heading font-bold text-brand-blue group-hover:text-brand-blue-light transition-colors">{client.name}</h3>
                  {client.sector && (
                    <span className="text-xs text-neutral-400 mt-1">{client.sector}</span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}

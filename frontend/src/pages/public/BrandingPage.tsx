import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiEdit3, FiCheck, FiTarget, FiLayers } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getServicesByCategory } from '@/api';
import type { Settings, Service } from '@/types';

const process = [
  { num: '01', title: 'Discover', desc: 'We audit your current brand, conduct market research, and identify what makes you unique among competitors.' },
  { num: '02', title: 'Define', desc: 'We establish your brand positioning, personality, voice, and emotional standards for success.' },
  { num: '03', title: 'Design', desc: 'We create logos, color palettes, typography, and visual assets that speak to your brand essence.' },
  { num: '04', title: 'Deliver', desc: 'We provide complete brand guidelines, train your team, and ensure consistency across all channels.' },
];

const deliverables = [
  { icon: '🔍', title: 'Brand Audit & Research', desc: 'Comprehensive analysis of your current brand, competitive landscape, and market positioning.' },
  { icon: '🎯', title: 'Brand Positioning & Messaging', desc: 'Clear brand positioning, value proposition, and messaging framework.' },
  { icon: '✨', title: 'Logo Design & Visual Identity', desc: 'Distinctive logo, color palette, typography, and visual system.' },
  { icon: '📘', title: 'Brand Guidelines', desc: 'Comprehensive brand book covering logo usage, colors, typography, and voice.' },
  { icon: '📄', title: 'Corporate Collateral', desc: 'Business cards, letterheads, envelopes, and stationery with consistency.' },
  { icon: '📱', title: 'Social Media Visual Content', desc: 'Custom templates, graphics, and visual assets for consistent social media.' },
  { icon: '🚀', title: 'Brand Rollout Support', desc: 'Training, implementation guidance, and activation strategy.' },
  { icon: '📊', title: 'Creative Campaigns', desc: 'Integrated marketing campaigns across multiple channels.' },
];

const promises = [
  { icon: '🎨', title: 'Holistic & Purposeful', desc: 'Logos, typography, color palette, voice — we work on these together to create an impactful, cohesive brand.' },
  { icon: '📈', title: 'Designed for Scaling', desc: 'We create identities that are authentic to your business and adaptable as you grow.' },
  { icon: '🤝', title: 'Driven by Collaboration', desc: 'You\'re the champion of your business. We\'re the champions of creative solutions.' },
];

const clients = ['Moraa Educational Complex', 'Estedaad', 'Hadith Academy', 'Qasemi Group', 'Sarvari Group', 'Amini Roshandel Group', 'Wali Printing Press', 'Danish Press'];

export default function BrandingPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { const f = async () => { try { const [s, rs] = await Promise.all([getSettings(), getServicesByCategory('branding')]); setSettings(s); setRelatedServices(rs); } catch (e: any) { setError(e?.message || 'Failed'); } finally { setLoading(false); } }; f(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet><title>Branding & Creative Design - {settings.site_name}</title><meta name="description" content="GURGURE builds brands that connect, inspire, and endure. Strategic branding, visual identity, guidelines, and creative campaigns." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Branding Services</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-3xl mx-auto">We build brands that connect, inspire, and endure. From strategy to visual identity to guidelines — make your brand visible and memorable.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-neutral-50 rounded-3xl p-10 text-center">
            <p className="text-xl font-medium text-brand-blue max-w-3xl mx-auto leading-relaxed">"A brand is far more than a logo — it is the complete visual and emotional identity of an organization. It is how you are recognized at first glance, how you build trust over time, and how you remain memorable."</p>
            <p className="text-neutral-400 mt-4">— GURGURE Company</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our Branding Process" subtitle="A disciplined, transparent process designed to uncover your brand's true potential." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold mx-auto mb-4">{p.num}</div>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-3">{p.title}</h3>
                <p className="text-sm text-neutral-500">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="What We Deliver" subtitle="Comprehensive branding solutions tailored to your organization's unique needs." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card">
                <div className="text-2xl mb-4">{d.icon}</div>
                <h3 className="font-heading font-bold text-brand-blue mb-2">{d.title}</h3>
                <p className="text-sm text-neutral-500">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-brand-dark rounded-3xl p-12 text-white text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Our Branding Promise</h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto">We don't just design logos. We build brand foundations that help you navigate change, outsmart competition, and accelerate growth.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {promises.map((p) => (<div key={p.title}><h3 className="font-bold mb-2">{p.icon} {p.title}</h3><p className="text-sm text-white/70">{p.desc}</p></div>))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Brands We've Transformed" subtitle="Proud partners who trusted us to build or refresh their brand identity." />
          <div className="flex flex-wrap justify-center gap-4">{clients.map((c) => <span key={c} className="bg-white rounded-xl px-5 py-3 text-sm font-medium text-brand-blue border border-neutral-200">{c}</span>)}</div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Related Services" subtitle="Explore more of our branding and design offerings." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 text-2xl">{s.icon || '📋'}</div>
                  <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-500 flex-1">{s.description}</p>
                  <Link to={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 text-brand-cyan font-semibold text-sm mt-4 hover:gap-2.5 transition-all">Learn More <FiArrowRight className="w-4 h-4" /></Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div className="bg-neutral-100 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-heading font-bold text-brand-blue mb-4">Ready to Build a Remarkable Brand?</h2>
            <p className="text-neutral-500 mb-8 max-w-xl mx-auto">Let's start with a discovery conversation — no obligation, just clarity on how we can make your brand visible.</p>
            <Link to="/quote" className="btn-primary">Request a Branding Consultation <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

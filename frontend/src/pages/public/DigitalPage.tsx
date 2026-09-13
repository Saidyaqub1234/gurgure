import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheck, FiMonitor, FiCode, FiServer, FiWifi, FiShield, FiLayers } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getServicesByCategory } from '@/api';
import type { Settings, Service } from '@/types';

const categories = [
  {
    icon: FiCode, title: 'System Development & Digital Transformation', subtitle: 'Replace manual, fragmented systems with intelligent, integrated tools.',
    cards: [
      { title: 'Enterprise Solutions', items: ['MIS — Management Information Systems', 'ERP — Enterprise Resource Planning', 'HR Management Systems', 'Finance & Accounting Systems', 'Procurement & Inventory Systems'] },
      { title: 'Digital Platforms', items: ['Database Design & Development', 'Custom Digital Platforms', 'Learning Management Systems (LMS)', 'Automation & Smart Systems', 'Workflow Optimization'] },
      { title: 'Outcomes', items: ['Better decision-making with real-time data', 'Stronger reporting & compliance', 'Reduced operational costs', 'Technology that scales with you', 'End-to-end process integration'] },
    ],
  },
  {
    icon: FiMonitor, title: 'Website Hosting & Development', subtitle: 'A website is often the first point of contact. It must perform with consistency, security, and clarity.',
    cards: [
      { title: 'Hosting & Infrastructure', items: ['Domain Registration', 'Reliable Web Hosting', 'SSL Security & Encryption', 'Performance Optimization', 'Ongoing Maintenance & Support'] },
      { title: 'Design & Development', items: ['Custom Website Design', 'Responsive Layouts (Desktop, Tablet, Mobile)', 'Scalable Architecture', 'Secure Technical Setup', 'User-Friendly Management'] },
      { title: 'Performance Promise', items: ['99.9% Uptime Guarantee', 'Fast Load Times (under 2 seconds)', 'Regular Security Audits', 'Daily Backups', '24/7 Monitoring'] },
    ],
  },
  {
    icon: FiWifi, title: 'ICT Infrastructure & Technical Solutions', subtitle: 'Great systems fail on weak infrastructure. We build secure, scalable technical environments.',
    cards: [
      { title: 'Network Design', items: ['LAN & WAN Network Design', 'High-Performance Connectivity', 'Multi-site Integration', 'Wireless Infrastructure', 'Network Security'] },
      { title: 'Server Solutions', items: ['Server Deployment & Configuration', 'Shared Hosting Solutions', 'VPS & Dedicated Servers', 'Cloud Integration', 'Server Maintenance'] },
      { title: 'Support & Maintenance', items: ['24/7 Technical Support', 'System Monitoring', 'Security Patching', 'Disaster Recovery', 'Long-term Partnership'] },
    ],
  },
];

const processSteps = [
  { num: '1', title: 'Assess', desc: 'We evaluate your current systems, infrastructure, and digital maturity.' },
  { num: '2', title: 'Design', desc: 'We architect solutions tailored to your specific workflows and data needs.' },
  { num: '3', title: 'Build', desc: 'Our engineers develop, configure, and test your systems with rigorous quality control.' },
  { num: '4', title: 'Deploy', desc: 'We manage rollout, data migration, and user training for seamless adoption.' },
  { num: '5', title: 'Support', desc: 'We provide ongoing maintenance, optimization, and scale-as-you-grow partnership.' },
];

const techStack = ['Linux / Windows Server', 'MySQL / PostgreSQL', 'PHP / Laravel', 'Node.js / React', 'Python / Django', 'HTML5 / CSS3 / JS', 'AWS / Cloud Hosting', 'Docker', 'WordPress / Custom CMS'];

const clients = ['Qasemi Group', 'Estedaad', 'Shinwari Aluminum Factory', 'Amini Roshandel Group', 'Hadith Academy', 'Moraa Educational Complex', 'Danish Press', 'Pajhwok'];

export default function DigitalPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { const f = async () => { try { const [s, rs] = await Promise.all([getSettings(), getServicesByCategory('digital')]); setSettings(s); setRelatedServices(rs); } catch (e: any) { setError(e?.message || 'Failed'); } finally { setLoading(false); } }; f(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet><title>Digital Transformation & ICT - {settings.site_name}</title><meta name="description" content="Enterprise-grade digital transformation, custom systems (MIS/ERP), ICT infrastructure, and professional web development." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Digital Transformation & ICT</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-3xl mx-auto">Modern organizations cannot afford outdated, manual, or fragmented systems. We build the intelligent, integrated digital foundations that scale with your ambition.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-neutral-50 rounded-3xl p-10 text-center">
            <p className="text-xl font-medium text-brand-blue max-w-3xl mx-auto leading-relaxed">"Even the most powerful digital systems are only as effective as the infrastructure that supports them. We deliver transformation that works — from reliable networks to custom enterprise systems."</p>
            <p className="text-neutral-400 mt-4">— GURGURE Digital & ICT Team</p>
          </motion.div>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <section key={ci} className={`py-24 ${ci % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="text-3xl mb-3"><cat.icon className="w-10 h-10 mx-auto text-brand-cyan" /></div>
              <h2 className="text-2xl font-heading font-bold text-brand-blue mb-2">{cat.title}</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">{cat.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cat.cards.map((card) => (
                <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card">
                  <h3 className="text-lg font-heading font-bold text-brand-blue mb-4">{card.title}</h3>
                  <ul className="space-y-2">{card.items.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-neutral-600 border-b border-neutral-100 pb-2"><FiCheck className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0" /> {item}</li>)}</ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our Digital Transformation Process" subtitle="A proven methodology that ensures successful technology adoption." />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {processSteps.map((s) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center bg-white rounded-2xl p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold mx-auto mb-4">{s.num}</div>
                <h3 className="font-heading font-bold text-brand-blue mb-2">{s.title}</h3>
                <p className="text-xs text-neutral-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Technologies We Work With" subtitle="Modern, proven technologies that power enterprise-grade solutions." />
          <div className="flex flex-wrap justify-center gap-4">{techStack.map((t) => <span key={t} className="bg-neutral-50 rounded-xl px-5 py-3 text-sm font-medium text-brand-blue border border-neutral-200">{t}</span>)}</div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-brand-dark rounded-3xl p-12 text-white">
            <h2 className="text-2xl font-heading font-bold mb-10 text-center">Why Choose GURGURE for Digital Transformation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{ t: 'End-to-End Delivery', d: 'From infrastructure to enterprise software to websites — we deliver complete solutions.' }, { t: 'Built for Scale', d: 'Systems designed to grow with your organization, from 10 to 10,000 users.' }, { t: 'Long-term Partnership', d: 'Ongoing support, maintenance, and continuous improvement after launch.' }, { t: 'Local Context, Global Standards', d: 'We understand local realities while applying international best practices.' }].map((d) => (<div key={d.t}><h3 className="font-bold mb-2">{d.t}</h3><p className="text-sm text-white/70">{d.d}</p></div>))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Organizations We've Transformed Digitally" subtitle="Trusted partners across sectors." />
          <div className="flex flex-wrap justify-center gap-4">{clients.map((c) => <span key={c} className="bg-white rounded-xl px-5 py-3 text-sm font-medium text-brand-blue border border-neutral-200">{c}</span>)}</div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Related Services" subtitle="Explore more of our digital and ICT offerings." />
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
            <h2 className="text-3xl font-heading font-bold text-brand-blue mb-4">Ready to Transform Your Digital Foundation?</h2>
            <p className="text-neutral-500 mb-8 max-w-xl mx-auto">Let's discuss your technology needs — from infrastructure to custom systems to web presence.</p>
            <Link to="/quote" className="btn-primary">Request a Digital Consultation <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings } from '@/api';
import type { Settings } from '@/types';

const architectureLayers = [
  { title: '📱 Presentation Layer (Frontend)', items: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Bootstrap'] },
  { title: '⚙️ Application Layer (Backend)', items: ['Laravel (PHP)', 'Node.js', 'Python / Django', 'RESTful API', 'GraphQL'] },
  { title: '💾 Data Layer (Database)', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis (Cache)'] },
  { title: '☁️ Infrastructure Layer', items: ['AWS (EC2, S3, RDS)', 'DigitalOcean', 'cPanel / Plesk', 'Docker', 'Linux (Ubuntu)'] },
];

const stackCategories = [
  { icon: '🎨', title: 'Frontend Development', items: ['React.js / Next.js — Dynamic SPAs & SSR', 'Vue.js / Nuxt.js — Lightweight interfaces', 'HTML5 / CSS3 / JavaScript (ES6+)', 'Tailwind CSS / Bootstrap — Responsive design', 'jQuery (legacy integration)'] },
  { icon: '⚙️', title: 'Backend Development', items: ['Laravel (PHP) — Enterprise ERP/MIS', 'Node.js / Express — Real-time applications', 'Python / Django — Data-heavy systems', 'RESTful API & GraphQL', 'WebSockets — Live notifications'] },
  { icon: '🗄️', title: 'Database & Storage', items: ['MySQL — Primary relational database', 'PostgreSQL — Advanced features', 'MongoDB — Document storage', 'Redis — Caching & queues', 'AWS S3 — File storage'] },
  { icon: '☁️', title: 'Hosting & Infrastructure', items: ['AWS (EC2, RDS, S3, CloudFront)', 'DigitalOcean Droplets', 'cPanel / Plesk Shared Hosting', 'VPS (Ubuntu, CentOS)', 'Docker containerization'] },
  { icon: '📝', title: 'CMS & Platforms', items: ['WordPress (Custom themes & plugins)', 'Custom Learning Management System (LMS)', 'Custom ERP / MIS Platforms', 'WooCommerce / Custom E-commerce'] },
  { icon: '🛠️', title: 'DevOps & Tools', items: ['Git / GitHub — Version control', 'CI/CD pipelines', 'Docker / Containerization', 'Jira / Trello — Project management', 'VS Code / PHPStorm'] },
];

const securityCards = [
  { icon: '🔒', title: 'SSL/TLS Encryption', desc: '256-bit encryption for all data in transit. EV/OV certificates available.' },
  { icon: '🛡️', title: 'Role-Based Access Control', desc: 'Granular user permissions at module, page, and field level.' },
  { icon: '💾', title: 'Automated Backups', desc: 'Daily encrypted backups with 30-day retention. Point-in-time recovery.' },
  { icon: '📋', title: 'Audit Logs', desc: 'Complete activity tracking for compliance and forensics.' },
  { icon: '🔐', title: 'Two-Factor Authentication', desc: 'Optional 2FA for all user accounts.' },
  { icon: '🔄', title: 'Disaster Recovery', desc: 'Multi-region backup strategy with RTO < 4 hours.' },
  { icon: '🛡️', title: 'DDoS Protection', desc: 'Cloudflare or AWS Shield integration.' },
  { icon: '🔍', title: 'Security Audits', desc: 'Regular vulnerability scanning and penetration testing.' },
];

const methodology = [
  { num: '1', title: 'Requirements', desc: 'Discovery & specification' },
  { num: '2', title: 'Architecture', desc: 'System design & planning' },
  { num: '3', title: 'Sprints', desc: 'Agile 2-week cycles' },
  { num: '4', title: 'Testing', desc: 'QA + UAT' },
  { num: '5', title: 'Deployment', desc: 'Staging → Production' },
  { num: '6', title: 'Support', desc: 'Maintenance & scaling' },
];

const whyStack = [
  { icon: '🔒', title: 'Security', desc: 'Your data is protected with enterprise-grade encryption, access controls, and compliance-ready audit trails.' },
  { icon: '📈', title: 'Scalability', desc: 'Systems designed to grow from 10 users to 10,000+ without architecture changes.' },
  { icon: '⚡', title: 'Performance', desc: 'Optimized databases, caching, and CDN delivery for sub-2 second response times.' },
  { icon: '🛠️', title: 'Maintainability', desc: 'Clean, documented code ensures long-term support and easy feature additions.' },
];

export default function Technology() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { const f = async () => { try { setSettings(await getSettings()); } catch (e: any) { setError(e?.message || 'Failed'); } finally { setLoading(false); } }; f(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet><title>Technology Stack - {settings.site_name}</title><meta name="description" content="GURGURE's enterprise technology stack: Modern frameworks, secure infrastructure, and proven methodologies." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Technology Stack</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-3xl mx-auto">Modern, enterprise-grade technologies powering custom ERP, MIS, LMS, and digital transformation solutions.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="System Architecture" subtitle="A modern, scalable, secure architecture designed for enterprise performance." />
          <motion.div className="bg-neutral-50 rounded-3xl p-10">
            <div className="space-y-6">
              {architectureLayers.map((layer) => (
                <div key={layer.title} className="border border-neutral-200 rounded-2xl p-6 bg-white">
                  <h4 className="font-semibold text-brand-blue mb-4">{layer.title}</h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {layer.items.map((item) => <span key={item} className="bg-brand-dark text-white px-4 py-2 rounded-full text-sm font-medium">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our Technology Stack" subtitle="Enterprise-grade technologies selected for security, scalability, and performance." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stackCategories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-8 border border-neutral-200 hover:border-brand-cyan hover:shadow-lg transition-all">
                <div className="text-2xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-4">{cat.title}</h3>
                <ul className="space-y-2">{cat.items.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-neutral-600 border-b border-neutral-100 pb-2"><span className="text-brand-cyan font-bold">▹</span> {item}</li>)}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Security & Compliance" subtitle="Enterprise-grade security measures protecting your data and systems." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityCards.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-center bg-neutral-50 rounded-2xl p-6">
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-heading font-bold text-brand-blue mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-neutral-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Development Methodology" subtitle="A disciplined, transparent process for enterprise system delivery." />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {methodology.map((s) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center bg-white rounded-2xl p-5">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold mx-auto mb-3">{s.num}</div>
                <strong className="text-sm text-brand-blue">{s.title}</strong>
                <p className="text-xs text-neutral-500 mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-neutral-50 rounded-3xl p-10">
            <h2 className="text-xl font-heading font-bold text-brand-blue mb-8">Why Our Technology Stack Matters to You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyStack.map((w) => (
                <div key={w.title}>
                  <h3 className="font-heading font-bold text-brand-blue mb-2">{w.icon} {w.title}</h3>
                  <p className="text-sm text-neutral-500">{w.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div className="bg-brand-dark rounded-3xl p-12 text-white text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Ready to Build Your Enterprise System?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Let's discuss your technical requirements and how our stack can support your digital transformation.</p>
            <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-brand-blue font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-all">Request a Technical Consultation <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

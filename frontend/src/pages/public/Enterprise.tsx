import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getServicesByCategory } from '@/api';
import type { Settings, Service } from '@/types';

const solutions = [
  { icon: '🏢', title: 'Custom ERP (Enterprise Resource Planning)', desc: 'End-to-end business management platform integrating all core processes.', features: ['Multi-branch / multi-company support', 'Real-time dashboard & KPIs', 'Role-based access control', 'Custom workflow automation', 'Mobile-responsive access'] },
  { icon: '👥', title: 'HR Management System', desc: 'Complete workforce management from recruitment to retirement.', features: ['Employee database & org chart', 'Attendance & leave management', 'Payroll processing', 'Performance reviews', 'Recruitment & onboarding'] },
  { icon: '💰', title: 'Finance & Accounting', desc: 'Comprehensive financial management with audit trails and compliance.', features: ['General ledger & chart of accounts', 'Accounts payable/receivable', 'Bank reconciliation', 'Financial statements (P&L, balance sheet)', 'Budgeting & forecasting'] },
  { icon: '📦', title: 'Procurement & Inventory', desc: 'End-to-end supply chain management from purchase to payment.', features: ['Vendor management', 'Purchase orders & approvals', 'Inventory tracking & stock alerts', 'Warehouse management', 'Asset lifecycle tracking'] },
  { icon: '📊', title: 'Business Intelligence & Analytics', desc: 'Data-driven decision making with custom dashboards and reports.', features: ['Real-time dashboards', 'Custom report builder', 'Data visualization', 'Export to Excel/PDF', 'Automated report scheduling'] },
  { icon: '⚡', title: 'Workflow Automation', desc: 'Eliminate manual tasks with intelligent process automation.', features: ['Approval workflows', 'Email & SMS notifications', 'Document generation', 'Integration with existing systems', 'Audit trails for compliance'] },
];

const modules = ['Financial Management', 'HR & Payroll', 'Inventory Management', 'Procurement', 'Sales & CRM', 'Project Management', 'Asset Management', 'Reporting & Analytics', 'Document Management', 'Compliance & Audit', 'Supply Chain', 'Business Intelligence'];

const caseStudies = [
  { tag: 'ERP Implementation', client: 'Qasemi Group', desc: 'Complete ERP system connecting finance, procurement, and inventory across 5 subsidiaries.', result: '40% reduction in inventory discrepancies', tech: 'Custom ERP, Laravel, MySQL, AWS' },
  { tag: 'ICT Infrastructure + ERP', client: 'Amini Roshandel Group', desc: 'LAN/WAN network deployment + integrated ERP for multi-location operations.', result: '99.9% network uptime, real-time data sync', tech: 'Custom ERP, Network Infrastructure, VPS' },
  { tag: 'HR & Payroll System', client: '[Your Enterprise Client]', desc: 'Complete HR management system with attendance tracking, payroll, and performance reviews.', result: '[Add your measurable result]', tech: '[Your tech stack]' },
];

const whyCards = [
  { icon: '🔒', title: 'Enterprise Security', desc: 'RBAC, SSL encryption, audit trails, and regular security audits.' },
  { icon: '📈', title: 'Scalable Architecture', desc: 'Systems designed to grow from 10 to 10,000+ users.' },
  { icon: '🛠️', title: 'Ongoing Support', desc: '24/7 monitoring, regular updates, and dedicated account management.' },
  { icon: '🔄', title: 'Integration Ready', desc: 'API-first design connects with your existing tools and systems.' },
];

const impacts = [{ n: '40%', l: 'Average operational efficiency gain' }, { n: '99.9%', l: 'System uptime guaranteed' }, { n: '60%', l: 'Reduction in manual data entry' }, { n: 'Real-time', l: 'Data visibility across all branches' }];

export default function Enterprise() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { const f = async () => { try { const [s, rs] = await Promise.all([getSettings(), getServicesByCategory('enterprise')]); setSettings(s); setRelatedServices(rs); } catch (e: any) { setError(e?.message || 'Failed'); } finally { setLoading(false); } }; f(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet><title>Enterprise Solutions - {settings.site_name}</title><meta name="description" content="Enterprise digital transformation: Custom ERP, HR management, finance systems, and business process automation." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Enterprise Solutions</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-3xl mx-auto">Custom ERP · HR Management · Finance Systems · Business Process Automation</motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 bg-neutral-50 rounded-2xl p-8">
            {[{ n: '10+', l: 'Enterprise Clients' }, { n: '500+', l: 'Users Deployed' }, { n: '99.9%', l: 'System Uptime' }, { n: '40%', l: 'Avg. Efficiency Gain' }].map((s) => (<div key={s.l} className="text-center"><div className="text-3xl font-heading font-bold text-brand-blue">{s.n}</div><div className="text-sm text-neutral-500">{s.l}</div></div>))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Enterprise Solutions" subtitle="Integrated systems that connect your people, processes, and data." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-3">{s.title}</h3>
                <p className="text-sm text-neutral-500 mb-4">{s.desc}</p>
                <ul className="space-y-2">{s.features.map((f) => <li key={f} className="flex items-start gap-2 text-xs text-neutral-600 border-b border-neutral-100 pb-2"><FiCheck className="w-3 h-3 text-brand-cyan mt-0.5 flex-shrink-0" /> {f}</li>)}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Complete ERP Modules" subtitle="Choose the modules you need. Add more as you grow." />
          <div className="flex flex-wrap justify-center gap-3">
            {modules.map((m) => <span key={m} className="bg-white rounded-full px-5 py-3 text-sm font-medium text-brand-blue border border-neutral-200">{m}</span>)}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-heading font-bold text-brand-blue mb-8">Enterprise Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <motion.div key={cs.client} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-neutral-50 rounded-2xl p-8">
                <span className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full mb-4">{cs.tag}</span>
                <h3 className="font-heading font-bold text-brand-blue mb-3">{cs.client}</h3>
                <p className="text-sm text-neutral-500 mb-4">{cs.desc}</p>
                <div className="bg-green-50 text-green-700 rounded-xl px-4 py-2 text-sm font-semibold inline-block">{cs.result}</div>
                <p className="text-xs text-neutral-400 mt-3"><strong>Technology:</strong> {cs.tech}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Why Enterprises Trust GURGURE" subtitle="We deliver enterprise-grade solutions with the agility of a specialized team." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyCards.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                <div className="text-2xl mb-3">{w.icon}</div>
                <h3 className="font-heading font-bold text-brand-blue mb-2">{w.title}</h3>
                <p className="text-xs text-neutral-500">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-neutral-50 rounded-3xl p-10">
            <h2 className="text-xl font-heading font-bold text-brand-blue mb-6">Enterprise Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-neutral-600">
              <div><strong>⚙️ Backend:</strong> Laravel / Node.js / Python</div>
              <div><strong>🎨 Frontend:</strong> React.js / Vue.js / Next.js</div>
              <div><strong>💾 Database:</strong> MySQL / PostgreSQL / Redis</div>
              <div><strong>☁️ Infrastructure:</strong> AWS / Dedicated Servers / VPS</div>
              <div><strong>🔐 Security:</strong> SSL, RBAC, 2FA, Daily Backups</div>
              <div><strong>📊 Reporting:</strong> Custom BI, Real-time dashboards</div>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {impacts.map((im) => (<div key={im.l} className="text-center"><div className="text-3xl font-heading font-bold text-brand-cyan">{im.n}</div><p className="text-sm text-neutral-500 mt-1">{im.l}</p></div>))}
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Related Services" subtitle="Explore more of our enterprise solutions." />
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
          <motion.div className="bg-brand-dark rounded-3xl p-12 text-white text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Ready to Transform Your Enterprise?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Let's discuss how GURGURE can help you streamline operations, reduce costs, and scale with confidence.</p>
            <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-brand-blue font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-all">Request an Enterprise Consultation <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

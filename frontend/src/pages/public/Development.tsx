import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheck, FiTarget, FiBarChart, FiTrendingUp, FiUsers, FiBookOpen, FiBriefcase, FiLayers } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getServicesByCategory } from '@/api';
import type { Settings, Service } from '@/types';

const framework = [
  { num: '01', title: 'Vision', desc: 'Define where your organization wants to be' },
  { num: '02', title: 'Strategy', desc: 'Map the path with clear, actionable priorities' },
  { num: '03', title: 'Structure', desc: 'Build the right organizational infrastructure' },
  { num: '04', title: 'Execution', desc: 'Deliver with accountability and precision' },
  { num: '05', title: 'Results', desc: 'Measure, learn, and sustain momentum' },
];

const deliverables = [
  'Business Planning — Comprehensive plans built for execution and investor confidence',
  'Strategic Planning — Long-range frameworks aligned to your mission and market',
  'Concept Development — From idea to viable, structured opportunity',
  'Proposal & Technical Narrative Writing — Winning documents that communicate value',
  'Feasibility Studies — Evidence-based analysis before you commit resources',
  'Organizational Development — Structure, culture, and governance improvements',
  'Institutional Roadmaps — Phased growth plans for lasting transformation',
  'Strategic Advisory Services — Ongoing expert guidance for leadership teams',
  'Operational & Growth Planning — Scaling efficiently without sacrificing quality',
];

const process = [
  { num: '1', title: 'Discovery & Diagnostic', desc: 'We conduct deep analysis of your current state, market position, and growth objectives.' },
  { num: '2', title: 'Strategy Formulation', desc: 'We develop actionable strategies backed by rigorous analysis and deep industry knowledge.' },
  { num: '3', title: 'Roadmap & Execution Planning', desc: 'We create clear initiatives, timelines, and resource requirements for seamless implementation.' },
  { num: '4', title: 'Ongoing Partnership', desc: 'We stay with you through execution, monitoring progress and adapting as your business evolves.' },
];

const capabilities = [
  { icon: FiBarChart, title: 'Market Research & Analysis', desc: 'Comprehensive market sizing, trend analysis, and consumer behavior insights.' },
  { icon: FiTarget, title: 'Competitive Intelligence', desc: 'Deep analysis of competitor strategies, strengths, weaknesses, and market positioning.' },
  { icon: FiTrendingUp, title: 'Scenario Planning', desc: 'Explore alternative future scenarios and develop strategies to adapt and thrive.' },
  { icon: FiLayers, title: 'Financial Modeling & Projections', desc: 'Comprehensive financial models covering 3-5 years based on detailed assumptions.' },
  { icon: FiBarChart, title: 'Growth & Innovation Strategy', desc: 'Identify new opportunities for growth, expansion, and diversification.' },
  { icon: FiUsers, title: 'Operational Excellence', desc: 'Process optimization, workflow design, and efficiency improvement.' },
  { icon: FiBriefcase, title: 'Organizational Design', desc: 'Structure, culture, governance, and leadership alignment for sustainable performance.' },
  { icon: FiBookOpen, title: 'Annual Operating Plans', desc: 'Detailed bottom-up budgets and action plans with quarterly monitoring.' },
];

const clients = ['Estedaad', 'Qasemi Group', 'Sarvari Group', 'Amini Roshandel Group', 'MIDS', 'Rokham Services', 'Moraa Educational Complex', 'Hadith Academy'];

export default function Development() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { const f = async () => { try { const [s, rs] = await Promise.all([getSettings(), getServicesByCategory('development')]); setSettings(s); setRelatedServices(rs); } catch (e: any) { setError(e?.message || 'Failed'); } finally { setLoading(false); } }; f(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet><title>Business Development & Strategic Planning - {settings.site_name}</title><meta name="description" content="Enterprise-grade business strategy, strategic planning, and business development consulting." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Business Development & Strategic Planning</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-3xl mx-auto">We help organizations navigate complexity, accelerate growth, and build sustainable competitive advantage in an ever-changing world.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-neutral-50 rounded-3xl p-10 text-center">
            <p className="text-xl font-medium text-brand-blue max-w-3xl mx-auto leading-relaxed">"Strong organizations are built on strong planning. We believe that every thriving institution starts with a clear-eyed understanding of where it stands today, a compelling vision of where it wants to go, and a disciplined, practical roadmap for getting there."</p>
            <p className="text-neutral-400 mt-4">— GURGURE Company</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our Strategic Framework" subtitle="We align every engagement around a single, powerful chain of progress." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {framework.map((f, i) => (
              <motion.div key={f.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold mx-auto mb-4">{f.num}</div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-6">What We Deliver</h2>
              <ul className="space-y-3">{deliverables.map((d) => <li key={d} className="flex items-start gap-3 text-neutral-600 border-b border-neutral-100 pb-3"><FiCheck className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" /> {d}</li>)}</ul>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-6">Our Process</h2>
              <div className="space-y-6">{process.map((p) => (<div key={p.num}><div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-sm mb-3">{p.num}</div><h3 className="font-semibold text-brand-blue mb-1">{p.title}</h3><p className="text-sm text-neutral-500">{p.desc}</p></div>))}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Core Capabilities" subtitle="Our strategic expertise spans the full range of business functions." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card">
                <c.icon className="w-8 h-8 text-brand-cyan mb-4" />
                <h3 className="font-heading font-bold text-brand-blue mb-2">{c.title}</h3>
                <p className="text-sm text-neutral-500">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-brand-dark rounded-3xl p-12 text-white text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">What Makes GURGURE Different</h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto">We don't create strategic plans that sit on shelves. We partner with your team to build actionable roadmaps and execute them.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{ t: 'Implementation Partnership', d: 'We stay with you through execution, not just planning.' }, { t: 'Context-First Approach', d: 'Every strategy is grounded in your operating environment.' }, { t: 'Data-Driven Decisions', d: 'Recommendations backed by market research and competitive intelligence.' }, { t: 'Capacity Building', d: 'We upskill your team to own and execute strategies long after our engagement.' }].map((d) => (
                <div key={d.t}><h3 className="font-bold mb-2">{d.t}</h3><p className="text-sm text-white/70">{d.d}</p></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Organizations We've Guided" subtitle="Trusted by businesses, NGOs, and institutions across sectors." />
          <div className="flex flex-wrap justify-center gap-4">{clients.map((c) => <span key={c} className="bg-neutral-50 rounded-xl px-5 py-3 text-sm font-medium text-brand-blue">{c}</span>)}</div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-24 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Related Services" subtitle="Explore more of our business development offerings." />
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
            <h2 className="text-3xl font-heading font-bold text-brand-blue mb-4">Ready to Build Your Strategic Future?</h2>
            <p className="text-neutral-500 mb-8 max-w-xl mx-auto">Let's start with a strategic discovery conversation — no obligation, just clarity.</p>
            <Link to="/quote" className="btn-primary">Request a Strategy Consultation <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

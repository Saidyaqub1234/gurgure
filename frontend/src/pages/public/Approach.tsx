import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiTarget, FiLayers, FiCpu, FiMessageCircle, FiUsers, FiTrendingUp, FiSearch, FiEdit, FiCode, FiSend, FiBarChart, FiRefreshCw, FiCheckCircle } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings } from '@/api';
import type { Settings } from '@/types';

const integrationSteps = [
  { label: 'Strategy', icon: FiTarget },
  { label: 'Brand', icon: FiLayers },
  { label: 'Systems', icon: FiCpu },
  { label: 'Communication', icon: FiMessageCircle },
  { label: 'People', icon: FiUsers },
  { label: 'Results', icon: FiTrendingUp },
];

const phases = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We start by listening. We conduct stakeholder interviews, review existing assets, analyze your market, and identify gaps and opportunities.',
    items: ['Needs assessment & discovery workshops', 'Current state analysis (strategy, brand, systems)', 'Stakeholder interviews & market research', 'Opportunity identification'],
  },
  {
    num: '02',
    title: 'Design',
    desc: 'We co-create solutions tailored to your context. This phase produces clear roadmaps, brand directions, system specifications, and communication strategies.',
    items: ['Strategic roadmap development', 'Brand identity & creative direction', 'System architecture & technical design', 'Communication & marketing strategy'],
  },
  {
    num: '03',
    title: 'Build',
    desc: 'We turn plans into reality. Our teams develop brands, build systems, create content, and prepare all deliverables with rigorous quality control.',
    items: ['Brand asset creation & guidelines', 'System development (MIS, ERP, websites)', 'Content & campaign production', 'Training material development'],
  },
  {
    num: '04',
    title: 'Activate',
    desc: 'We launch, train, and support. This phase ensures your team can confidently use new systems, and your brand reaches the right audience.',
    items: ['Implementation & go-live support', 'Training & capacity building sessions', 'Campaign launches & brand rollouts', 'Change management & user adoption'],
  },
  {
    num: '05',
    title: 'Scale',
    desc: 'We measure, optimize, and grow. Long after launch, we remain a partner for continuous improvement and strategic evolution.',
    items: ['Performance monitoring & reporting', 'Iterative improvements & optimization', 'Ongoing advisory & support', 'Strategic pivots & scaling support'],
  },
];

const principles = [
  { icon: FiTarget, title: 'Context First', desc: 'No cookie-cutter solutions. Every engagement is tailored to your sector, size, and specific challenges.' },
  { icon: FiBarChart, title: 'Data-Informed', desc: 'We base decisions on evidence, not assumptions. Strategy, design, and systems are grounded in real data.' },
  { icon: FiSend, title: 'Action-Oriented', desc: 'Strategy without execution is fantasy. We deliver implemented solutions, not just documents.' },
  { icon: FiRefreshCw, title: 'Iterative', desc: 'We believe in continuous improvement. Launch, learn, and evolve together.' },
  { icon: FiUsers, title: 'Collaborative', desc: 'We work alongside your team, building ownership and capability from day one.' },
  { icon: FiCheckCircle, title: 'Sustainable', desc: 'We build systems and strategies that endure — not quick fixes that fade.' },
];

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Approach() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const s = await getSettings();
        setSettings(s);
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Our Approach - {settings.site_name}</title>
        <meta name="description" content="GURGURE's integrated approach: Discover, Design, Build, Activate, Scale. We connect strategy, brand, systems, and people for sustainable growth." />
      </Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Our Approach</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">We don't just deliver services. We build foundations that lasting organizations stand on.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Total Integration" subtitle="The difference between organizations that merely survive and those that truly thrive is almost always integration." />
          <motion.div className="bg-neutral-50 rounded-3xl p-8 md:p-12 text-center" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-lg font-medium text-brand-blue mb-8">When these elements work together, your entire organization becomes a powerful growth engine:</p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-8">
              {integrationSteps.map((step, i) => (
                <motion.div key={step.label} variants={item} className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-2 bg-brand-dark text-white rounded-full px-5 py-3 font-semibold text-sm">
                    <step.icon className="w-4 h-4" />
                    {step.label}
                  </div>
                  {i < integrationSteps.length - 1 && <FiArrowRight className="w-5 h-5 text-brand-cyan hidden md:block" />}
                </motion.div>
              ))}
            </div>
            <p className="text-neutral-500 italic">Strategy informs brand. Brand informs communication. Communication is supported by smart systems. Systems are operated by capable people.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our 5-Phase Framework" subtitle="Every client engagement follows a disciplined, transparent process designed for measurable outcomes." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {phases.map((phase, i) => (
              <motion.div key={phase.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="card">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg mb-4">{phase.num}</div>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-3">{phase.title}</h3>
                <p className="text-sm text-neutral-500 mb-4 leading-relaxed">{phase.desc}</p>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-neutral-600 border-b border-neutral-100 pb-2">
                      <FiArrowRight className="w-3 h-3 mt-0.5 text-brand-cyan flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="What Guides Us" subtitle="Six principles shape every decision we make and every solution we deliver." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-neutral-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                  <p.icon className="w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-3">{p.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-brand rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-heading font-bold mb-4">Ready to experience our approach?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">Let's start with a discovery conversation — no obligation, just clarity.</p>
            <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-brand-blue font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-all">
              Request a Discovery Call <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

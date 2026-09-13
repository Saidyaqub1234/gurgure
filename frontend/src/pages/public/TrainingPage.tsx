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

const philosophy = [
  { icon: '📚', title: 'Theory', desc: 'Foundational knowledge and frameworks grounded in global best practices.' },
  { icon: '🔧', title: 'Practice', desc: 'Hands-on application through real scenarios, case studies, and practical exercises.' },
  { icon: '🎯', title: 'Context', desc: 'Content tailored to your organization\'s real operational needs and industry specifics.' },
];

const programCategories = [
  { title: '🏛️ Leadership & Management Development', subtitle: 'Programs that cultivate the next generation of organizational leaders.', programs: [
    { icon: '👔', title: 'Executive Leadership', desc: 'Strategic thinking, decision-making under uncertainty, and leading organizational change.', duration: '2-5 days' },
    { icon: '📊', title: 'Middle Management Excellence', desc: 'Team leadership, performance management, and bridging strategy to execution.', duration: '3-5 days' },
    { icon: '🌟', title: 'Supervisory Skills', desc: 'First-time managers, delegation, communication, and team motivation.', duration: '2-3 days' },
  ]},
  { title: '💻 Technical & Digital Skills', subtitle: 'Equipping teams to confidently use modern digital tools and platforms.', programs: [
    { icon: '📱', title: 'Digital Literacy Fundamentals', desc: 'Essential computer skills, internet safety, and productivity tools.', duration: '2-5 days' },
    { icon: '📊', title: 'Data Analysis & Reporting', desc: 'Excel, data visualization, dashboard creation, and evidence-based decision making.', duration: '3-5 days' },
    { icon: '🤖', title: 'AI & Automation for Business', desc: 'Practical applications of AI tools, workflow automation, and future-ready skills.', duration: '2-3 days' },
  ]},
  { title: '🏢 Institutional Capacity Building', subtitle: 'Strengthening the systems and skills that make organizations effective.', programs: [
    { icon: '📋', title: 'Project Management', desc: 'Planning, execution, monitoring, and reporting using PM best practices.', duration: '3-5 days' },
    { icon: '💰', title: 'Financial Management for Non-Finance', desc: 'Budgeting, financial controls, donor compliance, and grant management.', duration: '2-4 days' },
    { icon: '📝', title: 'Proposal & Report Writing', desc: 'Technical writing, donor proposals, narrative reporting, and impact storytelling.', duration: '3-5 days' },
  ]},
  { title: '🤝 Professional & Soft Skills', subtitle: 'Essential workplace competencies that drive collaboration and performance.', programs: [
    { icon: '🗣️', title: 'Effective Communication', desc: 'Business writing, presentation skills, meeting facilitation, and interpersonal communication.', duration: '2-3 days' },
    { icon: '🤝', title: 'Teamwork & Collaboration', desc: 'Building trust, resolving conflict, and high-performance team dynamics.', duration: '1-3 days' },
    { icon: '⏰', title: 'Time Management & Productivity', desc: 'Prioritization, workflow optimization, and reducing workplace stress.', duration: '1-2 days' },
  ]},
];

const deliveryMethods = [
  { icon: '🏢', title: 'On-Site Training', desc: 'In-person sessions at your organization, tailored to your specific context.' },
  { icon: '💻', title: 'Virtual Live Training', desc: 'Interactive online sessions with real-time engagement and practical exercises.' },
  { icon: '📚', title: 'Blended Learning', desc: 'Combination of self-paced digital modules and facilitated live sessions.' },
  { icon: '🏛️', title: 'Seminars & Conferences', desc: 'Large-scale knowledge-sharing events connecting professionals.' },
];

const clients = ['Estedaad', 'Qasemi Group', 'Moraa Educational Complex', 'Hadith Academy', 'Amini Roshandel Group', 'Sarvari Group', 'MIDS', 'Rokham Services', 'Danish Press', 'Pajhwok'];

export default function TrainingPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { const f = async () => { try { const [s, rs] = await Promise.all([getSettings(), getServicesByCategory('training')]); setSettings(s); setRelatedServices(rs); } catch (e: any) { setError(e?.message || 'Failed'); } finally { setLoading(false); } }; f(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet><title>Trainings & Capacity Building - {settings.site_name}</title><meta name="description" content="Professional trainings, leadership development, digital skills workshops, and institutional capacity building programs." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Trainings & Capacity Building</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-3xl mx-auto">Human capital is the most important and most frequently underdeveloped asset. We build the skills, knowledge, and leadership capabilities that drive sustainable success.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-neutral-50 rounded-3xl p-10 text-center">
            <p className="text-xl font-medium text-brand-blue max-w-3xl mx-auto leading-relaxed">"The quality of your people — their skills, knowledge, leadership capabilities, and institutional awareness — ultimately determines the ceiling of your organizational performance."</p>
            <p className="text-neutral-400 mt-4">— GURGURE Training & Capacity Building Team</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our Training Philosophy" subtitle="Effective capacity building requires a balanced approach that integrates three essential elements." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-8 text-center border border-neutral-200 hover:border-brand-cyan transition-all">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-3">{p.title}</h3>
                <p className="text-sm text-neutral-500">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {programCategories.map((cat, ci) => (
        <section key={ci} className={`py-24 ${ci % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10"><h2 className="text-xl font-heading font-bold text-brand-blue mb-2">{cat.title}</h2><p className="text-neutral-500">{cat.subtitle}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.programs.map((p) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card">
                  <div className="text-2xl mb-4">{p.icon}</div>
                  <h3 className="font-heading font-bold text-brand-blue mb-2">{p.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{p.desc}</p>
                  <span className="inline-block bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full">{p.duration}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="How We Deliver" subtitle="Flexible delivery formats designed for maximum impact and convenience." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {deliveryMethods.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-center bg-white rounded-2xl p-6 border border-neutral-200">
                <div className="text-2xl mb-3">{d.icon}</div>
                <h3 className="font-heading font-bold text-brand-blue mb-2">{d.title}</h3>
                <p className="text-xs text-neutral-500">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div className="bg-brand-dark rounded-3xl p-12 text-white text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Need a Custom Training Program?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Every organization is unique. We design tailored learning experiences that address your specific gaps, goals, and industry context.</p>
            <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-brand-blue font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-all">Request a Custom Program <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Organizations We've Strengthened" subtitle="Trusted partners who have invested in their people." />
          <div className="flex flex-wrap justify-center gap-4">{clients.map((c) => <span key={c} className="bg-neutral-50 rounded-xl px-5 py-3 text-sm font-medium text-brand-blue">{c}</span>)}</div>
          <motion.div className="bg-neutral-100 rounded-3xl p-10 text-center mt-12 max-w-3xl mx-auto">
            <p className="italic text-neutral-600 mb-4">"The training delivered by GURGURE transformed how our team approaches project management. The combination of theory, practical exercises, and real examples from our context made all the difference."</p>
            <p className="font-semibold text-brand-blue">— Senior Manager, Estedaad</p>
          </motion.div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Related Services" subtitle="Explore more of our training and capacity building offerings." />
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
            <h2 className="text-3xl font-heading font-bold text-brand-blue mb-4">Ready to Invest in Your Team's Capabilities?</h2>
            <p className="text-neutral-500 mb-8 max-w-xl mx-auto">Let's discuss your training needs — from a single workshop to a comprehensive capacity-building program.</p>
            <Link to="/quote" className="btn-primary">Request a Training Consultation <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

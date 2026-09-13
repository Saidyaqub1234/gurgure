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
  { icon: '📚', title: 'Learning Management System (LMS)', desc: 'A complete platform for course delivery, assignment submission, grading, and student progress tracking.', features: ['Course creation & content management', 'Assignment submission & grading', 'Quiz & examination modules', 'Progress tracking & certificates', 'Discussion forums & messaging'] },
  { icon: '🎓', title: 'Student Portal & Information System', desc: 'Centralized platform for student records, enrollment, attendance, and academic history.', features: ['Student enrollment & registration', 'Attendance tracking', 'Gradebook & transcript management', 'Parent/guardian access portal', 'Fee management & payment tracking'] },
  { icon: '🏫', title: 'Academic MIS', desc: 'Enterprise-grade system for institutional administration, reporting, and compliance.', features: ['Staff & faculty management', 'Course & timetable scheduling', 'Department & program management', 'Accreditation reporting', 'Analytics & dashboards'] },
  { icon: '💻', title: 'Online Learning Platform', desc: 'Custom-built platform for remote learning, live classes, and hybrid education models.', features: ['Live video conferencing integration', 'Recorded lecture library', 'Interactive whiteboard & polls', 'Mobile-responsive design', 'Offline access capabilities'] },
  { icon: '📊', title: 'Education Analytics & Reporting', desc: 'Data-driven insights for administrators, faculty, and parents.', features: ['Student performance analytics', 'Attendance trends & patterns', 'Graduation & retention rates', 'Custom report builder', 'Export to Excel/PDF'] },
  { icon: '🌐', title: 'Institutional Website & Branding', desc: 'Professional, responsive websites that reflect your institution\'s identity.', features: ['Custom website design', 'Content management system', 'Admissions portal integration', 'News & events management', 'SEO & performance optimization'] },
];

const caseStudies = [
  { tag: 'Learning Management System', client: 'Moraa Educational Complex', desc: 'Complete rebranding, LMS implementation, and enrollment marketing campaign.', result: '+150% enrollment inquiries', tech: 'Custom LMS, WordPress, MySQL' },
  { tag: 'Online Learning Platform', client: 'Hadith Academy', desc: 'Custom LMS with course delivery, student progress tracking, and certification.', result: '1,000+ online students enrolled', tech: 'Laravel, MySQL, React.js' },
  { tag: 'Student Portal & MIS', client: '[Your University or School]', desc: 'Student information system with enrollment, attendance, gradebook, and parent portal.', result: '[Add your measurable result]', tech: '[Your tech stack]' },
];

const whyCards = [
  { icon: '🎯', title: 'Education-Focused Expertise', desc: 'Deep understanding of academic workflows, accreditation requirements, and student needs.' },
  { icon: '🔒', title: 'Data Privacy & Security', desc: 'GDPR-compliant platforms with role-based access and encrypted data storage.' },
  { icon: '📈', title: 'Scalable Solutions', desc: 'Platforms that grow with your institution from 100 to 10,000+ students.' },
  { icon: '🛠️', title: 'Ongoing Support & Training', desc: 'Dedicated support and faculty training to ensure successful adoption.' },
];

export default function Education() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { const f = async () => { try { const [s, rs] = await Promise.all([getSettings(), getServicesByCategory('education')]); setSettings(s); setRelatedServices(rs); } catch (e: any) { setError(e?.message || 'Failed'); } finally { setLoading(false); } }; f(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet><title>Education Services - {settings.site_name}</title><meta name="description" content="Digital transformation for education institutions: LMS, student portals, academic MIS, and online learning platforms." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Education Services</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-3xl mx-auto">Learning Management Systems · Student Portals · Academic MIS · Online Learning Platforms</motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 bg-neutral-50 rounded-2xl p-8">
            {[{ n: '5+', l: 'Education Clients' }, { n: '2,000+', l: 'Students Served' }, { n: '98%', l: 'Client Satisfaction' }, { n: '24/7', l: 'Platform Uptime' }].map((s) => (<div key={s.l} className="text-center"><div className="text-3xl font-heading font-bold text-brand-blue">{s.n}</div><div className="text-sm text-neutral-500">{s.l}</div></div>))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Education Technology Solutions" subtitle="Modern, scalable platforms designed for universities, schools, academies, and training centers." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-3">{s.title}</h3>
                <p className="text-sm text-neutral-500 mb-4">{s.desc}</p>
                <ul className="space-y-2">{s.features.map((f) => <li key={f} className="flex items-start gap-2 text-xs text-neutral-600 border-b border-neutral-100 pb-2"><FiCheck className="w-3 h-3 text-brand-cyan mt-0.5 flex-shrink-0" /> {f}</li>)}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-heading font-bold text-brand-blue mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <motion.div key={cs.client} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-md">
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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Why Education Institutions Trust GURGURE" subtitle="We understand the unique challenges and opportunities in education technology." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyCards.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="text-2xl mb-3">{w.icon}</div>
                <h3 className="font-heading font-bold text-brand-blue mb-2">{w.title}</h3>
                <p className="text-xs text-neutral-500">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="bg-neutral-50 rounded-3xl p-10">
            <h2 className="text-xl font-heading font-bold text-brand-blue mb-6">Our Education Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-neutral-600">
              <div><strong>📚 LMS:</strong> Custom-built / Moodle / TalentLMS</div>
              <div><strong>💾 Database:</strong> MySQL / PostgreSQL</div>
              <div><strong>⚙️ Backend:</strong> Laravel / Node.js / Python</div>
              <div><strong>🎨 Frontend:</strong> React.js / Vue.js</div>
              <div><strong>☁️ Hosting:</strong> AWS / Dedicated Servers</div>
              <div><strong>🔐 Security:</strong> SSL, RBAC, 2FA, Daily Backups</div>
            </div>
          </motion.div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Related Services" subtitle="Explore more of our education technology offerings." />
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
            <h2 className="text-2xl font-heading font-bold mb-4">Ready to Transform Your Institution?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Let's discuss how GURGURE can help you modernize learning, streamline administration, and improve student outcomes.</p>
            <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-brand-blue font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-all">Request an Education Consultation <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

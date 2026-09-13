import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiMapPin, FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiBriefcase, FiBookOpen, FiDollarSign, FiLink, FiUpload } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, submitContact } from '@/api';
import type { Settings } from '@/types';

const values = [
  { icon: '🔗', title: 'Integration', desc: 'We believe great work happens when strategy, brand, systems, and people work together seamlessly.' },
  { icon: '🎯', title: 'Excellence', desc: 'We never settle for "good enough." Every deliverable meets the highest standard of quality.' },
  { icon: '🤝', title: 'Partnership', desc: 'We succeed only when our clients and our team members thrive. We grow together.' },
  { icon: '📚', title: 'Continuous Learning', desc: 'We stay curious, share knowledge, and invest in each other\'s growth.' },
];

const positions = [
  { title: 'Senior Brand Strategist', location: 'Kabul, Afghanistan', posted: 'March 15, 2025', closing: 'April 15, 2025', desc: 'We\'re seeking an experienced brand strategist to lead client engagements, develop brand positioning, and guide creative teams.' },
  { title: 'Full-Stack Developer', location: 'Remote / Kabul', posted: 'March 10, 2025', closing: 'April 10, 2025', desc: 'Join our digital transformation team to build custom web applications, ERP systems, and digital platforms. Proficiency in Laravel, React, or Python required.' },
  { title: 'Graphic Designer', location: 'Kabul, Afghanistan', posted: 'March 5, 2025', closing: 'April 5, 2025', desc: 'We\'re looking for a creative graphic designer with strong skills in Adobe Creative Suite. You\'ll work on branding projects and digital content.' },
  { title: 'Training & Capacity Building Specialist', location: 'Kabul, Afghanistan', posted: 'March 1, 2025', closing: 'April 1, 2025', desc: 'Design and deliver professional training programs in leadership, digital skills, project management, and organizational development.' },
  { title: 'Business Development Associate', location: 'Kabul, Afghanistan', posted: 'February 25, 2025', closing: 'March 30, 2025', desc: 'Support our strategic advisory team with market research, proposal writing, client outreach, and partnership development.' },
];

const benefits = [
  { icon: '📈', title: 'Growth Opportunities', desc: 'Regular training, mentorship, and clear career pathways.' },
  { icon: '⚖️', title: 'Work-Life Balance', desc: 'Flexible hours and remote work options where possible.' },
  { icon: '💰', title: 'Competitive Compensation', desc: 'Fair salaries and performance-based incentives.' },
  { icon: '🌍', title: 'Impactful Work', desc: 'Help organizations across Afghanistan grow and succeed.' },
  { icon: '🏥', title: 'Health Benefits', desc: 'Medical insurance and wellness support.' },
  { icon: '🎓', title: 'Learning Budget', desc: 'Annual stipend for courses, books, and conferences.' },
];

export default function Careers() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState('');
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', position: '', experience: '', coverLetter: '', portfolio: '', heardFrom: '' });
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApply = (job: string) => {
    setSelectedJob(job);
    setForm({ ...form, position: job });
    document.getElementById('applicationForm')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact({
        name: form.fullname,
        email: form.email,
        phone: form.phone,
        message: `Position: ${form.position}\nExperience: ${form.experience}\nCover Letter: ${form.coverLetter}\nPortfolio: ${form.portfolio}`,
      });
      setSubmitted(true);
      setForm({ fullname: '', email: '', phone: '', position: '', experience: '', coverLetter: '', portfolio: '', heardFrom: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Error submitting application. Please email careers@gurgure.com');
    }
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Careers - {settings.site_name}</title>
        <meta name="description" content="Join the GURGURE team. We're looking for talented strategists, designers, developers, and trainers passionate about making brands visible." />
      </Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Join Our Team</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">We're looking for talented, passionate people who want to make brands visible and build lasting organizations.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="What We Stand For" subtitle="Our values shape everything we do — from how we work with clients to how we support each other." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-neutral-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-3">{v.title}</h3>
                <p className="text-sm text-neutral-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <SectionHeader title="Open Positions" subtitle="Join a growing team of strategists, designers, engineers, and trainers." />
            <div className="space-y-6">
              {positions.map((job, i) => (
                <motion.div key={job.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="border border-neutral-200 rounded-2xl p-6 hover:border-brand-cyan hover:shadow-md transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <h3 className="text-xl font-heading font-bold text-brand-blue">{job.title}</h3>
                    <span className="bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full">Full-time</span>
                  </div>
                  <div className="flex flex-wrap gap-5 text-sm text-neutral-500 mb-4">
                    <span className="flex items-center gap-1.5"><FiMapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><FiCalendar className="w-4 h-4" /> Posted: {job.posted}</span>
                    <span className="flex items-center gap-1.5"><FiClock className="w-4 h-4" /> Closing: {job.closing}</span>
                  </div>
                  <p className="text-neutral-600 mb-4">{job.desc}</p>
                  <button onClick={() => handleApply(job.title)} className="btn-primary text-sm">Apply Now <FiArrowRight className="w-4 h-4" /></button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Why Join GURGURE?" subtitle="We invest in our people and create an environment where you can do your best work." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} className="text-center p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="text-2xl mb-2">{b.icon}</div>
                <h3 className="text-sm font-heading font-bold text-brand-blue mb-1">{b.title}</h3>
                <p className="text-xs text-neutral-500">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50" id="applicationForm">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-2xl font-heading font-bold text-brand-blue mb-2">Apply to Join GURGURE</h2>
            <p className="text-neutral-500 mb-8">Fill out the form below. We'll review your application and get back to you within 5-7 business days.</p>

            {submitted && (
              <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-center mb-6">
                ✓ Thank you for your application! We'll review it carefully and contact you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-blue mb-2">Full Name *</label>
                  <input type="text" name="fullname" value={form.fullname} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-blue mb-2">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-blue mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-blue mb-2">Position Applying For *</label>
                  <select name="position" value={form.position} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none">
                    <option value="">Select a position</option>
                    {positions.map((p) => <option key={p.title} value={p.title}>{p.title}</option>)}
                    <option value="Other">Other / Speculative Application</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">Years of Experience</label>
                <select name="experience" value={form.experience} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none">
                  <option value="">Select</option>
                  <option value="0-1">0-1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">Cover Letter / Why GURGURE? *</label>
                <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} rows={4} required placeholder="Tell us about yourself and why you're a great fit..." className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">Portfolio / LinkedIn URL (optional)</label>
                <input type="url" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">How did you hear about us?</label>
                <select name="heardFrom" value={form.heardFrom} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none">
                  <option value="">Select</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Friend/Colleague">Friend or Colleague</option>
                  <option value="Website">Our Website</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">Submit Application <FiArrowRight className="w-5 h-5" /></button>
            </form>
            <p className="text-sm text-neutral-400 text-center mt-4">
              For general inquiries, <Link to="/contact" className="text-brand-cyan hover:underline">contact us</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

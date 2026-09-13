import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheck, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, submitContact } from '@/api';
import type { Settings } from '@/types';

const services = [
  'Business Development & Strategy', 'Branding & Creative Design', 'Digital Transformation & Systems (MIS/ERP)',
  'Website & Hosting', 'ICT Infrastructure', 'Digital Marketing & Communication',
  'Trainings & Capacity Building', 'Corporate Presentations', 'Multiple / Integrated package',
];

const budgets = ['Prefer not to say', 'Under $1,000 USD', '$1,000 – $5,000 USD', '$5,000 – $15,000 USD', '$15,000 – $50,000 USD', '$50,000+ USD'];
const timelines = ['Select', 'Immediate (within 1 month)', '1–3 months', '3–6 months', '6+ months / exploratory'];

export default function Quote() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ fullname: '', organization: '', email: '', phone: '', service: '', budget: '', timeline: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact({
        name: form.fullname,
        organization: form.organization,
        email: form.email,
        phone: form.phone,
        service_interest: form.service,
        message: `Organization: ${form.organization}\nService: ${form.service}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\n${form.message}`,
      });
      setSubmitted(true);
      setForm({ fullname: '', organization: '', email: '', phone: '', service: '', budget: '', timeline: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Error submitting. Please email info@gurgure.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Request a Quote - {settings.site_name}</title>
        <meta name="description" content="Tell us about your project. Get a tailored quote for strategy, branding, digital transformation, ICT, marketing, or training services." />
      </Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Request a Quote</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">Tell us about your project. We'll prepare a tailored proposal and estimate.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-neutral-50 rounded-3xl p-8 md:p-10 space-y-8">
              <div>
                <h2 className="text-xl font-heading font-bold text-brand-blue mb-3">How it works</h2>
                <p className="text-neutral-500 mb-6">Getting a quote from GURGURE is simple and free. No obligation — just a conversation about your goals.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><FiCheck className="w-5 h-5 text-brand-cyan mt-0.5" /><span><strong>Step 1:</strong> Fill out the form with your project details</span></li>
                  <li className="flex items-start gap-3"><FiCheck className="w-5 h-5 text-brand-cyan mt-0.5" /><span><strong>Step 2:</strong> We'll review and may schedule a brief discovery call</span></li>
                  <li className="flex items-start gap-3"><FiCheck className="w-5 h-5 text-brand-cyan mt-0.5" /><span><strong>Step 3:</strong> Within 3-5 business days, you'll receive a tailored quote</span></li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-brand-blue mb-3">What's included</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><FiCheck className="w-5 h-5 text-brand-cyan mt-0.5" /> Scope of work aligned with your needs</li>
                  <li className="flex items-start gap-3"><FiCheck className="w-5 h-5 text-brand-cyan mt-0.5" /> Timeline and milestones</li>
                  <li className="flex items-start gap-3"><FiCheck className="w-5 h-5 text-brand-cyan mt-0.5" /> Transparent pricing (fixed or phased)</li>
                  <li className="flex items-start gap-3"><FiCheck className="w-5 h-5 text-brand-cyan mt-0.5" /> No hidden fees</li>
                </ul>
              </div>
              <div className="bg-brand-blue/5 rounded-2xl p-5">
                <p className="font-semibold text-brand-blue flex items-center gap-2 mb-1"><FiPhone className="w-4 h-4" /> Prefer to talk first?</p>
                <p className="text-sm text-neutral-600">
                  Call: <a href="tel:+93700777480" className="text-brand-cyan">+93 700 777 480</a><br />
                  Email: <a href="mailto:info@gurgure.com" className="text-brand-cyan">info@gurgure.com</a>
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-neutral-100">
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-2">Project details</h2>
              <p className="text-neutral-500 mb-6 text-sm">Complete the form below and we'll get back to you with a customized quote.</p>

              {submitted && (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center mb-6">
                  ✓ Thank you! Your quote request has been received. We'll contact you within 2-3 business days.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-2">Full name *</label>
                    <input type="text" name="fullname" value={form.fullname} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-2">Organization *</label>
                    <input type="text" name="organization" value={form.organization} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-2">Email address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-2">Phone number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-blue mb-2">Primary service needed *</label>
                  <select name="service" value={form.service} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none">
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-blue mb-2">Estimated budget range</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none">
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-blue mb-2">Expected timeline</label>
                  <select name="timeline" value={form.timeline} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none">
                    {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-blue mb-2">Project description *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} required placeholder="Tell us about your organization, goals, specific challenges, and what you'd like GURGURE to help with..." className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none" />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Quote Request'} <FiArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiUsers, FiUserCheck, FiCheckCircle } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings } from '@/api';
import type { Settings } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

const pipeline = [
  { step: '01', title: 'Apply', desc: 'Entrepreneurs submit their business idea or plan.' },
  { step: '02', title: 'Screening', desc: 'Promising ideas are selected for the next stage.' },
  { step: '03', title: 'Training', desc: 'Participants receive business skills and preparation.' },
  { step: '04', title: 'Business Plan', desc: 'Selected ideas develop into structured business plans.' },
  { step: '05', title: 'Mentoring', desc: 'Experienced mentors support plan development.' },
  { step: '06', title: 'Pitch', desc: 'Entrepreneurs present to decision-makers and investors.' },
  { step: '07', title: 'Select', desc: 'Winners receive support, connections and follow-up.' },
];

const roles = [
  { icon: <FiCheckCircle className="w-6 h-6 text-white" />, title: 'Entrepreneurs', desc: 'Submit your idea, join the Business Plan Competition, receive training and mentoring, and connect with investors who are ready to support early-stage businesses.' },
  { icon: <FiUsers className="w-6 h-6 text-white" />, title: 'Mentors', desc: 'Register your expertise, help selected entrepreneurs develop their plans, and contribute to building the next generation of Afghan businesses.' },
  { icon: <FiUserCheck className="w-6 h-6 text-white" />, title: 'Investors', desc: 'Discover vetted business plans, attend pitch sessions, and find investment-ready entrepreneurs — all screened through the GURGURE pipeline.' },
];

export default function VenturesPage() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch((e: any) => setError(e?.message || 'Failed'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>GURGURE Ventures - {settings.site_name}</title>
        <meta name="description" content="Connecting entrepreneurs, mentors and investors through structured business plan competitions, training and introduction." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            GURGURE Ventures
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            Connecting entrepreneurs, mentors and investors — turning business ideas into real
            businesses through a structured pipeline of support.
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lg text-neutral-600 leading-relaxed">
            GURGURE Ventures is the entrepreneurship and investment arm of the GURGURE ecosystem. It connects
            aspiring entrepreneurs with experienced mentors and qualified investors through a clear,
            structured process.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="inline-block mt-6 px-4 py-2 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-semibold">
            Building — focused on introductions and facilitation
          </motion.div>
        </div>
      </section>

      {/* The Pipeline */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-blue mb-4">The Business Plan Pipeline</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">A structured process from idea to investment, designed to maximize the chances of success.</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical connector line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-cyan/20 -translate-x-px" />
            <div className="space-y-4">
              {pipeline.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-start md:items-center gap-4 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-white rounded-2xl p-5 border border-neutral-200 inline-block text-left ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <span className="text-xs font-bold text-brand-cyan">{s.step}</span>
                      <h3 className="text-base font-heading font-bold text-brand-blue">{s.title}</h3>
                      <p className="text-sm text-neutral-500 mt-1">{s.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0 hidden md:flex">{s.step}</div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who is involved */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-blue mb-4">Who Is This For?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {roles.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card bg-white flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4">{r.icon}</div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{r.title}</h3>
                <p className="text-sm text-neutral-500 flex-1 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value to ecosystem */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-blue mb-4">The GURGURE Connection</h2>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-neutral-200">
              <p className="text-neutral-600 leading-relaxed text-center mb-8">
                Successful ventures become future customers for GURGURE Services, Software, Marketplace and Print —
                creating a self-reinforcing ecosystem where entrepreneurship fuels growth across the platform.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Business Planning', 'Software & Systems', 'Branding & Design', 'Website Development', 'Hosting', 'Print & Merchandise'].map((s) => (
                  <span key={s} className="px-4 py-2 rounded-full bg-brand-blue/5 text-brand-blue text-sm font-medium border border-brand-blue/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Have a business idea or want to support entrepreneurs?
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg bg-white text-brand-blue hover:bg-white/90">
              Submit an Idea <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="btn-outline text-lg !text-white !border-white/40 hover:!bg-white/10">
              Become a Mentor or Investor
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
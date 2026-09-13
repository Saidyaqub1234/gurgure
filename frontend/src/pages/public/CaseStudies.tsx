import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheck, FiTag } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getCaseStudies } from '@/api';
import type { Settings, CaseStudy } from '@/types';

export default function CaseStudies() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [s, cs] = await Promise.all([getSettings(), getCaseStudies()]);
        setSettings(s);
        setCaseStudies(cs);
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
        <title>Case Studies - {settings.site_name}</title>
        <meta name="description" content={`Real results from real clients. See how ${settings.site_name} transforms strategies, brands, systems, and visibility.`} />
      </Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Case Studies</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">Real results from real clients. See how GURGURE transforms strategies, brands, systems, and visibility.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {caseStudies.length === 0 ? (
            <p className="text-center text-neutral-400">No case studies published yet.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {caseStudies.map((cs, i) => (
                <motion.div key={cs.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-neutral-100 hover:shadow-xl transition-all">
                  <div className="bg-neutral-50 p-8 border-b-4 border-brand-cyan">
                    <h2 className="text-2xl font-heading font-bold text-brand-blue mb-2">{cs.client}</h2>
                    {cs.tag && (
                      <span className="inline-flex items-center gap-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full"><FiTag className="w-3 h-3" /> {cs.tag}</span>
                    )}
                  </div>
                  <div className="p-8 space-y-5">
                    <div>
                      <h3 className="text-base font-bold text-brand-blue mb-2">📌 Challenge</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-brand-blue mb-2">🔧 Solution</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{cs.solution}</p>
                    </div>
                    {cs.results && cs.results.length > 0 && (
                      <div>
                        <h3 className="text-base font-bold text-brand-blue mb-2">📈 Results</h3>
                        <div className="bg-sky-50 rounded-xl p-4 mt-2">
                          {cs.results.map((r) => (
                            <p key={r} className="text-sm font-semibold text-brand-cyan flex items-start gap-2"><FiCheck className="w-4 h-4 mt-0.5 flex-shrink-0" /> {r}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    {cs.testimonial && (
                      <blockquote className="italic text-sm text-neutral-500 border-l-4 border-brand-cyan pl-4">"{cs.testimonial}"</blockquote>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-neutral-100 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-heading font-bold text-brand-blue mb-4">Ready to be our next success story?</h2>
            <p className="text-neutral-500 mb-8 max-w-xl mx-auto">Every organization is unique. Let's discuss how GURGURE can deliver measurable results for you.</p>
            <Link to="/quote" className="btn-primary">Request a Free Consultation <FiArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

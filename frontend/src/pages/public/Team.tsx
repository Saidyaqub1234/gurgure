import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiUsers, FiBook, FiTrendingUp, FiMail, FiPhone, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getTeamMembers } from '@/api';
import type { Settings, TeamMember } from '@/types';

const howWeWork = [
  {
    icon: <FiUsers className="w-7 h-7" />,
    title: 'Partnership',
    description: 'We succeed only when you do. Long-term relationships over short-term projects.',
  },
  {
    icon: <FiTrendingUp className="w-7 h-7" />,
    title: 'Execution',
    description: 'Strategy without action is fantasy. We deliver practical, implemented solutions.',
  },
  {
    icon: <FiBook className="w-7 h-7" />,
    title: 'Continuous Learning',
    description: 'We stay ahead of trends in strategy, tech, and design to serve you better.',
  },
  {
    icon: <FiUsers className="w-7 h-7" />,
    title: 'Local Context, Global Standards',
    description: 'We understand the Afghan market and apply international best practices.',
  },
];

export default function Team() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max).trimEnd() + '…' : text;

  const hasMoreInfo = (m: TeamMember) =>
    (m.bio?.length ?? 0) > 100 || !!m.email || !!m.phone;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, t] = await Promise.all([getSettings(), getTeamMembers()]);
      setSettings(s);
      setTeamMembers(t);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={fetchData} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Our Team - {settings.site_name}</title>
        <meta name="description" content={`The people behind the solutions - ${settings.site_name}`} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/70 max-w-3xl mx-auto"
          >
            The people behind the solutions — strategists, designers, engineers, and trainers committed to your success.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="card text-center group"
              >
                <div className="w-32 h-32 rounded-2xl mx-auto mb-6 overflow-hidden bg-gradient-brand/10 shadow-brand-sm">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-heading font-bold text-brand-blue/30">
                      {member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-1 group-hover:text-brand-blue-light transition-colors">{member.name}</h3>
                <p className="text-sm text-brand-green font-semibold mb-4">{member.position || ''}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {member.bio ? truncate(member.bio, 100) : ''}
                </p>
                {(member.email || member.phone) && (
                  <div className="mt-4 space-y-2 text-sm">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 text-brand-blue hover:text-brand-blue-light transition-colors"
                      >
                        <FiMail className="w-4 h-4 shrink-0" /> {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <p className="flex items-center justify-center gap-2 text-neutral-600">
                        <FiPhone className="w-4 h-4 shrink-0" /> {member.phone}
                      </p>
                    )}
                  </div>
                )}
                {hasMoreInfo(member) && (
                  <button
                    onClick={() => setSelected(member)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors"
                  >
                    View <FiArrowRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="How We Work"
            subtitle="Our core principles guide every engagement and ensure lasting impact."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {howWeWork.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="card p-6 text-center hover:shadow-brand-sm transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-4 text-brand-blue">
                  {item.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-6">
              <FiUsers className="w-8 h-8 text-brand-blue" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-blue mb-4">
              Join Our Team
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              We're always looking for talented strategists, designers, developers, and trainers. If you're passionate about making brands visible, let's talk.
            </p>
            <Link
              to="/career"
              className="inline-flex items-center gap-2 px-8 py-4 btn-primary font-semibold rounded-xl text-white"
            >
              Send your resume
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-brand/10 shrink-0">
                  {selected.photo ? (
                    <img src={selected.photo} alt={selected.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-heading font-bold text-brand-blue/30">
                      {selected.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-brand-blue">{selected.name}</h3>
                  <p className="text-sm text-brand-green font-semibold mt-1">{selected.position || ''}</p>
                </div>
              </div>
              {selected.bio && (
                <div className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line mb-6">
                  {selected.bio}
                </div>
              )}
              {(selected.email || selected.phone) && (
                <div className="border-t border-neutral-100 pt-5 space-y-3">
                  {selected.email && (
                    <a
                      href={`mailto:${selected.email}`}
                      className="flex items-center gap-3 text-sm text-brand-blue hover:text-brand-blue-light transition-colors"
                    >
                      <FiMail className="w-4 h-4 shrink-0" /> {selected.email}
                    </a>
                  )}
                  {selected.phone && (
                    <p className="flex items-center gap-3 text-sm text-neutral-600">
                      <FiPhone className="w-4 h-4 shrink-0" /> {selected.phone}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}

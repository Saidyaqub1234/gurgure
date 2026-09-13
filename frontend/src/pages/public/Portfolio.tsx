import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiX, FiExternalLink, FiBriefcase, FiTrendingUp, FiAward } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { getSettings, getProjects, getClients, getCaseStudies } from '@/api';
import type { Settings, Project, Client, CaseStudy } from '@/types';

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
      >
        <div className="relative">
          <div className="aspect-[16/9] bg-gradient-brand/10 flex items-center justify-center">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-6xl opacity-20">📁</div>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-blue/5 text-brand-blue text-xs font-medium rounded-full">{project.sector}</span>
            <span className="px-3 py-1 bg-brand-green/5 text-brand-green text-xs font-medium rounded-full">{project.service}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-blue mb-2">{project.title}</h2>
          <p className="text-neutral-500 mb-6">Client: {project.client}</p>

          {project.challenge && (
            <div className="mb-6">
              <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">The Challenge</h3>
              <p className="text-neutral-600 leading-relaxed text-justify">{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div className="mb-6">
              <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">Our Solution</h3>
              <p className="text-neutral-600 leading-relaxed text-justify">{project.solution}</p>
            </div>
          )}
          {project.outcome && (
            <div>
              <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">The Outcome</h3>
              <p className="text-neutral-600 leading-relaxed text-justify">{project.outcome}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ClientModal({ client, onClose }: { client: Client; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors">
          <FiX className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-2xl mx-auto mb-4 bg-neutral-100 flex items-center justify-center overflow-hidden">
            {client.logo ? (
              <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-3" />
            ) : (
              <span className="text-3xl font-heading font-bold text-neutral-300">{client.name.charAt(0)}</span>
            )}
          </div>
          <h2 className="text-2xl font-heading font-bold text-brand-blue">{client.name}</h2>
          {client.sector && (
            <span className="inline-block mt-2 px-3 py-1 bg-brand-blue/5 text-brand-blue text-xs font-medium rounded-full">{client.sector}</span>
          )}
        </div>

        {client.description && (
          <p className="text-neutral-600 leading-relaxed mb-6">{client.description}</p>
        )}

        {client.website && (
          <a
            href={client.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-sm"
          >
            Visit Website <FiExternalLink className="w-4 h-4" />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

const featuredProjects = [
  {
    title: 'Corporate Branding System',
    sector: 'Cross-sector',
    service: 'Creative Design & Media Solutions',
    client: 'Various Clients',
    icon: '🎨',
  },
  {
    title: 'Custom LMS for Educational Institution',
    sector: 'Education',
    service: 'Digital Systems & Software Development',
    client: 'Educational Institution',
    icon: '💻',
  },
  {
    title: 'Investor Pitch Deck',
    sector: 'Entrepreneurship',
    service: 'Corporate Communication & Presentation Design',
    client: 'Startup Client',
    icon: '📊',
  },
  {
    title: 'Enterprise Network Infrastructure',
    sector: 'Enterprise',
    service: 'ICT Infrastructure & Consulting',
    client: 'Corporate Client',
    icon: '🌐',
  },
  {
    title: '360° Virtual Tour & Product Photography',
    sector: 'Real Estate / Retail',
    service: 'Creative Design & Media Solutions',
    client: 'Real Estate & Retail Clients',
    icon: '📸',
  },
];

const caseStudyIcons = [FiBriefcase, FiTrendingUp, FiAward, FiBriefcase, FiTrendingUp, FiAward, FiBriefcase, FiTrendingUp];

const clientLogos = [
  'Estedaad', 'Qasemi Group', 'Sarvari Group', 'Amini Roshandel Group',
  'MIDS', 'Rokham Services', 'Moraa Educational Complex', 'Hadith Academy',
  'Shinwari Aluminum Factory', 'Danish Press', 'Pajhwok', 'Wali Printing Press',
];

export default function Portfolio() {
  const [currentImage, setCurrentImage] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroImages = settings?.hero_images?.length ? settings.hero_images : [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
  ];

  useEffect(() => {
    if (!heroImages.length) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, pj, cl, cs] = await Promise.all([getSettings(), getProjects(), getClients(), getCaseStudies()]);
      setSettings(s);
      setProjects(pj);
      setClients(cl);
      setCaseStudies(cs);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={fetchData} /></PublicLayout>;

  const published = projects.filter(p => p.is_published);
  const publishedClients = clients.filter(c => c.is_published);
  const sectors = ['All', ...new Set(published.map(p => p.sector).filter(Boolean))];
  const filtered = filter === 'All' ? published : published.filter(p => p.sector === filter);

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Portfolio & Case Studies - {settings.site_name}</title>
        <meta name="description" content={`Portfolio and case studies - ${settings.site_name}`} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImages.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImage === i ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Portfolio & Case Studies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            Real results from real clients. See how GURGURE transforms strategies, brands, systems, and visibility.
          </motion.p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentImage ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Featured Projects" subtitle="Showcasing our multidisciplinary capabilities." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card cursor-pointer overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="aspect-[16/10] -mx-8 -mt-8 mb-6 bg-gradient-brand/10 flex items-center justify-center overflow-hidden relative">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{project.icon}</div>
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-semibold flex items-center gap-2">
                      <FiExternalLink className="w-5 h-5" /> View Details
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1.5 bg-brand-blue/5 text-brand-blue text-xs font-medium rounded-full">{project.sector}</span>
                  <span className="px-3 py-1.5 bg-brand-green/5 text-brand-green text-xs font-medium rounded-full">{project.service}</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{project.title}</h3>
                <p className="text-sm text-neutral-500">{project.client}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Projects from CMS */}
      {published.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Project Archive" subtitle="Browse our complete project portfolio." />
            {sectors.length > 1 && (
              <div className="flex flex-wrap gap-2 justify-center mb-12">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setFilter(sector || 'All')}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      filter === sector
                        ? 'bg-brand-blue text-white shadow-md'
                        : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            )}
            {filtered.length === 0 ? (
              <EmptyState title="No projects found" message="No projects match the selected filter." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    onClick={() => setSelectedProject(project)}
                    className="card cursor-pointer overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="aspect-[16/10] -mx-8 -mt-8 mb-6 bg-gradient-brand/10 flex items-center justify-center overflow-hidden relative">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="text-5xl opacity-20">📁</div>
                      )}
                      <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-colors duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-semibold flex items-center gap-2">
                          <FiExternalLink className="w-5 h-5" /> View Details
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1.5 bg-brand-blue/5 text-brand-blue text-xs font-medium rounded-full">{project.sector}</span>
                      <span className="px-3 py-1.5 bg-brand-green/5 text-brand-green text-xs font-medium rounded-full">{project.service}</span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{project.title}</h3>
                    <p className="text-sm text-neutral-500">{project.client}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Case Studies" subtitle="Measurable impact across sectors." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study, i) => {
                const IconComp = caseStudyIcons[i % caseStudyIcons.length];
                const resultText = study.results?.[0] || study.challenge.slice(0, 60) + '...';
                return (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="card group hover:-translate-y-1 transition-transform duration-300 border-l-4 border-l-brand-green"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <IconComp className="w-7 h-7 text-brand-green" />
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-brand-blue/5 text-brand-blue text-xs font-medium rounded-full mb-3">{study.tag || 'Cross-sector'}</span>
                        <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">Challenge: {study.challenge}</h3>
                        {resultText && (
                          <p className="text-brand-green font-semibold flex items-center gap-2">
                            <FiTrendingUp className="w-4 h-4" />
                            Result: {resultText}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Our Clients */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our Clients" subtitle="Trusted by leading organizations across Afghanistan and beyond." />
          {publishedClients.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {publishedClients.map((client, i) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  onClick={() => setSelectedClient(client)}
                  className="card flex flex-col items-center justify-center text-center cursor-pointer group min-h-[160px] hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-20 h-20 rounded-2xl mb-4 bg-neutral-50 flex items-center justify-center overflow-hidden group-hover:bg-brand-blue/5 transition-colors">
                    {client.logo ? (
                      <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-2 transition-transform group-hover:scale-110" />
                    ) : (
                      <span className="text-2xl font-heading font-bold text-neutral-300 group-hover:text-brand-blue transition-colors">{client.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-heading font-bold text-brand-blue group-hover:text-brand-blue-light transition-colors">{client.name}</h3>
                  {client.sector && (
                    <span className="text-xs text-neutral-400 mt-1">{client.sector}</span>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clientLogos.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  className="card flex flex-col items-center justify-center text-center min-h-[160px] group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-20 h-20 rounded-2xl mb-4 bg-neutral-100 flex items-center justify-center group-hover:bg-brand-blue/5 transition-colors">
                    <span className="text-2xl font-heading font-bold text-neutral-300 group-hover:text-brand-blue transition-colors">{name.charAt(0)}</span>
                  </div>
                  <h3 className="text-sm font-heading font-bold text-brand-blue">{name}</h3>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-6"
          >
            Ready to be our next success story?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 mb-10"
          >
            Every organization is unique. Let's discuss how GURGURE can deliver measurable results for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact" className="btn-primary text-lg">
              Request a Free Consultation <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedClient && (
          <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheck, FiSend, FiMail, FiMapPin, FiStar, FiChevronLeft, FiChevronRight, FiX, FiLink, FiTarget, FiTool } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { getSettings, getServices, getProjects, getTestimonials, getClients, subscribeNewsletter } from '@/api';
import type { Settings, Service, Project, Testimonial, Client } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
}

function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  if (testimonials.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const item = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="card text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-brand mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
            {item.avatar ? (
              <img src={item.avatar} alt={item.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              item.name.charAt(0)
            )}
          </div>
          <FiStar className="w-5 h-5 text-yellow-400 mx-auto mb-4" />
          <div className="flex gap-1 justify-center mb-4">
            {Array.from({ length: item.rating }).map((_, i) => (
              <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-neutral-600 text-lg italic leading-relaxed mb-6">&ldquo;{t(item.content)}&rdquo;</p>
          <div>
            <p className="font-heading font-bold text-brand-blue">{t(item.name)}</p>
            <p className="text-sm text-neutral-500">{[item.position, item.company].filter(Boolean).map((v) => t(v as string)).join(', ')}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button onClick={prev} className="w-12 h-12 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all">
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="w-12 h-12 rounded-xl border border-neutral-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all">
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-brand-blue w-8' : 'bg-neutral-300'}`} />
        ))}
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await subscribeNewsletter(email);
      setStatus('success');
      setMessage(t('Thank you for subscribing!'));
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(t('Something went wrong. Please try again.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Enter your email')}
            required
            className="input-field !pl-12"
          />
        </div>
        <button type="submit" disabled={status === 'loading'} className="btn-primary whitespace-nowrap">
          {status === 'loading' ? t('Subscribing...') : t('Subscribe')}
          <FiSend className="w-4 h-4" />
        </button>
      </div>
      {message && (
        <p className={`mt-3 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
      )}
    </form>
  );
}

function HeroSection({ settings }: { settings: Settings }) {
  const heroImages = settings.hero_images?.length ? settings.hero_images : [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {heroImages.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === currentImage ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white font-semibold text-sm md:text-base uppercase tracking-widest mb-6"
          >
            {t('Making Visible Brands')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-8"
          >
            {t('Integrated Strategy. Creative Vision. Digital Reality.')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            {t('Kabul-based multidisciplinary consultancy delivering end-to-end solutions in management consulting, creative design, and ICT engineering.')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/services" className="btn-primary text-lg">
              {t('Explore Services')}
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="btn-outline text-lg !border-white !text-white hover:!bg-white hover:!text-gray-900">
              {t('Contact Us')}
            </Link>
          </motion.div>
        </motion.div>
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
  );
}

function StatsSection({ settings }: { settings: Settings }) {
  const { t } = useLanguage();
  const stats = settings.home_stats?.length ? settings.home_stats : [
    { label: 'Projects Completed', end: 150, suffix: '+' },
    { label: 'Clients Served', end: 80, suffix: '+' },
    { label: 'Years Experience', end: 10, suffix: '+' },
    { label: 'Team Members', end: 25, suffix: '+' },
  ];

  return (
    <section className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-white/60 text-sm md:text-base">{t(stat.label)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const problemSolutionData = [
  { problem: 'No clear strategy or direction', solution: 'Practical, measurable business & strategic plans' },
  { problem: 'Invisible or inconsistent branding', solution: 'Full identity, design & creative campaigns' },
  { problem: 'Manual, outdated systems', solution: 'Custom MIS, ERP, finance & automation' },
  { problem: 'Slow, insecure websites', solution: 'High-performance hosting & web development' },
  { problem: 'Weak ICT infrastructure', solution: 'Networks, servers, system architecture' },
  { problem: 'Poor market visibility', solution: 'Digital marketing, social media & messaging' },
  { problem: 'Underskilled teams', solution: 'Targeted training & capacity building' },
  { problem: 'Weak investor pitches', solution: 'High-impact decks & corporate presentations' },
];

function ProblemSolutionSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t('Problem → Solution')} subtitle={t('We turn your biggest challenges into competitive advantages.')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {problemSolutionData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-brand-sm hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <FiX className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-neutral-600 text-sm">{t(item.problem)}</p>
                </div>
                <div className="hidden sm:flex w-8 h-8 rounded-full bg-brand-blue/10 items-center justify-center shrink-0">
                  <FiArrowRight className="w-4 h-4 text-brand-blue" />
                </div>
                <div className="flex items-start gap-3 flex-1 sm:border-l sm:border-neutral-200 sm:pl-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <FiCheck className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-brand-blue font-medium text-sm">{t(item.solution)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const integratedPractices = [
  { title: 'Business Development', description: 'Strategic planning, feasibility studies, institutional roadmaps', icon: '📊' },
  { title: 'Branding & Design', description: 'Logos, identity, print, digital — brands that stand out', icon: '🎨' },
  { title: 'Digital Transformation', description: 'MIS, ERP, HR & finance systems built for scale', icon: '💻' },
  { title: 'Website & Hosting', description: 'Fast, secure websites + reliable hosting & maintenance', icon: '🌐' },
  { title: 'ICT Infrastructure', description: 'Networks, servers, VPS, and technical architecture', icon: '🔧' },
  { title: 'Digital Marketing', description: 'Strategic communication, social media & campaign management', icon: '📱' },
  { title: 'Trainings & Capacity', description: 'Leadership, digital skills, and institutional seminars', icon: '🎓' },
  { title: 'Corporate Presentations', description: 'Pitch decks, investor decks, company profiles that convert', icon: '📑' },
];

function ServicesSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t('Eight Integrated Practices')} subtitle={t('Comprehensive solutions tailored to your business needs.')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {integratedPractices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card group cursor-default"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{t(service.title)}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{t(service.description)}</p>
              <Link to="/services" className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm mt-4 group/link">
                {t('Learn More')} <FiArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationSection() {
  const { t } = useLanguage();
  const benefits = [
    { icon: <FiLink className="w-6 h-6" />, title: 'One relationship', description: 'No juggling multiple vendors' },
    { icon: <FiTarget className="w-6 h-6" />, title: 'Tailored solutions', description: 'Every engagement fits your sector' },
    { icon: <FiTool className="w-6 h-6" />, title: 'Sustainable outcomes', description: 'We build foundations that lasting organizations stand on' },
  ];

  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{t('One Partner. Total Integration.')}</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{t('Everything your organization needs, under one roof.')}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center text-white mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">{t(benefit.title)}</h3>
              <p className="text-white/60">{t(benefit.description)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const caseStudies = [
  { sector: 'NGO', title: 'Digital transformation from fragmented systems to full ERP', result: '40% faster donor reporting' },
  { sector: 'Retail', title: 'Rebrand + web overhaul', result: '3x website traffic + 150% engagement' },
  { sector: 'Startup', title: 'Strategic plan + pitch deck', result: 'Secured $200k seed funding' },
  { sector: 'Enterprise', title: 'ICT infrastructure & ERP', result: '40% reduction in inventory discrepancies' },
];

function CaseStudiesSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t('Case Studies')} subtitle={t('Real results from real partnerships.')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-brand-sm hover:shadow-card-hover transition-all duration-500 p-8"
            >
              <div className="flex flex-col h-full">
                <span className="px-3 py-1 bg-brand-blue/5 text-brand-blue text-xs font-medium rounded-full w-fit mb-4">{t(study.sector)}</span>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-3">{t(study.title)}</h3>
                <div className="mt-auto pt-4 border-t border-neutral-100">
                  <p className="text-brand-green font-semibold text-sm flex items-center gap-2">
                    <FiCheck className="w-4 h-4" />
                    {t(study.result)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/portfolio" className="btn-secondary">
            {t('View All Case Studies')} <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const whoWeServe = [
  'Startups & Entrepreneurs',
  'SMEs & Corporates',
  'Nonprofits & NGOs',
  'Educational Institutions',
  'Donor-funded Projects',
  'Government Entities',
];

function WhoWeServeSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t('Who We Serve')} subtitle={t('Partnering with organizations across every sector.')} />
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {whoWeServe.map((sector, i) => (
            <motion.div
              key={sector}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="px-6 py-3 bg-neutral-50 rounded-full text-neutral-700 font-medium hover:bg-brand-blue hover:text-white transition-all duration-300 cursor-default"
            >
              {t(sector)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const { t } = useLanguage();
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-br from-brand-blue/5 via-white to-brand-green/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t('What Our Clients Say')} subtitle={t('Trusted by leading organizations across Afghanistan.')} />
        <TestimonialCarousel testimonials={testimonials.filter(t => t.is_published)} />
      </div>
    </section>
  );
}

function CTASection({ settings }: { settings: Settings }) {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-brand" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 border border-white rounded-full" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-heading font-bold text-white mb-6 leading-tight"
        >
          {t('“We don’t just deliver services. We build the foundations that lasting organizations stand on.”')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/80 mb-10"
        >
          {t('— GURGURE Company')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/quote" className="btn-primary text-lg">
            {t('Get a Free Quote')} <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title={t('Stay Updated')}
            subtitle={t('Subscribe to our newsletter for the latest insights and updates.')}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <NewsletterForm />
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, sv, pj, tm, cl] = await Promise.all([
        getSettings(),
        getServices(),
        getProjects(),
        getTestimonials(),
        getClients(),
      ]);
      setSettings(s);
      setServices(sv);
      setProjects(pj);
      setTestimonials(tm);
      setClients(cl);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={fetchData} /></PublicLayout>;

  const defaultTestimonial: Testimonial = {
    id: 1,
    name: 'Client A',
    content: 'Excellent service and great results.',
    position: 'CEO',
    company: 'Company A',
    rating: 5,
    is_published: true,
    avatar: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const displayTestimonials = testimonials.filter(t => t.is_published).length > 0
    ? testimonials.filter(t => t.is_published)
    : [defaultTestimonial];

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>{settings.site_name} - {settings.site_tagline}</title>
        <meta name="description" content={settings.site_description} />
      </Helmet>

      <HeroSection settings={settings} />
      <StatsSection settings={settings} />
      <ProblemSolutionSection />
      <ServicesSection />
      <IntegrationSection />
      <CaseStudiesSection />
      <WhoWeServeSection />
      <TestimonialsSection testimonials={displayTestimonials} />
      <CTASection settings={settings} />
      <NewsletterSection />
    </PublicLayout>
  );
}

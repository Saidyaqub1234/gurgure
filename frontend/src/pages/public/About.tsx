import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiTarget, FiLink, FiCheckCircle, FiUsers, FiAward, FiLayers } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { SectionHeader } from '@/components/SectionHeader';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getPage } from '@/api';
import type { Settings } from '@/types';

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, end]);

  return <div ref={setRef}>{count}{suffix}</div>;
}

const coreValues = [
  {
    icon: FiLink,
    title: 'Integration',
    description: 'We connect every dimension of growth — strategy, brand, systems, communication, and people — into one seamless engine.',
    color: 'bg-brand-blue/10',
    iconColor: 'text-brand-blue',
  },
  {
    icon: FiTarget,
    title: 'Practicality',
    description: 'No theory without application. Every solution is grounded in real-world applicability and measurable outcomes.',
    color: 'bg-brand-green/10',
    iconColor: 'text-brand-green',
  },
  {
    icon: FiUsers,
    title: 'Partnership',
    description: 'One trusted relationship, not multiple vendors. We succeed only when our clients thrive.',
    color: 'bg-brand-purple/10',
    iconColor: 'text-brand-purple',
  },
  {
    icon: FiAward,
    title: 'Sustainability',
    description: "We don't deliver quick fixes. We build foundations that lasting organizations stand on.",
    color: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
  },
];

const whyChoose = [
  {
    icon: FiLayers,
    title: 'One Relationship, Total Integration',
    description: 'No juggling multiple vendors. We deliver strategy, branding, technology, marketing, and training under one roof.',
  },
  {
    icon: FiTarget,
    title: 'Tailored for Your Context',
    description: 'Every engagement is designed specifically for your sector, size, and ambitions — whether you\'re a startup, NGO, or enterprise.',
  },
  {
    icon: FiUsers,
    title: 'Cross-Sector Expertise',
    description: 'We\'ve worked with businesses, nonprofits, educational institutions, and donor-funded projects across Afghanistan and beyond.',
  },
  {
    icon: FiCheckCircle,
    title: 'Measurable, Sustainable Outcomes',
    description: "We don't just deliver services. We build foundations that keep delivering long after the engagement ends.",
  },
];

const integrationSteps = ['Strategy', 'Brand', 'Systems', 'Communication', 'People', 'Results'];

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [page, setPage] = useState<any | null>(null);
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
      const [s, p] = await Promise.all([getSettings(), getPage('about').catch(() => null)]);
      setSettings(s);
      setPage(p);
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
        <title>About {settings.site_name} - {settings.site_tagline}</title>
        <meta name="description" content={settings.site_description} />
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
            About GURGURE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            We don't just deliver services. We build the foundations that lasting organizations stand on.
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

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader title="Our Story" align="left" subtitle="" />
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>GURGURE Company was founded with a single conviction: organizations need more than isolated services. They need integrated solutions that connect strategy, branding, technology, communication, and organizational growth.</p>
                <p>Today, we are a multidisciplinary consultancy and digital solutions firm dedicated to helping businesses, institutions, NGOs, educational organizations, and entrepreneurs turn ideas into structured systems, visible brands, and sustainable growth models.</p>
                <p>We work at the intersection of Business Development, Strategic Management, Creative Design, Digital Transformation, and Capacity Building — providing modern, tailored solutions for today's competitive, technology-driven environment.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl bg-gradient-brand/10 flex items-center justify-center">
                <div className="text-8xl opacity-20">🏢</div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-brand rounded-3xl opacity-10 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our Mission" subtitle="What drives us every day." />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card group max-w-3xl mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <FiTarget className="w-10 h-10 text-brand-green" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-brand-blue mb-4">Making Visible Brands</h3>
            <p className="text-neutral-600 leading-relaxed text-lg">To empower organizations with integrated strategies, powerful brands, smart systems, and capable teams — so they can grow with clarity and confidence.</p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Core Values" subtitle="The principles that guide everything we do." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                </div>
                <h3 className="text-xl font-heading font-bold text-brand-blue mb-3">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Framework */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeader title="Integration Framework" subtitle="How we connect every piece of your organization." />
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {integrationSteps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-center"
              >
                <div className="px-6 py-3 bg-white/10 backdrop-blur rounded-xl text-white font-semibold">
                  {step}
                </div>
                {i < integrationSteps.length - 1 && (
                  <div className="mx-2 text-white/40 text-2xl">→</div>
                )}
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-white/70 max-w-3xl mx-auto leading-relaxed text-lg italic"
          >
            "When your strategy informs your brand, your brand informs your communication, your communication is supported by smart systems, and your systems are operated by capable people — the entire organization moves as one aligned, powerful engine of growth."
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-brand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(settings.home_stats?.length ? settings.home_stats : [
              { label: 'Projects Completed', end: 150, suffix: '+' },
              { label: 'Clients Served', end: 80, suffix: '+' },
              { label: 'Years Experience', end: 10, suffix: '+' },
              { label: 'Team Members', end: 25, suffix: '+' },
            ]).map((stat, i) => (
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
                <p className="text-white/60 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose GURGURE */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Why Choose GURGURE" subtitle="What sets us apart from the rest." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{item.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {page?.content && (
        <section className="py-20 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-6">
            <SectionHeader title="About Us" subtitle="" />
            <div
              className="prose prose-neutral max-w-none [&_h1]:text-brand-blue [&_h2]:text-brand-blue [&_h3]:text-brand-blue"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </section>
      )}

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
            Ready to build something remarkable?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 mb-10"
          >
            Wherever you are in your growth journey — let's start the conversation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/contact" className="btn-primary text-lg">
              Get a Free Quote <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

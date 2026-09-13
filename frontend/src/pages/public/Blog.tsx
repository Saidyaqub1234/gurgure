import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiSearch, FiClock, FiUser } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { getSettings, getBlogs } from '@/api';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Settings, Blog } from '@/types';

export default function Blog() {
  const { lang, t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');
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
      const [s, b] = await Promise.all([getSettings(), getBlogs()]);
      setSettings(s);
      setBlogs(b);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [lang]);

  const dateLocale = lang === 'fa' ? 'fa-AF' : lang === 'ps' ? 'ps-AF' : 'en-US';
  const fmtDate = (d: string) => new Date(d).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={fetchData} /></PublicLayout>;

  const published = blogs.filter(b => b.is_published);
  const filtered = search
    ? published.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        (b.excerpt || '').toLowerCase().includes(search.toLowerCase()) ||
        (b.author || '').toLowerCase().includes(search.toLowerCase())
      )
    : published;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>{t('Blog')} - {settings.site_name}</title>
        <meta name="description" content={`${t('Insights & Articles')} ${settings.site_name}`} />
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
            {settings.page_hero_data?.blog?.title || t('Insights & Articles')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/80 max-w-3xl mx-auto mb-10"
          >
            {settings.page_hero_data?.blog?.subtitle || t('Thoughts, insights, and stories from our team.')}
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-lg mx-auto relative"
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('Search articles...')}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
            />
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

      {/* Blog Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <EmptyState
              title={search ? t('No articles found') : t('No articles yet')}
              message={search ? t('Try a different search term.') : t('Blog posts will appear here once published.')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link to={`/blog/${blog.slug}`} className="card block group h-full">
                    <div className="aspect-[16/9] -mx-8 -mt-8 mb-6 rounded-t-2xl overflow-hidden bg-gradient-brand/10 flex items-center justify-center">
                      {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="text-5xl opacity-30">📝</div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <FiUser className="w-3.5 h-3.5" />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiClock className="w-3.5 h-3.5" />
                        {fmtDate(blog.created_at)}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-brand-blue mb-3 group-hover:text-brand-blue-light transition-colors">{blog.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">{blog.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-brand-blue font-semibold text-sm group/link">
                      {t('Read More')} <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

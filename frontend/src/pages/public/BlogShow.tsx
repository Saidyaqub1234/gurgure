import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiArrowRight, FiClock, FiUser, FiShare2, FiLinkedin, FiFacebook, FiTwitter, FiLink } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getBlog, getBlogs } from '@/api';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Settings, Blog } from '@/types';

function ShareButtons({ url, title }: { url: string; title: string }) {
  const { t } = useLanguage();
  const shareLinks = [
    { icon: FiLinkedin, href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, label: 'LinkedIn' },
    { icon: FiFacebook, href: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, label: 'Facebook' },
    { icon: FiTwitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, label: 'Twitter' },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-neutral-400 flex items-center gap-1.5 mr-2">
        <FiShare2 className="w-4 h-4" /> {t('Share')}
      </span>
      {shareLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"
          title={s.label}
        >
          <s.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"
        title={t('Copy link')}
      >
        <FiLink className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function BlogShow() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const [s, b, allBlogs] = await Promise.all([getSettings(), getBlog(slug), getBlogs()]);
      setSettings(s);
      setBlog(b);
      setRelated(allBlogs.filter(ob => ob.id !== b.id && ob.is_published).slice(0, 3));
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [slug, lang]);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const dateLocale = lang === 'fa' ? 'fa-AF' : lang === 'ps' ? 'ps-AF' : 'en-US';
  const fmtDate = (d: string) => new Date(d).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings || !blog) return <PublicLayout><ErrorState message={error || 'Article not found'} onRetry={fetchData} /></PublicLayout>;

  const articleUrl = window.location.href;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>{blog.title} - {settings.site_name}</title>
        <meta name="description" content={blog.excerpt ?? undefined} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt ?? undefined} />
        {blog.image && <meta property="og:image" content={blog.image} />}
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8">
              <FiArrowLeft className="w-4 h-4" /> {t('Back to Insights')}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-2">
                <FiUser className="w-4 h-4" /> {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <FiClock className="w-4 h-4" /> {fmtDate(blog.created_at)}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {blog.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[2/1] rounded-2xl overflow-hidden mb-12 bg-gradient-brand/10"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none prose-headings:text-brand-blue prose-a:text-brand-blue prose-strong:text-brand-blue"
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />

          {/* Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-neutral-200"
          >
            <ShareButtons url={articleUrl} title={blog.title} />
          </motion.div>

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-neutral-50 flex items-start gap-5"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-xl shrink-0">
              {(blog.author || 'A').charAt(0)}
            </div>
            <div>
              <h4 className="font-heading font-bold text-brand-blue mb-1">{blog.author}</h4>
              <p className="text-sm text-neutral-500">{t('Author at')} {settings.site_name}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-heading font-bold text-brand-blue">{t('Related Articles')}</h2>
              <Link to="/blog" className="text-brand-blue font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                {t('View All')} <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rb, i) => (
                <motion.div
                  key={rb.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link to={`/blog/${rb.slug}`} className="card block group h-full">
                    <div className="aspect-[16/9] -mx-8 -mt-8 mb-6 rounded-t-2xl overflow-hidden bg-gradient-brand/10 flex items-center justify-center">
                      {rb.image ? (
                        <img src={rb.image} alt={rb.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="text-5xl opacity-30">📝</div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                      <span className="flex items-center gap-1.5"><FiUser className="w-3.5 h-3.5" />{rb.author}</span>
                      <span className="flex items-center gap-1.5"><FiClock className="w-3.5 h-3.5" />{fmtDate(rb.created_at)}</span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-brand-blue mb-3 group-hover:text-brand-blue-light transition-colors">{rb.title}</h3>
                    <p className="text-sm text-neutral-500 line-clamp-2">{rb.excerpt}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiCheck } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, submitContact, getServices } from '@/api';
import type { Settings, Service } from '@/types';

export default function Contact() {
  const [currentImage, setCurrentImage] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
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

  const [form, setForm] = useState({ name: '', organization: '', email: '', phone: '', service_interest: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, sv] = await Promise.all([getSettings(), getServices()]);
      setSettings(s);
      setServices(sv);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    try {
      await submitContact(form);
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent. We will get back to you shortly.');
      setForm({ name: '', organization: '', email: '', phone: '', service_interest: '', message: '' });
    } catch (err: any) {
      setSubmitStatus('error');
      setSubmitMessage(err?.response?.data?.message || err?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={fetchData} /></PublicLayout>;

  const socialLinks = [
    { url: settings.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
    { url: settings.facebook, icon: FiFacebook, label: 'Facebook' },
    { url: settings.instagram, icon: FiInstagram, label: 'Instagram' },
    { url: settings.twitter, icon: FiTwitter, label: 'Twitter' },
    { url: settings.youtube, icon: FiYoutube, label: 'YouTube' },
  ].filter(s => s.url);

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Contact Us - {settings.site_name}</title>
        <meta name="description" content={`Get in touch with ${settings.site_name}`} />
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
            {settings.page_hero_data?.contact?.title || "Let's Connect"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/70 max-w-3xl mx-auto"
          >
            {settings.page_hero_data?.contact?.subtitle || "Have a project in mind? We'd love to hear from you."}
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

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-heading font-bold text-brand-blue mb-8">Send Us a Message</h2>

              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card text-center bg-brand-green/5 border border-brand-green/20"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                    <FiCheck className="w-8 h-8 text-brand-green" />
                  </div>
                  <p className="text-neutral-700 font-medium">{submitMessage}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Organization</label>
                      <input type="text" name="organization" value={form.organization} onChange={handleChange} className="input-field" placeholder="Your organization" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+93 XXX XXX XXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Service Interest</label>
                    <select name="service_interest" value={form.service_interest} onChange={handleChange} className="input-field">
                      <option value="">Select a service</option>
                      {services.filter(s => s.is_published).map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="input-field resize-none" placeholder="Tell us about your project..." />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{submitMessage}</div>
                  )}

                  <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                    {submitting ? 'Sending...' : 'Send Message'}
                    <FiSend className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-blue mb-6">Contact Information</h2>
                <div className="space-y-5">
                  <div className="flex gap-4 p-5 rounded-2xl bg-neutral-50">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <FiMapPin className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-brand-blue text-sm">Kabul (HQ)</h4>
                      <p className="text-neutral-500 text-sm mt-1">{settings.kabul_address || 'Afshare, Kabul, Afghanistan'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-neutral-50">
                    <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                      <FiMapPin className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-brand-green text-sm">Kandahar</h4>
                      <p className="text-neutral-500 text-sm mt-1">{settings.kandahar_address || 'Shaheedano Chowk, Kandahar, Afghanistan'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-neutral-50">
                    <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                      <FiMail className="w-5 h-5 text-brand-purple" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-brand-purple text-sm">Email</h4>
                      <a href={`mailto:${settings.email}`} className="text-neutral-500 text-sm mt-1 block hover:text-brand-blue transition-colors">{settings.email || 'info@gurgure.com'}</a>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-neutral-50">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-light/10 flex items-center justify-center shrink-0">
                      <FiPhone className="w-5 h-5 text-brand-blue-light" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-brand-blue-light text-sm">Phone</h4>
                      <a href={`tel:${settings.phone}`} className="text-neutral-500 text-sm mt-1 block hover:text-brand-blue transition-colors">{settings.phone || '+93 700 777 480'}</a>
                    </div>
                  </div>
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div>
                  <h3 className="text-lg font-heading font-bold text-brand-blue mb-4">Follow Us</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"
                        title={s.label}
                      >
                        <s.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden bg-neutral-100 aspect-[16/9] flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <p className="text-neutral-400 text-sm">Map loading...</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

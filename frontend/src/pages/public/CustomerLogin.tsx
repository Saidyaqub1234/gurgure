import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { getSettings, loginCustomer } from '@/api';
import type { Settings } from '@/types';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSettings().then(s => { setSettings(s); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await loginCustomer(form.email, form.password);
      const { customer, token } = res.data;
      localStorage.setItem('customer_token', token);
      localStorage.setItem('customer', JSON.stringify({
        id: customer.id,
        name: customer.name,
        organization_name: customer.organization_name,
        email: customer.email,
        phone: customer.phone,
      }));
      navigate('/portal');
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.response?.data?.errors?.email?.[0] || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Login - {settings?.site_name || 'GURGURE'}</title>
      </Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Customer Login</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">Sign in to manage your quotations and account.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-lg mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-neutral-100"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
              <FiLogIn className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-heading font-bold text-brand-blue mb-2 text-center">Welcome Back</h2>
            <p className="text-neutral-500 mb-8 text-center text-sm">Sign in to access your portal and request quotations.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 text-center">
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                {submitting ? 'Signing in...' : 'Sign In'} <FiArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-brand-blue/70 hover:text-brand-blue hover:underline">Forgot your password?</Link>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
              <p className="text-sm text-neutral-500">
                Don't have an account? <Link to="/register" className="text-brand-blue font-semibold hover:underline">Register Now</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

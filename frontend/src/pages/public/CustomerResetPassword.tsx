import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheckCircle, FiLock, FiHash } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { getSettings } from '@/api';
import apiClient from '@/api/client';
import type { Settings } from '@/types';

export default function CustomerResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const emailFromState = (location.state as any)?.email || '';
  const [form, setForm] = useState({ email: emailFromState, token: '', password: '', password_confirmation: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getSettings().then(s => { setSettings(s); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.post('/customer/reset-password', {
        email: form.email,
        token: form.token,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid or expired reset code');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <PublicLayout settings={settings}>
        <Helmet>
          <title>Password Reset - {settings?.site_name || 'GURGURE'}</title>
        </Helmet>
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Password Reset</motion.h1>
          </div>
        </section>
        <section className="py-24 bg-white">
          <div className="max-w-lg mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-neutral-100 text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-4">Password Updated!</h2>
              <p className="text-neutral-500 mb-8 text-sm">Your password has been reset successfully. You can now sign in with your new password.</p>
              <button onClick={() => navigate('/login')} className="btn-primary w-full">
                Sign In <FiArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Reset Password - {settings?.site_name || 'GURGURE'}</title>
      </Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Reset Password</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">Enter the 6-digit code and your new password.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-lg mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-neutral-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
              <FiLock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-heading font-bold text-brand-blue mb-2 text-center">Set New Password</h2>
            <p className="text-neutral-500 mb-8 text-center text-sm">Enter the 6-digit reset code from your email and choose a new password.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">6-Digit Reset Code</label>
                <div className="relative">
                  <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={form.token}
                    onChange={(e) => setForm({ ...form, token: e.target.value })}
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    placeholder="000000"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-mono text-lg tracking-[0.3em] text-center"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">New Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">Confirm New Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    value={form.password_confirmation}
                    onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                    required
                    minLength={6}
                    placeholder="Re-enter your password"
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
                {submitting ? 'Resetting...' : 'Reset Password'} <FiArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
              <p className="text-sm text-neutral-500">
                Didn't receive a code? <Link to="/forgot-password" className="text-brand-blue font-semibold hover:underline">Send Again</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

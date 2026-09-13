import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiKey, FiMail } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { getSettings } from '@/api';
import apiClient from '@/api/client';
import type { Settings } from '@/types';

export default function CustomerForgotPassword() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetCode, setResetCode] = useState('');

  useEffect(() => {
    getSettings().then(s => { setSettings(s); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await apiClient.post('/customer/forgot-password', { email });
      if (res.data.code) {
        setResetCode(res.data.code);
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <PublicLayout settings={settings}>
        <Helmet>
          <title>Reset Code Sent - {settings?.site_name || 'GURGURE'}</title>
        </Helmet>
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Check Your Email</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">We've sent a reset code to your email address.</motion.p>
          </div>
        </section>
        <section className="py-24 bg-white">
          <div className="max-w-lg mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-neutral-100 text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <FiMail className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-4">Reset Code Sent</h2>
              <p className="text-neutral-500 mb-6 text-sm">If an account exists with <strong>{email}</strong>, a 6-digit reset code has been sent.</p>

              {resetCode && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 mb-6">
                  <p className="text-xs text-blue-500 mb-1">Dev Mode - Reset Code:</p>
                  <p className="text-2xl font-mono font-bold text-blue-700 tracking-widest">{resetCode}</p>
                </div>
              )}

              <button onClick={() => navigate('/reset-password', { state: { email } })} className="btn-primary w-full">
                Enter Reset Code <FiArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <Link to="/login" className="text-sm text-brand-blue font-semibold hover:underline">Back to Login</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Forgot Password - {settings?.site_name || 'GURGURE'}</title>
      </Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Forgot Password</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">Enter your email to receive a password reset code.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-lg mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-neutral-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
              <FiKey className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-heading font-bold text-brand-blue mb-2 text-center">Reset Your Password</h2>
            <p className="text-neutral-500 mb-8 text-center text-sm">Enter your registered email address and we'll send you a 6-digit reset code.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-brand-blue mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
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
                {submitting ? 'Sending...' : 'Send Reset Code'} <FiArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
              <p className="text-sm text-neutral-500">
                Remember your password? <Link to="/login" className="text-brand-blue font-semibold hover:underline">Sign In</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

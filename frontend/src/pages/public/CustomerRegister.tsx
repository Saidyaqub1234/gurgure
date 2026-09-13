import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheck, FiUser, FiMail, FiLock } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { getSettings, registerCustomer, getCustomerUser } from '@/api';
import type { Settings } from '@/types';

export default function CustomerRegister() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [existingCustomer, setExistingCustomer] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [form, setForm] = useState({ name: '', organization_name: '', email: '', password: '', password_confirmation: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const [s] = await Promise.all([getSettings()]);
        setSettings(s);
      } catch {}

      const token = localStorage.getItem('customer_token');
      if (token) {
        try {
          const customer = await getCustomerUser();
          setExistingCustomer(customer);
        } catch {
          localStorage.removeItem('customer_token');
          localStorage.removeItem('customer');
        }
      }
      setLoading(false);
      setCheckingAuth(false);
    };
    init();
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;

  const handleLogout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer');
    setExistingCustomer(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await registerCustomer(form);
      const { customer, token } = res.data;
      localStorage.setItem('customer_token', token);
      localStorage.setItem('customer', JSON.stringify({
        id: customer.id,
        name: customer.name,
        organization_name: customer.organization_name,
        email: customer.email,
        phone: customer.phone,
      }));
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.response?.data?.errors?.email?.[0] || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Register - {settings?.site_name || 'GURGURE'}</title>
      </Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Customer Registration</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 max-w-3xl mx-auto">Create an account to request quotations and receive invoices.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-lg mx-auto px-6">
          {existingCustomer && !success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8 rounded-3xl bg-brand-blue/5 border border-brand-blue/10">
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                <FiUser className="w-8 h-8 text-brand-blue" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-brand-blue mb-2">You're Already Logged In</h2>
              <p className="text-neutral-500 mb-2">Logged in as <strong>{existingCustomer.name}</strong></p>
              <p className="text-neutral-400 text-sm mb-6">{existingCustomer.email}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/quote" className="btn-primary">Request a Quotation <FiArrowRight className="w-5 h-5" /></Link>
                <Link to="/portal" className="btn-secondary">Go to Portal</Link>
              </div>
              <button onClick={handleLogout} className="mt-4 text-sm text-neutral-400 hover:text-red-500 transition-colors">
                Not you? Logout
              </button>
            </motion.div>
          ) : success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8 rounded-3xl bg-green-50 border border-green-200">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-green-800 mb-2">Registration Successful!</h2>
              <p className="text-green-600 mb-6">Your account has been created. You can now request quotations.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/quote" className="btn-primary bg-green-600 hover:bg-green-700">Request a Quotation <FiArrowRight className="w-5 h-5" /></Link>
                <Link to="/portal" className="btn-secondary border-green-600 text-green-700 hover:bg-green-600 hover:text-white">Go to Portal</Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name *</label>
                  <input required className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Organization</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" value={form.organization_name} onChange={e => setForm({ ...form, organization_name: e.target.value })} placeholder="Company (optional)" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Password *</label>
                  <input required type="password" minLength={6} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Confirm Password *</label>
                  <input required type="password" minLength={6} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" value={form.password_confirmation} onChange={e => setForm({ ...form, password_confirmation: e.target.value })} placeholder="Repeat password" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+93 700 000 000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Address</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Your address" />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 text-center">
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
                {submitting ? 'Creating Account...' : 'Create Account'} <FiArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-neutral-500">
                Already have an account? <Link to="/login" className="text-brand-blue font-medium hover:underline">Sign In</Link>
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

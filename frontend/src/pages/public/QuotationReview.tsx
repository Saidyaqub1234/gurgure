import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiArrowLeft, FiPackage, FiLoader, FiUser, FiX,
} from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getServicesWithPackages, getPackageItems, submitQuotation, getCustomerUser } from '@/api';
import type { Settings, ServiceWithPackages, ServicePackage, ServicePackageItem } from '@/types';

const LEVEL_ORDER = ['basic', 'silver', 'gold', 'platinum'];

function getStoredCustomer() {
  try {
    const raw = localStorage.getItem('customer');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

interface ServiceSelection {
  service: ServiceWithPackages;
  packageId: number | null;
  pkg: ServicePackage | null;
  optionalItems: { item: ServicePackageItem; selected: boolean; quantity: number }[];
  loadingItems: boolean;
}

export default function QuotationReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceIds: number[] = location.state?.serviceIds ?? [];

  const [settings, setSettings] = useState<Settings | null>(null);
  const [customer, setCustomer] = useState<any>(() => getStoredCustomer());
  const [selections, setSelections] = useState<ServiceSelection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    organization_name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    if (!serviceIds || serviceIds.length === 0) {
      navigate('/quote', { replace: true });
      return;
    }
    const token = localStorage.getItem('customer_token');
    if (!token) {
      navigate('/login', { state: { from: '/quote' } });
      return;
    }
    getCustomerUser()
      .then((c) => {
        setCustomer(c);
        setForm({
          name: c.name || '',
          organization_name: c.organization_name || '',
          email: c.email || '',
          phone: c.phone || '',
          message: '',
        });
      })
      .catch(() => {
        localStorage.removeItem('customer_token');
        localStorage.removeItem('customer');
        navigate('/login', { state: { from: '/quote' } });
      });
  }, [serviceIds, navigate]);

  useEffect(() => {
    const load = async () => {
      try {
        const [settingsData, services]: any[] = await Promise.all([
          getSettings(),
          getServicesWithPackages(),
        ]);
        setSettings(settingsData);

        const chosen: ServiceWithPackages[] = services.filter((s: ServiceWithPackages) => serviceIds.includes(s.id));
        if (chosen.length === 0) {
          setError('No selected services found.');
          setLoading(false);
          return;
        }

        const initial: ServiceSelection[] = chosen.map((service) => ({
          service,
          packageId: null,
          pkg: null,
          optionalItems: [],
          loadingItems: false,
        }));
        setSelections(initial);
        setLoading(false);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
        setLoading(false);
      }
    };
    load();
  }, [serviceIds]);

  const selectPackage = async (index: number, packageId: number) => {
    const service = selections[index].service;
    const pkg = service.packages.find((p) => p.id === packageId) || null;

    setSelections((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, packageId, pkg, optionalItems: [], loadingItems: true } : s
      )
    );

    if (pkg) {
      try {
        const items: ServicePackageItem[] = pkg.items?.length ? pkg.items : await getPackageItems(pkg.id);
        setSelections((prev) =>
          prev.map((s, i) =>
            i === index
              ? {
                  ...s,
                  packageId,
                  pkg,
                  optionalItems: (items || [])
                    .filter((it: ServicePackageItem) => it.is_optional)
                    .map((it: ServicePackageItem) => ({ item: it, selected: false, quantity: 1 })),
                  loadingItems: false,
                }
              : s
          )
        );
      } catch {
        setSelections((prev) =>
          prev.map((s, i) => (i === index ? { ...s, loadingItems: false } : s))
        );
      }
    }
  };

  const toggleOptional = (index: number, optIndex: number) => {
    setSelections((prev) =>
      prev.map((s, i) => {
        if (i !== index) return s;
        const optionalItems = s.optionalItems.map((o, oi) =>
          oi === optIndex ? { ...o, selected: !o.selected } : o
        );
        return { ...s, optionalItems };
      })
    );
  };

  const updateQty = (index: number, optIndex: number, delta: number) => {
    setSelections((prev) =>
      prev.map((s, i) => {
        if (i !== index) return s;
        const optionalItems = s.optionalItems.map((o, oi) => {
          if (oi !== optIndex || !o.selected) return o;
          return { ...o, quantity: Math.max(1, o.quantity + delta) };
        });
        return { ...s, optionalItems };
      })
    );
  };

  const removeService = (index: number) => {
    setSelections((prev) => prev.filter((_, i) => i !== index));
    if (selections.length - 1 === 0) navigate('/quote');
  };

  const serviceTotal = (sel: ServiceSelection) => {
    if (!sel.pkg) return 0;
    const base = parseFloat(sel.pkg.base_price) || 0;
    const opts = sel.optionalItems.reduce((sum, o) => {
      if (!o.selected) return sum;
      return sum + (parseFloat(o.item.price) || 0) * o.quantity;
    }, 0);
    return base + opts;
  };

  const subtotal = selections.reduce((sum, s) => sum + serviceTotal(s), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    const items: any[] = [];
    for (const sel of selections) {
      if (!sel.pkg) continue;
      const base = parseFloat(sel.pkg.base_price) || 0;
      items.push({
        service_id: sel.service.id,
        package_id: sel.pkg.id,
        item_name: `${sel.service.title} — ${sel.pkg.name}`,
        description: sel.pkg.description || '',
        quantity: 1,
        unit_price: base,
        total_price: base,
      });
      for (const o of sel.optionalItems) {
        if (!o.selected) continue;
        const price = parseFloat(o.item.price) || 0;
        items.push({
          service_id: sel.service.id,
          package_id: sel.pkg.id,
          package_item_id: o.item.id,
          item_name: o.item.name,
          description: o.item.description || '',
          quantity: o.quantity,
          unit_price: price,
          total_price: price * o.quantity,
        });
      }
    }

    const payload = {
      customer: {
        name: form.name,
        organization_name: form.organization_name,
        email: form.email,
        phone: form.phone,
        address: '',
      },
      items,
      notes: form.message,
    };

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await submitQuotation(payload);
      navigate(`/quote/success/${response.data.quotation_no}`);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setSubmitError('This email is not registered. Please login again before requesting a quotation.');
      } else {
        setSubmitError(err?.response?.data?.message || err?.message || 'Failed to submit quote request');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;
  if (!customer) return <PublicLayout><PageLoading /></PublicLayout>;

  const allConfigured = selections.every((s) => s.pkg !== null);

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Review Your Quote - {settings.site_name}</title>
        <meta name="description" content="Review and submit your quotation request" />
      </Helmet>

      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/quote" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <FiPackage className="w-5 h-5 text-white" />
              </div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                {selections.length} service{selections.length !== 1 ? 's' : ''}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Review Your Quote</h1>
            <p className="text-white/80 text-lg max-w-2xl">Choose a package for each selected service, then submit.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Service selections */}
            <div className="lg:col-span-2 space-y-6">
              {selections.map((sel, index) => (
                <motion.div
                  key={sel.service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-xl shrink-0">
                        {sel.service.icon || '📋'}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-heading font-bold text-brand-blue">{sel.service.title}</h3>
                        {sel.pkg && (
                          <p className="text-sm text-brand-cyan font-semibold">{sel.pkg.name}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeService(index)}
                      className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors shrink-0"
                    >
                      <FiX className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  {sel.service.packages.length > 0 ? (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Select a Package *</label>
                      <div className="flex flex-wrap gap-2">
                        {sel.service.packages.map((pkg) => {
                          const active = sel.packageId === pkg.id;
                          return (
                            <button
                              key={pkg.id}
                              onClick={() => selectPackage(index, pkg.id)}
                              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                                active
                                  ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                              }`}
                            >
                              <span className="capitalize">{pkg.level}</span>
                              <span className="ml-2 text-xs opacity-70">${parseFloat(pkg.base_price).toLocaleString()}</span>
                            </button>
                          );
                        })}
                      </div>

                      {sel.loadingItems && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
                          <FiLoader className="w-4 h-4 animate-spin" /> Loading add-ons...
                        </div>
                      )}

                      {sel.pkg && sel.optionalItems.length > 0 && !sel.loadingItems && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-neutral-700 mb-2">Optional Add-ons</h4>
                          <div className="space-y-2">
                            {sel.optionalItems.map((opt, oi) => (
                              <div
                                key={opt.item.id}
                                className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all ${
                                  opt.selected ? 'border-brand-blue bg-brand-blue/5' : 'border-neutral-200'
                                }`}
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <input
                                    type="checkbox"
                                    checked={opt.selected}
                                    onChange={() => toggleOptional(index, oi)}
                                    className="w-5 h-5 rounded border-neutral-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-neutral-800">{opt.item.name}</p>
                                    {opt.item.description && <p className="text-xs text-neutral-400">{opt.item.description}</p>}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  <span className="text-sm font-semibold text-brand-blue">${parseFloat(opt.item.price).toLocaleString()}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center">
                        <span className="text-sm text-neutral-500">Service total</span>
                        <span className="font-bold text-brand-blue text-lg">${serviceTotal(sel).toLocaleString()}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-400">No packages available for this service.</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right: Summary & Form */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card sticky top-24"
              >
                <h2 className="text-xl font-heading font-bold text-brand-blue mb-4">Summary</h2>
                <div className="space-y-2 text-sm mb-4">
                  {selections.map((sel) => (
                    <div key={sel.service.id} className="flex justify-between gap-3">
                      <span className="text-neutral-500 truncate">{sel.service.title}</span>
                      <span className="font-medium shrink-0">${serviceTotal(sel).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-neutral-200 flex justify-between text-base">
                    <span className="font-bold text-brand-blue">Subtotal</span>
                    <span className="font-bold text-brand-blue">${subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="pt-6 border-t border-neutral-200 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser className="w-4 h-4 text-brand-blue" />
                    <h3 className="font-heading font-bold text-brand-blue">Your Information</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">Registered</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Organization *</label>
                    <input
                      type="text"
                      value={form.organization_name}
                      onChange={(e) => setForm({ ...form, organization_name: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-field"
                      rows={3}
                    />
                  </div>
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting || !allConfigured || !form.name || !form.organization_name || !form.email}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2"><FiLoader className="w-4 h-4 animate-spin" /> Submitting...</span>
                    ) : allConfigured ? (
                      'Submit Quote Request'
                    ) : (
                      'Select a package for each service'
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

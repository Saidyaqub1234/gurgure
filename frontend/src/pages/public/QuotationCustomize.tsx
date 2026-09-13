import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiPackage, FiClock, FiCheck, FiMinus, FiPlus, FiLoader, FiUser } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getPackageItems, submitQuotation, getCustomerUser } from '@/api';
import type { Settings, ServicePackage, ServicePackageItem } from '@/types';

interface OptionalItemSelection {
  item: ServicePackageItem;
  selected: boolean;
  quantity: number;
}

function getStoredCustomer() {
  try {
    const raw = localStorage.getItem('customer');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export default function QuotationCustomize() {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>(() => getStoredCustomer());
  const [settings, setSettings] = useState<Settings | null>(null);
  const [pkg, setPkg] = useState<ServicePackage | null>(null);
  const [requiredItems, setRequiredItems] = useState<ServicePackageItem[]>([]);
  const [optionalItems, setOptionalItems] = useState<OptionalItemSelection[]>([]);
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
    const token = localStorage.getItem('customer_token');
    if (!token) {
      navigate('/register', { state: { from: `/quote/customize/${packageId}` } });
      return;
    }
    // Verify token is valid
    getCustomerUser()
      .then(c => {
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
        navigate('/register', { state: { from: `/quote/customize/${packageId}` } });
      });
  }, [navigate, packageId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = await getSettings();
        setSettings(settingsData);

        if (!packageId) throw new Error('Package ID required');
        const packageData = await getPackageItems(parseInt(packageId));

        if (packageData) {
          setPkg(packageData);
          const pkgItems: ServicePackageItem[] = packageData.items || [];
          setRequiredItems(pkgItems.filter((i: ServicePackageItem) => !i.is_optional));
          setOptionalItems(
            pkgItems
              .filter((i: ServicePackageItem) => i.is_optional)
              .map((item: ServicePackageItem) => ({ item, selected: false, quantity: 1 }))
          );
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [packageId]);

  const toggleOptionalItem = (index: number) => {
    setOptionalItems((prev) =>
      prev.map((o, i) => (i === index ? { ...o, selected: !o.selected } : o))
    );
  };

  const updateQuantity = (index: number, delta: number) => {
    setOptionalItems((prev) =>
      prev.map((o, i) => {
        if (i !== index || !o.selected) return o;
        const newQty = Math.max(1, o.quantity + delta);
        return { ...o, quantity: newQty };
      })
    );
  };

  const basePrice = pkg ? parseFloat(pkg.base_price) : 0;
  const optionalTotal = optionalItems.reduce((sum, o) => {
    if (!o.selected) return sum;
    return sum + parseFloat(o.item.price) * o.quantity;
  }, 0);
  const subtotal = basePrice + optionalTotal;

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.organization_name || !form.email) return;
    if (!pkg) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const selectedItems = optionalItems
        .filter((o) => o.selected)
        .map((o) => ({
          service_id: pkg.service_id,
          package_id: pkg.id,
          package_item_id: o.item.id,
          item_name: o.item.name,
          description: o.item.description,
          quantity: o.quantity,
          unit_price: parseFloat(o.item.price),
          total_price: parseFloat(o.item.price) * o.quantity,
        }));

      const payload = {
        customer: {
          name: form.name,
          organization_name: form.organization_name,
          email: form.email,
          phone: form.phone,
          address: '',
        },
        items: [
          {
            service_id: pkg.service_id,
            package_id: pkg.id,
            item_name: pkg.name,
            description: pkg.description || '',
            quantity: 1,
            unit_price: basePrice,
            total_price: basePrice,
          },
          ...selectedItems,
        ],
        notes: form.message,
      };

      const response = await submitQuotation(payload);
      navigate(`/quote/success/${response.data.quotation_no}`);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setSubmitError('This email is not registered. Please register first before requesting a quotation.');
      } else {
        setSubmitError(err?.response?.data?.message || err?.message || 'Failed to submit quote request');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error && !pkg) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;
  if (!customer) return <PublicLayout><PageLoading /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Customize Your Quote - {settings?.site_name}</title>
        <meta name="description" content="Customize your quote by selecting optional items" />
      </Helmet>

      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/quote" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          {pkg && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <FiPackage className="w-5 h-5 text-white" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">{pkg.level}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{pkg.name}</h1>
              {pkg.description && <p className="text-white/80 text-lg max-w-2xl">{pkg.description}</p>}
              <div className="flex items-center gap-6 mt-6">
                <div className="text-2xl font-bold text-white">${basePrice.toLocaleString()}</div>
                {pkg.delivery_time && (
                  <div className="flex items-center gap-2 text-white/70">
                    <FiClock className="w-4 h-4" />
                    <span>{pkg.delivery_time}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Required Items */}
              {requiredItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h2 className="text-xl font-heading font-bold text-brand-blue mb-4">
                    Included in Package
                  </h2>
                  <div className="space-y-3">
                    {requiredItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <FiCheck className="w-3 h-3 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-800">{item.name}</p>
                            {item.description && <p className="text-xs text-neutral-400">{item.description}</p>}
                          </div>
                        </div>
                        <span className="text-sm text-neutral-500">Included</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Optional Items */}
              {optionalItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="card"
                >
                  <h2 className="text-xl font-heading font-bold text-brand-blue mb-4">
                    Optional Add-ons
                  </h2>
                  <div className="space-y-3">
                    {optionalItems.map((opt, index) => (
                      <div
                        key={opt.item.id}
                        className={`flex items-center justify-between py-4 border border-neutral-200 rounded-xl px-4 transition-all ${
                          opt.selected ? 'border-brand-blue bg-brand-blue/5' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={opt.selected}
                            onChange={() => toggleOptionalItem(index)}
                            className="w-5 h-5 rounded border-neutral-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-neutral-800">{opt.item.name}</p>
                            {opt.item.description && <p className="text-xs text-neutral-400">{opt.item.description}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold text-brand-blue">${parseFloat(opt.item.price).toLocaleString()}</span>
                          {opt.selected && opt.item.quantity_enabled && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(index, -1)}
                                className="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:border-brand-blue transition-colors"
                              >
                                <FiMinus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-medium text-sm">{opt.quantity}</span>
                              <button
                                onClick={() => updateQuantity(index, 1)}
                                className="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:border-brand-blue transition-colors"
                              >
                                <FiPlus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Summary & Form */}
            <div className="space-y-6">
              {/* Price Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card sticky top-24"
              >
                <h2 className="text-xl font-heading font-bold text-brand-blue mb-4">Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Base Price</span>
                    <span className="font-medium">${basePrice.toLocaleString()}</span>
                  </div>
                  {optionalTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Optional Items</span>
                      <span className="font-medium">${optionalTotal.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-neutral-200 flex justify-between text-base">
                    <span className="font-bold text-brand-blue">Subtotal</span>
                    <span className="font-bold text-brand-blue">${subtotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Customer Info - Pre-filled */}
                <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-neutral-200 space-y-4">
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
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Organization *</label>
                    <input
                      type="text"
                      value={form.organization_name}
                      onChange={(e) => handleFormChange('organization_name', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleFormChange('message', e.target.value)}
                      className="input-field"
                      rows={3}
                    />
                  </div>
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                      <span>{submitError.replace('register first', '')}</span>
                      {submitError.includes('register') && (
                        <Link to="/register" className="text-red-700 font-bold underline ml-1">Register here</Link>
                      )}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting || !form.name || !form.organization_name || !form.email}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <FiLoader className="w-4 h-4 animate-spin" /> Submitting...
                      </span>
                    ) : (
                      'Submit Quote Request'
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

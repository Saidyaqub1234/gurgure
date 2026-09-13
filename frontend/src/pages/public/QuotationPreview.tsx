import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiFileText, FiCalendar, FiCheck, FiClock, FiLoader, FiDollarSign } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, viewQuotation, acceptQuotation } from '@/api';
import type { Settings, Quotation } from '@/types';

const statusColors: Record<string, string> = {
  draft: 'bg-neutral-100 text-neutral-600',
  sent: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  expired: 'bg-orange-100 text-orange-700',
};

export default function QuotationPreview() {
  const { quotation_no } = useParams<{ quotation_no: string }>();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = await getSettings();
        setSettings(settingsData);

        if (!quotation_no) throw new Error('Quotation number required');
        const data = await viewQuotation(quotation_no);
        setQuotation(data);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [quotation_no]);

  const handleAccept = async () => {
    if (!quotation_no || !quotation) return;
    setAccepting(true);
    try {
      await acceptQuotation(quotation_no);
      const updated = await viewQuotation(quotation_no);
      setQuotation(updated);
    } catch (e: any) {
      setError(e?.message || 'Failed to accept quotation');
    } finally {
      setAccepting(false);
    }
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;
  if (!quotation) return <PublicLayout><ErrorState message="Quotation not found" onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Quotation {quotation.quotation_no} - {settings.site_name}</title>
        <meta name="description" content="View quotation details" />
      </Helmet>

      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                  {quotation.quotation_no}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[quotation.status] || 'bg-neutral-100 text-neutral-600'}`}>
                    {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                  </span>
                  {quotation.valid_until && (
                    <span className="flex items-center gap-1.5 text-white/70 text-sm">
                      <FiCalendar className="w-4 h-4" />
                      Valid until {new Date(quotation.valid_until).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {/* Customer Info */}
          {quotation.customer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Name</p>
                  <p className="font-medium text-neutral-800">{quotation.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Organization</p>
                  <p className="font-medium text-neutral-800">{quotation.customer.organization_name}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="font-medium text-neutral-800">{quotation.customer.email}</p>
                </div>
                {quotation.customer.phone && (
                  <div>
                    <p className="text-sm text-neutral-500">Phone</p>
                    <p className="font-medium text-neutral-800">{quotation.customer.phone}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Line Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h2 className="text-xl font-heading font-bold text-brand-blue mb-4">Line Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-neutral-500">Item</th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-neutral-500">Qty</th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-neutral-500">Unit Price</th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-neutral-500">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quotation.items.map((item, i) => (
                    <tr key={item.id || i} className="border-b border-neutral-100 last:border-0">
                      <td className="py-3 px-2">
                        <p className="font-medium text-neutral-800">{item.item_name}</p>
                        {item.description && <p className="text-xs text-neutral-400">{item.description}</p>}
                      </td>
                      <td className="py-3 px-2 text-center text-neutral-600">{item.quantity}</td>
                      <td className="py-3 px-2 text-right text-neutral-600">${item.unit_price.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right font-medium text-neutral-800">${item.total_price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Price Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="space-y-3 max-w-xs ml-auto">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium">${parseFloat(quotation.subtotal).toLocaleString()}</span>
              </div>
              {parseFloat(quotation.discount) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Discount</span>
                  <span className="font-medium text-red-600">-${parseFloat(quotation.discount).toLocaleString()}</span>
                </div>
              )}
              {parseFloat(quotation.tax) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Tax</span>
                  <span className="font-medium">${parseFloat(quotation.tax).toLocaleString()}</span>
                </div>
              )}
              <div className="pt-3 border-t border-neutral-200 flex justify-between">
                <span className="text-lg font-bold text-brand-blue">Total</span>
                <span className="text-lg font-bold text-brand-blue">${parseFloat(quotation.total).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Notes */}
          {quotation.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-2">Notes</h2>
              <p className="text-neutral-600 whitespace-pre-line">{quotation.notes}</p>
            </motion.div>
          )}

          {/* Actions */}
          {quotation.status === 'sent' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <button
                onClick={handleAccept}
                disabled={accepting}
                className="btn-primary text-lg disabled:opacity-50"
              >
                {accepting ? (
                  <span className="flex items-center gap-2">
                    <FiLoader className="w-5 h-5 animate-spin" /> Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FiCheck className="w-5 h-5" /> Accept Quotation
                  </span>
                )}
              </button>
            </motion.div>
          )}

          {quotation.status === 'accepted' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-50 rounded-2xl border border-green-200">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheck className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-green-800">Quotation Accepted</p>
                  <p className="text-sm text-green-600">Your invoice will be generated shortly.</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

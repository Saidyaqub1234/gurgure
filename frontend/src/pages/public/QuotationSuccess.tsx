import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiCheckCircle, FiFileText, FiPlus } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, viewQuotation } from '@/api';
import type { Settings, Quotation } from '@/types';

export default function QuotationSuccess() {
  const { quotation_no } = useParams<{ quotation_no: string }>();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Quote Submitted - {settings.site_name}</title>
        <meta name="description" content="Your quote request has been submitted successfully" />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-neutral-50 pt-20 pb-12">
        <div className="max-w-lg mx-auto px-6 text-center">
          {/* Checkmark Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8"
          >
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-heading font-bold text-brand-blue mb-4"
          >
            Quote Request Submitted!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 text-lg mb-8"
          >
            Thank you for your interest. We will review your request and get back to you shortly.
          </motion.p>

          {/* Quotation Details */}
          {quotation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card text-left mb-8"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Quotation Number</span>
                  <span className="font-mono font-bold text-brand-blue">{quotation.quotation_no}</span>
                </div>
                {quotation.customer && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-500">Customer</span>
                    <span className="font-medium">{quotation.customer.name}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                  <span className="text-sm text-neutral-500">Total Amount</span>
                  <span className="text-xl font-bold text-brand-blue">${parseFloat(quotation.total).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {quotation && (
              <Link to={`/quote/preview/${quotation.quotation_no}`} className="btn-primary inline-flex items-center gap-2">
                <FiFileText className="w-5 h-5" /> View Your Quote
              </Link>
            )}
            <Link to="/quote" className="btn-outline !border-brand-blue !text-brand-blue inline-flex items-center gap-2 hover:!bg-brand-blue hover:!text-white">
              <FiPlus className="w-5 h-5" /> Request Another Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

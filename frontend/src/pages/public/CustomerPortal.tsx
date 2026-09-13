import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiPackage, FiClock, FiTag, FiArrowRight, FiUser, FiLogOut,
  FiFileText, FiCheck, FiX, FiDollarSign, FiHash, FiCalendar,
  FiDownload, FiEye, FiEyeOff, FiChevronRight, FiCreditCard, FiBook,
  FiAlertCircle, FiTrendingUp, FiSettings, FiLock, FiMail, FiPhone, FiHome
} from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { getSettings, getServicesWithPackages, getCustomerPortal, logoutCustomer, changeCustomerPassword, updateCustomerProfile, customerUpload } from '@/api';
import type { Settings, ServiceWithPackages, ServicePackage } from '@/types';

const TABS = [
  { key: 'overview', label: 'Overview', icon: FiTrendingUp },
  { key: 'quotations', label: 'Quotations', icon: FiFileText },
  { key: 'invoices', label: 'Invoices', icon: FiBook },
  { key: 'payments', label: 'Payments', icon: FiCreditCard },
  { key: 'receipts', label: 'Receipts', icon: FiDollarSign },
  { key: 'services', label: 'Services', icon: FiPackage },
  { key: 'account', label: 'Account', icon: FiSettings },
];

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-neutral-100 text-neutral-600',
  sent: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  converted_to_invoice: 'bg-purple-100 text-purple-700',
  rejected: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
  partial: 'bg-orange-100 text-orange-700',
  paid: 'bg-green-100 text-green-700',
  overdue: 'bg-red-100 text-red-700',
  cancelled: 'bg-neutral-100 text-neutral-500',
};

function formatDate(date: string | null) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatStatus(status: string) {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function CustomerPortal() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<ServiceWithPackages[]>([]);
  const [portalData, setPortalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Account tab state
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', organization_name: '', address: '', avatar: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ new_password: '', new_password_confirmation: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('customer_token');
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const [settingsData, servicesData, portal] = await Promise.all([
          getSettings(),
          getServicesWithPackages(),
          getCustomerPortal(),
        ]);
        setSettings(settingsData);
        setServices(servicesData);
        setPortalData(portal);
        localStorage.setItem('customer', JSON.stringify(portal.customer));
        setProfileForm({
          name: portal.customer.name || '',
          email: portal.customer.email || '',
          phone: portal.customer.phone || '',
          organization_name: portal.customer.organization_name || '',
          address: portal.customer.address || '',
          avatar: portal.customer.avatar || '',
        });
      } catch {
        localStorage.removeItem('customer_token');
        localStorage.removeItem('customer');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try { await logoutCustomer(); } catch {}
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer');
    navigate('/');
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (!portalData) return <PublicLayout><PageLoading /></PublicLayout>;

  const { customer, quotations, invoices, payments, receipts, stats } = portalData;

  const getStartingPrice = (packages: ServicePackage[]) => {
    const prices = packages.map((p) => parseFloat(p.base_price)).filter((p) => !isNaN(p));
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>My Portal - {settings?.site_name || 'GURGURE'}</title>
      </Helmet>

      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden bg-gradient-brand">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden shrink-0">
                  {customer.avatar ? (
                    <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="w-9 h-9 text-white" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-white/60 text-sm mb-1">Welcome back</p>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-white truncate">{customer.name}</h1>
                  {customer.organization_name && <p className="text-white/70 text-sm truncate">{customer.organization_name}</p>}
                  <p className="text-white/50 text-sm truncate">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link to="/quote" className="btn-primary text-sm !py-2.5 !px-5">
                  <FiFileText className="w-4 h-4" /> New Quotation
                </Link>
                <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors border border-white/15">
                  <FiLogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm shadow-brand-blue/20'
                      : 'text-neutral-500 hover:text-brand-blue hover:bg-brand-blue/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.key === 'quotations' && quotations.length > 0 && (
                    <span className={`ml-0.5 min-w-5 h-5 px-1.5 rounded-full text-xs flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : 'bg-brand-blue/10 text-brand-blue'}`}>{quotations.length}</span>
                  )}
                  {tab.key === 'invoices' && invoices.length > 0 && (
                    <span className={`ml-0.5 min-w-5 h-5 px-1.5 rounded-full text-xs flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : 'bg-brand-blue/10 text-brand-blue'}`}>{invoices.length}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 bg-neutral-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Quotations', value: stats.total_quotations, icon: FiFileText, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Pending', value: stats.pending_quotations, icon: FiClock, color: 'bg-yellow-50 text-yellow-600' },
                    { label: 'Total Invoices', value: stats.total_invoices, icon: FiBook, color: 'bg-purple-50 text-purple-600' },
                    { label: 'Total Paid', value: `$${Number(stats.total_paid || 0).toLocaleString()}`, icon: FiDollarSign, color: 'bg-green-50 text-green-600' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                          <s.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
                      <p className="text-xs text-neutral-400 mt-1">{s.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Quotations */}
                {quotations.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-heading font-bold text-brand-blue">Recent Quotations</h3>
                      <button onClick={() => setActiveTab('quotations')} className="text-sm text-brand-cyan font-medium hover:underline flex items-center gap-1">
                        View All <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {quotations.slice(0, 3).map((q: any) => (
                        <div key={q.id} className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center shrink-0">
                              <FiFileText className="w-5 h-5 text-brand-blue" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-neutral-800">{q.quotation_no}</p>
                              <p className="text-xs text-neutral-400">{formatDate(q.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm text-brand-blue">${parseFloat(q.total).toLocaleString()}</span>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[q.status] || 'bg-neutral-100 text-neutral-500'}`}>
                              {formatStatus(q.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Invoices */}
                {invoices.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-heading font-bold text-brand-blue">Recent Invoices</h3>
                      <button onClick={() => setActiveTab('invoices')} className="text-sm text-brand-cyan font-medium hover:underline flex items-center gap-1">
                        View All <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {invoices.slice(0, 3).map((inv: any) => (
                        <div key={inv.id} className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                              <FiBook className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-neutral-800">{inv.invoice_no}</p>
                              <p className="text-xs text-neutral-400">Due: {formatDate(inv.due_date)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-bold text-sm text-brand-blue">${parseFloat(inv.total).toLocaleString()}</p>
                              {parseFloat(inv.balance) > 0 && (
                                <p className="text-xs text-red-500">Balance: ${parseFloat(inv.balance).toLocaleString()}</p>
                              )}
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[inv.status] || 'bg-neutral-100 text-neutral-500'}`}>
                              {formatStatus(inv.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {quotations.length === 0 && invoices.length === 0 && (
                  <div className="bg-white rounded-2xl border border-dashed border-neutral-200 text-center py-16 px-6">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-4">
                      <FiPackage className="w-8 h-8 text-neutral-300" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-neutral-600 mb-2">No Activity Yet</h3>
                    <p className="text-neutral-400 mb-6">Start by requesting a quotation for our services.</p>
                    <Link to="/quote" className="btn-primary">Request a Quotation</Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* QUOTATIONS */}
            {activeTab === 'quotations' && (
              <motion.div key="quotations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-bold text-brand-blue">My Quotations</h2>
                  <Link to="/quote" className="btn-primary text-sm !py-2 !px-4">New Quotation</Link>
                </div>
                {quotations.length > 0 ? (
                  <div className="space-y-4">
                    {quotations.map((q: any) => (
                      <div key={q.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center">
                              <FiFileText className="w-6 h-6 text-brand-blue" />
                            </div>
                            <div>
                              <p className="font-bold text-neutral-800">{q.quotation_no}</p>
                              <p className="text-sm text-neutral-400">Submitted {formatDate(q.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <div className="text-left md:text-right">
                              <p className="text-xl font-bold text-brand-blue">${parseFloat(q.total).toLocaleString()}</p>
                              {q.valid_until && (
                                <p className="text-xs text-neutral-400">Valid until {formatDate(q.valid_until)}</p>
                              )}
                            </div>
                            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${STATUS_COLORS[q.status] || 'bg-neutral-100 text-neutral-500'}`}>
                              {formatStatus(q.status)}
                            </span>
                            {q.status === 'sent' && (
                              <Link to={`/quote/preview/${q.quotation_no}`} className="btn-primary text-sm !py-2 !px-4">
                                <FiEye className="w-4 h-4" /> View
                              </Link>
                            )}
                          </div>
                        </div>
                        {q.items && q.items.length > 0 && (
                          <div className="border-t border-neutral-100 px-5 py-3 bg-neutral-50/50">
                            <div className="flex flex-wrap gap-2">
                              {q.items.map((item: any, idx: number) => (
                                <span key={idx} className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full">
                                  {item.item_name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-dashed border-neutral-200 text-center py-16 px-6">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-4">
                      <FiFileText className="w-8 h-8 text-neutral-300" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-neutral-600 mb-2">No Quotations</h3>
                    <p className="text-neutral-400 mb-6">You haven't submitted any quotations yet.</p>
                    <Link to="/quote" className="btn-primary">Request a Quotation</Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* INVOICES */}
            {activeTab === 'invoices' && (
              <motion.div key="invoices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-heading font-bold text-brand-blue mb-6">My Invoices</h2>
                {invoices.length > 0 ? (
                  <div className="space-y-4">
                    {invoices.map((inv: any) => (
                      <div key={inv.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                              <FiBook className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-bold text-neutral-800">{inv.invoice_no}</p>
                              <p className="text-sm text-neutral-400">
                                {inv.quotation && <span>From {inv.quotation.quotation_no} · </span>}
                                Due {formatDate(inv.due_date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <div className="text-left md:text-right">
                              <p className="text-xl font-bold text-brand-blue">${parseFloat(inv.total).toLocaleString()}</p>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-green-600">Paid: ${parseFloat(inv.paid_amount).toLocaleString()}</span>
                                {parseFloat(inv.balance) > 0 && (
                                  <span className="text-red-500">· Balance: ${parseFloat(inv.balance).toLocaleString()}</span>
                                )}
                              </div>
                            </div>
                            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${STATUS_COLORS[inv.status] || 'bg-neutral-100 text-neutral-500'}`}>
                              {formatStatus(inv.status)}
                            </span>
                          </div>
                        </div>
                        {inv.payments && inv.payments.length > 0 && (
                          <div className="border-t border-neutral-100 px-5 py-3 bg-neutral-50/50">
                            <p className="text-xs font-semibold text-neutral-500 mb-2">Payments ({inv.payments.length})</p>
                            <div className="space-y-1">
                              {inv.payments.map((p: any) => (
                                <div key={p.id} className="flex items-center justify-between text-xs">
                                  <span className="text-neutral-500">{formatDate(p.payment_date)} · {p.payment_method || 'N/A'}</span>
                                  <span className="font-medium text-green-600">${parseFloat(p.amount).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-dashed border-neutral-200 text-center py-16 px-6">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-4">
                      <FiBook className="w-8 h-8 text-neutral-300" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-neutral-600 mb-2">No Invoices</h3>
                    <p className="text-neutral-400">Invoices will appear here once your quotations are accepted.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* PAYMENTS */}
            {activeTab === 'payments' && (
              <motion.div key="payments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-heading font-bold text-brand-blue mb-6">My Payments</h2>
                {payments.length > 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px]">
                        <thead>
                          <tr className="border-b border-neutral-100 bg-neutral-50/50">
                            <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase">Date</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase">Invoice</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase">Method</th>
                            <th className="text-right px-5 py-3 text-xs font-semibold text-neutral-500 uppercase">Amount</th>
                            <th className="text-center px-5 py-3 text-xs font-semibold text-neutral-500 uppercase">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map((p: any) => (
                            <tr key={p.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                              <td className="px-5 py-4 text-sm text-neutral-600">{formatDate(p.payment_date)}</td>
                              <td className="px-5 py-4 text-sm font-medium text-neutral-800">
                                {p.invoice ? p.invoice.invoice_no : '—'}
                              </td>
                              <td className="px-5 py-4 text-sm text-neutral-500 capitalize">{p.payment_method || '—'}</td>
                              <td className="px-5 py-4 text-sm font-bold text-green-600 text-right">${parseFloat(p.amount).toLocaleString()}</td>
                              <td className="px-5 py-4 text-center">
                                {p.receipt ? (
                                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                                    <FiCheck className="w-3 h-3" /> {p.receipt.receipt_no}
                                  </span>
                                ) : (
                                  <span className="text-xs text-neutral-300">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-dashed border-neutral-200 text-center py-16 px-6">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-4">
                      <FiCreditCard className="w-8 h-8 text-neutral-300" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-neutral-600 mb-2">No Payments</h3>
                    <p className="text-neutral-400">Payment records will appear here once you make payments.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* RECEIPTS */}
            {activeTab === 'receipts' && (
              <motion.div key="receipts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-heading font-bold text-brand-blue mb-6">My Receipts</h2>
                {receipts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {receipts.map((r: any) => (
                      <div key={r.id} className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                              <FiDollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-neutral-800">{r.receipt_no}</p>
                              <p className="text-xs text-neutral-400">{formatDate(r.issued_date)}</p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-green-600">${parseFloat(r.amount).toLocaleString()}</span>
                        </div>
                        {r.invoice && (
                          <p className="text-xs text-neutral-400 border-t border-neutral-100 pt-3">Invoice: {r.invoice.invoice_no}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-dashed border-neutral-200 text-center py-16 px-6">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mx-auto mb-4">
                      <FiDollarSign className="w-8 h-8 text-neutral-300" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-neutral-600 mb-2">No Receipts</h3>
                    <p className="text-neutral-400">Receipts will appear here after payments are processed.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* SERVICES */}
            {activeTab === 'services' && (
              <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-heading font-bold text-brand-blue mb-6">Available Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, i) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-2xl border border-neutral-100 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4">
                        <FiPackage className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{service.title}</h3>
                      <p className="text-sm text-neutral-500 flex-1 line-clamp-2 mb-4">{service.description}</p>
                      <div className="space-y-2 mb-4">
                        {service.packages.slice(0, 3).map((pkg) => (
                          <div key={pkg.id} className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                                pkg.level === 'platinum' ? 'bg-purple-100 text-purple-700' :
                                pkg.level === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                                pkg.level === 'silver' ? 'bg-gray-100 text-gray-600' :
                                'bg-neutral-100 text-neutral-600'
                              }`}>{pkg.level}</span>
                              <span className="text-xs text-neutral-500 truncate">{pkg.name}</span>
                            </div>
                            <span className="text-xs font-semibold text-brand-blue">${parseFloat(pkg.base_price).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-neutral-100">
                        <Link to="/quote" className="flex items-center justify-center gap-1 text-sm text-brand-cyan font-semibold hover:underline">
                          Get Quote <FiArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ACCOUNT */}
            {activeTab === 'account' && (
              <motion.div key="account" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Profile */}
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-bold text-brand-blue">Profile Information</h3>
                        <p className="text-xs text-neutral-400">Update your name, email and contact details</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                        {profileForm.avatar ? (
                          <img src={profileForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <FiUser className="w-8 h-8 text-neutral-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-neutral-700">{profileForm.name || 'Your Profile'}</p>
                        <p className="text-xs text-neutral-400 mb-3">{profileForm.email || ''}</p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue-light transition-colors cursor-pointer">
                          <FiUser className="w-4 h-4" />
                          {avatarUploading ? 'Uploading...' : 'Upload Photo'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={avatarUploading}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setAvatarUploading(true);
                              try {
                                const res = await customerUpload(file);
                                const url = res?.url || res?.path || (typeof res === 'string' ? res : '');
                                setProfileForm(prev => ({ ...prev, avatar: url }));
                                try {
                                  const raw = localStorage.getItem('customer');
                                  if (raw) {
                                    const c = JSON.parse(raw);
                                    localStorage.setItem('customer', JSON.stringify({ ...c, avatar: url }));
                                  }
                                } catch {}
                              } catch {
                                setProfileMsg('Failed to upload photo');
                              } finally {
                                setAvatarUploading(false);
                                e.target.value = '';
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      setProfileSaving(true);
                      setProfileMsg('');
                      try {
                        const res = await updateCustomerProfile(profileForm);
                        localStorage.setItem('customer', JSON.stringify(res.data));
                        setProfileMsg('Profile updated successfully');
                      } catch (err: any) {
                        setProfileMsg(err?.response?.data?.message || 'Failed to update profile');
                      } finally {
                        setProfileSaving(false);
                      }
                    }} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-600 mb-1.5">Full Name</label>
                        <div className="relative">
                          <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                          <input type="text" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-600 mb-1.5">Email</label>
                        <div className="relative">
                          <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                          <input type="email" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" value={profileForm.email} onChange={e => setProfileForm({ ...profileForm, email: e.target.value })} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-600 mb-1.5">Phone</label>
                          <div className="relative">
                            <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                            <input type="text" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} placeholder="Optional" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-neutral-600 mb-1.5">Organization</label>
                          <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" value={profileForm.organization_name} onChange={e => setProfileForm({ ...profileForm, organization_name: e.target.value })} placeholder="Optional" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-600 mb-1.5">Address</label>
                        <textarea className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" value={profileForm.address} onChange={e => setProfileForm({ ...profileForm, address: e.target.value })} rows={2} placeholder="Optional" />
                      </div>
                      {profileMsg && (
                        <div className={`p-3 rounded-xl text-sm text-center ${profileMsg.includes('success') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                          {profileMsg}
                        </div>
                      )}
                      <button type="submit" disabled={profileSaving} className="btn-primary w-full text-sm disabled:opacity-50">
                        {profileSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </form>
                  </div>

                  {/* Password */}
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                        <FiLock className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-bold text-brand-blue">Change Password</h3>
                        <p className="text-xs text-neutral-400">Ensure your account remains secure</p>
                      </div>
                    </div>
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      setPasswordErr('');
                      setPasswordMsg('');
                      if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
                        setPasswordErr('New passwords do not match');
                        return;
                      }
                      setPasswordSaving(true);
                      try {
                        await changeCustomerPassword(passwordForm);
                        setPasswordMsg('Password changed successfully');
                        setPasswordForm({ new_password: '', new_password_confirmation: '' });
                      } catch (err: any) {
                        setPasswordErr(err?.response?.data?.message || 'Failed to change password');
                      } finally {
                        setPasswordSaving(false);
                      }
                    }} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-600 mb-1.5">New Password</label>
                        <div className="relative">
                          <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                          <input type={showNewPw ? 'text' : 'password'} className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" value={passwordForm.new_password} onChange={e => setPasswordForm({ ...passwordForm, new_password: e.target.value })} required minLength={6} placeholder="Minimum 6 characters" />
                          <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
                            {showNewPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-600 mb-1.5">Confirm New Password</label>
                        <div className="relative">
                          <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
                          <input type={showConfirmPw ? 'text' : 'password'} className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm" value={passwordForm.new_password_confirmation} onChange={e => setPasswordForm({ ...passwordForm, new_password_confirmation: e.target.value })} required minLength={6} placeholder="Re-enter new password" />
                          <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
                            {showConfirmPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      {passwordErr && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 text-center">{passwordErr}</div>
                      )}
                      {passwordMsg && (
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 text-center">{passwordMsg}</div>
                      )}
                      <button type="submit" disabled={passwordSaving} className="w-full py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-500 text-sm font-medium disabled:opacity-50 transition-colors">
                        {passwordSaving ? 'Changing...' : 'Change Password'}
                      </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-neutral-100">
                      <Link to="/forgot-password" className="text-sm text-brand-blue font-medium hover:underline">
                        Forgot your password? Reset it here
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PublicLayout>
  );
}

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiPackage, FiClock, FiTag, FiArrowRight, FiX, FiCheck, FiUser, FiPlus } from 'react-icons/fi';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings, getServicesWithPackages, getCustomerUser } from '@/api';
import type { Settings, ServiceWithPackages, ServicePackage, ServicePackageItem } from '@/types';

const LEVEL_ORDER = ['basic', 'silver', 'gold', 'platinum'];
const LEVEL_COLORS: Record<string, string> = {
  basic: 'bg-neutral-100 text-neutral-600',
  silver: 'bg-gray-100 text-gray-600',
  gold: 'bg-yellow-100 text-yellow-700',
  platinum: 'bg-purple-100 text-purple-700',
};
const LEVEL_TAB_COLORS: Record<string, string> = {
  basic: 'border-neutral-400 text-neutral-700',
  silver: 'border-gray-400 text-gray-700',
  gold: 'border-yellow-500 text-yellow-700',
  platinum: 'border-purple-500 text-purple-700',
};
const LEVEL_ACTIVE_TAB: Record<string, string> = {
  basic: 'border-neutral-600 bg-neutral-50 text-neutral-900',
  silver: 'border-gray-600 bg-gray-50 text-gray-900',
  gold: 'border-yellow-600 bg-yellow-50 text-yellow-900',
  platinum: 'border-purple-600 bg-purple-50 text-purple-900',
};

function getStoredCustomer() {
  try {
    const raw = localStorage.getItem('customer');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function hasCustomerToken() {
  return !!localStorage.getItem('customer_token');
}

export default function QuotationBrowse() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<ServiceWithPackages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalService, setModalService] = useState<ServiceWithPackages | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [customer, setCustomer] = useState<any>(() => getStoredCustomer());
  const [isLoggedIn, setIsLoggedIn] = useState(() => hasCustomerToken());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, servicesData] = await Promise.all([
          getSettings(),
          getServicesWithPackages(),
        ]);
        setSettings(settingsData);
        setServices(servicesData);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Verify auth
    if (hasCustomerToken()) {
      getCustomerUser()
        .then(c => {
          setCustomer(c);
          setIsLoggedIn(true);
          localStorage.setItem('customer', JSON.stringify(c));
        })
        .catch(() => {
          localStorage.removeItem('customer_token');
          localStorage.removeItem('customer');
          setCustomer(null);
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, servicesData] = await Promise.all([
          getSettings(),
          getServicesWithPackages(),
        ]);
        setSettings(settingsData);
        setServices(servicesData);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (modalService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalService]);

  const getStartingPrice = (packages: ServicePackage[]) => {
    const prices = packages.map((p) => parseFloat(p.base_price)).filter((p) => !isNaN(p));
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const sortedPackages = (packages: ServicePackage[]) => {
    return [...packages].sort((a, b) => {
      const ai = LEVEL_ORDER.indexOf(a.level);
      const bi = LEVEL_ORDER.indexOf(b.level);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  };

  const openModal = (service: ServiceWithPackages) => {
    setModalService(service);
    setActiveTab(0);
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) return;
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/quote' } });
      return;
    }
    navigate('/quote/review', { state: { serviceIds: selected } });
  };

  const selectedServices = services.filter((s) => selected.includes(s.id));
  const selectedDetails = selectedServices.map((s) => ({
    id: s.id,
    title: s.title,
    startingPrice: getStartingPrice(s.packages),
  }));

  const handleSelectPackage = (packageId: number) => {
    if (!isLoggedIn) {
      navigate('/register', { state: { from: '/quote' } });
      return;
    }
    navigate(`/quote/customize/${packageId}`);
  };

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet>
        <title>Request a Quote - {settings.site_name}</title>
        <meta name="description" content="Choose a service and package that fits your needs" />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Request a Quote
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-3xl mx-auto"
          >
            Choose a service and package that fits your needs
          </motion.p>
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm text-white"
            >
              <FiUser className="w-4 h-4" />
              <span>Register first to request a quotation</span>
              <Link to="/register" className="ml-1 font-semibold underline hover:text-white/90">Register Now</Link>
            </motion.div>
          )}
          {isLoggedIn && customer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm text-white"
            >
              <FiCheck className="w-4 h-4 text-green-300" />
              <span>Welcome back, <strong>{customer.name}</strong></span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div
                  className={`card cursor-pointer flex flex-col transition-all ${
                    selected.includes(service.id) ? 'ring-2 ring-brand-blue border-brand-blue' : ''
                  }`}
                  onClick={() => openModal(service)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center">
                      <FiPackage className="w-6 h-6 text-white" />
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSelect(service.id); }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                        selected.includes(service.id)
                          ? 'bg-brand-blue text-white border-brand-blue'
                          : 'border-neutral-300 text-neutral-600 hover:border-brand-blue hover:text-brand-blue'
                      }`}
                    >
                      {selected.includes(service.id) ? <FiCheck className="w-3.5 h-3.5" /> : <FiPlus className="w-3.5 h-3.5" />}
                      {selected.includes(service.id) ? 'Selected' : 'Select'}
                    </button>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-blue mb-2">{service.title}</h3>
                  <p className="text-sm text-neutral-500 flex-1 line-clamp-3">{service.description}</p>
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                        <FiTag className="w-4 h-4" />
                        <span>From <span className="font-semibold text-brand-blue">${getStartingPrice(service.packages).toLocaleString()}</span></span>
                      </div>
                      <span className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-full">
                        {service.packages.length} package{service.packages.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-brand-cyan font-semibold mt-3">
                      View Packages <FiArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Services Bar */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-2xl"
          >
            <div className="bg-brand-dark text-white rounded-2xl shadow-2xl border border-white/10 p-4 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                    {selected.length}
                  </span>
                  <span className="text-sm font-semibold">Service{selected.length !== 1 ? 's' : ''} selected</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDetails.slice(0, 3).map((s) => (
                    <span key={s.id} className="text-xs bg-white/10 px-2 py-0.5 rounded-full truncate max-w-[160px]">
                      {s.title}
                    </span>
                  ))}
                  {selectedDetails.length > 3 && (
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                      +{selectedDetails.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelected([])}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Clear
                </button>
                <button onClick={handleContinue} className="btn-primary text-sm !px-6">
                  {isLoggedIn ? `Continue (${selected.length})` : 'Login to Continue'} <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Package Modal */}
      <AnimatePresence>
        {modalService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-8 pt-8 pb-4 border-b border-neutral-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                        <FiPackage className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-brand-blue">{modalService.title}</h2>
                    </div>
                    {modalService.description && (
                      <p className="text-sm text-neutral-500 max-w-2xl">{modalService.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setModalService(null)}
                    className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors shrink-0"
                  >
                    <FiX className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>

                {/* Tabs */}
                {modalService.packages.length > 1 && (
                  <div className="flex gap-1 mt-6 overflow-x-auto pb-1">
                    {sortedPackages(modalService.packages).map((pkg, idx) => {
                      const isActive = activeTab === idx;
                      return (
                        <button
                          key={pkg.id}
                          onClick={() => setActiveTab(idx)}
                          className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 whitespace-nowrap ${
                            isActive
                              ? LEVEL_ACTIVE_TAB[pkg.level] || 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                              : LEVEL_TAB_COLORS[pkg.level] || 'border-neutral-200 text-neutral-500 hover:border-neutral-300'
                          }`}
                        >
                          <span className="capitalize">{pkg.level}</span>
                          <span className="ml-2 text-xs opacity-70">${parseFloat(pkg.base_price).toLocaleString()}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Body - Package Content */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                {sortedPackages(modalService.packages).map((pkg, idx) => {
                  if (activeTab !== idx) return null;
                  const items: ServicePackageItem[] = pkg.items || [];
                  const requiredItems = items.filter(i => !i.is_optional);
                  const optionalItems = items.filter(i => i.is_optional);

                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Package Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-brand-blue">{pkg.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${LEVEL_COLORS[pkg.level] || ''}`}>
                              {pkg.level}
                            </span>
                            {pkg.delivery_time && (
                              <span className="flex items-center gap-1 text-xs text-neutral-400">
                                <FiClock className="w-3 h-3" /> {pkg.delivery_time}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-brand-blue">${parseFloat(pkg.base_price).toLocaleString()}</div>
                          <span className="text-xs text-neutral-400">base price</span>
                        </div>
                      </div>

                      {pkg.description && (
                        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{pkg.description}</p>
                      )}

                      {/* Required Items */}
                      {requiredItems.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Included in Package</h4>
                          <div className="space-y-2">
                            {requiredItems.map((item) => (
                              <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-green-50/50 border border-green-100">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                                  <FiCheck className="w-3 h-3 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-neutral-800">{item.name}</p>
                                  {item.description && <p className="text-xs text-neutral-400 mt-0.5">{item.description}</p>}
                                </div>
                                <span className="text-xs text-green-600 font-medium shrink-0">Included</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Optional Items */}
                      {optionalItems.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Optional Add-ons</h4>
                          <div className="space-y-2">
                            {optionalItems.map((item) => (
                              <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                                <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center mt-0.5 shrink-0">
                                  <FiPlus className="w-3 h-3 text-neutral-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-neutral-800">{item.name}</p>
                                  {item.description && <p className="text-xs text-neutral-400 mt-0.5">{item.description}</p>}
                                </div>
                                <span className="text-sm font-semibold text-brand-blue shrink-0">${parseFloat(item.price).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {items.length === 0 && (
                        <div className="text-center py-8 text-neutral-400">
                          <FiPackage className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p className="text-sm">No items configured for this package yet.</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-5 border-t border-neutral-100 bg-neutral-50/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-500">
                    {sortedPackages(modalService.packages).length} package{sortedPackages(modalService.packages).length !== 1 ? 's' : ''} available
                  </div>
                  <button
                    onClick={() => {
                      const pkg = sortedPackages(modalService!.packages)[activeTab];
                      if (pkg) handleSelectPackage(pkg.id);
                    }}
                    className="btn-primary text-sm !py-2.5"
                  >
                    {isLoggedIn ? 'Select This Package' : 'Login to Continue'} <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-6"
          >
            Not sure which package to choose?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
          >
            Our team can help you find the perfect solution for your needs. Get in touch for a custom quote.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/contact" className="btn-primary text-lg">
              Contact Us <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}

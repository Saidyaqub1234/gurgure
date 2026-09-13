import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminQuotations, getServicesWithPackages, adminInvoices, adminCustomers } from '@/api';
import type { Quotation, ServiceWithPackages } from '@/types';
import { motion } from 'framer-motion';
import { FiEye, FiSend, FiCheck, FiX, FiFileText, FiSearch, FiFilter, FiPlus } from 'react-icons/fi';

const statusColors: Record<string, string> = {
  draft: 'bg-white/10 text-white/50',
  sent: 'bg-blue-500/20 text-blue-300',
  accepted: 'bg-green-500/20 text-green-300',
  rejected: 'bg-red-500/20 text-red-300',
  invoiced: 'bg-yellow-500/20 text-yellow-300',
};

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  sent: 'Sent',
  accepted: 'Accepted',
  rejected: 'Rejected',
  invoiced: 'Invoiced',
};

export default function AdminQuotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewModal, setViewModal] = useState<Quotation | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceWithPackages[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [quotationItems, setQuotationItems] = useState<any[]>([]);
  const [discount, setDiscount] = useState('0');
  const [tax, setTax] = useState('0');

  useEffect(() => { loadQuotations(); loadServices(); }, []);

  const loadQuotations = async () => {
    try {
      const response = await adminQuotations.getAll();
      setQuotations(response || []);
    } catch {
      toast.error('Failed to load quotations');
    } finally {
      setLoading(false);
    }
  };

  const loadServices = async () => {
    try {
      const data = await getServicesWithPackages();
      setServices(data);
    } catch {
      toast.error('Failed to load services');
    }
  };

  const loadCustomers = async (query?: string) => {
    try {
      const data = await adminCustomers.getAll({ search: query || '' });
      setCustomers(data.data || data || []);
    } catch { /* ignore */ }
  };

  const handleAction = async (id: number, action: string) => {
    setActionLoading(id);
    try {
      switch (action) {
        case 'send':
          await adminQuotations.send(id);
          toast.success('Quotation sent');
          break;
        case 'accept':
          await adminQuotations.accept(id);
          toast.success('Quotation accepted');
          break;
        case 'reject':
          await adminQuotations.reject(id);
          toast.success('Quotation rejected');
          break;
      }
      loadQuotations();
    } catch {
      toast.error(`Failed to ${action} quotation`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
    setSelectedPackage(null);
    setQuotationItems([]);
  };

  const handlePackageSelect = (packageId: number) => {
    setSelectedPackage(packageId);
    const service = services.find(s => s.id === selectedService);
    const pkg = service?.packages.find(p => p.id === packageId);
    if (pkg) {
      setQuotationItems((pkg.items || []).map((item: any) => ({
        service_id: service?.id ?? null,
        package_id: pkg.id,
        package_item_id: item.id,
        item_name: item.name,
        description: item.description || '',
        quantity: 1,
        unit_price: parseFloat(item.price) || 0,
        total_price: parseFloat(item.price) || 0,
        quantity_enabled: item.quantity_enabled,
      })));
    }
  };

  const updateItemQuantity = (index: number, qty: number) => {
    const updated = [...quotationItems];
    updated[index].quantity = qty;
    updated[index].total_price = qty * updated[index].unit_price;
    setQuotationItems(updated);
  };

  const getSubtotal = () => quotationItems.reduce((sum, item) => sum + item.total_price, 0);

  const getTotal = () => {
    const subtotal = getSubtotal();
    return subtotal - parseFloat(discount || '0') + parseFloat(tax || '0');
  };

  const handleCreateQuotation = async () => {
    if (!selectedCustomer || quotationItems.length === 0) {
      toast.error('Please select a customer and add at least one item');
      return;
    }
    setActionLoading(-1);
    try {
      const payload = {
        customer_id: selectedCustomer.id,
        service_id: selectedService,
        package_id: selectedPackage,
        items: quotationItems,
        discount: parseFloat(discount || '0'),
        tax: parseFloat(tax || '0'),
        notes: '',
      };
      await adminQuotations.create(payload);
      toast.success('Quotation created successfully');
      setShowCreate(false);
      setSelectedCustomer(null);
      setCustomerSearch('');
      setSelectedService(null);
      setSelectedPackage(null);
      setQuotationItems([]);
      setDiscount('0');
      setTax('0');
      loadQuotations();
    } catch {
      toast.error('Failed to create quotation');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = quotations.filter(q => {
    const matchesSearch = search === '' ||
      q.quotation_no.toLowerCase().includes(search.toLowerCase()) ||
      q.customer?.name.toLowerCase().includes(search.toLowerCase()) ||
      q.customer?.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === '' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Quotations</h1>
            <p className="text-white/40 mt-1">Manage customer quotations</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
            <FiPlus className="w-4 h-4" /> New Quotation
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              className="admin-input w-full pl-10"
              placeholder="Search by quotation number or customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <select
              className="admin-input pl-10 pr-8 min-w-[160px]"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Quotation No</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th className="text-center">Status</th>
                  <th>Created</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-white/30">No quotations found</td></tr>
                ) : (
                  filtered.map((q) => (
                    <motion.tr
                      key={q.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td>
                        <span className="font-mono text-sm text-white/70">{q.quotation_no}</span>
                      </td>
                      <td>
                        <p className="font-medium text-white/80">{q.customer?.name || '-'}</p>
                      </td>
                      <td className="text-white/40 text-sm">{q.customer?.email || '-'}</td>
                      <td className="text-white/60 font-mono text-sm">{q.total}</td>
                      <td className="text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[q.status] || statusColors.draft}`}>
                          {statusLabels[q.status] || q.status}
                        </span>
                      </td>
                      <td className="text-white/30 text-sm">
                        {q.created_at ? new Date(q.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => setViewModal(q)} className="p-1.5 text-brand-blue-light hover:bg-white/[0.05] rounded-lg transition-colors" title="View Details">
                            <FiEye className="w-4 h-4" />
                          </button>
                          {q.status === 'draft' && (
                            <button
                              onClick={() => handleAction(q.id!, 'send')}
                              disabled={actionLoading === q.id}
                              className="p-1.5 text-blue-400 hover:bg-blue-500/[0.1] rounded-lg transition-colors disabled:opacity-50"
                              title="Send"
                            >
                              <FiSend className="w-4 h-4" />
                            </button>
                          )}
                          {q.status === 'sent' && (
                            <>
                              <button
                                onClick={() => handleAction(q.id!, 'accept')}
                                disabled={actionLoading === q.id}
                                className="p-1.5 text-green-400 hover:bg-green-500/[0.1] rounded-lg transition-colors disabled:opacity-50"
                                title="Accept"
                              >
                                <FiCheck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleAction(q.id!, 'reject')}
                                disabled={actionLoading === q.id}
                                className="p-1.5 text-red-400 hover:bg-red-500/[0.1] rounded-lg transition-colors disabled:opacity-50"
                                title="Reject"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {q.status === 'accepted' && (
                            <span className="text-xs text-white/20 px-2">Awaiting invoice</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 overflow-y-auto" onClick={() => setShowCreate(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="admin-modal max-w-3xl w-full my-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FiFileText className="w-5 h-5" />
                New Quotation
              </h2>
              <button onClick={() => setShowCreate(false)} className="text-white/40 hover:text-white">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-white/40 mb-3">Customer</h3>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-[38px] w-4 h-4 text-white/30" />
                  <input
                    className="admin-input pl-10"
                    placeholder="Search by name or email..."
                    value={customerSearch}
                    onChange={e => {
                      setCustomerSearch(e.target.value);
                      setShowCustomerDropdown(true);
                      setSelectedCustomer(null);
                      loadCustomers(e.target.value);
                    }}
                    onFocus={() => { setShowCustomerDropdown(true); loadCustomers(customerSearch); }}
                  />
                  {showCustomerDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-[#1a2744] border border-white/10 rounded-xl max-h-48 overflow-y-auto shadow-xl">
                      {customers.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-white/30">No customers found</div>
                      ) : (
                        customers.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              setSelectedCustomer(c);
                              setCustomerSearch(c.name);
                              setShowCustomerDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-white/[0.05] transition-colors border-b border-white/[0.04] last:border-0"
                          >
                            <p className="text-sm text-white/80 font-medium">{c.name}</p>
                            <p className="text-xs text-white/40">{c.email}{c.organization_name ? ` · ${c.organization_name}` : ''}</p>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                  {selectedCustomer && (
                    <p className="text-xs text-green-400 mt-1">Selected: {selectedCustomer.name} ({selectedCustomer.email})</p>
                  )}
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-6">
                <h3 className="text-sm font-medium text-white/40 mb-3">Service & Package</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Service</label>
                    <select className="admin-input" value={selectedService ?? ''} onChange={e => handleServiceSelect(Number(e.target.value))}>
                      <option value="">Select a service</option>
                      {services.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="admin-label">Package</label>
                    <select className="admin-input" value={selectedPackage ?? ''} onChange={e => handlePackageSelect(Number(e.target.value))} disabled={!selectedService}>
                      <option value="">Select a package</option>
                      {selectedService && services.find(s => s.id === selectedService)?.packages.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (${parseFloat(p.base_price).toLocaleString()})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {quotationItems.length > 0 && (
                <div className="border-t border-white/[0.06] pt-6">
                  <h3 className="text-sm font-medium text-white/40 mb-3">Line Items</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          <th className="text-left pb-2 text-white/30 font-medium">Item</th>
                          <th className="text-center pb-2 text-white/30 font-medium">Qty</th>
                          <th className="text-right pb-2 text-white/30 font-medium">Unit Price</th>
                          <th className="text-right pb-2 text-white/30 font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {quotationItems.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-2">
                              <p className="text-white/70">{item.item_name}</p>
                              {item.description && <p className="text-white/30 text-xs">{item.description}</p>}
                            </td>
                            <td className="text-center">
                              {item.quantity_enabled !== false ? (
                                <input
                                  type="number"
                                  min={1}
                                  className="admin-input w-20 text-center"
                                  value={item.quantity}
                                  onChange={e => updateItemQuantity(idx, Math.max(1, parseInt(e.target.value) || 1))}
                                />
                              ) : (
                                <span className="text-white/50">{item.quantity}</span>
                              )}
                            </td>
                            <td className="text-right text-white/50 font-mono">{parseFloat(item.unit_price).toLocaleString()}</td>
                            <td className="text-right text-white/60 font-mono">{(item.quantity * item.unit_price).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="admin-label">Discount</label>
                      <input className="admin-input" type="number" min={0} value={discount} onChange={e => setDiscount(e.target.value)} />
                    </div>
                    <div>
                      <label className="admin-label">Tax</label>
                      <input className="admin-input" type="number" min={0} value={tax} onChange={e => setTax(e.target.value)} />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 pt-4 border-t border-white/[0.06]">
                    <div className="text-right">
                      <p className="text-sm text-white/40">Subtotal: <span className="text-white/60 font-mono">${getSubtotal().toLocaleString()}</span></p>
                      {parseFloat(discount) > 0 && <p className="text-sm text-white/40">Discount: <span className="text-red-400 font-mono">-${parseFloat(discount).toLocaleString()}</span></p>}
                      {parseFloat(tax) > 0 && <p className="text-sm text-white/40">Tax: <span className="text-white/60 font-mono">+${parseFloat(tax).toLocaleString()}</span></p>}
                      <p className="text-lg font-bold text-white">Total: ${getTotal().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setShowCreate(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={handleCreateQuotation} disabled={actionLoading === -1} className="px-5 py-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-light text-sm font-medium disabled:opacity-50 flex items-center gap-2">
                {actionLoading === -1 && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Create Quotation
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setViewModal(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="admin-modal max-w-3xl max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FiFileText className="w-5 h-5" />
                Quotation {viewModal.quotation_no}
              </h2>
              <button onClick={() => setViewModal(null)} className="text-white/40 hover:text-white">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03]">
                  <h3 className="text-sm font-medium text-white/40 mb-2">Customer</h3>
                  <p className="text-white/80 font-medium">{viewModal.customer?.name}</p>
                  <p className="text-white/40 text-sm">{viewModal.customer?.organization_name}</p>
                  <p className="text-white/40 text-sm">{viewModal.customer?.email}</p>
                  <p className="text-white/40 text-sm">{viewModal.customer?.phone}</p>
                  {viewModal.customer?.address && (
                    <p className="text-white/40 text-sm">{viewModal.customer?.address}</p>
                  )}
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03]">
                  <h3 className="text-sm font-medium text-white/40 mb-2">Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-white/40">Subtotal</span><span className="text-white/60 font-mono">{viewModal.subtotal}</span></div>
                    {viewModal.discount && <div className="flex justify-between"><span className="text-white/40">Discount</span><span className="text-red-400 font-mono">-{viewModal.discount}</span></div>}
                    {viewModal.tax && <div className="flex justify-between"><span className="text-white/40">Tax</span><span className="text-white/60 font-mono">{viewModal.tax}</span></div>}
                    <div className="flex justify-between pt-2 border-t border-white/[0.06]"><span className="text-white/60 font-medium">Total</span><span className="text-white font-mono font-bold">{viewModal.total}</span></div>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[viewModal.status] || statusColors.draft}`}>
                      {statusLabels[viewModal.status] || viewModal.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white/40 mb-3">Line Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left pb-2 text-white/30 font-medium">Item</th>
                        <th className="text-center pb-2 text-white/30 font-medium">Qty</th>
                        <th className="text-right pb-2 text-white/30 font-medium">Unit Price</th>
                        <th className="text-right pb-2 text-white/30 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {viewModal.items?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-2">
                            <p className="text-white/70">{item.item_name}</p>
                            {item.description && <p className="text-white/30 text-xs">{item.description}</p>}
                          </td>
                          <td className="text-center text-white/50">{item.quantity}</td>
                          <td className="text-right text-white/50 font-mono">{item.unit_price}</td>
                          <td className="text-right text-white/60 font-mono">{item.total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {viewModal.notes && (
                <div className="p-4 rounded-xl bg-white/[0.03]">
                  <h3 className="text-sm font-medium text-white/40 mb-1">Notes</h3>
                  <p className="text-white/60 text-sm">{viewModal.notes}</p>
                </div>
              )}

              {viewModal.valid_until && (
                <p className="text-xs text-white/30">Valid until: {new Date(viewModal.valid_until).toLocaleDateString()}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setViewModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}

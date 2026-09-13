import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminPackages, adminServices, adminPackageItems } from '@/api';
import type { ServicePackage, Service, ServicePackageItem } from '@/types';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiPackage } from 'react-icons/fi';

const emptyForm = { service_id: '', name: '', level: 'basic', description: '', base_price: '', delivery_time: '', is_active: true };
const levels = ['basic', 'silver', 'gold', 'platinum'];

const levelColors: Record<string, string> = {
  basic: 'bg-white/10 text-white/60',
  silver: 'bg-gray-500/20 text-white/50',
  gold: 'bg-yellow-500/20 text-yellow-300',
  platinum: 'bg-purple-500/20 text-purple-300',
};

import TranslationFields from '@/components/admin/TranslationFields';

export default function AdminPackages() {
  const [services, setServices] = useState<Service[]>([]);
  const [groupedPackages, setGroupedPackages] = useState<Record<number, ServicePackage[]>>({});
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [packageItems, setPackageItems] = useState<ServicePackageItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ServicePackage | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadPackageItems = async (pkg: ServicePackage) => {
    setLoadingItems(true);
    try {
      const items = await adminPackageItems.getAll({ package_id: pkg.id });
      setPackageItems(items);
      setSelectedPackage(pkg);
    } catch {
      toast.error('Failed to load package items');
    } finally {
      setLoadingItems(false);
    }
  };

  const loadData = async () => {
    try {
      const [servicesData, packagesData] = await Promise.all([
        adminServices.getAll(),
        adminPackages.getAll(),
      ]);
      setServices(servicesData);
      const grouped: Record<number, ServicePackage[]> = {};
      for (const pkg of packagesData) {
        if (!grouped[pkg.service_id]) grouped[pkg.service_id] = [];
        grouped[pkg.service_id].push(pkg);
      }
      setGroupedPackages(grouped);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, service_id: services[0]?.id || '' });
    setShowModal(true);
  };

  const openEdit = (pkg: ServicePackage) => {
    setEditing(pkg);
    setForm({ translations: ((pkg) as any).translations || {},
      service_id: pkg.service_id,
      name: pkg.name,
      level: pkg.level,
      description: pkg.description || '',
      base_price: pkg.base_price,
      delivery_time: pkg.delivery_time || '',
      is_active: pkg.is_active,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.base_price) {
      toast.error('Name and base price are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await adminPackages.update(editing.id, form);
        toast.success('Package updated');
      } else {
        await adminPackages.create(form);
        toast.success('Package created');
      }
      setShowModal(false);
      loadData();
    } catch {
      toast.error('Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this package?')) return;
    try {
      await adminPackages.delete(id);
      toast.success('Package deleted');
      loadData();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Packages</h1>
            <p className="text-white/40 mt-1">Manage service packages and pricing tiers</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
            <FiPlus className="w-4 h-4" /> New Package
          </button>
        </div>

        <div className="space-y-6">
          {services.length === 0 ? (
            <div className="admin-table">
              <p className="px-6 py-12 text-center text-white/30">No services found. Create a service first.</p>
            </div>
          ) : (
            services.map((service) => {
              const packages = groupedPackages[service.id] || [];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="admin-table"
                >
                  <div className="px-6 py-3 border-b border-white/[0.06] flex items-center gap-2">
                    <span className="text-lg">{service.icon}</span>
                    <h3 className="font-heading font-semibold text-white/80">{service.title}</h3>
                    <span className="text-xs text-white/30 ml-auto">{packages.length} package{packages.length !== 1 ? 's' : ''}</span>
                  </div>
                  {packages.length === 0 ? (
                    <p className="px-6 py-6 text-sm text-white/25">No packages for this service</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Base Price</th>
                            <th>Delivery Time</th>
                            <th className="text-center">Status</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {packages.map((pkg) => (
                            <>
                              <tr key={pkg.id} className={selectedPackage?.id === pkg.id ? 'bg-white/[0.03]' : ''}>
                                <td>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => selectedPackage?.id === pkg.id ? setSelectedPackage(null) : loadPackageItems(pkg)}
                                      className="p-1 text-white/40 hover:text-white transition-colors"
                                      title={selectedPackage?.id === pkg.id ? 'Hide items' : 'Show items'}
                                    >
                                      <svg className={`w-4 h-4 transition-transform ${selectedPackage?.id === pkg.id ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </button>
                                    <div>
                                      <p className="font-medium text-white/80">{pkg.name}</p>
                                      {pkg.description && (
                                        <p className="text-xs text-white/30 mt-0.5 truncate max-w-xs">{pkg.description}</p>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${levelColors[pkg.level] || levelColors.basic}`}>
                                    {pkg.level}
                                  </span>
                                </td>
                                <td className="text-white/60 font-mono text-sm">{pkg.base_price}</td>
                                <td className="text-white/40 text-sm">{pkg.delivery_time || '-'}</td>
                                <td className="text-center">
                                  <span className={pkg.is_active ? 'admin-badge-published' : 'admin-badge-draft'}>
                                    {pkg.is_active ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td className="text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => openEdit(pkg)} className="p-1.5 text-brand-blue-light hover:bg-white/[0.05] rounded-lg transition-colors" title="Edit">
                                      <FiEdit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(pkg.id)} className="p-1.5 text-red-400 hover:bg-red-500/[0.1] rounded-lg transition-colors" title="Delete">
                                      <FiTrash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {selectedPackage?.id === pkg.id && (
                                <tr key={`${pkg.id}-items`}>
                                  <td colSpan={6} className="bg-white/[0.02] px-6 py-4">
                                    {loadingItems ? (
                                      <p className="text-sm text-white/30">Loading items...</p>
                                    ) : packageItems.length === 0 ? (
                                      <p className="text-sm text-white/25">No items in this package</p>
                                    ) : (
                                      <div className="space-y-2">
                                        <h4 className="text-sm font-semibold text-white/60 mb-2">Package Items ({packageItems.length})</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                          {packageItems.map((item) => (
                                            <div key={item.id} className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                                              <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white/70 truncate">{item.name}</p>
                                                {item.description && <p className="text-xs text-white/30 truncate">{item.description}</p>}
                                                <div className="flex items-center gap-2 mt-1">
                                                  <span className="text-xs font-mono text-white/50">{item.price}</span>
                                                  <span className="text-xs text-white/25">· {item.pricing_type}</span>
                                                  {item.is_optional && <span className="text-xs text-yellow-400/60">optional</span>}
                                                </div>
                                              </div>
                                              <span className={`text-xs px-2 py-0.5 rounded ${item.is_active ? 'bg-green-500/10 text-green-400/60' : 'bg-red-500/10 text-red-400/80'}`}>
                                                {item.is_active ? 'Active' : 'Inactive'}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="admin-modal max-w-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FiPackage className="w-5 h-5" />
                {editing ? 'Edit Package' : 'New Package'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="admin-label">Service</label>
                <select
                  className="admin-input"
                  value={form.service_id}
                  onChange={e => setForm({ ...form, service_id: e.target.value })}
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Name</label>
                  <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Package name" />
                </div>
                <div>
                  <label className="admin-label">Level</label>
                  <select className="admin-input" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                    {levels.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea className="admin-input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Package description" rows={2} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Base Price</label>
                  <input className="admin-input" value={form.base_price} onChange={e => setForm({ ...form, base_price: e.target.value })} placeholder="0.00" />
                </div>
                <div>
                  <label className="admin-label">Delivery Time</label>
                  <input className="admin-input" value={form.delivery_time} onChange={e => setForm({ ...form, delivery_time: e.target.value })} placeholder="e.g. 5 days" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_active" className="text-sm font-medium text-white/70">Active</label>
              </div>
            </div>
                          <TranslationFields
                fields={[
                  { name: 'name', label: 'Name' },
                  { name: 'description', label: 'Description', type: 'textarea' as const },
                  { name: 'delivery_time', label: 'Delivery Time' },
                ]}
                value={form.translations}
                onChange={(tr) => setForm({ ...form, translations: tr })}
              />
<div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={handleSubmit} disabled={saving} className="px-5 py-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-light text-sm font-medium disabled:opacity-50 flex items-center gap-2">
                {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {editing ? 'Update' : 'Create'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}

import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminPackageItems, adminPackages } from '@/api';
import type { ServicePackageItem, ServicePackage } from '@/types';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { MdOutlineInventory2 } from 'react-icons/md';

const emptyForm = { package_id: '', name: '', description: '', price: '', pricing_type: 'fixed', quantity_enabled: false, is_optional: false, is_active: true };
const pricingTypes = ['fixed', 'per_unit', 'monthly', 'daily', 'custom'];

import TranslationFields from '@/components/admin/TranslationFields';

export default function AdminPackageItems() {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [items, setItems] = useState<ServicePackageItem[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ServicePackageItem | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadPackages(); }, []);

  const loadPackages = async () => {
    try {
      const data = await adminPackages.getAll();
      setPackages(data);
      if (data.length > 0) {
        setSelectedPackageId(String(data[0].id));
      }
    } catch {
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPackageId) loadItems();
  }, [selectedPackageId]);

  const loadItems = async () => {
    if (!selectedPackageId) return;
    try {
      const data = await adminPackageItems.getAll({ package_id: selectedPackageId });
      setItems(data);
    } catch {
      toast.error('Failed to load items');
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, package_id: selectedPackageId });
    setShowModal(true);
  };

  const openEdit = (item: ServicePackageItem) => {
    setEditing(item);
    setForm({ translations: ((item) as any).translations || {},
      package_id: item.package_id,
      name: item.name,
      description: item.description || '',
      price: item.price,
      pricing_type: item.pricing_type,
      quantity_enabled: item.quantity_enabled,
      is_optional: item.is_optional,
      is_active: item.is_active,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.price) {
      toast.error('Name and price are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await adminPackageItems.update(editing.id, form);
        toast.success('Item updated');
      } else {
        await adminPackageItems.create(form);
        toast.success('Item created');
      }
      setShowModal(false);
      loadItems();
    } catch {
      toast.error('Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return;
    try {
      await adminPackageItems.delete(id);
      toast.success('Item deleted');
      loadItems();
    } catch {
      toast.error('Delete failed');
    }
  };

  const selectedPackage = packages.find(p => String(p.id) === selectedPackageId);

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Package Items</h1>
            <p className="text-white/40 mt-1">Manage items within service packages</p>
          </div>
          <button
            onClick={openCreate}
            disabled={!selectedPackageId}
            className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50"
          >
            <FiPlus className="w-4 h-4" /> New Item
          </button>
        </div>

        <div className="admin-table">
          <div className="px-6 py-3 border-b border-white/[0.06]">
            <label className="text-sm text-white/40 mb-2 block">Select Package</label>
            <select
              className="admin-input w-full max-w-md"
              value={selectedPackageId}
              onChange={e => setSelectedPackageId(e.target.value)}
            >
              {packages.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.level})</option>
              ))}
            </select>
          </div>

          {selectedPackage && (
            <div className="px-6 py-2 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="text-sm text-white/50">
                Package: <span className="text-white/80 font-medium">{selectedPackage.name}</span>
                <span className="ml-2 capitalize px-2 py-0.5 rounded bg-white/10 text-white/60 text-xs">{selectedPackage.level}</span>
              </span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pricing Type</th>
                  <th>Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Optional</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {items.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-white/30">No items for this package</td></tr>
                ) : (
                  items.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white/80">{item.name}</p>
                          {item.is_optional && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">Optional</span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-white/30 mt-0.5 truncate max-w-xs">{item.description}</p>
                        )}
                      </td>
                      <td>
                        <span className="text-sm text-white/50 capitalize">{item.pricing_type.replace('_', ' ')}</span>
                      </td>
                      <td className="text-white/60 font-mono text-sm">{item.price}</td>
                      <td className="text-center">
                        <span className={item.quantity_enabled ? 'text-green-400' : 'text-white/20'}>
                          {item.quantity_enabled ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={item.is_optional ? 'text-amber-400' : 'text-white/20'}>
                          {item.is_optional ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={item.is_active ? 'admin-badge-published' : 'admin-badge-draft'}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(item)} className="p-1.5 text-brand-blue-light hover:bg-white/[0.05] rounded-lg transition-colors" title="Edit">
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-400 hover:bg-red-500/[0.1] rounded-lg transition-colors" title="Delete">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
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
                <MdOutlineInventory2 className="w-5 h-5" />
                {editing ? 'Edit Item' : 'New Item'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="admin-label">Package</label>
                <select
                  className="admin-input"
                  value={form.package_id}
                  onChange={e => setForm({ ...form, package_id: e.target.value })}
                >
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.level})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Name</label>
                  <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Item name" />
                </div>
                <div>
                  <label className="admin-label">Price</label>
                  <input className="admin-input" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea className="admin-input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Item description" rows={2} />
              </div>
              <div>
                <label className="admin-label">Pricing Type</label>
                <select className="admin-input" value={form.pricing_type} onChange={e => setForm({ ...form, pricing_type: e.target.value })}>
                  {pricingTypes.map(t => <option key={t} value={t}>{t.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="quantity_enabled" checked={form.quantity_enabled} onChange={e => setForm({ ...form, quantity_enabled: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-blue-light focus:ring-brand-blue-light" />
                  <label htmlFor="quantity_enabled" className="text-sm font-medium text-white/70">Quantity Enabled</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="is_optional" checked={form.is_optional} onChange={e => setForm({ ...form, is_optional: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-blue-light focus:ring-brand-blue-light" />
                  <label htmlFor="is_optional" className="text-sm font-medium text-white/70">Optional Item</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-blue-light focus:ring-brand-blue-light" />
                  <label htmlFor="is_active" className="text-sm font-medium text-white/70">Active</label>
                </div>
              </div>
            </div>
                          <TranslationFields
                fields={[
                  { name: 'name', label: 'Name' },
                  { name: 'description', label: 'Description', type: 'textarea' as const },
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

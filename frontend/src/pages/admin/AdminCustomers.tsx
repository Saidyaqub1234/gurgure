import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminCustomers } from '@/api';
import type { Customer } from '@/types';
import { FiSearch } from 'react-icons/fi';

const emptyForm = { name: '', organization_name: '', email: '', phone: '', address: '', password: '' };

export default function AdminCustomers() {
  const [items, setItems] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminCustomers.getAll({ search });
      setItems(data);
    } catch { toast.error('Failed to load customers'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setShowModal(true); };

  const openEdit = (item: Customer) => {
    setEditing(item);
    setForm({
      name: item.name, organization_name: item.organization_name,
      email: item.email, phone: item.phone, address: item.address,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (editing) {
        await adminCustomers.update(editing.id, form);
        toast.success('Customer updated');
      } else {
        await adminCustomers.create(form);
        toast.success('Customer created');
      }
      setShowModal(false);
      loadItems();
    } catch (e: any) {
      const msg = e?.response?.data?.message || e?.response?.data?.errors?.email?.[0] || 'Operation failed';
      toast.error(msg);
    }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this customer and all their quotations/invoices?')) return;
    try {
      await adminCustomers.delete(id);
      toast.success('Customer deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    loadItems();
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Customers</h1>
            <p className="text-white/40 mt-1">Manage registered customers</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Customer</button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
            <input
              className="admin-input pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, phone..."
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-xl bg-white/[0.05] text-white/60 hover:text-white hover:bg-white/[0.1] text-sm transition-all">Search</button>
        </form>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Organization</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-white/30">No customers found</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td><p className="font-medium text-white/80">{item.name}</p></td>
                    <td className="text-white/50 text-sm">{item.organization_name || '-'}</td>
                    <td className="text-white/60 text-sm">{item.email}</td>
                    <td className="text-white/50 text-sm">{item.phone || '-'}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="px-3 py-1.5 text-xs font-medium text-brand-blue-light hover:bg-white/[0.05] rounded-lg transition-colors">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/[0.1] rounded-lg transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowModal(false)}>
          <div className="admin-modal max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Customer' : 'New Customer'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Name *</label>
                  <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
                </div>
                <div>
                  <label className="admin-label">Organization</label>
                  <input className="admin-input" value={form.organization_name} onChange={e => setForm({ ...form, organization_name: e.target.value })} placeholder="Company name" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Email *</label>
                  <input type="email" className="admin-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
                </div>
                <div>
                  <label className="admin-label">Phone</label>
                  <input className="admin-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+93 700 000 000" />
                </div>
              </div>
              <div>
                <label className="admin-label">Address</label>
                <textarea className="admin-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" rows={2} />
              </div>
              {!editing && (
                <div>
                  <label className="admin-label">Password *</label>
                  <input type="password" className="admin-input" value={form.password || ''} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" />
                  <p className="text-xs text-white/30 mt-1">Customer will use this to log in to the portal</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={handleSubmit} disabled={saving} className="px-5 py-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-light text-sm font-medium disabled:opacity-50 flex items-center gap-2">
                {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {editing ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

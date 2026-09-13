import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminClients, uploadFile } from '@/api';
import type { Client } from '@/types';

const emptyForm = { name: '', slug: '', description: '', website: '', sector: '', order: 0, is_published: true };

import TranslationFields from '@/components/admin/TranslationFields';

export default function AdminClients() {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminClients.getAll();
      setItems(data);
    } catch { toast.error('Failed to load clients'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm, order: items.length + 1 }); setLogoFile(null); setShowModal(true); };

  const openEdit = (item: Client) => {
    setEditing(item);
    setForm({ translations: ((item) as any).translations || {},
      name: item.name, slug: item.slug, description: item.description,
      website: item.website, sector: item.sector, order: item.order, is_published: item.is_published,
    });
    setLogoFile(null);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      let payload = { ...form };
      if (logoFile) {
        const uploaded = await uploadFile(logoFile);
        payload.logo = uploaded.url;
      }
      if (editing) {
        await adminClients.update(editing.id, payload);
        toast.success('Client updated');
      } else {
        await adminClients.create(payload);
        toast.success('Client created');
      }
      setShowModal(false);
      loadItems();
    } catch { toast.error('Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this client?')) return;
    try {
      await adminClients.delete(id);
      toast.success('Client deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Clients</h1>
            <p className="text-white/40 mt-1">Manage client logos and info</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Client</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sector</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-white/30">No clients found</td></tr>
                ) : items.sort((a, b) => a.order - b.order).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {item.logo && (
                          <img src={item.logo} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-white/5" />
                        )}
                        <p className="font-medium text-white/80">{item.name}</p>
                      </div>
                    </td>
                    <td className="text-sm text-white/50">{item.sector}</td>
                    <td className="text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.is_published ? 'admin-badge-published' : 'admin-badge-draft'}`}>
                        {item.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
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
          <div className="admin-modal max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Client' : 'New Client'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Name</label>
                  <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Client name" />
                </div>
                <div>
                  <label className="admin-label">Slug</label>
                  <input className="admin-input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="client-slug" />
                </div>
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea className="admin-input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="About client" rows={2} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Website</label>
                  <input className="admin-input" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://example.com" />
                </div>
                <div>
                  <label className="admin-label">Sector</label>
                  <input className="admin-input" value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })} placeholder="e.g. Technology" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Logo</label>
                  <input type="file" accept="image/*" className="admin-input" onChange={e => setLogoFile(e.target.files?.[0] || null)} />
                </div>
                <div>
                  <label className="admin-label">Order</label>
                  <input type="number" className="admin-input" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
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
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

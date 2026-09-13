import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminServices, uploadFile } from '@/api';
import type { Service } from '@/types';
import TranslationFields from '@/components/admin/TranslationFields';

const categories = ['development', 'branding', 'digital', 'training', 'education', 'enterprise', 'services'];
const emptyForm = { title: '', slug: '', description: '', icon: '', category: '', items: [] as string[], order: 0, is_published: true, translations: {} as Record<string, any> };

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminServices.getAll();
      setItems(data);
    } catch { toast.error('Failed to load services'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm, order: items.length + 1 }); setImageFile(null); setShowModal(true); };

  const openEdit = (item: Service) => {
    setEditing(item);
    setForm({
      title: item.title, slug: item.slug, description: item.description,
      icon: item.icon, category: item.category || '', items: [...(item.items || [])], order: item.order, is_published: item.is_published,
      translations: (item as any).translations || {},
    });
    setImageFile(null);
    setShowModal(true);
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    setForm({ ...form, items: [...form.items, newItemText.trim()] });
    setNewItemText('');
  };

  const removeItem = (index: number) => {
    setForm({ ...form, items: form.items.filter((_: any, i: number) => i !== index) });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const arr = [...form.items];
    const swap = direction === 'up' ? index - 1 : index + 1;
    if (swap < 0 || swap >= arr.length) return;
    [arr[index], arr[swap]] = [arr[swap], arr[index]];
    setForm({ ...form, items: arr });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      let payload = { ...form };
      if (imageFile) {
        const uploaded = await uploadFile(imageFile);
        payload.image = uploaded.url;
      }
      if (editing) {
        await adminServices.update(editing.id, payload);
        toast.success('Service updated');
      } else {
        await adminServices.create(payload);
        toast.success('Service created');
      }
      setShowModal(false);
      loadItems();
    } catch { toast.error('Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    try {
      await adminServices.delete(id);
      toast.success('Service deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  const handleReorder = async (item: Service, direction: 'up' | 'down') => {
    const sorted = [...items].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex(i => i.id === item.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const swapped = sorted[swapIdx];
    try {
      await adminServices.update(item.id, { order: swapped.order } as any);
      await adminServices.update(swapped.id, { order: item.order } as any);
      toast.success('Reordered');
      loadItems();
    } catch { toast.error('Reorder failed'); }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Services</h1>
            <p className="text-white/40 mt-1">Manage your services</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Service</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                  <tr>
                    <th>Title</th>
                    <th>Icon</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Order</th>
                    <th className="text-center">Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {items.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-white/30">No services found</td></tr>
                ) : items.sort((a, b) => a.order - b.order).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <p className="font-medium text-white/80">{item.title}</p>
                    </td>
                    <td>
                      <span className="text-2xl">{item.icon}</span>
                    </td>
                    <td className="text-center">
                      {item.category ? (
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium capitalize bg-white/10 text-white/60">{item.category}</span>
                      ) : (
                        <span className="text-xs text-white/20">—</span>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => handleReorder(item, 'up')} className="p-1 text-white/30 hover:text-brand-blue-light" title="Move up">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                        </button>
                        <span className="text-sm text-white/50 font-mono w-6 text-center">{item.order}</span>
                        <button onClick={() => handleReorder(item, 'down')} className="p-1 text-white/30 hover:text-brand-blue-light" title="Move down">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className={item.is_published ? 'admin-badge-published' : 'admin-badge-draft'}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setShowModal(false)}>
          <div className="admin-modal max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Title</label>
                  <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Service title" />
                </div>
                <div>
                  <label className="admin-label">Slug</label>
                  <input className="admin-input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="service-slug" />
                </div>
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea className="admin-input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Service description" rows={3} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Icon (emoji)</label>
                  <input className="admin-input" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="🔧" maxLength={10} />
                </div>
                <div>
                  <label className="admin-label">Category (page)</label>
                  <select className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="">None (shows on /services only)</option>
                    {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Order</label>
                  <input type="number" className="admin-input" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="admin-label">Image</label>
                  <input type="file" accept="image/*" className="admin-input" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div>
                <label className="admin-label mb-2">Service Items</label>
                <div className="flex gap-2 mb-2">
                  <input className="admin-input flex-1" value={newItemText} onChange={e => setNewItemText(e.target.value)} placeholder="Add an item" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addItem())} />
                  <button onClick={addItem} className="px-4 py-2 rounded-xl bg-brand-blue text-white text-sm hover:bg-brand-blue-light shrink-0">Add</button>
                </div>
                {form.items.length > 0 && (
                  <div className="space-y-1.5">
                    {form.items.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03]">
                        <span className="text-xs text-white/30 font-mono w-5">{i + 1}.</span>
                        <span className="flex-1 text-sm text-white/70">{item}</span>
                        <div className="flex gap-0.5">
                          <button onClick={() => moveItem(i, 'up')} disabled={i === 0} className="p-1 text-white/30 hover:text-brand-blue-light disabled:opacity-30"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></button>
                          <button onClick={() => moveItem(i, 'down')} disabled={i === form.items.length - 1} className="p-1 text-white/30 hover:text-brand-blue-light disabled:opacity-30"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                          <button onClick={() => removeItem(i)} className="p-1 text-white/30 hover:text-red-400"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <TranslationFields
                fields={[
                  { name: 'title', label: 'Title' },
                  { name: 'description', label: 'Description', type: 'textarea' },
                ]}
                value={form.translations}
                onChange={(tr) => setForm({ ...form, translations: tr })}
              />
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
              </div>
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

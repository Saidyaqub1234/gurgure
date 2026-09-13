import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminTestimonials, uploadFile } from '@/api';
import type { Testimonial } from '@/types';

const emptyForm = { name: '', position: '', company: '', content: '', rating: 5, is_published: true };

import TranslationFields from '@/components/admin/TranslationFields';

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminTestimonials.getAll();
      setItems(data);
    } catch { toast.error('Failed to load testimonials'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setAvatarFile(null); setShowModal(true); };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({ translations: ((item) as any).translations || {},
      name: item.name, position: item.position, company: item.company,
      content: item.content, rating: item.rating, is_published: item.is_published,
    });
    setAvatarFile(null);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      let payload = { ...form };
      if (avatarFile) {
        const uploaded = await uploadFile(avatarFile);
        payload.avatar = uploaded.url;
      }
      if (editing) {
        await adminTestimonials.update(editing.id, payload);
        toast.success('Testimonial updated');
      } else {
        await adminTestimonials.create(payload);
        toast.success('Testimonial created');
      }
      setShowModal(false);
      loadItems();
    } catch { toast.error('Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await adminTestimonials.delete(id);
      toast.success('Testimonial deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && setForm({ ...form, rating: i + 1 })}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
      >
        <svg className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Testimonials</h1>
            <p className="text-white/40 mt-1">Manage client testimonials</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Testimonial</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th className="text-center">Rating</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-white/30">No testimonials found</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {item.avatar && (
                          <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover bg-white/5" />
                        )}
                        <div>
                          <p className="font-medium text-white/80">{item.name}</p>
                          <p className="text-xs text-white/30">{item.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-white/50">{item.company}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        {renderStars(item.rating)}
                      </div>
                    </td>
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
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
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
                  <label className="admin-label">Position</label>
                  <input className="admin-input" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} placeholder="Job title" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Company</label>
                  <input className="admin-input" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
                </div>
                <div>
                  <label className="admin-label">Avatar</label>
                  <input type="file" accept="image/*" className="admin-input" onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div>
                <label className="admin-label">Content</label>
                <textarea className="admin-input" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Testimonial text" rows={3} />
              </div>
              <div>
                <label className="admin-label mb-2">Rating</label>
                <div className="flex gap-1">{renderStars(form.rating, true)}</div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
              </div>
            </div>
                          <TranslationFields
                fields={[
                  { name: 'name', label: 'Name' },
                  { name: 'position', label: 'Position' },
                  { name: 'content', label: 'Content', type: 'textarea' as const },
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

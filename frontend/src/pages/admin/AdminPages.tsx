import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import RichEditor from '@/components/RichEditor';
import { adminPages } from '@/api';
import type { Page } from '@/types';

const emptyForm = { title: '', slug: '', content: '', meta_title: '', meta_description: '', is_published: true };

import TranslationFields from '@/components/admin/TranslationFields';

export default function AdminPages() {
  const [items, setItems] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminPages.getAll();
      setItems(data);
    } catch { toast.error('Failed to load pages'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setShowModal(true); };

  const openEdit = (item: Page) => {
    setEditing(item);
    setForm({ translations: ((item) as any).translations || {},
      title: item.title,
      slug: item.slug,
      content: item.content,
      meta_title: item.meta_title || '',
      meta_description: item.meta_description || '',
      is_published: item.is_published,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (editing) {
        await adminPages.update(editing.id, form);
        toast.success('Page updated');
      } else {
        await adminPages.create(form);
        toast.success('Page created');
      }
      setShowModal(false);
      loadItems();
    } catch { toast.error('Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this page?')) return;
    try {
      await adminPages.delete(id);
      toast.success('Page deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Pages</h1>
            <p className="text-white/40 mt-1">Manage website pages</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Page</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-white/30">No pages found</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <p className="font-medium text-white/80">{item.title}</p>
                    </td>
                    <td>
                      <code className="text-sm text-white/40 bg-white/[0.06] px-2 py-0.5 rounded">{item.slug}</code>
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
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Page' : 'New Page'}</h2>
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
                  <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Page title" />
                </div>
                <div>
                  <label className="admin-label">Slug</label>
                  <input className="admin-input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="page-slug" />
                </div>
              </div>
              <div>
                <label className="admin-label">Content</label>
                <RichEditor value={form.content} onChange={value => setForm({ ...form, content: value })} placeholder="Page content..." minHeight={250} theme="dark" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Meta Title</label>
                  <input className="admin-input" value={form.meta_title} onChange={e => setForm({ ...form, meta_title: e.target.value })} placeholder="SEO title" />
                </div>
                <div>
                  <label className="admin-label">Meta Description</label>
                  <input className="admin-input" value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })} placeholder="SEO description" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
              </div>
            </div>
                          <TranslationFields
                fields={[
                  { name: 'title', label: 'Title' },
                  { name: 'content', label: 'Content', type: 'textarea' as const },
                  { name: 'meta_title', label: 'Meta Title' },
                  { name: 'meta_description', label: 'Meta Description', type: 'textarea' as const },
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

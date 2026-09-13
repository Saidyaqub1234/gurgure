import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminBlogs, uploadFile } from '@/api';
import type { Blog } from '@/types';

const emptyForm = { title: '', slug: '', excerpt: '', content: '', author: '', is_published: true };

import TranslationFields from '@/components/admin/TranslationFields';

export default function AdminBlogs() {
  const [items, setItems] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminBlogs.getAll();
      setItems(data);
    } catch { toast.error('Failed to load blogs'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setImageFile(null); setShowModal(true); };

  const openEdit = (item: Blog) => {
    setEditing(item);
    setForm({ translations: ((item) as any).translations || {},
      title: item.title, slug: item.slug, excerpt: item.excerpt,
      content: item.content, author: item.author, is_published: item.is_published,
    });
    setImageFile(null);
    setShowModal(true);
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
        await adminBlogs.update(editing.id, payload);
        toast.success('Blog updated');
      } else {
        await adminBlogs.create(payload);
        toast.success('Blog created');
      }
      setShowModal(false);
      loadItems();
    } catch { toast.error('Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await adminBlogs.delete(id);
      toast.success('Blog deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Blog Posts</h1>
            <p className="text-white/40 mt-1">Manage blog articles</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Blog</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-white/30">No blogs found</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <p className="font-medium text-white/80">{item.title}</p>
                    </td>
                    <td className="text-sm text-white/50">{item.author}</td>
                    <td className="text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.is_published ? 'admin-badge-published' : 'admin-badge-draft'}`}>
                        {item.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="text-right text-sm text-white/40">
                      {new Date(item.created_at).toLocaleDateString()}
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
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Blog' : 'New Blog'}</h2>
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
                  <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Blog title" />
                </div>
                <div>
                  <label className="admin-label">Slug</label>
                  <input className="admin-input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="blog-slug" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Author</label>
                  <input className="admin-input" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Author name" />
                </div>
                <div>
                  <label className="admin-label">Image</label>
                  <input type="file" accept="image/*" className="admin-input" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div>
                <label className="admin-label">Excerpt</label>
                <textarea className="admin-input" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief excerpt" rows={2} />
              </div>
              <div>
                <label className="admin-label">Content</label>
                <textarea className="admin-input min-h-[200px]" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Blog content..." />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
              </div>
            </div>
                          <TranslationFields
                fields={[
                  { name: 'title', label: 'Title' },
                  { name: 'excerpt', label: 'Excerpt', type: 'textarea' as const },
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

import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import RichEditor from '@/components/RichEditor';
import { adminProjects, uploadFile } from '@/api';
import type { Project } from '@/types';

const emptyForm = {
  title: '', slug: '', client: '', sector: '', service: '',
  challenge: '', solution: '', outcome: '', images: '', order: 0, is_published: true,
};

import TranslationFields from '@/components/admin/TranslationFields';

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminProjects.getAll();
      setItems(data);
    } catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm, order: items.length + 1 }); setImageFile(null); setShowModal(true); };

  const openEdit = (item: Project) => {
    setEditing(item);
    setForm({ translations: ((item) as any).translations || {},
      title: item.title, slug: item.slug, client: item.client, sector: item.sector, service: item.service,
      challenge: item.challenge, solution: item.solution, outcome: item.outcome,
      images: Array.isArray(item.images) ? item.images.join(', ') : '',
      order: item.order, is_published: item.is_published,
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
        await adminProjects.update(editing.id, payload);
        toast.success('Project updated');
      } else {
        await adminProjects.create(payload);
        toast.success('Project created');
      }
      setShowModal(false);
      loadItems();
    } catch { toast.error('Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await adminProjects.delete(id);
      toast.success('Project deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Projects</h1>
            <p className="text-white/40 mt-1">Manage portfolio projects</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Project</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Sector</th>
                  <th>Service</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-white/30">No projects found</td></tr>
                ) : items.sort((a, b) => a.order - b.order).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <p className="font-medium text-white/80">{item.title}</p>
                    </td>
                    <td className="text-sm text-white/50">{item.client}</td>
                    <td className="text-sm text-white/50">{item.sector}</td>
                    <td className="text-sm text-white/50">{item.service}</td>
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
          <div className="admin-modal max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Project' : 'New Project'}</h2>
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
                  <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Project title" />
                </div>
                <div>
                  <label className="admin-label">Slug</label>
                  <input className="admin-input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="project-slug" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="admin-label">Client</label>
                  <input className="admin-input" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="Client name" />
                </div>
                <div>
                  <label className="admin-label">Sector</label>
                  <input className="admin-input" value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })} placeholder="e.g. Energy" />
                </div>
                <div>
                  <label className="admin-label">Service</label>
                  <input className="admin-input" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} placeholder="e.g. Consulting" />
                </div>
              </div>
              <div>
                <label className="admin-label">Challenge</label>
                <RichEditor value={form.challenge} onChange={value => setForm({ ...form, challenge: value })} placeholder="Project challenge" minHeight={120} theme="dark" />
              </div>
              <div>
                <label className="admin-label">Solution</label>
                <RichEditor value={form.solution} onChange={value => setForm({ ...form, solution: value })} placeholder="Solution provided" minHeight={120} theme="dark" />
              </div>
              <div>
                <label className="admin-label">Outcome</label>
                <RichEditor value={form.outcome} onChange={value => setForm({ ...form, outcome: value })} placeholder="Project outcome" minHeight={120} theme="dark" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Main Image</label>
                  <input type="file" accept="image/*" className="admin-input" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                  {editing?.image && !imageFile && <p className="text-xs text-white/30 mt-1">Current: {editing.image}</p>}
                </div>
                <div>
                  <label className="admin-label">Additional Images (comma-separated URLs)</label>
                  <input className="admin-input" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} placeholder="url1, url2, url3" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Order</label>
                  <input type="number" className="admin-input" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 text-brand-blue-light focus:ring-brand-blue-light" />
                  <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
                </div>
              </div>
            </div>
                          <TranslationFields
                fields={[
                  { name: 'title', label: 'Title' },
                  { name: 'description', label: 'Description', type: 'textarea' as const },
                  { name: 'challenge', label: 'Challenge', type: 'textarea' as const },
                  { name: 'solution', label: 'Solution', type: 'textarea' as const },
                  { name: 'outcome', label: 'Outcome', type: 'textarea' as const },
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

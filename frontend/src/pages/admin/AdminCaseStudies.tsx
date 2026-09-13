import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminCaseStudies } from '@/api';
import type { CaseStudy } from '@/types';
import { FiPlus, FiX } from 'react-icons/fi';

const emptyForm = { client: '', tag: '', challenge: '', solution: '', results: [] as string[], testimonial: '', order: 0, is_published: true };

import TranslationFields from '@/components/admin/TranslationFields';

export default function AdminCaseStudies() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminCaseStudies.getAll();
      setItems(data);
    } catch { toast.error('Failed to load case studies'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm, order: items.length + 1 }); setShowModal(true); };

  const openEdit = (item: CaseStudy) => {
    setEditing(item);
    setForm({ translations: ((item) as any).translations || {},
      client: item.client, tag: item.tag, challenge: item.challenge,
      solution: item.solution, results: item.results || [],
      testimonial: item.testimonial, order: item.order, is_published: item.is_published,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (editing) {
        await adminCaseStudies.update(editing.id, form);
        toast.success('Case study updated');
      } else {
        await adminCaseStudies.create(form);
        toast.success('Case study created');
      }
      setShowModal(false);
      loadItems();
    } catch { toast.error('Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this case study?')) return;
    try {
      await adminCaseStudies.delete(id);
      toast.success('Case study deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  const addResult = () => {
    setForm({ ...form, results: [...(form.results || []), ''] });
  };

  const updateResult = (i: number, val: string) => {
    const r = [...(form.results || [])];
    r[i] = val;
    setForm({ ...form, results: r });
  };

  const removeResult = (i: number) => {
    const r = [...(form.results || [])];
    r.splice(i, 1);
    setForm({ ...form, results: r });
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Case Studies</h1>
            <p className="text-white/40 mt-1">Manage client case studies</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Case Study</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Tag</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-white/30">No case studies found</td></tr>
                ) : items.sort((a, b) => a.order - b.order).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <p className="font-medium text-white/80">{item.client}</p>
                    </td>
                    <td>
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(45, 90, 142, 0.15)', color: '#5c9edb' }}>
                        {item.tag}
                      </span>
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
          <div className="admin-modal max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Case Study' : 'New Case Study'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Client</label>
                  <input className="admin-input" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="Client name" />
                </div>
                <div>
                  <label className="admin-label">Tag / Service</label>
                  <input className="admin-input" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="e.g. Strategic Management" />
                </div>
              </div>
              <div>
                <label className="admin-label">Challenge</label>
                <textarea className="admin-input" value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} placeholder="Describe the challenge" rows={3} />
              </div>
              <div>
                <label className="admin-label">Solution</label>
                <textarea className="admin-input" value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} placeholder="Describe the solution" rows={3} />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="admin-label">Results</label>
                  <button type="button" onClick={addResult} className="text-xs text-brand-blue-light hover:text-white flex items-center gap-1"><FiPlus className="w-3 h-3" /> Add result</button>
                </div>
                <div className="space-y-2">
                  {(form.results || []).map((r: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <input className="admin-input flex-1" value={r} onChange={e => updateResult(i, e.target.value)} placeholder="Result item" />
                      <button onClick={() => removeResult(i)} className="text-red-400 hover:text-red-300"><FiX className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="admin-label">Testimonial</label>
                <textarea className="admin-input" value={form.testimonial} onChange={e => setForm({ ...form, testimonial: e.target.value })} placeholder="Client testimonial quote" rows={2} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Order</label>
                  <input type="number" className="admin-input" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
              </div>
            </div>
                          <TranslationFields
                fields={[
                  { name: 'client', label: 'Client' },
                  { name: 'tag', label: 'Tag/Service' },
                  { name: 'challenge', label: 'Challenge', type: 'textarea' as const },
                  { name: 'solution', label: 'Solution', type: 'textarea' as const },
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

import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminSoftwareProducts } from '@/api';
import type { SoftwareProduct, SoftwarePricingMode } from '@/types';
import TranslationFields from '@/components/admin/TranslationFields';

const categories = ['Business Systems', 'Institutional Systems', 'Education Systems', 'Digital Platforms', 'Database Solutions'];
const pricingModes: SoftwarePricingMode[] = ['quote', 'one_time', 'subscription'];

const PRICING_LABELS: Record<SoftwarePricingMode, string> = {
  quote: 'Request Quote',
  one_time: 'One-Time License',
  subscription: 'Subscription',
};

const PRICING_BADGES: Record<SoftwarePricingMode, string> = {
  quote: 'bg-brand-purple/15 text-brand-purple-light',
  one_time: 'bg-brand-blue/20 text-brand-blue-light',
  subscription: 'bg-brand-green/15 text-brand-green-light',
};

const emptyForm = (order: number): Record<string, any> => ({
  slug: '',
  name: '',
  category: categories[0],
  tagline: '',
  description: '',
  problem: '',
  solution: '',
  features: [],
  screenshots: [],
  demo_url: '',
  pricing_mode: 'quote',
  price: null,
  price_unit: 'one_time',
  setup_fee: 0,
  image: '',
  is_published: true,
  order,
  translations: {},
});

export default function AdminSoftwareProducts() {
  const [items, setItems] = useState<SoftwareProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<SoftwareProduct | null>(null);
  const [form, setForm] = useState<Record<string, any>>(emptyForm(0));
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newScreenshot, setNewScreenshot] = useState('');

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminSoftwareProducts.getAll();
      setItems(data);
    } catch { toast.error('Failed to load products'); }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm(items.length + 1));
    setNewFeature('');
    setNewScreenshot('');
    setShowModal(true);
  };

  const openEdit = (item: SoftwareProduct) => {
    setEditing(item);
    setForm({
      slug: item.slug,
      name: item.name,
      category: item.category,
      tagline: item.tagline || '',
      description: item.description || '',
      problem: item.problem || '',
      solution: item.solution || '',
      features: item.features || [],
      screenshots: item.screenshots || [],
      demo_url: item.demo_url || '',
      pricing_mode: item.pricing_mode,
      price: item.price,
      price_unit: item.price_unit || 'one_time',
      setup_fee: item.setup_fee || 0,
      image: item.image || '',
      is_published: item.is_published ?? true,
      order: item.order ?? 0,
      translations: item.translations || {},
    });
    setNewFeature('');
    setNewScreenshot('');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.slug || !form.name || !form.category) {
      toast.error('Slug, name and category are required');
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await adminSoftwareProducts.update(editing.id, form);
        toast.success('Product updated');
      } else {
        await adminSoftwareProducts.create(form);
        toast.success('Product created');
      }
      setShowModal(false);
      loadItems();
    } catch { toast.error('Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this software product?')) return;
    try {
      await adminSoftwareProducts.delete(id);
      toast.success('Product deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setForm({ ...form, features: [...(form.features || []), newFeature.trim()] });
    setNewFeature('');
  };

  const addScreenshot = () => {
    if (!newScreenshot.trim()) return;
    setForm({ ...form, screenshots: [...(form.screenshots || []), newScreenshot.trim()] });
    setNewScreenshot('');
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Software Products</h1>
            <p className="text-white/40 mt-1">{items.length} products · manage pricing, features & translations</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Product</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th className="text-center">Pricing</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {items.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-white/30">No software products found.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue-light text-sm font-bold shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            item.name?.charAt(0)?.toUpperCase() || '?'
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white/90">{item.name}</p>
                          <p className="text-xs text-white/30">/{item.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(45, 90, 142, 0.15)', color: '#5c9edb' }}>
                        {item.category}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${PRICING_BADGES[item.pricing_mode] || 'bg-white/10 text-white/60'}`}>
                        {PRICING_LABELS[item.pricing_mode] || item.pricing_mode}
                      </span>
                      {item.pricing_mode !== 'quote' && item.price != null && (
                        <p className="text-xs text-white/40 mt-1 font-mono">AFN {Number(item.price).toLocaleString()}{item.price_unit === 'monthly' ? '/mo' : item.price_unit === 'annual' ? '/yr' : ''}</p>
                      )}
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
          <div className="admin-modal max-w-4xl max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">{editing ? `Edit: ${editing.name}` : 'New Software Product'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Slug *</label>
                  <input className="admin-input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="gurgure-erp" />
                </div>
                <div>
                  <label className="admin-label">Name *</label>
                  <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Category *</label>
                  <select className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="admin-label">Order</label>
                  <input type="number" className="admin-input" value={form.order ?? 0} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>

              <div>
                <label className="admin-label">Tagline</label>
                <input className="admin-input" value={form.tagline || ''} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="Short tagline" />
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea className="admin-input min-h-[90px]" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Full description" />
              </div>

              <div>
                <label className="admin-label">The Problem</label>
                <textarea className="admin-input min-h-[80px]" value={form.problem || ''} onChange={e => setForm({ ...form, problem: e.target.value })} placeholder="What challenge does this solve?" />
              </div>

              <div>
                <label className="admin-label">Our Solution</label>
                <textarea className="admin-input min-h-[80px]" value={form.solution || ''} onChange={e => setForm({ ...form, solution: e.target.value })} placeholder="How GURGURE solves it" />
              </div>

              <div>
                <label className="admin-label">Features</label>
                <div className="flex gap-2 mb-2">
                  <input className="admin-input flex-1" value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }} placeholder="Add feature and press Enter" />
                  <button onClick={addFeature} className="px-3 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:text-white text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(form.features || []).map((f: string, i: number) => (
                    <button key={i} onClick={() => setForm({ ...form, features: (form.features || []).filter((_: string, idx: number) => idx !== i) })} className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue-light text-xs hover:bg-brand-blue/20 transition-all">
                      {f} ×
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="admin-label">Screenshots (image URLs)</label>
                <div className="flex gap-2 mb-2">
                  <input className="admin-input flex-1" value={newScreenshot} onChange={e => setNewScreenshot(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addScreenshot(); } }} placeholder="Image URL, press Enter" />
                  <button onClick={addScreenshot} className="px-3 py-2 rounded-xl bg-white/[0.06] text-white/60 hover:text-white text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(form.screenshots || []).map((s: string, i: number) => (
                    <div key={i} className="relative group">
                      <img src={s} alt="" className="w-20 h-14 object-cover rounded-lg border border-white/10" />
                      <button onClick={() => setForm({ ...form, screenshots: (form.screenshots || []).filter((_: string, idx: number) => idx !== i) })} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Image URL</label>
                  <input className="admin-input" value={form.image || ''} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Cover image URL" />
                </div>
                <div>
                  <label className="admin-label">Demo URL</label>
                  <input className="admin-input" value={form.demo_url || ''} onChange={e => setForm({ ...form, demo_url: e.target.value })} placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="admin-label">Pricing Mode *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {pricingModes.map((m) => (
                    <button key={m} onClick={() => setForm({ ...form, pricing_mode: m })} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${form.pricing_mode === m ? 'bg-brand-blue text-white' : 'bg-white/[0.06] text-white/60 border border-white/10 hover:text-white'}`}>
                      {PRICING_LABELS[m]}
                    </button>
                  ))}
                </div>
              </div>

              {form.pricing_mode !== 'quote' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="admin-label">Price (AFN)</label>
                    <input type="number" className="admin-input" value={form.price ?? ''} onChange={e => setForm({ ...form, price: e.target.value ? Number(e.target.value) : null })} placeholder="0" />
                  </div>
                  <div>
                    <label className="admin-label">Unit</label>
                    <select className="admin-input" value={form.price_unit || 'one_time'} onChange={e => setForm({ ...form, price_unit: e.target.value })}>
                      <option value="one_time">One-Time</option>
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                  <div>
                    <label className="admin-label">Setup Fee (AFN)</label>
                    <input type="number" className="admin-input" value={form.setup_fee ?? 0} onChange={e => setForm({ ...form, setup_fee: Number(e.target.value) || 0 })} />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={!!form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
              </div>
            </div>

            <div className="mt-6">
              <TranslationFields
                fields={[
                  { name: 'name', label: 'Name' },
                  { name: 'tagline', label: 'Tagline' },
                  { name: 'category', label: 'Category' },
                  { name: 'description', label: 'Description', type: 'textarea' as const },
                  { name: 'problem', label: 'Problem', type: 'textarea' as const },
                  { name: 'solution', label: 'Solution', type: 'textarea' as const },
                ]}
                value={form.translations}
                onChange={(tr) => setForm({ ...form, translations: tr })}
              />
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

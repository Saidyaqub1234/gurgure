import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import TranslationFields from '@/components/admin/TranslationFields';
import { adminPrintProducts, uploadFile } from '@/api';
import type { PrintProduct, PrintOptionGroup } from '@/types';

interface OptionForm { key: string; id?: number; name: string; description: string; price: string; price_type: string; is_default: boolean; translations: Record<string, any>; }
interface GroupForm { key: string; id?: number; name: string; type: 'radio' | 'select' | 'checkbox'; required: boolean; translations: Record<string, any>; options: OptionForm[]; }

const emptyForm = {
  id: undefined as number | undefined,
  slug: '', name: '', category: '', short_description: '', description: '', image: '',
  price_mode: 'instant' as string, base_price: '', setup_cost: '0', min_quantity: 1,
  unit_label: '', turnaround: '', is_published: true, order: 0, translations: {} as Record<string, any>,
  price_rules: [] as { key: string; min_qty: string; max_qty: string; unit_price: string }[],
  groups: [] as GroupForm[],
};

let uid = 0;
const k = () => `k${++uid}`;

export default function AdminPrintProducts() {
  const [items, setItems] = useState<PrintProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<PrintProduct | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminPrintProducts.getAll();
      setItems(data);
    } catch { toast.error('Failed to load print products'); }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...JSON.parse(JSON.stringify(emptyForm)), order: items.length + 1 });
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = async (item: PrintProduct) => {
    setEditing(item);
    setImageFile(null);
    setShowModal(true);
    try {
      const full = await adminPrintProducts.getOne(item.id);
      setForm(fullToForm(full));
    } catch { toast.error('Failed to load product details'); setShowModal(false); }
  };

  const fullToForm = (p: PrintProduct) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    short_description: p.short_description || '',
    description: p.description || '',
    image: p.image || '',
    price_mode: p.price_mode,
    base_price: p.base_price != null ? String(p.base_price) : '',
    setup_cost: String(p.setup_cost || 0),
    min_quantity: p.min_quantity || 1,
    unit_label: p.unit_label || '',
    turnaround: p.turnaround || '',
    is_published: !!p.is_published,
    order: p.order || 0,
    translations: p.translations || {},
    price_rules: (p.price_rules || []).map(r => ({ id: r.id, key: k(), min_qty: String(r.min_qty), max_qty: r.max_qty != null ? String(r.max_qty) : '', unit_price: String(r.unit_price) })),
    groups: (p.option_groups || []).map(g => ({
      id: g.id, key: k(), name: g.name, type: g.type, required: !!g.required, translations: (g as any).translations || {},
      options: (g.options || []).map(o => ({
        id: (o as any).id, key: k(), name: o.name, description: (o as any).description || '', price: String(o.price), price_type: o.price_type, is_default: !!o.is_default, translations: (o as any).translations || {},
      })),
    })),
  });

  const payload = () => {
    return {
      slug: form.slug.trim(),
      name: form.name.trim(),
      category: form.category.trim(),
      short_description: form.short_description,
      description: form.description,
      image: form.image,
      price_mode: form.price_mode,
      base_price: form.base_price === '' ? null : Number(form.base_price),
      setup_cost: Number(form.setup_cost) || 0,
      min_quantity: Number(form.min_quantity) || 1,
      unit_label: form.unit_label,
      turnaround: form.turnaround,
      is_published: !!form.is_published,
      order: Number(form.order) || 0,
      translations: form.translations || {},
      price_rules: form.price_rules.filter((r: any) => r.min_qty !== '' && r.unit_price !== '').map((r: any) => ({
        id: r.id, min_qty: Number(r.min_qty), max_qty: r.max_qty === '' ? null : Number(r.max_qty), unit_price: Number(r.unit_price),
      })),
      option_groups: form.groups.map((g: GroupForm) => ({
        id: g.id, name: g.name, type: g.type, required: g.required, translations: g.translations || {},
        options: g.options.map(o => ({
          id: o.id, name: o.name, description: o.description, price: Number(o.price) || 0, price_type: o.price_type, is_default: o.is_default, translations: o.translations || {},
        })),
      })),
    };
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.slug.trim()) { toast.error('Name and slug are required'); return; }
    setSaving(true);
    try {
      const data = payload();
      if (imageFile) {
        const up = await uploadFile(imageFile);
        data.image = up.url;
      }
      if (editing) {
        await adminPrintProducts.update(editing.id, data);
        toast.success('Product updated');
      } else {
        await adminPrintProducts.create(data);
        toast.success('Product created');
      }
      setShowModal(false);
      loadItems();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Operation failed');
    }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this print product? Its options and price rules will be removed.')) return;
    try {
      await adminPrintProducts.delete(id);
      toast.success('Product deleted');
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  const addGroup = () => setForm({ ...form, groups: [...form.groups, { key: k(), name: '', type: 'radio', required: true, translations: {}, options: [] }] });
  const updateGroup = (gkey: string, patch: Partial<GroupForm>) => setForm({ ...form, groups: form.groups.map((g: any) => g.key === gkey ? { ...g, ...patch } : g) });
  const removeGroup = (gkey: string) => setForm({ ...form, groups: form.groups.filter((g: any) => g.key !== gkey) });
  const moveGroup = (idx: number, dir: 'up' | 'down') => {
    const arr = [...form.groups];
    const j = dir === 'up' ? idx - 1 : idx + 1;
    if (j < 0 || j >= arr.length) return;
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    setForm({ ...form, groups: arr });
  };

  const addOption = (gkey: string) => updateGroup(gkey, { options: [...(form.groups.find((g: any) => g.key === gkey)?.options || []), { key: k(), name: '', description: '', price: '0', price_type: 'none', is_default: false, translations: {} }] });
  const updateOption = (gkey: string, okey: string, patch: Partial<OptionForm>) => updateGroup(gkey, {
    options: (form.groups.find((g: any) => g.key === gkey)?.options || []).map((o: any) => o.key === okey ? { ...o, ...patch } : o),
  });
  const removeOption = (gkey: string, okey: string) => updateGroup(gkey, {
    options: (form.groups.find((g: any) => g.key === gkey)?.options || []).filter((o: any) => o.key !== okey),
  });

  const addRule = () => setForm({ ...form, price_rules: [...form.price_rules, { key: k(), min_qty: '', max_qty: '', unit_price: '' }] });
  const updateRule = (rkey: string, patch: any) => setForm({ ...form, price_rules: form.price_rules.map((r: any) => r.key === rkey ? { ...r, ...patch } : r) });
  const removeRule = (rkey: string) => setForm({ ...form, price_rules: form.price_rules.filter((r: any) => r.key !== rkey) });

  const sortRules = () => {
    const rules = [...form.price_rules].sort((a, b) => (Number(a.min_qty) || 0) - (Number(b.min_qty) || 0));
    setForm({ ...form, price_rules: rules });
  };

  const setCommon = (patch: any) => setForm({ ...form, ...patch });

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Print Products</h1>
            <p className="text-white/40 mt-1">Web-to-print catalogue, options, quantity pricing</p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm px-5 py-2.5">+ New Product</button>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th className="text-center">Mode</th>
                  <th className="text-center">Groups</th>
                  <th className="text-center">From</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {items.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-white/30">No print products yet. Create your first one.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <p className="font-medium text-white/80">{item.name}</p>
                      <p className="text-xs text-white/30 font-mono">{item.slug}</p>
                    </td>
                    <td><span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium capitalize bg-white/10 text-white/60">{item.category}</span></td>
                    <td className="text-center">
                      {item.price_mode === 'instant' ? (
                        <span className="text-xs font-medium text-brand-green-light px-2.5 py-1 rounded-lg bg-brand-green/10">Instant</span>
                      ) : item.price_mode === 'estimated' ? (
                        <span className="text-xs font-medium text-amber-400 px-2.5 py-1 rounded-lg bg-amber-500/10">Estimate</span>
                      ) : (
                        <span className="text-xs font-medium text-brand-purple-light px-2.5 py-1 rounded-lg bg-brand-purple/10">Quote</span>
                      )}
                    </td>
                    <td className="text-center text-white/60 text-sm">{item.option_groups?.length || 0}</td>
                    <td className="text-center font-mono text-white/70 text-sm">{item.starting_price != null ? `AFN ${Number(item.starting_price).toLocaleString()}` : '—'}</td>
                    <td className="text-center">
                      <span className={item.is_published ? 'admin-badge-published' : 'admin-badge-draft'}>{item.is_published ? 'Published' : 'Draft'}</span>
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4" onClick={() => setShowModal(false)}>
          <div className="admin-modal max-w-4xl my-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">{editing ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Base fields */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Name *</label>
                  <input className="admin-input" value={form.name} onChange={e => setCommon({ name: e.target.value })} placeholder="Product name" />
                </div>
                <div>
                  <label className="admin-label">Slug *</label>
                  <input className="admin-input" value={form.slug} onChange={e => setCommon({ slug: e.target.value })} placeholder="product-slug" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Category</label>
                  <input className="admin-input" value={form.category} onChange={e => setCommon({ category: e.target.value })} placeholder="e.g. Business Stationery" />
                </div>
                <div>
                  <label className="admin-label">Price mode</label>
                  <select className="admin-input" value={form.price_mode} onChange={e => setCommon({ price_mode: e.target.value })}>
                    <option value="instant">Instant</option>
                    <option value="estimated">Estimated</option>
                    <option value="quote">Quote</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Short description</label>
                <input className="admin-input" value={form.short_description} onChange={e => setCommon({ short_description: e.target.value })} placeholder="Short public description" />
              </div>
              <div>
                <label className="admin-label">Full description</label>
                <textarea className="admin-input" rows={3} value={form.description} onChange={e => setCommon({ description: e.target.value })} placeholder="Optional detailed description" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="admin-label">Base price (AFN)</label>
                  <input type="number" min="0" className="admin-input" value={form.base_price} onChange={e => setCommon({ base_price: e.target.value })} placeholder="Fallback" />
                </div>
                <div>
                  <label className="admin-label">Setup cost</label>
                  <input type="number" min="0" className="admin-input" value={form.setup_cost} onChange={e => setCommon({ setup_cost: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Min quantity</label>
                  <input type="number" min="1" className="admin-input" value={form.min_quantity} onChange={e => setCommon({ min_quantity: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Unit label</label>
                  <input className="admin-input" value={form.unit_label} onChange={e => setCommon({ unit_label: e.target.value })} placeholder="card / flyer" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Turnaround</label>
                  <input className="admin-input" value={form.turnaround} onChange={e => setCommon({ turnaround: e.target.value })} placeholder="e.g. 2–4 days" />
                </div>
                <div>
                  <label className="admin-label">Image</label>
                  <input type="file" accept="image/*" className="admin-input" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                  {form.image && <p className="text-xs text-white/30 mt-1 font-mono truncate">{form.image}</p>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={form.is_published} onChange={e => setCommon({ is_published: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-blue-light focus:ring-brand-blue-light" />
                <label htmlFor="is_published" className="text-sm font-medium text-white/70">Published</label>
                <div className="ml-4">
                  <label className="admin-label inline mr-2">Order</label>
                  <input type="number" className="admin-input inline w-20" value={form.order} onChange={e => setCommon({ order: e.target.value })} />
                </div>
              </div>
              <TranslationFields
                fields={[
                  { name: 'name', label: 'Name' },
                  { name: 'short_description', label: 'Short description', type: 'textarea' },
                  { name: 'category', label: 'Category' },
                  { name: 'turnaround', label: 'Turnaround' },
                ]}
                value={form.translations}
                onChange={(tr) => setCommon({ translations: tr })}
              />
            </div>

            {/* Price rules */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-white">Quantity price matrix <span className="font-normal text-white/50">— unit price (AFN) per bracket</span></p>
                <div className="flex gap-2">
                  <button onClick={sortRules} className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 text-white/70 transition-colors">Sort</button>
                  <button onClick={addRule} className="px-3 py-1 rounded-lg text-xs font-medium bg-brand-blue hover:bg-brand-blue-light text-white transition-colors">+ Rule</button>
                </div>
              </div>
              {form.price_rules.length === 0 && <p className="text-white/30 text-xs">No rules — base price will be used for all quantities.</p>}
              <div className="space-y-2">
                {form.price_rules.map((r: any, i: number) => (
                  <div key={r.key} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
                    <div>
                      <label className="text-[10px] text-white/40">Min</label>
                      <input type="number" min="1" className="admin-input" value={r.min_qty} onChange={e => updateRule(r.key, { min_qty: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/40">Max (blank = open)</label>
                      <input type="number" className="admin-input" value={r.max_qty} onChange={e => updateRule(r.key, { max_qty: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/40">Unit price</label>
                      <input type="number" min="0" step="0.01" className="admin-input" value={r.unit_price} onChange={e => updateRule(r.key, { unit_price: e.target.value })} />
                    </div>
                    <button onClick={() => removeRule(r.key)} className="mt-4 p-2 text-white/30 hover:text-red-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Option groups */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-white">Option groups</p>
                <button onClick={addGroup} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-blue hover:bg-brand-blue-light text-white transition-colors">+ Group</button>
              </div>
              {form.groups.length === 0 && <p className="text-white/30 text-xs mb-4">No option groups — product will have a fixed price.</p>}
              <div className="space-y-4">
                {form.groups.map((g: GroupForm, gi: number) => (
                  <div key={g.key} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center mb-3">
                      <input className="admin-input" value={g.name} onChange={e => updateGroup(g.key, { name: e.target.value })} placeholder="Group name e.g. Material" />
                      <select className="admin-input w-auto" value={g.type} onChange={e => updateGroup(g.key, { type: e.target.value as any })}>
                        <option value="radio">Radio</option>
                        <option value="select">Select</option>
                        <option value="checkbox">Checkbox</option>
                      </select>
                      <label className="flex items-center gap-1.5 text-xs text-white/60 whitespace-nowrap">
                        <input type="checkbox" checked={g.required} onChange={e => updateGroup(g.key, { required: e.target.checked })} className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-brand-blue-light" />
                        Required
                      </label>
                      <div className="flex gap-1">
                        <button onClick={() => moveGroup(gi, 'up')} className="p-1 text-white/30 hover:text-brand-blue-light"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></button>
                        <button onClick={() => moveGroup(gi, 'down')} className="p-1 text-white/30 hover:text-brand-blue-light"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                        <button onClick={() => removeGroup(g.key)} className="p-1 text-white/30 hover:text-red-400"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-white/40">Options</p>
                      <button onClick={() => addOption(g.key)} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/10 hover:bg-white/15 text-white/70 transition-colors">+ Option</button>
                    </div>
                    {g.options.length === 0 && <p className="text-white/25 text-xs mb-2">No options yet.</p>}
                    <div className="space-y-2">
                      {g.options.map(o => (
                        <div key={o.key} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_auto] gap-2 items-center bg-white/[0.02] rounded-lg p-2">
                          <div>
                            <input className="admin-input" value={o.name} onChange={e => updateOption(g.key, o.key, { name: e.target.value })} placeholder="Option name" />
                            <input className="admin-input mt-1.5" value={o.description} onChange={e => updateOption(g.key, o.key, { description: e.target.value })} placeholder="Description (optional)" />
                          </div>
                          <div>
                            <label className="text-[10px] text-white/40 block">Price</label>
                            <input type="number" min="0" step="0.01" className="admin-input w-24" value={o.price} onChange={e => updateOption(g.key, o.key, { price: e.target.value })} />
                          </div>
                          <div>
                            <label className="text-[10px] text-white/40 block">Type</label>
                            <select className="admin-input w-auto" value={o.price_type} onChange={e => updateOption(g.key, o.key, { price_type: e.target.value })}>
                              <option value="none">None</option>
                              <option value="per_unit">Per unit</option>
                              <option value="one_time">One time</option>
                            </select>
                          </div>
                          <label className="flex items-center gap-1.5 text-xs text-white/60 mt-3 whitespace-nowrap">
                            <input type="checkbox" checked={o.is_default} onChange={e => updateOption(g.key, o.key, { is_default: e.target.checked })} className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-brand-blue-light" />
                            Default
                          </label>
                          <button onClick={() => removeOption(g.key, o.key)} className="mt-3 p-2 text-white/30 hover:text-red-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
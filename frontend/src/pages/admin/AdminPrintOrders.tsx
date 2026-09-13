import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminPrintOrders } from '@/api';
import type { PrintOrder } from '@/types';

const STATUSES = ['pending', 'processing', 'in_production', 'quality_check', 'delivered', 'cancelled'];
const STATUS_META: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  processing: 'bg-brand-blue/20 text-brand-blue-light',
  in_production: 'bg-brand-purple/20 text-brand-purple-light',
  quality_check: 'bg-sky-500/10 text-sky-400',
  delivered: 'bg-brand-green/10 text-brand-green-light',
  cancelled: 'bg-red-500/10 text-red-400',
};

export default function AdminPrintOrders() {
  const [orders, setOrders] = useState<PrintOrder[]>([]);
  const [meta, setMeta] = useState<any>({ total: 0, current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<PrintOrder | null>(null);
  const [updating, setUpdating] = useState(false);

  const loadOrders = async (p: number = page, s: string = search, st: string = statusFilter) => {
    setLoading(true);
    try {
      const res = await adminPrintOrders.getMeta({ page: p, per_page: 15, search: s || undefined, status: st || undefined });
      setOrders(res.data || []);
      setMeta({ total: res.total || 0, current_page: res.current_page || 1, last_page: res.last_page || 1 });
    } catch { toast.error('Failed to load orders'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const t = setTimeout(() => { setPage(1); loadOrders(1, search, statusFilter); }, 400);
    return () => clearTimeout(t);
  }, [search, statusFilter]);

  const openDetail = async (order: PrintOrder) => {
    setSelected(order);
    const full = await adminPrintOrders.getOne(order.id).catch(() => order);
    setSelected(full);
  };

  const changeStatus = async (id: number, status: string) => {
    setUpdating(true);
    try {
      await adminPrintOrders.updateStatus(id, status);
      toast.success(`Status → ${status}`);
      setSelected(prev => prev ? { ...prev, status } : prev);
      loadOrders();
    } catch { toast.error('Status update failed'); }
    finally { setUpdating(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this print order?')) return;
    try {
      await adminPrintOrders.delete(id);
      toast.success('Order deleted');
      setSelected(null);
      loadOrders();
    } catch { toast.error('Delete failed'); }
  };

  const fmtDate = (d?: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString();
  };

  if (loading && orders.length === 0) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Print Orders</h1>
            <p className="text-white/40 mt-1">{meta.total} orders · production tracking</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="admin-input max-w-sm"
            placeholder="Search order #, name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="admin-input w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th className="text-center">Items</th>
                  <th className="text-right">Total</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {orders.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-white/30">No print orders found.</td></tr>
                ) : orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <p className="font-mono font-semibold text-white/90">{o.order_no}</p>
                      <p className="text-xs text-white/30">{o.created_at ? fmtDate(o.created_at) : ''}</p>
                    </td>
                    <td>
                      <p className="text-white/80">{o.name}</p>
                      <p className="text-xs text-white/35">{o.email || o.phone || ''}</p>
                    </td>
                    <td className="text-center text-white/70">{Array.isArray(o.items) ? o.items.length : 0}</td>
                    <td className="text-right font-mono font-semibold text-white/90">AFN {Number(o.total || 0).toLocaleString()}</td>
                    <td className="text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${STATUS_META[o.status] || 'bg-white/10 text-white/60'}`}>
                        {o.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="text-center text-white/50 text-sm">{fmtDate(o.created_at)}</td>
                    <td className="text-right">
                      <button onClick={() => openDetail(o)} className="px-3 py-1.5 text-xs font-medium text-brand-blue-light hover:bg-white/[0.05] rounded-lg transition-colors">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {meta.last_page > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <button disabled={page <= 1} onClick={() => { const p = page - 1; setPage(p); loadOrders(p); }} className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-30 text-sm">Previous</button>
            <span className="text-sm text-white/50">Page {meta.current_page} / {meta.last_page}</span>
            <button disabled={page >= meta.last_page} onClick={() => { const p = page + 1; setPage(p); loadOrders(p); }} className="px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-30 text-sm">Next</button>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4" onClick={() => setSelected(null)}>
          <div className="admin-modal max-w-3xl my-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-white font-mono">{selected.order_no}</h2>
                <p className="text-xs text-white/40 mt-1">{selected.created_at ? new Date(selected.created_at).toLocaleString() : ''}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-5">
              {/* Customer */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><p className="text-white/40 text-xs mb-1">Customer</p><p className="text-white/80">{selected.name}</p></div>
                <div><p className="text-white/40 text-xs mb-1">Contact</p><p className="text-white/80">{selected.email}{selected.phone ? ` · ${selected.phone}` : ''}</p></div>
                {selected.address && <div className="sm:col-span-2"><p className="text-white/40 text-xs mb-1">Address</p><p className="text-white/80">{selected.address}</p></div>}
                {selected.notes && <div className="sm:col-span-2"><p className="text-white/40 text-xs mb-1">Notes</p><p className="text-white/80">{selected.notes}</p></div>}
              </div>

              {/* Status control */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-white/40 text-xs mb-2">Update status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      disabled={updating}
                      onClick={() => changeStatus(selected.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selected.status === s ? `${STATUS_META[s] || 'bg-white/20 text-white'} ring-1 ring-current` : 'bg-white/[0.06] text-white/60 hover:bg-white/10'}`}
                    >
                      {s.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-sm font-bold text-white">Items</p>
                  <p className="font-mono font-bold text-white/90">AFN {Number(selected.total || 0).toLocaleString()}</p>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {Array.isArray(selected.items) && selected.items.map((it, i) => (
                    <div key={i} className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white/85">{it.name} <span className="text-white/35 text-xs">× {it.qty}</span></p>
                        <p className="font-mono text-sm text-white/80">AFN {Number(it.total || 0).toLocaleString()}</p>
                      </div>
                      {it.options?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {it.options.map((op, j) => <span key={j} className="px-2 py-0.5 rounded-md bg-white/[0.06] text-white/50 text-[11px]">{op}</span>)}
                        </div>
                      )}
                      {it.estimate_low != null && (
                        <p className="text-xs text-amber-400/80 mt-1.5">Estimate: AFN {Number(it.estimate_low).toLocaleString()} – {Number(it.estimate_high).toLocaleString()}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => { if (confirm('Delete this order?')) handleDelete(selected.id); }} className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">Delete</button>
                <button onClick={() => setSelected(null)} className="px-5 py-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-light text-sm font-medium transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
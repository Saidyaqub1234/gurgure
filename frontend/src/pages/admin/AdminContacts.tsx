import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminContacts } from '@/api';
import type { Contact } from '@/types';

export default function AdminContacts() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    try {
      const data = await adminContacts.getAll();
      setItems(data);
    } catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  const handleView = (item: Contact) => {
    setSelected(item);
    setViewModal(true);
  };

  const handleMarkRead = async (e: React.MouseEvent, item: Contact) => {
    e.stopPropagation();
    if (item.is_read) return;
    try {
      await adminContacts.update(item.id, { is_read: true } as any);
      toast.success('Marked as read');
      loadItems();
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      await adminContacts.delete(id);
      toast.success('Message deleted');
      if (selected?.id === id) setViewModal(false);
      loadItems();
    } catch { toast.error('Delete failed'); }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Messages</h1>
            <p className="text-white/40 mt-1">Contact form submissions</p>
          </div>
          <span className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: 'rgba(45, 90, 142, 0.15)', color: '#5c9edb' }}>
            {items.filter(m => !m.is_read).length} unread
          </span>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Organization</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-white/30">No messages found</td></tr>
                ) : items.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleView(item)}
                    className={`cursor-pointer ${!item.is_read ? 'bg-white/[0.02]' : ''}`}
                  >
                    <td>
                      <div className="flex items-center gap-2">
                        {!item.is_read && <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />}
                        <p className={`font-medium ${!item.is_read ? 'text-white/80' : 'text-white/50'}`}>{item.name}</p>
                      </div>
                    </td>
                    <td className="text-sm text-white/50">{item.email}</td>
                    <td className="text-sm text-white/50">{item.organization || '-'}</td>
                    <td className="text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${item.is_read ? 'admin-badge-draft' : 'admin-badge-published'}`}>
                        {item.is_read ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td className="text-right text-sm text-white/40">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                        {!item.is_read && (
                          <button onClick={(e) => handleMarkRead(e, item)} className="px-3 py-1.5 text-xs font-medium text-brand-blue-light hover:bg-white/[0.05] rounded-lg transition-colors">Mark Read</button>
                        )}
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

      {viewModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setViewModal(false)}>
          <div className="admin-modal max-w-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">Message</h2>
              <button onClick={() => setViewModal(false)} className="text-white/40 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.03]">
                <div>
                  <p className="text-xs text-white/40 font-medium">Name</p>
                  <p className="text-sm font-medium text-white/80">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium">Date</p>
                  <p className="text-sm text-white/50">{new Date(selected.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-sm text-brand-blue-light hover:underline">{selected.email}</a>
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium">Phone</p>
                  <p className="text-sm text-white/50">{selected.phone || '-'}</p>
                </div>
                {selected.organization && (
                  <div>
                    <p className="text-xs text-white/40 font-medium">Organization</p>
                    <p className="text-sm text-white/50">{selected.organization}</p>
                  </div>
                )}
                {selected.service_interest && (
                  <div>
                    <p className="text-xs text-white/40 font-medium">Service Interest</p>
                    <p className="text-sm text-white/50">{selected.service_interest}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-white/40 font-medium mb-2">Message</p>
                <p className="text-sm text-white/70 whitespace-pre-wrap rounded-xl bg-white/[0.03] p-4">{selected.message}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/[0.06]">
              <div>
                {!selected.is_read && (
                  <button
                    onClick={async () => { try { await adminContacts.update(selected.id, { is_read: true } as any); toast.success('Marked as read'); setViewModal(false); loadItems(); } catch { toast.error('Failed'); } }}
                    className="px-4 py-2 rounded-xl bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue-light"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setViewModal(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">Close</button>
                <button onClick={() => handleDelete(selected.id)} className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/[0.1]">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

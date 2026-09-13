import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { getDashboardStats, adminContacts } from '@/api';
import type { DashboardStats, Contact } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';
import { HiOutlineTemplate, HiOutlineCog, HiOutlineBriefcase, HiOutlinePencilAlt, HiOutlineUserGroup, HiOutlineUsers, HiOutlineChatAlt2, HiOutlineQuestionMarkCircle, HiOutlineMail, HiOutlineMailOpen, HiOutlinePaperAirplane, HiOutlineCube, HiOutlineDocumentText, HiOutlineCurrencyDollar } from 'react-icons/hi';

const statCards = [
  { key: 'pages', label: 'Pages', icon: HiOutlineTemplate, color: 'from-blue-500 to-blue-600', link: '/admin/pages' },
  { key: 'services', label: 'Services', icon: HiOutlineCog, color: 'from-purple-500 to-purple-600', link: '/admin/services' },
  { key: 'projects', label: 'Projects', icon: HiOutlineBriefcase, color: 'from-amber-500 to-amber-600', link: '/admin/projects' },
  { key: 'blogs', label: 'Blogs', icon: HiOutlinePencilAlt, color: 'from-green-500 to-green-600', link: '/admin/blogs' },
  { key: 'clients', label: 'Clients', icon: HiOutlineUserGroup, color: 'from-rose-500 to-rose-600', link: '/admin/clients' },
  { key: 'team_members', label: 'Team', icon: HiOutlineUsers, color: 'from-cyan-500 to-cyan-600', link: '/admin/team' },
  { key: 'testimonials', label: 'Testimonials', icon: HiOutlineChatAlt2, color: 'from-pink-500 to-pink-600', link: '/admin/testimonials' },
  { key: 'case_studies', label: 'Case Studies', icon: HiOutlineDocumentText, color: 'from-sky-500 to-sky-600', link: '/admin/case-studies' },
  { key: 'faqs', label: 'FAQs', icon: HiOutlineQuestionMarkCircle, color: 'from-indigo-500 to-indigo-600', link: '/admin/faqs' },
  { key: 'contacts', label: 'Messages', icon: HiOutlineMail, color: 'from-teal-500 to-teal-600', link: '/admin/contacts' },
  { key: 'subscribers', label: 'Subscribers', icon: HiOutlinePaperAirplane, color: 'from-orange-500 to-orange-600', link: '/admin/subscribers' },
  { key: 'customers', label: 'Customers', icon: HiOutlineUserGroup, color: 'from-teal-500 to-teal-600', link: '/admin/customers' },
  { key: 'packages', label: 'Packages', icon: HiOutlineCube, color: 'from-violet-500 to-violet-600', link: '/admin/packages' },
  { key: 'quotations', label: 'Quotations', icon: HiOutlineDocumentText, color: 'from-yellow-500 to-yellow-600', link: '/admin/quotations' },
  { key: 'invoices', label: 'Invoices', icon: HiOutlineCurrencyDollar, color: 'from-emerald-500 to-emerald-600', link: '/admin/invoices' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState<Contact[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, contactsData] = await Promise.all([
        getDashboardStats(),
        adminContacts.getAll({ per_page: 5, sort: 'created_at', order: 'desc' }),
      ]);
      setStats(statsData);
      setRecentMessages(Array.isArray(contactsData) ? contactsData.slice(0, 5) : []);
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">{t('Dashboard')}</h1>
            <p className="text-white/40 mt-1">{t('Overview of your website')}</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: 'rgba(45, 138, 78, 0.15)', color: '#4ade80' }}>
              {stats?.unread_contacts || 0} {t('unread messages')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            const count = stats?.[card.key as keyof DashboardStats] ?? 0;
            return (
              <Link
                key={card.key}
                to={card.link}
                className="admin-card p-5 hover:shadow-lg hover:shadow-black/20 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-heading font-bold text-white">{count}</p>
                <p className="text-sm text-white/40 mt-1">{t(card.label)}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="admin-card p-6">
            <h2 className="text-lg font-heading font-bold text-white mb-4">{t('Recent Messages')}</h2>
            {recentMessages.length === 0 ? (
              <p className="text-white/30 text-sm">{t('No messages yet')}</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.is_read ? 'bg-white/[0.05] text-white/30' : 'bg-brand-blue/20 text-brand-blue-light'}`}>
                      <HiOutlineMailOpen className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white/80 truncate">{msg.name}</p>
                      <p className="text-xs text-white/40 truncate">{msg.message}</p>
                      <p className="text-xs text-white/30 mt-0.5">{new Date(msg.created_at).toLocaleDateString()}</p>
                    </div>
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-brand-blue-light shrink-0 mt-2" />}
                  </div>
                ))}
              </div>
            )}
            <Link to="/admin/contacts" className="inline-flex items-center gap-1 text-sm text-brand-blue-light font-medium mt-4 hover:underline">
              {t('View all messages')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="admin-card p-6">
            <h2 className="text-lg font-heading font-bold text-white mb-4">{t('Quick Actions')}</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/pages" className="p-4 rounded-xl transition-all text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <HiOutlineTemplate className="w-6 h-6 mx-auto mb-1 text-brand-blue-light" />
                <span className="text-xs font-medium text-white/50">{t('New Page')}</span>
              </Link>
              <Link to="/admin/services" className="p-4 rounded-xl transition-all text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <HiOutlineCog className="w-6 h-6 mx-auto mb-1 text-brand-blue-light" />
                <span className="text-xs font-medium text-white/50">{t('New Service')}</span>
              </Link>
              <Link to="/admin/projects" className="p-4 rounded-xl transition-all text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <HiOutlineBriefcase className="w-6 h-6 mx-auto mb-1 text-brand-blue-light" />
                <span className="text-xs font-medium text-white/50">{t('New Project')}</span>
              </Link>
              <Link to="/admin/blogs" className="p-4 rounded-xl transition-all text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <HiOutlinePencilAlt className="w-6 h-6 mx-auto mb-1 text-brand-blue-light" />
                <span className="text-xs font-medium text-white/50">{t('New Blog')}</span>
              </Link>
              <Link to="/admin/clients" className="p-4 rounded-xl transition-all text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <HiOutlineUserGroup className="w-6 h-6 mx-auto mb-1 text-brand-blue-light" />
                <span className="text-xs font-medium text-white/50">{t('New Client')}</span>
              </Link>
              <Link to="/admin/settings" className="p-4 rounded-xl transition-all text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <HiOutlineCog className="w-6 h-6 mx-auto mb-1 text-brand-blue-light" />
                <span className="text-xs font-medium text-white/50">{t('Settings')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

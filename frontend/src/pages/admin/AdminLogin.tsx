import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, getSettings } from '@/api';
import toast from 'react-hot-toast';
import { useLanguage } from '@/i18n/LanguageContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState<any>(null);
  const { t } = useLanguage();

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin(email, password);
      localStorage.setItem('admin_token', data.data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.data.user));
      toast.success(t('Welcome back'));
      navigate('/admin');
    } catch (err: any) {
      const msg = err?.response?.data?.message || t('Invalid email or password');
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const siteName = settings?.site_name || 'GURGURE';
  const siteTagline = settings?.site_tagline || t('Making Visible Brands');

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="min-h-screen w-full max-w-7xl mx-auto grid grid-cols-8 gap-0">
        {/* Left: Logo + Title + Text */}
        <div className="col-span-8 lg:col-span-4 flex items-center justify-center py-10 lg:py-12 lg:justify-end lg:pr-14 bg-gradient-to-br from-brand-dark via-brand-blue to-brand-green">
          <div className="max-w-md w-full text-center lg:text-left">
            <div className="flex items-center gap-5 mb-6 justify-center lg:justify-start">
              {settings?.logo ? (
                <img src={settings.logo} alt={siteName} className="h-20 w-20 object-contain rounded-2xl bg-white p-2 shadow-lg shadow-black/20 shrink-0" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center shrink-0">
                  <span className="text-4xl font-heading font-bold text-white">G</span>
                </div>
              )}
              <div className="text-left">
                <h2 className="font-heading font-bold text-3xl text-white leading-tight mb-1">{siteName}</h2>
                <p className="text-base text-white/70">{siteTagline}</p>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-5">
              {t('Admin Login')}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              {t('Sign in to manage your website')}
            </p>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="col-span-8 lg:col-span-4 flex items-center justify-center py-10 lg:py-12 lg:justify-start lg:pl-14 bg-white">
          <div className="w-full max-w-lg">
            <div className="rounded-3xl">
              <h2 className="text-3xl font-heading font-bold text-brand-dark mb-2">{t('Admin Login')}</h2>
              <p className="text-brand-dark/60 mb-8">{t('Sign in to manage your website')}</p>
              <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">{t('Email')}</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-12 pr-5 py-4 rounded-xl bg-brand-dark/[0.03] border border-brand-dark/15 text-brand-dark text-base placeholder-brand-dark/30 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">{t('Password')}</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-5 py-4 rounded-xl bg-brand-dark/[0.03] border border-brand-dark/15 text-brand-dark text-base placeholder-brand-dark/30 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 bg-gradient-to-r from-brand-blue-light to-brand-green hover:shadow-lg hover:shadow-brand-green/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('Signing in...')}
                </>
              ) : (
                t('Sign In')
              )}
            </button>
          </form>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}

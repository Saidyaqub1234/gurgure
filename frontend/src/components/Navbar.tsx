import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronDown, FiGlobe, FiMenu, FiUser, FiX } from 'react-icons/fi';
import type { NavLink } from '@/types';
import { LANGUAGES, type LangCode } from '@/i18n/translations';
import { useLanguage } from '@/i18n/LanguageContext';

interface NavbarProps {
  settings?: {
    logo?: string;
    site_name?: string;
    site_tagline?: string;
    nav_links?: NavLink[];
  } | null;
}

const primaryLinks = [
  { label: 'Home', path: '/' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/portfolio' },
  { label: 'About', path: '/about' },
];

const moreLinks = [
  { label: 'Software', path: '/software' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Print Shop', path: '/print' },
  { label: 'Insights', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Careers', path: '/career' },
];

function isCurrent(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar({ settings }: NavbarProps) {
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [customer, setCustomer] = useState<{ avatar?: string; name?: string } | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
    try {
      const raw = localStorage.getItem('customer');
      setCustomer(raw ? JSON.parse(raw) : null);
    } catch {
      setCustomer(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMenus = () => {
    setMobileOpen(false);
    setMoreOpen(false);
  };

  const renderLink = (link: { label: string; path: string }, mobile = false) => (
    <Link
      key={link.path}
      to={link.path}
      onClick={closeMenus}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isCurrent(location.pathname, link.path)
          ? 'bg-white/10 text-white'
          : 'text-white/65 hover:bg-white/10 hover:text-white'
      } ${mobile ? 'block w-full px-4 py-3 text-base' : ''}`}
    >
      {t(link.label)}
    </Link>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-dark/95 text-white backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link to="/" onClick={closeMenus} className="flex shrink-0 items-center gap-3">
          {settings?.logo ? (
            <img src={settings.logo} alt={settings.site_name || 'Logo'} className="h-9 w-auto" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand font-heading text-lg font-bold">
              G
            </span>
          )}
          <span className="hidden sm:block">
            <span className="block font-heading text-lg font-bold leading-tight">
              {settings?.site_name || 'GURGURE'}
            </span>
            <span className="block text-[11px] text-white/50">
              {settings?.site_tagline || 'Making Visible Brands'}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => renderLink(link))}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                moreLinks.some((link) => isCurrent(location.pathname, link.path))
                  ? 'bg-white/10 text-white'
                  : 'text-white/65 hover:bg-white/10 hover:text-white'
              }`}
            >
              {t('More')}
              <FiChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                {moreLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenus}
                    className={`block rounded-lg px-3 py-2 text-sm ${
                      isCurrent(location.pathname, link.path)
                        ? 'bg-brand-blue/5 font-semibold text-brand-blue'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-brand-blue'
                    }`}
                  >
                    {t(link.label)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/contact" onClick={closeMenus} className="btn-primary ml-2 !rounded-lg !px-4 !py-2 text-sm">
            {t('Contact')}
          </Link>
          <Link to="/portal" onClick={closeMenus} aria-label={t('My GURGURE')} className="ml-1 rounded-lg p-2 text-white/65 hover:bg-white/10 hover:text-white">
            {customer?.avatar ? (
              <img src={customer.avatar} alt={customer.name || 'Profile'} className="h-6 w-6 rounded-full object-cover" />
            ) : (
              <FiUser className="h-5 w-5" />
            )}
          </Link>
          <label className="ml-1 flex items-center gap-1 rounded-lg px-2 py-2 text-sm text-white/65 hover:bg-white/10 hover:text-white">
            <FiGlobe className="h-4 w-4" />
            <select
              aria-label="Change language"
              value={lang}
              onChange={(event) => setLang(event.target.value as LangCode)}
              className="cursor-pointer appearance-none bg-transparent text-sm outline-none"
            >
              {LANGUAGES.map((language) => (
                <option key={language.code} value={language.code} className="text-neutral-800">
                  {language.native}
                </option>
              ))}
            </select>
          </label>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-dark lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-5 py-4 sm:px-6">
            {primaryLinks.map((link) => renderLink(link, true))}
            <div className="my-3 border-t border-white/10 pt-3">
              <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">{t('Explore')}</p>
              {moreLinks.map((link) => renderLink(link, true))}
            </div>
            <Link to="/contact" onClick={closeMenus} className="btn-primary mt-3 w-full !rounded-lg text-center">
              {t('Contact')}
            </Link>
            <div className="flex items-center gap-2 px-4 pt-4 text-sm text-white/60">
              <FiGlobe className="h-4 w-4" />
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => {
                    setLang(language.code as LangCode);
                    closeMenus();
                  }}
                  className={`rounded-md px-2 py-1 ${lang === language.code ? 'bg-white/10 text-white' : 'hover:text-white'}`}
                >
                  {language.native}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

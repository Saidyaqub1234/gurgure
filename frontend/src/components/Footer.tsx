import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import type { NavLink } from '@/types';
import { FOOTER_LINKS } from '@/utils/navigation';
import { useLanguage } from '@/i18n/LanguageContext';

interface FooterProps {
  settings?: {
    logo?: string;
    site_name?: string;
    site_tagline?: string;
    site_description?: string;
    email?: string;
    phone?: string;
    kabul_address?: string;
    kandahar_address?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    nav_links?: NavLink[];
    footer_services?: string[];
  };
}

export default function Footer({ settings = {} }: FooterProps) {
  const safeSettings = settings ?? {};
  const siteName = safeSettings.site_name || 'GURGURE';
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="w-full px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="ml-[26px]">
              <div className="flex items-center gap-3 mb-4">
                {safeSettings.logo ? (
                  <img src={safeSettings.logo} alt="Logo" className="h-12 w-auto" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="font-heading font-bold text-xl text-white">G</span>
                  </div>
                )}
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">{siteName}</h3>
                  <p className="text-sm text-white/60">{safeSettings.site_tagline || 'Making Visible Brands'}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {safeSettings.site_description || 'Kabul-based multidisciplinary consultancy delivering end-to-end solutions in management consulting, creative design, and ICT engineering.'}
              </p>
              <div className="flex gap-3">
                {safeSettings.linkedin && (
                  <a href={safeSettings.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                )}
                {safeSettings.facebook && (
                  <a href={safeSettings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                )}
                {safeSettings.instagram && (
                  <a href={safeSettings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">{t('Quick Links')}</h4>
            <div className="space-y-3">
              {FOOTER_LINKS.map((l) => (
                <Link key={l.path} to={l.path} className="block text-white/60 hover:text-white transition-colors text-sm">
                  {t(l.label)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">{t('Services')}</h4>
            <div className="space-y-3">
              {(settings?.footer_services || [
                'Business Development',
                'Branding & Design',
                'Digital Transformation',
                'ICT Infrastructure',
                'Training & Capacity Building',
                'Education Services',
                'Enterprise Solutions',
                'Tech Stack',
              ]).map((s, i) => (
                <Link key={i} to="/services" className="block text-white/60 hover:text-white transition-colors text-sm">
                  {t(s)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">{t('Contact')}</h4>
            <div className="space-y-4 text-sm text-white/70">
              <div>
                <p className="font-semibold text-white mb-1">{t('Kabul (HQ)')}</p>
                <p>{safeSettings.kabul_address || 'Afshare, Kabul, Afghanistan'}</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">{t('Kandahar')}</p>
                <p>{safeSettings.kandahar_address || 'Shaheedano Chowk, Kandahar, Afghanistan'}</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">{t('Contact Details')}</p>
                <p>{t('Email:')} {safeSettings.email || 'info@gurgure.com'}</p>
                <p>{t('Phone:')} {safeSettings.phone || '+93 700 777 480'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="w-full px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} {siteName}. {t('All rights reserved.')}
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('Privacy Policy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('Terms of Service')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

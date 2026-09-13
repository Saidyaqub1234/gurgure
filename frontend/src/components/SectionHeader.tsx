import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, subtitle, align = 'center' }: SectionHeaderProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <h2 className="section-title text-brand-blue">{t(title)}</h2>
      <div className={`w-20 h-1 bg-gradient-brand rounded-full mt-4 mb-6 ${align === 'center' ? 'mx-auto' : ''}`} />
      {subtitle && <p className="section-subtitle">{t(subtitle)}</p>}
    </motion.div>
  );
}

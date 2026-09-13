import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings } from '@/api';
import type { Settings } from '@/types';

const sections = [
  { title: '1. Introduction', content: `GURGURE Company ("we," "us," "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, engage our services, or communicate with us.\n\nPlease read this Privacy Policy carefully. By accessing or using our website or services, you acknowledge that you have read and understand this Privacy Policy.` },
  { title: '2. Information We Collect', content: 'We may collect the following types of information:', subsections: [{ subtitle: '2.1 Personal Information You Provide', text: 'When you contact us, request a quote, apply for a position, or engage our services, you may provide:', bullets: ['Name, email address, phone number, and organization name', 'Billing and payment information', 'Information about your project or service needs', 'Resume or CV when applying for employment', 'Any other information you choose to provide'] }, { subtitle: '2.2 Automatically Collected Information', text: 'When you visit our website, we automatically collect:', bullets: ['IP address and device information', 'Browser type and version', 'Pages you visit and time spent on our site', 'Referring website or source', 'Date and time of visit'] }] },
  { title: '3. How We Use Your Information', content: '', bullets: ['To provide services: Respond to inquiries, deliver consulting services, process payments, and manage client relationships.', 'To improve our website: Analyze how visitors use our site to enhance user experience and content.', 'To communicate: Send updates about your project, respond to requests, and share relevant information about our services.', 'For recruitment: Evaluate job applications and communicate about employment opportunities.', 'For legal compliance: Comply with applicable laws, regulations, and legal processes.'] },
  { title: '4. Cookies & Tracking Technologies', content: 'We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small text files stored on your device that help us remember your preferences and understand how you interact with our site.', bullets: ['Essential cookies: Required for basic website functionality.', 'Analytics cookies: Help us understand how visitors use our site (e.g., Google Analytics).', 'Preference cookies: Remember your settings and preferences.'], extra: 'You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.' },
  { title: '5. How We Share Your Information', content: 'We do not sell, rent, or trade your personal information. We may share your information in the following limited circumstances:', bullets: ['Service providers: With trusted third parties who assist us in operating our website, processing payments, or delivering services (subject to confidentiality agreements).', 'Legal requirements: When required by law, court order, or government regulation.', 'Business transfers: In connection with a merger, acquisition, or sale of assets (with notice to affected users).', 'With your consent: When you have explicitly authorized us to share your information.'] },
  { title: '6. Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:', bullets: ['SSL encryption for data transmission', 'Secure server environments', 'Access controls and authentication protocols', 'Regular security assessments'], extra: 'While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.' },
  { title: '7. Data Retention', content: 'We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.', bullets: ['Client data: Retained for the duration of our engagement and for a reasonable period afterward for legal and business purposes.', 'Inquiry data: Retained for up to 24 months unless you become a client.', 'Job application data: Retained for up to 12 months after position is filled.', 'Website analytics: Retained for up to 26 months (Google Analytics default).'] },
  { title: '8. Your Rights & Choices', content: 'Depending on your location, you may have the following rights regarding your personal information:', bullets: ['Access: Request a copy of the personal information we hold about you.', 'Correction: Request correction of inaccurate or incomplete information.', 'Deletion: Request deletion of your personal information (subject to legal exceptions).', 'Restriction: Request restriction of processing your information.', 'Portability: Request transfer of your data to another organization.', 'Opt-out: Unsubscribe from marketing communications at any time.'], extra: 'To exercise any of these rights, contact us at privacy@gurgure.com. We will respond within 30 days.' },
  { title: '9. Third-Party Links', content: 'Our website may contain links to third-party websites, plugins, or applications. Clicking those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy practices. We encourage you to read the privacy policy of every website you visit.' },
  { title: '10. Children\'s Privacy', content: 'Our website and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us, and we will promptly delete it.' },
  { title: '11. International Data Transfers', content: 'Your information may be transferred to and processed in countries other than your own. We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.' },
  { title: '12. Changes to This Privacy Policy', content: 'We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically. Material changes will be notified through our website or via email where appropriate.' },
  { title: '13. Contact Information', content: 'If you have questions or concerns about this Privacy Policy or our data practices, please contact us:', bullets: ['Email: privacy@gurgure.com', 'Phone: +93 700 777 480', 'Address: Kabul, Afghanistan'], extra: 'For data protection inquiries, you may also contact our designated privacy officer at the same email address.' },
];

export default function Privacy() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try { const s = await getSettings(); setSettings(s); }
      catch (err: any) { setError(err?.response?.data?.message || err?.message || 'Failed to load data'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <PublicLayout><PageLoading /></PublicLayout>;
  if (error || !settings) return <PublicLayout><ErrorState message={error || 'Failed to load settings'} onRetry={() => window.location.reload()} /></PublicLayout>;

  return (
    <PublicLayout settings={settings}>
      <Helmet><title>Privacy Policy - {settings.site_name}</title><meta name="description" content="Privacy Policy for GURGURE Company. Learn how we collect, use, and protect your personal information." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Privacy Policy</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base text-white/80 max-w-2xl mx-auto">Your privacy matters to us. Learn how we collect, use, and protect your information.</motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-neutral-50 rounded-xl p-5 mb-10 text-sm text-neutral-500"><strong>Last Updated:</strong> March 15, 2025</div>
          <div className="bg-brand-blue/5 border-l-4 border-brand-cyan rounded-r-xl p-5 mb-10">
            <p className="text-sm text-neutral-600"><strong>At a glance:</strong> GURGURE Company collects information to provide and improve our services. We do not sell your personal data. We use industry-standard security measures to protect your information. You have control over your data and can request deletion at any time.</p>
          </div>

          {sections.map((s) => (
            <div key={s.title} className="mb-10">
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-4 pb-2 border-b border-neutral-200">{s.title}</h2>
              {s.content && <p className="text-neutral-600 mb-4 leading-relaxed">{s.content}</p>}
              {s.subsections?.map((sub) => (
                <div key={sub.subtitle} className="mt-6">
                  <h3 className="text-lg font-semibold text-brand-blue mb-2">{sub.subtitle}</h3>
                  {sub.text && <p className="text-neutral-600 mb-3">{sub.text}</p>}
                  {sub.bullets && <ul className="ml-6 space-y-2">{sub.bullets.map((b) => <li key={b} className="list-disc text-neutral-600">{b}</li>)}</ul>}
                </div>
              ))}
              {s.bullets && !s.subsections && <ul className="ml-6 space-y-2">{s.bullets.map((b) => <li key={b} className="list-disc text-neutral-600">{b}</li>)}</ul>}
              {s.extra && <p className="text-neutral-600 mt-3">{s.extra}</p>}
            </div>
          ))}

          <div className="bg-brand-dark text-white rounded-xl p-6 mt-8">
            <p><strong>Your Trust Matters</strong><br />We are committed to protecting your privacy and handling your data responsibly. If you have any concerns, please don't hesitate to reach out.</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

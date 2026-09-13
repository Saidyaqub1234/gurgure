import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PublicLayout from '@/layouts/PublicLayout';
import { PageLoading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { getSettings } from '@/api';
import type { Settings } from '@/types';

const sections = [
  { title: '1. Acceptance of Terms', content: `By accessing or using the GURGURE Company website ("Site") or engaging our consulting, branding, digital transformation, training, or other professional services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site or Services.\n\nGURGURE Company ("we," "us," "our") reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the Site or Services after any changes constitutes acceptance of the revised Terms.` },
  { title: '2. Definitions', bullets: ['"Client" means any individual, organization, or entity that engages GURGURE for professional Services.', '"Deliverables" means the final outputs, reports, designs, systems, or other materials provided to Client as part of an engagement.', '"Confidential Information" means any non-public information disclosed by either party to the other, including business strategies, financial data, client lists, and proprietary processes.'] },
  { title: '3. Our Services', content: 'GURGURE provides integrated consulting and digital solutions including but not limited to:', bullets: ['Business Development & Strategic Management', 'Branding, Graphic Design & Creative Solutions', 'System Development & Digital Transformation (MIS, ERP, HR, Finance systems)', 'Website Hosting & Development', 'ICT Infrastructure & Technical Solutions', 'Strategic Communication & Digital Marketing', 'Trainings, Seminars & Capacity Building', 'Corporate Presentations & Business Communication'], extra: 'Each engagement is governed by a separate Service Agreement that outlines specific scope, deliverables, timeline, and fees.' },
  { title: '4. Client Responsibilities', content: 'When engaging GURGURE for Services, Clients agree to:', bullets: ['Provide accurate, complete, and timely information necessary for the performance of Services', 'Designate a point of contact with authority to make decisions and provide feedback', 'Review and provide feedback on deliverables within agreed timeframes', 'Obtain all necessary consents and permissions for any third-party materials provided to GURGURE', 'Ensure compliance with all applicable laws and regulations'] },
  { title: '5. Fees & Payment', content: 'Fees for Services are outlined in each Service Agreement. Payment terms are as follows:', bullets: ['A deposit of 30-50% may be required before work commences, depending on project scope', 'Final payment is due upon completion or according to agreed milestone schedule', 'All fees are in the currency specified in the Service Agreement', 'Late payments may incur interest charges of 1.5% per month or the maximum permitted by law', 'Client is responsible for any bank transfer fees or currency conversion costs'] },
  { title: '6. Intellectual Property Rights', subsections: [{ subtitle: '6.1 Deliverables', text: 'Upon full payment of all fees due, GURGURE assigns to Client all right, title, and interest in and to the final Deliverables specifically created for the Client under a Service Agreement. This includes logos, brand guidelines, custom software, websites, and strategic reports.' }, { subtitle: '6.2 Pre-Existing Materials', text: 'Any pre-existing intellectual property owned by GURGURE or licensed from third parties remains the property of GURGURE or the respective owner. Client receives a non-exclusive, perpetual license to use such materials as incorporated into Deliverables.' }, { subtitle: '6.3 Portfolio Rights', text: 'GURGURE retains the right to display Deliverables in our portfolio, case studies, and marketing materials, unless Client specifically requests confidentiality in writing.' }] },
  { title: '7. Confidentiality', content: 'Both parties agree to treat Confidential Information with the same degree of care they use for their own confidential information. Confidential Information does not include information that:', bullets: ['Is or becomes publicly available through no fault of the receiving party', 'Was already in the receiving party\'s possession without confidentiality obligations', 'Is independently developed by the receiving party without use of Confidential Information', 'Is required to be disclosed by law'] },
  { title: '8. Warranties & Disclaimers', content: 'GURGURE warrants that Services will be performed in a professional and workmanlike manner consistent with industry standards. EXCEPT AS EXPRESSLY STATED, GURGURE DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.\n\nGURGURE does not warrant that our Services will be uninterrupted, error-free, or that all errors can be corrected. Results from strategic, branding, or marketing services are not guaranteed and depend on many factors outside our control.' },
  { title: '9. Limitation of Liability', content: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, GURGURE\'S TOTAL LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT TO GURGURE IN THE SIX MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.\n\nIN NO EVENT SHALL GURGURE BE LIABLE FOR CONSEQUENTIAL, INCIDENTAL, INDIRECT, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS OR DATA, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.' },
  { title: '10. Website Use', content: 'When using our website, you agree not to:', bullets: ['Violate any applicable laws or regulations', 'Infringe on the intellectual property rights of GURGURE or others', 'Transmit any malicious code, viruses, or harmful content', 'Attempt to gain unauthorized access to our systems or other users\' information', 'Use automated systems (bots, scrapers) to access our Site without permission', 'Interfere with the proper functioning of the Site'] },
  { title: '11. Termination', content: 'Either party may terminate a Service Agreement with written notice if the other party materially breaches the agreement and fails to cure the breach within 15 days of receiving notice. Upon termination, Client shall pay for all Services performed up to the termination date.\n\nGURGURE may suspend access to our website or Services if we reasonably believe you have violated these Terms.' },
  { title: '12. Indemnification', content: 'Client agrees to indemnify and hold harmless GURGURE, its employees, and contractors from any claims, damages, or expenses arising from Client\'s breach of these Terms, violation of applicable laws, or use of Deliverables in a manner not authorized by these Terms.' },
  { title: '13. Governing Law & Dispute Resolution', content: 'These Terms shall be governed by and construed in accordance with the laws of Afghanistan. Any dispute arising from these Terms or our Services shall first be attempted to be resolved through good-faith negotiations. If unresolved, disputes shall be submitted to binding arbitration in Kabul, Afghanistan, in accordance with the rules of the Afghanistan Commercial Arbitration Act.' },
  { title: '14. Third-Party Services & Links', content: 'Our website may contain links to third-party websites or integrate with third-party tools. We are not responsible for the content, privacy practices, or terms of these third parties. Your interactions with third parties are governed by their own terms and policies.' },
  { title: '15. Force Majeure', content: 'Neither party shall be liable for delays or failures in performance resulting from causes beyond reasonable control, including natural disasters, war, terrorism, pandemic, government actions, or internet outages.' },
  { title: '16. Entire Agreement', content: 'These Terms, together with any applicable Service Agreement and our Privacy Policy, constitute the entire agreement between you and GURGURE regarding your use of our Site and Services, superseding any prior agreements or understandings.' },
  { title: '17. Contact Information', content: 'If you have any questions about these Terms, please contact us:', bullets: ['Email: legal@gurgure.com', 'Phone: +93 700 777 480', 'Address: Kabul, Afghanistan'] },
];

export default function Terms() {
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
      <Helmet><title>Terms of Service - {settings.site_name}</title><meta name="description" content="Terms of Service for GURGURE Company. Legal terms governing the use of our website and engagement with our services." /></Helmet>

      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-brand">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Terms of Service</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base text-white/80 max-w-2xl mx-auto">Please read these terms carefully before using our website or engaging our services.</motion.p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-neutral-50 rounded-xl p-5 mb-10 text-sm text-neutral-500"><strong>Last Updated:</strong> March 15, 2025</div>

          {sections.map((s) => (
            <div key={s.title} className="mb-10">
              <h2 className="text-xl font-heading font-bold text-brand-blue mb-4 pb-2 border-b border-neutral-200">{s.title}</h2>
              {s.content && <p className="text-neutral-600 mb-4 leading-relaxed whitespace-pre-line">{s.content}</p>}
              {s.subsections?.map((sub) => (
                <div key={sub.subtitle} className="mt-6">
                  <h3 className="text-lg font-semibold text-brand-blue mb-2">{sub.subtitle}</h3>
                  <p className="text-neutral-600 leading-relaxed">{sub.text}</p>
                </div>
              ))}
              {s.bullets && <ul className="ml-6 space-y-2">{s.bullets.map((b) => <li key={b} className="list-disc text-neutral-600">{b}</li>)}</ul>}
              {s.extra && <p className="text-neutral-600 mt-3">{s.extra}</p>}
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

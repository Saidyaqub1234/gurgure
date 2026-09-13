import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import RichEditor from '@/components/RichEditor';
import { adminSettings, uploadFile } from '@/api';
import { useLanguage } from '@/i18n/LanguageContext';

const jsonArrayLineKeys = ['hero_images', 'footer_services'];

const parseValue = (key: string, val: any): string => {
  if (!val) return '';
  if (jsonArrayLineKeys.includes(key)) {
    try {
      const arr = JSON.parse(val);
      return Array.isArray(arr) ? arr.join('\n') : String(val);
    } catch {
      return String(val);
    }
  }
  return String(val);
};

const serializeValue = (key: string, val: string): string => {
  if (jsonArrayLineKeys.includes(key)) {
    const lines = val.split('\n').map(l => l.trim()).filter(Boolean);
    return JSON.stringify(lines);
  }
  return val;
};

const parseJsonSafe = <T,>(val: any, fallback: T): T => {
  try {
    const parsed = JSON.parse(val || '');
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
};

const sections = [
  {
    title: 'General',
    fields: [
      { key: 'site_name', label: 'Site Name', type: 'text' },
      { key: 'site_tagline', label: 'Site Tagline', type: 'text' },
      { key: 'site_description', label: 'Site Description', type: 'textarea' },
    ],
  },
  {
    title: 'Contact',
    fields: [
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'phone', label: 'Phone', type: 'tel' },
    ],
  },
  {
    title: 'Addresses',
    fields: [
      { key: 'kabul_address', label: 'Kabul Address', type: 'textarea' },
      { key: 'kandahar_address', label: 'Kandahar Address', type: 'textarea' },
    ],
  },
  {
    title: 'Social Media',
    fields: [
      { key: 'linkedin', label: 'LinkedIn', type: 'url' },
      { key: 'facebook', label: 'Facebook', type: 'url' },
      { key: 'instagram', label: 'Instagram', type: 'url' },
      { key: 'twitter', label: 'Twitter', type: 'url' },
      { key: 'youtube', label: 'YouTube', type: 'url' },
    ],
  },
  {
    title: 'About Page',
    fields: [
      { key: 'about_vision', label: 'Vision', type: 'editor' },
      { key: 'about_mission', label: 'Mission', type: 'editor' },
      { key: 'about_history', label: 'History', type: 'editor' },
    ],
  },
  {
    title: 'Hero Section',
    fields: [
      { key: 'hero_title', label: 'Hero Title', type: 'text' },
      { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
    ],
  },
];

const translatableTypes = ['text', 'textarea', 'editor'];
const translatableSections = sections
  .map((s) => ({ title: s.title, fields: s.fields.filter((f) => translatableTypes.includes(f.type)) }))
  .filter((s) => s.fields.length > 0);

const LANG_BADGES: Record<string, string> = {
  fa: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  ps: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
};
const LANG_NAMES: Record<string, string> = { fa: 'دری', ps: 'پښتو' };

interface RowEditorProps {
  value: string;
  onChange: (v: string) => void;
}

function StatsEditor({ value, onChange }: RowEditorProps) {
  const items = parseJsonSafe<any[]>(value, []);
  const write = (next: any[]) => onChange(JSON.stringify(next));
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2 items-start">
          <input
            className="admin-input flex-1"
            placeholder="Label (e.g. Projects Completed)"
            value={it.label || ''}
            onChange={e => { const n = [...items]; n[i] = { ...it, label: e.target.value }; write(n); }}
          />
          <input
            type="number"
            className="admin-input w-24"
            placeholder="450"
            value={it.end ?? ''}
            onChange={e => { const n = [...items]; n[i] = { ...it, end: parseInt(e.target.value) || 0 }; write(n); }}
          />
          <input
            className="admin-input w-16 text-center"
            placeholder="+"
            maxLength={3}
            value={it.suffix ?? ''}
            onChange={e => { const n = [...items]; n[i] = { ...it, suffix: e.target.value }; write(n); }}
          />
          <button onClick={() => write(items.filter((_, j) => j !== i))} className="mt-2 text-red-400 hover:text-red-300 shrink-0" title="Remove">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button onClick={() => write([...items, { label: '', end: 0, suffix: '+' }])} className="text-sm font-medium text-brand-blue-light hover:text-white transition-colors">
        + Add Stat
      </button>
    </div>
  );
}

function NavLinksEditor({ value, onChange }: RowEditorProps) {
  const items = parseJsonSafe<any[]>(value, []);
  const write = (next: any[]) => onChange(JSON.stringify(next));
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2 items-start">
          <input
            className="admin-input w-36"
            placeholder="/path"
            value={it.path || ''}
            onChange={e => { const n = [...items]; n[i] = { ...it, path: e.target.value }; write(n); }}
          />
          <input
            className="admin-input flex-1"
            placeholder="Label (e.g. About)"
            value={it.label || ''}
            onChange={e => { const n = [...items]; n[i] = { ...it, label: e.target.value }; write(n); }}
          />
          <button onClick={() => write(items.filter((_, j) => j !== i))} className="mt-2 text-red-400 hover:text-red-300 shrink-0" title="Remove">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button onClick={() => write([...items, { path: '/', label: '' }])} className="text-sm font-medium text-brand-blue-light hover:text-white transition-colors">
        + Add Link
      </button>
    </div>
  );
}

function StepsEditor({ value, onChange }: RowEditorProps) {
  const items = parseJsonSafe<any[]>(value, []);
  const write = (next: any[]) => onChange(JSON.stringify(next));
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
          <div className="flex gap-2">
            <span className="text-xs font-bold text-white/60 mt-3">{i + 1}.</span>
            <input
              className="admin-input flex-1"
              placeholder="Step title (e.g. Discover)"
              value={it.title || ''}
              onChange={e => { const n = [...items]; n[i] = { ...it, title: e.target.value }; write(n); }}
            />
            <button onClick={() => write(items.filter((_, j) => j !== i))} className="mt-2 text-red-400 hover:text-red-300 shrink-0" title="Remove">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <textarea
            className="admin-input min-h-[70px]"
            rows={3}
            placeholder="One item per line"
            value={it.description || ''}
            onChange={e => { const n = [...items]; n[i] = { ...it, description: e.target.value }; write(n); }}
          />
        </div>
      ))}
      <button onClick={() => write([...items, { title: '', description: '' }])} className="text-sm font-medium text-brand-blue-light hover:text-white transition-colors">
        + Add Step
      </button>
    </div>
  );
}

function FooterServicesEditor({ value, onChange }: RowEditorProps) {
  return (
    <textarea
      className="admin-input min-h-[120px]"
      rows={6}
      placeholder={'One service per line, e.g.\nStrategic Management & Advisory\nDigital Marketing'}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

function PageHeroEditor({ value, onChange }: RowEditorProps) {
  const obj = parseJsonSafe<Record<string, any>>(value, {});
  const pages = ['home', 'about', 'services', 'portfolio', 'clients', 'blog', 'contact', 'team', 'faq'];
  const setField = (page: string, field: string, v: string) => {
    const next = { ...obj };
    if (!next[page]) next[page] = {};
    next[page] = { ...next[page], [field]: v };
    onChange(JSON.stringify(next));
  };
  return (
    <div className="space-y-4">
      {pages.map((p) => (
        <div key={p} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-blue-light">{p}</p>
          <input
            className="admin-input"
            placeholder={`Title (${p})`}
            value={obj[p]?.title || ''}
            onChange={e => setField(p, 'title', e.target.value)}
          />
          <textarea
            className="admin-input"
            rows={2}
            placeholder={`Subtitle (${p})`}
            value={obj[p]?.subtitle || ''}
            onChange={e => setField(p, 'subtitle', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

function CtaEditor({ value, onChange }: RowEditorProps) {
  const obj = parseJsonSafe<Record<string, any>>(value, {});
  const pages = ['home', 'about', 'services', 'portfolio'];
  const setField = (page: string, field: string, v: string) => {
    const next = { ...obj };
    if (!next[page]) next[page] = {};
    next[page] = { ...next[page], [field]: v };
    onChange(JSON.stringify(next));
  };
  return (
    <div className="space-y-4">
      {pages.map((p) => (
        <div key={p} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-blue-light">{p}</p>
          <input
            className="admin-input"
            placeholder={`CTA Title (${p})`}
            value={obj[p]?.title || ''}
            onChange={e => setField(p, 'title', e.target.value)}
          />
          <textarea
            className="admin-input"
            rows={2}
            placeholder={`Subtitle (${p})`}
            value={obj[p]?.subtitle || ''}
            onChange={e => setField(p, 'subtitle', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="admin-input"
              placeholder="Button Text"
              value={obj[p]?.button_text || ''}
              onChange={e => setField(p, 'button_text', e.target.value)}
            />
            <input
              className="admin-input"
              placeholder="Button Link (/contact)"
              value={obj[p]?.button_link || ''}
              onChange={e => setField(p, 'button_link', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroImagesEditor({ value, onChange }: RowEditorProps) {
  const urls = parseJsonSafe<string[]>(value, []);
  const [busy, setBusy] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const res = await uploadFile(file);
        uploaded.push(res.url);
      }
      onChange(JSON.stringify([...urls, ...uploaded]));
      toast.success(`${uploaded.length} image(s) uploaded`);
    } catch {
      toast.error('Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-white/20 bg-white/[0.03] text-sm text-white cursor-pointer hover:bg-white/[0.06] transition-all">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        {busy ? 'Uploading...' : 'Upload Images'}
        <input type="file" accept="image/*" multiple className="hidden" disabled={busy} onChange={e => { handleFiles(e.target.files); e.target.value = ''; }} />
      </label>
      {urls.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {urls.map((u, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video">
              <img src={u} alt={`hero-${i + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => onChange(JSON.stringify(urls.filter((_, j) => j !== i)))}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                title="Remove"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminSettings() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await adminSettings.get();
      const parsed: any = {};
      Object.keys(data).forEach(key => {
        parsed[key] = parseValue(key, (data as any)[key]);
      });
      setSettings(parsed);
    } catch {
      toast.error(t('Failed to save settings'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const result = await uploadFile(file);
      setSettings(prev => ({ ...prev, logo: result.url }));
      toast.success(t('Logo uploaded'));
    } catch {
      toast.error(t('Logo upload failed'));
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const serialized: any = {};
      Object.keys(settings).forEach(key => {
        serialized[key] = serializeValue(key, (settings as any)[key]);
      });
      await adminSettings.update(serialized);
      toast.success(t('Settings saved'));
    } catch {
      toast.error(t('Failed to save settings'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  const customEditors: { title: string; key: string; render: (v: string, ch: (v: string) => void) => JSX.Element }[] = [
    { title: 'Hero Images', key: 'hero_images', render: (v, ch) => <HeroImagesEditor value={v} onChange={ch} /> },
    { title: 'Home Stats', key: 'home_stats', render: (v, ch) => <StatsEditor value={v} onChange={ch} /> },
    { title: 'Navigation Links', key: 'nav_links', render: (v, ch) => <NavLinksEditor value={v} onChange={ch} /> },
    { title: 'Footer Services', key: 'footer_services', render: (v, ch) => <FooterServicesEditor value={v} onChange={ch} /> },
    { title: 'Approach Steps', key: 'approach_steps', render: (v, ch) => <StepsEditor value={v} onChange={ch} /> },
    { title: 'Page Heroes', key: 'page_hero_data', render: (v, ch) => <PageHeroEditor value={v} onChange={ch} /> },
    { title: 'CTA Sections', key: 'cta_data', render: (v, ch) => <CtaEditor value={v} onChange={ch} /> },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">{t('Settings')}</h1>
            <p className="text-white/60 mt-1">{t('Manage website configuration')}</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
            {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {t('Save Settings')}
          </button>
        </div>

        {/* Logo Section */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-4 pb-3 border-b border-white/[0.06]">
            {t('Logo')}
          </h2>
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              {settings.logo ? (
                <img src={settings.logo} alt="Logo" className="w-32 h-32 object-contain rounded-xl border border-white/[0.1]" />
              ) : (
                <div className="w-32 h-32 rounded-xl bg-white/[0.05] flex items-center justify-center text-white/50 text-sm border-2 border-dashed border-white/[0.1]">
                  {t('No logo')}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="admin-label">{t('Upload Logo')}</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploadingLogo}
                className="admin-input"
              />
              {uploadingLogo && <p className="text-sm text-brand-blue-light mt-1">Uploading...</p>}
              {settings.logo && (
                <button
                  onClick={() => setSettings(prev => ({ ...prev, logo: '' }))}
                  className="text-sm text-red-400 hover:text-red-300 mt-2"
                >
                  {t('Remove logo')}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.title} className="admin-card p-6">
              <h2 className="text-lg font-heading font-bold text-white mb-4 pb-3 border-b border-white/[0.06]">
                {t(section.title)}
              </h2>
              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="admin-label">
                      {t(field.label)}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="admin-input min-h-[100px]"
                        value={settings[field.key] || ''}
                        onChange={e => handleChange(field.key, e.target.value)}
                        placeholder={`Enter ${t(field.label)}`}
                        rows={4}
                      />
                    ) : field.type === 'editor' ? (
                      <RichEditor
                        value={settings[field.key] || ''}
                        onChange={(value) => handleChange(field.key, value)}
                        placeholder={`${t(field.label)}...`}
                        minHeight={150}
                        theme="dark"
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="admin-input"
                        value={settings[field.key] || ''}
                        onChange={e => handleChange(field.key, e.target.value)}
                        placeholder={`Enter ${t(field.label)}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {customEditors.map((ed) => (
            <div key={ed.key} className="admin-card p-6">
              <h2 className="text-lg font-heading font-bold text-white mb-4 pb-3 border-b border-white/[0.06]">{ed.title}</h2>
              {ed.render(settings[ed.key] || '', (v) => handleChange(ed.key, v))}
            </div>
          ))}
        </div>

        {/* Translations */}
        <div className="admin-card p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-1">
            {t('Translations')}
          </h2>
          <p className="text-sm font-normal text-white/60 mb-5">دری / پښتو — leave blank to use English</p>
          {translatableSections.map((section) => (
            <div key={section.title} className="mb-7 last:mb-0">
              <h3 className="text-sm font-bold text-brand-blue-light uppercase tracking-wide mb-3">{t(section.title)}</h3>
              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <p className="text-sm font-semibold text-white mb-2">{t(field.label)}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(['fa', 'ps'] as const).map((lang) => (
                        <div key={lang}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span dir="rtl" className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${LANG_BADGES[lang]}`}>{LANG_NAMES[lang]}</span>
                            <span className="text-[11px] text-white/50">{t(field.label)}</span>
                          </div>
                          <textarea
                            dir="rtl"
                            rows={field.type === 'editor' ? 3 : 2}
                            className="admin-input"
                            placeholder={t(field.label)}
                            value={settings[`${field.key}_${lang}`] || ''}
                            onChange={(e) => handleChange(`${field.key}_${lang}`, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving} className="btn-primary px-8 py-3 flex items-center gap-2">
            {saving && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {t('Save All Settings')}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

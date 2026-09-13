import { useLanguage } from '@/i18n/LanguageContext';

interface Props {
  fields: { name: string; label: string; type?: 'input' | 'textarea' }[];
  value: Record<string, any> | null | undefined;
  onChange: (next: Record<string, any>) => void;
}

const LANGS = [
  { code: 'fa' as const, native: 'دری', english: 'Dari', badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40', ring: 'focus:border-emerald-400/60' },
  { code: 'ps' as const, native: 'پښتو', english: 'Pashto', badge: 'bg-sky-500/20 text-sky-200 border-sky-400/40', ring: 'focus:border-sky-400/60' },
];

const FIELD_LABELS: Record<string, Record<'fa' | 'ps', string>> = {
  title: { fa: 'عنوان', ps: 'سرلیک' },
  description: { fa: 'توضیحات', ps: 'تشریح' },
  content: { fa: 'محتوا', ps: 'منځپانګه' },
  excerpt: { fa: 'خلاصه', ps: 'لنډیز' },
  challenge: { fa: 'چالش', ps: 'ننګونه' },
  solution: { fa: 'راه‌حل', ps: 'حل' },
  outcome: { fa: 'نتیجه', ps: 'پایله' },
  question: { fa: 'سوال', ps: 'پوښتنه' },
  answer: { fa: 'پاسخ', ps: 'ځواب' },
  name: { fa: 'نام', ps: 'نوم' },
  position: { fa: 'سمت', ps: 'دنده' },
  bio: { fa: 'بیوگرافی', ps: 'ژوندلیک' },
  client: { fa: 'مشتری', ps: 'مشتري' },
  tag: { fa: 'خدمت / برچسب', ps: 'خدمت / ټاګ' },
  delivery_time: { fa: 'زمان تحویل', ps: 'د سپارلو وخت' },
  meta_title: { fa: 'عنوان متا', ps: 'متا سرلیک' },
  meta_description: { fa: 'توضیحات متا', ps: 'متا تشریح' },
};

export default function TranslationFields({ fields, value, onChange }: Props) {
  const { lang } = useLanguage();
  const tr = value && typeof value === 'object' ? value : {};

  const set = (code: string, field: string, v: string) => {
    const next = JSON.parse(JSON.stringify(tr));
    if (!next[code]) next[code] = {};
    if (v === '') delete next[code][field];
    else next[code][field] = v;
    if (Object.keys(next[code]).length === 0) delete next[code];
    onChange(next);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-5">
      <p className="text-sm font-bold text-white">
        Translations <span className="font-normal text-white/60">— دری / پښتو</span>
      </p>
      {LANGS.map(({ code, native, english, badge, ring }) => (
        <div key={code} className={`rounded-lg border ${code === 'fa' ? 'border-emerald-500/20' : 'border-sky-500/20'} p-3 space-y-3 bg-white/[0.02]`}>
          <div className="flex items-center gap-2">
            <span dir="rtl" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${badge}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {native}
            </span>
            <span className="text-xs font-semibold text-white/80">{english}</span>
          </div>
          {fields.map((f) => {
            const localized = FIELD_LABELS[f.name]?.[code] || f.label;
            return (
              <div key={f.name}>
                <label className="block text-sm font-medium text-white mb-1.5">
                  <span dir="rtl">{localized}</span>
                  <span className="text-white/50 ml-1.5 text-xs">({f.label})</span>
                </label>
                {f.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    dir="rtl"
                    placeholder={localized}
                    className={`w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 ${ring}`}
                    value={(tr[code] && tr[code][f.name]) || ''}
                    onChange={(e) => set(code, f.name, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    dir="rtl"
                    placeholder={localized}
                    className={`w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 ${ring}`}
                    value={(tr[code] && tr[code][f.name]) || ''}
                    onChange={(e) => set(code, f.name, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

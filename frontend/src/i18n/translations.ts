export type LangCode = 'en' | 'fa' | 'ps';

export const LANGUAGES: { code: LangCode; label: string; native: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'fa', label: 'Dari', native: 'دری', dir: 'rtl' },
  { code: 'ps', label: 'Pashto', native: 'پښتو', dir: 'rtl' },
];

import { core } from './dicts/core';
import { home } from './dicts/home';
import { about } from './dicts/about';
import { services } from './dicts/services';
import { portfolio } from './dicts/portfolio';
import { contact } from './dicts/contact';
import { quote } from './dicts/quote';
import { auth } from './dicts/auth';
import { legal } from './dicts/legal';
import { admin } from './dicts/admin';
import { adminCrud1 } from './dicts/adminCrud1';
import { adminCrud2 } from './dicts/adminCrud2';
import { adminBilling } from './dicts/adminBilling';

const dictGroups = [core, home, about, services, portfolio, contact, quote, auth, legal, admin, adminCrud1, adminCrud2, adminBilling];

function mergeDicts(lang: 'fa' | 'ps'): Record<string, string> {
  const out: Record<string, string> = {};
  for (const group of dictGroups) Object.assign(out, group[lang]);
  return out;
}

export const TRANSLATIONS: Record<LangCode, Record<string, string>> = {
  en: {},
  fa: mergeDicts('fa'),
  ps: mergeDicts('ps'),
};

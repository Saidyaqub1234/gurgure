import type { NavLink } from '@/types';

export const STATIC_NAV: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/solutions', label: 'Solutions' },
  {
    path: '/services',
    label: 'Services',
    children: [
      { path: '/services', label: 'All Services' },
      { path: '/development', label: 'Business Development' },
      { path: '/branding', label: 'Branding & Design' },
      { path: '/digital', label: 'Digital & ICT' },
      { path: '/training', label: 'Training' },
      { path: '/education', label: 'Education' },
      { path: '/enterprise', label: 'Enterprise' },
      { path: '/ventures', label: 'Ventures' },
      { path: '/print', label: 'Print & Production' },
    ],
  },
  {
    path: '/software',
    label: 'Software',
    children: [
      { path: '/software', label: 'All Software' },
      { path: '/software?cat=Business Systems', label: 'Business Systems' },
      { path: '/software?cat=Institutional Systems', label: 'Institutional Systems' },
      { path: '/software?cat=Education Systems', label: 'Education Systems' },
      { path: '/software?cat=Digital Platforms', label: 'Digital Platforms' },
      { path: '/software?cat=Database Solutions', label: 'Database Solutions' },
    ],
  },
  { path: '/marketplace', label: 'Marketplace' },
  {
    path: '/print',
    label: 'Print',
    children: [
      { path: '/print', label: 'Print Shop' },
      { path: '/print/cart', label: 'My Cart' },
    ],
  },
  {
    path: '/portfolio',
    label: 'Work',
    children: [
      { path: '/portfolio', label: 'Portfolio' },
      { path: '/case-studies', label: 'Case Studies' },
    ],
  },
  { path: '/blog', label: 'Insights' },
  {
    path: '/about',
    label: 'About',
    children: [
      { path: '/about', label: 'Our Story' },
      { path: '/approach', label: 'Our Approach' },
      { path: '/technology', label: 'Tech Stack' },
      { path: '/team', label: 'Team' },
      { path: '/career', label: 'Careers' },
      { path: '/faq', label: 'FAQ' },
    ],
  },
  { path: '/contact', label: 'Contact' },
  { path: '/portal', label: 'My GURGURE' },
];

export const FOOTER_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Software', path: '/software' },
  { label: 'Print Shop', path: '/print' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Ventures', path: '/ventures' },
  { label: 'Insights', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Careers', path: '/career' },
];
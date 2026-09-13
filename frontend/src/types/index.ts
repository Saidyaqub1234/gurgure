export interface StatItem {
  label: string;
  end: number;
  suffix: string;
}

export interface NavLink {
  path: string;
  label: string;
  children?: { path: string; label: string }[];
}

export interface ApproachStep {
  title: string;
  description: string;
}

export interface PageHero {
  title: string;
  subtitle: string;
}

export interface CTAItem {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
}

export interface Settings {
  site_name: string;
  site_tagline: string;
  site_description: string;
  logo: string;
  email: string;
  phone: string;
  kabul_address: string;
  kandahar_address: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  about_vision: string;
  about_mission: string;
  about_history: string;
  hero_title: string;
  hero_subtitle: string;
  hero_images: string[];
  home_stats: StatItem[];
  nav_links: NavLink[];
  footer_services: string[];
  approach_steps: ApproachStep[];
  page_hero_data: Record<string, PageHero>;
  cta_data: Record<string, CTAItem>;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  items: string[];
  image: string | null;
  category: string | null;
  order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  client: string | null;
  sector: string | null;
  service: string | null;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  image: string | null;
  images: string[] | null;
  order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  author: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  name: string;
  organization: string | null;
  email: string;
  phone: string | null;
  service_interest: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  sections: Record<string, any> | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  website: string | null;
  sector: string | null;
  order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  slug: string;
  position: string | null;
  bio: string | null;
  photo: string | null;
  email: string | null;
  phone: string | null;
  order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string | null;
  company: string | null;
  content: string;
  avatar: string | null;
  rating: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: number;
  client: string;
  slug: string;
  tag: string | null;
  challenge: string;
  solution: string;
  results: string[] | null;
  testimonial: string | null;
  order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  name: string;
  organization_name: string | null;
  email: string;
  phone: string | null;
  avatar?: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  pages: number;
  services: number;
  customers: number;
  packages: number;
  projects: number;
  blogs: number;
  clients: number;
  team_members: number;
  testimonials: number;
  case_studies: number;
  faqs: number;
  contacts: number;
  unread_contacts: number;
  subscribers: number;
  quotations: number;
  invoices: number;
  receipts: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Quotation System Types
export interface ServicePackage {
  id: number;
  service_id: number;
  name: string;
  level: string;
  description: string | null;
  base_price: string;
  delivery_time: string | null;
  is_active: boolean;
  items?: ServicePackageItem[];
  service?: Service;
}

export interface ServicePackageItem {
  id: number;
  package_id: number;
  name: string;
  description: string | null;
  price: string;
  pricing_type: string;
  quantity_enabled: boolean;
  is_optional: boolean;
  is_active: boolean;
}

export interface ServiceWithPackages extends Service {
  packages: (ServicePackage & { items: ServicePackageItem[] })[];
}

export interface QuotationItem {
  id?: number;
  service_id: number | null;
  package_id: number | null;
  package_item_id: number | null;
  item_name: string;
  description: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface QuotationCustomer {
  name: string;
  organization_name: string;
  email: string;
  phone: string;
  avatar?: string | null;
  address: string;
}

export interface Quotation {
  id?: number;
  quotation_no: string;
  customer_id: number;
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  status: string;
  valid_until: string | null;
  notes: string | null;
  created_at?: string;
  items: QuotationItem[];
  customer?: QuotationCustomer;
}

export interface Invoice {
  id: number;
  invoice_no: string;
  quotation_id: number | null;
  customer_id: number;
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  paid_amount: string;
  balance: string;
  status: string;
  due_date: string | null;
  created_at?: string;
  customer?: QuotationCustomer;
  payments?: Payment[];
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  service_id: number | null;
  item_name: string;
  description: string | null;
  quantity: number;
  unit_price: string;
  total_price: string;
  service?: Service;
}

export interface Payment {
  id: number;
  invoice_id: number;
  customer_id: number;
  amount: string;
  payment_method: string | null;
  transaction_reference: string | null;
  payment_date: string;
  notes: string | null;
}

export interface Receipt {
  id: number;
  receipt_no: string;
  invoice_id: number;
  payment_id: number;
  customer_id: number;
  amount: string;
  issued_date: string;
}

// Print Shop Types
export type PrintPriceMode = 'instant' | 'estimated' | 'quote';
export type PrintOptionPriceType = 'none' | 'per_unit' | 'one_time';
export type PrintGroupType = 'radio' | 'select' | 'checkbox';

export interface PrintOption {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  price_type: PrintOptionPriceType;
  is_default: boolean;
}

export interface PrintOptionGroup {
  id: number;
  name: string;
  type: PrintGroupType;
  required: boolean;
  order?: number;
  options: PrintOption[];
}

export interface PrintPriceRule {
  id?: number;
  min_qty: number;
  max_qty: number | null;
  unit_price: number;
}

export interface PrintProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  short_description: string | null;
  description?: string | null;
  image: string | null;
  price_mode: PrintPriceMode;
  base_price: number | null;
  setup_cost?: number;
  min_quantity: number;
  unit_label?: string | null;
  turnaround?: string | null;
  is_published?: boolean;
  order?: number;
  translations?: Record<string, any>;
  starting_price?: number;
  option_groups: PrintOptionGroup[];
  price_rules?: PrintPriceRule[];
}

export interface PrintLineItem {
  label: string;
  amount: number;
  type: 'printing' | 'option' | 'finishing' | 'setup';
}

export interface PrintPriceBreakdown {
  mode: PrintPriceMode;
  product_id: number;
  product_slug: string;
  qty: number;
  unit_price: number;
  effective_per_unit: number;
  line_items: PrintLineItem[];
  total: number;
  currency: string;
  options: string[];
  estimate_low: number | null;
  estimate_high: number | null;
}

export interface PrintCartItem {
  key: string;
  slug: string;
  product_id: number;
  name: string;
  image: string | null;
  price_mode: PrintPriceMode;
  unit_label?: string | null;
  turnover?: string | null;
  qty: number;
  selections: Record<number, number[]>;
  selectedNames: string[];
  price?: PrintPriceBreakdown | null;
}

export interface PrintOrderItem {
  product_id: number;
  slug: string;
  name: string;
  qty: number;
  mode: PrintPriceMode;
  options: string[];
  unit_price: number;
  effective_per_unit: number;
  line_items: PrintLineItem[];
  total: number;
  estimate_low: number | null;
  estimate_high: number | null;
}

export interface PrintOrder {
  id: number;
  order_no: string;
  customer_id: number | null;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  items: PrintOrderItem[];
  subtotal: number;
  total: number;
  status: string;
  notes: string | null;
  created_at?: string;
}

// Software Section Types
export type SoftwarePricingMode = 'quote' | 'one_time' | 'subscription';

export interface SoftwareProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  tagline: string | null;
  description: string | null;
  problem: string | null;
  solution: string | null;
  features: string[];
  screenshots: string[];
  demo_url: string | null;
  pricing_mode: SoftwarePricingMode;
  price: number | null;
  price_unit: string | null;
  setup_fee: number;
  image: string | null;
  is_published?: boolean;
  order?: number;
  translations?: Record<string, any>;
}

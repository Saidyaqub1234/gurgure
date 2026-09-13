import apiClient from './client';
import type { Settings, Service, Project, Blog, Contact, Page, Client, TeamMember, Testimonial, CaseStudy, FAQ, Customer, NewsletterSubscriber, DashboardStats, ApiResponse, PaginatedResponse, PrintProduct, PrintPriceBreakdown, PrintOrder, SoftwareProduct } from '@/types';

// Settings
export const getSettings = () => apiClient.get<ApiResponse<Settings>>('/settings').then(r => r.data.data);
export const getPage = (slug: string) => apiClient.get<ApiResponse<any>>(`/pages/${slug}`).then(r => r.data.data);

// Services
export const getServices = () => apiClient.get<ApiResponse<Service[]>>('/services').then(r => r.data.data);
export const getServicesByCategory = (category: string) => apiClient.get<ApiResponse<Service[]>>('/services', { params: { category } }).then(r => r.data.data);
export const getService = (slug: string) => apiClient.get<ApiResponse<Service>>(`/services/${slug}`).then(r => r.data.data);

// Projects
export const getProjects = () => apiClient.get<ApiResponse<Project[]>>('/projects').then(r => r.data.data);
export const getProject = (slug: string) => apiClient.get<ApiResponse<Project>>(`/projects/${slug}`).then(r => r.data.data);

// Blog
export const getBlogs = () => apiClient.get<ApiResponse<Blog[]>>('/blogs').then(r => r.data.data);
export const getBlog = (slug: string) => apiClient.get<ApiResponse<Blog>>(`/blogs/${slug}`).then(r => r.data.data);

// Contact
export const submitContact = (data: Partial<Contact>) => apiClient.post<ApiResponse<null>>('/contact', data).then(r => r.data);

// Clients
export const getClients = () => apiClient.get<ApiResponse<Client[]>>('/clients').then(r => r.data.data);

// Team
export const getTeamMembers = () => apiClient.get<ApiResponse<TeamMember[]>>('/team').then(r => r.data.data);

// Testimonials
export const getTestimonials = () => apiClient.get<ApiResponse<Testimonial[]>>('/testimonials').then(r => r.data.data);

// Case Studies
export const getCaseStudies = () => apiClient.get<ApiResponse<CaseStudy[]>>('/case-studies').then(r => r.data.data);

// FAQs
export const getFAQs = () => apiClient.get<ApiResponse<FAQ[]>>('/faqs').then(r => r.data.data);

// Customer Registration
export const registerCustomer = (data: any) => apiClient.post<ApiResponse<{ customer: any; token: string }>>('/customer/register', data).then(r => r.data);
export const loginCustomer = (email: string, password: string) => apiClient.post<ApiResponse<{ customer: any; token: string }>>('/customer/login', { email, password }).then(r => r.data);
export const logoutCustomer = () => apiClient.post('/customer/logout').then(r => r.data);
export const getCustomerUser = () => apiClient.get<ApiResponse<any>>('/customer/me').then(r => r.data.data);
export const changeCustomerPassword = (data: { current_password?: string; new_password: string; new_password_confirmation: string }) => apiClient.post('/customer/change-password', data).then(r => r.data);
export const updateCustomerProfile = (data: { name: string; email: string; phone?: string; organization_name?: string; address?: string; avatar?: string }) => apiClient.post('/customer/update-profile', data).then(r => r.data);
export const customerUpload = (file: File) => {
  const fd = new FormData();
  fd.append('file', file);
  return apiClient.post<ApiResponse<{ url: string; path: string }>>('/customer/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data.data);
};

// Customer Portal
export const getCustomerPortal = () => apiClient.get<ApiResponse<any>>('/customer/portal').then(r => r.data.data);
export const getCustomerQuotations = () => apiClient.get<ApiResponse<any[]>>('/customer/portal/quotations').then(r => r.data.data);
export const getCustomerInvoices = () => apiClient.get<ApiResponse<any[]>>('/customer/portal/invoices').then(r => r.data.data);
export const getCustomerPayments = () => apiClient.get<ApiResponse<any[]>>('/customer/portal/payments').then(r => r.data.data);
export const getCustomerReceipts = () => apiClient.get<ApiResponse<any[]>>('/customer/portal/receipts').then(r => r.data.data);

// Newsletter
export const subscribeNewsletter = (email: string) => apiClient.post<ApiResponse<null>>('/newsletter', { email }).then(r => r.data);

// Quotation System - Public
export const getServicesWithPackages = () => apiClient.get('/services-with-packages').then(r => r.data.data);
export const getPackageItems = (packageId: number) => apiClient.get(`/packages/${packageId}/items`).then(r => r.data.data);
export const viewQuotation = (quotationNo: string) => apiClient.get(`/quotations/${quotationNo}`).then(r => r.data.data);
export const submitQuotation = (data: any) => apiClient.post('/quotations', data).then(r => r.data);
export const acceptQuotation = (quotationNo: string) => apiClient.post(`/quotations/${quotationNo}/accept`).then(r => r.data);

// Auth
export const adminLogin = (email: string, password: string) =>
  apiClient.post<ApiResponse<{ token: string; user: any }>>('/admin/login', { email, password }).then(r => r.data);
export const adminLogout = () => apiClient.post('/admin/logout').then(r => r.data);
export const getAdminUser = () => apiClient.get<ApiResponse<any>>('/admin/me').then(r => r.data.data);

// Admin Dashboard
export const getDashboardStats = () => apiClient.get<ApiResponse<DashboardStats>>('/admin/dashboard').then(r => r.data.data);

// Admin CRUD helpers
const createCrudApi = <T>(prefix: string) => ({
  getAll: (params?: any) => apiClient.get<ApiResponse<T[]>>(`/admin/${prefix}`, { params }).then(r => {
    const res = r.data as any;
    return res.data?.data || res.data || [];
  }),
  getOne: (id: number) => apiClient.get<ApiResponse<T>>(`/admin/${prefix}/${id}`).then(r => r.data.data),
  create: (data: FormData | Partial<T>) => apiClient.post<ApiResponse<T>>(`/admin/${prefix}`, data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
  }).then(r => r.data),
  update: (id: number, data: FormData | Partial<T>) => apiClient.post<ApiResponse<T>>(`/admin/${prefix}/${id}`, data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    params: { _method: 'PUT' },
  }).then(r => r.data),
  delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/${prefix}/${id}`).then(r => r.data),
});

export const adminServices = createCrudApi<Service>('services');
export const adminProjects = createCrudApi<Project>('projects');
export const adminBlogs = createCrudApi<Blog>('blogs');
export const adminPages = createCrudApi<Page>('pages');
export const adminClients = createCrudApi<Client>('clients');
export const adminTeam = createCrudApi<TeamMember>('team');
export const adminTestimonials = createCrudApi<Testimonial>('testimonials');
export const adminCaseStudies = createCrudApi<CaseStudy>('case-studies');
export const adminCustomers = createCrudApi<Customer>('customers');
export const adminFAQs = createCrudApi<FAQ>('faqs');
export const adminContacts = createCrudApi<Contact>('contacts');
export const adminSubscribers = createCrudApi<NewsletterSubscriber>('subscribers');
export const adminSettings = {
  get: () => apiClient.get<ApiResponse<Settings>>('/admin/settings').then(r => r.data.data),
  update: (data: Partial<Settings>) => apiClient.post<ApiResponse<Settings>>('/admin/settings', data).then(r => r.data),
};

// Quotation System - Admin
export const adminPackages = createCrudApi<any>('packages');
export const adminPackageItems = createCrudApi<any>('package-items');
export const adminInvoices = {
  getAll: (params?: any) => apiClient.get(`/admin/invoices`, { params }).then(r => r.data.data),
  getOne: (id: number) => apiClient.get<ApiResponse<any>>(`/admin/invoices/${id}`).then(r => r.data.data),
  create: (data: FormData | Partial<any>) => apiClient.post<ApiResponse<any>>(`/admin/invoices`, data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
  }).then(r => r.data),
  update: (id: number, data: FormData | Partial<any>) => apiClient.post<ApiResponse<any>>(`/admin/invoices/${id}`, data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    params: { _method: 'PUT' },
  }).then(r => r.data),
  delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/invoices/${id}`).then(r => r.data),
  addPayment: (id: number, data: any) => apiClient.post(`/admin/invoices/${id}/payment`, data).then(r => r.data),
  generateReceipt: (id: number) => apiClient.post(`/admin/invoices/${id}/generate-receipt`).then(r => r.data),
};
export const adminQuotations = {
  getAll: (params?: any) => apiClient.get(`/admin/quotations`, { params }).then(r => r.data.data?.data || r.data.data || []),
  getOne: (id: number) => apiClient.get<ApiResponse<any>>(`/admin/quotations/${id}`).then(r => r.data.data),
  create: (data: FormData | Partial<any>) => apiClient.post<ApiResponse<any>>(`/admin/quotations`, data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
  }).then(r => r.data),
  update: (id: number, data: FormData | Partial<any>) => apiClient.post<ApiResponse<any>>(`/admin/quotations/${id}`, data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    params: { _method: 'PUT' },
  }).then(r => r.data),
  delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/quotations/${id}`).then(r => r.data),
  send: (id: number) => apiClient.post(`/admin/quotations/${id}/send`).then(r => r.data),
  accept: (id: number) => apiClient.post(`/admin/quotations/${id}/accept`).then(r => r.data),
  reject: (id: number) => apiClient.post(`/admin/quotations/${id}/reject`).then(r => r.data),
};
export const adminReceipts = createCrudApi<any>('receipts');

// Print Shop - Public
export const getPrintProducts = () => apiClient.get<ApiResponse<PrintProduct[]> & { categories: { name: string; count: number }[] }>('/print-products').then(r => r.data);
export const getPrintProduct = (slug: string) => apiClient.get<ApiResponse<PrintProduct>>(`/print-products/${slug}`).then(r => r.data.data);
export const calculatePrintPrice = (slug: string, qty: number, selections: Record<number, number[]>) =>
  apiClient.post<ApiResponse<PrintPriceBreakdown>>(`/print-products/${slug}/price`, { qty, selections }).then(r => r.data.data);
export const submitPrintOrder = (data: any) => apiClient.post<ApiResponse<PrintOrder>>('/print/orders', data).then(r => r.data.data);

// Print Shop - Admin
export const adminPrintProducts = {
  getAll: () => apiClient.get<ApiResponse<PrintProduct[]>>('/admin/print-products').then(r => r.data.data),
  getOne: (id: number) => apiClient.get<ApiResponse<PrintProduct>>(`/admin/print-products/${id}`).then(r => r.data.data),
  create: (data: Partial<PrintProduct>) => apiClient.post<ApiResponse<PrintProduct>>('/admin/print-products', data).then(r => r.data),
  update: (id: number, data: Partial<PrintProduct>) => apiClient.post<ApiResponse<PrintProduct>>(`/admin/print-products/${id}`, data, { params: { _method: 'PUT' } }).then(r => r.data),
  delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/print-products/${id}`).then(r => r.data),
};
export const adminPrintOrders = {
  getAll: (params?: any) => apiClient.get('/admin/print-orders', { params }).then(r => r.data.data?.data || r.data.data || []),
  getMeta: (params?: any) => apiClient.get('/admin/print-orders', { params }).then(r => r.data.data),
  getOne: (id: number) => apiClient.get<ApiResponse<PrintOrder>>(`/admin/print-orders/${id}`).then(r => r.data.data),
  updateStatus: (id: number, status: string) => apiClient.put<ApiResponse<PrintOrder>>(`/admin/print-orders/${id}`, { status }).then(r => r.data),
  delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/print-orders/${id}`).then(r => r.data),
};

export const uploadFile = (file: File) => {
  const fd = new FormData();
  fd.append('file', file);
  return apiClient.post<ApiResponse<{ url: string; path: string }>>('/admin/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data.data);
};

// Software Section - Public
export const getSoftwareProducts = () =>
  apiClient.get<ApiResponse<SoftwareProduct[]> & { categories: { name: string; count: number }[] }>('/software').then(r => r.data);
export const getSoftwareProduct = (slug: string) =>
  apiClient.get<ApiResponse<SoftwareProduct>>(`/software/${slug}`).then(r => r.data.data);

// Software Section - Admin
export const adminSoftwareProducts = createCrudApi<SoftwareProduct>('software-products');

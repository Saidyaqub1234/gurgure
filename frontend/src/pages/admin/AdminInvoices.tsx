import { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/Loading';
import { adminInvoices, adminQuotations, adminCustomers, adminServices, getSettings } from '@/api';
import type { Invoice, Payment, Customer, Quotation, Settings } from '@/types';
import { motion } from 'framer-motion';
import { FiEye, FiPlus, FiX, FiFileText, FiDollarSign, FiSearch, FiPrinter } from 'react-icons/fi';

const escHtml = (s: any) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

const money = (v: any) => Number(v || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const fmtDate = (d: any) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-300',
  partial_paid: 'bg-blue-500/20 text-blue-300',
  paid: 'bg-green-500/20 text-green-300',
  overdue: 'bg-red-500/20 text-red-300',
  cancelled: 'bg-neutral-500/20 text-white/40',
};

const paymentMethods = ['cash', 'bank_transfer', 'card', 'check', 'mobile_money', 'other'];

function todayStr() { return new Date().toISOString().split('T')[0]; }

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [viewModal, setViewModal] = useState<Invoice | null>(null);
  const [paymentModal, setPaymentModal] = useState<Invoice | null>(null);
  const [paymentForm, setPaymentForm] = useState({ amount: '', payment_method: 'bank_transfer', transaction_reference: '', notes: '', payment_date: todayStr() });
  const [showCreate, setShowCreate] = useState(false);
  const [createSaving, setCreateSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [generatingReceipt, setGeneratingReceipt] = useState<number | null>(null);
  const [manualMode, setManualMode] = useState(false);

  // Create form state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [quotationSearch, setQuotationSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showQuotationDropdown, setShowQuotationDropdown] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [serviceSearch, setServiceSearch] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [manualItems, setManualItems] = useState<any[]>([]);
  const [createForm, setCreateForm] = useState({
    customer_id: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_organization_name: '',
    quotation_id: '',
    quotation_no: '',
    subtotal: '',
    discount: '0',
    tax: '0',
    total: '',
    due_date: todayStr(),
    status: 'pending',
  });

  useEffect(() => { loadInvoices(); getSettings().then(setSettings).catch(() => {}); }, []);

  const loadInvoices = async () => {
    try {
      const response = await adminInvoices.getAll();
      setInvoices(response.data || []);
    } catch {
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      const data = await adminCustomers.getAll();
      setCustomers(data.data || data || []);
    } catch { /* ignore */ }
  };

  const loadServices = async () => {
    try {
      const data = await adminServices.getAll();
      setServices(Array.isArray(data) ? data : (data?.data || []));
    } catch { /* ignore */ }
  };

  const loadQuotations = async () => {
    try {
      const data = await adminQuotations.getAll();
      const accepted = (data || []).filter((q: any) => q.status === 'accepted');
      setQuotations(accepted);
    } catch { /* ignore */ }
  };

  const openCreateModal = () => {
    setShowCreate(true);
    setManualMode(false);
    setManualItems([]);
    setServiceSearch('');
    setShowServiceDropdown(false);
    setCreateForm({
      customer_id: '', customer_name: '', customer_email: '', customer_phone: '', customer_organization_name: '',
      quotation_id: '', quotation_no: '',
      subtotal: '', discount: '0', tax: '0', total: '', due_date: todayStr(), status: 'pending',
    });
    setCustomerSearch('');
    setQuotationSearch('');
    setQuotations([]);
    loadCustomers();
    loadServices();
  };

  const handleCreate = async () => {
    if (manualMode) {
      if (!createForm.customer_name || !createForm.subtotal || !createForm.total) {
        toast.error('Customer name, subtotal and total are required');
        return;
      }
    } else if (!createForm.customer_id || !createForm.subtotal || !createForm.total) {
      toast.error('Customer, subtotal and total are required');
      return;
    }
    setCreateSaving(true);
    try {
      await adminInvoices.create({
        customer_id: createForm.customer_id ? parseInt(createForm.customer_id) : undefined,
        customer_name: manualMode || !createForm.customer_id ? createForm.customer_name : undefined,
        customer_email: manualMode || !createForm.customer_id ? createForm.customer_email : undefined,
        customer_phone: manualMode || !createForm.customer_id ? createForm.customer_phone : undefined,
        customer_organization_name: manualMode || !createForm.customer_id ? createForm.customer_organization_name : undefined,
        quotation_id: createForm.quotation_id ? parseInt(createForm.quotation_id) : undefined,
        items: manualMode && manualItems.length > 0
          ? manualItems.map(it => ({
              service_id: it.service_id ? parseInt(it.service_id) : undefined,
              package_id: it.package_id ? parseInt(it.package_id) : undefined,
              item_name: it.item_name || 'Service',
              description: it.description || undefined,
              quantity: parseInt(it.quantity) || 1,
              unit_price: parseFloat(it.unit_price) || 0,
              total_price: parseFloat(it.total_price) || 0,
            }))
          : undefined,
        subtotal: parseFloat(createForm.subtotal),
        discount: parseFloat(createForm.discount || '0'),
        tax: parseFloat(createForm.tax || '0'),
        total: parseFloat(createForm.total),
        due_date: createForm.due_date || undefined,
        status: createForm.status,
      });
      toast.success('Invoice created');
      setShowCreate(false);
      loadInvoices();
    } catch { toast.error('Failed to create invoice'); }
    finally { setCreateSaving(false); }
  };

  const handleSelectCustomer = async (c: Customer) => {
    setCreateForm(prev => ({ ...prev, customer_id: String(c.id), customer_name: c.name, quotation_id: '', quotation_no: '', subtotal: '', discount: '0', tax: '0', total: '' }));
    setCustomerSearch(c.name);
    setQuotationSearch('');
    setShowCustomerDropdown(false);
    try {
      const data = await adminQuotations.getAll({ customer_id: c.id });
      const list = Array.isArray(data) ? data : (data?.data || []);
      const accepted = list.filter((q: any) => q.status === 'accepted');
      setQuotations(accepted);
    } catch { setQuotations([]); }
  };

  const handleSelectQuotation = (q: any) => {
    const subtotal = parseFloat(q.subtotal) || 0;
    const discount = parseFloat(q.discount) || 0;
    const tax = parseFloat(q.tax) || 0;
    const total = parseFloat(q.total) || subtotal - discount + tax;
    setCreateForm(prev => ({
      ...prev,
      quotation_id: String(q.id),
      quotation_no: q.quotation_no,
      customer_id: String(q.customer_id),
      customer_name: q.customer?.name || '',
      customerSearch: q.customer?.name || '',
      subtotal: String(subtotal),
      discount: String(discount),
      tax: String(tax),
      total: String(total),
    }));
    setCustomerSearch(q.customer?.name || '');
    setQuotationSearch(q.quotation_no);
    setShowQuotationDropdown(false);
  };

  const recalcTotal = (field: string, value: string) => {
    setCreateForm(prev => {
      const updated = { ...prev, [field]: value };
      const sub = parseFloat(updated.subtotal) || 0;
      const disc = parseFloat(updated.discount) || 0;
      const tx = parseFloat(updated.tax) || 0;
      updated.total = String(sub - disc + tx);
      return updated;
    });
  };

  const recalcFromItems = (items: any[]) => {
    const sub = items.reduce((sum, it) => sum + (parseFloat(it.total_price) || 0), 0);
    setCreateForm(prev => {
      const discount = parseFloat(prev.discount) || 0;
      const tax = parseFloat(prev.tax) || 0;
      return { ...prev, subtotal: String(sub), total: String(sub - discount + tax) };
    });
  };

  const addServiceItem = (s: any) => {
    if (manualItems.some(it => it.service_id === s.id)) {
      toast.error('Service already added');
      setShowServiceDropdown(false);
      return;
    }
    const pkgs = (s.packages || []).filter((p: any) => p.is_active !== false);
    const first = pkgs[0] || null;
    const unitPrice = first ? parseFloat(first.base_price) || 0 : 0;
    const newItems = [...manualItems, {
      service_id: s.id,
      package_id: first ? first.id : null,
      level: first ? (first.name || first.level || '') : '',
      item_name: first ? `${s.title || s.name || 'Service'} — ${first.name || first.level}` : (s.title || s.name || 'Service'),
      quantity: 1,
      unit_price: String(unitPrice),
      total_price: String(unitPrice),
      description: '',
    }];
    setManualItems(newItems);
    setServiceSearch('');
    setShowServiceDropdown(false);
    recalcFromItems(newItems);
  };

  const updateItemLevel = (index: number, pkgId: string) => {
    const it = manualItems[index];
    const s = services.find(x => x.id === it.service_id);
    const pkg = (s?.packages || []).find((p: any) => String(p.id) === String(pkgId)) || null;
    if (!pkg) return;
    const unitPrice = parseFloat(pkg.base_price) || 0;
    const items = manualItems.map((row, i) => {
      if (i !== index) return row;
      return {
        ...row,
        package_id: pkg.id,
        level: pkg.name || pkg.level || '',
        item_name: `${s.title || s.name || 'Service'} — ${pkg.name || pkg.level}`,
        unit_price: String(unitPrice),
        total_price: String((parseFloat(row.quantity) || 1) * unitPrice),
      };
    });
    setManualItems(items);
    recalcFromItems(items);
  };

  const serviceFromPrice = (s: any) => {
    const pkgs = (s.packages || []).filter((p: any) => p.is_active !== false);
    if (pkgs.length === 0) return '';
    const min = Math.min(...pkgs.map((p: any) => parseFloat(p.base_price) || 0));
    return `From $${min.toLocaleString()}`;
  };

  const updateItem = (index: number, field: string, value: string) => {
    const items = manualItems.map((it, i) => {
      if (i !== index) return it;
      const updated = { ...it, [field]: value };
      const qty = parseFloat(updated.quantity) || 0;
      const price = parseFloat(updated.unit_price) || 0;
      if (field === 'quantity' || field === 'unit_price') updated.total_price = String(qty * price);
      return updated;
    });
    setManualItems(items);
    recalcFromItems(items);
  };

  const removeItem = (index: number) => {
    const items = manualItems.filter((_, i) => i !== index);
    setManualItems(items);
    recalcFromItems(items);
  };

  const filteredServices = services.filter(s =>
    (s.title || s.name || '').toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const handleAddPayment = async () => {
    if (!paymentModal || !paymentForm.amount) {
      toast.error('Amount is required');
      return;
    }
    setActionLoading(paymentModal.id);
    try {
      await adminInvoices.addPayment(paymentModal.id, paymentForm);
      toast.success('Payment added');
      setPaymentModal(null);
      loadInvoices();
    } catch {
      toast.error('Failed to add payment');
    } finally {
      setActionLoading(null);
    }
  };

  const handleGenerateReceipt = async (id: number) => {
    setGeneratingReceipt(id);
    try {
      await adminInvoices.generateReceipt(id);
      toast.success('Receipt generated');
      loadInvoices();
    } catch {
      toast.error('Failed to generate receipt');
    } finally {
      setGeneratingReceipt(null);
    }
  };

  const filtered = invoices.filter(inv => {
    const matchesStatus = statusFilter === '' || inv.status === statusFilter;
    const matchesSearch = search === '' ||
      inv.invoice_no?.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer?.name?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const openPaymentModal = (inv: Invoice) => {
    setPaymentModal(inv);
    setPaymentForm({ amount: inv.balance || '', payment_method: 'bank_transfer', transaction_reference: '', notes: '', payment_date: todayStr() });
  };

  const openViewModal = async (inv: Invoice) => {
    try {
      const data = await adminInvoices.getOne(inv.id);
      setViewModal(data);
    } catch {
      setViewModal(inv);
    }
  };

  const handlePrintInvoice = () => {
    if (!viewModal) return;
    const inv = viewModal;
    const s = settings;
    const siteName = s?.site_name || 'GURGURE';
    const tagline = s?.site_tagline || '';
    const contactLine = [s?.email, s?.phone].filter(Boolean).map(escHtml).join(' &nbsp; | &nbsp; ');

    const logoHtml = s?.logo
      ? `<img src="${escHtml(s.logo)}" alt="${escHtml(siteName)}" style="height:58px;object-fit:contain;" />`
      : `<div style="font-size:26px;font-weight:800;color:#1e3a5f;letter-spacing:1px;">${escHtml(siteName)}</div>`;

    const itemsRows = (inv.items && inv.items.length > 0 ? inv.items : []).map(it => `
      <tr>
        <td style="padding:9px 12px;border:1px solid #e2e8f0;color:#0f1a2e;">
          <div style="font-weight:600;">${escHtml(it.item_name)}</div>
          ${it.description ? `<div style="color:#64748b;font-size:11px;margin-top:2px;">${escHtml(it.description)}</div>` : ''}
        </td>
        <td style="padding:9px 12px;border:1px solid #e2e8f0;text-align:center;color:#0f1a2e;">${escHtml(it.quantity)}</td>
        <td style="padding:9px 12px;border:1px solid #e2e8f0;text-align:right;color:#0f1a2e;">${money(it.unit_price)}</td>
        <td style="padding:9px 12px;border:1px solid #e2e8f0;text-align:right;color:#0f1a2e;font-weight:600;">${money(it.total_price)}</td>
      </tr>`).join('');

    const itemsBlock = itemsRows
      ? `<table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr>
              <th style="padding:10px 12px;background:#1e3a5f;color:#fff;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Description</th>
              <th style="padding:10px 12px;background:#1e3a5f;color:#fff;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Qty</th>
              <th style="padding:10px 12px;background:#1e3a5f;color:#fff;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Unit Price</th>
              <th style="padding:10px 12px;background:#1e3a5f;color:#fff;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Amount</th>
            </tr>
          </thead>
          <tbody>${itemsRows}</tbody>
        </table>`
      : `<p style="color:#64748b;font-size:12px;">No line items on this invoice.</p>`;

    const paymentRows = (inv.payments && inv.payments.length > 0 ? inv.payments : [])
      .map((p: any) => `
        <tr>
          <td style="padding:7px 10px;border:1px solid #e2e8f0;color:#0f1a2e;">${fmtDate(p.payment_date)}</td>
          <td style="padding:7px 10px;border:1px solid #e2e8f0;color:#0f1a2e;text-transform:capitalize;">${escHtml(p.payment_method || '—')}</td>
          <td style="padding:7px 10px;border:1px solid #e2e8f0;color:#64748b;">${escHtml(p.transaction_reference || '—')}</td>
          <td style="padding:7px 10px;border:1px solid #e2e8f0;color:#2d8a4e;text-align:right;font-weight:600;">${money(p.amount)}</td>
        </tr>`).join('');

    const paymentsBlock = paymentRows
      ? `<table style="width:100%;border-collapse:collapse;font-size:12px;margin-top:4px;">
          <thead>
            <tr>
              <th style="padding:8px 10px;background:#f1f5f9;color:#1e3a5f;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;border:1px solid #e2e8f0;">Date</th>
              <th style="padding:8px 10px;background:#f1f5f9;color:#1e3a5f;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;border:1px solid #e2e8f0;">Method</th>
              <th style="padding:8px 10px;background:#f1f5f9;color:#1e3a5f;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;border:1px solid #e2e8f0;">Reference</th>
              <th style="padding:8px 10px;background:#f1f5f9;color:#1e3a5f;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:0.5px;border:1px solid #e2e8f0;">Amount</th>
            </tr>
          </thead>
          <tbody>${paymentRows}</tbody>
        </table>`
      : '';

    const statusLabel = (inv.status || 'pending').replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Invoice ${escHtml(inv.invoice_no)}</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #0f1a2e;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page { max-width: 210mm; min-height: 296mm; margin: 0 auto; padding: 14mm 16mm; position: relative; display: flex; flex-direction: column; }
  .header { border-bottom: 4px solid #1e3a5f; padding-bottom: 14px; }
  .header-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
  .company { display: flex; align-items: center; gap: 14px; }
  .company-name { font-size: 22px; font-weight: 800; color: #1e3a5f; letter-spacing: 0.5px; }
  .company-tagline { font-size: 11px; color: #64748b; margin-top: 2px; max-width: 320px; }
  .doc-title { text-align: right; }
  .doc-title h1 { font-size: 30px; font-weight: 800; color: #1e3a5f; letter-spacing: 3px; margin: 0; }
  .doc-title .doc-no { font-size: 13px; color: #64748b; margin-top: 4px; font-weight: 600; letter-spacing: 0.5px; }
  .contact-bar { display: none; }
  .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; margin-top: 22px; }
  .block-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #1e3a5f; font-weight: 800; margin-bottom: 8px; }
  .bill-to .name { font-size: 15px; font-weight: 700; color: #0f1a2e; }
  .bill-to .detail { font-size: 12px; color: #475569; margin-top: 2px; line-height: 1.5; }
  .meta-right { border-left: 3px solid #e2e8f0; padding-left: 18px; }
  .meta-row { display: flex; justify-content: space-between; font-size: 12px; padding: 4px 0; }
  .meta-row span:first-child { color: #64748b; }
  .meta-row span:last-child { color: #0f1a2e; font-weight: 600; }
  .status-badge { display: inline-block; background: #e2e8f0; color: #1e3a5f; padding: 3px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .section { margin-top: 24px; }
  .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #1e3a5f; font-weight: 800; margin-bottom: 8px; }
  .totals { display: flex; justify-content: flex-end; margin-top: 18px; }
  .totals-box { width: 260px; }
  .t-row { display: flex; justify-content: space-between; font-size: 12px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
  .t-row span:first-child { color: #64748b; }
  .t-row span:last-child { color: #0f1a2e; font-weight: 600; }
  .t-row.balance span:first-child { color: #b91c1c; }
  .t-row.balance span:last-child { color: #b91c1c; font-weight: 800; font-size: 15px; }
  .t-row.grand { border-bottom: none; }
  .t-row.grand span:last-child { font-size: 18px; font-weight: 800; color: #1e3a5f; }
  .grand-total { background: #1e3a5f; color: #fff !important; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; margin-top: 6px; border-radius: 4px; }
  .grand-total span:first-child { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }
  .grand-total span:last-child { font-size: 20px; font-weight: 800; }
  .footer { margin-top: auto; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; }
  .footer .thanks { font-size: 12px; color: #0f1a2e; font-weight: 600; }
  .footer .contacts { font-size: 11px; color: #64748b; margin-top: 5px; }
  .footer .site { font-size: 11px; color: #94a3b8; margin-top: 3px; }
</style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="header-top">
        <div class="company">${logoHtml}</div>
        <div class="doc-title">
          <h1>INVOICE</h1>
          <div class="doc-no">${escHtml(inv.invoice_no)}</div>
        </div>
      </div>
    </div>

    <div class="meta-grid">
      <div class="bill-to">
        <div class="block-title">Invoiced To</div>
        <div class="name">${escHtml(inv.customer?.name || '—')}</div>
        ${inv.customer?.organization_name ? `<div class="detail">${escHtml(inv.customer.organization_name)}</div>` : ''}
        ${inv.customer?.email ? `<div class="detail">${escHtml(inv.customer.email)}</div>` : ''}
        ${inv.customer?.phone ? `<div class="detail">${escHtml(inv.customer.phone)}</div>` : ''}
        ${inv.customer?.address ? `<div class="detail">${escHtml(inv.customer.address)}</div>` : ''}
      </div>
      <div class="meta-right">
        <div class="meta-row"><span>Invoice Date</span><span>${fmtDate(inv.created_at)}</span></div>
        <div class="meta-row"><span>Due Date</span><span>${inv.due_date ? fmtDate(inv.due_date) : '—'}</span></div>
        <div class="meta-row"><span>Invoice No</span><span>${escHtml(inv.invoice_no)}</span></div>
        <div class="meta-row" style="margin-top:6px;"><span>Status</span><span class="status-badge">${statusLabel}</span></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Invoice Details</div>
      ${itemsBlock}
    </div>

    <div class="totals">
      <div class="totals-box">
        <div class="t-row"><span>Subtotal</span><span>${money(inv.subtotal)}</span></div>
        <div class="t-row"><span>Discount</span><span>${money(inv.discount)}</span></div>
        <div class="t-row"><span>Tax</span><span>${money(inv.tax)}</span></div>
        <div class="t-row"><span>Total</span><span>${money(inv.total)}</span></div>
        <div class="t-row"><span>Paid</span><span style="color:#2d8a4e;">${money(inv.paid_amount)}</span></div>
        <div class="grand-total"><span>Balance Due</span><span>${money(inv.balance)}</span></div>
      </div>
    </div>

    ${paymentsBlock ? `<div class="section"><div class="section-title">Payment History</div>${paymentsBlock}</div>` : ''}

    <div class="footer">
      <div class="thanks">Thank you for choosing ${escHtml(siteName)}.</div>
      <div class="contacts">${contactLine || escHtml(siteName)}</div>
      <div class="site">${escHtml(siteName)} · ${escHtml(tagline)}</div>
    </div>
  </div>
</body>
</html>`;

    const win = window.open('', '_blank', 'width=900,height=1100');
    if (!win) {
      toast.error('Please allow popups to print the invoice');
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 600);
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email?.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredQuotations = quotations.filter(q => {
    const matchesCustomer = !createForm.customer_id || String(q.customer_id) === createForm.customer_id;
    const matchesSearch = !quotationSearch ||
      q.quotation_no.toLowerCase().includes(quotationSearch.toLowerCase()) ||
      q.customer?.name?.toLowerCase().includes(quotationSearch.toLowerCase());
    return matchesCustomer && matchesSearch;
  });

  if (loading) return <AdminLayout><LoadingSpinner dark /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Invoices</h1>
            <p className="text-white/40 mt-1">Manage invoices and payments</p>
          </div>
          <button onClick={openCreateModal} className="btn-primary text-sm px-5 py-2.5">+ New Invoice</button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              className="admin-input w-full pl-10"
              placeholder="Search by invoice number or customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="admin-input min-w-[160px]"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              {Object.entries(statusColors).map(([key]) => (
                <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th className="text-center">Status</th>
                  <th>Due Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-white/30">No invoices found</td></tr>
                ) : (
                  filtered.map((inv) => (
                    <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <td><span className="font-mono text-sm text-white/70">{inv.invoice_no}</span></td>
                      <td><p className="font-medium text-white/80">{inv.customer?.name || '-'}</p></td>
                      <td className="text-white/60 font-mono text-sm">{inv.total}</td>
                      <td className="text-green-400 font-mono text-sm">{inv.paid_amount}</td>
                      <td className={inv.balance && inv.balance !== '0' && inv.balance !== '0.00' ? 'text-red-400 font-mono text-sm' : 'text-white/20 font-mono text-sm'}>
                        {inv.balance}
                      </td>
                      <td className="text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[inv.status] || statusColors.pending}`}>
                          {inv.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </span>
                      </td>
                      <td className="text-white/30 text-sm">
                        {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : '-'}
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => openViewModal(inv)} className="p-1.5 text-brand-blue-light hover:bg-white/[0.05] rounded-lg transition-colors" title="View Details">
                            <FiEye className="w-4 h-4" />
                          </button>
                          {inv.status !== 'paid' && (
                            <button onClick={() => openPaymentModal(inv)} className="p-1.5 text-green-400 hover:bg-green-500/[0.1] rounded-lg transition-colors" title="Add Payment">
                              <FiPlus className="w-4 h-4" />
                            </button>
                          )}
                          {inv.status === 'paid' && (
                            <button
                              onClick={() => handleGenerateReceipt(inv.id)}
                              disabled={generatingReceipt === inv.id}
                              className="p-1.5 text-purple-400 hover:bg-purple-500/[0.1] rounded-lg transition-colors disabled:opacity-50"
                              title="Generate Receipt"
                            >
                              {generatingReceipt === inv.id ? (
                                <div className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                              ) : (
                                <FiFileText className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setViewModal(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="admin-modal max-w-3xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FiDollarSign className="w-5 h-5" /> Invoice {viewModal.invoice_no}
              </h2>
              <button onClick={() => setViewModal(null)} className="text-white/40 hover:text-white"><FiX className="w-6 h-6" /></button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03]">
                  <h3 className="text-sm font-medium text-white/40 mb-2">Customer</h3>
                  <p className="text-white/80 font-medium">{viewModal.customer?.name || '-'}</p>
                  <p className="text-white/40 text-sm">{viewModal.customer?.organization_name}</p>
                  <p className="text-white/40 text-sm">{viewModal.customer?.email}</p>
                  <p className="text-white/40 text-sm">{viewModal.customer?.phone}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03]">
                  <h3 className="text-sm font-medium text-white/40 mb-2">Financial Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-white/40">Subtotal</span><span className="text-white/60 font-mono">{viewModal.subtotal}</span></div>
                    {viewModal.discount && <div className="flex justify-between"><span className="text-white/40">Discount</span><span className="text-red-400 font-mono">-{viewModal.discount}</span></div>}
                    {viewModal.tax && <div className="flex justify-between"><span className="text-white/40">Tax</span><span className="text-white/60 font-mono">{viewModal.tax}</span></div>}
                    <div className="flex justify-between pt-2 border-t border-white/[0.06]"><span className="text-white/60 font-medium">Total</span><span className="text-white font-mono font-bold">{viewModal.total}</span></div>
                    <div className="flex justify-between"><span className="text-green-400">Paid</span><span className="text-green-400 font-mono">{viewModal.paid_amount}</span></div>
                    <div className="flex justify-between"><span className="text-red-400">Balance</span><span className="text-red-400 font-mono">{viewModal.balance}</span></div>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[viewModal.status] || statusColors.pending}`}>
                      {viewModal.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                    {viewModal.due_date && <span className="text-xs text-white/30 ml-2">Due: {new Date(viewModal.due_date).toLocaleDateString()}</span>}
                  </div>
                </div>
              </div>
              {viewModal.items && viewModal.items.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-white/40 mb-3">Invoice Items</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left pb-2 text-white/30 font-medium">Item</th>
                        <th className="text-left pb-2 text-white/30 font-medium">Qty</th>
                        <th className="text-left pb-2 text-white/30 font-medium">Unit Price</th>
                        <th className="text-right pb-2 text-white/30 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {viewModal.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-2 text-white/80">{item.item_name}</td>
                          <td className="py-2 text-white/50">{item.quantity}</td>
                          <td className="py-2 text-white/50 font-mono">{item.unit_price}</td>
                          <td className="py-2 text-right text-white/70 font-mono">{item.total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {viewModal.payments && viewModal.payments.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-white/40 mb-3">Payment History</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left pb-2 text-white/30 font-medium">Date</th>
                        <th className="text-left pb-2 text-white/30 font-medium">Method</th>
                        <th className="text-left pb-2 text-white/30 font-medium">Reference</th>
                        <th className="text-right pb-2 text-white/30 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {viewModal.payments.map((payment: Payment) => (
                        <tr key={payment.id}>
                          <td className="py-2 text-white/50">{new Date(payment.payment_date).toLocaleDateString()}</td>
                          <td className="py-2 text-white/60 capitalize">{payment.payment_method || '-'}</td>
                          <td className="py-2 text-white/40 font-mono text-xs">{payment.transaction_reference || '-'}</td>
                          <td className="py-2 text-right text-green-400 font-mono">{payment.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button onClick={handlePrintInvoice} className="px-5 py-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-light text-sm font-medium flex items-center gap-2">
                <FiPrinter className="w-4 h-4" /> Print Invoice
              </button>
              {viewModal.status !== 'paid' && (
                <button onClick={() => { setViewModal(null); openPaymentModal(viewModal); }} className="px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-500 text-sm font-medium flex items-center gap-2">
                  <FiPlus className="w-4 h-4" /> Add Payment
                </button>
              )}
              <button onClick={() => setViewModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">Close</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 overflow-y-auto" onClick={() => setShowCreate(false)}>
          <div className="admin-modal max-w-2xl w-full my-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white">New Invoice</h2>
              <button onClick={() => setShowCreate(false)} className="text-white/40 hover:text-white"><FiX className="w-6 h-6" /></button>
            </div>
            <div className="space-y-5">
              {/* Toggle: Select Customer vs Manual */}
              <div>
                <label className="admin-label">Customer</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-white/[0.04] rounded-xl">
                  <button
                    type="button"
                    onClick={() => { setManualMode(false); setShowCustomerDropdown(false); }}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${!manualMode ? 'bg-brand-blue text-white' : 'text-white/50 hover:text-white'}`}
                  >
                    Select Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualMode(true)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${manualMode ? 'bg-brand-blue text-white' : 'text-white/50 hover:text-white'}`}
                  >
                    Manual Entry
                  </button>
                </div>
              </div>

              {manualMode ? (
                <>
                {/* Manual Customer Entry */}
                <div className="space-y-3 rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                  <div>
                    <label className="admin-label">Customer Name *</label>
                    <input className="admin-input" value={createForm.customer_name} onChange={e => setCreateForm({ ...createForm, customer_name: e.target.value })} placeholder="e.g. John Doe" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="admin-label">Email</label>
                      <input type="email" className="admin-input" value={createForm.customer_email} onChange={e => setCreateForm({ ...createForm, customer_email: e.target.value })} placeholder="Optional" />
                    </div>
                    <div>
                      <label className="admin-label">Phone</label>
                      <input className="admin-input" value={createForm.customer_phone} onChange={e => setCreateForm({ ...createForm, customer_phone: e.target.value })} placeholder="Optional" />
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Organization Name</label>
                    <input className="admin-input" value={createForm.customer_organization_name} onChange={e => setCreateForm({ ...createForm, customer_organization_name: e.target.value })} placeholder="Optional" />
                  </div>
                  <p className="text-xs text-white/30">A new customer will be created automatically with this invoice.</p>
                </div>

                {/* Services / Items Selection */}
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-3">
                  <label className="admin-label">Services / Items</label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      className="admin-input pl-10"
                      placeholder="Search a service to add..."
                      value={serviceSearch}
                      onChange={e => { setServiceSearch(e.target.value); setShowServiceDropdown(true); }}
                      onFocus={() => setShowServiceDropdown(true)}
                    />
                    {showServiceDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-[#1a2744] border border-white/10 rounded-xl max-h-48 overflow-y-auto shadow-xl">
                        {filteredServices.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-white/30">No services found</div>
                        ) : (
filteredServices.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => addServiceItem(s)}
                              className="w-full text-left px-4 py-3 hover:bg-white/[0.05] transition-colors border-b border-white/[0.04] last:border-0 flex items-center justify-between gap-3"
                            >
                              <span className="text-sm text-white/80 font-medium">{s.title || s.name || 'Service'}</span>
                              <span className="flex items-center gap-3 shrink-0">
                                <span className="text-xs text-brand-blue-light font-medium">{serviceFromPrice(s)}</span>
                                <FiPlus className="w-4 h-4 text-white/30" />
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {manualItems.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/[0.06]">
                            <th className="text-left pb-2 text-white/30 font-medium">Item / Position</th>
                            <th className="text-left pb-2 text-white/30 font-medium w-32">Qty</th>
                            <th className="text-left pb-2 text-white/30 font-medium w-28">Unit Price</th>
                            <th className="text-right pb-2 text-white/30 font-medium w-24">Total</th>
                            <th className="w-10"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {manualItems.map((it, idx) => {
                            const svc = services.find(x => x.id === it.service_id);
                            const pkgs = (svc?.packages || []).filter((p: any) => p.is_active !== false);
                            return (
                            <tr key={idx}>
                              <td className="py-2">
                                <p className="text-white/80 font-medium">{it.item_name}</p>
                                {pkgs.length > 0 && (
                                  <select
                                    className="admin-input !py-1 !px-2 text-xs mt-1 min-w-[140px]"
                                    value={it.package_id || ''}
                                    onChange={e => updateItemLevel(idx, e.target.value)}
                                  >
                                    {pkgs.map((p: any) => (
                                      <option key={p.id} value={p.id}>
                                        {p.name || p.level} — ${(parseFloat(p.base_price) || 0).toLocaleString()}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </td>
                              <td className="py-2">
                                <input
                                  type="number" min={1}
                                  className="admin-input !py-1.5 !px-2 text-sm"
                                  value={it.quantity}
                                  onChange={e => updateItem(idx, 'quantity', e.target.value)}
                                />
                              </td>
                              <td className="py-2">
                                <input
                                  type="number" min={0} step="0.01"
                                  className="admin-input !py-1.5 !px-2 text-sm"
                                  value={it.unit_price}
                                  onChange={e => updateItem(idx, 'unit_price', e.target.value)}
                                  placeholder="0.00"
                                />
                              </td>
                              <td className="py-2 text-right text-white/70 font-mono">
                                ${(parseFloat(it.total_price) || 0).toLocaleString()}
                              </td>
                              <td className="py-2 text-right">
                                <button onClick={() => removeItem(idx)} className="text-red-400 hover:bg-red-500/[0.1] rounded-lg p-1.5 transition-colors" title="Remove">
                                  <FiX className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <p className="text-xs text-white/30 mt-1">Subtotal updates automatically from items.</p>
                    </div>
                  ) : (
                    <p className="text-xs text-white/30 text-center py-3">No items added yet. Search and select a service above. You can also enter a custom service by filling in the Subtotal manually.</p>
                  )}
                </div>
                </>
              ) : (
                /* Existing Customer Search */
                <div className="relative">
                  <label className="admin-label">Customer *</label>
                  <FiSearch className="absolute left-3 top-[38px] w-4 h-4 text-white/30" />
                  <input
                    className="admin-input pl-10"
                    placeholder="Search by name or email..."
                    value={customerSearch}
                    onChange={e => { setCustomerSearch(e.target.value); setShowCustomerDropdown(true); setCreateForm(prev => ({ ...prev, customer_id: '', customer_name: '' })); }}
                    onFocus={() => { setShowCustomerDropdown(true); loadCustomers(); }}
                  />
                  {showCustomerDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-[#1a2744] border border-white/10 rounded-xl max-h-48 overflow-y-auto shadow-xl">
                      {filteredCustomers.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-white/30">No customers found</div>
                      ) : (
                        filteredCustomers.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleSelectCustomer(c)}
                            className="w-full text-left px-4 py-3 hover:bg-white/[0.05] transition-colors border-b border-white/[0.04] last:border-0"
                          >
                            <p className="text-sm text-white/80 font-medium">{c.name}</p>
                            <p className="text-xs text-white/40">{c.email}{c.organization_name ? ` · ${c.organization_name}` : ''}</p>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                  {createForm.customer_id && (
                    <p className="text-xs text-green-400 mt-1">Selected: {createForm.customer_name} (ID: {createForm.customer_id})</p>
                  )}
                </div>
              )}

              {/* From Quotation — only when not manual */}
              {!manualMode && (
                <div className="relative">
                  <label className="admin-label">From Quotation (optional - auto-fill)</label>
                  <FiSearch className="absolute left-3 top-[38px] w-4 h-4 text-white/30" />
                  <input
                    className="admin-input pl-10"
                    placeholder={createForm.customer_id ? "Search this customer's quotations..." : "Select customer first, then search quotations..."}
                    value={quotationSearch}
                    onChange={e => { setQuotationSearch(e.target.value); setShowQuotationDropdown(true); }}
                    onFocus={() => setShowQuotationDropdown(true)}
                  />
                  {showQuotationDropdown && (quotationSearch || createForm.customer_id) && (
                    <div className="absolute z-50 w-full mt-1 bg-[#1a2744] border border-white/10 rounded-xl max-h-48 overflow-y-auto shadow-xl">
                      {filteredQuotations.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-white/30">{createForm.customer_id ? 'No accepted quotations found for this customer' : 'Select a customer first'}</div>
                      ) : (
                        filteredQuotations.map((q) => (
                          <button
                            key={q.id}
                            onClick={() => handleSelectQuotation(q)}
                            className="w-full text-left px-4 py-3 hover:bg-white/[0.05] transition-colors border-b border-white/[0.04] last:border-0"
                          >
                            <p className="text-sm text-white/80 font-medium">{q.quotation_no}</p>
                            <p className="text-xs text-white/40">{q.customer?.name} · ${parseFloat(q.total).toLocaleString()}</p>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Financial Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="admin-label">Subtotal {manualMode && manualItems.length > 0 && <span className="text-white/30">(auto)</span>} *</label>
                  <input type="number" step="0.01" className="admin-input" value={createForm.subtotal} disabled={manualMode && manualItems.length > 0} onChange={e => recalcTotal('subtotal', e.target.value)} placeholder="0.00" />
                </div>
                <div>
                  <label className="admin-label">Discount</label>
                  <input type="number" step="0.01" className="admin-input" value={createForm.discount} onChange={e => recalcTotal('discount', e.target.value)} placeholder="0" />
                </div>
                <div>
                  <label className="admin-label">Tax</label>
                  <input type="number" step="0.01" className="admin-input" value={createForm.tax} onChange={e => recalcTotal('tax', e.target.value)} placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Total *</label>
                  <input type="number" step="0.01" className="admin-input font-bold" value={createForm.total} onChange={e => setCreateForm({ ...createForm, total: e.target.value })} placeholder="0.00" />
                </div>
                <div>
                  <label className="admin-label">Due Date</label>
                  <input type="date" className="admin-input" value={createForm.due_date} onChange={e => setCreateForm({ ...createForm, due_date: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="admin-label">Status</label>
                <select className="admin-input" value={createForm.status} onChange={e => setCreateForm({ ...createForm, status: e.target.value })}>
                  <option value="pending">Pending</option>
                  <option value="partial_paid">Partial Paid</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setShowCreate(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={handleCreate} disabled={createSaving || (manualMode ? !createForm.customer_name : !createForm.customer_id) || !createForm.subtotal || !createForm.total} className="px-5 py-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-light text-sm font-medium disabled:opacity-50 flex items-center gap-2">
                {createSaving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setPaymentModal(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="admin-modal max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FiPlus className="w-5 h-5" /> Add Payment
              </h2>
              <button onClick={() => setPaymentModal(null)} className="text-white/40 hover:text-white"><FiX className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-white/[0.03] text-sm">
                <span className="text-white/40">Invoice:</span>
                <span className="text-white/70 ml-2 font-mono">{paymentModal.invoice_no}</span>
                <span className="text-white/40 ml-4">Balance:</span>
                <span className="text-red-400 ml-2 font-mono">{paymentModal.balance}</span>
              </div>
              <div>
                <label className="admin-label">Amount *</label>
                <input className="admin-input" type="number" value={paymentForm.amount} onChange={e => setPaymentForm({ ...paymentForm, amount: e.target.value })} placeholder="0.00" />
              </div>
              <div>
                <label className="admin-label">Payment Method</label>
                <select className="admin-input" value={paymentForm.payment_method} onChange={e => setPaymentForm({ ...paymentForm, payment_method: e.target.value })}>
                  {paymentMethods.map(m => (
                    <option key={m} value={m}>{m.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="admin-label">Transaction Reference</label>
                <input className="admin-input" value={paymentForm.transaction_reference} onChange={e => setPaymentForm({ ...paymentForm, transaction_reference: e.target.value })} placeholder="Optional" />
              </div>
              <div>
                <label className="admin-label">Payment Date</label>
                <input type="date" className="admin-input" value={paymentForm.payment_date} onChange={e => setPaymentForm({ ...paymentForm, payment_date: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Notes</label>
                <textarea className="admin-input" value={paymentForm.notes} onChange={e => setPaymentForm({ ...paymentForm, notes: e.target.value })} placeholder="Optional notes" rows={2} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button onClick={() => setPaymentModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={handleAddPayment} disabled={actionLoading === paymentModal.id} className="px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-500 text-sm font-medium disabled:opacity-50 flex items-center gap-2">
                {actionLoading === paymentModal.id && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Add Payment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}

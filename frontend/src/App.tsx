import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/public/Home';
import About from '@/pages/public/About';
import Approach from '@/pages/public/Approach';
import ServicesPage from '@/pages/public/ServicesPage';
import ServiceDetail from '@/pages/public/ServiceDetail';
import Portfolio from '@/pages/public/Portfolio';
import Contact from '@/pages/public/Contact';
import Blog from '@/pages/public/Blog';
import BlogShow from '@/pages/public/BlogShow';
import Clients from '@/pages/public/Clients';
import Team from '@/pages/public/Team';
import FAQ from '@/pages/public/FAQ';
import CaseStudies from '@/pages/public/CaseStudies';
import Careers from '@/pages/public/Careers';
import CustomerLogin from '@/pages/public/CustomerLogin';import CustomerPortal from '@/pages/public/CustomerPortal';
import CustomerRegister from '@/pages/public/CustomerRegister';
import CustomerForgotPassword from '@/pages/public/CustomerForgotPassword';
import CustomerResetPassword from '@/pages/public/CustomerResetPassword';
import Quote from '@/pages/public/Quote';
import QuotationBrowse from '@/pages/public/QuotationBrowse';
import QuotationReview from '@/pages/public/QuotationReview';
import QuotationCustomize from '@/pages/public/QuotationCustomize';
import QuotationPreview from '@/pages/public/QuotationPreview';
import QuotationSuccess from '@/pages/public/QuotationSuccess';
import PaymentSuccess from '@/pages/public/PaymentSuccess';
import PrintShop from '@/pages/public/PrintShop';
import PrintConfigurator from '@/pages/public/PrintConfigurator';
import PrintCart from '@/pages/public/PrintCart';
import SolutionsPage from '@/pages/public/SolutionsPage';
import SoftwarePage from '@/pages/public/SoftwarePage';
import SoftwareDetail from '@/pages/public/SoftwareDetail';
import MarketplacePage from '@/pages/public/MarketplacePage';
import VenturesPage from '@/pages/public/VenturesPage';
import Privacy from '@/pages/public/Privacy';
import Terms from '@/pages/public/Terms';
import Development from '@/pages/public/Development';
import BrandingPage from '@/pages/public/BrandingPage';
import DigitalPage from '@/pages/public/DigitalPage';
import TrainingPage from '@/pages/public/TrainingPage';
import Education from '@/pages/public/Education';
import Enterprise from '@/pages/public/Enterprise';
import Technology from '@/pages/public/Technology';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminPages from '@/pages/admin/AdminPages';
import AdminServices from '@/pages/admin/AdminServices';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminBlogs from '@/pages/admin/AdminBlogs';
import AdminClients from '@/pages/admin/AdminClients';
import AdminTeam from '@/pages/admin/AdminTeam';
import AdminTestimonials from '@/pages/admin/AdminTestimonials';
import AdminCaseStudies from '@/pages/admin/AdminCaseStudies';
import AdminCustomers from '@/pages/admin/AdminCustomers';
import AdminFAQs from '@/pages/admin/AdminFAQs';
import AdminContacts from '@/pages/admin/AdminContacts';
import AdminSubscribers from '@/pages/admin/AdminSubscribers';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminPackages from '@/pages/admin/AdminPackages';
import AdminPackageItems from '@/pages/admin/AdminPackageItems';
import AdminQuotations from '@/pages/admin/AdminQuotations';
import AdminInvoices from '@/pages/admin/AdminInvoices';
import AdminPrintProducts from '@/pages/admin/AdminPrintProducts';
import AdminPrintOrders from '@/pages/admin/AdminPrintOrders';
import AdminSoftwareProducts from '@/pages/admin/AdminSoftwareProducts';
import AdminProfile from '@/pages/admin/AdminProfile';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/approach" element={<Approach />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/development" element={<Development />} />
      <Route path="/branding" element={<BrandingPage />} />
      <Route path="/digital" element={<DigitalPage />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/education" element={<Education />} />
      <Route path="/enterprise" element={<Enterprise />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/insights" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogShow />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/team" element={<Team />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/career" element={<Careers />} />
      <Route path="/login" element={<CustomerLogin />} />
      <Route path="/register" element={<CustomerRegister />} />
      <Route path="/forgot-password" element={<CustomerForgotPassword />} />
      <Route path="/reset-password" element={<CustomerResetPassword />} />
      <Route path="/portal" element={<CustomerPortal />} />
      <Route path="/quote" element={<QuotationBrowse />} />
      <Route path="/quote/browse" element={<QuotationBrowse />} />
      <Route path="/quote/review" element={<QuotationReview />} />
      <Route path="/quote/customize/:packageId" element={<QuotationCustomize />} />
      <Route path="/quote/preview/:quotation_no" element={<QuotationPreview />} />
      <Route path="/quote/success/:quotation_no" element={<QuotationSuccess />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/print" element={<PrintShop />} />
      <Route path="/print/cart" element={<PrintCart />} />
      <Route path="/print/:slug" element={<PrintConfigurator />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/software" element={<SoftwarePage />} />
      <Route path="/software/:slug" element={<SoftwareDetail />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/ventures" element={<VenturesPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
      <Route path="/admin/pages" element={<AdminProtectedRoute><AdminPages /></AdminProtectedRoute>} />
      <Route path="/admin/services" element={<AdminProtectedRoute><AdminServices /></AdminProtectedRoute>} />
      <Route path="/admin/projects" element={<AdminProtectedRoute><AdminProjects /></AdminProtectedRoute>} />
      <Route path="/admin/blogs" element={<AdminProtectedRoute><AdminBlogs /></AdminProtectedRoute>} />
      <Route path="/admin/clients" element={<AdminProtectedRoute><AdminClients /></AdminProtectedRoute>} />
      <Route path="/admin/team" element={<AdminProtectedRoute><AdminTeam /></AdminProtectedRoute>} />
      <Route path="/admin/testimonials" element={<AdminProtectedRoute><AdminTestimonials /></AdminProtectedRoute>} />
      <Route path="/admin/faqs" element={<AdminProtectedRoute><AdminFAQs /></AdminProtectedRoute>} />
      <Route path="/admin/case-studies" element={<AdminProtectedRoute><AdminCaseStudies /></AdminProtectedRoute>} />
      <Route path="/admin/customers" element={<AdminProtectedRoute><AdminCustomers /></AdminProtectedRoute>} />
      <Route path="/admin/contacts" element={<AdminProtectedRoute><AdminContacts /></AdminProtectedRoute>} />
      <Route path="/admin/subscribers" element={<AdminProtectedRoute><AdminSubscribers /></AdminProtectedRoute>} />
      <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />
      <Route path="/admin/packages" element={<AdminProtectedRoute><AdminPackages /></AdminProtectedRoute>} />
      <Route path="/admin/package-items" element={<AdminProtectedRoute><AdminPackageItems /></AdminProtectedRoute>} />
      <Route path="/admin/quotations" element={<AdminProtectedRoute><AdminQuotations /></AdminProtectedRoute>} />
      <Route path="/admin/invoices" element={<AdminProtectedRoute><AdminInvoices /></AdminProtectedRoute>} />
      <Route path="/admin/print-products" element={<AdminProtectedRoute><AdminPrintProducts /></AdminProtectedRoute>} />
      <Route path="/admin/print-orders" element={<AdminProtectedRoute><AdminPrintOrders /></AdminProtectedRoute>} />
      <Route path="/admin/software-products" element={<AdminProtectedRoute><AdminSoftwareProducts /></AdminProtectedRoute>} />
      <Route path="/admin/profile" element={<AdminProtectedRoute><AdminProfile /></AdminProtectedRoute>} />
    </Routes>
  );
}

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
  settings?: any;
}

export default function PublicLayout({ children, settings }: PublicLayoutProps) {
  const safeSettings = settings ?? {};
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={safeSettings} />
      <main className="flex-1">{children}</main>
      <Footer settings={safeSettings} />
    </div>
  );
}

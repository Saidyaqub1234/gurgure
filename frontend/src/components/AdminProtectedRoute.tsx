import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminUser } from '@/api';
import { PageLoading } from './Loading';

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    getAdminUser()
      .then(() => setIsAuthed(true))
      .catch(() => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) return <PageLoading dark />;
  if (!isAuthed) return null;
  return <>{children}</>;
}

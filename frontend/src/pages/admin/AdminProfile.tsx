import { useState } from 'react';
import { FiUser, FiLock, FiSave, FiCheck } from 'react-icons/fi';
import AdminLayout from '@/layouts/AdminLayout';
import toast from 'react-hot-toast';
import apiClient from '@/api/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { uploadFile } from '@/api';

export default function AdminProfile() {
  const userStr = typeof window !== 'undefined' ? localStorage.getItem('admin_user') : null;
  const user = userStr ? JSON.parse(userStr) : {};
  const { t } = useLanguage();

  const [profileForm, setProfileForm] = useState({ name: user.name || '', email: user.email || '', avatar: user.avatar || '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', new_password_confirmation: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(false);
    try {
      const res = await apiClient.post('/admin/profile', profileForm);
      const updatedUser = res.data.data;
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));
      toast.success(t('Profile updated successfully'));
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 2000);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t('Failed to update profile'));
    } finally {
      setProfileSaving(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setAvatarUploading(true);
    try {
      const uploaded = await uploadFile(file);
      const url = uploaded?.url || uploaded?.path || (typeof uploaded === 'string' ? uploaded : '');
      setProfileForm(prev => ({ ...prev, avatar: url }));
    } catch {
      toast.error(t('Failed to upload photo'));
    } finally {
      setAvatarUploading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      setPasswordError(t('Passwords do not match'));
      return;
    }
    setPasswordSaving(true);
    setPasswordSuccess(false);
    try {
      await apiClient.post('/admin/profile/password', passwordForm);
      toast.success(t('Password changed successfully'));
      setPasswordForm({ current_password: '', new_password: '', new_password_confirmation: '' });
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 2000);
    } catch (err: any) {
      setPasswordError(err?.response?.data?.message || t('Failed to change password'));
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">{t('My Profile')}</h1>
          <p className="text-white/40 mt-1">{t('Manage your account settings')}</p>
        </div>

        {/* Profile Section */}
        <div className="admin-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-sm overflow-hidden">
              {profileForm.avatar ? (
                <img src={profileForm.avatar} alt={profileForm.name} className="w-full h-full object-cover" />
              ) : (
                profileForm.name?.charAt(0)?.toUpperCase() || 'A'
              )}
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2"><FiUser className="w-4 h-4" /> {t('Profile Information')}</h2>
              <p className="text-xs text-white/30">{t('Update your name and email address')}</p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                {profileForm.avatar ? (
                  <img src={profileForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="w-6 h-6 text-white/30" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{profileForm.name || 'Admin'}</p>
                <p className="text-xs text-white/30 mb-3">{profileForm.email}</p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue-light transition-colors cursor-pointer">
                  <FiUser className="w-4 h-4" />
                  {avatarUploading ? t('Uploading...') : t('Upload Photo')}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={avatarUploading}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleAvatarUpload(file);
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="admin-label">{t('Name')}</label>
              <input
                type="text"
                className="admin-input"
                value={profileForm.name}
                onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="admin-label">{t('Email')}</label>
              <input
                type="email"
                className="admin-input"
                value={profileForm.email}
                onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={profileSaving} className="px-5 py-2.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-light text-sm font-medium disabled:opacity-50 flex items-center gap-2 transition-colors">
                {profileSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : profileSuccess ? (
                  <FiCheck className="w-4 h-4" />
                ) : (
                  <FiSave className="w-4 h-4" />
                )}
                {profileSaving ? t('Saving...') : profileSuccess ? t('Saved') : t('Save Changes')}
              </button>
            </div>
          </form>
        </div>

        {/* Password Section */}
        <div className="admin-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <FiLock className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2"><FiLock className="w-4 h-4" /> {t('Change Password')}</h2>
              <p className="text-xs text-white/30">{t('Ensure your account remains secure')}</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="admin-label">{t('Current Password')}</label>
              <input
                type="password"
                className="admin-input"
                value={passwordForm.current_password}
                onChange={e => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                required
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="admin-label">{t('New Password')}</label>
              <input
                type="password"
                className="admin-input"
                value={passwordForm.new_password}
                onChange={e => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                required
                minLength={8}
                placeholder="Minimum 8 characters"
              />
            </div>
            <div>
              <label className="admin-label">{t('Confirm New Password')}</label>
              <input
                type="password"
                className="admin-input"
                value={passwordForm.new_password_confirmation}
                onChange={e => setPasswordForm({ ...passwordForm, new_password_confirmation: e.target.value })}
                required
                minLength={8}
                placeholder="Re-enter new password"
              />
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {passwordError}
              </div>
            )}

            <div className="flex justify-end">
              <button type="submit" disabled={passwordSaving} className="px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-500 text-sm font-medium disabled:opacity-50 flex items-center gap-2 transition-colors">
                {passwordSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : passwordSuccess ? (
                  <FiCheck className="w-4 h-4" />
                ) : (
                  <FiLock className="w-4 h-4" />
                )}
                {passwordSaving ? t('Changing...') : passwordSuccess ? t('Changed') : t('Change Password')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

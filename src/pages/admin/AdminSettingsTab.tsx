import React, { useState } from 'react';
import { Save, CheckCircle2, Building, Phone, Mail, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { SingleImageUpload } from '../../components/ImageUploadField';

export const AdminSettingsTab: React.FC = () => {
  const { settings, refreshData } = useApp();
  const [formData, setFormData] = useState(settings || {
    companyName: 'JIT PRIME MPC COMPANY',
    ownerName: 'MONOJIT DEY',
    visitingCardTagline: 'Your Trust Our Priority',
    phone: '+91 82405 85219',
    whatsappNumber: '+91 82405 85219',
    email: 'monojitdey189@gmail.com',
    fullAddress: 'Belghoria, Nimta, Khudiram Pally, Near 42 Pally Club, Landmark - Harijon School, Kolkata - 700049, West Bengal, India.',
    businessHours: 'Monday - Saturday: 9:30 AM - 7:30 PM (IST)',
    logoUrl: 'https://images.unsplash.com/photo-1611591475816-3e4732c4515b?auto=format&fit=crop&w=400&q=80',
    shippingDisclaimer: 'International shipping, duties, and timelines confirmed per quotation.'
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await api.updateSettings(formData);
      await refreshData();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 font-serif-heading">
          Company Identity & Visiting Card Settings
        </h2>
        <p className="text-xs text-slate-500">
          Sync physical business card details, contact numbers, and office addresses across the entire application.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm">
        
        {saved && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings successfully saved and synchronized across the website!</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Logo Upload */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <SingleImageUpload
            label="Company Logo / Brand Emblem (Upload from Device)"
            value={formData.logoUrl || ''}
            onChange={url => setFormData({ ...formData, logoUrl: url })}
            aspectRatio="square"
            helperText="Square emblem or transparent logo for Navbar & Footer."
          />
        </div>

        {/* Company & Owner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Company Name *</label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={e => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Owner / Proprietor Name *</label>
            <input
              type="text"
              required
              value={formData.ownerName}
              onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Visiting Card Motto / Tagline *</label>
          <input
            type="text"
            required
            value={formData.visitingCardTagline}
            onChange={e => setFormData({ ...formData, visitingCardTagline: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
          />
        </div>

        {/* Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">WhatsApp Hotline *</label>
            <input
              type="tel"
              required
              value={formData.whatsappNumber}
              onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Physical Workshop & Office Address *</label>
          <textarea
            rows={3}
            required
            value={formData.fullAddress}
            onChange={e => setFormData({ ...formData, fullAddress: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Business Hours</label>
            <input
              type="text"
              value={formData.businessHours}
              onChange={e => setFormData({ ...formData, businessHours: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">International Shipping Disclaimer</label>
            <input
              type="text"
              value={formData.shippingDisclaimer}
              onChange={e => setFormData({ ...formData, shippingDisclaimer: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

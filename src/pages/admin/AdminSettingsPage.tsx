import React, { useState } from 'react';
import { Settings, Save, RotateCcw, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { SiteSettings } from '../../types';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => dataService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to restore the platform to original default system records? Any new custom entries created will be reset.')) {
      dataService.resetToDefaults();
      setSettings(dataService.getSettings());
      alert('Platform data successfully restored to verified Aviance Ghana records.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Platform Settings & Corporate Configurations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage company branding metadata, dispatch contacts, and analytics retention
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Default Records</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings saved and synchronized successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Corporate Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Company Legal Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Head Office Address</label>
              <input
                type="text"
                value={settings.headOfficeAddress}
                onChange={(e) => setSettings({ ...settings, headOfficeAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Ghana Digital Address (GPS)</label>
              <input
                type="text"
                value={settings.digitalAddress}
                onChange={(e) => setSettings({ ...settings, digitalAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB] font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Centralized Dispatch Communications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">General Inquiries Email</label>
              <input
                type="email"
                value={settings.primaryEmail}
                onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Cargo Division Email</label>
              <input
                type="email"
                value={settings.cargoEmail}
                onChange={(e) => setSettings({ ...settings, cargoEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Primary Operations Switchboard</label>
              <input
                type="text"
                value={settings.primaryPhone}
                onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB] font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Secondary / Fax Line</label>
              <input
                type="text"
                value={settings.secondaryPhone}
                onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#58C1EB] font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            System & Analytics Governance
          </h3>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="analyticsActive"
              checked={settings.enableAnalytics}
              onChange={(e) => setSettings({ ...settings, enableAnalytics: e.target.checked })}
              className="rounded border-slate-700 text-[#58C1EB] focus:ring-[#58C1EB]"
            />
            <label htmlFor="analyticsActive" className="text-xs text-slate-200 font-medium">
              Enable First-Party Privacy Website Analytics Logging
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Platform Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

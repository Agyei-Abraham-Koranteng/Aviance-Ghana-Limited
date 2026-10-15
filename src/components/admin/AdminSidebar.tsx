import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  FileSpreadsheet,
  Layers,
  Plane,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Building,
  Users,
  Handshake,
  MapPin,
  ShieldCheck,
  Luggage,
  PackageCheck,
  Crown,
  Briefcase,
  UserCheck,
  Mail,
  Bell,
  History,
  Settings,
  Database,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AvianceLogo } from '../ui/AvianceLogo';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onNavigatePublic: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onNavigatePublic,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { hasPermission, user } = useAuth();

  const handleSelect = (tab: string) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const navGroups = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, perm: 'dashboard' },
        { id: 'analytics', label: 'Web Analytics', icon: BarChart3, perm: 'analytics' },
        { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet, perm: 'analytics' },
      ],
    },
    {
      title: 'Content & CMS',
      items: [
        { id: 'services', label: 'Services Manager', icon: Plane, perm: 'services' },
        { id: 'news', label: 'News & Press', icon: FileText, perm: 'news' },
        { id: 'certifications', label: 'Certificates & Licences', icon: ShieldCheck, perm: 'certifications' },
        { id: 'team', label: 'Management Team', icon: Users, perm: 'team' },
        { id: 'customers', label: 'Airlines & Partners', icon: Handshake, perm: 'customers' },
        { id: 'media', label: 'Media Library', icon: ImageIcon, perm: 'media' },
      ],
    },
    {
      title: 'Ground Operations',
      items: [
        { id: 'baggage', label: 'Find My Bag Records', icon: Luggage, perm: 'baggage' },
        { id: 'enquiries', label: 'Enquiries & Submissions', icon: Mail, perm: 'enquiries' },
      ],
    },
    {
      title: 'Human Resources',
      items: [
        { id: 'careers', label: 'Vacancies', icon: Briefcase, perm: 'careers' },
        { id: 'applications', label: 'Applications Pipeline', icon: UserCheck, perm: 'applications' },
      ],
    },
    {
      title: 'System & Architecture',
      items: [
        { id: 'architecture', label: 'Technical Architecture', icon: Layers, perm: 'dashboard' },
        { id: 'audit_logs', label: 'Audit Trail', icon: History, perm: 'audit_logs' },
        { id: 'database', label: 'Supabase SQL Schema', icon: Database, perm: 'database' },
        { id: 'settings', label: 'System Settings', icon: Settings, perm: 'settings' },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#060D1A] border-r border-[#204696]/25 text-slate-300 w-64 select-none">
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center">
          <AvianceLogo variant="on-dark" size="sm" subtitleText="CMS" />
        </div>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => {
          const visibleItems = group.items.filter((item) => hasPermission(item.perm));
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title}>
              <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-semibold shadow-sm'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Return to Public Site */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
        <button
          onClick={onNavigatePublic}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#58C1EB]" />
          <span>View Public Website</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:block shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onCloseMobile}></div>
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};

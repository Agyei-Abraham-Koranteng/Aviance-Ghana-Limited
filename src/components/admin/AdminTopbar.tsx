import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Shield,
  ChevronDown,
  User,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserRole } from '../../types';
import { isSupabaseConfigured } from '../../lib/supabase/client';

interface AdminTopbarProps {
  onOpenMobileSidebar: () => void;
  currentTab: string;
  onNavigatePublic: () => void;
  onSelectTab: (tab: string) => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  onOpenMobileSidebar,
  currentTab,
  onNavigatePublic,
  onSelectTab,
}) => {
  const { user, switchRole, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: 'super_admin', label: 'Super Admin', desc: 'Full unrestricted platform access' },
    { role: 'content_manager', label: 'Content Manager', desc: 'Services, news, certs & media' },
    { role: 'hr_recruitment', label: 'HR / Recruitment', desc: 'Vacancies & job applications' },
    { role: 'operations_manager', label: 'Operations Manager', desc: 'Ramp, cargo, baggage & enquiries' },
    { role: 'it_admin', label: 'IT Administrator', desc: 'Security, audit logs & system health' },
    { role: 'marketing_comm', label: 'Marketing / PR', desc: 'News, media & analytics' },
    { role: 'viewer_analyst', label: 'Viewer / Analyst', desc: 'Read-only analytics reports' },
  ];

  const formatTabTitle = (tab: string) => {
    return tab.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <header className="h-16 bg-[#081224] border-b border-[#204696]/25 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
      {/* Left zone: Menu trigger and breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-slate-500">Aviance Portal</span>
          <span className="text-slate-600">/</span>
          <span className="text-white font-semibold">{formatTabTitle(currentTab)}</span>
        </div>
      </div>

      {/* Right zone: Role Switcher, Database status, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Supabase status indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span>{isSupabaseConfigured ? 'Supabase Live' : 'Supabase Active / Mock Engine'}</span>
        </div>

        {/* Live Role Persona Switcher (CRITICAL for testing specs) */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700/80 hover:border-[#58C1EB]/60 text-xs text-slate-200 transition-colors"
            title="Switch administrative role persona"
          >
            <Shield className="w-3.5 h-3.5 text-[#58C1EB]" />
            <span className="font-semibold text-white">{rolesList.find((r) => r.role === user?.role)?.label || 'Role'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleMenuOpen && (
            <div
              onMouseLeave={() => setRoleMenuOpen(false)}
              className="absolute right-0 mt-2 w-64 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in duration-100"
            >
              <div className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-800 mb-1">
                Select Role Persona (RBAC Test)
              </div>
              <div className="space-y-0.5">
                {rolesList.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchRole(r.role);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                      user?.role === r.role
                        ? 'bg-[#204696] text-white border border-[#58C1EB]/40 font-bold'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="font-medium">{r.label}</div>
                    <div className={`text-[10px] ${user?.role === r.role ? 'text-slate-900/80' : 'text-slate-500'}`}>
                      {r.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#204696] ring-2 ring-slate-900"></span>
            )}
          </button>

          {notifMenuOpen && (
            <div
              onMouseLeave={() => setNotifMenuOpen(false)}
              className="absolute right-0 mt-2 w-80 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in duration-100"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs font-bold text-white">Operational Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-[#58C1EB] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-xs text-slate-500 py-4 text-center">
                    No active notifications
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markAsRead(n.id);
                        if (n.link) {
                          const tab = n.link.replace('/admin/', '');
                          onSelectTab(tab);
                          setNotifMenuOpen(false);
                        }
                      }}
                      className={`p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                        n.isRead ? 'bg-slate-900/40 text-slate-400' : 'bg-slate-900 text-slate-200 border-l-2 border-[#58C1EB]'
                      }`}
                    >
                      <div className="font-semibold text-white">{n.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{n.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Info Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-slate-800 text-[#58C1EB] border border-slate-700 flex items-center justify-center font-bold text-xs">
            {user?.fullName?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">
              {user?.fullName?.split(' ')[0]}
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">
              {user?.department}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

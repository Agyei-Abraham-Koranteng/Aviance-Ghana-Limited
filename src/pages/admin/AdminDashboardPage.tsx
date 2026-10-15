import React, { useState, useEffect } from 'react';
import {
  Users,
  Eye,
  Mail,
  Briefcase,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  Plane,
  CheckCircle2,
  AlertCircle,
  FileText,
  Luggage,
  Server,
  Activity,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
  ChevronRight,
  Radio,
  FileCheck,
  Clock3,
  AlertTriangle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';
import { Enquiry, Application, NewsArticle, BaggageRecord, SystemHealthMetric } from '../../types';
import { INITIAL_SYSTEM_HEALTH } from '../../constants/avianceData';

interface AdminDashboardPageProps {
  onSelectTab: (tab: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onSelectTab }) => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState<number>(30);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' GMT'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = analyticsService.getStats(dateRange);
  const enquiries = dataService.getEnquiries();
  const applications = dataService.getApplications();
  const news = dataService.getNews();
  const vacancies = dataService.getVacancies();
  const baggageRecords = dataService.getBaggageRecords();
  const services = dataService.getServices();

  // Content breakdowns
  const publishedArticlesCount = news.filter((a) => a.status === 'Published' || a.isPublished).length;
  const draftArticlesCount = news.filter((a) => a.status === 'Draft').length;
  const awaitingApprovalArticlesCount = news.filter(
    (a) => a.status === 'Submitted for Review' || (!a.status && !a.isPublished)
  ).length;
  const scheduledArticlesCount = news.filter(
    (a) => a.status === 'Approved' || !!a.scheduledAt
  ).length;

  // Enquiries breakdowns
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const openEnquiriesCount = enquiries.filter(
    (e) => e.status === 'In Progress'
  ).length;
  const assignedEnquiriesCount = enquiries.filter(
    (e) => e.status === 'Assigned' || e.status === 'Waiting for Customer'
  ).length;
  const resolvedEnquiriesCount = enquiries.filter(
    (e) => e.status === 'Resolved' || e.status === 'Closed'
  ).length;

  // Careers breakdowns
  const activeVacanciesCount = vacancies.filter((v) => v.status === 'Open').length;
  const newApplicationsCount = applications.filter((a) => a.status === 'Submitted').length;
  const shortlistedCount = applications.filter(
    (a) => a.status === 'Shortlisted' || a.status === 'Interview'
  ).length;
  const awaitingReviewCount = applications.filter((a) => a.status === 'Under Review').length;

  const handleEnquiryStatus = (id: string, newStatus: Enquiry['status']) => {
    dataService.updateEnquiryStatus(id, newStatus);
  };

  return (
    <div className="space-y-8">
      {/* 1. Digital Command Centre Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#204696]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm">
                <Radio className="w-3 h-3 text-[#58C1EB] animate-pulse" /> Digital Command Centre
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#72BF44]/15 text-[#72BF44] border border-[#72BF44]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-ping" />
                Station Watch: ACC / KMS / TML
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
                Zulu Clock: <strong className="text-white">{currentTime}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
              Aviance Digital Command Centre
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Real-time platform telemetry, multi-channel customer enquiries, recruitment pipeline, content review workflow, and airside integration services.
            </p>
          </div>

          {/* Time range switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl text-xs self-start md:self-auto">
            <span className="text-[11px] font-mono text-slate-400 px-2 uppercase tracking-wider">Telemetry:</span>
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDateRange(d)}
                className={`px-3 py-1.5 font-bold rounded-lg transition-colors ${
                  dateRange === d
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. System Infrastructure Health Strip (Requirement 3: System Status) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#58C1EB]" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Core Systems & Service Infrastructure Status
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('settings')}
            className="text-[11px] font-semibold text-[#58C1EB] hover:underline flex items-center gap-1"
          >
            System Diagnostics <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {INITIAL_SYSTEM_HEALTH.map((sys: SystemHealthMetric) => {
            const isOperational = sys.status === 'Operational';
            const isAttention = sys.status.includes('Attention') || sys.status.includes('Configuration');
            const isWarning = sys.status === 'Warning';

            return (
              <div
                key={sys.service}
                className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-1.5 transition-colors hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 truncate">
                    {sys.service}
                  </span>
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      isOperational
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                        : isAttention
                        ? 'bg-[#204696] shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                        : isWarning
                        ? 'bg-orange-400'
                        : 'bg-rose-500'
                    }`}
                  />
                </div>
                <div className="text-xs font-bold text-white truncate" title={sys.displayName}>
                  {sys.displayName.replace(' / Dual-Store', '').replace(' Engine', '')}
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span
                    className={`font-semibold ${
                      isOperational
                        ? 'text-emerald-400'
                        : isAttention
                        ? 'text-[#58C1EB]'
                        : 'text-slate-400'
                    }`}
                  >
                    {isOperational ? 'Operational' : isAttention ? 'Requires Attention' : sys.status}
                  </span>
                  {sys.latencyMs ? (
                    <span className="font-mono text-slate-500">{sys.latencyMs}ms</span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Five Core Command Modules Grid (Website, Content, Customer Communication, Careers, Baggage) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Module A: Website Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Website Traffic</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Operational
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono tabular-nums">
              {stats.totalPageViews.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              <strong className="text-slate-200">{stats.uniqueVisitors.toLocaleString()}</strong> unique sessions
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-medium flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12.4% vs prev
            </span>
            <button
              onClick={() => onSelectTab('analytics')}
              className="text-[#58C1EB] font-semibold hover:underline flex items-center gap-0.5"
            >
              Analytics <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Module B: Content & Publishing Workflow */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Content CMS</span>
            <FileText className="w-4 h-4 text-[#58C1EB]" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Published:</span>
              <span className="font-mono font-bold text-emerald-400">{publishedArticlesCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Drafts:</span>
              <span className="font-mono font-bold text-slate-300">{draftArticlesCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Awaiting Review:</span>
              <span className="font-mono font-bold text-[#58C1EB]">{awaitingApprovalArticlesCount}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{news.length} total articles</span>
            <button
              onClick={() => onSelectTab('news')}
              className="text-[#58C1EB] font-semibold hover:underline flex items-center gap-0.5"
            >
              CMS Workflow <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Module C: Customer Communication & Enquiries */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Enquiries CRM</span>
            <Mail className="w-4 h-4 text-[#58C1EB]" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">New Queue:</span>
              <span className="font-mono font-bold text-[#58C1EB]">{newEnquiriesCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Open / In Progress:</span>
              <span className="font-mono font-bold text-sky-400">{openEnquiriesCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Resolved:</span>
              <span className="font-mono font-bold text-emerald-400">{resolvedEnquiriesCount}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{enquiries.length} tickets</span>
            <button
              onClick={() => onSelectTab('enquiries')}
              className="text-[#58C1EB] font-semibold hover:underline flex items-center gap-0.5"
            >
              View Queue <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Module D: Careers & NSS Recruitment */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Careers & NSS</span>
            <Briefcase className="w-4 h-4 text-[#58C1EB]" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Active Vacancies:</span>
              <span className="font-mono font-bold text-white">{activeVacanciesCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">New Candidates:</span>
              <span className="font-mono font-bold text-[#58C1EB]">{newApplicationsCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Shortlisted:</span>
              <span className="font-mono font-bold text-emerald-400">{shortlistedCount}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{applications.length} pipeline</span>
            <button
              onClick={() => onSelectTab('applications')}
              className="text-[#58C1EB] font-semibold hover:underline flex items-center gap-0.5"
            >
              Pipeline <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Module E: Baggage Operations (Requirement 3: Baggage with DEMONSTRATION DATA label) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Baggage Hub</span>
            <Luggage className="w-4 h-4 text-[#58C1EB]" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Active Baggage Tags:</span>
              <span className="font-mono font-bold text-white">{baggageRecords.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Terminal 3 Apron:</span>
              <span className="font-mono font-bold text-emerald-400">Operational</span>
            </div>
            <div className="pt-1">
              <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#72BF44]/15 text-[#72BF44] border border-[#72BF44]/35">
                LIVE BRS FEED
              </span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 text-[10px]">SITA BagMessage Live</span>
            <button
              onClick={() => onSelectTab('baggage')}
              className="text-[#58C1EB] font-semibold hover:underline flex items-center gap-0.5"
            >
              Find My Bag <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Traffic Trends & Devices Breakdown (Requirement 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Trend Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Passenger & Airline Traffic Trajectory ({dateRange} Days)
              </h3>
              <p className="text-xs text-slate-400">
                Daily sessions across flight services, baggage portal, and cargo tariffs
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#58C1EB]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#204696]" /> Views
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-400" /> Visitors
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.trafficTrends}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#020617',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#viewsGrad)"
                  name="Page Views"
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#visitorsGrad)"
                  name="Unique Visitors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mobile vs Desktop Traffic Breakdown (Requirement 3) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Mobile vs Desktop Traffic
            </h3>
            <p className="text-xs text-slate-400">
              Passenger device breakdown across digital touchpoints
            </p>
          </div>

          <div className="space-y-4 my-auto">
            {stats.deviceBreakdown.map((dev) => {
              const isMobile = dev.name === 'Mobile';
              const isDesktop = dev.name === 'Desktop';
              const Icon = isMobile ? Smartphone : isDesktop ? Monitor : Tablet;
              const colorClass = isMobile ? 'bg-[#204696]' : isDesktop ? 'bg-sky-400' : 'bg-emerald-400';

              return (
                <div key={dev.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-medium">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{dev.name}</span>
                    </div>
                    <span className="font-mono font-bold text-white">{dev.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full ${colorClass} rounded-full transition-all duration-500`}
                      style={{ width: `${dev.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 text-right font-mono">
                    {dev.count} sessions
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Primary passenger entry:</span>
            <span className="text-[#58C1EB] font-semibold">Mobile Airport Terminal Access</span>
          </div>
        </div>
      </div>

      {/* 5. Most Visited Pages & Content Review Pipeline (Requirement 3: Most visited pages) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Visited Pages Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#58C1EB]" /> Most Visited Pages
              </h3>
              <p className="text-xs text-slate-400">High-intent landing pages in the last {dateRange} days</p>
            </div>
            <button
              onClick={() => onSelectTab('analytics')}
              className="text-xs text-[#58C1EB] hover:underline font-semibold"
            >
              Full Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-mono text-slate-500 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Page Path</th>
                  <th className="py-2.5 px-3 text-right">Views</th>
                  <th className="py-2.5 px-3 text-right">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {stats.topPages.map((p) => {
                  const share = stats.totalPageViews > 0 ? ((p.views / stats.totalPageViews) * 100).toFixed(1) : '0';
                  return (
                    <tr key={p.path} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 text-slate-200 font-medium">
                        {p.path === '/' ? '/ (Home)' : p.path}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#58C1EB] font-bold">
                        {p.views.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-400">
                        {share}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Content Awaiting Review / Publishing Pipeline (Requirement 4) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#58C1EB]" /> Content Publishing Workflow
              </h3>
              <p className="text-xs text-slate-400">Articles in editorial review, draft, or scheduled states</p>
            </div>
            <button
              onClick={() => onSelectTab('news')}
              className="text-xs text-[#58C1EB] hover:underline font-semibold"
            >
              Open CMS
            </button>
          </div>

          <div className="space-y-3">
            {news.slice(0, 4).map((art) => {
              const status = art.status || (art.isPublished ? 'Published' : 'Draft');
              const isPub = status === 'Published';
              const isDraft = status === 'Draft';
              const isReview = status === 'Submitted for Review';

              return (
                <div
                  key={art.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="font-semibold text-white truncate">{art.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>v{art.version || 1}</span>
                      <span>·</span>
                      <span>{art.category}</span>
                      <span>·</span>
                      <span>By {art.authorName || 'Corporate Comms'}</span>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                      isPub
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : isReview
                        ? 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Operational Queues: Recent Enquiries & Careers Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#58C1EB]" />
              Incoming Enquiries Queue
            </h3>
            <button
              onClick={() => onSelectTab('enquiries')}
              className="text-xs text-[#58C1EB] hover:underline font-semibold"
            >
              View All ({enquiries.length})
            </button>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#58C1EB] font-bold">{enq.referenceNo}</span>
                  <span className="text-[11px] text-slate-500">{enq.category}</span>
                </div>
                <div className="font-semibold text-white truncate">{enq.subject}</div>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>From: {enq.senderName}</span>
                  <select
                    value={enq.status}
                    onChange={(e) => handleEnquiryStatus(enq.id, e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-[11px] text-white focus:outline-none focus:border-[#58C1EB]"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Waiting for Customer">Waiting for Customer</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications Pipeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#58C1EB]" />
              Recruitment & NSS Pipeline
            </h3>
            <button
              onClick={() => onSelectTab('applications')}
              className="text-xs text-[#58C1EB] hover:underline font-semibold"
            >
              Full Pipeline ({applications.length})
            </button>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{app.applicantName}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      app.status === 'Shortlisted'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : app.status === 'Interview'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                        : app.status === 'Submitted'
                        ? 'bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/35'
                        : 'bg-slate-900 text-slate-300'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="text-slate-400 truncate">{app.jobTitle}</div>
                <div className="text-slate-500 text-[11px] flex justify-between">
                  <span>{app.phone}</span>
                  <span>{new Date(app.createdAt).toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

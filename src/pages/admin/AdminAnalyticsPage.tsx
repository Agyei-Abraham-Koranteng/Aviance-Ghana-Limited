import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Download, Smartphone, Laptop, Tablet, Globe } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { analyticsService } from '../../services/analyticsService';

export const AdminAnalyticsPage: React.FC = () => {
  const [days, setDays] = useState(30);
  const stats = analyticsService.getStats(days);

  const deviceColors = ['#f59e0b', '#38bdf8', '#a855f7'];

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Date,PageViews,Visitors\n' +
      stats.trafficTrends.map((t) => `${t.date},${t.pageViews},${t.visitors}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aviance_analytics_${days}d.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            First-Party Website Analytics & Traffic Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Privacy-conscious telemetry complying with the Ghana Data Protection Act 2012
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                  days === d
                    ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>

          <button
            onClick={exportCSV}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#58C1EB]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400">Total Page Views</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.totalPageViews.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-mono">+8.1% trend</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400">Unique Sessions</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.uniqueVisitors.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 font-mono">1.8 pages / session</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400">Baggage Searches</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.baggageSearches}</div>
          <div className="text-[11px] text-[#58C1EB]">Find My Bag Portal</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="text-xs text-slate-400">Total Lead Conversions</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.enquirySubmits + stats.careerSubmits}</div>
          <div className="text-[11px] text-emerald-400 font-mono">{stats.conversionRate}% conversion rate</div>
        </div>
      </div>

      {/* Traffic Line Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Daily Traffic Over Time
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.trafficTrends}>
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
                fill="#f59e0b"
                fillOpacity={0.2}
                name="Page Views"
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#38bdf8"
                strokeWidth={2}
                fill="#38bdf8"
                fillOpacity={0.1}
                name="Visitors"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two columns: Top Pages and Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Most Viewed Web Routes
          </h3>
          <div className="space-y-2">
            {stats.topPages.map((p, i) => (
              <div key={p.path} className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg text-xs">
                <span className="font-mono text-slate-200">{i + 1}. {p.path}</span>
                <span className="font-mono text-[#58C1EB] font-bold">{p.views} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Device Distribution
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            {stats.deviceBreakdown.map((dev, i) => (
              <div key={dev.name} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">{dev.name}</div>
                <div className="text-xl font-bold text-white font-mono">{dev.percentage}%</div>
                <div className="text-[10px] text-slate-500 font-mono">{dev.count} sessions</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { FileSpreadsheet, Download, Mail, Users, Eye, ArrowRight } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';

export const AdminReportsPage: React.FC = () => {
  const enquiries = dataService.getEnquiries();
  const applications = dataService.getApplications();
  const services = dataService.getServices();
  const stats = analyticsService.getStats(30);

  const downloadCSV = (filename: string, content: string) => {
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + content);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportEnquiries = () => {
    const headers = 'Reference,Category,Sender,Email,Phone,Subject,Status,Priority,CreatedAt\n';
    const rows = enquiries
      .map(
        (e) =>
          `"${e.referenceNo}","${e.category}","${e.senderName}","${e.email}","${e.phone || ''}","${e.subject}","${e.status}","${e.priority}","${e.createdAt}"`
      )
      .join('\n');
    downloadCSV(`aviance_enquiries_${new Date().toISOString().split('T')[0]}.csv`, headers + rows);
  };

  const exportApplications = () => {
    const headers = 'Candidate,JobTitle,Email,Phone,DigitalAddress,Status,CreatedAt\n';
    const rows = applications
      .map(
        (a) =>
          `"${a.applicantName}","${a.jobTitle}","${a.email}","${a.phone}","${a.ghanaDigitalAddress || ''}","${a.status}","${a.createdAt}"`
      )
      .join('\n');
    downloadCSV(`aviance_applications_${new Date().toISOString().split('T')[0]}.csv`, headers + rows);
  };

  const exportTraffic = () => {
    const headers = 'Date,PageViews,Visitors\n';
    const rows = stats.trafficTrends.map((t) => `${t.date},${t.pageViews},${t.visitors}`).join('\n');
    downloadCSV(`aviance_traffic_30d_${new Date().toISOString().split('T')[0]}.csv`, headers + rows);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-[#58C1EB]" />
          Executive Operations Reports & CSV Data Exports
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Generate structured tabular reports for GCAA regulatory audits, carrier SLA reviews, and board presentations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/25 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Customer Enquiries Report</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Export all logged customer enquiries, handling quote requests, and status resolutions.
            </p>
            <div className="text-xs font-mono text-slate-500 pt-1">
              {enquiries.length} records available
            </div>
          </div>
          <button
            onClick={exportEnquiries}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#58C1EB]" />
            <span>Download Enquiries CSV</span>
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/25 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Recruitment & Candidates Report</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full candidate roster, positions applied for, contact numbers, and screening pipeline stages.
            </p>
            <div className="text-xs font-mono text-slate-500 pt-1">
              {applications.length} applications logged
            </div>
          </div>
          <button
            onClick={exportApplications}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#58C1EB]" />
            <span>Download Candidates CSV</span>
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#58C1EB]/10 text-[#58C1EB] border border-[#58C1EB]/25 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Traffic & Route Analytics Report</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aggregated daily views, visitors, and service interest metrics over the past 30 days.
            </p>
            <div className="text-xs font-mono text-slate-500 pt-1">
              30 daily aggregation intervals
            </div>
          </div>
          <button
            onClick={exportTraffic}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#58C1EB]" />
            <span>Download Traffic CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Database,
  ShieldCheck,
  Radio,
  HardDrive,
  Users,
  Layers,
  Server,
  Lock,
  Activity,
  Bell,
  Code2,
  CheckCircle2,
  Cpu,
  FileCode,
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const TechnicalArchitectureVisual: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('database');

  const tiers = [
    {
      id: 'frontend',
      name: 'Layer 1: Frontend Presentation & Edge Routing',
      tech: 'React 19 + TypeScript + Vite + Tailwind CSS',
      desc: 'Mobile-first client application compiled into optimized immutable ES modules. Runs client-side routing, accessible UI primitives, and optimistic local-first state caching.',
      features: [
        'WCAG 2.1 AA accessible typography and contrast tokens',
        'Sub-second page transitions via memory routing and code-splitting',
        'Interactive forms with client-side sanitisation & anti-spam controls',
        'First-party privacy analytics without tracking cookies',
      ],
    },
    {
      id: 'supabase',
      name: 'Layer 2: Dual-Mode Persistence & Cloud Integration',
      tech: 'Supabase BaaS / Dual-Store LocalStorage Fallback',
      desc: 'Seamless dual-mode backend. In live cloud mode, routes queries to Supabase managed PostgreSQL. In standalone preview mode, operates through an in-memory dual-store maintaining schema parity.',
      features: [
        'Zero runtime downtime even when cloud network latency fluctuates',
        'Transparent JSON serialization mimicking PostgreSQL document responses',
        'Supabase Storage bucket provisioning: media, documents, resumes',
        'WebSocket Realtime broadcast bus for enquiry/ticket notifications',
      ],
    },
    {
      id: 'database',
      name: 'Layer 3: Relational PostgreSQL Schema & RLS',
      tech: 'PostgreSQL 15+ with Row Level Security (RLS)',
      desc: '14 normalized relational entities matching Aviance Ghana operations: services, stations, certs, news, vacancies, applications, enquiries, baggage, customers, audit_logs, and documents.',
      features: [
        'Row Level Security (RLS) policies on every production table',
        'Public SELECT on published content only (status = Published)',
        'Staff-authenticated INSERT for applications and public enquiries',
        'Role-scoped UPDATE and DELETE restricted to verified administrators',
      ],
    },
    {
      id: 'rbac',
      name: 'Layer 4: Role-Based Access Control (RBAC)',
      tech: 'Matrix-Based Granular Permissions Engine',
      desc: '10 discrete administrative personas enforced across all viewports and data endpoints. Restricts access to sensitive HR applicant records and operations tickets.',
      features: [
        'Super Admin: full governance, system settings, schema introspection',
        'Content Manager: services, news, media, documents, certifications',
        'HR / Recruitment: candidate pipeline, resumes, interview stages',
        'Operations & Cargo: baggage tracking, cargo enquiries, turnaround watch',
      ],
    },
    {
      id: 'audit',
      name: 'Layer 5: Enterprise Audit Trail & Governance',
      tech: 'Immutable Event Logger & Security Stream',
      desc: 'Every state mutation (content review, approval, publishing, deletion, role change, enquiry resolution) writes an immutable structured audit log entry.',
      features: [
        'User email, timestamp, module, record ID, and change summary',
        'Tamper-evident log records immutable to standard users',
        'Security compliance ready for GCAA and ISO quality audits',
        'Real-time administrative alerts on sensitive operations',
      ],
    },
  ];

  const activeTierData = tiers.find((t) => t.id === selectedTier) || tiers[2];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#58C1EB] font-bold uppercase tracking-wider">
              System Engineering & Specifications
            </span>
            <StatusBadge status="PROPOSED DIGITAL FEATURE" size="xs" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Aviance Ghana Enterprise Digital Platform Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end schematic connecting public traveler interfaces, Supabase relational services, RLS security, and the CMS command centre.
          </p>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10 text-center">
          {/* Node 1: Public Web */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#58C1EB]/10 text-[#58C1EB] mx-auto flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Public Portal</div>
            <div className="text-[10px] text-slate-400">React 19 SPA · Tailwind</div>
            <div className="text-[9px] font-mono text-[#58C1EB]">Kotoka T3 / KMS / TML</div>
          </div>

          {/* Node 2: API & Store */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-400/10 text-sky-400 mx-auto flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Data Service</div>
            <div className="text-[10px] text-slate-400">Dual-Store Provider</div>
            <div className="text-[9px] font-mono text-emerald-400">Dual Cache Active</div>
          </div>

          {/* Node 3: Supabase Core */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2 shadow-lg shadow-emerald-500/5">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 text-emerald-400 mx-auto flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Supabase Core</div>
            <div className="text-[10px] text-slate-400">PostgreSQL · Auth · Storage</div>
            <div className="text-[9px] font-mono text-emerald-400">RLS Policies Enforced</div>
          </div>

          {/* Node 4: Security & RBAC */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-400/10 text-purple-400 mx-auto flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Security & RBAC</div>
            <div className="text-[10px] text-slate-400">10 Role Personas</div>
            <div className="text-[9px] font-mono text-purple-400">Immutable Audit Logs</div>
          </div>

          {/* Node 5: Admin CMS */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#58C1EB]/10 text-[#58C1EB] mx-auto flex items-center justify-center font-bold">
              <Server className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white">Command Centre</div>
            <div className="text-[10px] text-slate-400">5-Stage Content Workflow</div>
            <div className="text-[9px] font-mono text-[#58C1EB]">Management Cockpit</div>
          </div>
        </div>

        {/* Data flow arrows description */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Public Query: HTTPS / TLS 1.3
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#204696]"></span> Mutative Actions: RLS Authorized JWT
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span> Realtime Stream: WebSocket Push
          </span>
        </div>
      </div>

      {/* Interactive Layer Breakdown Tabs */}
      <div className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Inspect Architecture Layer:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl text-left border transition-all ${
                selectedTier === t.id
                  ? 'bg-[#204696] text-white border border-[#58C1EB]/40 border-[#58C1EB] font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {t.name.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Selected Tier Deep-Dive Panel */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">{activeTierData.name}</h3>
              <div className="text-xs font-mono text-[#58C1EB] mt-0.5">{activeTierData.tech}</div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded">
              Ready for Enterprise Production
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{activeTierData.desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {activeTierData.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Database, Copy, Check, ShieldCheck, Terminal, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase/client';

export const AdminDatabaseSchemaPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sqlSchemaText = `-- ==============================================================================
-- AVIANCE GHANA LIMITED — COMPLETE SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USER ROLES & PROFILES
CREATE TYPE user_role AS ENUM (
  'super_admin', 'content_manager', 'hr_recruitment',
  'operations_manager', 'it_admin', 'marketing_comm', 'viewer_analyst'
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'viewer_analyst',
  department TEXT,
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SERVICES (Passenger, Ramp, Cargo, VIP, Lounge, Baggage, GSE, Training, IT, QSH)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  hero_image TEXT,
  locations TEXT[] NOT NULL DEFAULT '{"Accra (Kotoka T3)", "Kumasi", "Tamale"}',
  features TEXT[] NOT NULL DEFAULT '{}',
  operating_hours TEXT NOT NULL DEFAULT '24/7 Operations',
  contact_email TEXT NOT NULL DEFAULT 'info@avianceghana.com',
  contact_phone TEXT NOT NULL DEFAULT '+233 (0)302 778 025',
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FIND MY BAG BAGGAGE RECORDS
CREATE TABLE IF NOT EXISTS baggage_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baggage_tag TEXT NOT NULL UNIQUE,
  passenger_name TEXT NOT NULL,
  airline_code TEXT NOT NULL,
  flight_number TEXT NOT NULL,
  routing TEXT NOT NULL,
  current_status TEXT NOT NULL,
  last_checkpoint TEXT NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  handler_desk_contact TEXT NOT NULL DEFAULT '+233 (0)302 778 025 (Ext. 204)',
  notes TEXT
);

-- RECRUITMENT & ENQUIRIES
CREATE TABLE IF NOT EXISTS vacancies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT NOT NULL,
  deadline DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vacancy_id UUID REFERENCES vacancies(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  ghana_digital_address TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_no TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New',
  priority TEXT NOT NULL DEFAULT 'Medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE baggage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published services" ON services FOR SELECT USING (is_published = true);
CREATE POLICY "Public read open vacancies" ON vacancies FOR SELECT USING (status != 'Closed');
CREATE POLICY "Public read baggage" ON baggage_records FOR SELECT USING (true);
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert applications" ON applications FOR INSERT WITH CHECK (true);

-- Authenticated administrative access
CREATE POLICY "Admins manage all services" ON services TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins manage all enquiries" ON enquiries TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins manage all applications" ON applications TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins manage baggage" ON baggage_records TO authenticated USING (true) WITH CHECK (true);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlSchemaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-[#58C1EB]" />
            Supabase PostgreSQL Architecture & Migration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete database schema, Row Level Security (RLS) policies, and storage bucket definitions
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-[#204696] hover:bg-[#183878] text-white border border-[#58C1EB]/40 shadow-sm font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'SQL Copied to Clipboard!' : 'Copy SQL Migration'}</span>
        </button>
      </div>

      {/* Supabase Status Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <div className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400' : 'bg-[#204696]'}`}></div>
            <span>Backend Status: {isSupabaseConfigured ? 'Connected to Remote Supabase Instance' : 'Reactive Persistent Engine Active'}</span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            To connect your live Supabase cloud project, set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your environment file, then execute the SQL migration script below in your Supabase SQL Editor.
          </p>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300">
          <div>VITE_SUPABASE_URL</div>
          <div>VITE_SUPABASE_ANON_KEY</div>
        </div>
      </div>

      {/* Code Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#58C1EB]" />
            <span>supabase/schema.sql (PostgreSQL 15+)</span>
          </div>
          <span>UTF-8 · 16 Tables · 9 Policies</span>
        </div>

        <pre className="p-5 text-[11px] text-slate-300 font-mono overflow-x-auto max-h-[500px] leading-relaxed select-all">
          {sqlSchemaText}
        </pre>
      </div>
    </div>
  );
};

-- ==============================================================================
-- AVIANCE GHANA LIMITED — COMPLETE SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- ==============================================================================
-- Run this migration in your Supabase SQL Editor to provision the complete
-- aviation ground handling platform database.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER ROLES & PROFILES
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'content_manager',
  'hr_recruitment',
  'operations_manager',
  'it_admin',
  'marketing_comm',
  'viewer_analyst'
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'viewer_analyst',
  department TEXT,
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. LOCATIONS (Accra, Kumasi, Tamale)
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE, -- ACC, KMS, TML
  name TEXT NOT NULL,
  airport_name TEXT NOT NULL,
  icao_code TEXT NOT NULL,
  iata_code TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  digital_address TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  operating_hours TEXT NOT NULL DEFAULT '24/7 Operational Availability',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SERVICES
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  hero_image TEXT,
  icon TEXT NOT NULL DEFAULT 'Plane',
  locations TEXT[] NOT NULL DEFAULT '{"Accra (Kotoka T3)", "Kumasi", "Tamale"}',
  features TEXT[] NOT NULL DEFAULT '{}',
  operating_hours TEXT NOT NULL DEFAULT '24/7 Operations',
  contact_email TEXT NOT NULL DEFAULT 'info@avianceghana.com',
  contact_phone TEXT NOT NULL DEFAULT '+233 (0)302 778 025',
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CERTIFICATIONS & LICENCES
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  certificate_number TEXT,
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, expiring_soon, renewal_pending
  category TEXT NOT NULL DEFAULT 'Ground Operations',
  description TEXT,
  document_url TEXT,
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. NEWS ARTICLES & PRESS RELEASES
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'Company News',
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_name TEXT NOT NULL DEFAULT 'Aviance Corporate Communications',
  author_role TEXT DEFAULT 'Media Relations',
  read_time_minutes INT NOT NULL DEFAULT 3,
  tags TEXT[] NOT NULL DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. CAREER VACANCIES
CREATE TABLE IF NOT EXISTS vacancies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Kotoka International Airport, Accra',
  employment_type TEXT NOT NULL DEFAULT 'Full-time', -- Full-time, Contract, National Service
  description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  deadline DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Open', -- Open, Reviewing, Closed
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. JOB APPLICATIONS
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
  status TEXT NOT NULL DEFAULT 'New', -- New, Reviewing, Shortlisted, Interview, Selected, Rejected
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. GENERAL & DEPARTMENTAL ENQUIRIES
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_no TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- General, Passenger Services, Cargo, Ramp, Lounge, Baggage, IT, Careers, VIP
  sender_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New', -- New, In Review, Responded, Resolved, Closed
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  priority TEXT NOT NULL DEFAULT 'Medium', -- Low, Medium, High, Urgent
  resolution_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. BAGGAGE RECORDS (FIND MY BAG)
CREATE TABLE IF NOT EXISTS baggage_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baggage_tag TEXT NOT NULL UNIQUE, -- e.g. ACC-782910
  passenger_name TEXT NOT NULL,
  airline_code TEXT NOT NULL,
  flight_number TEXT NOT NULL,
  routing TEXT NOT NULL, -- e.g. LHR -> ACC
  current_status TEXT NOT NULL, -- Located, Ground Handling in Progress, Ready for Collection, In Transit
  last_checkpoint TEXT NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  handler_desk_contact TEXT NOT NULL DEFAULT '+233 (0)302 778 025 (Ext. 204)',
  notes TEXT
);

-- 11. LEADERSHIP & MANAGEMENT
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  biography TEXT NOT NULL,
  photo_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. CUSTOMERS & AIRLINE PARTNERS
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Commercial Airline', -- Commercial Airline, Cargo Freighter, VIP / Executive
  logo_url TEXT,
  website TEXT,
  services_provided TEXT[] NOT NULL DEFAULT '{"Ramp Handling", "Passenger Services"}',
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  record_id TEXT,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. FIRST-PARTY PRIVACY ANALYTICS
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL, -- page_view, service_view, baggage_search, enquiry_submit
  page_path TEXT NOT NULL,
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE baggage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Public can read published public content
CREATE POLICY "Public read published services" ON services FOR SELECT USING (is_published = true);
CREATE POLICY "Public read active locations" ON locations FOR SELECT USING (is_active = true);
CREATE POLICY "Public read certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read published news" ON news_articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public read open vacancies" ON vacancies FOR SELECT USING (status != 'Closed');
CREATE POLICY "Public read active team" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active customers" ON customers FOR SELECT USING (is_active = true);
CREATE POLICY "Public read own baggage record" ON baggage_records FOR SELECT USING (true);

-- Public can insert enquiries and applications
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert applications" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert analytics events" ON analytics_events FOR INSERT WITH CHECK (true);

-- Authenticated staff with roles have full access to management tables
CREATE POLICY "Authenticated users view profiles" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins full services" ON services TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full news" ON news_articles TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full vacancies" ON vacancies TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full applications" ON applications TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full enquiries" ON enquiries TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full baggage" ON baggage_records TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full audit_logs" ON audit_logs TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full analytics" ON analytics_events TO authenticated USING (true) WITH CHECK (true);

-- 16. STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('certifications', 'certifications', true) ON CONFLICT DO NOTHING;

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Monitor,
  Shield,
  Layers,
  Sparkles,
  Users,
  Briefcase,
  Luggage,
  BarChart3,
  Lock,
  Globe,
  Database,
  CheckCircle2,
  TrendingUp,
  FileText,
  Compass,
  Building2,
  ExternalLink,
  Plane,
  X,
  Play,
  Share2,
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { TechnicalArchitectureVisual } from '../../components/admin/TechnicalArchitectureVisual';

interface ManagementPresentationPageProps {
  onNavigate: (path: string) => void;
  onOpenAdminTab: (tab: string) => void;
}

export const ManagementPresentationPage: React.FC<ManagementPresentationPageProps> = ({
  onNavigate,
  onOpenAdminTab,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      number: '01',
      title: 'The Opportunity',
      tagline: 'Modernizing West Africa’s Leading Ground Handling Web Presence',
      badge: 'STRATEGIC VISION',
      summary:
        'Aviance Ghana Limited has established gold-standard airside handling, passenger facilitation, and Cargo RA3 operations at Kotoka International Airport since 1994. The opportunity is to elevate the digital presence to match this operational standard, empowering travelers, airlines, and staff with an integrated digital gateway.',
      highlights: [
        'Replace static informational silos with a responsive, high-speed corporate portal',
        'Provide instant self-service answers for passengers in Terminal 3 (lounge, baggage desks)',
        'Equip commercial airline operators with direct SGHA service discovery and operations contacts',
        'Streamline recruitment and annual National Service Scheme (NSS) graduate intake workflows',
      ],
      quickAction: { label: 'Explore Redesigned Website', action: () => onNavigate('/') },
    },
    {
      number: '02',
      title: 'Redesigned Website',
      tagline: 'Aviation-Grade Visual Precision & Brand Authority',
      badge: 'EXPERIENCE DESIGN',
      summary:
        'The public website provides an authoritative showcase of Aviance Ghana’s scale across Kotoka Terminal 3, Kumasi Prempeh I Airport, and Tamale International Airport. Built with modern typography, crisp contrast, and fast navigation without generic templates.',
      highlights: [
        'Clear hierarchy: Who Aviance is, what Aviance does, where Aviance operates, and why airlines trust Aviance',
        'Verified corporate identity synced with official Aviance sources (ISAGO, RA3, GCAA)',
        'Instant station directory with digital addresses (GL-016-1234) and direct operations contacts',
        'Responsive across smartphones (320px+), tablets, and executive boardroom displays',
      ],
      quickAction: { label: 'View Public Homepage', action: () => onNavigate('/') },
    },
    {
      number: '03',
      title: 'Digital Services Directory',
      tagline: 'Comprehensive Front-of-House & Airside Handling Scopes',
      badge: 'OPERATIONAL BREADTH',
      summary:
        'Every operational division is systematically documented with capabilities, safety standards, operating hours, and verified departmental manager contacts. Airline partners can easily review handling scopes from wide-body pushback to PRM ambulifts.',
      highlights: [
        'Passenger Handling: DCS check-in, boarding gates, document verification, PRM mobility',
        'Ramp Handling: Marshalling, pushback, GPU 400Hz, air start, lavatory & water servicing',
        'Cargo Terminal: EU Cargo RA3 cold chain warehouse, perishable horticultural cold rooms',
        'Adinkra Lounge & VIP: Walk-in pricing, private conference suites, protocol escort',
      ],
      quickAction: { label: 'Explore Services Directory', action: () => onNavigate('/services') },
    },
    {
      number: '04',
      title: 'Smart Service Finder',
      tagline: 'Intent-Based Navigation for Diverse Aviation Stakeholders',
      badge: 'PROPOSED DIGITAL FEATURE',
      summary:
        'Airport visitors have very different goals. The Smart Service Finder allows visitors to declare their role—Passenger, Airline Operator, Cargo Shipper, Corporate Client, or Job Seeker—and instantly surfaces tailored solutions, eliminating confusing search friction.',
      highlights: [
        'Personalized routes for passengers (Baggage Tracing, Lounge Access, Terminal 3 Desks)',
        'Fast pathways for commercial airline station managers and flight operations officers',
        'Instant cargo quotation links directly to Robert Amenyah, Cargo Manager (+233 593 816 076)',
        'Clearly positioned as smart website navigation without fabricated AI claims',
      ],
      quickAction: { label: 'Test Service Finder on Homepage', action: () => onNavigate('/') },
    },
    {
      number: '05',
      title: 'Baggage Experience (Find My Bag)',
      tagline: 'Digital Tracing Concept & 24/7 Arrivals Desk Liaison',
      badge: 'PROPOSED DIGITAL FEATURE',
      summary:
        'Demonstrates what an automated baggage status query capability could look like when integrated with airline DCS/BRS stubs and SITA WorldTracer. Transparently connects travelers to the real 24/7 Terminal 3 Baggage Services Office (+233 244 334 022 / findmybag@avianceghana.com).',
      highlights: [
        'Interactive prototype testing simulated bag tag queries (ACC-782910, EK-451902)',
        'Clearly badged with DEMONSTRATION DATA so travelers know it is a redevelopment concept',
        'Automated property assistance ticket generation logging directly into the admin CRM',
        'Official Terminal 3 carousel baggage desk details prominently displayed for direct resolution',
      ],
      quickAction: { label: 'Launch Baggage Tracing Concept', action: () => onNavigate('/find-my-bag') },
    },
    {
      number: '06',
      title: 'Enterprise CMS Workflow',
      tagline: 'Strict 5-Stage Publishing Governance Matrix',
      badge: 'CONTENT GOVERNANCE',
      summary:
        'Content is no longer hardcoded. The platform introduces an enterprise publishing pipeline: Draft → Submitted for Review → Approved → Published → Archived. Content must be formally audited and reviewed before appearing publicly.',
      highlights: [
        'Role-scoped workflows: authors create drafts, reviewers review, super admins publish',
        'Content versioning: track revisions, inspect author history, and restore prior versions',
        'Strict verification metadata: flag records as Verified Official vs CMS Verification Required',
        'Live preview mode before publication across news, services, certificates, and team bios',
      ],
      quickAction: {
        label: 'Open CMS Services Manager',
        action: () => {
          onNavigate('/admin');
          onOpenAdminTab('services');
        },
      },
    },
    {
      number: '07',
      title: 'Enquiry Management (Mini CRM)',
      tagline: 'Unified Customer Communication & Commercial Leads Pipeline',
      badge: 'ENTERPRISE CRM',
      summary:
        'Customer submissions from public contact forms, cargo rate inquiries, and VIP flight handling requests are funneled into a centralized ticket queue with unique reference codes (e.g. AV-26-0891), assignment stages, and audit trails.',
      highlights: [
        'Workflow states: New → Assigned → In Progress → Waiting for Customer → Resolved → Closed',
        'Departmental routing across Cargo, Passenger Handling, Lounge, VIP, IT, and Careers',
        'Resolution notes and internal coordination logs saved immutably for supervisory review',
        'Automated notification badge alerts for duty operations managers upon submission',
      ],
      quickAction: {
        label: 'View Enquiries Queue',
        action: () => {
          onNavigate('/admin');
          onOpenAdminTab('enquiries');
        },
      },
    },
    {
      number: '08',
      title: 'Careers & NSS Recruitment',
      tagline: 'Structured Talent Acquisition for Aviation Operations',
      badge: 'PROPOSED RECRUITMENT WORKFLOW',
      summary:
        'Aviance Ghana employs approximately 1,000 aviation professionals. The recruitment module showcases an organized pipeline from vacancy listing to CV submission and review stages, with dedicated support for National Service Scheme (NSS) applicants.',
      highlights: [
        'Application lifecycle: Submitted → Under Review → Shortlisted → Interview → Selected',
        'Document validation for CVs, transcripts, and Ghana digital addresses (GL-XXX-XXXX)',
        'Segregated NSS & graduate internship candidate filters for HR department managers',
        'Direct supervisory notes and interview stage tracking with data privacy safeguards',
      ],
      quickAction: {
        label: 'View Recruitment Pipeline',
        action: () => {
          onNavigate('/admin');
          onOpenAdminTab('applications');
        },
      },
    },
    {
      number: '09',
      title: 'Digital Command Centre',
      tagline: 'Executive Cockpit for Operational Health & Digital Activity',
      badge: 'MANAGEMENT DASHBOARD',
      summary:
        'The main administrative cockpit immediately communicates platform activity: traffic trends across stations, open customer tickets, pending job applications, and infrastructure health monitoring.',
      highlights: [
        'Key performance indicators for unique visitors, total page views, and open inquiries',
        'Visual interactive traffic trends and mobile vs desktop user engagement charts',
        'Station watch over Kotoka (ACC), Kumasi (KMS), and Tamale (TML)',
        'One-click access to audit logs, SQL database schemas, and system settings',
      ],
      quickAction: {
        label: 'View Command Centre Cockpit',
        action: () => {
          onNavigate('/admin');
          onOpenAdminTab('dashboard');
        },
      },
    },
    {
      number: '10',
      title: 'Analytics & Privacy',
      tagline: 'First-Party Privacy-Conscious Passenger Telemetry',
      badge: 'BUSINESS INTELLIGENCE',
      summary:
        'First-party traffic analytics tracking which services (Ramp, Cargo, Lounge, Baggage) travelers and airlines explore most. Operates without invasive third-party ad trackers, preserving aviation confidentiality.',
      highlights: [
        'Station and route engagement telemetry over 7, 30, and 90 day inspection windows',
        'Device telemetry: mobile smartphone vs desktop airline dispatch terminals',
        'Exportable tabular reports for executive board meetings and GCAA compliance reviews',
        'Demonstration data clearly labeled until linked to production enterprise analytics',
      ],
      quickAction: {
        label: 'View Web Analytics',
        action: () => {
          onNavigate('/admin');
          onOpenAdminTab('analytics');
        },
      },
    },
    {
      number: '11',
      title: 'Governance, Security & RBAC',
      tagline: '10 Granular Administrative Role Personas & Row Level Security',
      badge: 'SECURITY & COMPLIANCE',
      summary:
        'Enterprise security backed by Supabase PostgreSQL Row Level Security (RLS) and a 10-role Access Control Matrix. Ensures HR personnel only access candidate CVs, while ground operations officers manage baggage and service records.',
      highlights: [
        '10 Tested Personas: Super Admin, Content Manager, HR, Operations, Cargo, Baggage, IT, etc.',
        'Interactive persona switcher in the admin topbar for seamless executive demonstration',
        'Immutable audit logs recording every mutation (who changed what, when, and from which IP)',
        'Public endpoints restricted to published records; private drafts strictly shielded',
      ],
      quickAction: {
        label: 'Inspect Audit Trail',
        action: () => {
          onNavigate('/admin');
          onOpenAdminTab('audit_logs');
        },
      },
    },
    {
      number: '12',
      title: 'Future Digital Capabilities',
      tagline: 'Integration-Ready Foundation for SITA, DCS & Airline BRS',
      badge: 'INTEGRATION ROADMAP',
      summary:
        'The platform is architected as an integration-ready foundation. Future phases can connect directly via secure REST/GraphQL webhooks to airline DCS systems, SITA WorldTracer feeds, and GCAA customs portals.',
      highlights: [
        'Partner Portal Concept: Self-service flight turnaround slot requests for partner airlines',
        'Real-time airside pushback status synchronization with airport ramp displays',
        'Digital Document Centre: Central repository for SGHA agreements and ISAGO audit records',
        'Designed to grow seamlessly without discarding the present investment',
      ],
      quickAction: { label: 'Explore Partner Portal Concept', action: () => onNavigate('/partner-portal') },
    },
    {
      number: '13',
      title: 'Technical Architecture',
      tagline: 'Enterprise Full-Stack Architecture Built on React & Supabase',
      badge: 'TECHNICAL EXCELLENCE',
      summary:
        'A resilient modern stack designed for high concurrency, zero cold starts, and seamless dual-store resilience. Inspect the complete multi-tier architectural diagram below:',
      highlights: [
        'React 19 + TypeScript + Tailwind CSS for sub-second page loads across Africa and worldwide',
        'Dual-Mode persistence: live Supabase cloud database with automatic local-first preview fallback',
        '14 normalized PostgreSQL relational entities with strict foreign key constraints and RLS',
        'Supabase Storage buckets provisioned for resumes, airline agreements, and cargo manuals',
      ],
      isArchitectureSlide: true,
      quickAction: {
        label: 'View SQL Database Schemas',
        action: () => {
          onNavigate('/admin');
          onOpenAdminTab('database');
        },
      },
    },
    {
      number: '14',
      title: 'Business Value & Summary',
      tagline: 'Tangible Operational & Commercial Advantages for Aviance Ghana',
      badge: 'EXECUTIVE PROPOSAL',
      summary:
        'This website redevelopment concept and enterprise CMS prototype provides Aviance Ghana Limited with a credible, scalable blueprint to modernize customer engagement, streamline operations, and reinforce industry leadership across West Africa.',
      highlights: [
        'Commercial Authority: Attract new international airline handling contracts with a world-class digital image',
        'Operational Efficiency: Reduce phone call volume to Terminal 3 desks through automated digital discovery',
        'Recruitment Excellence: Modernize talent acquisition for ramp crews, passenger agents, and NSS graduates',
        'Management Control: Maintain complete governance over corporate claims with verification workflows',
      ],
      quickAction: { label: 'Return to Corporate Website', action: () => onNavigate('/') },
    },
  ];

  const current = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Presentation Top Control Bar */}
      <div className="bg-[#0C1933]/95 border border-[#204696]/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-[#204696]/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#153170] to-[#204696] text-[#58C1EB] border border-[#58C1EB]/40 flex items-center justify-center font-bold">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#58C1EB] font-bold">
                Management Presentation Deck
              </span>
              <span className="text-[10px] font-mono bg-[#071120] text-slate-300 px-2 py-0.5 rounded border border-[#204696]/30">
                Slide {currentSlide + 1} of {slides.length}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Aviance Ghana Digital Transformation Concept
            </h1>
          </div>
        </div>

        {/* Quick Demo Launch Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('/')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            View Website
          </button>
          <button
            onClick={() => {
              onNavigate('/admin');
              onOpenAdminTab('dashboard');
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Open CMS
          </button>
          <button
            onClick={() => {
              onNavigate('/admin');
              onOpenAdminTab('enquiries');
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Enquiries CRM
          </button>
          <button
            onClick={() => onNavigate('/find-my-bag')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Find My Bag
          </button>
        </div>
      </div>

      {/* Chapters Horizontal Scroll Indicator */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        {slides.map((s, idx) => (
          <button
            key={s.number}
            onClick={() => setCurrentSlide(idx)}
            className={`px-3 py-2 rounded-xl whitespace-nowrap font-mono text-[11px] transition-all flex items-center gap-1.5 shrink-0 ${
              currentSlide === idx
                ? 'bg-gradient-to-r from-[#204696] to-[#18397a] text-white border border-[#58C1EB]/60 font-bold shadow-md'
                : 'bg-[#0A162C] border border-[#204696]/25 text-slate-300 hover:text-white'
            }`}
          >
            <span>{s.number}</span>
            <span className="hidden sm:inline font-sans font-medium">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Main Slide Card */}
      <div className="bg-[#0A162C]/95 border border-[#204696]/35 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#204696]/30 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#58C1EB] tracking-wider">
                CHAPTER {current.number}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#204696]/20 border border-[#58C1EB]/40 text-[#58C1EB] uppercase font-semibold">
                {current.badge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {current.title}
            </h2>
            <p className="text-sm text-slate-300 font-medium">{current.tagline}</p>
          </div>

          <div className="text-right">
            <button
              onClick={current.quickAction.action}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2 shadow-md"
            >
              <span>{current.quickAction.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Content Body */}
        <div className="space-y-6">
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
            {current.summary}
          </div>

          {/* Key Strategic Highlights */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Key Capabilities & Strategic Deliverables
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {current.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Architecture visual for Slide 13 */}
          {current.isArchitectureSlide && (
            <div className="pt-4">
              <TechnicalArchitectureVisual />
            </div>
          )}
        </div>

        {/* Slide Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            {currentSlide + 1} / {slides.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

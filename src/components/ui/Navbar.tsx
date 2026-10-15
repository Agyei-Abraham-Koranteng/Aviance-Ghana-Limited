import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Shield,
  Plane,
  ArrowRight,
  PackageCheck,
  Armchair,
  Luggage,
  Wrench,
  GraduationCap,
  Cpu,
  Users,
  Building2,
  FileText,
  HelpCircle,
  Award,
  PhoneCall,
  Briefcase,
  Sun,
  Moon,
  Globe,
  Check,
} from 'lucide-react';
import { AvianceLogo } from './AvianceLogo';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const { theme, toggleTheme, isLight } = useTheme();
  const { language, setLanguage, t, languages, currentLanguageOption } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setServicesMenuOpen(false);
        setMoreMenuOpen(false);
        setLanguageMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    setMoreMenuOpen(false);
    setLanguageMenuOpen(false);
    onNavigate(path);
  };

  const serviceLinks = [
    { name: t('services.passenger.title', 'Passenger Services'), path: '/passenger-services', icon: Users, desc: t('services.passenger.desc', 'DCS check-in, boarding & PRM') },
    { name: t('services.ramp.title', 'Ramp Handling'), path: '/ramp-handling', icon: Plane, desc: t('services.ramp.desc', 'Aircraft turnaround & pushback') },
    { name: t('services.cargo.title', 'Air Cargo Terminal'), path: '/cargo', icon: PackageCheck, desc: t('services.cargo.desc', 'EU RA3 cold chain logistics') },
    { name: t('services.vip.title', 'VIP & Charter Services'), path: '/vip-charter', icon: Shield, desc: t('services.vip.desc', 'Meet & greet, executive handling') },
    { name: t('services.lounge.title', 'Lounge Services (Adinkra)'), path: '/lounge', icon: Armchair, desc: t('services.lounge.desc', 'Executive hospitality Terminal 3') },
    { name: t('services.baggage.title', 'Baggage Services'), path: '/baggage', icon: Luggage, desc: t('services.baggage.desc', 'Delayed baggage & tracing desk') },
    { name: t('services.gse.title', 'GSE & Fleet Maintenance'), path: '/gse-fleet-maintenance', icon: Wrench, desc: t('services.gse.desc', 'Airside workshop maintenance') },
    { name: t('services.training.title', 'Operational Training'), path: '/training', icon: GraduationCap, desc: t('services.training.desc', 'Ramp safety & DGR training') },
    { name: t('services.occ.title', 'OCC - Flight Operations'), path: '/operations', icon: Cpu, desc: t('services.occ.desc', '24/7 flight coordination center') },
  ];

  const moreLinks = [
    { name: t('nav.lounge', 'Adinkra Lounge (T3)'), path: '/lounge', icon: Armchair, desc: 'Premium executive passenger hospitality', desktopOnlyAtLg: true },
    { name: t('nav.safety', 'Safety & Standards'), path: '/certifications', icon: Award, desc: 'ISAGO, GCAA, IATA AHM compliance', desktopOnlyAtLg: true },
    { name: t('nav.careers', 'Careers & Vacancies'), path: '/careers', icon: Briefcase, desc: 'Join our certified ground operations crew', desktopOnlyAtLg: true },
    { name: t('nav.management', 'Executive Leadership'), path: '/management', icon: Building2, desc: 'Aviance board & senior management team' },
    { name: t('nav.about', 'About Aviance Ghana'), path: '/about', icon: Users, desc: 'History, infrastructure, fleet & values' },
    { name: t('nav.documents', 'Document Centre'), path: '/documents', icon: FileText, desc: 'SGHA, tariffs, manuals & airline forms' },
    { name: t('nav.faqs', 'Operational FAQs'), path: '/faqs', icon: HelpCircle, desc: 'Answers for passengers & airline partners' },
    { name: t('nav.contact', 'Contact & Station Info'), path: '/contact', icon: PhoneCall, desc: 'ACC, KMS, TML station directories' },
  ];

  return (
    <div ref={navRef}>
      {/* Real-Time Operational Airport Telemetry & Contact Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 h-7 border-b text-[11px] font-medium shadow-xs flex items-center justify-between select-none transition-colors px-3 sm:px-6 lg:px-8 ${
        isLight
          ? 'bg-slate-100 border-slate-200 text-slate-700'
          : 'bg-[#08101E] border-[#204696]/40 text-white'
      }`}>
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#72BF44] animate-pulse"></span>
            <span className={`tracking-wide text-[10.5px] sm:text-[11px] font-semibold ${
              isLight ? 'text-slate-900' : 'text-slate-100'
            }`}>
              {t('telemetry.station', "ACC · Kotoka Int'l")}
            </span>
            <span className={`hidden sm:inline text-[10px] font-mono ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {t('telemetry.terminal', 'Terminal 3 (DGAA)')}
            </span>
          </div>
          <span className={`hidden md:inline ${isLight ? 'text-slate-300' : 'text-slate-700'}`}>|</span>
          <div className="hidden md:flex items-center gap-2">
            <span className={`font-mono text-[10px] uppercase font-bold tracking-wider ${
              isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
            }`}>
              {t('telemetry.isago', 'ISAGO Registered')}
            </span>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>·</span>
            <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {t('telemetry.gcaa', 'GCAA Authorized Handler')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-5 text-[11px] shrink-0 font-mono whitespace-nowrap">
          <div className={`hidden lg:flex items-center gap-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <span className={`text-[10px] ${isLight ? 'text-[#0284C7] font-semibold' : 'text-[#58C1EB]'}`}>
              {t('telemetry.occ', '24/7 OCC:')}
            </span>
            <a href="tel:+233244334022" className={`transition-colors font-semibold ${
              isLight ? 'hover:text-[#204696] text-slate-800' : 'hover:text-white text-slate-200'
            }`}>
              +233 (0) 244 334 022
            </a>
          </div>
          <span className={`hidden lg:inline ${isLight ? 'text-slate-300' : 'text-slate-700'}`}>|</span>
          <div className="flex items-center gap-2 sm:gap-3 font-sans">
            <button
              onClick={() => handleNavClick('/partner-portal')}
              className={`transition-colors font-medium text-[11px] flex items-center gap-1 ${
                isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-[#58C1EB] hover:text-white'
              }`}
            >
              <span>{t('telemetry.portal', 'Airline Portal')}</span>
            </button>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>·</span>
            <button
              onClick={() => handleNavClick('/find-my-bag')}
              className={`transition-colors text-[11px] ${
                isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              {t('telemetry.tracing', 'Baggage Tracing')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`fixed top-7 left-0 right-0 z-40 transition-all duration-300 ${
          isLight
            ? isScrolled
              ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md text-slate-900'
              : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-900'
            : isScrolled
              ? 'bg-[#08101E]/95 backdrop-blur-xl border-b border-[#204696]/50 shadow-xl shadow-black/50 text-white'
              : 'bg-gradient-to-b from-[#08101E]/95 via-[#08101E]/80 to-transparent backdrop-blur-md border-b border-[#204696]/20 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-2">
            {/* Zone 1: Official Aviance Brand Logo (Single responsive logo element) */}
            <button
              onClick={() => handleNavClick('/')}
              className="group flex items-center text-left focus:outline-none py-1 shrink-0 transition-transform hover:scale-[1.01]"
              aria-label="Aviance Ghana Home"
            >
              <div className="block sm:hidden">
                <AvianceLogo variant={isLight ? 'on-light' : 'on-dark'} size="sm" />
              </div>
              <div className="hidden sm:block">
                <AvianceLogo variant={isLight ? 'on-light' : 'on-dark'} size="md" />
              </div>
            </button>

            {/* Zone 2: Responsive Desktop Navigation Links */}
            <nav className={`hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 text-xs xl:text-sm font-medium shrink-0 ${
              isLight ? 'text-slate-700' : 'text-slate-200'
            }`}>
              {/* Services Mega Menu Trigger */}
              <div className="relative">
                <button
                  onClick={() => {
                    setServicesMenuOpen(!servicesMenuOpen);
                    setMoreMenuOpen(false);
                    setLanguageMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 transition-colors py-2 focus:outline-none ${
                    currentPath.startsWith('/services') ||
                    currentPath === '/passenger-services' ||
                    currentPath === '/ramp-handling' ||
                    currentPath === '/cargo' ||
                    currentPath === '/vip-charter' ||
                    currentPath === '/baggage' ||
                    currentPath === '/gse-fleet-maintenance' ||
                    currentPath === '/training'
                      ? isLight ? 'text-[#204696] font-bold' : 'text-[#58C1EB] font-bold'
                      : isLight ? 'hover:text-[#204696]' : 'hover:text-white'
                  }`}
                >
                  <span>{t('nav.services', 'Services')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesMenuOpen ? (isLight ? 'rotate-180 text-[#204696]' : 'rotate-180 text-[#58C1EB]') : (isLight ? 'text-slate-500' : 'text-slate-400')
                  }`} />
                </button>

                {/* Mega Menu Dropdown */}
                {servicesMenuOpen && (
                  <div
                    className={`absolute top-full left-0 w-[680px] xl:w-[740px] mt-2 p-5 rounded-2xl shadow-2xl grid grid-cols-2 gap-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-2xl border ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/60'
                        : 'bg-[#0A162C] border-[#204696]/60 text-slate-100 shadow-black/80'
                    }`}
                  >
                    <div className={`col-span-2 pb-3 mb-1 border-b flex items-center justify-between ${
                      isLight ? 'border-slate-200' : 'border-slate-800/80'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#58C1EB]"></span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}>
                          {t('nav.servicesTitle', 'Ground Handling & Aviation Services')}
                        </span>
                      </div>
                      <button
                        onClick={() => handleNavClick('/services')}
                        className={`text-xs font-semibold flex items-center gap-1 transition-colors group ${
                          isLight ? 'text-[#204696] hover:text-[#153170]' : 'text-[#58C1EB] hover:text-white'
                        }`}
                      >
                        {t('nav.completeDirectory', 'Complete Directory')} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                    {serviceLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPath === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl text-left border transition-all group ${
                            isActive
                              ? isLight
                                ? 'bg-blue-50/80 border-[#204696]/50'
                                : 'bg-[#204696]/30 border-[#58C1EB]/60'
                              : isLight
                                ? 'hover:bg-slate-50 border-transparent hover:border-slate-200'
                                : 'hover:bg-slate-800/70 border-transparent hover:border-[#204696]/40'
                          }`}
                        >
                          <div className={`p-2 rounded-lg transition-all shadow-sm shrink-0 ${
                            isActive
                              ? 'bg-[#204696] text-white border border-[#58C1EB]/60'
                              : isLight
                                ? 'bg-slate-100 group-hover:bg-[#204696] text-[#204696] group-hover:text-white border border-slate-200'
                                : 'bg-slate-900/90 group-hover:bg-[#204696] text-[#58C1EB] group-hover:text-white border border-slate-800 group-hover:border-[#58C1EB]/50'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className={`text-xs xl:text-sm font-semibold transition-colors truncate ${
                              isActive
                                ? 'text-[#204696]'
                                : isLight
                                  ? 'text-slate-800 group-hover:text-[#204696]'
                                  : 'text-slate-100 group-hover:text-white'
                            }`}>
                              {item.name}
                            </div>
                            <div className={`text-[11px] transition-colors truncate ${
                              isLight ? 'text-slate-500 group-hover:text-slate-700' : 'text-slate-400 group-hover:text-slate-300'
                            }`}>
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Flight Operations */}
              <button
                onClick={() => handleNavClick('/operations')}
                className={`transition-colors relative py-1 shrink-0 ${
                  currentPath === '/operations'
                    ? isLight ? 'text-[#204696] font-bold' : 'text-[#58C1EB] font-bold'
                    : isLight ? 'hover:text-[#204696]' : 'hover:text-white'
                }`}
              >
                {t('nav.flightOps', 'Flight Ops')}
                {currentPath === '/operations' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    isLight ? 'bg-[#204696]' : 'bg-[#58C1EB]'
                  }`}></span>
                )}
              </button>

              {/* Cargo Terminal */}
              <button
                onClick={() => handleNavClick('/cargo')}
                className={`transition-colors relative py-1 shrink-0 ${
                  currentPath === '/cargo'
                    ? isLight ? 'text-[#204696] font-bold' : 'text-[#58C1EB] font-bold'
                    : isLight ? 'hover:text-[#204696]' : 'hover:text-white'
                }`}
              >
                {t('nav.cargo', 'Cargo')}
                {currentPath === '/cargo' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    isLight ? 'bg-[#204696]' : 'bg-[#58C1EB]'
                  }`}></span>
                )}
              </button>

              {/* Find My Bag */}
              <button
                onClick={() => handleNavClick('/find-my-bag')}
                className={`transition-colors relative py-1 shrink-0 flex items-center gap-1.5 ${
                  currentPath === '/find-my-bag'
                    ? isLight ? 'text-[#204696] font-bold' : 'text-[#58C1EB] font-bold'
                    : isLight ? 'hover:text-[#204696]' : 'hover:text-white'
                }`}
              >
                <span>{t('nav.findMyBag', 'Find My Bag')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#58C1EB] animate-pulse"></span>
                {currentPath === '/find-my-bag' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    isLight ? 'bg-[#204696]' : 'bg-[#58C1EB]'
                  }`}></span>
                )}
              </button>

              {/* Visible on XL+ screens */}
              <button
                onClick={() => handleNavClick('/lounge')}
                className={`hidden xl:inline-block transition-colors relative py-1 shrink-0 ${
                  currentPath === '/lounge'
                    ? isLight ? 'text-[#204696] font-bold' : 'text-[#58C1EB] font-bold'
                    : isLight ? 'hover:text-[#204696]' : 'hover:text-white'
                }`}
              >
                {t('nav.lounge', 'Adinkra Lounge')}
                {currentPath === '/lounge' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    isLight ? 'bg-[#204696]' : 'bg-[#58C1EB]'
                  }`}></span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('/certifications')}
                className={`hidden xl:inline-block transition-colors relative py-1 shrink-0 ${
                  currentPath === '/certifications'
                    ? isLight ? 'text-[#204696] font-bold' : 'text-[#58C1EB] font-bold'
                    : isLight ? 'hover:text-[#204696]' : 'hover:text-white'
                }`}
              >
                {t('nav.safety', 'Safety & Standards')}
                {currentPath === '/certifications' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    isLight ? 'bg-[#204696]' : 'bg-[#58C1EB]'
                  }`}></span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('/careers')}
                className={`hidden xl:inline-block transition-colors relative py-1 shrink-0 ${
                  currentPath === '/careers'
                    ? isLight ? 'text-[#204696] font-bold' : 'text-[#58C1EB] font-bold'
                    : isLight ? 'hover:text-[#204696]' : 'hover:text-white'
                }`}
              >
                {t('nav.careers', 'Careers')}
                {currentPath === '/careers' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                    isLight ? 'bg-[#204696]' : 'bg-[#58C1EB]'
                  }`}></span>
                )}
              </button>

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setMoreMenuOpen(!moreMenuOpen);
                    setServicesMenuOpen(false);
                    setLanguageMenuOpen(false);
                  }}
                  className={`flex items-center gap-1 transition-colors py-2 focus:outline-none ${
                    currentPath === '/management' ||
                    currentPath === '/about' ||
                    currentPath === '/documents' ||
                    currentPath === '/faqs' ||
                    currentPath === '/news'
                      ? isLight ? 'text-[#204696] font-bold' : 'text-[#58C1EB] font-bold'
                      : isLight ? 'hover:text-[#204696]' : 'hover:text-white'
                  }`}
                >
                  <span>{t('nav.more', 'More')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreMenuOpen ? (isLight ? 'rotate-180 text-[#204696]' : 'rotate-180 text-[#58C1EB]') : (isLight ? 'text-slate-500' : 'text-slate-400')
                  }`} />
                </button>

                {moreMenuOpen && (
                  <div
                    className={`absolute top-full right-0 w-72 mt-2 p-2.5 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-2xl space-y-1 border ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/60'
                        : 'bg-[#0A162C] border-[#204696]/60 text-slate-100 shadow-black/80'
                    }`}
                  >
                    {moreLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all group ${
                            currentPath === item.path
                              ? isLight
                                ? 'bg-blue-50 text-[#204696] font-semibold'
                                : 'bg-[#204696]/30 text-[#58C1EB]'
                              : isLight
                                ? 'text-slate-700 hover:bg-slate-50 hover:text-[#204696]'
                                : 'text-slate-200 hover:bg-slate-800/70 hover:text-white'
                          } ${item.desktopOnlyAtLg ? 'xl:hidden' : ''}`}
                        >
                          <div className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                            isLight
                              ? 'bg-slate-100 border-slate-200 group-hover:border-[#204696]/40 group-hover:bg-[#204696] text-[#204696] group-hover:text-white'
                              : 'bg-slate-900 border-slate-800 group-hover:border-[#58C1EB]/40 group-hover:bg-[#204696] text-[#58C1EB] group-hover:text-white'
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold transition-colors truncate">
                              {item.name}
                            </div>
                            <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: Modern Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher Dropdown (EN / TW / FR) */}
              <div className="relative">
                <button
                  onClick={() => {
                    setLanguageMenuOpen(!languageMenuOpen);
                    setServicesMenuOpen(false);
                    setMoreMenuOpen(false);
                  }}
                  aria-label="Change language (English, Twi, Français)"
                  aria-expanded={languageMenuOpen}
                  title={`Language: ${currentLanguageOption.label}. Click to switch between English, Twi, and French.`}
                  className={`h-9 px-2 sm:px-2.5 rounded-xl border transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-xs font-semibold select-none group focus:outline-none focus:ring-2 shrink-0 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 focus:ring-[#204696]/30'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-800 hover:border-[#58C1EB]/40 focus:ring-[#58C1EB]/40'
                  }`}
                >
                  <span className="text-sm leading-none" role="img" aria-hidden="true">
                    {currentLanguageOption.flag}
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                    {currentLanguageOption.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      languageMenuOpen ? 'rotate-180' : ''
                    } ${isLight ? 'text-slate-500' : 'text-slate-400'}`}
                  />
                </button>

                {/* Language Dropdown Menu */}
                {languageMenuOpen && (
                  <div
                    className={`absolute top-full right-0 w-48 mt-2 p-1.5 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-2xl border ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/60'
                        : 'bg-[#0A162C] border-[#204696]/60 text-slate-100 shadow-black/80'
                    }`}
                    role="menu"
                  >
                    <div className={`px-2.5 py-1.5 text-[10px] font-mono uppercase font-bold tracking-wider border-b mb-1 flex items-center gap-1.5 ${
                      isLight ? 'text-slate-500 border-slate-200' : 'text-slate-400 border-slate-800'
                    }`}>
                      <Globe className="w-3 h-3 text-[#204696]" />
                      <span>{t('common.switchLanguage', 'Select Language')}</span>
                    </div>
                    {languages.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          role="menuitem"
                          onClick={() => {
                            setLanguage(lang.code);
                            setLanguageMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                            isSelected
                              ? isLight
                                ? 'bg-blue-50 text-[#204696] font-bold'
                                : 'bg-[#204696]/30 text-[#58C1EB] font-bold'
                              : isLight
                                ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{lang.flag}</span>
                            <div>
                              <div className="font-semibold text-xs leading-tight">{lang.nativeLabel}</div>
                              <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{lang.label}</div>
                            </div>
                          </div>
                          {isSelected && <Check className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={isLight ? 'Switch to Deep Navy Theme' : 'Switch to Operational Light Mode'}
                title={isLight ? 'Light theme active — Switch to Navy' : 'Navy theme active — Switch to Light'}
                className={`w-9 h-9 sm:w-auto sm:px-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 text-xs font-semibold select-none group focus:outline-none focus:ring-2 shrink-0 ${
                  isLight
                    ? 'bg-amber-50 hover:bg-amber-100/80 text-amber-950 border-amber-300 focus:ring-amber-400/50 shadow-xs'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-800 hover:border-[#58C1EB]/40 focus:ring-[#58C1EB]/40'
                }`}
              >
                {isLight ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-600 animate-[spin_12s_linear_infinite]" />
                    <span className="hidden xl:inline text-[10px] font-mono tracking-tight text-amber-900 uppercase font-bold">
                      {t('nav.themeLight', 'Light')}
                    </span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#58C1EB]" />
                    <span className="hidden xl:inline text-[10px] font-mono tracking-tight text-[#58C1EB] uppercase font-bold">
                      {t('nav.themeNavy', 'Navy')}
                    </span>
                  </>
                )}
              </button>

              {/* Command Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label={t('nav.search', 'Search platform')}
                className={`w-9 h-9 sm:w-auto sm:px-2.5 border rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs shrink-0 ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-[#58C1EB]/40'
                }`}
              >
                <Search className={`w-4 h-4 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <span className={`hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                  isLight ? 'bg-white text-slate-600 border-slate-300' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}>
                  ⌘K
                </span>
              </button>

              {/* Primary Call-to-Action */}
              <button
                onClick={() => handleNavClick('/contact')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-white bg-gradient-to-r from-[#204696] to-[#18397a] hover:from-[#2653b3] hover:to-[#204696] border border-[#58C1EB]/50 rounded-xl transition-all shadow-md shadow-[#204696]/40 hover:shadow-lg hover:shadow-[#204696]/60 hover:border-[#58C1EB] shrink-0"
              >
                <span>{t('nav.requestHandling', 'Request Handling')}</span>
                <ArrowRight className="w-3 h-3 text-[#58C1EB]" />
              </button>

              {/* Admin Portal Button */}
              <button
                onClick={() => handleNavClick('/admin')}
                className={`hidden sm:inline-flex text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl border transition-colors shrink-0 ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
                title="Management Portal & CMS"
              >
                {t('nav.admin', 'Admin')}
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden w-9 h-9 rounded-xl border transition-colors shrink-0 flex items-center justify-center ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-800'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl backdrop-blur-xl ${
            isLight
              ? 'bg-white/98 border-slate-200 text-slate-900'
              : 'bg-[#08101E] border-[#204696]/40 text-white'
          }`}>
            {/* Language Switcher in Mobile Drawer */}
            <div className={`p-3 rounded-2xl border transition-all ${
              isLight
                ? 'bg-slate-50 border-slate-200 shadow-xs'
                : 'bg-[#0A162C] border-[#204696]/40'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Globe className={`w-4 h-4 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                  <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {t('common.switchLanguage', 'Language / Kasa / Langue')}
                  </span>
                </div>
                <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                  isLight ? 'bg-white text-slate-600 border-slate-300' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}>
                  {currentLanguageOption.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {languages.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`py-2 px-1.5 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-0.5 transition-all border ${
                        isSelected
                          ? isLight
                            ? 'bg-[#204696] text-white border-[#204696] shadow-xs'
                            : 'bg-gradient-to-r from-[#204696] to-[#18397a] text-white border-[#58C1EB]/60 shadow-xs'
                          : isLight
                            ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                            : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-[#58C1EB]/30 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-[11px] font-bold">{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Toggle in Mobile Drawer */}
            <div className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
              isLight
                ? 'bg-slate-50 border-slate-200 shadow-xs'
                : 'bg-[#0A162C] border-[#204696]/40'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${
                  isLight ? 'bg-amber-100 text-amber-700' : 'bg-[#204696]/30 text-[#58C1EB]'
                }`}>
                  {isLight ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-[#58C1EB]" />}
                </div>
                <div>
                  <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {isLight ? 'Operational Light Mode' : 'Deep Navy Mode'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {isLight ? 'High-contrast dispatch theme' : 'Official midnight theme'}
                  </div>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isLight
                    ? 'bg-[#204696] text-white hover:bg-[#18397a]'
                    : 'bg-gradient-to-r from-[#204696] to-[#18397a] text-white hover:from-[#2653b3] hover:to-[#204696] border border-[#58C1EB]/40'
                }`}
              >
                {isLight ? 'Navy' : 'Light'}
              </button>
            </div>

            {/* Quick Actions in mobile drawer */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleNavClick('/partner-portal')}
                className={`p-2.5 rounded-xl border text-left ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-[#204696]/40'
                    : 'bg-[#0A162C] border-[#204696]/40 hover:border-[#58C1EB]/50'
                }`}
              >
                <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>AIRLINE</div>
                <div className={`text-xs font-bold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
                  {t('telemetry.portal', 'Airline Portal')} →
                </div>
              </button>
              <button
                onClick={() => handleNavClick('/find-my-bag')}
                className={`p-2.5 rounded-xl border text-left ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-[#204696]/40'
                    : 'bg-[#0A162C] border-[#204696]/40 hover:border-[#58C1EB]/50'
                }`}
              >
                <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>TELEMETRY</div>
                <div className={`text-xs font-bold flex items-center gap-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {t('telemetry.tracing', 'Baggage Tracing')}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44]"></span>
                </div>
              </button>
            </div>

            {/* Section: Ground Handling Services */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#58C1EB] font-bold px-3 py-1 flex items-center justify-between">
                <span>{t('nav.services', 'Ground Services')}</span>
                <button
                  onClick={() => handleNavClick('/services')}
                  className="text-[10px] underline hover:text-[#204696]"
                >
                  {t('nav.completeDirectory', 'View Directory')}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                {serviceLinks.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.path}
                      onClick={() => handleNavClick(service.path)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                        isLight
                          ? 'text-slate-700 hover:text-[#204696] hover:bg-slate-100'
                          : 'text-slate-200 hover:text-white hover:bg-slate-800/70'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                      <span className="truncate">{service.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section: Flight Operations & Facilities */}
            <div>
              <div className={`text-[11px] font-mono uppercase tracking-wider font-bold px-3 py-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {t('drawer.operationsHubs', 'Operations & Hubs')}
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <button
                  onClick={() => handleNavClick('/operations')}
                  className={`text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                    isLight ? 'text-slate-700 hover:text-[#204696] hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  {t('services.occ.title', 'Flight Operations & OCC')} (Accra · Kumasi · Tamale)
                </button>
                <button
                  onClick={() => handleNavClick('/cargo')}
                  className={`text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                    isLight ? 'text-slate-700 hover:text-[#204696] hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  {t('services.cargo.title', 'Cargo Terminal')} (EU RA3 Cold Chain)
                </button>
                <button
                  onClick={() => handleNavClick('/lounge')}
                  className={`text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                    isLight ? 'text-slate-700 hover:text-[#204696] hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  {t('services.lounge.title', 'Adinkra Executive Lounge')} (Terminal 3)
                </button>
                <button
                  onClick={() => handleNavClick('/certifications')}
                  className={`text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                    isLight ? 'text-slate-700 hover:text-[#204696] hover:bg-slate-100' : 'text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  {t('nav.safety', 'Safety, Quality & ISAGO Certifications')}
                </button>
              </div>
            </div>

            {/* Section: Corporate & Support */}
            <div>
              <div className={`text-[11px] font-mono uppercase tracking-wider font-bold px-3 py-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {t('drawer.companyResources', 'Company & Resources')}
              </div>
              <div className={`grid grid-cols-2 gap-1 mt-1 text-xs ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                <button onClick={() => handleNavClick('/about')} className={`text-left px-3 py-2 rounded-xl transition-colors ${isLight ? 'hover:text-[#204696] hover:bg-slate-100' : 'hover:bg-slate-800/70'}`}>{t('nav.about', 'About Us')}</button>
                <button onClick={() => handleNavClick('/management')} className={`text-left px-3 py-2 rounded-xl transition-colors ${isLight ? 'hover:text-[#204696] hover:bg-slate-100' : 'hover:bg-slate-800/70'}`}>{t('nav.management', 'Leadership')}</button>
                <button onClick={() => handleNavClick('/careers')} className={`text-left px-3 py-2 rounded-xl transition-colors ${isLight ? 'hover:text-[#204696] hover:bg-slate-100' : 'hover:bg-slate-800/70'}`}>{t('nav.careers', 'Careers')}</button>
                <button onClick={() => handleNavClick('/documents')} className={`text-left px-3 py-2 rounded-xl transition-colors ${isLight ? 'hover:text-[#204696] hover:bg-slate-100' : 'hover:bg-slate-800/70'}`}>{t('nav.documents', 'Documents')}</button>
                <button onClick={() => handleNavClick('/news')} className={`text-left px-3 py-2 rounded-xl transition-colors ${isLight ? 'hover:text-[#204696] hover:bg-slate-100' : 'hover:bg-slate-800/70'}`}>{t('drawer.allNews', 'News')}</button>
                <button onClick={() => handleNavClick('/faqs')} className={`text-left px-3 py-2 rounded-xl transition-colors ${isLight ? 'hover:text-[#204696] hover:bg-slate-100' : 'hover:bg-slate-800/70'}`}>{t('nav.faqs', 'FAQs')}</button>
                <button onClick={() => handleNavClick('/admin')} className={`text-left px-3 py-2 rounded-xl transition-colors font-semibold col-span-2 border ${isLight ? 'text-[#204696] bg-blue-50/80 border-[#204696]/20 hover:bg-blue-100/60' : 'text-[#58C1EB] bg-[#204696]/20 border-[#204696]/40 hover:bg-[#204696]/40'}`}>{t('nav.admin', 'Admin Portal & CMS')} 🔐</button>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#204696] to-[#18397a] hover:from-[#2653b3] hover:to-[#204696] text-white font-bold text-xs border border-[#58C1EB]/50 shadow-lg shadow-[#204696]/40 flex items-center justify-center gap-2"
              >
                <span>{t('nav.requestHandling', 'Request Handling')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#58C1EB]" />
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};



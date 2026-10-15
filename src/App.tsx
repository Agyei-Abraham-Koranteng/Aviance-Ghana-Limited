import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { SearchModal } from './components/ui/SearchModal';
import { CargoEnquiryModal } from './components/public/CargoEnquiryModal';
import { VipEnquiryModal } from './components/public/VipEnquiryModal';
import { GeminiChatbot } from './components/public/GeminiChatbot';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { ServicesIndexPage } from './pages/public/ServicesIndexPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { OperationsPage } from './pages/public/OperationsPage';
import { CargoPage } from './pages/public/CargoPage';
import { FindMyBagPage } from './pages/public/FindMyBagPage';
import { VipLoungePage } from './pages/public/VipLoungePage';
import { AboutPage } from './pages/public/AboutPage';
import { ManagementPage } from './pages/public/ManagementPage';
import { CertificationsPage } from './pages/public/CertificationsPage';
import { CareersPage } from './pages/public/CareersPage';
import { NewsIndexPage } from './pages/public/NewsIndexPage';
import { NewsDetailPage } from './pages/public/NewsDetailPage';
import { ContactPage } from './pages/public/ContactPage';
import { LegalPages } from './pages/public/LegalPages';
import { ManagementPresentationPage } from './pages/public/ManagementPresentationPage';
import { PartnerPortalPage } from './pages/public/PartnerPortalPage';
import { DocumentCentrePage } from './pages/public/DocumentCentrePage';
import { FaqPage } from './pages/public/FaqPage';

// Admin layout & pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminNewsPage } from './pages/admin/AdminNewsPage';
import { AdminCareersPage } from './pages/admin/AdminCareersPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminBaggagePage } from './pages/admin/AdminBaggagePage';
import { AdminCertificationsPage } from './pages/admin/AdminCertificationsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminTeamPage } from './pages/admin/AdminTeamPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminAuditLogPage } from './pages/admin/AdminAuditLogPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminDatabaseSchemaPage } from './pages/admin/AdminDatabaseSchemaPage';
import { TechnicalArchitectureVisual } from './components/admin/TechnicalArchitectureVisual';

import { dataService, subscribeToDataChanges } from './services/dataService';
import { analyticsService } from './services/analyticsService';
import { Service, LocationItem, Certification, NewsArticle, CustomerPartner } from './types';

function MainApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cargoModalOpen, setCargoModalOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);

  // Reactive state synced with dataService
  const [services, setServices] = useState<Service[]>(() => dataService.getServices());
  const [locations, setLocations] = useState<LocationItem[]>(() => dataService.getLocations());
  const [certifications, setCertifications] = useState<Certification[]>(() => dataService.getCertifications());
  const [news, setNews] = useState<NewsArticle[]>(() => dataService.getNews());
  const [customers, setCustomers] = useState<CustomerPartner[]>(() => dataService.getCustomers());
  const [team, setTeam] = useState(() => dataService.getTeam());
  const [vacancies, setVacancies] = useState(() => dataService.getVacancies());

  useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      setServices(dataService.getServices());
      setLocations(dataService.getLocations());
      setCertifications(dataService.getCertifications());
      setNews(dataService.getNews());
      setCustomers(dataService.getCustomers());
      setTeam(dataService.getTeam());
      setVacancies(dataService.getVacancies());
    });
    return unsubscribe;
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    analyticsService.trackEvent('page_view', path);
  };

  // Keyboard shortcut Cmd/Ctrl + K for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine view
  const isAdminView = currentPath.startsWith('/admin');

  // Handle service alias routes like /passenger-services or /services/:slug
  let activeService: Service | undefined;
  if (currentPath === '/passenger-services') {
    activeService = services.find((s) => s.slug === 'passenger-services') || services[0];
  } else if (currentPath === '/ramp-handling') {
    activeService = services.find((s) => s.slug === 'ramp-handling') || services[1];
  } else if (currentPath === '/gse-fleet-maintenance') {
    activeService = services.find((s) => s.slug === 'gse-fleet-maintenance') || services[6];
  } else if (currentPath === '/training') {
    activeService = services.find((s) => s.slug === 'training') || services[7];
  } else if (currentPath === '/information-technology') {
    activeService = services.find((s) => s.slug === 'information-technology') || services[8];
  } else if (currentPath === '/quality-safety-health') {
    activeService = services.find((s) => s.slug === 'quality-safety-health') || services[9];
  } else if (currentPath.startsWith('/services/')) {
    const slug = currentPath.replace('/services/', '');
    activeService = services.find((s) => s.slug === slug);
  }

  // Handle news detail routes
  let activeArticle: NewsArticle | undefined;
  if (currentPath.startsWith('/news/')) {
    const slug = currentPath.replace('/news/', '');
    activeArticle = news.find((n) => n.slug === slug);
  }

  if (isAdminView) {
    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        onNavigatePublic={() => navigate('/')}
      >
        {adminTab === 'dashboard' && <AdminDashboardPage onSelectTab={setAdminTab} />}
        {adminTab === 'analytics' && <AdminAnalyticsPage />}
        {adminTab === 'reports' && <AdminReportsPage />}
        {adminTab === 'services' && <AdminServicesPage />}
        {adminTab === 'news' && <AdminNewsPage />}
        {adminTab === 'certifications' && <AdminCertificationsPage />}
        {adminTab === 'team' && <AdminTeamPage />}
        {adminTab === 'customers' && <AdminCustomersPage />}
        {adminTab === 'media' && <AdminMediaPage />}
        {adminTab === 'baggage' && <AdminBaggagePage />}
        {adminTab === 'enquiries' && <AdminEnquiriesPage />}
        {adminTab === 'careers' && <AdminCareersPage />}
        {adminTab === 'applications' && <AdminApplicationsPage />}
        {adminTab === 'audit_logs' && <AdminAuditLogPage />}
        {adminTab === 'database' && <AdminDatabaseSchemaPage />}
        {adminTab === 'architecture' && <TechnicalArchitectureVisual />}
        {adminTab === 'settings' && <AdminSettingsPage />}
      </AdminLayout>
    );
  }

  const { isLight } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#204696] selection:text-white transition-colors duration-200 ${
      isLight
        ? 'bg-[#F8FAFC] text-slate-900'
        : 'bg-[#08101E] bg-[radial-gradient(ellipse_120%_80%_at_50%_-15%,rgba(32,70,150,0.35),rgba(8,16,30,0))] text-slate-100'
    }`}>
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main View Body */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage
            services={services}
            locations={locations}
            certifications={certifications}
            news={news}
            customers={customers}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
            onOpenVipModal={() => setVipModalOpen(true)}
          />
        )}

        {currentPath === '/services' && (
          <ServicesIndexPage
            services={services}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
            onOpenVipModal={() => setVipModalOpen(true)}
          />
        )}

        {activeService && (
          <ServiceDetailPage
            service={activeService}
            allServices={services}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
            onOpenVipModal={() => setVipModalOpen(true)}
          />
        )}

        {currentPath === '/operations' && (
          <OperationsPage
            locations={locations}
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/cargo' && (
          <CargoPage
            onNavigate={navigate}
            onOpenCargoModal={() => setCargoModalOpen(true)}
          />
        )}

        {currentPath === '/find-my-bag' && (
          <FindMyBagPage onNavigate={navigate} />
        )}

        {(currentPath === '/lounge' || currentPath === '/vip-charter') && (
          <VipLoungePage
            onNavigate={navigate}
            onOpenVipModal={() => setVipModalOpen(true)}
          />
        )}

        {currentPath === '/baggage' && (
          <FindMyBagPage onNavigate={navigate} />
        )}

        {currentPath === '/about' && (
          <AboutPage onNavigate={navigate} />
        )}

        {currentPath === '/management' && (
          <ManagementPage team={team} onNavigate={navigate} />
        )}

        {currentPath === '/certifications' && (
          <CertificationsPage certifications={certifications} onNavigate={navigate} />
        )}

        {currentPath === '/careers' && (
          <CareersPage vacancies={vacancies} onNavigate={navigate} />
        )}

        {currentPath === '/news' && (
          <NewsIndexPage news={news} onNavigate={navigate} />
        )}

        {activeArticle && (
          <NewsDetailPage article={activeArticle} allNews={news} onNavigate={navigate} />
        )}

        {currentPath === '/contact' && (
          <ContactPage onNavigate={navigate} />
        )}

        {currentPath === '/presentation' && (
          <ManagementPresentationPage
            onNavigate={navigate}
            onOpenAdminTab={(tab) => {
              setAdminTab(tab);
              navigate('/admin');
            }}
          />
        )}

        {currentPath === '/partner-portal' && (
          <PartnerPortalPage onNavigate={navigate} />
        )}

        {currentPath === '/documents' && (
          <DocumentCentrePage onNavigate={navigate} />
        )}

        {currentPath === '/faqs' && (
          <FaqPage onNavigate={navigate} />
        )}

        {currentPath === '/code-of-conduct' && (
          <LegalPages type="conduct" onNavigate={navigate} />
        )}

        {currentPath === '/privacy-policy' && (
          <LegalPages type="privacy" onNavigate={navigate} />
        )}

        {currentPath === '/terms' && (
          <LegalPages type="terms" onNavigate={navigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Floating Gemini Chatbot Interface */}
      <GeminiChatbot />

      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigate}
      />

      <CargoEnquiryModal
        isOpen={cargoModalOpen}
        onClose={() => setCargoModalOpen(false)}
      />

      <VipEnquiryModal
        isOpen={vipModalOpen}
        onClose={() => setVipModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <ToastProvider>
              <MainApp />
            </ToastProvider>
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

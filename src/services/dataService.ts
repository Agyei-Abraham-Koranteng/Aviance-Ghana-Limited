import {
  Service,
  LocationItem,
  Certification,
  NewsArticle,
  ContentRevision,
  ContentStatus,
  Vacancy,
  Application,
  Enquiry,
  BaggageRecord,
  TeamMember,
  CustomerPartner,
  AuditLog,
  NotificationItem,
  SiteSettings,
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_LOCATIONS,
  INITIAL_CERTIFICATIONS,
  INITIAL_NEWS,
  INITIAL_VACANCIES,
  INITIAL_BAGGAGE,
  INITIAL_TEAM,
  INITIAL_CUSTOMERS,
  INITIAL_SETTINGS,
} from '../constants/avianceData';

const STORAGE_KEYS = {
  SERVICES: 'aviance_services',
  LOCATIONS: 'aviance_locations',
  CERTIFICATIONS: 'aviance_certifications',
  NEWS: 'aviance_news',
  VACANCIES: 'aviance_vacancies',
  APPLICATIONS: 'aviance_applications',
  ENQUIRIES: 'aviance_enquiries',
  BAGGAGE: 'aviance_baggage',
  TEAM: 'aviance_team',
  CUSTOMERS: 'aviance_customers',
  AUDIT_LOGS: 'aviance_audit_logs',
  NOTIFICATIONS: 'aviance_notifications',
  SETTINGS: 'aviance_settings',
};

// Event listener mechanism for reactive updates
type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const subscribeToDataChanges = (callback: Listener) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

const notifySubscribers = () => {
  listeners.forEach((callback) => {
    try {
      callback();
    } catch (e) {
      console.error('Error in subscriber callback:', e);
    }
  });
};

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifySubscribers();
  } catch (e) {
    console.error(`Error saving ${key}:`, e);
  }
}

// Initial default seed applications and enquiries for rich demonstration
const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    vacancyId: 'vac-1',
    jobTitle: 'Ramp Safety & Turnaround Supervisor',
    applicantName: 'Emmanuel Kwesi Appiah',
    email: 'emmanuel.appiah@example.com',
    phone: '+233 24 555 0192',
    ghanaDigitalAddress: 'GA-182-9901',
    coverLetter: 'I have 4 years of proven supervisory experience at Kotoka Terminal 3 managing turnaround pushback operations with zero incidents.',
    resumeFileName: 'Emmanuel_Appiah_CV_2026.pdf',
    status: 'Shortlisted',
    internalNotes: 'Excellent GCAA airside record; invite for technical interview next Tuesday.',
    createdAt: '2026-02-14T09:30:00Z'
  },
  {
    id: 'app-2',
    vacancyId: 'vac-3',
    jobTitle: 'Passenger Services Agent (Bilingual Preferred)',
    applicantName: 'Selina Adobea Mensah',
    email: 'selina.mensah@example.com',
    phone: '+233 20 892 1102',
    ghanaDigitalAddress: 'GA-044-3321',
    coverLetter: 'Fluent in English and French (DALF C1 certified) with 2 years customer handling experience.',
    resumeFileName: 'Selina_Mensah_Resume.pdf',
    status: 'Interview',
    internalNotes: 'Passed language assessment with high score. Scheduling panel interview.',
    createdAt: '2026-02-18T14:15:00Z'
  }
];

const DEFAULT_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    referenceNo: 'AV-26-0891',
    category: 'Cargo',
    senderName: 'Kofi Owusu',
    email: 'k.owusu@ghanafruits.com.gh',
    phone: '+233 24 112 3456',
    organization: 'Ghana Horticultural Exporters Ltd',
    subject: 'Perishable cold room reservation for fresh papaya export to Brussels',
    message: 'We are scheduling a weekly export of 12 tons of fresh papaya starting next month. Please provide cold chain handling rates and pallet build-up specifications for EU RA3 compliance.',
    status: 'In Progress',
    priority: 'High',
    resolutionNotes: 'Cargo team reached out with tariff schedule; awaiting airline booking confirmation.',
    createdAt: '2026-10-06T10:00:00Z',
    updatedAt: '2026-10-06T11:20:00Z'
  },
  {
    id: 'enq-2',
    referenceNo: 'AV-26-0892',
    category: 'VIP',
    senderName: 'Lady Vivian Ashford',
    email: 'protocol@ashford-holdings.co.uk',
    phone: '+44 20 7946 0991',
    organization: 'Ashford Global Aviation',
    subject: 'Private Jet Ground Handling Request (Gulfstream G650ER) at Kotoka T3',
    message: 'Requesting apron tarmac handling, presidential terminal liaison, refuel coordination, and VIP Mercedes transfers for 6 diplomatic delegates arriving this Friday.',
    status: 'Waiting for Customer',
    priority: 'Urgent',
    resolutionNotes: 'VIP protocol officer assigned. Landing permit liaison completed with GCAA.',
    createdAt: '2026-10-06T13:45:00Z',
    updatedAt: '2026-10-06T14:10:00Z'
  },
  {
    id: 'enq-3',
    referenceNo: 'AV-26-0893',
    category: 'General',
    senderName: 'Francisca Arthur',
    email: 'francisca.a@gmail.com',
    phone: '+233 55 901 2234',
    organization: 'Individual Passenger',
    subject: 'Adinkra Lounge walk-in access pricing for Terminal 3',
    message: 'Can passengers flying economy on commercial flights purchase walk-in day passes to the Adinkra Lounge at Kotoka Terminal 3?',
    status: 'New',
    priority: 'Medium',
    createdAt: '2026-10-06T15:20:00Z',
    updatedAt: '2026-10-06T15:20:00Z'
  }
];

const DEFAULT_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    userEmail: 'admin@avianceghana.com',
    action: 'Renewed Certification',
    module: 'Certifications',
    recordId: 'cert-1',
    details: 'Verified ISAGO 2026/2027 audit renewal record',
    createdAt: '2026-10-06T08:15:00Z'
  },
  {
    id: 'log-2',
    userEmail: 'hr@avianceghana.com',
    action: 'Updated Application Status',
    module: 'Recruitment',
    recordId: 'app-2',
    details: 'Changed Selina Adobea Mensah status to "Interview"',
    createdAt: '2026-10-06T11:45:00Z'
  }
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New VIP Handling Request',
    message: 'Ashford Global Aviation submitted request for Gulfstream G650ER handling.',
    type: 'enquiry',
    isRead: false,
    link: '/admin/enquiries',
    createdAt: '2026-10-06T13:45:00Z'
  },
  {
    id: 'notif-2',
    title: 'Certification Expiry Warning',
    message: 'ISO 9001:2015 Quality Management certification expires in under 30 days.',
    type: 'certification',
    isRead: false,
    link: '/admin/certifications',
    createdAt: '2026-10-06T09:00:00Z'
  },
  {
    id: 'notif-3',
    title: 'New Career Application',
    message: 'Selina Adobea Mensah applied for Passenger Services Agent.',
    type: 'application',
    isRead: true,
    link: '/admin/applications',
    createdAt: '2026-10-06T07:30:00Z'
  }
];

export const dataService = {
  // Services
  getServices: (): Service[] => {
    return getStored<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },
  getServiceBySlug: (slug: string): Service | undefined => {
    const services = dataService.getServices();
    return services.find((s) => s.slug === slug);
  },
  saveService: (service: Partial<Service> & { title: string; category: Service['category'] }): Service => {
    const services = dataService.getServices();
    const now = new Date().toISOString();
    let updatedService: Service;

    if (service.id) {
      const index = services.findIndex((s) => s.id === service.id);
      if (index !== -1) {
        updatedService = {
          ...services[index],
          ...service,
          updatedAt: now,
        } as Service;
        services[index] = updatedService;
      } else {
        throw new Error('Service not found');
      }
    } else {
      const slug = (service.slug || service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      updatedService = {
        id: `srv-${Date.now()}`,
        slug,
        shortDescription: service.shortDescription || '',
        fullDescription: service.fullDescription || '',
        heroImage: service.heroImage || '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
        icon: service.icon || 'Plane',
        locations: service.locations || ['Accra (Kotoka T3)'],
        features: service.features || [],
        operatingHours: service.operatingHours || '24/7 Operations',
        contactEmail: service.contactEmail || 'info@avianceghana.com',
        contactPhone: service.contactPhone || '+233 (0)302 778 025',
        isPublished: service.isPublished ?? true,
        displayOrder: service.displayOrder || services.length + 1,
        createdAt: now,
        updatedAt: now,
        ...service,
      } as Service;
      services.push(updatedService);
    }

    setStored(STORAGE_KEYS.SERVICES, services);
    dataService.logAudit('admin@avianceghana.com', service.id ? 'Updated Service' : 'Created Service', 'Services', updatedService.id, updatedService.title);
    return updatedService;
  },
  deleteService: (id: string): void => {
    const services = dataService.getServices().filter((s) => s.id !== id);
    setStored(STORAGE_KEYS.SERVICES, services);
    dataService.logAudit('admin@avianceghana.com', 'Deleted Service', 'Services', id, `Removed service ID: ${id}`);
  },

  // Locations
  getLocations: (): LocationItem[] => {
    return getStored<LocationItem[]>(STORAGE_KEYS.LOCATIONS, INITIAL_LOCATIONS);
  },

  // Certifications
  getCertifications: (): Certification[] => {
    return getStored<Certification[]>(STORAGE_KEYS.CERTIFICATIONS, INITIAL_CERTIFICATIONS);
  },
  saveCertification: (cert: Partial<Certification> & { name: string; issuer: string }): Certification => {
    const list = dataService.getCertifications();
    let saved: Certification;
    if (cert.id) {
      const idx = list.findIndex((c) => c.id === cert.id);
      saved = { ...list[idx], ...cert } as Certification;
      list[idx] = saved;
    } else {
      saved = {
        id: `cert-${Date.now()}`,
        certificateNumber: cert.certificateNumber || 'GH-CERT-' + Math.floor(1000 + Math.random() * 9000),
        issueDate: cert.issueDate || new Date().toISOString().split('T')[0],
        expiryDate: cert.expiryDate || new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
        status: cert.status || 'active',
        category: cert.category || 'Operations',
        description: cert.description || '',
        displayOrder: list.length + 1,
        ...cert,
      } as Certification;
      list.push(saved);
    }
    setStored(STORAGE_KEYS.CERTIFICATIONS, list);
    dataService.logAudit('admin@avianceghana.com', cert.id ? 'Updated Certification' : 'Added Certification', 'Certifications', saved.id, saved.name);
    return saved;
  },
  deleteCertification: (id: string): void => {
    const list = dataService.getCertifications().filter((c) => c.id !== id);
    setStored(STORAGE_KEYS.CERTIFICATIONS, list);
  },

  // News
  getNews: (): NewsArticle[] => {
    return getStored<NewsArticle[]>(STORAGE_KEYS.NEWS, INITIAL_NEWS);
  },
  getNewsBySlug: (slug: string): NewsArticle | undefined => {
    return dataService.getNews().find((n) => n.slug === slug);
  },
  saveNews: (
    article: Partial<NewsArticle> & { title: string; content: string },
    changeSummary: string = 'Editorial update'
  ): NewsArticle => {
    const articles = dataService.getNews();
    const now = new Date().toISOString();
    let saved: NewsArticle;

    if (article.id) {
      const idx = articles.findIndex((n) => n.id === article.id);
      if (idx !== -1) {
        const existing = articles[idx];
        const oldVersion = existing.version || 1;
        const newVersion = oldVersion + 1;

        // Snapshot previous state as a revision
        const previousRevision: ContentRevision = {
          id: `rev-${Date.now()}-${oldVersion}`,
          contentId: existing.id,
          version: oldVersion,
          status: existing.status || 'Published',
          title: existing.title,
          content: existing.content,
          excerpt: existing.excerpt,
          authorName: existing.authorName,
          authorEmail: existing.authorEmail || 'comms@avianceghana.com',
          reviewerEmail: existing.reviewerEmail,
          approverEmail: existing.approverEmail,
          changeSummary,
          createdAt: existing.updatedAt || existing.createdAt || now,
        };

        const existingRevisions = existing.revisions || [];

        saved = {
          ...existing,
          ...article,
          version: newVersion,
          revisions: [previousRevision, ...existingRevisions],
          updatedAt: now,
          isPublished: article.status === 'Published',
        } as NewsArticle;

        if (article.status === 'Published' && !saved.publishedAt) {
          saved.publishedAt = now;
        }

        articles[idx] = saved;
      } else {
        throw new Error('Article not found');
      }
    } else {
      const slug =
        article.slug ||
        article.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      const initialStatus: ContentStatus = article.status || 'Draft';

      saved = {
        id: `news-${Date.now()}`,
        slug,
        category: article.category || 'Company News',
        excerpt: article.excerpt || article.content.substring(0, 160) + '...',
        featuredImage:
          article.featuredImage || '/src/assets/images/ramp_ground_operations_1791329987253.jpg',
        authorName: article.authorName || 'Aviance Corporate Communications',
        authorRole: article.authorRole || 'Media Relations',
        authorEmail: article.authorEmail || 'comms@avianceghana.com',
        readTimeMinutes: article.readTimeMinutes || 3,
        tags: article.tags || ['Aviation', 'Ghana'],
        isPublished: initialStatus === 'Published',
        status: initialStatus,
        version: 1,
        revisions: [],
        publishedAt: initialStatus === 'Published' ? now : '',
        createdAt: now,
        updatedAt: now,
        ...article,
      } as NewsArticle;

      articles.unshift(saved);
    }

    setStored(STORAGE_KEYS.NEWS, articles);
    dataService.logAudit(
      article.authorEmail || 'comms@avianceghana.com',
      article.id ? `Updated Article (v${saved.version})` : 'Created Article (v1)',
      'News',
      saved.id,
      `${saved.title} [Status: ${saved.status}]`
    );
    return saved;
  },

  restoreNewsRevision: (articleId: string, revisionId: string): NewsArticle => {
    const articles = dataService.getNews();
    const idx = articles.findIndex((n) => n.id === articleId);
    if (idx === -1) throw new Error('Article not found');

    const current = articles[idx];
    const targetRev = (current.revisions || []).find((r) => r.id === revisionId);
    if (!targetRev) throw new Error('Revision snapshot not found');

    const now = new Date().toISOString();
    const newVersion = (current.version || 1) + 1;

    // Save current as revision before restoring
    const currentAsRev: ContentRevision = {
      id: `rev-${Date.now()}-${current.version}`,
      contentId: current.id,
      version: current.version,
      status: current.status,
      title: current.title,
      content: current.content,
      excerpt: current.excerpt,
      authorName: current.authorName,
      authorEmail: current.authorEmail || 'comms@avianceghana.com',
      changeSummary: `Prior state before restoring v${targetRev.version}`,
      createdAt: now,
    };

    const restored: NewsArticle = {
      ...current,
      title: targetRev.title,
      content: targetRev.content,
      excerpt: targetRev.excerpt || current.excerpt,
      status: targetRev.status,
      isPublished: targetRev.status === 'Published',
      version: newVersion,
      revisions: [currentAsRev, ...(current.revisions || [])],
      updatedAt: now,
    };

    articles[idx] = restored;
    setStored(STORAGE_KEYS.NEWS, articles);
    dataService.logAudit(
      'admin@avianceghana.com',
      `Restored Article Revision v${targetRev.version}`,
      'News',
      restored.id,
      `Restored to v${targetRev.version} (now v${newVersion})`
    );

    return restored;
  },
  deleteNews: (id: string): void => {
    const list = dataService.getNews().filter((n) => n.id !== id);
    setStored(STORAGE_KEYS.NEWS, list);
  },

  // Vacancies
  getVacancies: (): Vacancy[] => {
    return getStored<Vacancy[]>(STORAGE_KEYS.VACANCIES, INITIAL_VACANCIES);
  },
  saveVacancy: (vac: Partial<Vacancy> & { title: string; department: string }): Vacancy => {
    const list = dataService.getVacancies();
    let saved: Vacancy;
    if (vac.id) {
      const idx = list.findIndex((v) => v.id === vac.id);
      saved = { ...list[idx], ...vac } as Vacancy;
      list[idx] = saved;
    } else {
      saved = {
        id: `vac-${Date.now()}`,
        location: vac.location || 'Kotoka International Airport, Terminal 3, Accra',
        employmentType: vac.employmentType || 'Full-time',
        description: vac.description || '',
        responsibilities: vac.responsibilities || [],
        requirements: vac.requirements || [],
        deadline: vac.deadline || '2026-12-31',
        status: vac.status || 'Open',
        displayOrder: list.length + 1,
        createdAt: new Date().toISOString(),
        ...vac,
      } as Vacancy;
      list.push(saved);
    }
    setStored(STORAGE_KEYS.VACANCIES, list);
    dataService.logAudit('hr@avianceghana.com', vac.id ? 'Updated Vacancy' : 'Posted Vacancy', 'Careers', saved.id, saved.title);
    return saved;
  },
  deleteVacancy: (id: string): void => {
    const list = dataService.getVacancies().filter((v) => v.id !== id);
    setStored(STORAGE_KEYS.VACANCIES, list);
  },

  // Applications
  getApplications: (): Application[] => {
    return getStored<Application[]>(STORAGE_KEYS.APPLICATIONS, DEFAULT_APPLICATIONS);
  },
  submitApplication: (app: Omit<Application, 'id' | 'createdAt' | 'status'>): Application => {
    const list = dataService.getApplications();
    const newApp: Application = {
      ...app,
      id: `app-${Date.now()}`,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newApp);
    setStored(STORAGE_KEYS.APPLICATIONS, list);

    dataService.addNotification({
      title: 'New Job Application Received',
      message: `${newApp.applicantName} applied for ${newApp.jobTitle}`,
      type: 'application',
      link: '/admin/applications',
    });

    return newApp;
  },
  updateApplicationStatus: (id: string, status: Application['status'], notes?: string): void => {
    const list = dataService.getApplications();
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      if (notes !== undefined) list[idx].internalNotes = notes;
      setStored(STORAGE_KEYS.APPLICATIONS, list);
      dataService.logAudit('hr@avianceghana.com', 'Updated Applicant Status', 'Careers', id, `Status set to ${status}`);
    }
  },

  // Enquiries
  getEnquiries: (): Enquiry[] => {
    return getStored<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
  },
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'referenceNo' | 'status' | 'createdAt' | 'updatedAt'>): Enquiry => {
    const list = dataService.getEnquiries();
    const now = new Date().toISOString();
    const ref = `AV-26-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnq: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      referenceNo: ref,
      status: 'New',
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newEnq);
    setStored(STORAGE_KEYS.ENQUIRIES, list);

    dataService.addNotification({
      title: `New ${newEnq.category} Enquiry (${ref})`,
      message: `From ${newEnq.senderName}: "${newEnq.subject.substring(0, 50)}..."`,
      type: 'enquiry',
      link: '/admin/enquiries',
    });

    return newEnq;
  },
  updateEnquiryStatus: (
    id: string,
    status: Enquiry['status'],
    notes?: string,
    updates?: Partial<Enquiry>
  ): void => {
    const list = dataService.getEnquiries();
    const idx = list.findIndex((e) => e.id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        status,
        updatedAt: new Date().toISOString(),
        ...(notes !== undefined ? { resolutionNotes: notes } : {}),
        ...(updates || {}),
      };
      setStored(STORAGE_KEYS.ENQUIRIES, list);
      dataService.logAudit(
        'operations@avianceghana.com',
        'Updated Enquiry Status',
        'Enquiries',
        id,
        `Status set to ${status}${updates?.priority ? ` | Priority: ${updates.priority}` : ''}`
      );
    }
  },
  replyToEnquiry: (
    id: string,
    messageText: string,
    senderName: string,
    senderEmail: string
  ): void => {
    const list = dataService.getEnquiries();
    const idx = list.findIndex((e) => e.id === id);
    if (idx !== -1) {
      const now = new Date().toISOString();
      const existing = list[idx];
      const newMsg = {
        id: `msg-${Date.now()}`,
        enquiryId: id,
        senderType: 'staff' as const,
        senderName,
        senderEmail,
        message: messageText,
        createdAt: now,
      };
      const messages = existing.messages || [];
      list[idx] = {
        ...existing,
        status: 'Waiting for Customer',
        updatedAt: now,
        messages: [...messages, newMsg],
      };
      setStored(STORAGE_KEYS.ENQUIRIES, list);
      dataService.logAudit(
        senderEmail,
        'Dispatched Customer Response',
        'Enquiries',
        id,
        `Sent email response to ${existing.email} (Ref: ${existing.referenceNo})`
      );
    }
  },

  // Baggage (Find My Bag)
  getBaggageRecords: (): BaggageRecord[] => {
    return getStored<BaggageRecord[]>(STORAGE_KEYS.BAGGAGE, INITIAL_BAGGAGE);
  },
  searchBaggage: (tag: string): BaggageRecord | undefined => {
    const cleaned = tag.trim().toUpperCase();
    const records = dataService.getBaggageRecords();
    return records.find((b) => b.baggageTag.toUpperCase() === cleaned || b.flightNumber.toUpperCase() === cleaned);
  },
  saveBaggageRecord: (record: Partial<BaggageRecord> & { baggageTag: string; passengerName: string }): BaggageRecord => {
    const list = dataService.getBaggageRecords();
    let saved: BaggageRecord;
    if (record.id) {
      const idx = list.findIndex((b) => b.id === record.id);
      saved = { ...list[idx], ...record } as BaggageRecord;
      list[idx] = saved;
    } else {
      saved = {
        id: `bag-${Date.now()}`,
        airlineCode: record.airlineCode || 'GH',
        airlineName: record.airlineName || 'Partner Airline',
        flightNumber: record.flightNumber || 'FLIGHT-101',
        routing: record.routing || 'ACC -> KMS',
        currentStatus: record.currentStatus || 'Ground Handling in Progress',
        lastCheckpoint: record.lastCheckpoint || 'Kotoka Airport Apron Baggage Hub',
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' GMT',
        handlerDeskContact: '+233 (0)302 778 025 (Ext. 204)',
        station: record.station || 'Accra (ACC)',
        ...record,
      } as BaggageRecord;
      list.unshift(saved);
    }
    setStored(STORAGE_KEYS.BAGGAGE, list);
    dataService.logAudit('operations@avianceghana.com', 'Updated Baggage Record', 'Baggage', saved.baggageTag, `Status: ${saved.currentStatus}`);
    return saved;
  },

  // Team
  getTeam: (): TeamMember[] => {
    return getStored<TeamMember[]>(STORAGE_KEYS.TEAM, INITIAL_TEAM);
  },
  saveTeamMember: (member: Partial<TeamMember> & { name: string; position: string }): TeamMember => {
    const list = dataService.getTeam();
    let saved: TeamMember;
    if (member.id) {
      const idx = list.findIndex((t) => t.id === member.id);
      saved = { ...list[idx], ...member } as TeamMember;
      list[idx] = saved;
    } else {
      saved = {
        id: `team-${Date.now()}`,
        department: member.department || 'Operations',
        biography: member.biography || '',
        photoUrl: member.photoUrl || '/src/assets/images/hero_aviance_turnaround_1791329957957.jpg',
        displayOrder: list.length + 1,
        isActive: true,
        ...member,
      } as TeamMember;
      list.push(saved);
    }
    setStored(STORAGE_KEYS.TEAM, list);
    return saved;
  },

  // Customers & Partners
  getCustomers: (): CustomerPartner[] => {
    return getStored<CustomerPartner[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  },
  saveCustomer: (customer: Partial<CustomerPartner> & { name: string }): CustomerPartner => {
    const list = dataService.getCustomers();
    let saved: CustomerPartner;
    if (customer.id) {
      const idx = list.findIndex((c) => c.id === customer.id);
      saved = { ...list[idx], ...customer } as CustomerPartner;
      list[idx] = saved;
    } else {
      saved = {
        id: `cust-${Date.now()}`,
        category: customer.category || 'Commercial Airline',
        logoUrl: customer.logoUrl || customer.name.substring(0, 2).toUpperCase(),
        servicesProvided: customer.servicesProvided || ['Ramp Handling'],
        displayOrder: list.length + 1,
        isActive: true,
        ...customer,
      } as CustomerPartner;
      list.push(saved);
    }
    setStored(STORAGE_KEYS.CUSTOMERS, list);
    return saved;
  },

  // Audit Logs
  getAuditLogs: (): AuditLog[] => {
    return getStored<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, DEFAULT_AUDIT_LOGS);
  },
  logAudit: (userEmail: string, action: string, module: string, recordId?: string, details: string = ''): void => {
    const list = dataService.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userEmail,
      action,
      module,
      recordId,
      details,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newLog);
    if (list.length > 200) list.pop();
    setStored(STORAGE_KEYS.AUDIT_LOGS, list);
  },

  // Notifications
  getNotifications: (): NotificationItem[] => {
    return getStored<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
  },
  addNotification: (notif: Omit<NotificationItem, 'id' | 'isRead' | 'createdAt'>): void => {
    const list = dataService.getNotifications();
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newNotif);
    setStored(STORAGE_KEYS.NOTIFICATIONS, list);
  },
  markNotificationRead: (id: string): void => {
    const list = dataService.getNotifications();
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      list[idx].isRead = true;
      setStored(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  },
  markAllNotificationsRead: (): void => {
    const list = dataService.getNotifications().map((n) => ({ ...n, isRead: true }));
    setStored(STORAGE_KEYS.NOTIFICATIONS, list);
  },

  // Site Settings
  getSettings: (): SiteSettings => {
    return getStored<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },
  saveSettings: (settings: Partial<SiteSettings>): SiteSettings => {
    const current = dataService.getSettings();
    const updated = { ...current, ...settings };
    setStored(STORAGE_KEYS.SETTINGS, updated);
    dataService.logAudit('it@avianceghana.com', 'Updated Settings', 'Settings', 'general', 'Updated platform configuration');
    return updated;
  },

  // Reset to original seed
  resetToDefaults: (): void => {
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.LOCATIONS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.VACANCIES);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.BAGGAGE);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    notifySubscribers();
  }
};

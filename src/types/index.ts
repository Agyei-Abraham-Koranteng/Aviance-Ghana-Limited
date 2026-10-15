export type UserRole =
  | 'super_admin'
  | 'content_manager'
  | 'hr_recruitment'
  | 'operations_manager'
  | 'cargo_manager'
  | 'baggage_manager'
  | 'it_admin'
  | 'marketing_comm'
  | 'reviewer'
  | 'viewer_analyst';

export type VerificationStatus =
  | 'Verified Official'
  | 'CMS Verification Required'
  | 'Proposed Digital Feature'
  | 'Demonstration Data';

export type ContentStatus =
  | 'Draft'
  | 'Submitted for Review'
  | 'Approved'
  | 'Published'
  | 'Archived';

export interface ContentRevision {
  id: string;
  contentId: string;
  version: number;
  status: ContentStatus;
  title: string;
  content: string;
  excerpt?: string;
  authorName: string;
  authorEmail: string;
  reviewerEmail?: string;
  approverEmail?: string;
  changeSummary: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  department: string;
  avatarUrl?: string;
  isActive: boolean;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: 'Passenger' | 'Ramp' | 'Cargo' | 'VIP & Hospitality' | 'Technical' | 'Security & Quality';
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  icon: string;
  locations: string[];
  features: string[];
  faqs?: { question: string; answer: string }[];
  operatingHours: string;
  contactEmail: string;
  contactPhone: string;
  isPublished: boolean;
  status?: ContentStatus;
  verificationStatus?: VerificationStatus;
  version?: number;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocationItem {
  id: string;
  code: 'ACC' | 'KMS' | 'TML';
  name: string;
  airportName: string;
  icaoCode: string;
  iataCode: string;
  description: string;
  address: string;
  digitalAddress: string;
  contactPhone: string;
  contactEmail: string;
  operatingHours: string;
  coordinates: { x: number; y: number }; // Percentage on Ghana map
  isActive: boolean;
  verificationStatus?: VerificationStatus;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expiring_soon' | 'renewal_pending';
  category: string;
  description: string;
  documentUrl?: string;
  imageUrl?: string;
  displayOrder: number;
  isVerified?: boolean;
  verificationStatus?: VerificationStatus;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  authorName: string;
  authorRole: string;
  authorEmail?: string;
  reviewerEmail?: string;
  approverEmail?: string;
  readTimeMinutes: number;
  tags: string[];
  isPublished: boolean;
  status: ContentStatus;
  version: number;
  revisions?: ContentRevision[];
  verificationStatus?: VerificationStatus;
  publishedAt: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'National Service' | 'Shift-Based';
  programmeType?: 'Standard' | 'NSS' | 'Internship';
  description: string;
  responsibilities: string[];
  requirements: string[];
  deadline: string;
  status: 'Open' | 'Reviewing' | 'Closed';
  displayOrder: number;
  verificationStatus?: VerificationStatus;
  createdAt: string;
}

export interface Application {
  id: string;
  vacancyId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  education?: string;
  experienceYears?: string;
  ghanaDigitalAddress?: string;
  coverLetter?: string;
  resumeFileName?: string;
  status: 'Submitted' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected' | 'Archived';
  internalNotes?: string;
  isNssApplicant?: boolean;
  createdAt: string;
}

export interface EnquiryMessage {
  id: string;
  enquiryId: string;
  senderType: 'customer' | 'staff' | 'system';
  senderName: string;
  senderEmail: string;
  message: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  referenceNo: string;
  category:
    | 'General'
    | 'Passenger Services'
    | 'Cargo'
    | 'Operations'
    | 'Lounge'
    | 'Baggage'
    | 'IT'
    | 'Careers'
    | 'VIP'
    | 'Partnerships'
    | 'Other';
  senderName: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Waiting for Customer' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedDepartment?: string;
  assignedStaffEmail?: string;
  resolutionNotes?: string;
  messages?: EnquiryMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface DigitalDocument {
  id: string;
  title: string;
  description: string;
  category:
    | 'Corporate'
    | 'Policies'
    | 'Safety'
    | 'Quality'
    | 'Certifications'
    | 'Careers'
    | 'Reports'
    | 'Compliance'
    | 'Codes & Standards'
    | 'Public Documents';
  fileName: string;
  fileSize: string;
  fileType: string;
  version: string;
  status: 'Active' | 'Archived' | 'Superseded';
  visibility: 'Public' | 'Internal' | 'Restricted';
  verificationStatus: VerificationStatus;
  uploadedBy: string;
  uploadDate: string;
  expiryDate?: string;
  downloadUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Passenger' | 'Baggage' | 'Cargo' | 'Lounge' | 'Careers' | 'Corporate' | 'General';
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface PartnerRequest {
  id: string;
  referenceNo: string;
  partnerName: string;
  airlineCode?: string;
  requestType: 'Slot Handling' | 'Ground Support' | 'Charter Assistance' | 'Billing & Audit' | 'Document Request';
  priority: 'Standard' | 'Urgent' | 'Flight Critical';
  station: 'ACC' | 'KMS' | 'TML';
  flightNumber?: string;
  scheduledDate?: string;
  details: string;
  status: 'Received' | 'In Review' | 'Approved' | 'Dispatched';
  createdAt: string;
}

export interface SystemHealthMetric {
  service: string;
  displayName: string;
  status: 'Operational' | 'Warning' | 'Requires Attention' | 'Offline' | 'Monitoring Configuration Required';
  lastChecked: string;
  latencyMs?: number;
  details: string;
  eventsCount: number;
}

export interface BaggageRecord {
  id: string;
  baggageTag: string;
  passengerName: string;
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
  routing: string;
  currentStatus: 'Located' | 'Ground Handling in Progress' | 'Ready for Collection' | 'In Transit';
  lastCheckpoint: string;
  lastUpdated: string;
  handlerDeskContact: string;
  station: string;
  notes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  biography: string;
  photoUrl: string;
  email?: string;
  linkedinUrl?: string;
  displayOrder: number;
  isActive: boolean;
  isVerified?: boolean;
}

export interface CustomerPartner {
  id: string;
  name: string;
  category: 'Commercial Airline' | 'Cargo Carrier' | 'Executive & Charter' | 'Aviation Alliance';
  logoUrl: string;
  website?: string;
  servicesProvided: string[];
  displayOrder: number;
  isActive: boolean;
  isVerified?: boolean;
}

export interface AuditLog {
  id: string;
  userEmail: string;
  action: string;
  module: string;
  recordId?: string;
  details: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'enquiry' | 'application' | 'certification' | 'alert';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  headOfficeAddress: string;
  digitalAddress: string;
  poBox: string;
  primaryPhone: string;
  secondaryPhone: string;
  primaryEmail: string;
  cargoEmail: string;
  vipEmail: string;
  careersEmail: string;
  operatingHours: string;
  enableAnalytics: boolean;
  maintenanceMode: boolean;
}

export type LeadStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUALIFIED' 
  | 'QUOTATION SENT' 
  | 'NEGOTIATION' 
  | 'WON' 
  | 'LOST' 
  | 'FOLLOW-UP';

export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY HIGH';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  fullDescription: string;
  craftStory?: string;
  materials: string[];
  dimensions?: string;
  weight?: string;
  availableColours: string[];
  variants?: ProductVariant[];
  sku: string;
  moq: number;
  retailPrice?: number;
  bulkPrice?: number;
  priceOnRequest: boolean;
  customizationAvailable: boolean;
  productionStatus: 'Ready to Ship' | 'Made to Order' | 'In Production';
  estimatedProductionTime: string;
  featured: boolean;
  isNew: boolean;
  hidden?: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  primaryImage: string;
  images: string[];
  videoUrl?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  hidden: boolean;
  orderIndex: number;
}

export interface Artisan {
  id: string;
  name: string;
  artisanCode?: string;
  photo: string;
  additionalPhotos?: string[];
  craft: string;
  productCategory: string;
  experienceYears: number;
  story: string;
  skills: string[];
  productsCreated?: string[];
  broadLocation: string;
  featured: boolean;
  hidden: boolean;
  orderIndex: number;
}

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  skill: string;
  eligibility: string;
  duration: string;
  location: string;
  batchDate?: string;
  seats?: string;
  registrationStatus: 'Open' | 'Upcoming' | 'Closed';
  applicationInstructions: string;
  images: string[];
  faqs?: { question: string; answer: string }[];
  hidden: boolean;
  orderIndex: number;
}

export interface TrainingApplication {
  id: string;
  programId: string;
  programTitle: string;
  applicantName: string;
  phone: string;
  whatsapp?: string;
  location: string;
  age?: string;
  craftInterest: string;
  message?: string;
  status: 'New' | 'Reviewed' | 'Accepted' | 'Waitlisted' | 'Completed';
  createdAt: string;
}

export interface GovernmentTender {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: string;
  description: string;
  status: 'Verified Project' | 'Active Capability' | 'Empanelled' | 'Completed' | 'Documentation Ready';
  documents?: { name: string; url: string }[];
  images?: string[];
  caseStudy?: string;
  hidden: boolean;
  orderIndex: number;
}

export interface BulkEnquiryLead {
  id: string;
  name: string;
  companyName: string;
  country: string;
  destination?: string;
  whatsapp: string;
  email: string;
  productOrCategory: string;
  quantity: number | string;
  requiredDeliveryDate?: string;
  customizationRequirement?: string;
  packagingRequirement?: string;
  privateLabelBranding?: boolean;
  message: string;
  fileAttachment?: string;
  source: 'Website Form' | 'AI Chatbot' | 'WhatsApp Click' | 'Direct';
  priority: LeadPriority;
  status: LeadStatus;
  notes?: { text: string; date: string; author: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface PujaCampaign {
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  supportingText: string;
  offerText: string;
  bannerImage: string;
  ctaText: string;
  ctaLink: string;
  countdownDeadline: string; // ISO String
  enabled: boolean;
  showCountdown: boolean;
  startDate?: string;
  endDate?: string;
}

export interface TrustBadge {
  id: string;
  title: string;
  subtitle?: string;
  iconName: string;
  orderIndex: number;
  hidden: boolean;
}

export interface WhyUsCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  link?: string;
  orderIndex: number;
  hidden: boolean;
}

export interface ArtisanWorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
  orderIndex: number;
  hidden: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  location?: string;
  content: string;
  rating: number;
  verifiedBuyer: boolean;
  avatar?: string;
  orderIndex: number;
  hidden: boolean;
  createdAt?: string;
}

export interface FAQ {
  id: string;
  category: 'General' | 'Bulk Orders' | 'Artisans' | 'Government' | 'Shipping';
  question: string;
  answer: string;
  orderIndex: number;
  hidden: boolean;
}

export interface SiteSettings {
  companyName: string;
  ownerName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  fullAddress: string;
  googleMapsUrl?: string;
  businessHours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  logoUrl?: string;
  faviconUrl?: string;
  currencySymbol: string;
  internationalShippingDisclaimer: string;
  advancePaymentPolicyNote: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage?: string;
  };
}

export interface HomepageContent {
  hero: {
    headline: string;
    supportingText: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    thirdCtaText: string;
    thirdCtaLink: string;
    backgroundImage: string;
    additionalSlides?: {
      headline: string;
      supportingText: string;
      image: string;
      ctaText: string;
      ctaLink: string;
    }[];
  };
  trustBadges: TrustBadge[];
  whyUsCards: WhyUsCard[];
  workflowSteps: ArtisanWorkflowStep[];
  bulkCta: {
    headline: string;
    supportingText: string;
    buttonText: string;
  };
  govtSectionPreview: {
    headline: string;
    supportingText: string;
  };
}

export interface LegalPage {
  id: string;
  slug: 'privacy-policy' | 'terms-and-conditions' | 'shipping-policy' | 'returns-and-refund' | 'cancellation-policy' | 'disclaimer' | string;
  title: string;
  lastUpdated: string;
  content: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  orderIndex: number;
  hidden: boolean;
  isExternal?: boolean;
}

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  altText?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  artisanName?: string;
  materials?: string;
  featured?: boolean;
  orderIndex?: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  language?: 'en' | 'bn' | 'hi';
  intentScore?: LeadPriority;
  products?: Partial<Product>[];
  quickActions?: string[];
  timestamp: string;
}

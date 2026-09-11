import fs from 'fs';
import path from 'path';
import { 
  SiteSettings, 
  Product, 
  Category, 
  Artisan, 
  TrainingProgram, 
  TrainingApplication,
  GovernmentTender, 
  PujaCampaign, 
  HomepageContent, 
  LegalPage, 
  FAQ, 
  Testimonial, 
  NavigationItem, 
  BulkEnquiryLead,
  MediaFile,
  GalleryItem
} from '../src/types.js';

import {
  defaultSettings,
  defaultCategories,
  defaultProducts,
  defaultArtisans,
  defaultTrainingPrograms,
  defaultTenders,
  defaultCampaign,
  defaultHomepageContent,
  defaultNavigation,
  defaultLegalPages,
  defaultFAQs,
  defaultTestimonials,
  defaultLeads,
  defaultGallery
} from './defaultData.js';

export interface AdminUser {
  id: string;
  username: string;
  email?: string;
  passwordHash: string; // Stored securely
  role: 'superadmin' | 'admin';
  lastLogin?: string;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  categories: Category[];
  products: Product[];
  artisans: Artisan[];
  trainingPrograms: TrainingProgram[];
  trainingApplications: TrainingApplication[];
  tenders: GovernmentTender[];
  campaigns: PujaCampaign[];
  homepageContent: HomepageContent;
  navigation: NavigationItem[];
  legalPages: LegalPage[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  leads: BulkEnquiryLead[];
  media: MediaFile[];
  gallery: GalleryItem[];
  adminUsers: AdminUser[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial DB state
function getInitialDb(): DatabaseSchema {
  return {
    settings: defaultSettings,
    categories: defaultCategories,
    products: defaultProducts,
    artisans: defaultArtisans,
    trainingPrograms: defaultTrainingPrograms,
    trainingApplications: [],
    tenders: defaultTenders,
    campaigns: [defaultCampaign],
    homepageContent: defaultHomepageContent,
    navigation: defaultNavigation,
    legalPages: defaultLegalPages,
    faqs: defaultFAQs,
    testimonials: defaultTestimonials,
    leads: defaultLeads,
    media: [],
    gallery: defaultGallery,
    adminUsers: [
      {
        id: 'admin-1',
        username: 'admin',
        email: 'admin@jitprime.com',
        passwordHash: 'admin123', // In production or custom settings, admin can update this
        role: 'superadmin'
      },
      {
        id: 'admin-2',
        username: 'monojit',
        email: 'monojitdey189@gmail.com',
        passwordHash: 'jitprime85219',
        role: 'superadmin'
      }
    ]
  };
}

// Read database
export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialDb();
      writeDb(initial);
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw);
    // Ensure missing collections are backfilled
    const initial = getInitialDb();
    let updated = false;
    for (const key of Object.keys(initial) as (keyof DatabaseSchema)[]) {
      if (data[key] === undefined) {
        (data as any)[key] = initial[key];
        updated = true;
      }
    }
    if (updated) {
      writeDb(data);
    }
    return data;
  } catch (err) {
    console.error('Error reading database file, returning initial state:', err);
    return getInitialDb();
  }
}

// Write database atomically
export function writeDb(data: DatabaseSchema): void {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

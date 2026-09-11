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
} from '../types';
import { staticDatabase } from '../data/staticDb';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('jit_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {})
  };
}

// Helper to safely fetch JSON with fallback data when deployed statically (e.g. GitHub Pages)
async function safeGet<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    const contentType = res.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      return fallback;
    }
    const data = await res.json();
    return data !== undefined && data !== null ? data : fallback;
  } catch {
    return fallback;
  }
}

export const api = {
  // Settings
  async getSettings(): Promise<SiteSettings> {
    return safeGet<SiteSettings>(`${API_BASE}/settings`, staticDatabase.settings);
  },
  async updateSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; settings: SiteSettings }> {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(settings)
      });
      if (res.ok) return await res.json();
    } catch {}
    return { success: true, settings: { ...staticDatabase.settings, ...settings } };
  },

  // Products
  async getProducts(params?: { category?: string; search?: string; featured?: boolean; includeHidden?: boolean }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.featured) query.append('featured', 'true');
    if (params?.includeHidden) query.append('includeHidden', 'true');

    let fallback: Product[] = (staticDatabase.products || []) as Product[];
    if (!params?.includeHidden) {
      fallback = fallback.filter(p => !p.hidden);
    }
    if (params?.category && params.category !== 'all') {
      fallback = fallback.filter(p => p.category === params.category);
    }
    if (params?.featured) {
      fallback = fallback.filter(p => p.featured);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      fallback = fallback.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) || 
        (p.fullDescription && p.fullDescription.toLowerCase().includes(q)) || 
        (p.tags && p.tags.some((t: string) => t.toLowerCase().includes(q)))
      );
    }

    return safeGet<Product[]>(`${API_BASE}/products?${query.toString()}`, fallback);
  },

  async getProduct(idOrSlug: string): Promise<Product> {
    const allProducts = (staticDatabase.products || []) as Product[];
    const fallback = allProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug) || allProducts[0];
    return safeGet<Product>(`${API_BASE}/products/${idOrSlug}`, fallback);
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(product)
    });
    return res.json();
  },
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(product)
    });
    return res.json();
  },
  async deleteProduct(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Categories
  async getCategories(includeHidden = false): Promise<Category[]> {
    let fallback: Category[] = (staticDatabase.categories || []) as Category[];
    if (!includeHidden) {
      fallback = fallback.filter(c => !c.hidden);
    }
    return safeGet<Category[]>(`${API_BASE}/categories?includeHidden=${includeHidden}`, fallback);
  },
  async createCategory(category: Partial<Category>): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(category)
    });
    return res.json();
  },
  async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(category)
    });
    return res.json();
  },
  async deleteCategory(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Artisans
  async getArtisans(includeHidden = false): Promise<Artisan[]> {
    let fallback: Artisan[] = (staticDatabase.artisans || []) as Artisan[];
    if (!includeHidden) {
      fallback = fallback.filter(a => !a.hidden);
    }
    return safeGet<Artisan[]>(`${API_BASE}/artisans?includeHidden=${includeHidden}`, fallback);
  },
  async createArtisan(artisan: Partial<Artisan>): Promise<Artisan> {
    const res = await fetch(`${API_BASE}/artisans`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(artisan)
    });
    return res.json();
  },
  async updateArtisan(id: string, artisan: Partial<Artisan>): Promise<Artisan> {
    const res = await fetch(`${API_BASE}/artisans/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(artisan)
    });
    return res.json();
  },
  async deleteArtisan(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/artisans/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Training
  async getTrainingPrograms(includeHidden = false): Promise<TrainingProgram[]> {
    let fallback: TrainingProgram[] = (staticDatabase.trainingPrograms || []) as TrainingProgram[];
    if (!includeHidden) {
      fallback = fallback.filter(p => !p.hidden);
    }
    return safeGet<TrainingProgram[]>(`${API_BASE}/training?includeHidden=${includeHidden}`, fallback);
  },
  async createTrainingProgram(program: Partial<TrainingProgram>): Promise<TrainingProgram> {
    const res = await fetch(`${API_BASE}/training`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(program)
    });
    return res.json();
  },
  async updateTrainingProgram(id: string, program: Partial<TrainingProgram>): Promise<TrainingProgram> {
    const res = await fetch(`${API_BASE}/training/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(program)
    });
    return res.json();
  },
  async deleteTrainingProgram(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/training/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },
  async submitTrainingApplication(app: Partial<TrainingApplication>): Promise<{ success: boolean; application: TrainingApplication }> {
    try {
      const res = await fetch(`${API_BASE}/training-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app)
      });
      if (res.ok) return await res.json();
    } catch {}
    return {
      success: true,
      application: {
        id: 'train-' + Date.now(),
        programId: app.programId || '',
        programTitle: app.programTitle || '',
        applicantName: app.applicantName || 'Applicant',
        phone: app.phone || '',
        location: app.location || '',
        craftInterest: app.craftInterest || '',
        status: 'New',
        createdAt: new Date().toISOString(),
        ...app
      } as TrainingApplication
    };
  },
  async getTrainingApplications(): Promise<TrainingApplication[]> {
    return safeGet<TrainingApplication[]>(`${API_BASE}/training-applications`, (staticDatabase.trainingApplications || []) as TrainingApplication[]);
  },
  async updateTrainingApplication(id: string, app: Partial<TrainingApplication>): Promise<TrainingApplication> {
    const res = await fetch(`${API_BASE}/training-applications/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(app)
    });
    return res.json();
  },

  // Tenders
  async getTenders(includeHidden = false): Promise<GovernmentTender[]> {
    let fallback: GovernmentTender[] = (staticDatabase.governmentTenders || []) as GovernmentTender[];
    if (!includeHidden) {
      fallback = fallback.filter(t => !t.hidden);
    }
    return safeGet<GovernmentTender[]>(`${API_BASE}/tenders?includeHidden=${includeHidden}`, fallback);
  },
  async createTender(tender: Partial<GovernmentTender>): Promise<GovernmentTender> {
    const res = await fetch(`${API_BASE}/tenders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tender)
    });
    return res.json();
  },
  async updateTender(id: string, tender: Partial<GovernmentTender>): Promise<GovernmentTender> {
    const res = await fetch(`${API_BASE}/tenders/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(tender)
    });
    return res.json();
  },
  async deleteTender(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/tenders/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Campaigns
  async getCampaigns(): Promise<PujaCampaign[]> {
    return safeGet<PujaCampaign[]>(`${API_BASE}/campaigns`, (staticDatabase.pujaCampaigns || []) as PujaCampaign[]);
  },
  async updateCampaign(id: string, campaign: Partial<PujaCampaign>): Promise<PujaCampaign> {
    const res = await fetch(`${API_BASE}/campaigns/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(campaign)
    });
    return res.json();
  },

  // Leads
  async submitLead(lead: Partial<BulkEnquiryLead>): Promise<{ success: boolean; lead: BulkEnquiryLead }> {
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      if (res.ok) return await res.json();
    } catch {}
    return {
      success: true,
      lead: {
        id: 'lead-' + Date.now(),
        name: lead.name || 'Anonymous',
        companyName: lead.companyName || '',
        country: lead.country || 'India',
        whatsapp: lead.whatsapp || '',
        email: lead.email || '',
        productOrCategory: lead.productOrCategory || 'Handicrafts',
        quantity: lead.quantity || 1,
        message: lead.message || '',
        source: 'Website Form',
        priority: 'MEDIUM',
        status: 'NEW',
        createdAt: new Date().toISOString(),
        ...lead
      } as BulkEnquiryLead
    };
  },
  async getLeads(): Promise<BulkEnquiryLead[]> {
    return safeGet<BulkEnquiryLead[]>(`${API_BASE}/leads`, (staticDatabase.leads || []) as BulkEnquiryLead[]);
  },
  async updateLead(id: string, lead: Partial<BulkEnquiryLead>): Promise<BulkEnquiryLead> {
    const res = await fetch(`${API_BASE}/leads/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(lead)
    });
    return res.json();
  },
  async addLeadNote(id: string, text: string, author?: string): Promise<BulkEnquiryLead> {
    const res = await fetch(`${API_BASE}/leads/${id}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ text, author })
    });
    return res.json();
  },
  async deleteLead(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/leads/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Homepage Content
  async getHomepageContent(): Promise<HomepageContent> {
    return safeGet<HomepageContent>(`${API_BASE}/homepage`, staticDatabase.homepageContent as HomepageContent);
  },
  async updateHomepageContent(content: Partial<HomepageContent>): Promise<{ success: boolean; homepageContent: HomepageContent }> {
    const res = await fetch(`${API_BASE}/homepage`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(content)
    });
    return res.json();
  },

  // Navigation
  async getNavigation(includeHidden = false): Promise<NavigationItem[]> {
    let fallback: NavigationItem[] = (staticDatabase.navigation || []) as NavigationItem[];
    if (!includeHidden) {
      fallback = fallback.filter(n => !n.hidden);
    }
    return safeGet<NavigationItem[]>(`${API_BASE}/navigation?includeHidden=${includeHidden}`, fallback);
  },
  async updateNavigation(items: NavigationItem[]): Promise<{ success: boolean; navigation: NavigationItem[] }> {
    const res = await fetch(`${API_BASE}/navigation`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(items)
    });
    return res.json();
  },

  // Legal
  async getLegalPages(): Promise<LegalPage[]> {
    return safeGet<LegalPage[]>(`${API_BASE}/legal`, (staticDatabase.legalPages || []) as LegalPage[]);
  },
  async getLegalPage(slug: string): Promise<LegalPage> {
    const allPages = (staticDatabase.legalPages || []) as LegalPage[];
    const fallback = allPages.find(p => p.slug === slug) || {
      id: 'legal-' + slug,
      slug,
      title: slug.replace(/-/g, ' ').toUpperCase(),
      lastUpdated: new Date().toISOString(),
      content: ''
    };
    return safeGet<LegalPage>(`${API_BASE}/legal/${slug}`, fallback);
  },
  async updateLegalPage(slug: string, page: Partial<LegalPage>): Promise<LegalPage> {
    const res = await fetch(`${API_BASE}/legal/${slug}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(page)
    });
    return res.json();
  },

  // FAQs
  async getFaqs(includeHidden = false): Promise<FAQ[]> {
    let fallback: FAQ[] = (staticDatabase.faqs || []) as FAQ[];
    if (!includeHidden) {
      fallback = fallback.filter(f => !f.hidden);
    }
    return safeGet<FAQ[]>(`${API_BASE}/faqs?includeHidden=${includeHidden}`, fallback);
  },
  async createFaq(faq: Partial<FAQ>): Promise<FAQ> {
    const res = await fetch(`${API_BASE}/faqs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(faq)
    });
    return res.json();
  },
  async updateFaq(id: string, faq: Partial<FAQ>): Promise<FAQ> {
    const res = await fetch(`${API_BASE}/faqs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(faq)
    });
    return res.json();
  },
  async deleteFaq(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/faqs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Testimonials
  async getTestimonials(includeHidden = false): Promise<Testimonial[]> {
    let fallback: Testimonial[] = (staticDatabase.testimonials || []) as Testimonial[];
    if (!includeHidden) {
      fallback = fallback.filter(t => !t.hidden);
    }
    return safeGet<Testimonial[]>(`${API_BASE}/testimonials?includeHidden=${includeHidden}`, fallback);
  },
  async submitClientReview(review: {
    clientName: string;
    content: string;
    rating: number;
    company?: string;
    location?: string;
  }): Promise<Testimonial> {
    try {
      const res = await fetch(`${API_BASE}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      if (res.ok) return await res.json();
    } catch {}
    return {
      id: 'rev-' + Date.now(),
      clientName: review.clientName,
      company: review.company || '',
      location: review.location || '',
      rating: review.rating,
      content: review.content,
      verifiedBuyer: true,
      orderIndex: 0,
      hidden: false,
      createdAt: new Date().toISOString()
    };
  },
  async createTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(t)
    });
    return res.json();
  },
  async updateTestimonial(id: string, t: Partial<Testimonial>): Promise<Testimonial> {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(t)
    });
    return res.json();
  },
  async deleteTestimonial(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // File Upload
  async uploadFile(file: File): Promise<{ success: boolean; url: string; file: MediaFile }> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });
    return res.json();
  },
  async uploadMultipleFiles(files: FileList | File[]): Promise<{ success: boolean; files: MediaFile[]; urls: string[] }> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const res = await fetch(`${API_BASE}/upload-multiple`, {
      method: 'POST',
      body: formData
    });
    return res.json();
  },
  async getMediaFiles(): Promise<MediaFile[]> {
    return safeGet<MediaFile[]>(`${API_BASE}/media`, (staticDatabase.media || []) as MediaFile[]);
  },
  async deleteMediaFile(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/media/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Gallery (হাতের কাজের গ্যালারি)
  async getGallery(category?: string): Promise<GalleryItem[]> {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    let fallback: GalleryItem[] = (staticDatabase.galleryItems || []) as GalleryItem[];
    if (category && category !== 'All') {
      fallback = fallback.filter(g => g.category === category);
    }
    return safeGet<GalleryItem[]>(`${API_BASE}/gallery${query}`, fallback);
  },
  async createGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(item)
    });
    return res.json();
  },
  async updateGalleryItem(id: string, item: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(item)
    });
    return res.json();
  },
  async deleteGalleryItem(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // AI Chat
  async sendChatMessage(message: string, language?: 'en' | 'bn' | 'hi', history?: any[]): Promise<{
    text: string;
    language: 'en' | 'bn' | 'hi';
    intentScore: string;
    matchedProducts: any[];
    quickActions: string[];
  }> {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language, history })
      });
      if (res.ok) {
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {}

    // Fallback response if offline or static demo on GitHub Pages
    return {
      text: language === 'bn' 
        ? 'জিৎ প্রাইম এমপিসি কোম্পানিতে যোগাযোগ করার জন্য ধন্যবাদ। বাল্ক অর্ডার বা বিস্তারিত জানার জন্য আমাদের সরাসরি ফোন বা হোয়াটসঅ্যাপে (+৯১ ৮২৪০৫ ৮৫২১৯) যোগাযোগ করতে পারেন।'
        : 'Thank you for reaching out to Jit Prime MPC Company! For immediate bulk quotations and order inquiries, please message or call us directly on WhatsApp at +91 82405 85219.',
      language: language || 'en',
      intentScore: 'high',
      matchedProducts: [],
      quickActions: ['WhatsApp Us', 'View Catalogue', 'Request Quote']
    };
  },

  // Backup & Export
  getBackupDownloadUrl(): string {
    return `${API_BASE}/backup/export`;
  },
  async importBackup(data: any): Promise<{ success: boolean; message?: string }> {
    const res = await fetch(`${API_BASE}/backup/import`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  }
};

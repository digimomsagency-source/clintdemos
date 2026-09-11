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

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('jit_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {})
  };
}

export const api = {
  // Settings
  async getSettings(): Promise<SiteSettings> {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },
  async updateSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; settings: SiteSettings }> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    return res.json();
  },

  // Products
  async getProducts(params?: { category?: string; search?: string; featured?: boolean; includeHidden?: boolean }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.featured) query.append('featured', 'true');
    if (params?.includeHidden) query.append('includeHidden', 'true');
    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    return res.json();
  },
  async getProduct(idOrSlug: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${idOrSlug}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/categories?includeHidden=${includeHidden}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/artisans?includeHidden=${includeHidden}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/training?includeHidden=${includeHidden}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/training-applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(app)
    });
    return res.json();
  },
  async getTrainingApplications(): Promise<TrainingApplication[]> {
    const res = await fetch(`${API_BASE}/training-applications`, {
      headers: getAuthHeaders()
    });
    return res.json();
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
    const res = await fetch(`${API_BASE}/tenders?includeHidden=${includeHidden}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/campaigns`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    return res.json();
  },
  async getLeads(): Promise<BulkEnquiryLead[]> {
    const res = await fetch(`${API_BASE}/leads`, {
      headers: getAuthHeaders()
    });
    return res.json();
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
    const res = await fetch(`${API_BASE}/homepage`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/navigation?includeHidden=${includeHidden}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/legal`);
    return res.json();
  },
  async getLegalPage(slug: string): Promise<LegalPage> {
    const res = await fetch(`${API_BASE}/legal/${slug}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/faqs?includeHidden=${includeHidden}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/testimonials?includeHidden=${includeHidden}`);
    return res.json();
  },
  async submitClientReview(review: {
    clientName: string;
    content: string;
    rating: number;
    company?: string;
    location?: string;
  }): Promise<Testimonial> {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit review');
    }
    return res.json();
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

  // File Upload (Single & Multiple from Device)
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
    const res = await fetch(`${API_BASE}/media`, {
      headers: getAuthHeaders()
    });
    return res.json();
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
    const res = await fetch(`${API_BASE}/gallery${query}`);
    return res.json();
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
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language, history })
    });
    return res.json();
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

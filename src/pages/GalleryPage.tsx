import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Eye, 
  Package, 
  Search, 
  X, 
  Layers, 
  User, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { GalleryItem } from '../types';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';

interface GalleryPageProps {
  onNavigate?: (route: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { openBulkModal, currentLanguage } = useApp();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  // Load gallery items from server
  const loadGallery = async () => {
    try {
      setLoading(true);
      const data = await api.getGallery();
      setItems(data);
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // Collect available unique categories
  const categories = ['All', ...Array.from(new Set(items.map(i => i.category).filter(Boolean)))];

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.artisanName && item.artisanName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.materials && item.materials.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner - Professional, Clean, Executive Styling */}
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white border border-slate-800 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{currentLanguage === 'bn' ? 'মাস্টার কারিগরদের সৃষ্টি' : 'Artisanal Craft Showcase'} &bull; হস্তশিল্প গ্যালারি</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {currentLanguage === 'bn' ? 'হাতের কাজের এক্সক্লুসিভ গ্যালারি' : 'Handcrafted Masterpiece Gallery'}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {currentLanguage === 'bn' 
                ? 'বাংলার মাটির শিল্প, ঐতিহ্যবাহী টেরাকোটা, হস্তনির্মিত জুয়েলারি এবং ডোকরা শিল্পের প্রতিটি অনন্য সৃষ্টি। যেকোনো ডিজাইনের বাল্ক উৎপাদন ও কাস্টমাইজেশন সরাসরি কারিগরদের দিয়ে করানো সম্ভব।'
                : 'Explore authentic handcrafted terracotta art, designer clay jewellery, lost-wax Dokra brass sculptures, and handloom Kantha artifacts created by our skilled artisan clusters in Kolkata & West Bengal.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Genuine Handcrafted
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bulk Production Supported
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct Workshop Supply
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Categories Pill Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? (currentLanguage === 'bn' ? 'সব কাজ (All)' : 'All Works') : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLanguage === 'bn' ? 'হাতের কাজ খুঁজুন...' : 'Search craft, artisan...'}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-3 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-500 font-medium">গ্যালারির হাতের কাজ লোড হচ্ছে...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">কোনো হাতের কাজ পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500">
              অনুগ্রহ করে অন্য ক্যাটাগরি বা শব্দ দিয়ে অনুসন্ধান করুন। অ্যাডমিন প্যানেল থেকে নতুন ছবি আপলোড করা যাবে।
            </p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-semibold text-amber-700 hover:underline"
            >
              সব ক্যাটাগরি রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Image Container with zoom */}
                <div 
                  className="relative aspect-4/3 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => setActiveModalItem(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-950 text-xs font-semibold shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      {currentLanguage === 'bn' ? 'ছবি ও বিবরণ দেখুন' : 'View Craft Details'}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 
                      onClick={() => setActiveModalItem(item)}
                      className="text-base font-bold text-slate-900 hover:text-amber-800 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.title}
                    </h3>
                    
                    {item.artisanName && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Artisan: <strong className="font-semibold text-slate-700">{item.artisanName}</strong></span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {item.materials && (
                      <div className="mt-2.5 text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                        <strong>উপাদান (Material):</strong> {item.materials}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(item)}
                      className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors text-center"
                    >
                      {currentLanguage === 'bn' ? 'বিস্তারিত দেখুন' : 'Full Details'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openBulkModal()}
                      className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                    >
                      <Package className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentLanguage === 'bn' ? 'বাল্ক কোটেশন' : 'Order Bulk'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom B2B Procurement CTA Banner */}
        <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900">
              {currentLanguage === 'bn' ? 'আপনার নিজস্ব ডিজাইনে তৈরি করতে চান?' : 'Need Custom Artisanal Manufacturing?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              {currentLanguage === 'bn'
                ? 'আপনার নির্দিষ্ট ডিজাইন, কালার বা সাইজের স্যাম্পল অনুযায়ী কারিগরদের দিয়ে তৈরি করিয়ে সরবরাহ করতে প্রস্তুত জিত প্রাইম কোম্পানি।'
                : 'We produce custom designs, mementos, corporate gifts, and festive decor to your exact specifications with quality compliance and GST invoicing.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openBulkModal()}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-colors flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>{currentLanguage === 'bn' ? 'কাস্টম কোটেশন পাঠান' : 'Request Custom Order'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox / Modal for Craft Detail View */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  {activeModalItem.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="w-full aspect-16/10 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">কারিগর ও সৃষ্টি বিবরণ (Craft Story)</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalItem.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-medium block">কারিগর (Artisan):</span>
                  <span className="font-semibold text-slate-800">{activeModalItem.artisanName || 'Kolkata Cluster'}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-medium block">উপাদান (Materials):</span>
                  <span className="font-semibold text-slate-800">{activeModalItem.materials || 'Authentic Handcrafted'}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 hidden sm:inline">
                পাইকারি অর্ডার ও কাস্টম অর্ডারের সুবিধা উপলব্ধ
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  বন্ধ করুন (Close)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalItem(null);
                    openBulkModal();
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>এই ডিজাইনের বাল্ক অর্ডার করুন</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

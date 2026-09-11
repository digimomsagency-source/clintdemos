import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Users, 
  PackageCheck, 
  Building2, 
  Wrench, 
  Globe2, 
  Palette, 
  HeartHandshake, 
  Layers, 
  Sliders, 
  FileCheck, 
  PhoneCall,
  CheckCircle2, 
  ChevronDown, 
  MessageCircle, 
  ExternalLink,
  Bot,
  Truck,
  Flame,
  Award,
  BookOpen,
  Briefcase,
  Coins,
  TrendingUp,
  Clock,
  ArrowUpRight,
  GraduationCap,
  Package,
  Image as ImageIcon,
  Star,
  MessageSquarePlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Product, Category, FAQ, Testimonial, HomepageContent, GalleryItem } from '../types';
import { WriteReviewModal } from '../components/WriteReviewModal';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

// Icon helper
const getIcon = (name: string) => {
  switch (name) {
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500" />;
    case 'Users': return <Users className="w-5 h-5 text-amber-500" />;
    case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-amber-500" />;
    case 'Building2': return <Building2 className="w-5 h-5 text-amber-500" />;
    case 'Wrench': return <Wrench className="w-5 h-5 text-amber-500" />;
    case 'Globe2': return <Globe2 className="w-5 h-5 text-amber-500" />;
    case 'Palette': return <Palette className="w-6 h-6 text-amber-500" />;
    case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-amber-500" />;
    case 'Layers': return <Layers className="w-6 h-6 text-amber-500" />;
    case 'Sliders': return <Sliders className="w-6 h-6 text-amber-500" />;
    case 'FileCheck': return <FileCheck className="w-6 h-6 text-amber-500" />;
    case 'PhoneCall': return <PhoneCall className="w-6 h-6 text-amber-500" />;
    case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-500" />;
    case 'Award': return <Award className="w-5 h-5 text-amber-500" />;
    case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
    case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-amber-500" />;
    case 'Briefcase': return <Briefcase className="w-5 h-5 text-amber-500" />;
    case 'Truck': return <Truck className="w-5 h-5 text-amber-500" />;
    case 'Coins': return <Coins className="w-5 h-5 text-amber-500" />;
    case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-500" />;
    default: return <Sparkles className="w-5 h-5 text-amber-500" />;
  }
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { settings, categories, openBulkModal, openChatWithContext, currentLanguage } = useApp();
  
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [homeData, prodData, faqData, testData, galData] = await Promise.all([
          api.getHomepageContent(),
          api.getProducts({ featured: true }),
          api.getFaqs(),
          api.getTestimonials(),
          api.getGallery()
        ]);
        setContent(homeData);
        setProducts(prodData);
        setFaqs(faqData);
        setTestimonials(testData);
        setGalleryItems(galData || []);
      } catch (e) {
        console.error('Failed to load homepage resources:', e);
      }
    }
    load();
  }, []);

  const phone = settings?.phone || '+91 82405 85219';
  const ownerName = settings?.ownerName || 'MONOJIT DEY';
  const companyName = settings?.companyName || 'JIT PRIME MPC COMPANY';

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION (Visiting Card Inspired Navy & Gold Theme) */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#071426] via-[#0B1A30] to-[#142C4F] text-white py-16 sm:py-24 lg:py-28 border-b-4 border-amber-500">
        {/* Subtle geometric & craft texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        {/* Soft background curve accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Visiting Card Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#162D4E] border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>All Govt. Tender &bull; Hasta Shilpa &bull; Bulk Orders</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] font-serif-heading text-white">
                {content?.hero.headline || "Empowering Artisans. Connecting Indian Craft With Global Markets."}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {content?.hero.supportingText || "Authentic Indian Handcrafted Products for Bulk, Institutional & International Buyers — while creating meaningful production and income opportunities for women artisans."}
              </p>

              {/* Priority Dual CTAs (Bulk Order + Learn & Earn) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openBulkModal()}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-sm sm:text-base rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Package className="w-5 h-5 text-slate-950" />
                  <span>Request Bulk Quote &amp; Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/training-livelihood')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 font-semibold text-sm sm:text-base rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  <span>Learn &amp; Earn (প্রশিক্ষণ ও আয়)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/products')}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm sm:text-base rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Catalogue</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>GST Registered Supply</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Kolkata Workshop &amp; Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>GeM &amp; Tender Ready</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-xl">
                  <img
                    src={content?.hero.backgroundImage || "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"}
                    alt="Authentic Indian Hasta Shilpa Handicrafts"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  
                  {/* Floating Visiting Card Badge */}
                  <div className="p-4 bg-slate-900/95 backdrop-blur-xs text-white border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                          {companyName}
                        </p>
                        <p className="text-xs text-slate-300">
                          Owner: <span className="text-white font-medium">{ownerName}</span>
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-200 font-medium text-xs rounded">
                        Direct Workshop Supply
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {(content?.trustBadges || []).filter(b => !b.hidden).map((badge) => (
              <div key={badge.id} className="pt-3 lg:pt-0 lg:px-3 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-2 shadow-xs">
                  {getIcon(badge.iconName)}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  {badge.title}
                </h4>
                {badge.subtitle && (
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    {badge.subtitle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 DUAL CORE PILLARS: LEARN & EARN + BULK PRODUCT ORDERS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Our Two Core Missions &bull; আমাদের মূল দুই স্তম্ভ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-serif-heading tracking-tight">
            Learn &amp; Earn for Artisans &bull; Bulk Supply for Buyers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            একদিকে গ্রামীণ মহিলাদের বিনামূল্যে হস্তশিল্প প্রশিক্ষণ ও নিশ্চিত জীবিকা, অন্যদিকে ব্যবসায়ী ও সরকারি প্রতিষ্ঠানের জন্য নির্ভরযোগ্য বাল্ক ও পাইকারি পণ্য সরবরাহ।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* PILLAR 1: LEARN & EARN */}
          <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>WOMEN LIVELIHOOD INITIATIVE</span>
                </span>
                <span className="text-[11px] font-medium text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                  100% Free Workshop
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Learn &amp; Earn Program
              </h3>
              <p className="text-amber-400 font-medium text-sm mb-4">
                শিখুন ও উপার্জন করুন — গ্রামীণ মা-বোনেদের স্বনির্ভরতা
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                Under the guidance of Monojit Dey and senior Bengal artisans, women learn authentic terracotta jewellery making, dokra art, clay plaques, and handicraft packaging with raw materials provided.
              </p>

              {/* Bullet Features */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm">
                <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Free Raw Materials &amp; Kiln Training</span>
                    <span className="text-slate-300 text-xs">No registration fee. Tools, purified terracotta clay, and organic pigments provided.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Guaranteed Production Buyback</span>
                    <span className="text-slate-300 text-xs">Jit Prime procures finished, quality-verified products for confirmed market &amp; B2B orders.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Work from Home or Cluster Hub</span>
                    <span className="text-slate-300 text-xs">Flexible timings enabling women to manage household duties while earning steady income.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 1 CTA Buttons */}
            <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/training-livelihood')}
                className="flex-1 px-5 py-3 bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for Free Training (আবেদন করুন)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Monojit Dey, I want to inquire about the Learn and Earn training program for women artisans.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Coordinator</span>
              </a>
            </div>
          </div>

          {/* PILLAR 2: BULK & PRODUCT ORDER */}
          <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-10 border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Package className="w-4 h-4 text-emerald-700" />
                  <span>B2B WHOLESALE &amp; INSTITUTIONAL</span>
                </span>
                <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  Direct From Workshop
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-2">
                Bulk &amp; Product Orders
              </h3>
              <p className="text-slate-600 font-medium text-sm mb-4">
                বাল্ক ও প্রাতিষ্ঠানিক অর্ডার — পাইকারি মূল্য ও নিশ্চিত গুণমান
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Source authentic handcrafted Hasta Shilpa items directly from our Kolkata artisan hub. Perfect for corporate gifting, Durga Puja pandal souvenirs, export boutiques, and government tenders.
              </p>

              {/* Bullet Features */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm">
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Direct Wholesale Rates (No Middlemen)</span>
                    <span className="text-slate-600 text-xs">Transparent wholesale pricing with attractive bulk discounts starting at low MOQ (25–50 pcs).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Customization &amp; Private Labeling</span>
                    <span className="text-slate-600 text-xs">Custom dimensions, festival motifs, institutional branding, and premium gift packaging.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-amber-200/80 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">GST Invoice &amp; Safe Nationwide Dispatch</span>
                    <span className="text-slate-600 text-xs">Damage-resistant corrugated packaging with transit insurance across India and global ports.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2 CTA Buttons */}
            <div className="pt-4 border-t border-amber-200 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openBulkModal()}
                className="flex-1 px-5 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Package className="w-4 h-4 text-slate-950" />
                <span>Request Bulk Quote (কোটেশন নিন)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/products')}
                className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>View Products</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-linear-to-r from-[#0B1A30] to-[#122B4D] rounded-3xl p-8 sm:p-12 text-white border border-[#1E3E6B] shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Our Authentic Business Story
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-heading">
              &ldquo;From Skill to Market. From Craft to Opportunity.&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We connect authentic Indian handcrafted products with bulk, institutional and international buyers while creating meaningful production and income opportunities for women artisans.
            </p>
          </div>

          {/* Workflow Sequence Diagram */}
          <div className="mt-10 pt-8 border-t border-slate-700/80">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-semibold">
              {[
                { step: "1. Women Artisans", sub: "Local Talent" },
                { step: "2. Skill & Craft", sub: "Heritage Methods" },
                { step: "3. Product Creation", sub: "Handmade Goods" },
                { step: "4. Quality Check", sub: "Zero Defects" },
                { step: "5. Bulk Orders", sub: "Institutional B2B" },
                { step: "6. Market Access", sub: "Domestic & Export" },
                { step: "7. Income Opportunities", sub: "Fair Production" },
                { step: "8. Sustainable Growth", sub: "Empowered Livelihood" }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#142944] p-3 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
                  <span className="text-amber-400 font-bold block">{item.step}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{item.sub}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-4">
              *Income and production opportunities are generated through confirmed market-linked orders. We do not claim unconditional employment or fixed public salaries.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ARTISANAL CRAFT GALLERY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>হাতের কাজের এক্সক্লুসিভ গ্যালারি &bull; Craft Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Master Artisan Creations &bull; শিল্পীর হাতের কাজ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              মাটির জুয়েলারি, টেরাকোটা ডেকোরেশন ও ঐতিহ্যবাহী ডোকরা শিল্পের নির্বাচিত ছবিসমূহ।
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/gallery')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors self-start md:self-auto cursor-pointer"
          >
            <span>সম্পূর্ণ গ্যালারি দেখুন (Explore Full Gallery)</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(galleryItems.slice(0, 4)).map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigate('/gallery')}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium">
                  {item.category}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {item.artisanName || 'Kolkata Cluster'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED WHOLESALE & BULK COLLECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">
              Handcrafted Catalogue
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif-heading">
              Featured Wholesale & Bulk Collection
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/products')}
            className="text-amber-700 hover:text-amber-800 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0B1A30] text-amber-400 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Featured
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0B1A30] text-amber-400 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div 
                className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => onNavigate(`/products/${product.slug || product.id}`)}
              >
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-[#0B1A30]/90 text-amber-400 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                    MOQ: {product.moq} pcs
                  </span>
                  {product.productionStatus && (
                    <span className="bg-emerald-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {product.productionStatus}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
                    SKU: {product.sku}
                  </div>
                  <h3 
                    onClick={() => onNavigate(`/products/${product.slug || product.id}`)}
                    className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        Wholesale Rate
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {product.priceOnRequest ? "Price on Request" : `₹${product.bulkPrice || product.retailPrice}/pc`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openChatWithContext(`I would like more information on ${product.name} (SKU: ${product.sku})`, product)}
                      className="text-slate-500 hover:text-amber-600 p-1.5 rounded-md hover:bg-amber-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      title="Ask AI Assistant"
                    >
                      <Bot className="w-4 h-4 text-amber-500" />
                      <span className="hidden sm:inline">Ask AI</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/products/${product.slug || product.id}`)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors text-center cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => openBulkModal(product)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors text-center shadow-xs cursor-pointer"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHY JIT PRIME SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">
            Why Choose Jit Prime MPC Company
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif-heading">
            Built on Trust, Craftsmanship & Production Scale
          </h2>
          <p className="text-sm text-slate-600">
            Serving institutional purchasers, wholesalers, and overseas boutique retailers with complete transparency and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(content?.whyUsCards || []).filter(c => !c.hidden).map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 text-amber-600 flex items-center justify-center mb-4 transition-colors">
                  {getIcon(card.iconName)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {card.link && (
                <button
                  type="button"
                  onClick={() => onNavigate(card.link!)}
                  className="mt-4 pt-3 border-t border-slate-100 inline-flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:text-amber-700 cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. WOMEN ARTISAN SECTION: FROM LEARNING A SKILL TO EARNING FROM IT */}
      <section className="bg-slate-100 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">
              Artisan Journey & Livelihood
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif-heading">
              &ldquo;From Learning a Skill to Earning From It&rdquo;
            </h2>
            <p className="text-sm text-slate-600">
              How our structured workshop programs translate traditional handcrafted knowledge into real commercial production opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content?.workflowSteps || []).filter(s => !s.hidden).map((step) => (
              <div
                key={step.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    {getIcon(step.iconName)}
                  </div>
                  <span className="text-2xl font-black text-slate-200">
                    #{step.stepNumber}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate('/our-artisans')}
              className="px-6 py-3 bg-[#0B1A30] hover:bg-[#152E54] text-amber-400 font-bold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Meet Our Skilled Artisans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. GOVERNMENT TENDER & INSTITUTIONAL PROCUREMENT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-linear-to-br from-[#0B1A30] to-[#16335C] rounded-3xl p-8 sm:p-12 text-white border-2 border-amber-400 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>All Govt. Tender &bull; Institutional Supply</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-heading text-white">
                Reliable Procurement Partner for Public & Corporate Institutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Jit Prime MPC Company provides structured supply capabilities for authentic Hasta Shilpa mementos, brass Dokra trophies, eco-friendly jute conference folders, and ceremonial gifts with complete GST compliance and technical verification.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#081526] p-3.5 rounded-xl border border-slate-700">
                  <span className="text-amber-400 font-bold text-xs block">Sample Approvals</span>
                  <span className="text-[11px] text-slate-400">Pre-production prototype sign-offs</span>
                </div>
                <div className="bg-[#081526] p-3.5 rounded-xl border border-slate-700">
                  <span className="text-amber-400 font-bold text-xs block">Custom Branding</span>
                  <span className="text-[11px] text-slate-400">Engraved brass plates & print</span>
                </div>
                <div className="bg-[#081526] p-3.5 rounded-xl border border-slate-700">
                  <span className="text-amber-400 font-bold text-xs block">Document Integrity</span>
                  <span className="text-[11px] text-slate-400">GST invoices & packing manifests</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right space-y-3">
              <button
                type="button"
                onClick={() => onNavigate('/government-institutional')}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>Tender & Institutional Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                Contact Monojit Dey: {phone}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INTERNATIONAL BUYERS SECTION PREVIEW */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-4 h-4" />
              <span>International Buyers & Global Boutiques</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-slate-900 font-serif-heading">
              Export-Ready Indian Craftsmanship
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We coordinate sample evaluations, export packaging, and freight documentation for international retailers and distributors. Notice: Shipping, duties, and delivery timelines are confirmed according to the product, destination, and agreed quotation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/international-buyers')}
            className="px-6 py-3 bg-[#0B1A30] hover:bg-[#152E54] text-white font-bold text-xs sm:text-sm rounded-xl shrink-0 transition-colors shadow-sm"
          >
            International Enquiries
          </button>
        </div>
      </section>

      {/* 10. TESTIMONIALS & CLIENT FEEDBACK */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider block">
              {currentLanguage === 'bn' ? 'গ্রাহক পর্যালোচনা ও মতামত' : 'Client Feedback & Reviews'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading">
              {currentLanguage === 'bn' 
                ? 'গ্রাহক ও প্রাতিষ্ঠানিক ক্রেতাদের অভিজ্ঞতা' 
                : 'Trusted by Cultural & Institutional Partners'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              {currentLanguage === 'bn'
                ? 'আমাদের খাঁটি পোড়ামাটির গহনা, হস্তশিল্প ও প্রাতিষ্ঠানিক সরবরাহ সম্পর্কে সম্মানিত ক্রেতাদের বাস্তব রিভিউ ও অভিজ্ঞতা।'
                : 'Authentic reviews from retail buyers, boutique owners, cultural organizers, and handicraft patrons.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="self-start md:self-auto px-5 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{currentLanguage === 'bn' ? 'মতামত বা রিভিউ লিখুন' : 'Write a Review'}</span>
          </button>
        </div>

        {testimonials.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 space-y-3">
            <p className="text-xs sm:text-sm">
              {currentLanguage === 'bn'
                ? 'এখনও কোনো রিভিউ দেওয়া হয়নি। প্রথম রিভিউটি দিতে ওপরের বাটনে ক্লিক করুন।'
                : 'No reviews yet. Be the first to share your feedback!'}
            </p>
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-600"
            >
              {currentLanguage === 'bn' ? 'প্রথম রিভিউ লিখুন' : 'Write First Review'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-amber-300 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-600 ml-1">
                        {t.rating || 5}/5
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{t.clientName}</span>
                    <span className="text-slate-500">
                      {[t.company, t.location].filter(Boolean).join(' • ') || 'Customer'}
                    </span>
                    {t.createdAt && (
                      <span className="text-[10px] text-slate-400 block">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {t.verifiedBuyer && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Writing Review */}
        <WriteReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onReviewSubmitted={(newRev) => {
            setTestimonials(prev => [newRev, ...prev]);
          }}
        />
      </section>

      {/* 11. FAQ ACCORDION */}
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10 space-y-2">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-heading">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map(faq => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 12. BOTTOM HIGH-CONVERSION BULK CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-linear-to-r from-[#0B1A30] via-[#142D52] to-[#0B1A30] rounded-3xl p-8 sm:p-12 text-center text-white border-2 border-amber-400 shadow-xl space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
              Direct Contact With Monojit Dey
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-heading">
              Ready to Order Authentic Handcrafted Products?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Request your custom wholesale quote or schedule a discussion with our Kolkata workshop team.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openBulkModal()}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Request Bulk Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Monojit Dey, I would like to inquire about bulk handcrafted products from Jit Prime MPC Company.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Monojit</span>
            </a>
          </div>

          <div className="text-xs text-slate-400 pt-4 border-t border-slate-800">
            Address: Belghoria, Nimta, Khudiram Pally, Near 42 Pally Club, Landmark - Harijon School, Kolkata - 700049, West Bengal, India.
          </div>
        </div>
      </section>

    </div>
  );
};

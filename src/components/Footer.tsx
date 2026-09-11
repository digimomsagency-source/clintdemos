import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  ExternalLink,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, categories } = useApp();

  const companyName = settings?.companyName || 'JIT PRIME MPC COMPANY';
  const ownerName = settings?.ownerName || 'MONOJIT DEY';
  const tagline = settings?.tagline || 'Your Trust Our Priority';
  const phone = settings?.phone || '+91 82405 85219';
  const email = settings?.email || 'monojitdey189@gmail.com';
  const fullAddress = settings?.fullAddress || 'Belghoria, Nimta, Khudiram Pally, Near 42 Pally Club, Landmark - Harijon School, Kolkata - 700049, West Bengal, India.';

  const handleNav = (route: string) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071324] text-slate-300 pt-16 pb-12 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Company & Visiting Card Core */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base tracking-wide uppercase">
                  {companyName}
                </h3>
                <p className="text-amber-400 text-xs font-semibold">
                  Owner: {ownerName}
                </p>
              </div>
            </div>

            <div className="inline-block bg-[#0B1A30] border border-amber-500/30 rounded-md px-3 py-1 text-xs text-amber-300 font-medium italic">
              &ldquo;{tagline}&rdquo;
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Connecting authentic Indian handcrafted products with bulk, institutional and international buyers while creating meaningful production and income opportunities for women artisans.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-[#0E223D] px-3 py-2 rounded-md border border-[#1A365D]">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>All Govt. Tender &bull; Hasta Shilpa</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('/')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('/about')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>About Us & Monojit Dey</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('/our-artisans')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Our Women Artisans</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('/products')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Product Catalogue</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('/bulk-orders')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bulk & Wholesale Orders</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('/government-institutional')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Govt. Tenders & Institutional</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('/training-livelihood')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Training & Livelihood</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('/international-buyers')} 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>International Buyers</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Craft Categories */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Hasta Shilpa Crafts
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleNav(`/products?category=${cat.id}`)}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-slate-300"
                  >
                    <span>&bull;</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => handleNav('/bulk-orders')}
                  className="text-amber-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Custom Production Enquiry</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact & Address */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Business Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-slate-300">
                  {fullAddress}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a 
                  href={`tel:${phone.replace(/\s+/g, '')}`} 
                  className="hover:text-amber-300 transition-colors font-medium text-white"
                >
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a 
                  href={`mailto:${email}`} 
                  className="hover:text-amber-300 transition-colors text-slate-300 break-all"
                >
                  {email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Monojit, I would like to inquire about bulk handcrafted products from Jit Prime MPC Company.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md transition-colors text-xs shadow-sm"
                >
                  <span>WhatsApp Business Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Policy Links */}
        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => handleNav('/legal/privacy-policy')} className="hover:text-amber-300 transition-colors">
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button type="button" onClick={() => handleNav('/legal/terms-and-conditions')} className="hover:text-amber-300 transition-colors">
              Terms & Conditions
            </button>
            <span>&bull;</span>
            <button type="button" onClick={() => handleNav('/legal/shipping-policy')} className="hover:text-amber-300 transition-colors">
              Shipping Policy
            </button>
            <span>&bull;</span>
            <button type="button" onClick={() => handleNav('/legal/returns-and-refund')} className="hover:text-amber-300 transition-colors">
              Returns & Refund Policy
            </button>
            <span>&bull;</span>
            <button type="button" onClick={() => handleNav('/legal/disclaimer')} className="hover:text-amber-300 transition-colors">
              Disclaimer
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNav('/admin')}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-amber-400 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Management</span>
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-6 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-500 space-y-1">
          <p>
            &copy; {new Date().getFullYear()} {companyName} &bull; Owner: {ownerName}. All Rights Reserved.
          </p>
          <p className="max-w-3xl mx-auto text-slate-500">
            Note: International shipping, duties, documentation and delivery timelines are confirmed according to product volume, destination country and agreed quotation. Production opportunities are linked to actual orders.
          </p>
        </div>
      </div>
    </footer>
  );
};

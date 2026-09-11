import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  ChevronDown, 
  ChevronRight, 
  GraduationCap,
  Package,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const { settings, currentLanguage, setLanguage, openBulkModal, isAdmin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const phone = settings?.phone || '+91 82405 85219';
  const companyName = settings?.companyName || 'JIT PRIME MPC COMPANY';
  const ownerName = settings?.ownerName || 'MONOJIT DEY';

  // Primary visible links (keeps header clean, compact, and never overflows)
  const primaryLinks = [
    { label: currentLanguage === 'bn' ? 'হোম' : 'Home', route: '/' },
    { label: currentLanguage === 'bn' ? 'প্রোডাক্টস' : 'Products', route: '/products' },
    { label: currentLanguage === 'bn' ? 'গ্যালারি' : 'Craft Gallery', route: '/gallery', isNew: true },
    { label: currentLanguage === 'bn' ? 'Learn & Earn' : 'Learn & Earn', route: '/training-livelihood', highlight: true },
    { label: currentLanguage === 'bn' ? 'বাল্ক অর্ডার' : 'Bulk Orders', route: '/bulk-orders' },
  ];

  // Secondary links grouped neatly in dropdown
  const secondaryLinks = [
    { label: currentLanguage === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us', route: '/about' },
    { label: currentLanguage === 'bn' ? 'আমাদের কারিগরবৃন্দ' : 'Our Artisans', route: '/our-artisans' },
    { label: currentLanguage === 'bn' ? 'সরকারি টেন্ডার ও প্রতিষ্ঠান' : 'Govt & Institutional', route: '/government-institutional' },
    { label: currentLanguage === 'bn' ? 'আন্তর্জাতিক ক্রেতা' : 'International Buyers', route: '/international-buyers' },
    { label: currentLanguage === 'bn' ? 'যোগাযোগ' : 'Contact Us', route: '/contact' },
  ];

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSecondaryActive = secondaryLinks.some(link => link.route === currentRoute);

  return (
    <header className="w-full sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* 1. Ultra-compact Top Notification Bar (Height: ~26px, No clutter) */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-medium text-amber-400">
              <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Govt. Tender &bull; Hasta Shilpa</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`} 
              className="inline-flex items-center gap-1 hover:text-white transition-colors text-slate-300"
            >
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-800 rounded px-1 py-0.5 text-[10px] gap-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  currentLanguage === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  currentLanguage === 'bn' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  currentLanguage === 'hi' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Admin link */}
            <button
              type="button"
              onClick={() => handleNav('/admin')}
              className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-colors ${
                isAdmin 
                  ? 'bg-emerald-700 text-white font-medium' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-2.5 h-2.5" />
              <span>{isAdmin ? 'Admin Panel' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Clean, Compact Height ~56px, Fits any resolution without overflowing) */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <button 
          type="button"
          onClick={() => handleNav('/')}
          className="text-left flex items-center gap-2.5 focus:outline-hidden group shrink-0"
        >
          <div className="w-9 h-9 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-amber-400 shadow-xs shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
              {companyName}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 font-normal">
              <span>{ownerName}</span>
              <span>&bull;</span>
              <span className="hidden sm:inline">Kolkata Handicrafts</span>
            </div>
          </div>
        </button>

        {/* Desktop Menu: Strictly formatted to NEVER overflow */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {primaryLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1 ${
                  isActive
                    ? 'text-slate-950 font-semibold bg-slate-100'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                } ${item.highlight ? 'text-amber-800 font-semibold' : ''}`}
              >
                {item.highlight && <GraduationCap className="w-3.5 h-3.5 text-amber-600" />}
                {item.route === '/gallery' && <ImageIcon className="w-3.5 h-3.5 text-slate-600" />}
                <span>{item.label}</span>
                {item.isNew && (
                  <span className="text-[9px] px-1 py-0.2 bg-amber-500 text-slate-950 font-bold rounded-xs ml-0.5">
                    NEW
                  </span>
                )}
              </button>
            );
          })}

          {/* More Dropdown for secondary pages */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1 ${
                isSecondaryActive
                  ? 'text-slate-950 font-semibold bg-slate-100'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <span>{currentLanguage === 'bn' ? 'অন্যান্য' : 'More'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {secondaryLinks.map((link) => {
                  const isActive = currentRoute === link.route;
                  return (
                    <button
                      key={link.route}
                      type="button"
                      onClick={() => handleNav(link.route)}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-slate-100 text-slate-950 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Primary Action Button (Right Side) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => openBulkModal()}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Package className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLanguage === 'bn' ? 'বাল্ক কোটেশন' : 'Get Bulk Quote'}</span>
          </button>
        </div>

        {/* Mobile menu trigger & Quick CTA */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => openBulkModal()}
            className="px-2.5 py-1.5 bg-slate-900 text-white font-medium text-[11px] rounded-md flex items-center gap-1"
          >
            <Package className="w-3 h-3 text-amber-400" />
            <span>Bulk Quote</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-md max-h-[85vh] overflow-y-auto">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Menu Navigation
          </div>
          
          {primaryLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                  isActive 
                    ? 'bg-slate-100 text-slate-950 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.highlight && <GraduationCap className="w-4 h-4 text-amber-600" />}
                  {item.route === '/gallery' && <ImageIcon className="w-4 h-4 text-slate-600" />}
                  <span>{item.label}</span>
                </div>
                {item.isNew && (
                  <span className="text-[9px] px-1 py-0.2 bg-amber-500 text-slate-950 font-bold rounded-xs">
                    NEW
                  </span>
                )}
              </button>
            );
          })}

          <div className="border-t border-slate-100 my-1 pt-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
              Company &amp; Institutional
            </div>
            {secondaryLinks.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNav(item.route)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                    isActive 
                      ? 'bg-slate-100 text-slate-950 font-semibold' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 mt-2 space-y-2">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); openBulkModal(); }}
              className="w-full py-2 bg-slate-900 text-white font-medium text-sm rounded-md shadow-xs text-center flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>Request Bulk Quote &amp; Order</span>
            </button>
            <div className="text-xs text-slate-500 px-2 pt-2 border-t border-slate-100">
              <p className="font-semibold text-slate-800">Jit Prime MPC Company</p>
              <p>Owner: Monojit Dey &bull; Phone: {phone}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

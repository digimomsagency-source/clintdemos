import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PujaBanner } from './components/PujaBanner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AIChatbot } from './components/AIChatbot';
import { BulkEnquiryModal } from './components/BulkEnquiryModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BulkOrdersPage } from './pages/BulkOrdersPage';
import { ArtisansPage } from './pages/ArtisansPage';
import { GovernmentInstitutionalPage } from './pages/GovernmentInstitutionalPage';
import { TrainingLivelihoodPage } from './pages/TrainingLivelihoodPage';
import { InternationalBuyersPage } from './pages/InternationalBuyersPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPageViewer } from './pages/LegalPageViewer';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';

function MainAppContent() {
  const { isAdmin, isAdminLoggedIn } = useApp();
  const isAuthorizedAdmin = !!(isAdmin || isAdminLoggedIn);
  const [route, setRoute] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setRoute(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching logic
  const renderRoute = () => {
    if (route === '/admin') {
      if (!isAuthorizedAdmin) {
        return <AdminLogin onSuccess={() => setRoute('/admin')} onCancel={() => navigate('/')} />;
      }
      return <AdminLayout onNavigate={navigate} />;
    }

    if (route === '/' || route === '') {
      return <HomePage onNavigate={navigate} />;
    }

    if (route === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (route === '/products') {
      return <ProductsPage onNavigate={navigate} />;
    }

    if (route === '/gallery') {
      return <GalleryPage onNavigate={navigate} />;
    }

    if (route.startsWith('/products/') || route.startsWith('/product/')) {
      const parts = route.split('/');
      const slugOrId = parts[parts.length - 1];
      return <ProductDetailPage productIdOrSlug={slugOrId} onNavigate={navigate} />;
    }

    if (route === '/bulk-orders') {
      return <BulkOrdersPage />;
    }

    if (route === '/artisans') {
      return <ArtisansPage onNavigate={navigate} />;
    }

    if (route === '/government-institutional') {
      return <GovernmentInstitutionalPage onNavigate={navigate} />;
    }

    if (route === '/training-livelihood') {
      return <TrainingLivelihoodPage />;
    }

    if (route === '/international-buyers') {
      return <InternationalBuyersPage onNavigate={navigate} />;
    }

    if (route === '/contact') {
      return <ContactPage />;
    }

    if (route.startsWith('/legal/')) {
      const slug = route.replace('/legal/', '');
      return <LegalPageViewer slug={slug} onNavigate={navigate} />;
    }

    // Default fallback
    return <HomePage onNavigate={navigate} />;
  };

  const isAdminView = route === '/admin' && isAuthorizedAdmin;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Top Banner & Public Navbar (hidden if inside admin workspace) */}
      {!isAdminView && (
        <>
          <PujaBanner onNavigate={navigate} />
          <Navbar currentRoute={route} onNavigate={navigate} />
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Footer (hidden if inside admin workspace) */}
      {!isAdminView && (
        <Footer onNavigate={navigate} />
      )}

      {/* Floating Action Controls & Modals */}
      {!isAdminView && (
        <>
          <FloatingWhatsApp />
          <AIChatbot onNavigate={navigate} />
        </>
      )}

      {/* Global B2B Bulk Quotation Modal */}
      <BulkEnquiryModal />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Package, 
  Clock, 
  MessageCircle, 
  Bot, 
  Share2, 
  CheckCircle2, 
  Layers, 
  Ruler, 
  Scale, 
  Palette,
  Truck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Product } from '../types';

interface ProductDetailPageProps {
  productIdOrSlug: string;
  onNavigate: (route: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productIdOrSlug,
  onNavigate
}) => {
  const { settings, openBulkModal, openChatWithContext } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await api.getProduct(productIdOrSlug);
        setProduct(data);
        setActiveImage(data.primaryImage);

        // Fetch related products
        if (data.category) {
          const prods = await api.getProducts({ category: data.category });
          setRelated(prods.filter(p => p.id !== data.id).slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productIdOrSlug]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3 max-w-7xl mx-auto px-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 font-semibold">Loading handcrafted product specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center px-4 space-y-4">
        <Package className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500">The requested product could not be located in the catalog.</p>
        <button
          type="button"
          onClick={() => onNavigate('/products')}
          className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg"
        >
          Back to Catalogue
        </button>
      </div>
    );
  }

  const phone = settings?.whatsappNumber || '+91 82405 85219';
  const allImages = [product.primaryImage, ...(product.galleryImages || [])].filter(Boolean);

  const whatsappMessage = encodeURIComponent(
    `Hello Monojit Dey, I am interested in placing a bulk order for: ${product.name} (SKU: ${product.sku}). MOQ: ${product.moq} pcs. Please share your wholesale price and delivery lead time.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      
      {/* Back link */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/products')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={activeImage || product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="bg-[#0B1A30]/90 text-amber-400 text-xs font-extrabold uppercase px-2.5 py-1 rounded shadow-xs">
                MOQ: {product.moq} pcs
              </span>
              {product.productionStatus && (
                <span className="bg-emerald-700/90 text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                  {product.productionStatus}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails row */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === img ? 'border-amber-500 shadow-md scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Order CTAs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
              <span>SKU: {product.sku}</span>
              <span>&bull;</span>
              <span>Category: {product.category}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-heading text-slate-950">
              {product.name}
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase block">
                Wholesale / Bulk Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {product.priceOnRequest ? "Price on Request" : `₹${product.bulkPrice || product.retailPrice}`}
                </span>
                {!product.priceOnRequest && (
                  <span className="text-xs text-slate-500 font-medium">per piece + GST</span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-bold uppercase block">
                Minimum Order Quantity
              </span>
              <span className="text-lg font-extrabold text-[#0B1A30]">
                {product.moq} Units
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => openBulkModal(product)}
              className="w-full py-3.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Wholesale Quotation for this Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Monojit Dey</span>
              </a>

              <button
                type="button"
                onClick={() => openChatWithContext(`I have a specific question about ${product.name} (SKU: ${product.sku}) regarding bulk customization and lead time.`, product)}
                className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-amber-600" />
                <span>Ask Jit Prime Assistant</span>
              </button>
            </div>
          </div>

          {/* Quick Specifications Table */}
          <div className="border-t border-slate-200 pt-6 space-y-3 text-xs sm:text-sm">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              Product Specifications & Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-600">
                <Palette className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Materials:</span>
                <strong className="text-slate-900 font-semibold">{product.materials?.join(', ') || 'Natural Clay & Organic Pigments'}</strong>
              </div>

              {product.dimensions && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Ruler className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Dimensions:</span>
                  <strong className="text-slate-900 font-semibold">{product.dimensions}</strong>
                </div>
              )}

              {product.weight && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Scale className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Approx Weight:</span>
                  <strong className="text-slate-900 font-semibold">{product.weight}</strong>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Production Lead Time:</span>
                <strong className="text-slate-900 font-semibold">{product.leadTime || '7 - 14 Days'}</strong>
              </div>
            </div>
          </div>

          {/* Craft Story */}
          {product.craftStory && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-1.5">
              <span className="text-amber-900 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                The Craft Story & Heritage
              </span>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                &ldquo;{product.craftStory}&rdquo;
              </p>
            </div>
          )}

          {/* Full description */}
          {product.fullDescription && (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900">Detailed Description</h4>
              <p className="whitespace-pre-line">{product.fullDescription}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-serif-heading text-slate-900">
            Related Handcrafted Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map(rel => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/products/${rel.slug || rel.id}`)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer p-3 group"
              >
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-slate-100 mb-3">
                  <img src={rel.primaryImage} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                  {rel.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <span>MOQ: {rel.moq} pcs</span>
                  <span className="font-bold text-slate-900">
                    {rel.priceOnRequest ? "On Request" : `₹${rel.bulkPrice || rel.retailPrice}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

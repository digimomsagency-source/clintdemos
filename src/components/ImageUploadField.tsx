import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  RefreshCw, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

interface SingleImageUploadProps {
  label?: string;
  helperText?: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: 'square' | 'wide' | 'avatar';
}

export const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  label,
  helperText,
  value,
  onChange,
  aspectRatio = 'wide'
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const res = await api.uploadFile(file);
      if (res.success && res.url) {
        onChange(res.url);
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  const aspectClass = 
    aspectRatio === 'square' ? 'aspect-square max-w-[200px]' :
    aspectRatio === 'avatar' ? 'w-24 h-24 rounded-full' :
    'aspect-video max-w-sm';

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}

      {error && (
        <div className="p-2 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {value ? (
        <div className="relative group rounded-xl border border-slate-200 bg-slate-50 overflow-hidden inline-block">
          <img
            src={value}
            alt="Preview"
            className={`${aspectClass} object-cover block`}
          />
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-md shadow-sm flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm"
              title="Delete Image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/40 rounded-xl p-5 text-center cursor-pointer transition-colors max-w-sm flex flex-col items-center justify-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-slate-800 block">
              {uploading ? 'Uploading from device...' : 'Click or Tap to Upload Image'}
            </span>
            <span className="text-slate-500 text-[11px]">
              Supports JPG, PNG, WEBP (Mobile, Tablet, PC)
            </span>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
};

interface MultipleImageUploadProps {
  label?: string;
  images: string[];
  primaryImage: string;
  onImagesChange: (images: string[]) => void;
  onPrimaryChange: (primaryUrl: string) => void;
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  label,
  images,
  primaryImage,
  onImagesChange,
  onPrimaryChange
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      const res = await api.uploadMultipleFiles(files);
      if (res.success && res.urls) {
        const updated = [...images, ...res.urls];
        onImagesChange(updated);
        if (!primaryImage && updated.length > 0) {
          onPrimaryChange(updated[0]);
        }
      } else {
        setError('Batch upload failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Multiple upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (urlToRemove: string) => {
    const updated = images.filter(u => u !== urlToRemove);
    onImagesChange(updated);
    if (primaryImage === urlToRemove) {
      onPrimaryChange(updated[0] || '');
    }
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onImagesChange(copy);
  };

  return (
    <div className="space-y-3">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}

      {error && (
        <div className="p-2 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of existing gallery images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((url, index) => {
          const isPrimary = url === primaryImage;
          return (
            <div
              key={url + index}
              className={`relative group rounded-xl border-2 overflow-hidden bg-slate-50 aspect-square ${
                isPrimary ? 'border-amber-500 shadow-md' : 'border-slate-200'
              }`}
            >
              <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              
              {isPrimary && (
                <span className="absolute top-1.5 left-1.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Primary</span>
                </span>
              )}

              {/* Hover actions overlay */}
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  {!isPrimary && (
                    <button
                      type="button"
                      onClick={() => onPrimaryChange(url)}
                      className="px-2 py-1 bg-amber-400 hover:bg-amber-500 text-slate-950 text-[10px] font-bold rounded shadow-xs flex items-center gap-1"
                    >
                      <Star className="w-3 h-3" />
                      <span>Set Primary</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(url)}
                    className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded shadow-xs ml-auto"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Reorder controls */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveImage(index, 'left')}
                    className="p-1 bg-white/80 hover:bg-white text-slate-800 rounded disabled:opacity-30"
                    title="Move left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-white font-semibold">
                    #{index + 1}
                  </span>
                  <button
                    type="button"
                    disabled={index === images.length - 1}
                    onClick={() => moveImage(index, 'right')}
                    className="p-1 bg-white/80 hover:bg-white text-slate-800 rounded disabled:opacity-30"
                    title="Move right"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add more button */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/40 rounded-xl aspect-square flex flex-col items-center justify-center gap-1.5 cursor-pointer p-3 text-center transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
            <Upload className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800">
            {uploading ? 'Uploading...' : 'Upload Images'}
          </span>
          <span className="text-[10px] text-slate-500 leading-tight">
            Select single or multiple files from device
          </span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFiles}
        className="hidden"
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, ArrowRight, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PujaBannerProps {
  onNavigate: (route: string) => void;
}

export const PujaBanner: React.FC<PujaBannerProps> = ({ onNavigate }) => {
  const { campaign, openBulkModal } = useApp();

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!campaign || !campaign.enabled || !campaign.showCountdown) return;

    const calculateTime = () => {
      const target = new Date(campaign.countdownDeadline).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [campaign]);

  if (!campaign || !campaign.enabled) return null;

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Headline & Info */}
        <div className="flex items-center gap-3.5 text-center lg:text-left">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 hidden sm:flex">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
              <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                Puja Festive Window
              </span>
              <span className="text-amber-300 text-xs font-semibold">
                {campaign.subtitle || 'Bulk Orders Open'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight font-serif-heading">
              {campaign.headline}
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              {campaign.supportingText}
            </p>
          </div>
        </div>

        {/* Countdown & CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
          {campaign.showCountdown && (
            <div className="flex items-center gap-1.5 bg-[#081424]/80 px-3 py-1.5 rounded-lg border border-amber-500/30">
              <Clock className="w-3.5 h-3.5 text-amber-400 mr-1" />
              <div className="text-center px-1">
                <span className="block text-sm font-extrabold text-amber-300 leading-none">
                  {timeLeft.days}
                </span>
                <span className="text-[9px] text-slate-400 uppercase">Days</span>
              </div>
              <span className="text-amber-400 text-xs">:</span>
              <div className="text-center px-1">
                <span className="block text-sm font-extrabold text-amber-300 leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase">Hrs</span>
              </div>
              <span className="text-amber-400 text-xs">:</span>
              <div className="text-center px-1">
                <span className="block text-sm font-extrabold text-amber-300 leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase">Min</span>
              </div>
              <span className="text-amber-400 text-xs">:</span>
              <div className="text-center px-1">
                <span className="block text-sm font-extrabold text-amber-300 leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-slate-400 uppercase">Sec</span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => openBulkModal()}
            className="px-4 py-2 bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
          >
            <span>{campaign.ctaText || 'Request Puja Bulk Quote'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

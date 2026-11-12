import React from 'react';
import { Search, ShieldCheck, CheckCircle2, MapPin, AlertCircle } from 'lucide-react';
import { CampusZoneId } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenReportModalWithType: (type: 'lost' | 'found') => void;
  totalActiveCount: number;
  proctorCustodyCount: number;
  reunitedCount: number;
  selectedZone: CampusZoneId;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenReportModalWithType,
  totalActiveCount,
  proctorCustodyCount,
  reunitedCount,
}) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/khalsa_campus_hero_1794247422225.jpg"
          alt="SGTB Khalsa College University of Delhi Campus"
          className="w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl">
          
          {/* College Sub-headline / Trust context */}
          <div className="text-xs sm:text-sm font-medium tracking-wider text-amber-400 uppercase mb-3">
            Sri Guru Tegh Bahadur Khalsa College · University of Delhi
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Campus Lost & Found Portal
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
            A centralized register for items misplaced across Jannat lawn, central library, labs, and canteen. Verify ownership and claim belongings safely through our student directory and proctorial office.
          </p>

          {/* Action CTAs and Live Campus Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by item, roll no, or location (e.g. boat airdopes, Jannat)..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onOpenReportModalWithType('lost')}
                className="flex-1 sm:flex-none px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap"
              >
                I Lost Something
              </button>
              <button
                onClick={() => onOpenReportModalWithType('found')}
                className="flex-1 sm:flex-none px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                I Found An Item
              </button>
            </div>
          </div>

          {/* Tabular Stats Strip */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
                {totalActiveCount}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Active Listings
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-amber-400">
                {proctorCustodyCount}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                In Proctor Custody
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-emerald-400">
                {reunitedCount}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Reunited Students
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

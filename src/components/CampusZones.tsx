import React from 'react';
import { CampusZoneId, Item } from '../types';
import { CAMPUS_ZONES } from '../data/initialData';
import { MapPin, Navigation, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface CampusZonesProps {
  items: Item[];
  selectedZone: CampusZoneId;
  onSelectZone: (zoneId: CampusZoneId) => void;
  onViewItems: () => void;
}

export const CampusZones: React.FC<CampusZonesProps> = ({
  items,
  selectedZone,
  onSelectZone,
  onViewItems,
}) => {
  // Count items per zone
  const getZoneCounts = (zoneId: CampusZoneId) => {
    const zoneItems = items.filter(it => it.campusZone === zoneId && it.status !== 'reunited');
    const lost = zoneItems.filter(it => it.type === 'lost').length;
    const found = zoneItems.filter(it => it.type === 'found').length;
    return { total: zoneItems.length, lost, found };
  };

  return (
    <div className="bg-slate-50 border-b border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              Interactive Campus Directory
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              SGTB Khalsa Campus Hotspots
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Select an area of the college campus to view all reported lost belongings or items held in safe custody by staff and student volunteers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectZone('all');
                onViewItems();
              }}
              className="text-xs font-semibold px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-200 transition-colors shadow-xs"
            >
              View All Campus Areas
            </button>
          </div>
        </div>

        {/* Visual Interactive Campus Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Graphical Campus Map Layout */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-900" />
                  <span className="text-xs font-bold uppercase text-slate-800">
                    SGTB Khalsa North Campus Layout Map
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  University of Delhi
                </span>
              </div>

              {/* Schematic Map Representation */}
              <div className="relative aspect-4/3 w-full bg-slate-900 rounded-xl overflow-hidden p-4 border border-slate-800 shadow-inner">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

                {/* Road Indicators */}
                <div className="absolute bottom-2 left-6 right-6 h-6 border-t border-dashed border-slate-700 flex items-center justify-center">
                  <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono">
                    Mall Road / University Enclave (Gate 1 & 2)
                  </span>
                </div>

                {/* Central Jannat Oval */}
                <div 
                  onClick={() => onSelectZone('jannat')}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-28 rounded-full border-2 cursor-pointer transition-all flex flex-col items-center justify-center p-2 text-center ${
                    selectedZone === 'jannat'
                      ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400 shadow-lg scale-105'
                      : 'bg-emerald-950/40 border-emerald-600/60 hover:bg-emerald-950/70'
                  }`}
                >
                  <span className="text-[11px] font-bold text-emerald-200">Jannat Lawn</span>
                  <span className="text-[9px] text-emerald-400 font-mono tabular-nums">
                    {getZoneCounts('jannat').total} active items
                  </span>
                </div>

                {/* Science Block (West) */}
                <button
                  onClick={() => onSelectZone('science_block')}
                  className={`absolute left-4 top-24 w-28 p-2 rounded-lg border text-left transition-all ${
                    selectedZone === 'science_block'
                      ? 'bg-blue-900 border-blue-400 ring-2 ring-blue-400'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-bold text-white truncate">Science Block</div>
                  <div className="text-[9px] text-blue-300 font-mono tabular-nums">
                    {getZoneCounts('science_block').total} items
                  </div>
                </button>

                {/* Central Library (North-West) */}
                <button
                  onClick={() => onSelectZone('central_library')}
                  className={`absolute left-10 top-4 w-32 p-2 rounded-lg border text-left transition-all ${
                    selectedZone === 'central_library'
                      ? 'bg-blue-900 border-blue-400 ring-2 ring-blue-400'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-bold text-white truncate">Central Library</div>
                  <div className="text-[9px] text-blue-300 font-mono tabular-nums">
                    {getZoneCounts('central_library').total} items
                  </div>
                </button>

                {/* Arts & Commerce (North Central) */}
                <button
                  onClick={() => onSelectZone('arts_commerce')}
                  className={`absolute left-1/2 -translate-x-1/2 top-4 w-36 p-2 rounded-lg border text-center transition-all ${
                    selectedZone === 'arts_commerce'
                      ? 'bg-blue-900 border-blue-400 ring-2 ring-blue-400'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-bold text-white truncate">Arts & Commerce Wing</div>
                  <div className="text-[9px] text-blue-300 font-mono tabular-nums">
                    {getZoneCounts('arts_commerce').total} items
                  </div>
                </button>

                {/* Auditorium & Seminar Hall (North East) */}
                <button
                  onClick={() => onSelectZone('auditorium_seminar')}
                  className={`absolute right-6 top-4 w-32 p-2 rounded-lg border text-right transition-all ${
                    selectedZone === 'auditorium_seminar'
                      ? 'bg-blue-900 border-blue-400 ring-2 ring-blue-400'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-bold text-white truncate">Auditorium & Seminar Hall</div>
                  <div className="text-[9px] text-blue-300 font-mono tabular-nums">
                    {getZoneCounts('auditorium_seminar').total} items
                  </div>
                </button>

                {/* Sports Ground (East) */}
                <button
                  onClick={() => onSelectZone('sports_ground')}
                  className={`absolute right-4 top-24 w-28 p-2 rounded-lg border text-right transition-all ${
                    selectedZone === 'sports_ground'
                      ? 'bg-amber-900 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-bold text-white truncate">Sports Ground</div>
                  <div className="text-[9px] text-amber-300 font-mono tabular-nums">
                    {getZoneCounts('sports_ground').total} items
                  </div>
                </button>

                {/* Canteen & Nescafe (South East) */}
                <button
                  onClick={() => onSelectZone('canteen_nescafe')}
                  className={`absolute right-8 bottom-12 w-32 p-2 rounded-lg border text-right transition-all ${
                    selectedZone === 'canteen_nescafe'
                      ? 'bg-blue-900 border-blue-400 ring-2 ring-blue-400'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-bold text-white truncate">Canteen & Nescafe</div>
                  <div className="text-[9px] text-blue-300 font-mono tabular-nums">
                    {getZoneCounts('canteen_nescafe').total} items
                  </div>
                </button>

                {/* Gate 1 & Proctor Office (South Center) */}
                <button
                  onClick={() => onSelectZone('gate1_security')}
                  className={`absolute left-1/2 -translate-x-1/2 bottom-12 w-40 p-2 rounded-lg border text-center transition-all ${
                    selectedZone === 'gate1_security'
                      ? 'bg-blue-900 border-blue-400 ring-2 ring-blue-400'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-bold text-white truncate">Gate 1 & Proctor Desk</div>
                  <div className="text-[9px] text-blue-300 font-mono tabular-nums">
                    {getZoneCounts('gate1_security').total} items
                  </div>
                </button>

                {/* Hostel & Gurudwara (South West) */}
                <button
                  onClick={() => onSelectZone('hostel_gurudwara')}
                  className={`absolute left-4 bottom-12 w-30 p-2 rounded-lg border text-left transition-all ${
                    selectedZone === 'hostel_gurudwara'
                      ? 'bg-blue-900 border-blue-400 ring-2 ring-blue-400'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-bold text-white truncate">Hostel & Gurudwara</div>
                  <div className="text-[9px] text-blue-300 font-mono tabular-nums">
                    {getZoneCounts('hostel_gurudwara').total} items
                  </div>
                </button>

              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Click any area above to inspect local listings</span>
              <span className="font-medium text-slate-700">
                Selected: {CAMPUS_ZONES.find(z => z.id === selectedZone)?.name || 'All Campus'}
              </span>
            </div>
          </div>

          {/* Right: Selected Zone Details & Fast Filter List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex-1">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Campus Zone Directory</span>
                <span className="text-xs text-slate-500 font-normal">{CAMPUS_ZONES.length} Designated Spots</span>
              </h3>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {CAMPUS_ZONES.map(z => {
                  const counts = getZoneCounts(z.id);
                  const isSelected = selectedZone === z.id;

                  return (
                    <div
                      key={z.id}
                      onClick={() => onSelectZone(z.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-900 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold truncate ${isSelected ? 'text-blue-950' : 'text-slate-900'}`}>
                            {z.shortName}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {z.description}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-mono tabular-nums text-slate-900">
                          {counts.total}
                        </span>
                        <div className="text-[10px] text-slate-500">
                          {counts.lost} lost · {counts.found} found
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={onViewItems}
                  className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Filter Listings by Selected Zone</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

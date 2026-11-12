import React from 'react';
import { FilterState, CategoryId, CampusZoneId } from '../types';
import { CATEGORIES, CAMPUS_ZONES } from '../data/initialData';
import { MapPin, ArrowUpDown, X } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  itemCounts: {
    all: number;
    lost: number;
    found: number;
    reunited: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  itemCounts,
}) => {
  const isFiltered =
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.zone !== 'all' ||
    filters.searchQuery !== '';

  const handleReset = () => {
    setFilters({
      type: 'all',
      category: 'all',
      zone: 'all',
      searchQuery: '',
      sortBy: 'newest',
    });
  };

  return (
    <div className="bg-white border-b border-slate-200 py-4 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Segmented status controls & Campus Zone Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Segmented Controls for Listing Type */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 overflow-x-auto">
            <button
              onClick={() => setFilters(prev => ({ ...prev, type: 'all' }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filters.type === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items ({itemCounts.all})
            </button>

            <button
              onClick={() => setFilters(prev => ({ ...prev, type: 'lost' }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filters.type === 'lost'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lost by Students ({itemCounts.lost})
            </button>

            <button
              onClick={() => setFilters(prev => ({ ...prev, type: 'found' }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filters.type === 'found'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Found on Campus ({itemCounts.found})
            </button>

            <button
              onClick={() => setFilters(prev => ({ ...prev, type: 'reunited' }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filters.type === 'reunited'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reunited Archive ({itemCounts.reunited})
            </button>
          </div>

          {/* Location & Sort dropdown controls */}
          <div className="flex items-center gap-3 flex-wrap">
            
            {/* Campus Zone select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <label htmlFor="zone-select" className="sr-only">Filter by zone</label>
              <select
                id="zone-select"
                value={filters.zone}
                onChange={(e) => setFilters(prev => ({ ...prev, zone: e.target.value as CampusZoneId }))}
                className="bg-transparent text-xs font-medium text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="all">All Campus Zones</option>
                {CAMPUS_ZONES.map(z => (
                  <option key={z.id} value={z.id}>{z.name}</option>
                ))}
              </select>
            </div>

            {/* Sort order select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as 'newest' | 'oldest' }))}
                className="bg-transparent text-xs font-medium text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
              </select>
            </div>

            {/* Reset Filters button */}
            {isFiltered && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1.5 rounded transition-colors"
                title="Reset all filters"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

          </div>

        </div>

        {/* Row 2: Category Bar (clean, horizontal scrollable) */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              filters.category === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            All Categories
          </button>

          {CATEGORIES.map(cat => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilters(prev => ({ ...prev, category: isSelected ? 'all' : cat.id }))}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-blue-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Item } from '../types';
import { CAMPUS_ZONES } from '../data/initialData';
import { Pin, Printer, MapPin, Calendar, ArrowRight } from 'lucide-react';

interface NoticeBoardViewProps {
  items: Item[];
  onSelectItem: (item: Item) => void;
  onPrintNotice: (item: Item) => void;
  onOpenReportModal: () => void;
}

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({
  items,
  onSelectItem,
  onPrintNotice,
  onOpenReportModal,
}) => {
  const activeItems = items.filter(it => it.status !== 'reunited');

  return (
    <div className="bg-slate-100 min-h-screen py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              Campus Bulletin Wall
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              SGTB Khalsa Notice Board Slips
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Virtual board mimicking the student bulletin outside Jannat & the Library. Print or generate printable notice cards for pinning on physical college boards.
            </p>
          </div>

          <button
            onClick={onOpenReportModal}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-xs"
          >
            + Post Notice Slip
          </button>
        </div>

        {/* Corkboard / Paper Grid Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeItems.map((item, index) => {
            const zone = CAMPUS_ZONES.find(z => z.id === item.campusZone);
            const isLost = item.type === 'lost';

            return (
              <div
                key={item.id}
                className="relative bg-amber-50/40 rounded-xl border border-amber-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Visual Pin */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-600 border-2 border-white shadow-xs flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>

                <div>
                  {/* Notice Slip Header */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-200/60 text-xs">
                    <span className={`font-black uppercase tracking-wider text-[11px] ${
                      isLost ? 'text-amber-800' : 'text-blue-900'
                    }`}>
                      {isLost ? 'Lost Notice' : 'Found Notice'}
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      {item.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectItem(item)}
                    className="text-base font-extrabold text-slate-900 mb-2 cursor-pointer hover:text-blue-900 transition-colors line-clamp-2"
                  >
                    {item.title}
                  </h3>

                  {/* Details */}
                  <p className="text-xs text-slate-700 mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-white/70 p-3 rounded-lg border border-amber-100">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="font-semibold text-slate-900">{zone?.shortName}</span>
                      <span className="text-slate-500">· {item.locationDetail}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono tabular-nums text-slate-500 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.date}</span>
                      {item.time && <span>({item.time} hrs)</span>}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                    {item.reportedBy.name}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPrintNotice(item)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-amber-100/60 rounded transition-colors"
                      title="Print Slip"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

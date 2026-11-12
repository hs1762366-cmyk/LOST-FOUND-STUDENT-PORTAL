import React from 'react';
import { Item } from '../types';
import { CAMPUS_ZONES, CATEGORIES } from '../data/initialData';
import { 
  MapPin, Calendar, CheckCircle2, ShieldAlert, ArrowRight, FileText,
  CreditCard, Laptop, BookOpen, Wallet, Key, Glasses, Backpack, Package
} from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onSelectItem: (item: Item) => void;
  onClaimItem: (item: Item) => void;
  onPrintNotice: (item: Item) => void;
}

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'id_cards':
      return CreditCard;
    case 'electronics':
      return Laptop;
    case 'academics':
      return BookOpen;
    case 'wallets_money':
      return Wallet;
    case 'keys':
      return Key;
    case 'accessories':
      return Glasses;
    case 'clothing_bags':
      return Backpack;
    default:
      return Package;
  }
};

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onSelectItem,
  onClaimItem,
  onPrintNotice,
}) => {
  const zone = CAMPUS_ZONES.find(z => z.id === item.campusZone);
  const category = CATEGORIES.find(c => c.id === item.category);
  const CategoryIcon = getCategoryIcon(item.category);

  const formattedDate = new Date(item.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden">
      <div className="p-5">
        {/* Top quiet metadata row */}
        <div className="flex items-center justify-between gap-2 text-xs mb-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span className={item.type === 'lost' ? 'text-amber-800 font-bold' : 'text-blue-900 font-bold'}>
              {item.type === 'lost' ? 'Reported Lost' : 'Reported Found'}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600 flex items-center gap-1">
              <CategoryIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>{category?.label || item.category}</span>
            </span>
          </div>

          <span className="font-mono text-slate-400 text-[11px] tabular-nums">
            {item.id}
          </span>
        </div>

        {/* Primary Title */}
        <h2
          onClick={() => onSelectItem(item)}
          className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
        >
          {item.title}
        </h2>

        {/* Location & SGTB Campus Zone */}
        <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-2.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-slate-800">
              {zone?.name || 'SGTB Khalsa Campus'}
            </span>
            <span className="text-slate-500 block text-[11px] mt-0.5 line-clamp-1">
              {item.locationDetail}
            </span>
          </div>
        </div>

        {/* Item Description Excerpt */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100/80 leading-relaxed">
          {item.description}
        </p>

        {/* Proctor custody or reunited indicator if applicable */}
        {item.status === 'deposited_with_proctor' && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-800 shrink-0" />
            <span className="truncate">In Proctorial Board Custody (Room 12)</span>
          </div>
        )}
        {item.status === 'reunited' && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Reunited with Student</span>
          </div>
        )}

        {/* Unboxed timestamp and reporter details */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 font-mono tabular-nums text-[11px]">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{formattedDate}</span>
            {item.time && <span>· {item.time}</span>}
          </div>

          <div className="truncate max-w-[140px] text-right text-[11px] font-medium text-slate-600">
            {item.reportedBy.isAnonymous ? 'Student' : item.reportedBy.name}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onPrintNotice(item)}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 py-1 px-1.5 rounded transition-colors"
          title="Print official college notice slip"
        >
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>Notice Slip</span>
        </button>

        <div className="flex items-center gap-2">
          {item.type === 'found' && item.status !== 'reunited' && (
            <button
              onClick={() => onClaimItem(item)}
              className="text-xs font-semibold px-2.5 py-1.5 bg-blue-900 text-white hover:bg-blue-800 rounded transition-colors whitespace-nowrap"
            >
              Claim Item
            </button>
          )}

          <button
            onClick={() => onSelectItem(item)}
            className="text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 px-2 py-1.5 rounded flex items-center gap-1 transition-colors whitespace-nowrap"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </article>
  );
};

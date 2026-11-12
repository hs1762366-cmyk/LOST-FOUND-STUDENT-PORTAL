import React, { useState } from 'react';
import { Item, ClaimRecord, StudentUser } from '../types';
import { CAMPUS_ZONES, CATEGORIES } from '../data/initialData';
import { 
  X, MapPin, Calendar, Clock, ShieldCheck, User, Mail, Phone, 
  HelpCircle, Sparkles, FileText, CheckCircle2, AlertTriangle, Copy, Check,
  CreditCard, Laptop, BookOpen, Wallet, Key, Glasses, Backpack, Package
} from 'lucide-react';

interface ItemDetailModalProps {
  item: Item | null;
  allItems: Item[];
  onClose: () => void;
  onClaimItem: (item: Item) => void;
  onPrintNotice: (item: Item) => void;
  onMarkReunited: (itemId: string) => void;
  currentUser?: StudentUser | null;
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

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  allItems,
  onClose,
  onClaimItem,
  onPrintNotice,
  onMarkReunited,
  currentUser,
}) => {
  const [copiedId, setCopiedId] = useState(false);

  if (!item) return null;

  const zone = CAMPUS_ZONES.find(z => z.id === item.campusZone);
  const category = CATEGORIES.find(c => c.id === item.category);
  const CategoryIcon = getCategoryIcon(item.category);

  const formattedDate = new Date(item.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Smart Match detection
  const potentialMatches = allItems.filter(other => {
    if (other.id === item.id) return false;
    if (other.type === item.type) return false; // Match lost with found and vice versa
    if (other.status === 'reunited') return false;

    // Same category or same zone or keyword overlap
    const sameCategory = other.category === item.category;
    const sameZone = other.campusZone === item.campusZone;
    const titleWords = item.title.toLowerCase().split(' ').filter(w => w.length > 3);
    const hasWordMatch = titleWords.some(w => other.title.toLowerCase().includes(w) || other.description.toLowerCase().includes(w));

    return sameCategory || (sameZone && hasWordMatch) || hasWordMatch;
  }).slice(0, 2);

  const copyRefId = () => {
    navigator.clipboard.writeText(item.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className={item.type === 'lost' ? 'font-bold text-amber-800' : 'font-bold text-blue-900'}>
              {item.type === 'lost' ? 'Lost Report' : 'Found Report'}
            </span>
            <span aria-hidden="true">·</span>
            <button
              onClick={copyRefId}
              className="font-mono text-slate-600 hover:text-slate-900 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors"
              title="Copy Reference ID"
            >
              <span>{item.id}</span>
              {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Title & Status */}
          <div className="mb-5">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <CategoryIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>{category?.label}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>SGTB Khalsa College, DU</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{item.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {item.title}
            </h1>
          </div>

          {/* Proctor Custody Alert Banner if applicable */}
          {item.status === 'deposited_with_proctor' && (
            <div className="mb-5 p-4 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-950">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-sm text-blue-900">
                    Officially Deposited in College Custody
                  </div>
                  <p className="text-blue-800/90 leading-relaxed">
                    {item.handoverCustodyDetail || 'Safely held at Proctorial Board Office (Room 12, Admin Block).'}
                  </p>
                  <div className="text-[11px] text-blue-700 font-medium pt-1">
                    Please visit between 09:30 AM – 04:30 PM with your College ID Card or DMRC Smart Card to verify and claim.
                  </div>
                </div>
              </div>
            </div>
          )}

          {item.status === 'reunited' && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-900">Successfully Reunited: </span>
                This item has already been verified and handed back to the rightful student.
              </div>
            </div>
          )}

          {/* Key Location & Time Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">Campus Area</span>
                <span className="font-semibold text-slate-900">{zone?.name}</span>
                <span className="text-slate-600 block mt-0.5">{item.locationDetail}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block">Reported Date & Time</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">{formattedDate}</span>
                {item.time && (
                  <span className="text-slate-600 block mt-0.5 font-mono tabular-nums">Around {item.time} hrs</span>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Item Description & Notes
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-slate-100">
              {item.description}
            </p>
          </div>

          {/* Security Verification Hint for Claimants */}
          {item.privateVerificationQuestion && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-slate-800 text-xs">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-950 mb-1">
                    Security Verification Question for Owner
                  </div>
                  <p className="text-amber-900 leading-relaxed italic">
                    "{item.privateVerificationQuestion}"
                  </p>
                  <p className="text-[11px] text-amber-800/80 mt-1.5">
                    When submitting your claim, provide the specific answer to this private question to substantiate your ownership.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reporter Information & Contact */}
          <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-white">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Reporter Information
            </h2>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-900">
                  {item.reportedBy.isAnonymous ? 'SGTB Khalsa Student (Anonymous)' : item.reportedBy.name}
                </span>
                {item.reportedBy.rollNo && (
                  <span className="text-slate-500 font-mono tabular-nums">({item.reportedBy.rollNo})</span>
                )}
              </div>

              <div className="text-slate-600 pl-5">
                Course: {item.reportedBy.course}
              </div>

              {!item.reportedBy.isAnonymous && (
                <div className="flex flex-wrap gap-4 pt-1 pl-5">
                  <a
                    href={`mailto:${item.reportedBy.email}`}
                    className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 hover:underline font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{item.reportedBy.email}</span>
                  </a>

                  {item.reportedBy.phone && (
                    <a
                      href={`tel:${item.reportedBy.phone}`}
                      className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-medium font-mono tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.reportedBy.phone}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submitted Claims Section */}
          {item.claims.length > 0 && (
            <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-900" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Registered Student Claim Tickets ({item.claims.length})
                  </h2>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  Room 12 Verification
                </span>
              </div>

              <div className="space-y-2.5">
                {item.claims.map(claim => (
                  <div key={claim.id} className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-bold text-blue-900">{claim.ticketId}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{claim.timestamp}</span>
                        <span aria-hidden="true">·</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          claim.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {claim.status === 'verified' ? 'Verified by Office' : 'Pending Verification'}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-slate-900 mt-1">
                        {claim.claimantName} ({claim.claimantRollNo})
                      </div>
                      <div className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        Proof: "{claim.proofDescription}"
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-500 font-mono">
                      Ticket #{claim.ticketId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Smart Match Suggestion Box */}
          {potentialMatches.length > 0 && (
            <div className="mb-6 p-4 rounded-xl bg-slate-900 text-white">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Campus Match Suggestions ({potentialMatches.length})</span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Our campus directory detected potential matching listing(s) in the same category or area:
              </p>
              <div className="space-y-2">
                {potentialMatches.map(m => (
                  <div key={m.id} className="p-2.5 rounded-lg bg-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">{m.title}</div>
                      <div className="text-[11px] text-slate-300">
                        {m.type === 'lost' ? 'Lost' : 'Found'} on {m.date} · {m.locationDetail}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        // open matched item
                      }}
                      className="text-amber-300 hover:underline text-xs shrink-0 ml-2"
                    >
                      Check Match
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onPrintNotice(item)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Print College Notice Slip</span>
            </button>

            <div className="flex items-center gap-2">
              {currentUser?.role === 'admin' && item.status !== 'reunited' && (
                <button
                  onClick={() => onMarkReunited(item.id)}
                  className="px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-300 flex items-center gap-1.5"
                  title="Official Proctorial Board Handover Sign-off"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Mark as Reunited (Admin)</span>
                </button>
              )}

              {item.type === 'found' && item.status !== 'reunited' && (
                <button
                  onClick={() => {
                    onClose();
                    onClaimItem(item);
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors shadow-xs"
                >
                  Claim This Item
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

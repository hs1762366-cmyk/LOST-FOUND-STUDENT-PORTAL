import React, { useRef } from 'react';
import { Item } from '../types';
import { CAMPUS_ZONES, CATEGORIES } from '../data/initialData';
import { X, Printer, Copy, Check } from 'lucide-react';

interface PrintNoticeModalProps {
  item: Item | null;
  onClose: () => void;
}

export const PrintNoticeModal: React.FC<PrintNoticeModalProps> = ({
  item,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  if (!item) return null;

  const zone = CAMPUS_ZONES.find(z => z.id === item.campusZone);
  const category = CATEGORIES.find(c => c.id === item.category);

  const formattedDate = new Date(item.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const copyNoticeText = () => {
    const text = `[SGTB KHALSA COLLEGE LOST & FOUND NOTICE]\n` +
      `TYPE: ${item.type.toUpperCase()}\n` +
      `ITEM: ${item.title}\n` +
      `REF ID: ${item.id}\n` +
      `DATE: ${formattedDate}\n` +
      `LOCATION: ${zone?.name} (${item.locationDetail})\n` +
      `DESCRIPTION: ${item.description}\n` +
      `CONTACT: ${item.reportedBy.name} (${item.reportedBy.email || item.reportedBy.phone})\n` +
      `PORTAL: https://sgtbkhalsa.du.ac.in/lost-and-found`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Header (Hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between print:hidden">
          <div className="text-xs font-semibold">
            College Bulletin Notice Slip Preview
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyNoticeText}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded flex items-center gap-1 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Notice</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div ref={printRef} className="p-8 bg-white text-slate-900 font-sans print:p-0">
          
          {/* Official Letterhead */}
          <div className="text-center pb-4 border-b-2 border-slate-900 mb-6">
            <div className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-0.5">
              University of Delhi
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950">
              Sri Guru Tegh Bahadur Khalsa College
            </h1>
            <div className="text-xs text-slate-600 font-medium mt-0.5">
              North Campus, University Enclave, Delhi – 110007 · Proctorial Board Desk
            </div>
          </div>

          {/* Large Notice Badge */}
          <div className="text-center mb-6">
            <div className={`inline-block px-4 py-1.5 rounded-sm font-black text-sm uppercase tracking-widest border-2 ${
              item.type === 'lost'
                ? 'border-amber-700 bg-amber-50 text-amber-900'
                : 'border-blue-900 bg-blue-50 text-blue-950'
            }`}>
              {item.type === 'lost' ? 'LOST BELONGING NOTICE' : 'FOUND ITEM NOTICE'}
            </div>
            <div className="text-xs font-mono text-slate-500 mt-1.5">
              Reference Log No: <span className="font-bold text-slate-900">{item.id}</span>
            </div>
          </div>

          {/* Core Item Information */}
          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <div className="text-xs uppercase font-bold text-slate-500 mb-0.5">Item Description</div>
              <div className="text-lg font-extrabold text-slate-950">{item.title}</div>
              <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                {item.description}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Campus Location</span>
                <span className="font-bold text-slate-900">{zone?.name}</span>
                <span className="text-slate-600 block mt-0.5">{item.locationDetail}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Date & Time</span>
                <span className="font-bold text-slate-900 font-mono">{formattedDate}</span>
                {item.time && (
                  <span className="text-slate-600 block mt-0.5 font-mono">Around {item.time} hrs</span>
                )}
              </div>
            </div>

            {item.handoverCustodyDetail && (
              <div className="p-3 bg-blue-50 rounded border border-blue-200 text-xs">
                <span className="font-bold text-blue-900 block uppercase text-[10px]">Official Custody</span>
                <span className="text-blue-950 font-medium">{item.handoverCustodyDetail}</span>
              </div>
            )}
          </div>

          {/* Contact & Verification Box */}
          <div className="p-4 border-2 border-dashed border-slate-300 rounded mb-6 text-xs">
            <div className="font-bold text-slate-900 uppercase text-[11px] mb-1">
              Contact / Claim Instructions:
            </div>
            <p className="text-slate-700 leading-relaxed">
              If this belongs to you, or if you have found it, please contact:
            </p>
            <div className="mt-2 font-semibold text-slate-900">
              {item.reportedBy.name} ({item.reportedBy.course})
            </div>
            <div className="text-slate-600 font-mono">
              Email: {item.reportedBy.email}
              {item.reportedBy.phone && <span> · Phone: {item.reportedBy.phone}</span>}
            </div>
            <div className="text-slate-500 text-[10px] mt-2 pt-2 border-t border-slate-200">
              Alternatively, visit Proctor Office (Room 12, Admin Block) during office hours (09:30 AM – 04:30 PM).
            </div>
          </div>

          {/* Footer Warning & Portal Stamp */}
          <div className="text-center text-[10px] text-slate-500 uppercase tracking-wider pt-2 border-t border-slate-200 flex items-center justify-between">
            <span>SGTB Khalsa College Lost & Found Register</span>
            <span className="font-mono">Notice Date: {new Date().toLocaleDateString('en-IN')}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

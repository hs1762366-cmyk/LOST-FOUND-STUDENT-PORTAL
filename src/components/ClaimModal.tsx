import React, { useState, useEffect } from 'react';
import { Item, ClaimRecord, StudentUser } from '../types';
import { SGTB_COURSES } from '../data/initialData';
import { X, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ClaimModalProps {
  item: Item | null;
  onClose: () => void;
  onSubmitClaim: (itemId: string, claim: Omit<ClaimRecord, 'id' | 'timestamp' | 'status'> & { ticketId: string }) => void;
  currentUser?: StudentUser | null;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  item,
  onClose,
  onSubmitClaim,
  currentUser,
}) => {
  if (!item) return null;

  const [name, setName] = useState(currentUser?.name || '');
  const [rollNo, setRollNo] = useState(currentUser?.rollNo || '');
  const [course, setCourse] = useState(currentUser?.course || SGTB_COURSES[0]);
  const [contact, setContact] = useState(currentUser?.email || currentUser?.phone || '');
  const [proofDescription, setProofDescription] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setRollNo(currentUser.rollNo);
      setCourse(currentUser.course);
      setContact(currentUser.email || currentUser.phone || '');
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rollNo || !contact || !proofDescription || !agreed) {
      return;
    }

    const ticketId = `TKT-KHL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedTicketId(ticketId);

    onSubmitClaim(item.id, {
      ticketId,
      claimantName: name,
      claimantRollNo: rollNo,
      claimantCourse: course,
      claimantContact: contact,
      proofDescription: proofDescription,
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">Ownership Claim Request</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Claim Ticket Successfully Logged</h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Your claim for <span className="font-semibold text-slate-900">"{item.title}"</span> has been registered with Ticket ID <span className="font-mono font-bold text-blue-900">{generatedTicketId}</span>.
            </p>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-left text-xs text-slate-700 mb-6 space-y-1.5">
              <div className="font-semibold text-slate-900">Next Steps:</div>
              {item.status === 'deposited_with_proctor' ? (
                <div>
                  Visit <span className="font-semibold text-slate-900">Room 12 (Admin Block) - Proctor Office</span> with your original College ID Card or DMRC Smart Card and quote your Ticket ID (<span className="font-mono font-bold text-blue-900">{generatedTicketId}</span>) to verify and claim your item.
                </div>
              ) : (
                <div>
                  The finder ({item.reportedBy.name}) and campus desk have been notified. Please quote Ticket ID (<span className="font-mono font-bold text-blue-900">{generatedTicketId}</span>) when verifying.
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-blue-900 text-white font-semibold text-xs rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Target Item Summary */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Claiming Item:</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{item.title}</div>
              <div className="text-slate-600 text-[11px] font-mono tabular-nums mt-0.5">
                Ref ID: {item.id} · Found at {item.locationDetail}
              </div>
            </div>

            {/* Security Verification Prompt */}
            {item.privateVerificationQuestion && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-950">
                <div className="font-semibold flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Finder's Verification Challenge:</span>
                </div>
                <p className="italic text-slate-800">
                  "{item.privateVerificationQuestion}"
                </p>
                <div className="text-[11px] text-slate-600 mt-1">
                  Please answer this accurately in the proof description below.
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jasmeet Kaur"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  College Roll No <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="e.g. 24/BCOM/088"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  SGTB Khalsa Course <span className="text-rose-500">*</span>
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  {SGTB_COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Phone / College Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+91 98XXX XXXXX or @sgtbkhalsa.du.ac.in"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Ownership Proof & Distinguishing Identifiers <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={proofDescription}
                onChange={(e) => setProofDescription(e.target.value)}
                placeholder="Describe specific scratches, contents, wallpaper, sticker, or answer the challenge question above..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* College Honor Code Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-blue-900 focus:ring-blue-600 cursor-pointer"
                />
                <span className="text-[11px] leading-tight">
                  I solemnly declare under SGTB Khalsa College student disciplinary rules that this property belongs to me. Submitting false claims is punishable under university code.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!agreed}
                className="px-4 py-2 bg-blue-900 disabled:opacity-50 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
              >
                Submit Ownership Claim
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

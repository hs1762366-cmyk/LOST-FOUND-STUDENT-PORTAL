import React from 'react';
import { Item, StudentUser } from '../types';
import { 
  ShieldCheck, Clock, MapPin, Phone, Mail, FileCheck, AlertCircle, 
  ArrowRight, Lock, ShieldAlert, UserX, CheckCircle2, Building2, LogIn
} from 'lucide-react';

interface ProctorDeskViewProps {
  items: Item[];
  onSelectItem: (item: Item) => void;
  onOpenReportModal: () => void;
  currentUser: StudentUser | null;
  onSwitchToAdminLogin: () => void;
  onReturnToAllItems: () => void;
  onVerifyClaim?: (itemId: string, ticketId: string, officerName: string) => void;
}

export const ProctorDeskView: React.FC<ProctorDeskViewProps> = ({
  items,
  onSelectItem,
  onOpenReportModal,
  currentUser,
  onSwitchToAdminLogin,
  onReturnToAllItems,
  onVerifyClaim,
}) => {
  const isAdmin = currentUser?.role === 'admin';

  const custodyItems = items.filter(it => it.status === 'deposited_with_proctor');
  const pendingClaims = React.useMemo(() => {
    const list: Array<{ item: Item; claim: any }> = [];
    items.forEach(it => {
      it.claims.forEach(cl => {
        if (cl.status === 'pending') {
          list.push({ item: it, claim: cl });
        }
      });
    });
    return list;
  }, [items]);

  // RESTRICTED ACCESS SCREEN FOR STUDENTS / GUESTS
  if (!isAdmin) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              Sri Guru Tegh Bahadur Khalsa College · Proctorial Board
            </div>
            
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Proctorial Desk: Administrative Access Only
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-6">
              The Proctorial Desk is reserved exclusively for authorized Proctorial Board Officers (Room 12, Admin Block). User and student accounts cannot access physical custody registers or verify claim tickets.
            </p>

            {/* Current Session Info */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs mb-6 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Your Current Account</span>
                <span className="font-semibold text-slate-900">
                  {currentUser ? `${currentUser.name}` : 'Guest Visitor'}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Account Privilege Level</span>
                <span className="font-semibold text-amber-700">
                  {currentUser ? `Student (${currentUser.rollNo})` : 'Public (Guest)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Required Authorization</span>
                <span className="font-semibold text-blue-900">
                  Proctorial Board Administrator (STAFF / PROCTOR)
                </span>
              </div>
            </div>

            {/* Practical Student Guidance */}
            <div className="text-left bg-blue-50/60 rounded-xl p-4 border border-blue-200/70 text-xs text-blue-950 mb-6 space-y-2">
              <div className="font-bold text-sm text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-800" />
                <span>How to Claim Deposited Belongings as a Student</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 leading-relaxed">
                <li>Browse <strong>All Belongings</strong> — items in custody are tagged with <em>"In Proctor Custody"</em>.</li>
                <li>Click <strong>Claim Item</strong> on your lost property to submit verification proof.</li>
                <li>Visit Room 12 Admin Block in person (09:30 AM – 04:30 PM) with your College ID card for physical handover.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onSwitchToAdminLogin}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-amber-300 font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>Switch to Admin Log In</span>
              </button>

              <button
                onClick={onReturnToAllItems}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-lg transition-colors"
              >
                Return to All Belongings
              </button>
            </div>

          </div>

          <div className="text-center mt-6 text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Room 12, Administrative Block Ground Floor · SGTB Khalsa College DU</span>
          </div>

        </div>
      </div>
    );
  }

  // AUTHORIZED ADMIN VIEW
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Session Authorization Banner */}
        <div className="mb-6 bg-blue-950 text-white rounded-xl p-4 border border-blue-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-blue-950 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <span>OFFICIAL PROCTORIAL DESK SESSION</span>
                <span aria-hidden="true">·</span>
                <span className="text-white/80 font-normal">Room 12 Admin Block</span>
              </div>
              <div className="text-sm font-extrabold text-white">
                Officer: {currentUser.name} ({currentUser.designation || 'Proctor In-Charge'}) · {currentUser.rollNo}
              </div>
            </div>
          </div>

          <div className="text-xs text-blue-200 sm:text-right shrink-0">
            <span className="inline-block bg-blue-900/80 px-2.5 py-1 rounded border border-blue-800 text-amber-300 font-medium">
              Authorized for Claim Verifications & Custody Release
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Physical Custody & Register Desk
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Official depository for items handed in by campus security guards, department lab attendants, and students. Authorized to verify roll numbers and release recovered belongings.
          </p>
        </div>

        {/* 2-Column Split: Custody Protocols & Physical Shelf View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Left: Official Photo & Office Logistics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden">
                <img
                  src="/src/assets/images/proctor_office_shelf_1794247438955.jpg"
                  alt="SGTB Khalsa College Proctorial Board Lost and Found Registry Shelf"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-blue-950 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-900" />
                  <span>Administrative Physical Custody Repository</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Numbered wooden token compartments in Room 12 where high-value electronics, wallets, spectacles, and official ID cards are catalogued and kept under lock.
                </p>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Office Location & Hours</h3>

              <div className="space-y-2.5 text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Proctor Office (Room 12)</span>
                    <span>Administrative Block Ground Floor (near Principal Office), SGTB Khalsa College, University of Delhi, North Campus</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Timings for Verification & Handover</span>
                    <span>Mon – Fri: 09:30 AM – 04:30 PM (Break: 01:30 – 02:00 PM)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Campus Desk Helpline</span>
                    <span className="font-mono tabular-nums">+91 11 2766 6641 / Intercom: 112</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Official Mail</span>
                    <span className="text-blue-900 font-medium">proctor@sgtbkhalsa.du.ac.in</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Custody Management & Pending Claims */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pending Claims Review Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Pending Student Claim Tickets
                  </h2>
                  <p className="text-xs text-slate-500">
                    Claims filed by students requiring verification of student ID and ownership proof
                  </p>
                </div>

                <span className="text-xs font-mono tabular-nums font-semibold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200">
                  {pendingClaims.length} Pending
                </span>
              </div>

              {pendingClaims.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                  <span>No claims currently pending approval. All tickets processed.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingClaims.map(({ item, claim }) => (
                    <div 
                      key={claim.ticketId}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/70 transition-colors space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-blue-900 font-bold">{claim.ticketId}</span>
                        <span className="text-slate-500">{claim.timestamp}</span>
                      </div>

                      <div className="font-bold text-slate-900 text-sm">
                        {item.title}
                      </div>

                      <div className="text-slate-600">
                        <span className="font-medium text-slate-800">Claimant: </span>
                        {claim.claimantName} ({claim.claimantRollNo} · {claim.claimantCourse})
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 italic">
                        &ldquo;{claim.proofDescription}&rdquo;
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-slate-500">Contact: {claim.claimantContact}</span>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectItem(item)}
                            className="px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded border border-slate-300 font-medium transition-colors"
                          >
                            Inspect Item
                          </button>

                          {onVerifyClaim && (
                            <button
                              onClick={() => onVerifyClaim(item.id, claim.ticketId, currentUser.name)}
                              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold transition-colors"
                            >
                              Approve Handover
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Currently In Custody Register */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Live Items Deposited in Room 12 Custody
                  </h2>
                  <p className="text-xs text-slate-500">
                    {custodyItems.length} items logged in physical register
                  </p>
                </div>

                <span className="text-xs font-mono tabular-nums font-semibold bg-blue-50 text-blue-900 px-2.5 py-1 rounded-md border border-blue-200">
                  {custodyItems.length} Active Records
                </span>
              </div>

              {custodyItems.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No items currently awaiting claim at the Proctor Office.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {custodyItems.map(item => (
                    <div 
                      key={item.id} 
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-mono text-slate-700 font-semibold">{item.id}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{item.date}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                          {item.handoverCustodyDetail || item.locationDetail}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="px-3 py-1.5 text-xs font-semibold bg-blue-900 text-white hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Manage & Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

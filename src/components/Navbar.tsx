import React from 'react';
import { PlusCircle, User, LogOut, LogIn, ShieldCheck, Lock } from 'lucide-react';
import { StudentUser } from '../types';

interface NavbarProps {
  onOpenReportModal: () => void;
  onOpenProctorDesk?: () => void;
  onOpenCampusMap?: () => void;
  onOpenNoticeBoard?: () => void;
  activeView: 'items' | 'map' | 'proctor' | 'notices';
  setActiveView: (view: 'items' | 'map' | 'proctor' | 'notices') => void;
  currentUser: StudentUser | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReportModal,
  activeView,
  setActiveView,
  currentUser,
  onLogout,
  onOpenLogin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Single element brand mark */}
        <button
          onClick={() => setActiveView('items')}
          className="text-left group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
        >
          <div className="w-8 h-8 rounded bg-blue-950 text-amber-400 font-bold flex items-center justify-center text-sm tracking-wider shadow-xs">
            KH
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group-hover:text-blue-900 transition-colors">
            SGTB Khalsa Lost & Found
          </span>
        </button>

        {/* Zone 2: Concise single-line nav links with hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveView('items')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeView === 'items'
                ? 'border-blue-900 text-blue-950 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            All Belongings
          </button>

          <button
            onClick={() => setActiveView('map')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeView === 'map'
                ? 'border-blue-900 text-blue-950 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Campus Hotspots
          </button>

          <button
            onClick={() => setActiveView('notices')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeView === 'notices'
                ? 'border-blue-900 text-blue-950 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Notice Slips
          </button>

          <button
            onClick={() => setActiveView('proctor')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 flex items-center gap-1.5 ${
              activeView === 'proctor'
                ? 'border-blue-900 text-blue-950 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Proctorial Desk</span>
            {currentUser?.role === 'admin' ? (
              <span className="bg-amber-400 text-blue-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-2xs">
                Admin
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                <Lock className="w-2.5 h-2.5 text-slate-400" />
                <span>Admin Only</span>
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Actions & Account Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Belonging</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <div className="text-xs font-bold text-slate-900 truncate max-w-[140px] flex items-center justify-end gap-1.5">
                  {currentUser.role === 'admin' ? (
                    <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-1.5 py-0.2 rounded border border-amber-300">
                      ADMIN
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-900 text-[9px] font-bold px-1.5 py-0.2 rounded border border-blue-200">
                      STUDENT
                    </span>
                  )}
                  <span>{currentUser.name}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {currentUser.rollNo}
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sign out"
                className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-xs"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline text-[11px] font-medium">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

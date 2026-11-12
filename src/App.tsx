import React, { useState, useEffect, useMemo } from 'react';
import { Item, ItemType, FilterState, CategoryId, CampusZoneId, ClaimRecord, StudentUser, UserRole } from './types';
import { INITIAL_ITEMS, CAMPUS_ZONES, CATEGORIES } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ClaimModal } from './components/ClaimModal';
import { ReportModal } from './components/ReportModal';
import { PrintNoticeModal } from './components/PrintNoticeModal';
import { CampusZones } from './components/CampusZones';
import { ProctorDeskView } from './components/ProctorDeskView';
import { NoticeBoardView } from './components/NoticeBoardView';
import { LoginPage } from './components/LoginPage';
import { Search, MapPin, Sparkles, PlusCircle, CheckCircle2, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'sgtb_khalsa_lost_found_v4';

export default function App() {
  // Authentication state (student vs admin)
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    try {
      const saved = localStorage.getItem('sgtb_khalsa_student_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user session', e);
    }
    return null;
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    return sessionStorage.getItem('sgtb_khalsa_guest_mode') === 'true';
  });

  const [loginInitialRole, setLoginInitialRole] = useState<UserRole>('student');

  const [items, setItems] = useState<Item[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 15) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load items from localStorage', e);
    }
    return INITIAL_ITEMS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist items to localStorage', e);
    }
  }, [items]);

  // Main navigation view
  const [activeView, setActiveView] = useState<'items' | 'map' | 'proctor' | 'notices'>('items');

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    category: 'all',
    zone: 'all',
    searchQuery: '',
    sortBy: 'newest',
  });

  // Modal States
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<Item | null>(null);
  const [selectedItemForClaim, setSelectedItemForClaim] = useState<Item | null>(null);
  const [selectedItemForNotice, setSelectedItemForNotice] = useState<Item | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalInitialType, setReportModalInitialType] = useState<ItemType>('lost');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsGuest(false);
    setLoginInitialRole('student');
    localStorage.removeItem('sgtb_khalsa_student_user');
    sessionStorage.removeItem('sgtb_khalsa_guest_mode');
    showToast('Logged out of SGTB Khalsa Portal');
  };

  const handleOpenLogin = (role: UserRole = 'student') => {
    setLoginInitialRole(role);
    setIsGuest(false);
    sessionStorage.removeItem('sgtb_khalsa_guest_mode');
  };

  const handleSwitchToAdminLogin = () => {
    setCurrentUser(null);
    setIsGuest(false);
    setLoginInitialRole('admin');
    localStorage.removeItem('sgtb_khalsa_student_user');
    sessionStorage.removeItem('sgtb_khalsa_guest_mode');
    showToast('Please sign in with Proctorial Board Admin credentials');
  };

  // Add Item Handler
  const handleAddItem = (newItem: Item) => {
    setItems(prev => [newItem, ...prev]);
    showToast(`Registered successfully with Ref ID: ${newItem.id}`);
  };

  // Submit Claim Handler
  const handleSubmitClaim = (
    itemId: string,
    claimData: Omit<ClaimRecord, 'id' | 'timestamp' | 'status'>
  ) => {
    const claimRecord: ClaimRecord = {
      id: `CLM-${Date.now().toString().slice(-4)}`,
      ...claimData,
      timestamp: new Date().toLocaleString('en-IN'),
      status: 'pending',
    };

    setItems(prev => prev.map(it => {
      if (it.id === itemId) {
        return {
          ...it,
          status: it.status === 'deposited_with_proctor' ? 'deposited_with_proctor' : 'in_verification',
          claims: [...it.claims, claimRecord],
        };
      }
      return it;
    }));

    showToast('Ownership claim ticket registered with college records.');
  };

  // Office Verify Claim Handler
  const handleVerifyClaim = (itemId: string, ticketId: string, officerName: string) => {
    setItems(prev => prev.map(it => {
      if (it.id === itemId) {
        return {
          ...it,
          status: 'reunited',
          claims: it.claims.map(c => {
            if (c.ticketId === ticketId) {
              return {
                ...c,
                status: 'verified',
                verifiedBy: officerName,
                verifiedAt: new Date().toLocaleString('en-IN'),
              };
            }
            return c;
          }),
        };
      }
      return it;
    }));

    showToast(`Ticket ${ticketId} authenticated by ${officerName}. Belonging released!`);
  };

  // Mark Reunited Handler
  const handleMarkReunited = (itemId: string) => {
    setItems(prev => prev.map(it => {
      if (it.id === itemId) {
        return {
          ...it,
          status: 'reunited',
        };
      }
      return it;
    }));

    if (selectedItemForDetail?.id === itemId) {
      setSelectedItemForDetail(prev => prev ? { ...prev, status: 'reunited' } : null);
    }

    showToast('Belonging marked as reunited!');
  };

  // Reset to initial demo records
  const handleResetData = () => {
    if (window.confirm('Reset lost and found database back to official campus demo records?')) {
      setItems(INITIAL_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITEMS));
      showToast('Database reset to official college records.');
    }
  };

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Type filter
      if (filters.type === 'lost' && item.type !== 'lost') return false;
      if (filters.type === 'found' && (item.type !== 'found' || item.status === 'reunited')) return false;
      if (filters.type === 'reunited' && item.status !== 'reunited') return false;
      if (filters.type === 'all' && item.status === 'reunited') {
        // In 'all', still show active items first, but keep reunited accessible via the reunited tab
      }

      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) return false;

      // Campus Zone filter
      if (filters.zone !== 'all' && item.campusZone !== filters.zone) return false;

      // Text Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesLoc = item.locationDetail.toLowerCase().includes(q);
        const matchesReporter = item.reportedBy.name.toLowerCase().includes(q);
        const matchesRoll = item.reportedBy.rollNo?.toLowerCase().includes(q) || false;
        const matchesId = item.id.toLowerCase().includes(q);

        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesReporter && !matchesRoll && !matchesId) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return b.createdAt - a.createdAt;
      }
      return a.createdAt - b.createdAt;
    });
  }, [items, filters]);

  // Counts for filter tabs
  const itemCounts = useMemo(() => {
    const lost = items.filter(i => i.type === 'lost' && i.status !== 'reunited').length;
    const found = items.filter(i => i.type === 'found' && i.status !== 'reunited').length;
    const reunited = items.filter(i => i.status === 'reunited').length;
    return {
      all: lost + found,
      lost,
      found,
      reunited,
    };
  }, [items]);

  const proctorCustodyCount = items.filter(i => i.status === 'deposited_with_proctor').length;

  // Show Student Login Page when someone opens the website (if not logged in and not guest)
  if (!currentUser && !isGuest) {
    return (
      <div className="relative">
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
        <LoginPage
          initialRole={loginInitialRole}
          onLogin={(user) => {
            setCurrentUser(user);
            localStorage.setItem('sgtb_khalsa_student_user', JSON.stringify(user));
            setIsGuest(false);
            sessionStorage.removeItem('sgtb_khalsa_guest_mode');
            const displayId = user.role === 'admin' ? (user.designation || `Staff ID ${user.rollNo}`) : user.rollNo;
            showToast(`Welcome back, ${user.name} (${displayId})`);
          }}
          onContinueAsGuest={() => {
            setIsGuest(true);
            sessionStorage.setItem('sgtb_khalsa_guest_mode', 'true');
            showToast('Browsing as Guest Visitor');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar
        onOpenReportModal={() => {
          setReportModalInitialType('lost');
          setIsReportModalOpen(true);
        }}
        onOpenProctorDesk={() => setActiveView('proctor')}
        onOpenCampusMap={() => setActiveView('map')}
        onOpenNoticeBoard={() => setActiveView('notices')}
        activeView={activeView}
        setActiveView={setActiveView}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={handleOpenLogin}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {activeView === 'items' && (
          <div>
            {/* Campus Hero Banner */}
            <Hero
              searchQuery={filters.searchQuery}
              setSearchQuery={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
              onOpenReportModalWithType={(type) => {
                setReportModalInitialType(type);
                setIsReportModalOpen(true);
              }}
              totalActiveCount={itemCounts.all}
              proctorCustodyCount={proctorCustodyCount}
              reunitedCount={itemCounts.reunited}
              selectedZone={filters.zone}
            />

            {/* Sticky Interactive Filter Bar */}
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              itemCounts={itemCounts}
            />

            {/* Items Grid View */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              {/* Section Subheader with Active Filter feedback */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-2">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {filters.type === 'lost' && 'Belongings Reported Lost'}
                    {filters.type === 'found' && 'Items Found on Campus'}
                    {filters.type === 'reunited' && 'Reunited Belongings Archive'}
                    {filters.type === 'all' && 'All Campus Belongings'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing <span className="font-mono font-semibold text-slate-900 tabular-nums">{filteredItems.length}</span> items
                    {filters.zone !== 'all' && (
                      <span> in {CAMPUS_ZONES.find(z => z.id === filters.zone)?.name}</span>
                    )}
                    {filters.category !== 'all' && (
                      <span> · {CATEGORIES.find(c => c.id === filters.category)?.label}</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setReportModalInitialType('lost');
                      setIsReportModalOpen(true);
                    }}
                    className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1 hover:underline"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Report a Lost Item</span>
                  </button>
                </div>
              </div>

              {/* Items Card Grid */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    No Matching Items Found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                    We couldn't find any listings matching your current filter criteria. You can post a new report or reset the filters.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setFilters({
                        type: 'all',
                        category: 'all',
                        zone: 'all',
                        searchQuery: '',
                        sortBy: 'newest'
                      })}
                      className="px-4 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
                    >
                      Clear All Filters
                    </button>
                    <button
                      onClick={() => {
                        setReportModalInitialType('lost');
                        setIsReportModalOpen(true);
                      }}
                      className="px-4 py-2 text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors"
                    >
                      File a New Report
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onSelectItem={(it) => setSelectedItemForDetail(it)}
                      onClaimItem={(it) => setSelectedItemForClaim(it)}
                      onPrintNotice={(it) => setSelectedItemForNotice(it)}
                    />
                  ))}
                </div>
              )}

            </section>
          </div>
        )}

        {/* Campus Map View */}
        {activeView === 'map' && (
          <CampusZones
            items={items}
            selectedZone={filters.zone}
            onSelectZone={(zoneId) => setFilters(prev => ({ ...prev, zone: zoneId }))}
            onViewItems={() => setActiveView('items')}
          />
        )}

        {/* Proctorial Custody Desk View */}
        {activeView === 'proctor' && (
          <ProctorDeskView
            items={items}
            currentUser={currentUser}
            onSelectItem={(it) => setSelectedItemForDetail(it)}
            onOpenReportModal={() => {
              setReportModalInitialType('found');
              setIsReportModalOpen(true);
            }}
            onSwitchToAdminLogin={handleSwitchToAdminLogin}
            onReturnToAllItems={() => setActiveView('items')}
            onVerifyClaim={handleVerifyClaim}
          />
        )}

        {/* Notice Board View */}
        {activeView === 'notices' && (
          <NoticeBoardView
            items={items}
            onSelectItem={(it) => setSelectedItemForDetail(it)}
            onPrintNotice={(it) => setSelectedItemForNotice(it)}
            onOpenReportModal={() => {
              setReportModalInitialType('lost');
              setIsReportModalOpen(true);
            }}
          />
        )}

      </main>

      {/* College Institutional Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800 text-xs">
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-blue-950 text-amber-400 font-bold flex items-center justify-center text-xs">
                  KH
                </div>
                <span className="font-bold text-sm tracking-tight text-white">
                  Sri Guru Tegh Bahadur Khalsa College
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Established in 1951, managed by DSGMC, constituent college of the University of Delhi. North Campus, University Enclave, Mall Road, Delhi – 110007.
              </p>
              <div className="text-slate-500 font-mono text-[11px]">
                Proctorial Board & Student Welfare Lost and Found Registry
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                Campus Hotspots
              </div>
              <ul className="space-y-1.5 text-slate-400">
                <li><button onClick={() => { setFilters(prev => ({ ...prev, zone: 'jannat' })); setActiveView('items'); }} className="hover:text-white transition-colors">Jannat Central Lawn</button></li>
                <li><button onClick={() => { setFilters(prev => ({ ...prev, zone: 'central_library' })); setActiveView('items'); }} className="hover:text-white transition-colors">Dr. Manmohan Singh Library</button></li>
                <li><button onClick={() => { setFilters(prev => ({ ...prev, zone: 'science_block' })); setActiveView('items'); }} className="hover:text-white transition-colors">Science Labs Complex</button></li>
                <li><button onClick={() => { setFilters(prev => ({ ...prev, zone: 'canteen_nescafe' })); setActiveView('items'); }} className="hover:text-white transition-colors">Canteen & Nescafe</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                Proctor Office Desk
              </div>
              <div className="text-slate-400 space-y-1">
                <div>Room 12, Admin Block</div>
                <div>Mon – Fri: 09:30 – 16:30 hrs</div>
                <div className="font-mono tabular-nums">+91 11 2766 6641</div>
                <div><a href="mailto:proctor@sgtbkhalsa.du.ac.in" className="text-amber-400 hover:underline">proctor@sgtbkhalsa.du.ac.in</a></div>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <div>
              © 2026 SGTB Khalsa College, University of Delhi. All campus rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleResetData}
                className="hover:text-slate-300 flex items-center gap-1 transition-colors"
                title="Reset local storage data"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo Records</span>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItemForDetail}
        allItems={items}
        currentUser={currentUser}
        onClose={() => setSelectedItemForDetail(null)}
        onClaimItem={(it) => setSelectedItemForClaim(it)}
        onPrintNotice={(it) => setSelectedItemForNotice(it)}
        onMarkReunited={handleMarkReunited}
      />

      {/* Claim Modal */}
      <ClaimModal
        item={selectedItemForClaim}
        onClose={() => setSelectedItemForClaim(null)}
        onSubmitClaim={handleSubmitClaim}
        currentUser={currentUser}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        initialType={reportModalInitialType}
        onClose={() => setIsReportModalOpen(false)}
        onAddItem={handleAddItem}
        currentUser={currentUser}
      />

      {/* Print Notice Modal */}
      <PrintNoticeModal
        item={selectedItemForNotice}
        onClose={() => setSelectedItemForNotice(null)}
      />

    </div>
  );
}

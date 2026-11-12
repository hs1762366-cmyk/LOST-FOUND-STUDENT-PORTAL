import React, { useState, useEffect } from 'react';
import { Item, ItemType, CategoryId, CampusZoneId, HandoverLocation, StudentUser } from '../types';
import { CATEGORIES, CAMPUS_ZONES, SGTB_COURSES } from '../data/initialData';
import { X, Check, AlertCircle, ShieldCheck } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: ItemType;
  onAddItem: (item: Item) => void;
  currentUser?: StudentUser | null;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  initialType = 'lost',
  onAddItem,
  currentUser,
}) => {
  if (!isOpen) return null;

  const [type, setType] = useState<ItemType>(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryId>('electronics');
  const [campusZone, setCampusZone] = useState<CampusZoneId>('jannat');
  const [locationDetail, setLocationDetail] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [privateVerificationQuestion, setPrivateVerificationQuestion] = useState('');
  const [handoverLocation, setHandoverLocation] = useState<HandoverLocation>('with_finder');
  const [handoverCustodyDetail, setHandoverCustodyDetail] = useState('');
  
  // Reporter fields prefilled from logged-in student
  const [reporterName, setReporterName] = useState(currentUser?.name || '');
  const [rollNo, setRollNo] = useState(currentUser?.rollNo || '');
  const [course, setCourse] = useState(currentUser?.course || SGTB_COURSES[0]);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setReporterName(currentUser.name);
      setRollNo(currentUser.rollNo);
      setCourse(currentUser.course);
      setEmail(currentUser.email);
      if (currentUser.phone) setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !locationDetail || !reporterName) {
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newItem: Item = {
      id: `KHL-2026-${randomSuffix}`,
      type,
      title,
      category,
      campusZone,
      locationDetail,
      date,
      time: time || undefined,
      description,
      privateVerificationQuestion: privateVerificationQuestion.trim() || undefined,
      status: handoverLocation === 'proctor_office' ? 'deposited_with_proctor' : 'active',
      reportedBy: {
        name: isAnonymous ? 'Anonymous Student' : reporterName,
        rollNo: isAnonymous ? undefined : rollNo,
        course,
        email: email || `${rollNo.replace('/', '.')}@sgtbkhalsa.du.ac.in`,
        phone: phone || undefined,
        isAnonymous,
      },
      handoverLocation: type === 'found' ? handoverLocation : undefined,
      handoverCustodyDetail: type === 'found' && handoverLocation !== 'with_finder'
        ? handoverCustodyDetail || `Deposited at ${handoverLocation.replace('_', ' ')}`
        : undefined,
      claims: [],
      createdAt: Date.now(),
    };

    onAddItem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Mode Toggle */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setType('lost')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                type === 'lost' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Report Lost Belonging
            </button>
            <button
              type="button"
              onClick={() => setType('found')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                type === 'found' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Report Found Item
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Notice Banner */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
            <div className="font-semibold text-slate-900 mb-0.5">
              {type === 'lost' ? 'Looking for a lost item at SGTB Khalsa?' : 'Found someone\'s misplaced item on campus?'}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {type === 'lost'
                ? 'Your report will be cross-referenced against items submitted by students, library staff, and the Proctorial Board.'
                : 'Thank you for your honesty. If you deposit it with the Proctor Office (Admin Block Room 12), select that below.'}
            </p>
          </div>

          {/* Item Title */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Item Title / Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Casio Scientific Calculator, Fastrack Reading Glasses, Green Botany File"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Category & Campus Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Campus Area / Zone <span className="text-rose-500">*</span>
              </label>
              <select
                value={campusZone}
                onChange={(e) => setCampusZone(e.target.value as CampusZoneId)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                {CAMPUS_ZONES.map(z => (
                  <option key={z.id} value={z.id}>{z.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Specific Location detail */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Exact Spot / Bench / Lab Room <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={locationDetail}
              onChange={(e) => setLocationDetail(e.target.value)}
              placeholder="e.g. Jannat lawn circular stone bench under the big tree, or Chemistry Lab 2 Bench 5"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Date {type === 'lost' ? 'Lost' : 'Found'} <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Approximate Time (Optional)
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Color, brand, markings, scratches, stickers, condition, contents..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Private Verification Question for Found items (or secret identifier for lost) */}
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
            <label className="block font-bold text-amber-950 mb-1">
              {type === 'found'
                ? 'Security Challenge Question for Claimants (Recommended)'
                : 'Secret Identifying Detail (Optional)'}
            </label>
            <input
              type="text"
              value={privateVerificationQuestion}
              onChange={(e) => setPrivateVerificationQuestion(e.target.value)}
              placeholder={
                type === 'found'
                  ? 'e.g. What is the lockscreen wallpaper? Or what sticker is on the back?'
                  : 'e.g. Scratched initials "HS" on the battery cover'
              }
              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
            <p className="text-[11px] text-amber-900/80 mt-1">
              {type === 'found'
                ? 'Only someone who actually owns the item will be able to answer this correctly.'
                : 'Helps proctor verify your identity against recovered logs.'}
            </p>
          </div>

          {/* Handover Location for Found items */}
          {type === 'found' && (
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2">
              <label className="block font-bold text-blue-950">
                Where is this item currently kept?
              </label>
              <select
                value={handoverLocation}
                onChange={(e) => setHandoverLocation(e.target.value as HandoverLocation)}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="with_finder">I currently have it with me</option>
                <option value="proctor_office">Deposited at Proctor Office (Admin Block Room 12)</option>
                <option value="library_desk">Deposited at Central Library Circulation Desk</option>
                <option value="gate1_security">Deposited at Gate No. 1 Guard Room</option>
                <option value="canteen_counter">Kept at College Canteen Billing Counter</option>
                <option value="science_lab_attendant">With Science Lab Attendant</option>
              </select>

              {handoverLocation !== 'with_finder' && (
                <input
                  type="text"
                  value={handoverCustodyDetail}
                  onChange={(e) => setHandoverCustodyDetail(e.target.value)}
                  placeholder="Custody note / Token # (e.g. Token #PR-108 given by Proctor staff)"
                  className="w-full px-3 py-1.5 border border-blue-200 rounded-lg focus:outline-none bg-white text-xs"
                />
              )}
            </div>
          )}

          {/* Reporter Information */}
          <div className="pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Your College Details</h3>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 text-[11px]">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-blue-900"
                />
                <span>Hide name publicly (Anonymous)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Jaspreet Singh"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">
                  College Roll No {!isAnonymous && <span className="text-rose-500">*</span>}
                </label>
                <input
                  type="text"
                  required={!isAnonymous}
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="e.g. 23/BCOM/104"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 mb-1 font-medium">
                  SGTB Khalsa Course
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  {SGTB_COURSES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Form Submit Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 font-bold text-white rounded-lg shadow-xs transition-colors ${
                type === 'lost' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-blue-900 hover:bg-blue-800'
              }`}
            >
              Publish {type === 'lost' ? 'Lost Belonging' : 'Found Item'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { StudentUser, UserRole } from '../types';
import { SGTB_COURSES } from '../data/initialData';
import { 
  ShieldCheck, User, Lock, Mail, GraduationCap, ArrowRight, 
  CheckCircle2, AlertCircle, Building2, KeyRound, ShieldAlert,
  BadgeCheck, School
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: StudentUser) => void;
  onContinueAsGuest: () => void;
  initialRole?: UserRole;
}

const DEMO_STUDENTS: StudentUser[] = [
  {
    name: 'Harpreet Singh',
    rollNo: '23/BCOM/149',
    course: 'B.Com (Hons)',
    email: 'harpreet.bcom23@sgtbkhalsa.du.ac.in',
    phone: '+91 98731 22890',
    role: 'student',
  },
  {
    name: 'Simran Kaur',
    rollNo: '24/BOT/031',
    course: 'B.Sc. (Hons) Botany',
    email: 'simran.kaur.bot@sgtbkhalsa.du.ac.in',
    phone: '+91 99580 14782',
    role: 'student',
  },
  {
    name: 'Prabhjot Kaur',
    rollNo: '24/ZOO/015',
    course: 'B.Sc. (Hons) Zoology',
    email: 'prabhjot.zoo24@sgtbkhalsa.du.ac.in',
    phone: '+91 97188 65432',
    role: 'student',
  },
];

const DEMO_ADMINS: StudentUser[] = [
  {
    name: 'Dr. G.S. Sodhi',
    rollNo: 'STAFF/PR/01',
    course: 'Proctorial Board',
    designation: 'Proctor In-Charge',
    email: 'proctor@sgtbkhalsa.du.ac.in',
    phone: '+91 11 2766 6641',
    role: 'admin',
  },
  {
    name: 'Prof. Gurmeet Singh',
    rollNo: 'STAFF/PR/02',
    course: 'Admin Block Custody',
    designation: 'Deputy Proctor (Room 12)',
    email: 'deputy.proctor@sgtbkhalsa.du.ac.in',
    phone: '+91 11 2766 6642',
    role: 'admin',
  },
];

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLogin, 
  onContinueAsGuest,
  initialRole = 'student' 
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>(initialRole);

  // Student Form State
  const [studentRollNo, setStudentRollNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentCourse, setStudentCourse] = useState(SGTB_COURSES[0]);
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  // Admin Form State
  const [adminId, setAdminId] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminDesignation, setAdminDesignation] = useState('Proctor In-Charge');
  const [adminEmail, setAdminEmail] = useState('proctor@sgtbkhalsa.du.ac.in');
  const [adminPasskey, setAdminPasskey] = useState('');

  const [error, setError] = useState<string | null>(null);

  // Auto-generate student email based on roll number
  const handleStudentRollChange = (val: string) => {
    setStudentRollNo(val);
    const cleaned = val.toLowerCase().replace(/[^a-z0-9]/g, '.');
    if (cleaned && !studentEmail.includes('@sgtbkhalsa.du.ac.in')) {
      setStudentEmail(`${cleaned}@sgtbkhalsa.du.ac.in`);
    }
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!studentRollNo.trim() || !studentName.trim()) {
      setError('Please provide your College Roll Number and Full Name.');
      return;
    }

    const newUser: StudentUser = {
      name: studentName.trim(),
      rollNo: studentRollNo.trim().toUpperCase(),
      course: studentCourse,
      email: studentEmail.trim() || `${studentRollNo.replace(/[^a-zA-Z0-9]/g, '.').toLowerCase()}@sgtbkhalsa.du.ac.in`,
      role: 'student',
    };

    onLogin(newUser);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!adminId.trim() || !adminName.trim()) {
      setError('Please provide your Official Staff / Proctor ID and Officer Name.');
      return;
    }

    const newUser: StudentUser = {
      name: adminName.trim(),
      rollNo: adminId.trim().toUpperCase(),
      course: 'Proctorial Board',
      designation: adminDesignation,
      email: adminEmail.trim() || 'proctor@sgtbkhalsa.du.ac.in',
      role: 'admin',
    };

    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      {/* College Branding Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-950 text-amber-400 shadow-md border-2 border-amber-400/40 mb-3">
          <span className="text-2xl font-black tracking-wider">KH</span>
        </div>
        
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Sri Guru Tegh Bahadur Khalsa College
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5">
          University of Delhi (North Campus)
        </p>

        <div className="mt-2 text-xs font-semibold text-slate-500">
          Campus Lost & Found Management System
        </div>
      </div>

      {/* Login Card */}
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-white py-6 px-6 sm:px-9 shadow-lg rounded-2xl border border-slate-200">
          
          {/* Role Tabs Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-5 border border-slate-200">
            <button
              type="button"
              onClick={() => { setActiveTab('student'); setError(null); }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'student'
                  ? 'bg-white text-blue-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-blue-900" />
              <span>Student / User Login</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('admin'); setError(null); }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-blue-950 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Proctorial Board Admin</span>
            </button>
          </div>

          {/* Role Description Notice */}
          {activeTab === 'student' ? (
            <div className="mb-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-950 flex items-start gap-2.5">
              <School className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Student Portal Access:</span> Report lost & found belongings, search campus listings, download notice slips, and raise ownership claim tickets.
                <span className="block text-[11px] text-blue-700 font-medium mt-0.5">
                  Note: Official Proctorial Desk custody management is restricted to administrative staff.
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Proctorial Board Admin Access:</span> Authorizes access to the Proctorial Desk (Room 12, Admin Block). Verify student ownership claims, sign off on handovers, and manage custody tokens.
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* ================= STUDENT LOGIN FORM ================= */}
          {activeTab === 'student' && (
            <form onSubmit={handleStudentSubmit} className="space-y-3.5">
              {/* Roll Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  College Roll Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentRollNo}
                  onChange={(e) => handleStudentRollChange(e.target.value)}
                  placeholder="e.g. 24/BCOM/149 or 23/CS/009"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Printed on your SGTB Khalsa College Student ID Card.
                </p>
              </div>

              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Student Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Harpreet Singh"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                />
              </div>

              {/* Course */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Academic Course / Department
                </label>
                <select
                  value={studentCourse}
                  onChange={(e) => setStudentCourse(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white"
                >
                  {SGTB_COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="student@sgtbkhalsa.du.ac.in"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Student Portal Password / PIN
                </label>
                <input
                  type="password"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                />
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Demo mode: Any password or PIN accepted.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <span>Log In as Student</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ================= ADMIN LOGIN FORM ================= */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-3.5">
              {/* Staff ID */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Proctorial Board / Staff ID <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="e.g. STAFF/PR/01 or PROCTOR/RM12"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Authorized credentials issued by SGTB Khalsa College Administration.
                </p>
              </div>

              {/* Officer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Officer Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="e.g. Dr. G.S. Sodhi"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Official Designation / Role
                </label>
                <select
                  value={adminDesignation}
                  onChange={(e) => setAdminDesignation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white"
                >
                  <option value="Proctor In-Charge">Proctor In-Charge (Room 12)</option>
                  <option value="Deputy Proctor">Deputy Proctor</option>
                  <option value="Proctorial Board Member">Proctorial Board Member</option>
                  <option value="Admin Block Custodian">Admin Block Custodian</option>
                  <option value="Head Security Officer (Gate 1)">Head Security Officer (Gate 1)</option>
                </select>
              </div>

              {/* Admin Email */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Official Staff Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="proctor@sgtbkhalsa.du.ac.in"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                />
              </div>

              {/* Security Passkey */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Admin Master Passkey / PIN
                </label>
                <input
                  type="password"
                  value={adminPasskey}
                  onChange={(e) => setAdminPasskey(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                />
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Demo mode: Any passkey or PIN is accepted for evaluation.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-950 hover:bg-blue-900 text-amber-300 font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Log In to Proctorial Desk (Admin)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Sign-in Section */}
          <div className="mt-5 pt-4 border-t border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
              {activeTab === 'student' ? 'Or Instant 1-Click Student Profiles' : 'Or Instant 1-Click Proctor Admin Profiles'}
            </div>

            <div className="space-y-1.5">
              {(activeTab === 'student' ? DEMO_STUDENTS : DEMO_ADMINS).map((acc) => (
                <button
                  key={acc.rollNo}
                  type="button"
                  onClick={() => onLogin(acc)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-colors flex items-center justify-between text-xs group ${
                    acc.role === 'admin'
                      ? 'border-amber-300/70 bg-amber-50/40 hover:bg-amber-100/60 hover:border-amber-400'
                      : 'border-slate-200 hover:border-blue-900 hover:bg-blue-50/50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-900 group-hover:text-blue-950 block">
                      {acc.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {acc.rollNo} · {acc.role === 'admin' ? acc.designation : acc.course}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold ${acc.role === 'admin' ? 'text-amber-900' : 'text-blue-800'} group-hover:underline`}>
                    {acc.role === 'admin' ? 'Sign in as Admin' : 'Sign in as Student'} &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Guest Access Alternative */}
          <div className="mt-4 text-center pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-2"
            >
              Continue as Guest Visitor (Browse Listings Only)
            </button>
          </div>

        </div>

        {/* Official College Footer Notice */}
        <div className="mt-5 text-center text-[11px] text-slate-500 space-y-1 max-w-sm mx-auto">
          <p className="flex items-center justify-center gap-1 font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Proctorial Board Office · Room 12, Admin Block</span>
          </p>
          <p>
            Sri Guru Tegh Bahadur Khalsa College, University of Delhi, Delhi 110007
          </p>
        </div>
      </div>
    </div>
  );
};

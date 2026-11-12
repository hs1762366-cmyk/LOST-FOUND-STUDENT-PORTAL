export type ItemType = 'lost' | 'found';

export type CategoryId = 
  | 'id_cards'
  | 'electronics'
  | 'wallets_money'
  | 'keys'
  | 'academics'
  | 'accessories'
  | 'clothing_bags'
  | 'other';

export interface CategoryDef {
  id: CategoryId;
  label: string;
  iconName: string;
}

export type CampusZoneId =
  | 'all'
  | 'jannat'
  | 'central_library'
  | 'canteen_nescafe'
  | 'science_block'
  | 'arts_commerce'
  | 'sports_ground'
  | 'auditorium_seminar'
  | 'gate1_security'
  | 'hostel_gurudwara';

export interface CampusZoneDef {
  id: CampusZoneId;
  name: string;
  shortName: string;
  description: string;
  coords: { x: number; y: number }; // percentage coordinates for interactive map
}

export type HandoverLocation = 
  | 'with_finder'
  | 'proctor_office'
  | 'library_desk'
  | 'gate1_security'
  | 'canteen_counter'
  | 'science_lab_attendant';

export type ItemStatus = 'active' | 'in_verification' | 'reunited' | 'deposited_with_proctor';

export interface ClaimRecord {
  id: string;
  ticketId: string;
  claimantName: string;
  claimantRollNo: string;
  claimantCourse: string;
  claimantContact: string;
  proofDescription: string;
  timestamp: string;
  status: 'pending' | 'verified' | 'rejected';
  verificationNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  category: CategoryId;
  campusZone: CampusZoneId;
  locationDetail: string;
  date: string;
  time?: string;
  description: string;
  privateVerificationQuestion?: string; // e.g. "What color sticker is on the back?"
  imageUrl?: string;
  status: ItemStatus;
  reportedBy: {
    name: string;
    rollNo?: string;
    course: string;
    email: string;
    phone?: string;
    isAnonymous?: boolean;
  };
  handoverLocation?: HandoverLocation;
  handoverCustodyDetail?: string; // e.g. "Token #PR-88 at Admin Block Room 12"
  claims: ClaimRecord[];
  createdAt: number;
}

export interface FilterState {
  type: 'all' | 'lost' | 'found' | 'reunited';
  category: 'all' | CategoryId;
  zone: CampusZoneId;
  searchQuery: string;
  sortBy: 'newest' | 'oldest';
}

export type UserRole = 'student' | 'admin';

export interface StudentUser {
  name: string;
  rollNo: string;
  course: string;
  email: string;
  phone?: string;
  role: UserRole;
  designation?: string;
}

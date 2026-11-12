import { CategoryDef, CampusZoneDef, Item } from '../types';

export const CATEGORIES: CategoryDef[] = [
  { id: 'id_cards', label: 'ID Cards & Metro Cards', iconName: 'CreditCard' },
  { id: 'electronics', label: 'Electronics & Audio', iconName: 'Laptop' },
  { id: 'academics', label: 'Files, Books & Notes', iconName: 'BookOpen' },
  { id: 'wallets_money', label: 'Wallets & Money', iconName: 'Wallet' },
  { id: 'keys', label: 'Keys & Keychains', iconName: 'Key' },
  { id: 'accessories', label: 'Bottles & Eyewear', iconName: 'Glasses' },
  { id: 'clothing_bags', label: 'Bags & Apparel', iconName: 'Backpack' },
  { id: 'other', label: 'Other Items', iconName: 'Package' },
];

export const CAMPUS_ZONES: CampusZoneDef[] = [
  {
    id: 'jannat',
    name: 'Jannat (Central Lawn)',
    shortName: 'Jannat Lawn',
    description: 'The central lawn & banyan tree seating area of SGTB Khalsa College.',
    coords: { x: 50, y: 50 }
  },
  {
    id: 'central_library',
    name: 'Dr. Manmohan Singh Central Library',
    shortName: 'Library & Reading Room',
    description: 'Ground floor stack area and 1st floor quiet reading hall.',
    coords: { x: 30, y: 35 }
  },
  {
    id: 'canteen_nescafe',
    name: 'College Canteen & Nescafe Kiosk',
    shortName: 'Canteen & Food Court',
    description: 'Outdoor benches, main canteen counter, and Amul/Nescafe pavilion.',
    coords: { x: 70, y: 65 }
  },
  {
    id: 'science_block',
    name: 'Science Complex (Physics/Chem Labs)',
    shortName: 'Science Labs & Block',
    description: 'Chemistry, Physics, Botany, and Zoology laboratories and lecture halls.',
    coords: { x: 25, y: 65 }
  },
  {
    id: 'arts_commerce',
    name: 'Arts & Commerce Wing (Main Quadrangle)',
    shortName: 'Main Academic Wing',
    description: 'Rooms 101 to 215, Department staff rooms, and ground quad corridor.',
    coords: { x: 45, y: 28 }
  },
  {
    id: 'sports_ground',
    name: 'Sports Ground & Cricket Pavilion',
    shortName: 'Sports Ground',
    description: 'Cricket pitch, athletics track, gym building, and pavilion stands.',
    coords: { x: 80, y: 30 }
  },
  {
    id: 'auditorium_seminar',
    name: 'Auditorium & Seminar Hall',
    shortName: 'Auditorium & Seminar Hall',
    description: 'College auditorium and seminar hall facilities.',
    coords: { x: 62, y: 22 }
  },
  {
    id: 'gate1_security',
    name: 'Gate No. 1 & Proctorial Desk',
    shortName: 'Gate 1 / Proctor Desk',
    description: 'Main college entrance near Mall Road / Metro road, Proctor Office Room 12.',
    coords: { x: 50, y: 88 }
  },
  {
    id: 'hostel_gurudwara',
    name: 'Guru Hargobind Hostel & Gurudwara Precinct',
    shortName: 'Hostel & Corridor',
    description: 'Boys hostel mess road and corridor adjacent to Gurudwara Sahib.',
    coords: { x: 15, y: 48 }
  }
];

export const INITIAL_ITEMS: Item[] = [
  {
    id: 'KHL-2026-0101',
    type: 'found',
    title: 'Casio Scientific Calculator FX-991ES Plus',
    category: 'electronics',
    campusZone: 'science_block',
    locationDetail: 'Left on Lab Bench #4 in Chemistry Physical Lab, 2nd Floor',
    date: '2026-11-08',
    time: '14:30',
    description: 'Casio scientific calculator with sliding hard cover. Has a tiny blue circular marker dot near the display screen. Battery intact.',
    privateVerificationQuestion: 'What initials or code is scratched lightly on the inside of the sliding protective cover?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'Rohan Sharma',
      rollNo: '24/CHEM/082',
      course: 'B.Sc. (Hons) Chemistry',
      email: 'rohan.sharma.che@sgtbkhalsa.du.ac.in',
      phone: '+91 98112 34567',
      isAnonymous: false
    },
    handoverLocation: 'proctor_office',
    handoverCustodyDetail: 'Deposited with Proctorial Board (Admin Block Room 12), Custody Token #PR-104',
    claims: [],
    createdAt: Date.now() - 86400000 * 1
  },
  {
    id: 'KHL-2026-0102',
    type: 'lost',
    title: 'SGTB Khalsa Student ID Card & Delhi Metro Smart Card',
    category: 'id_cards',
    campusZone: 'jannat',
    locationDetail: 'Near the stone circular bench under the banyan tree in Jannat lawn',
    date: '2026-11-09',
    time: '11:15',
    description: 'College laminate ID card in a navy blue Khalsa lanyard along with a standard turquoise DMRC Delhi Metro Card. Name on ID card: Harpreet Singh, B.Com (Hons).',
    privateVerificationQuestion: 'What is the last 4 digits printed on the Delhi Metro card back?',
    status: 'active',
    reportedBy: {
      name: 'Harpreet Singh',
      rollNo: '23/BCOM/149',
      course: 'B.Com (Hons)',
      email: 'harpreet.bcom23@sgtbkhalsa.du.ac.in',
      phone: '+91 98731 22890',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 3600000 * 4
  },
  {
    id: 'KHL-2026-0103',
    type: 'found',
    title: 'Black boAt Airdopes 141 Case with Earbuds',
    category: 'electronics',
    campusZone: 'central_library',
    locationDetail: 'Table 14 near the periodical section, 1st Floor Reading Room',
    date: '2026-11-07',
    time: '16:00',
    description: 'Matte black charging capsule case for boAt Airdopes with both earbuds inside. In fully working condition.',
    privateVerificationQuestion: 'What character sticker or scratch mark is visible on the bottom edge near the Type-C port?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'Library Front Desk',
      course: 'Central Library Staff',
      email: 'library@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'library_desk',
    handoverCustodyDetail: 'Kept with Mr. Jagdish at Library Circulation Desk (Ground Floor)',
    claims: [],
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'KHL-2026-0104',
    type: 'lost',
    title: 'Botany 2nd Year Practical Lab Manual & File',
    category: 'academics',
    campusZone: 'canteen_nescafe',
    locationDetail: 'Left on the corner round table near the Nescafe stall',
    date: '2026-11-09',
    time: '13:00',
    description: 'Thick hardbound light green spiral practical manual with handwritten index and plant tissue diagram charts for Semester III. Urgent, submission due on Thursday!',
    status: 'active',
    reportedBy: {
      name: 'Simran Kaur',
      rollNo: '24/BOT/031',
      course: 'B.Sc. (Hons) Botany',
      email: 'simran.kaur.bot@sgtbkhalsa.du.ac.in',
      phone: '+91 99580 14782',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 3600000 * 2
  },
  {
    id: 'KHL-2026-0105',
    type: 'found',
    title: 'Hero Splendor / Two-Wheeler Key with Brass Khanda Keychain',
    category: 'keys',
    campusZone: 'gate1_security',
    locationDetail: 'Dropped on the paved walkway between Gate 1 security guard booth and bike parking',
    date: '2026-11-08',
    time: '09:40',
    description: 'Black-headed bike key with distinct metallic brass Khanda sahib emblem keychain on a silver ring.',
    privateVerificationQuestion: 'Is there a small silver locker key attached on the same split ring?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'Campus Security Unit',
      course: 'Security Staff Gate 1',
      email: 'security@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'gate1_security',
    handoverCustodyDetail: 'Stored with Head Guard in Gate 1 Security Cabin (Logbook entry #41)',
    claims: [],
    createdAt: Date.now() - 86400000 * 1.5
  },
  {
    id: 'KHL-2026-0106',
    type: 'lost',
    title: 'Ray-Ban Black Frame Prescription Reading Spectacles',
    category: 'accessories',
    campusZone: 'arts_commerce',
    locationDetail: 'Room 206 during 11:30 AM Macroeconomics lecture',
    date: '2026-11-07',
    time: '12:20',
    description: 'Square matte black frame spectacles inside a textured dark brown protective case with cleaning cloth.',
    status: 'active',
    reportedBy: {
      name: 'Amanpreet Singh',
      rollNo: '23/ECO/018',
      course: 'B.A. (Hons) Economics',
      email: 'amanpreet.eco23@sgtbkhalsa.du.ac.in',
      phone: '+91 97118 45901',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 86400000 * 2.2
  },
  {
    id: 'KHL-2026-0107',
    type: 'found',
    title: 'Black Wildcraft College Backpack with Notebooks',
    category: 'clothing_bags',
    campusZone: 'auditorium_seminar',
    locationDetail: 'Row E, Seat 12 in the Auditorium after the student society orientation',
    date: '2026-11-06',
    time: '17:15',
    description: 'Black and grey Wildcraft backpack with two side mesh pockets. Contains DU semester registers and a blue umbrella.',
    privateVerificationQuestion: 'What title is written on the cover of the black register inside the middle pocket?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'Auditorium Caretaker Desk',
      course: 'Cultural Affairs Committee',
      email: 'auditorium@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'proctor_office',
    handoverCustodyDetail: 'Submitted to Proctor Office (Admin Block Room 12), Custody Token #PR-98',
    claims: [],
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'KHL-2026-0098',
    type: 'lost',
    title: 'Apple iPad Air (5th Gen, Space Gray) in Black Folio',
    category: 'electronics',
    campusZone: 'auditorium_seminar',
    locationDetail: 'Seminar Hall podium tech table',
    date: '2026-11-04',
    time: '15:10',
    description: 'iPad Air 10.9 inch in black magnetic folio case. Reunited with rightful student after verification of college registration and Apple ID passcode.',
    status: 'reunited',
    reportedBy: {
      name: 'Taranjeet Kaur',
      rollNo: '23/CS/009',
      course: 'B.Sc. (Hons) Computer Science',
      email: 'taranjeet.cs@sgtbkhalsa.du.ac.in',
      phone: '+91 98101 54321',
      isAnonymous: false
    },
    claims: [
      {
        id: 'CLM-01',
        ticketId: 'TKT-KHL-2026-0098',
        claimantName: 'Taranjeet Kaur',
        claimantRollNo: '23/CS/009',
        claimantCourse: 'B.Sc. (Hons) Computer Science',
        claimantContact: 'taranjeet.cs@sgtbkhalsa.du.ac.in',
        proofDescription: 'Device serial number matched invoice, unlocked in presence of Proctor In-Charge.',
        timestamp: '2026-11-05 11:30',
        status: 'verified',
        verificationNotes: 'Handed over by Dr. G.S. Sodhi (Proctorial Board) on verification of College ID.'
      }
    ],
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'KHL-2026-0109',
    type: 'found',
    title: 'Woodland Brown Leather Wallet with Cash & DU Library Card',
    category: 'wallets_money',
    campusZone: 'canteen_nescafe',
    locationDetail: 'Table near the main canteen billing counter',
    date: '2026-11-09',
    time: '12:45',
    description: 'Dark tan genuine leather tri-fold Woodland wallet. Contains DU Library barcode card and currency notes. Safely deposited in college custody.',
    privateVerificationQuestion: 'What name and barcode number is on the library card inside the clear ID slot?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'Canteen Staff Counter',
      course: 'College Canteen Supervisory',
      email: 'canteen@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'proctor_office',
    handoverCustodyDetail: 'Held in locked safe at Proctorial Board (Room 12 Admin Block), Token #PR-112',
    claims: [],
    createdAt: Date.now() - 3600000 * 3
  },
  {
    id: 'KHL-2026-0110',
    type: 'lost',
    title: 'Apple Pencil (2nd Generation) with White Silicone Grip',
    category: 'electronics',
    campusZone: 'central_library',
    locationDetail: '1st Floor quiet study cubicle #8',
    date: '2026-11-08',
    time: '17:30',
    description: 'White Apple Pencil with a subtle pastel blue silicone grip sleeve and fine point replacement tip. Magnetic flat edge is slightly scuffed.',
    privateVerificationQuestion: 'What three engraved letters appear near the magnetic connector end?',
    status: 'active',
    reportedBy: {
      name: 'Navjot Singh',
      rollNo: '23/MATH/045',
      course: 'B.Sc. (Hons) Mathematics',
      email: 'navjot.math@sgtbkhalsa.du.ac.in',
      phone: '+91 98991 87654',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 86400000 * 1.2
  },
  {
    id: 'KHL-2026-0111',
    type: 'found',
    title: 'OnePlus 65W Warp Power Adapter & Red Type-C Cable',
    category: 'electronics',
    campusZone: 'arts_commerce',
    locationDetail: 'Plugged into wall socket in Room 114 (Arts Block Ground Floor)',
    date: '2026-11-08',
    time: '15:15',
    description: 'Original white OnePlus Warp Charge 65W fast charger brick with signature thick red rubberized Type-C cable.',
    privateVerificationQuestion: 'Is there a small piece of transparent tape wrapped around one end of the red cord?',
    status: 'active',
    reportedBy: {
      name: 'Class Representative Room 114',
      course: 'B.A. (Hons) History',
      email: 'history.cr@sgtbkhalsa.du.ac.in',
      phone: '+91 98118 90234',
      isAnonymous: false
    },
    handoverLocation: 'with_finder',
    claims: [],
    createdAt: Date.now() - 86400000 * 1.4
  },
  {
    id: 'KHL-2026-0112',
    type: 'lost',
    title: 'Chemistry Lab Blue Practical Apron & Clear Safety Goggles',
    category: 'academics',
    campusZone: 'science_block',
    locationDetail: 'Science Block Ground Floor lockers outside Inorganic Chemistry Lab',
    date: '2026-11-09',
    time: '10:00',
    description: 'Standard cotton knee-length lab coat/apron in a transparent zip polybag with UV protective goggles. Has blue permanent marker lettering on collar.',
    privateVerificationQuestion: 'What name is written on the inner collar label of the lab coat?',
    status: 'active',
    reportedBy: {
      name: 'Gurleen Kaur',
      rollNo: '24/CHEM/019',
      course: 'B.Sc. (Hons) Chemistry',
      email: 'gurleen.chem24@sgtbkhalsa.du.ac.in',
      phone: '+91 98188 77665',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 3600000 * 5
  },
  {
    id: 'KHL-2026-0113',
    type: 'found',
    title: 'Honda Activa 6G Smart Key with Red Leather Pouch',
    category: 'keys',
    campusZone: 'gate1_security',
    locationDetail: 'Dropped on pavement in two-wheeler student parking stand near Gate 1',
    date: '2026-11-09',
    time: '08:50',
    description: 'Black Honda electronic smart key fob enclosed in a red stitched leather protective cover with silver carabiner clip.',
    privateVerificationQuestion: 'What metallic vehicle accessory is attached on the carabiner ring?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'Security Officer Satnam Singh',
      course: 'Campus Security Gate 1',
      email: 'security.gate1@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'gate1_security',
    handoverCustodyDetail: 'Deposited in Gate 1 Security Booth register log #58',
    claims: [],
    createdAt: Date.now() - 3600000 * 6
  },
  {
    id: 'KHL-2026-0114',
    type: 'lost',
    title: 'Silver Stainless Steel Milton Thermosteel 750ml Flask',
    category: 'accessories',
    campusZone: 'jannat',
    locationDetail: 'Left on the grassy verge on the west side of Jannat Lawn',
    date: '2026-11-07',
    time: '14:00',
    description: 'Brushed silver finish Milton Thermosteel bottle with black insulated carry pouch and strap. Slight dent on the base rim.',
    privateVerificationQuestion: 'What sticker is pasted on the side of the silver cylinder?',
    status: 'active',
    reportedBy: {
      name: 'Manpreet Singh',
      rollNo: '23/POL/062',
      course: 'B.A. (Hons) Political Science',
      email: 'manpreet.pol23@sgtbkhalsa.du.ac.in',
      phone: '+91 97177 34120',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 86400000 * 2.5
  },
  {
    id: 'KHL-2026-0115',
    type: 'found',
    title: 'SanDisk 64GB Ultra Dual USB Drive (Type-C & Type-A)',
    category: 'electronics',
    campusZone: 'science_block',
    locationDetail: 'Computer Lab 2, plugged into CPU port of Desktop #18',
    date: '2026-11-08',
    time: '16:45',
    description: 'Swivel metal and black plastic flash drive with dual connectors (USB Type-C on one side, standard USB-A on the other).',
    privateVerificationQuestion: 'What is the volume label or first project folder name on the flash drive?',
    status: 'active',
    reportedBy: {
      name: 'Computer Science Lab Attendant',
      course: 'CS Department Staff',
      email: 'cs.lab@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'science_lab_attendant',
    handoverCustodyDetail: 'With Mr. Ramesh (Lab Attendant, Computer Science Lab 2)',
    claims: [],
    createdAt: Date.now() - 86400000 * 1.1
  },
  {
    id: 'KHL-2026-0116',
    type: 'lost',
    title: 'Financial Management Textbook (I.M. Pandey, 12th Edition)',
    category: 'academics',
    campusZone: 'canteen_nescafe',
    locationDetail: 'Nescafe outdoor shaded circular table',
    date: '2026-11-08',
    time: '13:30',
    description: 'Thick blue cover textbook for B.Com (Hons) with sticky notes on Chapters 7 and 9. Student name and roll number penciled on inside title page.',
    privateVerificationQuestion: 'What name is penciled on the title page inside?',
    status: 'active',
    reportedBy: {
      name: 'Kavita Chawla',
      rollNo: '24/BCOM/053',
      course: 'B.Com (Hons)',
      email: 'kavita.bcom24@sgtbkhalsa.du.ac.in',
      phone: '+91 98103 44556',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 86400000 * 1.3
  },
  {
    id: 'KHL-2026-0117',
    type: 'found',
    title: 'Fastrack Navy Blue Water-Resistant Digital Sports Watch',
    category: 'accessories',
    campusZone: 'sports_ground',
    locationDetail: 'Cricket practice pitch boundary bench',
    date: '2026-11-07',
    time: '18:10',
    description: 'Dark blue silicone strap digital sports watch with stopwatch and alarm display. Screen in working order with minor hairline scratches.',
    privateVerificationQuestion: 'What color is the backlight when the light button is pressed?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'College Sports Coach Desk',
      course: 'Department of Physical Education',
      email: 'sports@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'proctor_office',
    handoverCustodyDetail: 'Safely deposited at Proctorial Office (Room 12 Admin Block), Token #PR-109',
    claims: [],
    createdAt: Date.now() - 86400000 * 2.3
  },
  {
    id: 'KHL-2026-0118',
    type: 'lost',
    title: 'Navy Blue SGTB Khalsa College Embroidered Hoodie (Size L)',
    category: 'clothing_bags',
    campusZone: 'auditorium_seminar',
    locationDetail: 'Backstage green room area of the Auditorium',
    date: '2026-11-06',
    time: '16:00',
    description: 'Official college society fleece hoodie in dark navy blue with golden embroidered crest on front chest and "KHALSA" written across back shoulders.',
    privateVerificationQuestion: 'What society name or nickname is embroidered on the right forearm sleeve?',
    status: 'active',
    reportedBy: {
      name: 'Fateh Singh',
      rollNo: '23/PUN/012',
      course: 'B.A. (Hons) Punjabi',
      email: 'fateh.pun23@sgtbkhalsa.du.ac.in',
      phone: '+91 98711 23456',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 86400000 * 3.2
  },
  {
    id: 'KHL-2026-0119',
    type: 'found',
    title: 'Gold-Rimmed Metal Aviator Sunglasses in Black Case',
    category: 'accessories',
    campusZone: 'jannat',
    locationDetail: 'Stone corridor bench leading towards Gurudwara walkway',
    date: '2026-11-09',
    time: '10:30',
    description: 'Classic teardrop aviator sunglasses with gold metallic frame and green tinted G-15 style lenses in a snap leatherette hard case.',
    privateVerificationQuestion: 'What optical brand or shop cloth is tucked inside the case?',
    status: 'active',
    reportedBy: {
      name: 'Gurinder Singh',
      rollNo: '24/PHY/039',
      course: 'B.Sc. (Hons) Physics',
      email: 'gurinder.phy@sgtbkhalsa.du.ac.in',
      phone: '+91 98990 12345',
      isAnonymous: false
    },
    handoverLocation: 'with_finder',
    claims: [],
    createdAt: Date.now() - 3600000 * 3.5
  },
  {
    id: 'KHL-2026-0120',
    type: 'lost',
    title: 'Set of 3 Godrej Keys with Gurudwara Sahib Memento Keychain',
    category: 'keys',
    campusZone: 'hostel_gurudwara',
    locationDetail: 'Between Guru Hargobind Hostel gate and mess lawn',
    date: '2026-11-08',
    time: '20:15',
    description: 'Ring of three brass cylinder keys with a round laser-engraved wooden pendant keychain depicting Gurudwara Sis Ganj Sahib.',
    privateVerificationQuestion: 'Is there an orange rubber tag attached to one of the keys?',
    status: 'active',
    reportedBy: {
      name: 'Ravinder Singh',
      rollNo: '23/BCOM/210',
      course: 'B.Com (Programme)',
      email: 'ravinder.hostel@sgtbkhalsa.du.ac.in',
      phone: '+91 98110 56789',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 86400000 * 1.3
  },
  {
    id: 'KHL-2026-0121',
    type: 'found',
    title: 'Noise ColorFit Pulse Smartwatch (Rose Gold Strap)',
    category: 'electronics',
    campusZone: 'auditorium_seminar',
    locationDetail: 'Seminar Hall second row front seating chair',
    date: '2026-11-07',
    time: '13:00',
    description: 'Square touchscreen fitness tracker with rose gold silicone magnetic band and magnetic charging pins on back. Powers on and displays battery gauge.',
    privateVerificationQuestion: 'What step count or target was shown on the default clock face?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'Seminar Hall Caretaker',
      course: 'Administrative Staff',
      email: 'proctor@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'proctor_office',
    handoverCustodyDetail: 'Held in Room 12 Admin Block Proctorial Office, Custody Token #PR-115',
    claims: [],
    createdAt: Date.now() - 86400000 * 2.1
  },
  {
    id: 'KHL-2026-0122',
    type: 'lost',
    title: 'Dell 65W Type-C Laptop Power Charger',
    category: 'electronics',
    campusZone: 'central_library',
    locationDetail: 'Central Library E-Resource Digital Reading Section',
    date: '2026-11-05',
    time: '14:20',
    description: 'Black genuine Dell 65W AC power adapter with USB Type-C output connector. Has a bright yellow piece of electrical insulation tape near the plug.',
    status: 'reunited',
    reportedBy: {
      name: 'Arjun Mehra',
      rollNo: '23/CS/033',
      course: 'B.Sc. (Hons) Computer Science',
      email: 'arjun.cs23@sgtbkhalsa.du.ac.in',
      phone: '+91 98188 34902',
      isAnonymous: false
    },
    claims: [
      {
        id: 'CLM-02',
        ticketId: 'TKT-KHL-2026-0122',
        claimantName: 'Arjun Mehra',
        claimantRollNo: '23/CS/033',
        claimantCourse: 'B.Sc. (Hons) Computer Science',
        claimantContact: 'arjun.cs23@sgtbkhalsa.du.ac.in',
        proofDescription: 'Yellow tape detail verified by Library Desk staff.',
        timestamp: '2026-11-06 10:15',
        status: 'verified',
        verificationNotes: 'Handed back by circulation desk attendant.'
      }
    ],
    createdAt: Date.now() - 86400000 * 4
  },
  {
    id: 'KHL-2026-0123',
    type: 'lost',
    title: 'Zoology Practical Dissection Kit & Stainless Steel Instruments',
    category: 'academics',
    campusZone: 'science_block',
    locationDetail: 'Zoology Laboratory 1, 1st Floor Science Block',
    date: '2026-11-09',
    time: '12:00',
    description: 'Black zippered leatherette case containing dissection scissors, forceps, needles, and scalpel handle for B.Sc. Life Sciences.',
    privateVerificationQuestion: 'What name or roll number is marked with white correction pen on the black zipper pouch?',
    status: 'active',
    reportedBy: {
      name: 'Prabhjot Kaur',
      rollNo: '24/ZOO/015',
      course: 'B.Sc. (Hons) Zoology',
      email: 'prabhjot.zoo24@sgtbkhalsa.du.ac.in',
      phone: '+91 97188 65432',
      isAnonymous: false
    },
    claims: [],
    createdAt: Date.now() - 3600000 * 2.5
  },
  {
    id: 'KHL-2026-0124',
    type: 'found',
    title: 'DMRC Delhi Metro Smart Card (Autoload Platinum)',
    category: 'id_cards',
    campusZone: 'gate1_security',
    locationDetail: 'Dropped near the college turnstiles at Gate 1',
    date: '2026-11-09',
    time: '11:40',
    description: 'Standard smart card for Delhi Metro Rail Corporation. Serial number visible on the back.',
    privateVerificationQuestion: 'What are the last 4 digits of the card serial number?',
    status: 'deposited_with_proctor',
    reportedBy: {
      name: 'Gate 1 Guard Post',
      course: 'Campus Security',
      email: 'security@sgtbkhalsa.du.ac.in',
      phone: '+91 11 2766 6641',
      isAnonymous: false
    },
    handoverLocation: 'gate1_security',
    handoverCustodyDetail: 'Held at Gate 1 Security Cabin (Security Guard Desk)',
    claims: [],
    createdAt: Date.now() - 3600000 * 1.5
  }
];

export const SGTB_COURSES = [
  'B.Com (Hons)',
  'B.Com (Programme)',
  'B.Sc. (Hons) Computer Science',
  'B.Sc. (Hons) Mathematics',
  'B.Sc. (Hons) Physics',
  'B.Sc. (Hons) Chemistry',
  'B.Sc. (Hons) Botany',
  'B.Sc. (Hons) Zoology',
  'B.Sc. (Hons) Electronics',
  'B.Sc. Physical Science',
  'B.Sc. Life Science',
  'B.A. (Hons) Economics',
  'B.A. (Hons) English',
  'B.A. (Hons) Punjabi',
  'B.A. (Hons) History',
  'B.A. (Hons) Political Science',
  'B.A. (Hons) Hindi',
  'B.A. Programme',
  'M.Com / Post Graduate',
  'Faculty / Staff Member'
];

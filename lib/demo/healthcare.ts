/**
 * Seeded sample data for the Healthcare Management System demo — spec
 * Section 6. Every record here is fabricated demo content for the sandboxed
 * environment; never real client/patient data. Deterministic (no Date.now /
 * randomness) so server and client render identically.
 */

export type HealthcareRole = "admin" | "doctor" | "frontdesk";

export const healthcareRoles: {
  id: HealthcareRole;
  label: string;
  description: string;
}[] = [
  {
    id: "admin",
    label: "Login as Admin",
    description: "Full view — operations, clinical activity, and revenue.",
  },
  {
    id: "doctor",
    label: "Login as Doctor",
    description: "Your schedule and patient records — no billing screens.",
  },
  {
    id: "frontdesk",
    label: "Login as Front Desk",
    description: "Appointments, patient intake, and invoicing.",
  },
];

export type AppointmentStatus = "scheduled" | "checked-in" | "completed";

export type DemoPatient = {
  id: string;
  name: string;
  age: number;
  gender: "F" | "M";
  phone: string;
  lastVisit: string;
  allergies: string;
  visits: { date: string; doctor: string; note: string }[];
};

export type DemoAppointment = {
  id: string;
  time: string;
  day: "Today" | "Tomorrow";
  patientId: string;
  doctor: string;
  reason: string;
  status: AppointmentStatus;
};

export type DemoInvoice = {
  id: string;
  patientId: string;
  service: string;
  amount: number;
  date: string;
  status: "paid" | "pending";
};

export const DEMO_DOCTOR = "Dr. Ayesha Raza";

export const demoPatients: DemoPatient[] = [
  {
    id: "P-1041",
    name: "Amina Khan",
    age: 34,
    gender: "F",
    phone: "(555) 014-2231",
    lastVisit: "3 days ago",
    allergies: "Penicillin",
    visits: [
      { date: "3 days ago", doctor: "Dr. Ayesha Raza", note: "Follow-up — blood pressure stable, continue current dosage." },
      { date: "6 weeks ago", doctor: "Dr. Ayesha Raza", note: "Initial consult — mild hypertension, started medication." },
    ],
  },
  {
    id: "P-1038",
    name: "David Chen",
    age: 47,
    gender: "M",
    phone: "(555) 014-8712",
    lastVisit: "1 week ago",
    allergies: "None recorded",
    visits: [
      { date: "1 week ago", doctor: "Dr. Omar Siddiqui", note: "Annual physical — labs ordered, results pending review." },
    ],
  },
  {
    id: "P-1027",
    name: "Fatima Noor",
    age: 29,
    gender: "F",
    phone: "(555) 014-5590",
    lastVisit: "2 weeks ago",
    allergies: "Sulfa drugs",
    visits: [
      { date: "2 weeks ago", doctor: "Dr. Ayesha Raza", note: "Migraine consult — prescribed abortive therapy, review in 1 month." },
      { date: "3 months ago", doctor: "Dr. Ayesha Raza", note: "General checkup — no concerns." },
    ],
  },
  {
    id: "P-1019",
    name: "Sarah Mitchell",
    age: 61,
    gender: "F",
    phone: "(555) 014-3308",
    lastVisit: "Today",
    allergies: "Latex",
    visits: [
      { date: "Today", doctor: "Dr. Ayesha Raza", note: "Diabetes review — HbA1c improved, diet plan reinforced." },
      { date: "3 months ago", doctor: "Dr. Ayesha Raza", note: "Quarterly diabetes review — adjusted metformin dosage." },
    ],
  },
  {
    id: "P-1015",
    name: "Bilal Ahmed",
    age: 52,
    gender: "M",
    phone: "(555) 014-9945",
    lastVisit: "1 month ago",
    allergies: "None recorded",
    visits: [
      { date: "1 month ago", doctor: "Dr. Omar Siddiqui", note: "Knee pain — referred to physiotherapy, X-ray clear." },
    ],
  },
  {
    id: "P-1009",
    name: "Elena Rodriguez",
    age: 41,
    gender: "F",
    phone: "(555) 014-7126",
    lastVisit: "2 months ago",
    allergies: "Aspirin",
    visits: [
      { date: "2 months ago", doctor: "Dr. Ayesha Raza", note: "Thyroid panel — within range, recheck in 6 months." },
    ],
  },
];

export const demoAppointments: DemoAppointment[] = [
  { id: "A-201", time: "09:00", day: "Today", patientId: "P-1019", doctor: "Dr. Ayesha Raza", reason: "Diabetes review", status: "completed" },
  { id: "A-202", time: "09:30", day: "Today", patientId: "P-1038", doctor: "Dr. Omar Siddiqui", reason: "Lab results review", status: "completed" },
  { id: "A-203", time: "10:15", day: "Today", patientId: "P-1041", doctor: "Dr. Ayesha Raza", reason: "Blood pressure follow-up", status: "checked-in" },
  { id: "A-204", time: "11:00", day: "Today", patientId: "P-1027", doctor: "Dr. Ayesha Raza", reason: "Migraine follow-up", status: "scheduled" },
  { id: "A-205", time: "11:45", day: "Today", patientId: "P-1015", doctor: "Dr. Omar Siddiqui", reason: "Physio progress check", status: "scheduled" },
  { id: "A-206", time: "14:30", day: "Today", patientId: "P-1009", doctor: "Dr. Ayesha Raza", reason: "Thyroid recheck", status: "scheduled" },
  { id: "A-207", time: "09:15", day: "Tomorrow", patientId: "P-1038", doctor: "Dr. Ayesha Raza", reason: "New patient consult", status: "scheduled" },
  { id: "A-208", time: "10:00", day: "Tomorrow", patientId: "P-1041", doctor: "Dr. Omar Siddiqui", reason: "Vaccination", status: "scheduled" },
];

export const demoInvoices: DemoInvoice[] = [
  { id: "INV-3120", patientId: "P-1019", service: "Consultation + HbA1c panel", amount: 145, date: "Today", status: "pending" },
  { id: "INV-3119", patientId: "P-1038", service: "Annual physical + labs", amount: 220, date: "1 week ago", status: "paid" },
  { id: "INV-3117", patientId: "P-1041", service: "Follow-up consultation", amount: 75, date: "3 days ago", status: "paid" },
  { id: "INV-3114", patientId: "P-1027", service: "Consultation + prescription", amount: 95, date: "2 weeks ago", status: "paid" },
  { id: "INV-3111", patientId: "P-1015", service: "X-ray + consultation", amount: 180, date: "1 month ago", status: "pending" },
];

export function getPatient(id: string): DemoPatient | undefined {
  return demoPatients.find((p) => p.id === id);
}

/* ------------------------------------------------------------------ *
 * Encounter workspace — mirrors the guided visit flow of the real
 * clinical platform: vitals → history → note → orders → codes → checkout.
 * ------------------------------------------------------------------ */

export type EncounterStepId =
  | "vitals"
  | "history"
  | "note"
  | "orders"
  | "codes"
  | "checkout";

export const encounterSteps: { id: EncounterStepId; label: string }[] = [
  { id: "vitals", label: "Vitals" },
  { id: "history", label: "History review" },
  { id: "note", label: "Clinical note" },
  { id: "orders", label: "Orders" },
  { id: "codes", label: "Diagnosis & codes" },
  { id: "checkout", label: "Checkout" },
];

/** The patient in the demo encounter (checked in on today's schedule). */
export const ENCOUNTER_PATIENT_ID = "P-1041";

export const demoVitals = [
  { label: "Blood pressure", value: "138/86", unit: "mmHg", flag: "high" },
  { label: "Heart rate", value: "74", unit: "bpm", flag: "normal" },
  { label: "Temperature", value: "98.4", unit: "°F", flag: "normal" },
  { label: "Weight", value: "168", unit: "lb", flag: "normal" },
  { label: "O₂ saturation", value: "98", unit: "%", flag: "normal" },
] as const;

export const demoHistory = {
  problems: [
    { name: "Essential hypertension", status: "Active", since: "6 weeks ago" },
    { name: "Seasonal allergic rhinitis", status: "Active", since: "2 years" },
  ],
  medications: [
    { name: "Lisinopril 10mg", detail: "Once daily", status: "Active" },
    { name: "Cetirizine 10mg", detail: "As needed", status: "Active" },
  ],
  allergies: [{ name: "Penicillin", detail: "Rash", severity: "Moderate" }],
};

/**
 * Ambient-scribe simulation. In the real platform the visit audio is
 * transcribed and a draft note is generated into the clinic's own template,
 * with patient identifiers stripped before anything reaches the model.
 */
export const demoTranscriptLines = [
  "Good to see you again. How have you been since we started the medication?",
  "Better overall. The headaches have mostly stopped, maybe one last week.",
  "Any dizziness, especially standing up quickly?",
  "A little the first few days, but that settled down.",
  "Have you been able to check your pressure at home?",
  "Yes, mostly around 135 over 85 in the mornings.",
  "That's moving the right direction. Let's keep the current dose and recheck in six weeks.",
];

export const demoGeneratedNote = {
  subjective:
    "Patient returns for follow-up of recently diagnosed hypertension. Reports improvement in headaches since starting therapy, with a single episode in the past week. Mild orthostatic dizziness in the first days of treatment, since resolved. Home readings averaging approximately 135/85 in the mornings. Reports good medication adherence.",
  objective:
    "Blood pressure 138/86, heart rate 74, temperature 98.4°F, oxygen saturation 98% on room air. Patient appears well, in no acute distress.",
  assessment:
    "Essential hypertension, improving on current therapy. Home readings trending toward goal. No adverse effects limiting treatment.",
  plan: "Continue lisinopril 10mg daily. Continue home blood pressure monitoring with morning readings. Reduce dietary sodium. Return in six weeks for reassessment; sooner if readings exceed 160/100 or symptoms recur.",
};

export type DemoOrder = {
  id: string;
  type: "Lab" | "Imaging" | "Referral";
  name: string;
  priority: "Routine" | "Urgent" | "STAT";
};

export const demoOrders: DemoOrder[] = [
  { id: "O-501", type: "Lab", name: "Basic metabolic panel", priority: "Routine" },
  { id: "O-502", type: "Lab", name: "Lipid panel", priority: "Routine" },
];

export const demoOrderCatalog: DemoOrder[] = [
  { id: "O-601", type: "Lab", name: "HbA1c", priority: "Routine" },
  { id: "O-602", type: "Lab", name: "Thyroid panel (TSH)", priority: "Routine" },
  { id: "O-603", type: "Imaging", name: "Chest X-ray, 2 views", priority: "Routine" },
  { id: "O-604", type: "Referral", name: "Cardiology consultation", priority: "Routine" },
];

export type DemoCode = {
  code: string;
  description: string;
  kind: "ICD-10" | "CPT";
  /** True when the code was proposed by the documentation assistant. */
  suggested?: boolean;
  rationale?: string;
};

export const demoSuggestedCodes: DemoCode[] = [
  {
    code: "I10",
    description: "Essential (primary) hypertension",
    kind: "ICD-10",
    suggested: true,
    rationale: "Assessment documents hypertension under active management.",
  },
  {
    code: "99214",
    description: "Office visit, established patient, moderate complexity",
    kind: "CPT",
    suggested: true,
    rationale:
      "Follow-up with medication management and reassessment documented.",
  },
  {
    code: "J30.2",
    description: "Other seasonal allergic rhinitis",
    kind: "ICD-10",
    suggested: true,
    rationale: "Active problem on the chart; not addressed at this visit.",
  },
];

/** Eligibility response shape mirrors a real-time payer verification. */
export const demoEligibility = {
  payer: "Northwind Health (demo payer)",
  plan: "PPO Select",
  status: "Active",
  network: "In network",
  copay: 30,
  coinsurance: "20%",
  deductibleTotal: 1500,
  deductibleMet: 1500,
  outOfPocketMax: 4000,
  outOfPocketMet: 820,
};

export type DemoClaim = {
  id: string;
  patientId: string;
  serviceDate: string;
  codes: string;
  charged: number;
  status: "draft" | "ready" | "submitted" | "paid";
};

export const demoClaims: DemoClaim[] = [
  {
    id: "CLM-4412",
    patientId: "P-1019",
    serviceDate: "Today",
    codes: "99214, E11.9",
    charged: 145,
    status: "ready",
  },
  {
    id: "CLM-4409",
    patientId: "P-1038",
    serviceDate: "1 week ago",
    codes: "99395, Z00.00",
    charged: 220,
    status: "paid",
  },
  {
    id: "CLM-4405",
    patientId: "P-1027",
    serviceDate: "2 weeks ago",
    codes: "99213, G43.909",
    charged: 95,
    status: "submitted",
  },
];

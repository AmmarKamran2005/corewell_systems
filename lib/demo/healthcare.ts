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

/**
 * Seeded sample data for the Education Management System demo — spec
 * Section 6. All records are fabricated demo content. Deterministic —
 * no Date.now / randomness.
 */

export type EducationRole = "admin" | "teacher" | "registrar";

export const educationRoles: {
  id: EducationRole;
  label: string;
  description: string;
}[] = [
  {
    id: "admin",
    label: "Login as Admin",
    description: "The whole school — admissions, attendance, and grades.",
  },
  {
    id: "teacher",
    label: "Login as Teacher",
    description: "Your class — take attendance and view the gradebook.",
  },
  {
    id: "registrar",
    label: "Login as Registrar",
    description: "Admissions pipeline and student records — no grades.",
  },
];

export const DEMO_CLASS = "Grade 6 — Blue";
export const DEMO_TEACHER = "Ms. Sana Tariq";

export type AttendanceStatus = "present" | "absent" | "late";

export type DemoStudent = {
  id: string;
  name: string;
  className: string;
  guardian: string;
  phone: string;
  attendance: AttendanceStatus;
  grades: { subject: string; score: number }[];
};

export type ApplicantStage = "inquiry" | "application" | "interview" | "enrolled";

export type DemoApplicant = {
  id: string;
  name: string;
  appliedFor: string;
  stage: ApplicantStage;
  submitted: string;
};

export const applicantStageLabels: Record<ApplicantStage, string> = {
  inquiry: "Inquiry",
  application: "Application received",
  interview: "Interview scheduled",
  enrolled: "Enrolled",
};

export const demoStudents: DemoStudent[] = [
  {
    id: "S-2201",
    name: "Hassan Ali",
    className: DEMO_CLASS,
    guardian: "Imran Ali",
    phone: "(555) 022-1180",
    attendance: "present",
    grades: [
      { subject: "Math", score: 86 },
      { subject: "Science", score: 91 },
      { subject: "English", score: 78 },
    ],
  },
  {
    id: "S-2202",
    name: "Maryam Shah",
    className: DEMO_CLASS,
    guardian: "Sadia Shah",
    phone: "(555) 022-4471",
    attendance: "present",
    grades: [
      { subject: "Math", score: 94 },
      { subject: "Science", score: 88 },
      { subject: "English", score: 90 },
    ],
  },
  {
    id: "S-2203",
    name: "Ethan Brooks",
    className: DEMO_CLASS,
    guardian: "Laura Brooks",
    phone: "(555) 022-9034",
    attendance: "late",
    grades: [
      { subject: "Math", score: 71 },
      { subject: "Science", score: 79 },
      { subject: "English", score: 84 },
    ],
  },
  {
    id: "S-2204",
    name: "Zoya Ahmed",
    className: DEMO_CLASS,
    guardian: "Nadeem Ahmed",
    phone: "(555) 022-6612",
    attendance: "absent",
    grades: [
      { subject: "Math", score: 89 },
      { subject: "Science", score: 95 },
      { subject: "English", score: 87 },
    ],
  },
  {
    id: "S-2205",
    name: "Daniel Osei",
    className: DEMO_CLASS,
    guardian: "Grace Osei",
    phone: "(555) 022-3358",
    attendance: "present",
    grades: [
      { subject: "Math", score: 82 },
      { subject: "Science", score: 76 },
      { subject: "English", score: 88 },
    ],
  },
  {
    id: "S-2206",
    name: "Alina Raza",
    className: DEMO_CLASS,
    guardian: "Farah Raza",
    phone: "(555) 022-7845",
    attendance: "present",
    grades: [
      { subject: "Math", score: 77 },
      { subject: "Science", score: 83 },
      { subject: "English", score: 92 },
    ],
  },
];

export const demoApplicants: DemoApplicant[] = [
  { id: "AP-118", name: "Bilal Chaudhry", appliedFor: "Grade 4", stage: "interview", submitted: "3 days ago" },
  { id: "AP-117", name: "Sophie Nguyen", appliedFor: "Grade 7", stage: "application", submitted: "5 days ago" },
  { id: "AP-116", name: "Ahmed Karim", appliedFor: "Grade 1", stage: "enrolled", submitted: "1 week ago" },
  { id: "AP-115", name: "Isabella Costa", appliedFor: "Grade 6", stage: "inquiry", submitted: "1 week ago" },
  { id: "AP-114", name: "Yusuf Malik", appliedFor: "Grade 3", stage: "application", submitted: "2 weeks ago" },
];

export const gradeSubjects = ["Math", "Science", "English"];

"use client";

import { useState } from "react";
import {
  DemoEntry,
  DemoFrame,
  PanelHeading,
  Pill,
  StatCard,
} from "@/components/demo/primitives";
import {
  applicantStageLabels,
  DEMO_CLASS,
  DEMO_TEACHER,
  demoApplicants,
  demoStudents,
  educationRoles,
  gradeSubjects,
  type AttendanceStatus,
  type EducationRole,
} from "@/lib/demo/education";

const attendanceMeta: Record<
  AttendanceStatus,
  { label: string; tone: "green" | "amber" | "rose" }
> = {
  present: { label: "Present", tone: "green" },
  late: { label: "Late", tone: "amber" },
  absent: { label: "Absent", tone: "rose" },
};

const nextAttendance: Record<AttendanceStatus, AttendanceStatus> = {
  present: "late",
  late: "absent",
  absent: "present",
};

const stageTone: Record<string, "gray" | "amber" | "accent" | "green"> = {
  inquiry: "gray",
  application: "amber",
  interview: "accent",
  enrolled: "green",
};

const roleLabels: Record<EducationRole, string> = {
  admin: "Admin",
  teacher: DEMO_TEACHER,
  registrar: "Registrar",
};

type View = "overview" | "admissions" | "students" | "attendance" | "gradebook";

/**
 * Sandboxed Education Management System demo — spec Section 6. Read-mostly;
 * the one mutation is attendance marking (in-memory, resets on reload).
 * Role-based access: teachers see their class, the registrar never sees
 * grades.
 */
export function EducationDemo({ exitHref }: { exitHref: string }) {
  const [role, setRole] = useState<EducationRole | null>(null);
  const [view, setView] = useState<View>("overview");
  const [students, setStudents] = useState(demoStudents);

  if (!role) {
    return (
      <DemoEntry
        kind="design"
        label="Education Management System — Design Preview"
        blurb="Explore our design for admissions, attendance, and gradebooks working as one system."
        roles={educationRoles}
        onSelect={(id) => {
          setRole(id as EducationRole);
          setView("overview");
        }}
        exitHref={exitHref}
      />
    );
  }

  const nav: { id: View; label: string }[] =
    role === "teacher"
      ? [
          { id: "overview", label: "Overview" },
          { id: "attendance", label: "Attendance" },
          { id: "gradebook", label: "Gradebook" },
          { id: "students", label: "My students" },
        ]
      : role === "registrar"
        ? [
            { id: "overview", label: "Overview" },
            { id: "admissions", label: "Admissions" },
            { id: "students", label: "Students" },
          ]
        : [
            { id: "overview", label: "Overview" },
            { id: "admissions", label: "Admissions" },
            { id: "attendance", label: "Attendance" },
            { id: "gradebook", label: "Gradebook" },
            { id: "students", label: "Students" },
          ];

  const presentCount = students.filter((s) => s.attendance !== "absent").length;
  const attendancePct = Math.round((presentCount / students.length) * 100);
  const openApplications = demoApplicants.filter(
    (a) => a.stage !== "enrolled"
  ).length;

  const cycleAttendance = (id: string) => {
    setStudents((current) =>
      current.map((s) =>
        s.id === id ? { ...s, attendance: nextAttendance[s.attendance] } : s
      )
    );
  };

  return (
    <DemoFrame
      kind="design"
      title="Education Management System"
      roleLabel={roleLabels[role]}
      onSwitchRole={() => setRole(null)}
      exitHref={exitHref}
      nav={nav}
      activeView={view}
      onNavigate={(id) => setView(id as View)}
    >
      {view === "overview" && (
        <div>
          <PanelHeading>
            {role === "teacher" ? `${DEMO_CLASS} today` : "School overview"}
          </PanelHeading>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Students"
              value={String(students.length)}
              hint={role === "teacher" ? DEMO_CLASS : "Enrolled (demo class)"}
            />
            <StatCard
              label="Attendance today"
              value={`${attendancePct}%`}
              hint={`${presentCount} of ${students.length} in class`}
            />
            {role === "teacher" ? (
              <StatCard
                label="Subjects graded"
                value={String(gradeSubjects.length)}
                hint="This term"
              />
            ) : (
              <StatCard
                label="Open applications"
                value={String(openApplications)}
                hint="In the admissions pipeline"
              />
            )}
          </div>
          <p className="mt-6 rounded-xl border border-line bg-canvas p-4 text-xs leading-relaxed text-soft">
            {role === "registrar"
              ? "Gradebooks are visible to teachers and admins only — role-based access in action."
              : "Attendance marked in class updates every report the moment it's saved — no re-entering registers."}
          </p>
        </div>
      )}

      {view === "admissions" && role !== "teacher" && (
        <div>
          <PanelHeading>Admissions pipeline</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Every applicant, one stage at a time — nothing lives in a paper
            file.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead className="bg-canvas-subtle text-xs uppercase tracking-wider text-faint">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Ref</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Applicant</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Applying for</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Submitted</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {demoApplicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td className="px-4 py-3 font-medium text-ink">
                      {applicant.id}
                    </td>
                    <td className="px-4 py-3 text-ink">{applicant.name}</td>
                    <td className="px-4 py-3 text-soft">
                      {applicant.appliedFor}
                    </td>
                    <td className="px-4 py-3 text-soft">
                      {applicant.submitted}
                    </td>
                    <td className="px-4 py-3">
                      <Pill tone={stageTone[applicant.stage]}>
                        {applicantStageLabels[applicant.stage]}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "attendance" && role !== "registrar" && (
        <div>
          <PanelHeading>Attendance — {DEMO_CLASS}</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Tap a status to cycle Present → Late → Absent. Parents and reports
            see the change instantly.
          </p>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
            {students.map((student) => (
              <li
                key={student.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">
                    {student.name}
                  </p>
                  <p className="text-xs text-soft">{student.id}</p>
                </div>
                <button
                  onClick={() => cycleAttendance(student.id)}
                  aria-label={`Change attendance for ${student.name}`}
                >
                  <Pill tone={attendanceMeta[student.attendance].tone}>
                    {attendanceMeta[student.attendance].label}
                  </Pill>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === "gradebook" && role !== "registrar" && (
        <div>
          <PanelHeading>Gradebook — {DEMO_CLASS}</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Term scores by subject. Read-only in the demo.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="bg-canvas-subtle text-xs uppercase tracking-wider text-faint">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Student</th>
                  {gradeSubjects.map((subject) => (
                    <th key={subject} scope="col" className="px-4 py-2.5 font-medium">
                      {subject}
                    </th>
                  ))}
                  <th scope="col" className="px-4 py-2.5 font-medium">Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {students.map((student) => {
                  const avg = Math.round(
                    student.grades.reduce((sum, g) => sum + g.score, 0) /
                      student.grades.length
                  );
                  return (
                    <tr key={student.id}>
                      <td className="px-4 py-3 font-medium text-ink">
                        {student.name}
                      </td>
                      {student.grades.map((grade) => (
                        <td key={grade.subject} className="px-4 py-3 text-soft">
                          {grade.score}
                        </td>
                      ))}
                      <td className="px-4 py-3 font-semibold text-ink">
                        {avg}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "students" && (
        <div>
          <PanelHeading>
            {role === "teacher" ? `My students — ${DEMO_CLASS}` : "Students"}
          </PanelHeading>
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
            {students.map((student) => (
              <li
                key={student.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">
                    {student.name}
                  </p>
                  <p className="text-xs text-soft">
                    {student.id} · {student.className}
                  </p>
                </div>
                <p className="text-xs text-soft">
                  Guardian: {student.guardian} · {student.phone}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DemoFrame>
  );
}

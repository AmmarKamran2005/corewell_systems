"use client";

import { useState } from "react";
import {
  DemoEntry,
  DemoFrame,
  PanelHeading,
  Pill,
  StatCard,
} from "@/components/demo/primitives";
import { HealthcareEncounter } from "@/components/demo/HealthcareEncounter";
import {
  DEMO_DOCTOR,
  demoAppointments,
  demoClaims,
  demoInvoices,
  demoPatients,
  getPatient,
  healthcareRoles,
  type AppointmentStatus,
  type HealthcareRole,
} from "@/lib/demo/healthcare";
import { cn } from "@/lib/utils";

const statusMeta: Record<
  AppointmentStatus,
  { label: string; tone: "gray" | "amber" | "green" }
> = {
  scheduled: { label: "Scheduled", tone: "gray" },
  "checked-in": { label: "Checked in", tone: "amber" },
  completed: { label: "Completed", tone: "green" },
};

const roleLabels: Record<HealthcareRole, string> = {
  admin: "Admin",
  doctor: DEMO_DOCTOR,
  frontdesk: "Front Desk",
};

type View =
  | "overview"
  | "encounter"
  | "appointments"
  | "patients"
  | "billing";

/**
 * Sandboxed Healthcare Management System demo — spec Section 6. Read-mostly:
 * the only mutations are in-memory status changes (appointment progress,
 * invoice payment) that reset on reload. Role choice shapes navigation and
 * visible data — demonstrating role-based access without any credentials.
 */
export function HealthcareDemo({ exitHref }: { exitHref: string }) {
  const [role, setRole] = useState<HealthcareRole | null>(null);
  const [view, setView] = useState<View>("overview");
  const [appointments, setAppointments] = useState(demoAppointments);
  const [invoices, setInvoices] = useState(demoInvoices);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [patientQuery, setPatientQuery] = useState("");

  if (!role) {
    return (
      <DemoEntry
        label="Healthcare Management System — Interactive Demo"
        blurb="Explore a full clinical workflow — patient intake, scheduling, records, and billing — in a live interactive environment."
        roles={healthcareRoles}
        onSelect={(id) => {
          setRole(id as HealthcareRole);
          setView("overview");
        }}
        exitHref={exitHref}
      />
    );
  }

  const nav: { id: View; label: string }[] = [
    { id: "overview", label: "Overview" },
    // Clinical documentation is for clinicians and admins, not the front desk.
    ...(role === "frontdesk"
      ? []
      : [{ id: "encounter" as View, label: "Encounter" }]),
    { id: "appointments", label: role === "doctor" ? "My schedule" : "Appointments" },
    { id: "patients", label: "Patients" },
    ...(role === "doctor" ? [] : [{ id: "billing" as View, label: "Billing" }]),
  ];

  const visibleAppointments =
    role === "doctor"
      ? appointments.filter((a) => a.doctor === DEMO_DOCTOR)
      : appointments;

  const todaysAppointments = visibleAppointments.filter(
    (a) => a.day === "Today"
  );
  const pendingInvoices = invoices.filter((i) => i.status === "pending");
  const revenueThisWeek = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const advanceStatus = (id: string) => {
    setAppointments((current) =>
      current.map((a) => {
        if (a.id !== id) return a;
        const next: AppointmentStatus =
          a.status === "scheduled" ? "checked-in" : "completed";
        return { ...a, status: next };
      })
    );
  };

  const markPaid = (id: string) => {
    setInvoices((current) =>
      current.map((i) => (i.id === id ? { ...i, status: "paid" as const } : i))
    );
  };

  const filteredPatients = demoPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(patientQuery.toLowerCase())
  );

  const patient = selectedPatient ? getPatient(selectedPatient) : undefined;

  return (
    <DemoFrame
      title="Healthcare Management System"
      roleLabel={roleLabels[role]}
      onSwitchRole={() => {
        setRole(null);
        setSelectedPatient(null);
      }}
      exitHref={exitHref}
      nav={nav}
      activeView={view}
      onNavigate={(id) => setView(id as View)}
    >
      {view === "overview" && (
        <div>
          <PanelHeading>
            {role === "doctor" ? "Your day at a glance" : "Clinic overview"}
          </PanelHeading>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Appointments today"
              value={String(todaysAppointments.length)}
              hint={`${todaysAppointments.filter((a) => a.status === "completed").length} completed`}
            />
            <StatCard
              label="Checked in now"
              value={String(
                todaysAppointments.filter((a) => a.status === "checked-in")
                  .length
              )}
              hint="Waiting or in consultation"
            />
            {role === "doctor" ? (
              <StatCard
                label="Patients on record"
                value={String(demoPatients.length)}
                hint="Across the clinic"
              />
            ) : (
              <StatCard
                label={role === "admin" ? "Revenue this week" : "Pending invoices"}
                value={
                  role === "admin"
                    ? `$${revenueThisWeek}`
                    : String(pendingInvoices.length)
                }
                hint={
                  role === "admin"
                    ? `${pendingInvoices.length} invoices pending`
                    : "Awaiting payment"
                }
              />
            )}
          </div>

          <h3 className="mt-8 text-sm font-semibold text-ink">
            Today&apos;s schedule
          </h3>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
            {todaysAppointments.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <span className="w-12 text-sm font-medium text-ink">
                    {a.time}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {getPatient(a.patientId)?.name}
                    </p>
                    <p className="text-xs text-soft">
                      {a.reason} · {a.doctor}
                    </p>
                  </div>
                </div>
                <Pill tone={statusMeta[a.status].tone}>
                  {statusMeta[a.status].label}
                </Pill>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === "encounter" && role !== "frontdesk" && <HealthcareEncounter />}

      {view === "appointments" && (
        <div>
          <PanelHeading>
            {role === "doctor" ? "My schedule" : "Appointments"}
          </PanelHeading>
          <p className="mt-1 text-xs text-soft">
            {role === "doctor"
              ? "Your bookings for today and tomorrow."
              : "Front desk can check patients in and complete visits — try it."}
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-canvas-subtle text-xs uppercase tracking-wider text-faint">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Day</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Time</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Patient</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Reason</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Doctor</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                  {role !== "doctor" && (
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      <span className="sr-only">Action</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visibleAppointments.map((a) => (
                  <tr key={a.id}>
                    <td className="px-4 py-3 text-soft">{a.day}</td>
                    <td className="px-4 py-3 font-medium text-ink">{a.time}</td>
                    <td className="px-4 py-3 text-ink">
                      {getPatient(a.patientId)?.name}
                    </td>
                    <td className="px-4 py-3 text-soft">{a.reason}</td>
                    <td className="px-4 py-3 text-soft">{a.doctor}</td>
                    <td className="px-4 py-3">
                      <Pill tone={statusMeta[a.status].tone}>
                        {statusMeta[a.status].label}
                      </Pill>
                    </td>
                    {role !== "doctor" && (
                      <td className="px-4 py-3 text-right">
                        {a.status !== "completed" && a.day === "Today" && (
                          <button
                            onClick={() => advanceStatus(a.id)}
                            className="text-xs font-medium text-accent hover:text-accent-strong"
                          >
                            {a.status === "scheduled"
                              ? "Check in"
                              : "Complete visit"}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "patients" && (
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div>
            <PanelHeading>Patients</PanelHeading>
            <input
              type="search"
              value={patientQuery}
              onChange={(e) => setPatientQuery(e.target.value)}
              placeholder="Search by name or ID…"
              className="mt-3 w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
            <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
              {filteredPatients.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => setSelectedPatient(p.id)}
                    className={cn(
                      "flex w-full flex-wrap items-center justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-canvas-subtle",
                      selectedPatient === p.id && "bg-accent/5"
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">{p.name}</p>
                      <p className="text-xs text-soft">
                        {p.id} · {p.age} {p.gender} · {p.phone}
                      </p>
                    </div>
                    <span className="text-xs text-faint">
                      Last visit: {p.lastVisit}
                    </span>
                  </button>
                </li>
              ))}
              {filteredPatients.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-soft">
                  No patients match that search.
                </li>
              )}
            </ul>
          </div>

          <aside className="rounded-xl border border-line bg-canvas p-4">
            {patient ? (
              <div>
                <p className="text-sm font-semibold text-ink">{patient.name}</p>
                <p className="mt-1 text-xs text-soft">
                  {patient.id} · {patient.age} {patient.gender} · {patient.phone}
                </p>
                <p className="mt-3 text-xs text-soft">
                  <span className="font-medium text-ink">Allergies:</span>{" "}
                  {patient.allergies}
                </p>
                {role === "frontdesk" ? (
                  <p className="mt-4 rounded-lg border border-line bg-surface p-3 text-xs leading-relaxed text-faint">
                    Clinical visit notes are visible to clinicians and admins
                    only — role-based access in action.
                  </p>
                ) : (
                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-faint">
                      Visit history
                    </p>
                    <ul className="mt-2 space-y-3">
                      {patient.visits.map((visit) => (
                        <li
                          key={`${visit.date}-${visit.note}`}
                          className="rounded-lg border border-line bg-surface p-3"
                        >
                          <p className="text-xs font-medium text-ink">
                            {visit.date} · {visit.doctor}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-soft">
                            {visit.note}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-soft">
                Select a patient to open their record.
              </p>
            )}
          </aside>
        </div>
      )}

      {view === "billing" && role !== "doctor" && (
        <div>
          <PanelHeading>Insurance claims</PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Claims are built from the signed note and its codes — no
            re-keying. In production they are transmitted electronically and
            payer responses post back automatically.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-canvas-subtle text-xs uppercase tracking-wider text-faint">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Claim</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Patient</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Service date</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Codes</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Charged</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {demoClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-4 py-3 font-medium text-ink">
                      {claim.id}
                    </td>
                    <td className="px-4 py-3 text-ink">
                      {getPatient(claim.patientId)?.name}
                    </td>
                    <td className="px-4 py-3 text-soft">{claim.serviceDate}</td>
                    <td className="px-4 py-3 font-mono text-xs text-soft">
                      {claim.codes}
                    </td>
                    <td className="px-4 py-3 text-ink">${claim.charged}</td>
                    <td className="px-4 py-3">
                      <Pill
                        tone={
                          claim.status === "paid"
                            ? "green"
                            : claim.status === "submitted"
                              ? "accent"
                              : claim.status === "ready"
                                ? "amber"
                                : "gray"
                        }
                      >
                        {claim.status === "ready"
                          ? "Ready to bill"
                          : claim.status.charAt(0).toUpperCase() +
                            claim.status.slice(1)}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PanelHeading>
            <span className="mt-8 block">Patient invoices</span>
          </PanelHeading>
          <p className="mt-1 text-xs text-soft">
            Patient responsibility after insurance — mark the pending ones
            paid.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead className="bg-canvas-subtle text-xs uppercase tracking-wider text-faint">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">Invoice</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Patient</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Service</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Amount</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-4 py-3 font-medium text-ink">
                      {invoice.id}
                    </td>
                    <td className="px-4 py-3 text-ink">
                      {getPatient(invoice.patientId)?.name}
                    </td>
                    <td className="px-4 py-3 text-soft">{invoice.service}</td>
                    <td className="px-4 py-3 text-ink">${invoice.amount}</td>
                    <td className="px-4 py-3">
                      <Pill tone={invoice.status === "paid" ? "green" : "amber"}>
                        {invoice.status === "paid" ? "Paid" : "Pending"}
                      </Pill>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {invoice.status === "pending" && (
                        <button
                          onClick={() => markPaid(invoice.id)}
                          className="text-xs font-medium text-accent hover:text-accent-strong"
                        >
                          Mark paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DemoFrame>
  );
}

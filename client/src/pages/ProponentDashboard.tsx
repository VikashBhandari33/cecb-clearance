import { useState } from "react";
import {
  CheckCircle2, ChevronDown, Edit3, Eye,
  FileText, Lock, Plus, Trash2, X,
} from "lucide-react";
import Layout from "../components/Layout";

type WorkflowStep = "filing" | "scrutiny" | "mom" | "issuance";
type MemberRole = "Scrutiny Team" | "MoM Team" | "Admin" | "Proponent";

interface Member {
  id: string;
  name: string;
  org: string;
  role: MemberRole;
  selected: boolean;
}

// ─── Workflow bar ───────────────────────────────────────────────────────────
const STEPS = [
  { id: "filing",   label: "Application Filing"      },
  { id: "scrutiny", label: "Scrutiny & Verification" },
  { id: "mom",      label: "MoM Generation"          },
  { id: "issuance", label: "Final Issuance"           },
];

function WorkflowBar({ current }: { current: WorkflowStep }) {
  const idx = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex w-full flex-shrink-0" style={{ height: 46 }}>
      {STEPS.map((step, i) => {
        const done    = i < idx;
        const active  = i === idx;
        const pending = i > idx;
        const bg    = pending ? "#D1D5DB" : active ? "#1B4332" : "#2D6A4F";
        const color = pending ? "#6B7280" : "white";
        return (
          <div
            key={step.id}
            className="flex items-center gap-2 flex-1 px-5 text-xs font-medium"
            style={{
              background: bg, color,
              zIndex: STEPS.length - i,
              clipPath: i < STEPS.length - 1
                ? "polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)"
                : "none",
              marginRight: i < STEPS.length - 1 ? -1 : 0,
            }}
          >
            {!pending ? (
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 17, height: 17, background: "rgba(255,255,255,0.25)" }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            ) : (
              <div
                className="rounded-full flex-shrink-0"
                style={{ width: 15, height: 15, border: "2px solid #9CA3AF" }}
              />
            )}
            {step.label}
          </div>
        );
      })}
    </div>
  );
}

// ─── Mini bar chart ─────────────────────────────────────────────────────────
const BARS = [
  { label: "Apr", h: 18, main: false },
  { label: "Feb", h: 35, main: false },
  { label: "Nov", h: 52, main: false },
  { label: "Dec", h: 85, main: true  },
  { label: "Dec", h: 58, main: false },
];

function BarChart() {
  return (
    <div>
      <div className="flex items-end gap-1.5" style={{ height: 85 }}>
        {BARS.map((b, i) => (
          <div key={i} className="flex flex-col items-center justify-end gap-1 flex-1">
            <div
              className="w-full rounded-sm"
              style={{ height: b.h, background: b.main ? "#1B4332" : "#D1FAE5" }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-1">
        {BARS.map((b, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-gray-400" style={{ fontSize: 9 }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────
export default function ProponentDashboard() {
  const [step] = useState<WorkflowStep>("scrutiny");

  // Scrutiny checklist
  const [checks, setChecks] = useState({ docs: true, fee: true, test: false });
  const toggle = (k: keyof typeof checks) => setChecks((p) => ({ ...p, [k]: !p[k] }));

  const [addComment, setAddComment] = useState("");
  const [comment, setComment]       = useState("");

  // Members
  const [members, setMembers] = useState<Member[]>([
    { id:"1", name:"Dator Kasam",  org:"Chhattisgarh Profile", role:"Scrutiny Team", selected: false },
    { id:"2", name:"User Adnin",   org:"Chhattisgarh Profile", role:"Scrutiny Team", selected: true  },
    { id:"3", name:"Sonan Ranman", org:"Chhattisgarh Board",   role:"MoM Team",      selected: false },
  ]);
  const updateRole = (id: string, role: MemberRole) =>
    setMembers((p) => p.map((m) => (m.id === id ? { ...m, role } : m)));
  const selectMember = (id: string) =>
    setMembers((p) => p.map((m) => ({ ...m, selected: m.id === id })));

  // Gist
  const [gistTab, setGistTab]   = useState<"edit" | "preview">("preview");
  const [momOpen, setMomOpen]   = useState(true);

  const ROLES: MemberRole[] = ["Scrutiny Team", "MoM Team", "Admin", "Proponent"];

  // Avatar initials colours
  const avatarBg = ["#4F46E5", "#7C3AED", "#DB2777"];

  return (
    <Layout>
      <div className="flex flex-col h-full">

        {/* Workflow */}
        <WorkflowBar current={step} />

        {/* Grid */}
        <div
          className="flex-1 overflow-auto p-4"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >

          {/* ═══════════ LEFT ═══════════ */}
          <div className="flex flex-col gap-3">

            {/* Application Details */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800 text-sm">Application Details</h2>
                <button
                  className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 transition"
                >
                  View status <ChevronDown size={11} />
                </button>
              </div>

              <div className="flex gap-5">
                {/* Left sub-col */}
                <div style={{ flex: "0 0 auto", width: 240 }}>
                  <p className="text-xs text-gray-400 mb-0.5">Project</p>
                  <p className="text-xs font-semibold text-gray-800 leading-snug">
                    Chhattisgarh Environment Conservation Board
                  </p>
                  <p className="text-xs text-gray-400 mb-3">Number - 495-202023</p>

                  <p className="text-xs font-medium text-gray-600 mb-2">Attached Documents</p>
                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    {[
                      { name: "Document 1",       bg: "#EFF6FF", border: "#BFDBFE", iconColor: "#3B82F6", check: false },
                      { name: "Validation Frm...",bg: "#FFF7ED", border: "#FED7AA", iconColor: "#F97316", check: true  },
                      { name: "Document 2 pdf",   bg: "#EFF6FF", border: "#BFDBFE", iconColor: "#3B82F6", check: false },
                      { name: "Valid.pdf",        bg: "#FFF7ED", border: "#FED7AA", iconColor: "#F97316", check: true  },
                    ].map((d) => (
                      <div
                        key={d.name}
                        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
                        style={{ background: d.bg, border: `1px solid ${d.border}` }}
                      >
                        <FileText size={11} style={{ color: d.iconColor, flexShrink: 0 }} />
                        <span className="text-xs text-gray-700 flex-1 truncate">{d.name}</span>
                        {d.check && <CheckCircle2 size={11} className="text-green-500 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>

                  <p className="text-xs font-semibold text-gray-700 mb-2">Real-time Status tracker</p>
                  {[
                    "Document 1: Verified",
                    "Fee Payment: Confirmed via UPI",
                    "Fee Payment: Confirmed via UPI",
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5 mb-1.5">
                      <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{s}</span>
                    </div>
                  ))}
                </div>

                {/* Right sub-col: stats + chart */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-x-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-400">Total funding</p>
                      <p className="text-xl font-bold text-gray-800">38</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Average Processing Time</p>
                      <p className="text-xl font-bold text-gray-800">24 hrs</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-400">Total Applications Pending</p>
                      <p className="text-lg font-bold text-gray-800">23</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Average Time</p>
                      <p className="text-xs text-gray-400">Processing Time</p>
                    </div>
                  </div>
                  <BarChart />
                </div>
              </div>
            </div>

            {/* Role Management */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-0.5">Role Management</h2>
              <p className="text-xs text-gray-400 mb-4">
                Dynamic admin control — toggle between users roles.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {members.map((m, i) => (
                  <div
                    key={m.id}
                    onClick={() => selectMember(m.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition"
                    style={{
                      border: m.selected ? "2px solid #1B4332" : "1px solid #E5E7EB",
                    }}
                  >
                    {/* Person avatar */}
                    <div
                      className="rounded-full overflow-hidden flex items-center justify-center"
                      style={{ width: 50, height: 50, background: "#E5E7EB" }}
                    >
                      <svg width="30" height="30" viewBox="0 0 24 24" fill={avatarBg[i]}>
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-800">{m.name}</p>
                      <p className="text-xs text-gray-400">{m.org}</p>
                    </div>
                    <select
                      value={m.role}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateRole(m.id, e.target.value as MemberRole)}
                      className="w-full border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 bg-white focus:outline-none"
                      style={{ fontFamily: "inherit" }}
                    >
                      {ROLES.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ═══════════ RIGHT ═══════════ */}
          <div className="flex flex-col gap-3">

            {/* Scrutiny Panel */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 text-sm mb-0.5">Scrutiny Panel</h2>
              <p className="text-xs text-gray-400 mb-4">
                Interactive checklist, checklist for the Scrutiny Team
              </p>

              {/* Checklist */}
              {(["docs","fee","test"] as (keyof typeof checks)[]).map((key, i) => {
                const labels = ["Verify Documents","Validate Fee Payment","Validate Test Payment"];
                return (
                  <div key={key} className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggle(key)}
                        className="flex items-center justify-center rounded flex-shrink-0 transition"
                        style={{
                          width: 18, height: 18,
                          background: checks[key] ? "#1B4332" : "white",
                          border: `2px solid ${checks[key] ? "#1B4332" : "#D1D5DB"}`,
                        }}
                      >
                        {checks[key] && (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                      <span className="text-sm text-gray-700">{labels[i]}</span>
                    </div>
                    <div
                      className="rounded-full flex-shrink-0 transition"
                      style={{
                        width: 18, height: 18,
                        background: checks[key] ? "#10B981" : "white",
                        border: `2px solid ${checks[key] ? "#10B981" : "#D1D5DB"}`,
                      }}
                    />
                  </div>
                );
              })}

              {/* Comments */}
              <div className="mt-3 mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Comment</p>
                <input
                  value={addComment}
                  onChange={(e) => setAddComment(e.target.value)}
                  placeholder="Add comment"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 mb-2 focus:outline-none focus:border-green-700"
                  style={{ fontFamily: "inherit" }}
                />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comment"
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:border-green-700"
                  style={{ fontFamily: "inherit" }}
                />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="py-3 rounded-lg text-white text-sm font-semibold transition"
                  style={{ background: "#1B4332" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#2D6A4F")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#1B4332")}
                >
                  Refer for Meeting
                </button>
                <button
                  className="py-3 rounded-lg text-white text-sm font-semibold transition"
                  style={{ background: "#C8922A" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#a97720")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C8922A")}
                >
                  Seek Deficiency (EDS)
                </button>
              </div>
            </div>

            {/* Meeting Gist Document */}
            <div
              className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col"
              style={{ flex: 1 }}
            >
              {/* Header */}
              <div className="px-5 pt-4 pb-3">
                <h2 className="font-semibold text-gray-800 text-sm">Meeting Gist Document</h2>
                <p className="text-xs text-gray-400">
                  Generate Meeting Gist generating the master template.
                </p>
              </div>

              {/* Toolbar */}
              <div
                className="flex items-center gap-1 px-5 pb-3"
                style={{ borderBottom: "1px solid #F3F4F6" }}
              >
                {[
                  { id: "edit",    label: "Edit",    icon: <Edit3 size={11} /> },
                  { id: "preview", label: "Preview", icon: <Eye  size={11} /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setGistTab(t.id as "edit" | "preview")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition
                                ${gistTab === t.id
                                  ? "bg-gray-100 text-gray-700 font-medium"
                                  : "text-gray-400 hover:bg-gray-50"}`}
                  >
                    {t.icon}{t.label}
                  </button>
                ))}
                <div className="flex-1" />
                <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition">
                  <FileText size={13} />
                </button>
                <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition">
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Body: gist + MoM side panel */}
              <div className="flex flex-1 overflow-hidden">

                {/* Gist */}
                <div className="flex-1 p-4 overflow-auto">
                  {gistTab === "preview" ? (
                    <div
                      className="rounded-lg p-4"
                      style={{ background: "#F9FAFB", border: "1px solid #EFEFEF" }}
                    >
                      <div className="text-center mb-3">
                        <div
                          className="rounded-full flex items-center justify-center mx-auto mb-1.5"
                          style={{ width: 26, height: 26, background: "#1B4332" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 4z" />
                          </svg>
                        </div>
                        <p className="text-xs font-bold text-gray-800">Meeting Gist Document</p>
                        <p className="text-xs text-gray-400">Generator Master Template</p>
                      </div>
                      {[
                        "1. Review Chhattisgarh Environment Conservation Board (CECB) meeting gist relevant to document. Showcasing on-site remedies and the strict evaluations found documented to environmental clearance considerations.",
                        "2. The abstract reports are verify approved at Mallabar Fee Payment is on the triple of Mallala seconds.",
                        "3. The descent and exit communications are in sections of heavy destruction meeting outlines and components in sectors for environmental clearance were abstract and comments.",
                        "4. The disseminated list for suit communications processed and retail devices and retail division to measure revising matters.",
                      ].map((p, i) => (
                        <p key={i} className="text-gray-600 mb-1.5" style={{ fontSize: 10, lineHeight: 1.5 }}>
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      className="w-full h-full rounded-lg p-3 text-xs text-gray-700 resize-none focus:outline-none"
                      style={{
                        background: "#F9FAFB", border: "1px solid #EFEFEF",
                        fontFamily: "inherit", lineHeight: 1.6, minHeight: 160,
                      }}
                      defaultValue={`Meeting Gist Document\nGenerator Master Template\n\n1. Review Chhattisgarh Environment Conservation Board (CECB) meeting gist...\n\n2. The abstract reports are verify approved...\n\n3. The descent and exit communications...\n\n4. The disseminated list for suit communications...`}
                    />
                  )}
                </div>

                {/* MoM Team side panel */}
                {momOpen && (
                  <div
                    className="flex flex-col flex-shrink-0"
                    style={{ width: 175, borderLeft: "1px solid #E5E7EB" }}
                  >
                    <div
                      className="flex items-center justify-between px-3 py-2.5"
                      style={{ borderBottom: "1px solid #F3F4F6" }}
                    >
                      <span className="text-xs font-semibold text-gray-700">MoM Team</span>
                      <button
                        onClick={() => setMomOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        <X size={12} />
                      </button>
                    </div>

                    {/* Dropdown */}
                    <div className="px-3 py-2.5" style={{ borderBottom: "1px solid #F3F4F6" }}>
                      <div
                        className="flex items-center justify-between border border-gray-200 rounded-lg px-2.5 py-1.5 cursor-pointer hover:bg-gray-50 transition"
                      >
                        <span className="text-xs text-gray-600">Scrutiny Team</span>
                        <ChevronDown size={11} className="text-gray-400" />
                      </div>
                    </div>

                    <div className="px-3 py-2">
                      <button
                        className="flex items-center gap-1.5 text-xs font-medium py-1.5 w-full text-left rounded hover:bg-gray-50 transition"
                        style={{ color: "#1B4332" }}
                      >
                        <Plus size={11} /> Add document
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Lock button */}
              <div className="px-5 pb-5 pt-2">
                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold transition"
                  style={{ background: "#1B4332" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#2D6A4F")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#1B4332")}
                >
                  <Lock size={13} />
                  Lock and Finalize MoM
                </button>
              </div>
            </div>

          </div>
          {/* end right col */}
        </div>
      </div>
    </Layout>
  );
}
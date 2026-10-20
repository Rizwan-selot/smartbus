import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  User, Bell, Gauge, MapPin, FileText, PieChart, Settings, CloudDownload, MessageSquarePlus, Play, Apple, ChevronRight, Bus, MessageSquareWarning,
} from "lucide-react";

const REPORT_MENU: Record<string, string[]> = {
  Trips: ["Trip Status", "Trip Schedules", "Trip Summary", "Trip Attendance", "Trip Data Summary", "Trip Violation Report", "Trip Failure Summary", "Vehicle Trips", "Vehicle Trip Status", "Trip Management Report"],
  Students: ["Student Trip Information", "Student Attendance", "Student Pickup Drop", "Student Boarding Summary"],
  Activity: ["Travel Summary", "Trip Report", "Stoppage Summary", "Idle Summary", "Inactive Summary"],
  "Geofence-Address": ["Geofence Visit", "Address Visit", "Geofence Summary"],
  Sensors: ["Digital Port", "Analog Data", "Temperature Trend"],
  Alert: ["Alert Summary", "Alert Detail"],
  Reminder: ["Reminder Summary", "Reminder Due"],
  Expense: ["Expense Summary", "Expense Detail"],
  Fuel: ["Fuel Filled", "Fuel Drain", "Fuel Consumption"],
  Tire: ["Tire Inventory", "Tire Status"],
  "Driver Behaviour": ["Overspeed", "Harsh Braking", "Harsh Acceleration", "Driver Scorecard"],
  "Hardware Maintenance": ["Device Status", "Device Health"],
  Document: ["Document Expiry"],
  "Video Telematics": ["Video Event", "Video Request", "Channel Status"],
  Logs: ["User Login Log", "Command Log"],
  "Transport Fees": ["Fee Collection", "Fee Pending"],
  Billing: ["Billing Summary"],
  DVIR: ["DVIR Summary"],
  Temperature: ["Temperature Summary"],
  OBD: ["OBD Diagnostic"],
  Mode: ["Mode Change"],
  Gate: ["Gate In-Out"],
};

const NAV = [
  { label: "Dashboard", icon: Gauge, to: "/" as const, key: "dashboard" },
  { label: "Tracking", icon: MapPin, to: "/" as const, key: "tracking" },
  { label: "Chart", icon: PieChart, to: "/" as const, key: "chart" },
  { label: "Complaints", icon: MessageSquareWarning, to: "/complaints" as const, key: "complaints" },
  { label: "Reports", icon: FileText, to: null, key: "reports" },
  { label: "Settings", icon: Settings, to: "/" as const, key: "settings" },
];

export function MainSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [cat, setCat] = useState("Trips");
  const active = path.startsWith("/complaints")
    ? "complaints"
    : path.startsWith("/reports")
    ? "reports"
    : "tracking";

  return (
    <>
      <aside className="relative z-40 flex h-full w-[90px] shrink-0 flex-col bg-sb-sidebar text-sb-sidebar-fg">
        <div className="flex h-[96px] items-center justify-center">
          <img
            src="/uffizio-logo-white.png"
            alt="uffizio"
            className="h-[76px] w-[76px] object-contain drop-shadow-xs"
          />
        </div>
        <div className="flex h-[78px] items-center justify-around px-2">
          <User className="h-6 w-6" strokeWidth={1.3} />
          <Bell className="h-6 w-6" strokeWidth={1.3} />
        </div>
        {NAV.map((n) => {
          const isActive = n.key === active;
          const content = (
            <>
              <n.icon className="h-6 w-6" strokeWidth={1.3} />
              <span className="mt-1 text-[12px]">{n.label}</span>
            </>
          );
          const cls = `flex h-[80px] flex-col items-center justify-center ${isActive ? "bg-sb-sidebar-active" : "hover:bg-sb-sidebar-active"}`;
          return n.to ? (
            <Link key={n.key} to={n.key === "tracking" ? "/" : n.to} onClick={() => setMenuOpen(false)} className={cls}>{content}</Link>
          ) : (
            <button key={n.key} onClick={() => setMenuOpen(true)} onMouseEnter={() => setMenuOpen(true)} className={cls}>{content}</button>
          );
        })}
        <div className="mt-auto flex flex-col items-center gap-5 pb-3">
          <CloudDownload className="h-6 w-6" strokeWidth={1.3} />
          <MessageSquarePlus className="h-6 w-6" strokeWidth={1.3} />
          <div className="flex gap-4"><Play className="h-5 w-5" strokeWidth={1.3} /><Apple className="h-5 w-5" strokeWidth={1.3} /></div>
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)}>
          <div className="absolute left-[90px] top-[72px] flex" onClick={(e) => e.stopPropagation()} onMouseLeave={() => setMenuOpen(false)}>
            <ul className="w-[172px] bg-sb-menu text-sb-sidebar-fg sb-scroll max-h-[calc(100vh-80px)] overflow-y-auto">
              {Object.keys(REPORT_MENU).map((c) => (
                <li key={c}>
                  <button onMouseEnter={() => setCat(c)} onClick={() => setCat(c)}
                    className={`flex h-[40px] w-full items-center justify-between whitespace-nowrap text-left pl-[18px] pr-2 text-[12.5px] ${cat === c ? "bg-sb-menu-hover" : "hover:bg-sb-menu-hover"}`}>
                    {c}<ChevronRight className="h-3 w-3 opacity-70" />
                  </button>
                </li>
              ))}
            </ul>
            <ul className="w-[190px] self-start bg-sb-menu-hover text-sb-sidebar-fg">
              {(REPORT_MENU[cat] ?? []).map((r) => (
                <li key={r}>
                  <Link to="/reports/student-trip-information" onClick={() => setMenuOpen(false)}
                    className="flex h-[40px] items-center whitespace-nowrap px-[17px] text-[12.5px] hover:bg-sb-menu">{r}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

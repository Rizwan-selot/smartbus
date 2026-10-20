import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { ComplaintStatus } from "@/types/complaints";
import { ALL_STATUSES, ALL_AGENTS } from "./mockData";

interface Props {
  ticketNo: string;
  status: ComplaintStatus;
  assignedTo: string;
  onStatusChange: (status: ComplaintStatus) => void;
  onAssignChange: (agent: string) => void;
  onMarkResolved: () => void;
}

export function ComplaintDetailHeader({
  ticketNo,
  status,
  assignedTo,
  onStatusChange,
  onAssignChange,
  onMarkResolved,
}: Props) {
  const isResolved = status === "Resolved";
  const isClosed = status === "Closed";

  return (
    <div className="flex h-[40px] shrink-0 items-center justify-between bg-sb-header px-3 text-sb-header-fg">
      {/* Left: Back Link & Ticket Title */}
      <div className="flex items-center gap-3">
        <Link
          to="/complaints"
          className="inline-flex items-center gap-1 text-[12px] text-white/80 hover:text-white transition-colors"
          title="Return to Complaints Dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>

        <span className="text-white/30">|</span>

        <h1 className="text-[15px] font-medium tracking-wide">
          Complaint <span className="font-semibold text-sb-logo">{ticketNo}</span>
        </h1>
      </div>

      {/* Right: Controls (Status Dropdown, Assign-To Dropdown, Mark Resolved Button) */}
      <div className="flex items-center gap-3 text-[12px]">
        {/* Status Dropdown (Strictly 4 FRS options) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-white/70">Status:</span>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as ComplaintStatus)}
            className="h-[26px] rounded-xs border border-white/20 bg-sb-sidebar px-2 text-[12px] text-white outline-none focus:border-sb-logo"
            title="Change complaint status"
          >
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s} className="bg-sb-panel text-sb-text">
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Assign-To Dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-white/70">Assign to:</span>
          <select
            value={assignedTo || ""}
            onChange={(e) => onAssignChange(e.target.value)}
            className="h-[26px] max-w-[150px] rounded-xs border border-white/20 bg-sb-sidebar px-2 text-[12px] text-white outline-none focus:border-sb-logo"
            title="Assign ET Operations agent"
          >
            <option value="" className="bg-sb-panel text-sb-text">
              Unassigned
            </option>
            {ALL_AGENTS.map((a) => (
              <option key={a} value={a} className="bg-sb-panel text-sb-text">
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Mark Resolved Button */}
        <button
          type="button"
          onClick={onMarkResolved}
          disabled={isResolved || isClosed}
          className={`flex h-[26px] items-center gap-1.5 rounded-xs px-3 text-[11.5px] font-medium transition-colors shadow-2xs ${
            isResolved
              ? "bg-[#12A012]/80 text-white cursor-default"
              : isClosed
              ? "bg-white/20 text-white/50 cursor-not-allowed"
              : "bg-[#12A012] text-white hover:bg-[#0e800e] cursor-pointer"
          }`}
          title={
            isResolved
              ? "Complaint is already marked as Resolved"
              : isClosed
              ? "Complaint is Closed"
              : "Mark complaint as Resolved"
          }
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{isResolved ? "Resolved" : "Mark Resolved"}</span>
        </button>
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowLeft, Star, Check } from "lucide-react";
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
      {/* Left: Star & Title & Return */}
      <div className="flex items-center gap-2.5">
        <Link
          to="/complaints"
          className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          title="Return to Complaints Dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <Star className="h-4 w-4 text-white/80" strokeWidth={1.5} />

        <h1 className="text-[14.5px] font-medium text-white tracking-wide">
          Complaints <span className="font-semibold">{ticketNo}</span>
        </h1>
      </div>

      {/* Right: Controls (Status Dropdown, Assign-To Dropdown, Resolved Button) */}
      <div className="flex items-center gap-3 text-[12px]">
        {/* Status Dropdown */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-white/70">Status:</span>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as ComplaintStatus)}
            className="h-[26px] rounded-[3px] border border-white/20 bg-sb-sidebar px-2 text-[12px] text-white outline-none focus:border-white/40"
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
            className="h-[26px] max-w-[160px] rounded-[3px] border border-white/20 bg-sb-sidebar px-2 text-[12px] text-white outline-none focus:border-white/40"
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

        {/* Resolved Button */}
        <button
          type="button"
          onClick={onMarkResolved}
          disabled={isResolved || isClosed}
          className={`flex h-[26px] items-center gap-1 rounded-[3px] px-2.5 text-[11.5px] font-medium transition-colors shadow-2xs ${
            isResolved
              ? "bg-[#188D1B] text-white cursor-default"
              : isClosed
              ? "bg-white/20 text-white/50 cursor-not-allowed"
              : "bg-[#188D1B] text-white hover:bg-[#147917] cursor-pointer"
          }`}
          title={
            isResolved
              ? "Complaint is already marked as Resolved"
              : isClosed
              ? "Complaint is Closed"
              : "Mark complaint as Resolved"
          }
        >
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Resolved</span>
        </button>
      </div>
    </div>
  );
}

import { useSyncExternalStore } from "react";
import type { Complaint, ComplaintStatus, ComplaintActivity, ComplaintAttachment } from "@/types/complaints";
import { MOCK_COMPLAINTS } from "./mockData";

// In-memory store initialized with mock complaints
let complaintsState: Complaint[] = [...MOCK_COMPLAINTS];
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

export const complaintsStore = {
  getAll(): Complaint[] {
    return complaintsState;
  },

  getById(ticketNo: string): Complaint | undefined {
    return complaintsState.find((c) => c.ticketNo.toLowerCase() === ticketNo.toLowerCase());
  },

  updateStatus(ticketNo: string, newStatus: ComplaintStatus, actor = "Operations"): boolean {
    const complaint = complaintsStore.getById(ticketNo);
    if (!complaint) return false;

    if (complaint.status === newStatus) return true;

    const prevStatus = complaint.status;
    const newActivity: ComplaintActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: "status_change",
      action: `Status changed from ${prevStatus} to ${newStatus}`,
      actor,
      timestamp: formatCurrentTime(),
    };

    complaintsState = complaintsState.map((c) =>
      c.ticketNo.toLowerCase() === ticketNo.toLowerCase()
        ? {
            ...c,
            status: newStatus,
            activities: [newActivity, ...c.activities],
          }
        : c
    );

    notify();
    return true;
  },

  assignAgent(ticketNo: string, agentName: string, actor = "Operations"): boolean {
    const complaint = complaintsStore.getById(ticketNo);
    if (!complaint) return false;

    if (complaint.assignedTo === agentName) return true;

    const actionText = agentName
      ? `Assigned to ${agentName}`
      : `Unassigned (previously ${complaint.assignedTo || "None"})`;

    const newActivity: ComplaintActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: "assigned",
      action: actionText,
      actor,
      timestamp: formatCurrentTime(),
    };

    complaintsState = complaintsState.map((c) =>
      c.ticketNo.toLowerCase() === ticketNo.toLowerCase()
        ? {
            ...c,
            assignedTo: agentName,
            activities: [newActivity, ...c.activities],
          }
        : c
    );

    notify();
    return true;
  },

  addParentReply(ticketNo: string, message: string, actor = "Ahmed K."): boolean {
    const complaint = complaintsStore.getById(ticketNo);
    if (!complaint || !message.trim()) return false;

    const newActivity: ComplaintActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: "parent_reply",
      action: "Reply sent to Parent",
      message: message.trim(),
      actor,
      timestamp: formatCurrentTime(),
      isParentVisible: true,
    };

    complaintsState = complaintsState.map((c) =>
      c.ticketNo.toLowerCase() === ticketNo.toLowerCase()
        ? {
            ...c,
            // If ticket was open, automatically shift to In Progress if not already resolved/closed
            status: c.status === "Open" ? "In Progress" : c.status,
            activities: [newActivity, ...c.activities],
          }
        : c
    );

    notify();
    return true;
  },

  addInternalNote(ticketNo: string, note: string, actor = "Operations"): boolean {
    const complaint = complaintsStore.getById(ticketNo);
    if (!complaint || !note.trim()) return false;

    const newActivity: ComplaintActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: "internal_note",
      action: "Internal Note added",
      message: note.trim(),
      actor,
      timestamp: formatCurrentTime(),
      isInternal: true,
    };

    complaintsState = complaintsState.map((c) =>
      c.ticketNo.toLowerCase() === ticketNo.toLowerCase()
        ? {
            ...c,
            activities: [newActivity, ...c.activities],
          }
        : c
    );

    notify();
    return true;
  },

  addAttachment(ticketNo: string, attachment: ComplaintAttachment): boolean {
    const complaint = complaintsStore.getById(ticketNo);
    if (!complaint) return false;

    complaintsState = complaintsState.map((c) =>
      c.ticketNo.toLowerCase() === ticketNo.toLowerCase()
        ? {
            ...c,
            attachments: [...c.attachments, attachment],
          }
        : c
    );

    notify();
    return true;
  },

  reset(): void {
    complaintsState = [...MOCK_COMPLAINTS];
    notify();
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useComplaints() {
  return useSyncExternalStore(complaintsStore.subscribe, complaintsStore.getAll, complaintsStore.getAll);
}

export function useComplaint(ticketNo: string) {
  const all = useComplaints();
  return all.find((c) => c.ticketNo.toLowerCase() === ticketNo.toLowerCase());
}

function formatCurrentTime(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[now.getMonth()];
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = String(hours).padStart(2, "0");

  return `${day} ${month} ${year}, ${hoursStr}:${minutes} ${ampm}`;
}

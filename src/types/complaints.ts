export type ComplaintCategory =
  | "Student Pickup/Drop-off Notifications"
  | "Bus Delay / Missed Trip"
  | "Wrong Assigned Route"
  | "Driver/Nanny Behavior"
  | "Technical/System Issues"
  | "General Inquiries / Other";

export type ComplaintStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface ComplaintAttachment {
  id: string;
  name: string;
  size: string;
  type: "image" | "video" | "document";
  url: string;
  thumbnailUrl?: string;
}

export interface ComplaintActivity {
  id: string;
  type: "created" | "status_change" | "assigned" | "parent_reply" | "internal_note";
  action: string;
  message?: string;
  actor: string;
  timestamp: string;
  isInternal?: boolean;
  isParentVisible?: boolean;
}

export interface Complaint {
  id: string; // Internal or Ticket No
  ticketNo: string; // e.g. TCK-1039
  studentName: string;
  parentName: string;
  parentPhone?: string;
  route: string; // e.g. "Route 4B"
  branch: string; // e.g. "AHPS Chilkanagar"
  category: ComplaintCategory;
  dateRaised: string; // ISO date string or formatted date
  status: ComplaintStatus;
  assignedTo: string; // e.g. "Rajesh Sharma" or ""
  ageingDays: number;
  slaDays: number; // Configured SLA in days for category
  description?: string;
  attachments: ComplaintAttachment[];
  activities: ComplaintActivity[];
}

export interface ComplaintFilterState {
  category: string;
  status: string;
  dateRange: string;
  startDate?: string;
  endDate?: string;
  route: string;
  assignedTo: string;
  search: string;
}

export type SortColumn =
  | "ticketNo"
  | "parentStudent"
  | "route"
  | "category"
  | "dateRaised"
  | "status"
  | "assignedTo"
  | "ageingDays";

export type SortDirection = "asc" | "desc";

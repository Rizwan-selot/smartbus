import type { Complaint, ComplaintCategory, ComplaintActivity, ComplaintAttachment } from "@/types/complaints";

export const CATEGORY_SLA_MAP: Record<ComplaintCategory, number> = {
  "Student Pickup/Drop-off Notifications": 2,
  "Bus Delay / Missed Trip": 1,
  "Wrong Assigned Route": 2,
  "Driver/Nanny Behavior": 3,
  "Technical/System Issues": 4,
  "General Inquiries / Other": 5,
};

export const ALL_CATEGORIES: ComplaintCategory[] = [
  "Student Pickup/Drop-off Notifications",
  "Bus Delay / Missed Trip",
  "Wrong Assigned Route",
  "Driver/Nanny Behavior",
  "Technical/System Issues",
  "General Inquiries / Other",
];

export const ALL_STATUSES = ["Open", "In Progress", "Resolved", "Closed"] as const;

export const ALL_ROUTES = [
  "Route 4B - Downtown & Business Bay",
  "Route 01 - Dubai Marina & JBR",
  "Route 04 - Al Barsha & Nad Al Sheba",
  "Route 07 - Jumeirah & Al Wasl",
  "Route 08 - Khalifa City to Al Reem",
  "Route 09 - Mirdif & Al Warqa",
  "Route 12 - Abu Dhabi Corniche & Al Bateen",
  "Route 15 - Dubai Silicon Oasis & Arabian Ranches",
  "Route 18 - Sharjah Al Majaz to Muhaisnah",
];

export const ALL_AGENTS = [
  "Ahmed K.",
  "Fatima Al Mansoori",
  "Zayed Al Suwaidi",
  "Mariam Al Kaabi",
  "Rashid Al Nuaimi",
];

function createDefaultActivities(ticketNo: string, date: string, assignedTo: string, status: string): ComplaintActivity[] {
  const acts: ComplaintActivity[] = [];

  // Created
  acts.push({
    id: `act-${ticketNo}-1`,
    type: "created",
    action: "Complaint created by Parent",
    actor: "Parent",
    timestamp: date,
  });

  // Assigned
  if (assignedTo) {
    acts.push({
      id: `act-${ticketNo}-2`,
      type: "assigned",
      action: `Assigned to ${assignedTo}`,
      actor: "Operations",
      timestamp: date,
    });
  }

  // Status In Progress or Resolved or Closed
  if (status === "In Progress" || status === "Resolved" || status === "Closed") {
    acts.push({
      id: `act-${ticketNo}-3`,
      type: "status_change",
      action: "Status changed to In Progress",
      actor: assignedTo || "Operations",
      timestamp: date,
    });
  }

  if (status === "Resolved" || status === "Closed") {
    acts.push({
      id: `act-${ticketNo}-4`,
      type: "status_change",
      action: "Status changed to Resolved",
      actor: assignedTo || "Operations",
      timestamp: date,
    });
  }

  if (status === "Closed") {
    acts.push({
      id: `act-${ticketNo}-5`,
      type: "status_change",
      action: "Status changed to Closed",
      actor: "Operations",
      timestamp: date,
    });
  }

  return acts.reverse();
}

export function getCategoryDummyAttachments(ticketNo: string, category: ComplaintCategory): ComplaintAttachment[] {
  const svgPreview = (title: string, sub: string) =>
    `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232c3e50%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2245%25%22%20fill%3D%22%23ecf0f1%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20text-anchor%3D%22middle%22%3E${encodeURIComponent(
      title
    )}%3C%2Ftext%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2260%25%22%20fill%3D%22%23f39c12%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3E${encodeURIComponent(
      sub
    )}%3C%2Ftext%3E%3C%2Fsvg%3E`;

  switch (category) {
    case "Driver/Nanny Behavior":
      return [
        {
          id: `att-${ticketNo}-1`,
          name: "cctv_cabin_evidence.jpg",
          size: "2.1 MB",
          type: "image",
          url: svgPreview("CABIN CCTV RECORDING", `${ticketNo} — Driver/Nanny Behavior Evidence`),
        },
        {
          id: `att-${ticketNo}-2`,
          name: "attendant_shift_manifest.pdf",
          size: "380 KB",
          type: "document",
          url: `data:text/plain;charset=utf-8,SmartBus%20Shift%20Manifest%20Report%20for%20${ticketNo}`,
        },
      ];
    case "Bus Delay / Missed Trip":
      return [
        {
          id: `att-${ticketNo}-1`,
          name: "gps_traffic_delay_screenshot.png",
          size: "1.6 MB",
          type: "image",
          url: svgPreview("GPS TELEMETRY & DELAY EVIDENCE", `${ticketNo} — Bus Delay Report`),
        },
        {
          id: `att-${ticketNo}-2`,
          name: "route_timing_log_dubai.pdf",
          size: "420 KB",
          type: "document",
          url: `data:text/plain;charset=utf-8,SmartBus%20Route%20Timing%20Telemetry%20for%20${ticketNo}`,
        },
      ];
    case "Student Pickup/Drop-off Notifications":
      return [
        {
          id: `att-${ticketNo}-1`,
          name: "rfid_tap_gate_log.pdf",
          size: "290 KB",
          type: "document",
          url: `data:text/plain;charset=utf-8,SmartBus%20RFID%20Student%20Tap%20Log%20for%20${ticketNo}`,
        },
        {
          id: `att-${ticketNo}-2`,
          name: "parent_app_notification_snap.jpg",
          size: "1.2 MB",
          type: "image",
          url: svgPreview("NOTIFICATION TIMESTAMP", `${ticketNo} — Parent App Notification`),
        },
      ];
    case "Wrong Assigned Route":
      return [
        {
          id: `att-${ticketNo}-1`,
          name: "route_manifest_allocation.pdf",
          size: "510 KB",
          type: "document",
          url: `data:text/plain;charset=utf-8,SmartBus%20Route%20Manifest%20Allocation%20for%20${ticketNo}`,
        },
        {
          id: `att-${ticketNo}-2`,
          name: "parent_residence_location_map.png",
          size: "1.9 MB",
          type: "image",
          url: svgPreview("RESIDENCE LOCATION MAP", `${ticketNo} — UAE Address Verification`),
        },
      ];
    case "Technical/System Issues":
      return [
        {
          id: `att-${ticketNo}-1`,
          name: "parent_mobile_app_error.png",
          size: "890 KB",
          type: "image",
          url: svgPreview("APP DIAGNOSTICS SCREENSHOT", `${ticketNo} — System Diagnostics`),
        },
        {
          id: `att-${ticketNo}-2`,
          name: "bus_telemetry_iot_log.pdf",
          size: "340 KB",
          type: "document",
          url: `data:text/plain;charset=utf-8,SmartBus%20IoT%20Diagnostic%20Log%20for%20${ticketNo}`,
        },
      ];
    case "General Inquiries / Other":
    default:
      return [
        {
          id: `att-${ticketNo}-1`,
          name: "parent_request_document.pdf",
          size: "310 KB",
          type: "document",
          url: `data:text/plain;charset=utf-8,SmartBus%20Parent%20Request%20Document%20for%20${ticketNo}`,
        },
        {
          id: `att-${ticketNo}-2`,
          name: "bus_schedule_reference.png",
          size: "1.1 MB",
          type: "image",
          url: svgPreview("SCHEDULE REFERENCE", `${ticketNo} — SmartBus Route Timing`),
        },
      ];
  }
}

const RAW_MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "TCK-1039",
    ticketNo: "TCK-1039",
    studentName: "Student 09",
    parentName: "Sample parent contact",
    parentPhone: "+971 50 848 2345",
    route: "Route 4B - Downtown & Business Bay",
    branch: "Emirates National School - Dubai",
    category: "Driver/Nanny Behavior",
    dateRaised: "15 Oct 2026, 07:30 AM",
    status: "In Progress",
    assignedTo: "Ahmed K.",
    ageingDays: 5,
    slaDays: 3, // Exceeds SLA (3 days) -> Red
    description: "The bus attendant was late during pickup, causing a delay.",
    attachments: [
      {
        id: "att-1039-1",
        name: "bus_pickup_delay_route4b.jpg",
        size: "2.4 MB",
        type: "image",
        url: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232c3e50%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2245%25%22%20fill%3D%22%23ecf0f1%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20text-anchor%3D%22middle%22%3EBUS%20PICKUP%20TIMESTAMP%20EVIDENCE%3C%2Ftext%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2260%25%22%20fill%3D%22%23f39c12%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3ERoute%204B%20-%20Downtown%20Dubai%2007%3A30%20AM%3C%2Ftext%3E%3C%2Fsvg%3E",
      },
      {
        id: "att-1039-2",
        name: "attendant_trip_sheet_dubai.pdf",
        size: "410 KB",
        type: "document",
        url: "#",
      },
    ],
    activities: [
      {
        id: "act-1039-4",
        type: "parent_reply",
        action: "Reply sent to Parent",
        message: "We have contacted the Dubai route supervisor to verify the attendant's check-in time and will take corrective action.",
        actor: "Ahmed K.",
        timestamp: "15 Oct 2026, 08:10 AM",
        isParentVisible: true,
      },
      {
        id: "act-1039-3",
        type: "status_change",
        action: "Status changed to In Progress",
        actor: "Operations",
        timestamp: "15 Oct 2026, 08:05 AM",
      },
      {
        id: "act-1039-2",
        type: "assigned",
        action: "Assigned to Ahmed K.",
        actor: "System",
        timestamp: "15 Oct 2026, 08:00 AM",
      },
      {
        id: "act-1039-1",
        type: "created",
        action: "Complaint created by Parent",
        actor: "Parent",
        timestamp: "15 Oct 2026, 07:30 AM",
      },
    ],
  },
  {
    id: "TCK-1042",
    ticketNo: "TCK-1042",
    studentName: "Rashid Al Nuaimi",
    parentName: "Sultan Al Nuaimi",
    parentPhone: "+971 50 321 4567",
    route: "Route 04 - Al Barsha & Nad Al Sheba",
    branch: "GEMS Dubai - Al Barsha",
    category: "Bus Delay / Missed Trip",
    dateRaised: "17 Oct 2026, 08:15 AM",
    status: "Open",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 3,
    slaDays: 1, // Exceeds SLA (1 day) -> Red
    description: "Morning pickup bus delayed by over 35 minutes near Al Barsha Mall stop on Hessa Street without any SMS or portal notification.",
    attachments: [
      {
        id: "att-1042-1",
        name: "al_barsha_delay_photo.png",
        size: "1.8 MB",
        type: "image",
        url: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2334495e%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23ecf0f1%22%20font-family%3D%22sans-serif%22%20font-size%3D%2213%22%20text-anchor%3D%22middle%22%3EAl%20Barsha%20Delay%20TCK-1042%3C%2Ftext%3E%3C%2Fsvg%3E",
      },
    ],
    activities: createDefaultActivities(
      "TCK-1042",
      "17 Oct 2026, 08:15 AM",
      "Fatima Al Mansoori",
      "Open"
    ),
  },
  {
    id: "TCK-1031",
    ticketNo: "TCK-1031",
    studentName: "Hamad Al Shamsi",
    parentName: "Saeed Al Shamsi",
    parentPhone: "+971 52 445 6789",
    route: "Route 04 - Al Barsha & Nad Al Sheba",
    branch: "GEMS Dubai - Al Barsha",
    category: "Driver/Nanny Behavior",
    dateRaised: "15 Oct 2026, 05:10 PM",
    status: "Open",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 5,
    slaDays: 3, // Exceeds SLA (3 days) -> Red
    description: "Driver engaged in harsh acceleration and abrupt braking along Umm Suqeim Street; reported by attendant.",
    attachments: [
      {
        id: "att-1031-1",
        name: "speed_telemetry_dubai.pdf",
        size: "620 KB",
        type: "document",
        url: "#",
      },
    ],
    activities: createDefaultActivities(
      "TCK-1031",
      "15 Oct 2026, 05:10 PM",
      "Zayed Al Suwaidi",
      "Open"
    ),
  },
  {
    id: "TCK-1045",
    ticketNo: "TCK-1045",
    studentName: "Mariam Al Kaabi",
    parentName: "Mansoor Al Kaabi",
    parentPhone: "+971 54 556 7890",
    route: "Route 01 - Dubai Marina & JBR",
    branch: "Dubai British School - Jumeirah Park",
    category: "Wrong Assigned Route",
    dateRaised: "19 Oct 2026, 09:00 AM",
    status: "Open",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 1,
    slaDays: 2,
    description: "Student mistakenly tagged to Route 01 morning shift instead of Route 04 after family moved to Jumeirah Park villa.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1045",
      "19 Oct 2026, 09:00 AM",
      "Mariam Al Kaabi",
      "Open"
    ),
  },
  {
    id: "TCK-1044",
    ticketNo: "TCK-1044",
    studentName: "Sara Al Zaabi",
    parentName: "Abdullah Al Zaabi",
    parentPhone: "+971 55 667 8901",
    route: "Route 01 - Dubai Marina & JBR",
    branch: "Dubai British School - Jumeirah Park",
    category: "Technical/System Issues",
    dateRaised: "18 Oct 2026, 11:25 AM",
    status: "In Progress",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 2,
    slaDays: 4,
    description: "Parent mobile application displays continuous offline status for vehicle Dubai P 18492 on live tracking map.",
    attachments: [
      {
        id: "att-1044-1",
        name: "app_screenshot_offline.png",
        size: "950 KB",
        type: "image",
        url: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232c3e50%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23ecf0f1%22%20font-family%3D%22sans-serif%22%20font-size%3D%2213%22%20text-anchor%3D%22middle%22%3EApp%20Screenshot%20Offline%3C%2Ftext%3E%3C%2Fsvg%3E",
      },
    ],
    activities: createDefaultActivities(
      "TCK-1044",
      "18 Oct 2026, 11:25 AM",
      "Fatima Al Mansoori",
      "In Progress"
    ),
  },
  {
    id: "TCK-1038",
    ticketNo: "TCK-1038",
    studentName: "Khalid Al Ameri",
    parentName: "Salim Al Ameri",
    parentPhone: "+971 50 778 9012",
    route: "Route 12 - Abu Dhabi Corniche & Al Bateen",
    branch: "The Sheikh Zayed Academy - Abu Dhabi",
    category: "General Inquiries / Other",
    dateRaised: "16 Oct 2026, 02:05 PM",
    status: "Resolved",
    assignedTo: "Rashid Al Nuaimi",
    ageingDays: 3,
    slaDays: 5,
    description: "Request for permanent change of Friday drop-off point to family residence near Al Bateen Palace area.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1038",
      "16 Oct 2026, 02:05 PM",
      "Rashid Al Nuaimi",
      "Resolved"
    ),
  },
  {
    id: "TCK-1037",
    ticketNo: "TCK-1037",
    studentName: "Zayed Al Marzooqi",
    parentName: "Nasser Al Marzooqi",
    parentPhone: "+971 52 889 0123",
    route: "Route 08 - Khalifa City to Al Reem",
    branch: "The Sheikh Zayed Academy - Abu Dhabi",
    category: "Bus Delay / Missed Trip",
    dateRaised: "17 Oct 2026, 03:30 PM",
    status: "In Progress",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 3,
    slaDays: 1, // Exceeds SLA
    description: "Evening return trip bus arrived 45 minutes late due to unauthorized stop near Yas Island interchange.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1037",
      "17 Oct 2026, 03:30 PM",
      "Zayed Al Suwaidi",
      "In Progress"
    ),
  },
  {
    id: "TCK-1035",
    ticketNo: "TCK-1035",
    studentName: "Reem Al Hashimi",
    parentName: "Tariq Al Hashimi",
    parentPhone: "+971 55 990 1234",
    route: "Route 07 - Jumeirah & Al Wasl",
    branch: "Jumeirah English Speaking School",
    category: "Driver/Nanny Behavior",
    dateRaised: "14 Oct 2026, 06:20 PM",
    status: "Closed",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 6,
    slaDays: 3,
    description: "Bus nanny failed to assist junior student down bus stairs at Jumeirah 3 gate drop point. Counseling completed with supervisor.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1035",
      "14 Oct 2026, 06:20 PM",
      "Mariam Al Kaabi",
      "Closed"
    ),
  },
  {
    id: "TCK-1034",
    ticketNo: "TCK-1034",
    studentName: "Aisha Al Falasi",
    parentName: "Obaid Al Falasi",
    parentPhone: "+971 54 112 2334",
    route: "Route 07 - Jumeirah & Al Wasl",
    branch: "Jumeirah English Speaking School",
    category: "Student Pickup/Drop-off Notifications",
    dateRaised: "18 Oct 2026, 07:45 AM",
    status: "Open",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 2,
    slaDays: 2,
    description: "Morning boarding RFID scan did not record on dashboard; student physically present on bus Dubai K 39201.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1034",
      "18 Oct 2026, 07:45 AM",
      "Fatima Al Mansoori",
      "Open"
    ),
  },
  {
    id: "TCK-1033",
    ticketNo: "TCK-1033",
    studentName: "Omar Al Suwaidi",
    parentName: "Fahad Al Suwaidi",
    parentPhone: "+971 50 223 3445",
    route: "Route 18 - Sharjah Al Majaz to Muhaisnah",
    branch: "Sharjah English School",
    category: "Wrong Assigned Route",
    dateRaised: "15 Oct 2026, 10:15 AM",
    status: "In Progress",
    assignedTo: "Rashid Al Nuaimi",
    ageingDays: 5,
    slaDays: 2,
    description: "Student assigned to afternoon corridor passing Al Taawun instead of direct Al Majaz waterfront route.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1033",
      "15 Oct 2026, 10:15 AM",
      "Rashid Al Nuaimi",
      "In Progress"
    ),
  },
  {
    id: "TCK-1032",
    ticketNo: "TCK-1032",
    studentName: "Fatima Al Mazrouei",
    parentName: "Humaid Al Mazrouei",
    parentPhone: "+971 56 334 4556",
    route: "Route 01 - Dubai Marina & JBR",
    branch: "Dubai British School - Jumeirah Park",
    category: "Technical/System Issues",
    dateRaised: "19 Oct 2026, 12:00 PM",
    status: "Open",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 1,
    slaDays: 4,
    description: "Parent portal displays incorrect student photo and Emirates ID record on mobile pass screen.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1032",
      "19 Oct 2026, 12:00 PM",
      "Zayed Al Suwaidi",
      "Open"
    ),
  },
  {
    id: "TCK-1030",
    ticketNo: "TCK-1030",
    studentName: "Sultan Al Dhaheri",
    parentName: "Bader Al Dhaheri",
    parentPhone: "+971 50 445 5667",
    route: "Route 12 - Abu Dhabi Corniche & Al Bateen",
    branch: "The Sheikh Zayed Academy - Abu Dhabi",
    category: "General Inquiries / Other",
    dateRaised: "12 Oct 2026, 11:30 AM",
    status: "Closed",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 8,
    slaDays: 5,
    description: "Inquiry regarding term 2 school transport fee rebate policy for self-arranged conveyance during exams.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1030",
      "12 Oct 2026, 11:30 AM",
      "Mariam Al Kaabi",
      "Closed"
    ),
  },
  {
    id: "TCK-1029",
    ticketNo: "TCK-1029",
    studentName: "Meera Al Muhairi",
    parentName: "Matar Al Muhairi",
    parentPhone: "+971 55 556 6778",
    route: "Route 09 - Mirdif & Al Warqa",
    branch: "Emirates National School - Dubai",
    category: "Bus Delay / Missed Trip",
    dateRaised: "18 Oct 2026, 04:15 PM",
    status: "Open",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 2,
    slaDays: 1,
    description: "Bus bypassed Mirdif Uptown park pickup stop completely; parent had to arrange private taxi.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1029",
      "18 Oct 2026, 04:15 PM",
      "Fatima Al Mansoori",
      "Open"
    ),
  },
  {
    id: "TCK-1028",
    ticketNo: "TCK-1028",
    studentName: "Zainab Al Hosani",
    parentName: "Jamal Al Hosani",
    parentPhone: "+971 52 667 7889",
    route: "Route 09 - Mirdif & Al Warqa",
    branch: "Emirates National School - Dubai",
    category: "Student Pickup/Drop-off Notifications",
    dateRaised: "19 Oct 2026, 02:20 PM",
    status: "Open",
    assignedTo: "Rashid Al Nuaimi",
    ageingDays: 1,
    slaDays: 2,
    description: "Delayed drop notification received 40 minutes after actual arrival at Al Warqa 2 villa gate.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1028",
      "19 Oct 2026, 02:20 PM",
      "Rashid Al Nuaimi",
      "Open"
    ),
  },
  {
    id: "TCK-1027",
    ticketNo: "TCK-1027",
    studentName: "Salim Al Qubaisi",
    parentName: "Khalfan Al Qubaisi",
    parentPhone: "+971 54 778 8990",
    route: "Route 08 - Khalifa City to Al Reem",
    branch: "The Sheikh Zayed Academy - Abu Dhabi",
    category: "Driver/Nanny Behavior",
    dateRaised: "17 Oct 2026, 09:45 AM",
    status: "In Progress",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 3,
    slaDays: 3,
    description: "Driver was allegedly talking on phone while operating the vehicle near Sheikh Zayed Bridge.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1027",
      "17 Oct 2026, 09:45 AM",
      "Zayed Al Suwaidi",
      "In Progress"
    ),
  },
  {
    id: "TCK-1026",
    ticketNo: "TCK-1026",
    studentName: "Shamsa Al Ketbi",
    parentName: "Saif Al Ketbi",
    parentPhone: "+971 50 889 9001",
    route: "Route 04 - Al Barsha & Nad Al Sheba",
    branch: "GEMS Dubai - Al Barsha",
    category: "Wrong Assigned Route",
    dateRaised: "13 Oct 2026, 10:00 AM",
    status: "Resolved",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 7,
    slaDays: 2,
    description: "Drop route correction completed and verified by transport manager; re-assigned to Al Barsha South.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1026",
      "13 Oct 2026, 10:00 AM",
      "Mariam Al Kaabi",
      "Resolved"
    ),
  },
  {
    id: "TCK-1025",
    ticketNo: "TCK-1025",
    studentName: "Hazza Al Balooshi",
    parentName: "Yousef Al Balooshi",
    parentPhone: "+971 56 990 0112",
    route: "Route 15 - Dubai Silicon Oasis & Arabian Ranches",
    branch: "GEMS Dubai - Silicon Oasis",
    category: "Technical/System Issues",
    dateRaised: "14 Oct 2026, 01:50 PM",
    status: "Closed",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 6,
    slaDays: 4,
    description: "GPS tracking device recalibrated on vehicle Dubai C 60192; telematics stream confirmed stable.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1025",
      "14 Oct 2026, 01:50 PM",
      "Fatima Al Mansoori",
      "Closed"
    ),
  },
  {
    id: "TCK-1024",
    ticketNo: "TCK-1024",
    studentName: "Moza Al Tayer",
    parentName: "Suhail Al Tayer",
    parentPhone: "+971 50 112 3344",
    route: "Route 18 - Sharjah Al Majaz to Muhaisnah",
    branch: "Sharjah English School",
    category: "General Inquiries / Other",
    dateRaised: "19 Oct 2026, 03:10 PM",
    status: "Open",
    assignedTo: "Rashid Al Nuaimi",
    ageingDays: 1,
    slaDays: 5,
    description: "Request to know procedure for temporary bus pass during National Day rehearsal week.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1024",
      "19 Oct 2026, 03:10 PM",
      "Rashid Al Nuaimi",
      "Open"
    ),
  },
  {
    id: "TCK-1023",
    ticketNo: "TCK-1023",
    studentName: "Buti Al Maktoum",
    parentName: "Maktoum Al Nuaimi",
    parentPhone: "+971 52 223 4455",
    route: "Route 07 - Jumeirah & Al Wasl",
    branch: "Jumeirah English Speaking School",
    category: "Bus Delay / Missed Trip",
    dateRaised: "15 Oct 2026, 08:30 AM",
    status: "In Progress",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 5,
    slaDays: 1, // Exceeds SLA
    description: "Bus broke down midway near Safa Park checkpost; replacement van took 50 minutes to arrive.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1023",
      "15 Oct 2026, 08:30 AM",
      "Zayed Al Suwaidi",
      "In Progress"
    ),
  },
  {
    id: "TCK-1022",
    ticketNo: "TCK-1022",
    studentName: "Shaikha Al Marri",
    parentName: "Marwan Al Marri",
    parentPhone: "+971 55 334 5566",
    route: "Route 01 - Dubai Marina & JBR",
    branch: "Dubai British School - Jumeirah Park",
    category: "Student Pickup/Drop-off Notifications",
    dateRaised: "16 Oct 2026, 11:15 AM",
    status: "Resolved",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 4,
    slaDays: 2,
    description: "Automated SMS notification service restored after etisalat telecom gateway timeout resolved.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1022",
      "16 Oct 2026, 11:15 AM",
      "Mariam Al Kaabi",
      "Resolved"
    ),
  },
  {
    id: "TCK-1021",
    ticketNo: "TCK-1021",
    studentName: "Nasser Al Rumaithi",
    parentName: "Harib Al Rumaithi",
    parentPhone: "+971 54 445 6677",
    route: "Route 09 - Mirdif & Al Warqa",
    branch: "Emirates National School - Dubai",
    category: "Driver/Nanny Behavior",
    dateRaised: "18 Oct 2026, 05:00 PM",
    status: "Open",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 2,
    slaDays: 3,
    description: "Attendant did not verify student identity tag before releasing student at Shorooq Mirdif gate.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1021",
      "18 Oct 2026, 05:00 PM",
      "Fatima Al Mansoori",
      "Open"
    ),
  },
  {
    id: "TCK-1020",
    ticketNo: "TCK-1020",
    studentName: "Hessa Al Ghafli",
    parentName: "Mubarak Al Ghafli",
    parentPhone: "+971 50 556 7788",
    route: "Route 08 - Khalifa City to Al Reem",
    branch: "The Sheikh Zayed Academy - Abu Dhabi",
    category: "Wrong Assigned Route",
    dateRaised: "17 Oct 2026, 02:10 PM",
    status: "Open",
    assignedTo: "Rashid Al Nuaimi",
    ageingDays: 3,
    slaDays: 2, // Exceeds SLA
    description: "Drop point allocated 1.4km away from verified villa address in Khalifa City A; needs immediate route reassignment.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1020",
      "17 Oct 2026, 02:10 PM",
      "Rashid Al Nuaimi",
      "Open"
    ),
  },
  {
    id: "TCK-1019",
    ticketNo: "TCK-1019",
    studentName: "Ghanim Al Suwaidi",
    parentName: "Marwan Al Suwaidi",
    parentPhone: "+971 52 667 8899",
    route: "Route 15 - Dubai Silicon Oasis & Arabian Ranches",
    branch: "GEMS Dubai - Silicon Oasis",
    category: "Technical/System Issues",
    dateRaised: "13 Oct 2026, 04:30 PM",
    status: "Closed",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 7,
    slaDays: 4,
    description: "Push notifications fixed in parent app version 2.4.1 release update on iOS and Android.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1019",
      "13 Oct 2026, 04:30 PM",
      "Zayed Al Suwaidi",
      "Closed"
    ),
  },
  {
    id: "TCK-1018",
    ticketNo: "TCK-1018",
    studentName: "Mira Al Darmaki",
    parentName: "Khamis Al Darmaki",
    parentPhone: "+971 55 778 9900",
    route: "Route 12 - Abu Dhabi Corniche & Al Bateen",
    branch: "The Sheikh Zayed Academy - Abu Dhabi",
    category: "General Inquiries / Other",
    dateRaised: "19 Oct 2026, 04:45 PM",
    status: "Open",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 1,
    slaDays: 5,
    description: "Query regarding availability of air-conditioned fleet for upcoming summer semester.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1018",
      "19 Oct 2026, 04:45 PM",
      "Mariam Al Kaabi",
      "Open"
    ),
  },
  {
    id: "TCK-1017",
    ticketNo: "TCK-1017",
    studentName: "Saeed Al Kaabi",
    parentName: "Ali Al Kaabi",
    parentPhone: "+971 56 889 0011",
    route: "Route 07 - Jumeirah & Al Wasl",
    branch: "Jumeirah English Speaking School",
    category: "Bus Delay / Missed Trip",
    dateRaised: "16 Oct 2026, 08:20 AM",
    status: "Resolved",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 4,
    slaDays: 1,
    description: "Route delay compensated by adding secondary backup express van for morning shift along Jumeirah Beach Road.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1017",
      "16 Oct 2026, 08:20 AM",
      "Fatima Al Mansoori",
      "Resolved"
    ),
  },
  {
    id: "TCK-1016",
    ticketNo: "TCK-1016",
    studentName: "Mahra Al Nayeli",
    parentName: "Mohamed Al Nayeli",
    parentPhone: "+971 50 990 1122",
    route: "Route 04 - Al Barsha & Nad Al Sheba",
    branch: "GEMS Dubai - Al Barsha",
    category: "Student Pickup/Drop-off Notifications",
    dateRaised: "15 Oct 2026, 03:45 PM",
    status: "In Progress",
    assignedTo: "Rashid Al Nuaimi",
    ageingDays: 5,
    slaDays: 2, // Exceeds SLA
    description: "Notification timestamp shows 20-minute skew compared to actual vehicle arrival time at Al Barsha 2.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1016",
      "15 Oct 2026, 03:45 PM",
      "Rashid Al Nuaimi",
      "In Progress"
    ),
  },
  {
    id: "TCK-1015",
    ticketNo: "TCK-1015",
    studentName: "Abdullah Al Zaabi",
    parentName: "Humaid Al Zaabi",
    parentPhone: "+971 52 112 2233",
    route: "Route 15 - Dubai Silicon Oasis & Arabian Ranches",
    branch: "GEMS Dubai - Silicon Oasis",
    category: "Driver/Nanny Behavior",
    dateRaised: "19 Oct 2026, 08:00 AM",
    status: "Open",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 1,
    slaDays: 3,
    description: "Driver skipped designated pedestrian crossing halt near Cedre Villas gate; parent reported via app.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1015",
      "19 Oct 2026, 08:00 AM",
      "Zayed Al Suwaidi",
      "Open"
    ),
  },
  {
    id: "TCK-1014",
    ticketNo: "TCK-1014",
    studentName: "Mariam Al Budoor",
    parentName: "Saif Al Budoor",
    parentPhone: "+971 54 223 3344",
    route: "Route 01 - Dubai Marina & JBR",
    branch: "Dubai British School - Jumeirah Park",
    category: "Wrong Assigned Route",
    dateRaised: "18 Oct 2026, 10:30 AM",
    status: "In Progress",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 2,
    slaDays: 2,
    description: "Student placed in Route 01 bus instead of Route 04; student escorted safely by transport coordinator.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1014",
      "18 Oct 2026, 10:30 AM",
      "Mariam Al Kaabi",
      "In Progress"
    ),
  },
  {
    id: "TCK-1013",
    ticketNo: "TCK-1013",
    studentName: "Thani Al Marzooqi",
    parentName: "Suhail Al Marzooqi",
    parentPhone: "+971 55 334 4455",
    route: "Route 09 - Mirdif & Al Warqa",
    branch: "Emirates National School - Dubai",
    category: "Technical/System Issues",
    dateRaised: "14 Oct 2026, 11:00 AM",
    status: "Resolved",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 6,
    slaDays: 4,
    description: "RFID card reader hardware replaced on bus Dubai L 88201; all card taps now registered in real time.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1013",
      "14 Oct 2026, 11:00 AM",
      "Fatima Al Mansoori",
      "Resolved"
    ),
  },
  {
    id: "TCK-1012",
    ticketNo: "TCK-1012",
    studentName: "Laila Al Rostamani",
    parentName: "Marwan Al Rostamani",
    parentPhone: "+971 50 445 5566",
    route: "Route 18 - Sharjah Al Majaz to Muhaisnah",
    branch: "Sharjah English School",
    category: "General Inquiries / Other",
    dateRaised: "11 Oct 2026, 09:20 AM",
    status: "Closed",
    assignedTo: "Rashid Al Nuaimi",
    ageingDays: 9,
    slaDays: 5,
    description: "Inquiry on whether bus attendant has valid civil defense first-aid certification. Certification details shared with parent.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1012",
      "11 Oct 2026, 09:20 AM",
      "Rashid Al Nuaimi",
      "Closed"
    ),
  },
  {
    id: "TCK-1011",
    ticketNo: "TCK-1011",
    studentName: "Zayed Al Nahyan",
    parentName: "Khalifa Al Mansoori",
    parentPhone: "+971 52 556 6677",
    route: "Route 08 - Khalifa City to Al Reem",
    branch: "The Sheikh Zayed Academy - Abu Dhabi",
    category: "Bus Delay / Missed Trip",
    dateRaised: "18 Oct 2026, 03:50 PM",
    status: "Open",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 2,
    slaDays: 1, // Exceeds SLA
    description: "Bus departed 10 minutes earlier than scheduled time, causing 3 senior students to miss the trip at Al Raha Beach.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1011",
      "18 Oct 2026, 03:50 PM",
      "Zayed Al Suwaidi",
      "Open"
    ),
  },
  {
    id: "TCK-1010",
    ticketNo: "TCK-1010",
    studentName: "Maitha Al Nuaimi",
    parentName: "Humaid Al Nuaimi",
    parentPhone: "+971 55 667 7788",
    route: "Route 07 - Jumeirah & Al Wasl",
    branch: "Jumeirah English Speaking School",
    category: "Student Pickup/Drop-off Notifications",
    dateRaised: "17 Oct 2026, 04:30 PM",
    status: "In Progress",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 3,
    slaDays: 2, // Exceeds SLA
    description: "WhatsApp and SMS broadcast gateway delayed alert by over an hour on Friday afternoon.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1010",
      "17 Oct 2026, 04:30 PM",
      "Mariam Al Kaabi",
      "In Progress"
    ),
  },
  {
    id: "TCK-1009",
    ticketNo: "TCK-1009",
    studentName: "Sultan Al Qasimi",
    parentName: "Saud Al Qasimi",
    parentPhone: "+971 56 778 8899",
    route: "Route 04 - Al Barsha & Nad Al Sheba",
    branch: "GEMS Dubai - Al Barsha",
    category: "Driver/Nanny Behavior",
    dateRaised: "19 Oct 2026, 02:00 PM",
    status: "Open",
    assignedTo: "Fatima Al Mansoori",
    ageingDays: 1,
    slaDays: 3,
    description: "Complaint regarding loud non-educational radio station playing on bus audio system during morning route.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1009",
      "19 Oct 2026, 02:00 PM",
      "Fatima Al Mansoori",
      "Open"
    ),
  },
  {
    id: "TCK-1008",
    ticketNo: "TCK-1008",
    studentName: "Alia Al Suwaidi",
    parentName: "Rashid Al Suwaidi",
    parentPhone: "+971 50 889 9900",
    route: "Route 15 - Dubai Silicon Oasis & Arabian Ranches",
    branch: "GEMS Dubai - Silicon Oasis",
    category: "Wrong Assigned Route",
    dateRaised: "12 Oct 2026, 11:45 AM",
    status: "Closed",
    assignedTo: "Rashid Al Nuaimi",
    ageingDays: 8,
    slaDays: 2,
    description: "Re-routed to direct Arabian Ranches Saheel bus service upon parent formal application.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1008",
      "12 Oct 2026, 11:45 AM",
      "Rashid Al Nuaimi",
      "Closed"
    ),
  },
  {
    id: "TCK-1007",
    ticketNo: "TCK-1007",
    studentName: "Hamdan Al Maktoum",
    parentName: "Sultan Al Maktoum",
    parentPhone: "+971 52 990 0011",
    route: "Route 09 - Mirdif & Al Warqa",
    branch: "Emirates National School - Dubai",
    category: "Technical/System Issues",
    dateRaised: "15 Oct 2026, 01:20 PM",
    status: "In Progress",
    assignedTo: "Zayed Al Suwaidi",
    ageingDays: 5,
    slaDays: 4, // Exceeds SLA
    description: "Live onboard CCTV camera stream fails to load on parent web portal during trip operational hours.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1007",
      "15 Oct 2026, 01:20 PM",
      "Zayed Al Suwaidi",
      "In Progress"
    ),
  },
  {
    id: "TCK-1006",
    ticketNo: "TCK-1006",
    studentName: "Noor Al Shamsi",
    parentName: "Salem Al Shamsi",
    parentPhone: "+971 54 101 2233",
    route: "Route 01 - Dubai Marina & JBR",
    branch: "Dubai British School - Jumeirah Park",
    category: "General Inquiries / Other",
    dateRaised: "19 Oct 2026, 09:15 AM",
    status: "Open",
    assignedTo: "Mariam Al Kaabi",
    ageingDays: 1,
    slaDays: 5,
    description: "Request for guidelines on luggage size allowed for school marching band instrument transport on bus.",
    attachments: [],
    activities: createDefaultActivities(
      "TCK-1006",
      "19 Oct 2026, 09:15 AM",
      "Mariam Al Kaabi",
      "Open"
    ),
  },
];

export const MOCK_COMPLAINTS: Complaint[] = RAW_MOCK_COMPLAINTS.map((c) => ({
  ...c,
  attachments:
    c.attachments && c.attachments.length > 0
      ? c.attachments
      : getCategoryDummyAttachments(c.ticketNo, c.category),
}));


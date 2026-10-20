import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import type { ComplaintStatus, ComplaintAttachment } from "@/types/complaints";
import { useComplaint, complaintsStore } from "@/components/sb/complaints/complaintsStore";
import { ComplaintDetailHeader } from "@/components/sb/complaints/ComplaintDetailHeader";
import { ComplaintDetailsPanel } from "@/components/sb/complaints/ComplaintDetailsPanel";
import { ComplaintCommunicationTabs } from "@/components/sb/complaints/ComplaintCommunicationTabs";
import { ComplaintActivityHistory } from "@/components/sb/complaints/ComplaintActivityHistory";
import { AttachmentPreviewModal } from "@/components/sb/complaints/AttachmentPreviewModal";

export const Route = createFileRoute("/complaints/$ticketId")({
  head: () => ({
    meta: [
      { title: "Complaint Detail / Review — SmartBus Manager" },
      { name: "description", content: "Complaint Detail & Review (ETSB-1047 FRS Section 6.2)." },
      { property: "og:title", content: "Complaint Detail / Review — SmartBus Manager" },
    ],
  }),
  component: ComplaintDetailPage,
});

function ComplaintDetailPage() {
  const { ticketId } = useParams({ from: "/complaints/$ticketId" });
  const complaint = useComplaint(ticketId);

  const [previewAttachment, setPreviewAttachment] = useState<ComplaintAttachment | null>(null);

  const handleStatusChange = useCallback(
    (newStatus: ComplaintStatus) => {
      if (!complaint) return;
      complaintsStore.updateStatus(complaint.ticketNo, newStatus, "Operations");
    },
    [complaint]
  );

  const handleAssignChange = useCallback(
    (agent: string) => {
      if (!complaint) return;
      complaintsStore.assignAgent(complaint.ticketNo, agent, "Operations");
    },
    [complaint]
  );

  const handleMarkResolved = useCallback(() => {
    if (!complaint) return;
    complaintsStore.updateStatus(complaint.ticketNo, "Resolved", "Operations");
  }, [complaint]);

  const handleSendReply = useCallback(
    (reply: string) => {
      if (!complaint) return;
      complaintsStore.addParentReply(complaint.ticketNo, reply, complaint.assignedTo || "Operations");
    },
    [complaint]
  );

  const handleAddNote = useCallback(
    (note: string) => {
      if (!complaint) return;
      complaintsStore.addInternalNote(complaint.ticketNo, note, "Operations");
    },
    [complaint]
  );

  const handleAddDummyAttachment = useCallback(() => {
    if (!complaint) return;
    const dummyOptions: Omit<ComplaintAttachment, "id">[] = [
      {
        name: "cctv_bus_footage_snapshot.jpg",
        size: "1.4 MB",
        type: "image",
        url: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232c3e50%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2245%25%22%20fill%3D%22%23ecf0f1%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20text-anchor%3D%22middle%22%3ECCTV%20CABIN%20FOOTAGE%20SNAPSHOT%3C%2Ftext%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2260%25%22%20fill%3D%22%23f39c12%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3ESmartBus%20UAE%20Incident%20Evidence%3C%2Ftext%3E%3C%2Fsvg%3E",
      },
      {
        name: "bus_telemetry_manifest.pdf",
        size: "420 KB",
        type: "document",
        url: `data:text/plain;charset=utf-8,SmartBus%20Telematics%20Manifest%20Log%20-%20UAE%20${complaint.ticketNo}`,
      },
      {
        name: "rfid_tap_gate_verification.pdf",
        size: "280 KB",
        type: "document",
        url: `data:text/plain;charset=utf-8,SmartBus%20RFID%20Tap%20Verification%20Report%20${complaint.ticketNo}`,
      },
      {
        name: "incident_location_gps_map.png",
        size: "2.1 MB",
        type: "image",
        url: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2334495e%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23ecf0f1%22%20font-family%3D%22sans-serif%22%20font-size%3D%2213%22%20text-anchor%3D%22middle%22%3EIncident%20Location%20GPS%20Map%20-%20UAE%3C%2Ftext%3E%3C%2Fsvg%3E",
      },
    ];
    const idx = complaint.attachments.length % dummyOptions.length;
    const selected = dummyOptions[idx] ?? dummyOptions[0]!;
    const newAttachment: ComplaintAttachment = {
      id: `att-${complaint.ticketNo}-${Date.now()}`,
      name: selected.name,
      size: selected.size,
      type: selected.type,
      url: selected.url,
    };
    complaintsStore.addAttachment(complaint.ticketNo, newAttachment);
  }, [complaint]);

  if (!complaint) {
    return (
      <div className="flex h-full w-full flex-col p-[10px] pb-[8px]">
        <div className="flex h-[40px] items-center bg-sb-header px-3 text-sb-header-fg">
          <Link
            to="/complaints"
            className="flex items-center gap-1 text-[12px] text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center bg-sb-panel p-8">
          <div className="max-w-md rounded-xs border border-sb-grid-line p-6 text-center shadow-xs">
            <AlertCircle className="mx-auto h-8 w-8 text-sb-fail" />
            <h2 className="mt-3 text-[14px] font-semibold text-sb-text">Ticket Not Found</h2>
            <p className="mt-2 text-[12px] text-sb-text-dim">
              The complaint ticket <strong>{ticketId}</strong> could not be located in the system.
            </p>
            <div className="mt-5">
              <Link
                to="/complaints"
                className="inline-flex items-center gap-1 rounded-xs bg-sb-sidebar px-3 py-1.5 text-[12px] text-white hover:bg-sb-sidebar-active"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to Complaints Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col p-[10px] pb-[8px]">
      {/* 1. Header Section (FRS §6.2) */}
      <ComplaintDetailHeader
        ticketNo={complaint.ticketNo}
        status={complaint.status}
        assignedTo={complaint.assignedTo}
        onStatusChange={handleStatusChange}
        onAssignChange={handleAssignChange}
        onMarkResolved={handleMarkResolved}
      />

      {/* 2. Main Scrollable Content */}
      <div className="sb-scroll flex-1 overflow-y-auto pt-2.5 pb-2">
        <div className="flex flex-col gap-3">
          {/* Top Two-Column Grid: Left Complaint Details & Right Communication */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {/* Left: Complaint Details Panel */}
            <ComplaintDetailsPanel
              complaint={complaint}
              onPreviewAttachment={setPreviewAttachment}
              onAddDummyAttachment={handleAddDummyAttachment}
            />

            {/* Right: Reply to Parent / Internal Notes */}
            <ComplaintCommunicationTabs
              ticketNo={complaint.ticketNo}
              onSendReply={handleSendReply}
              onAddNote={handleAddNote}
            />
          </div>

          {/* Bottom Section: Activity / History */}
          <ComplaintActivityHistory activities={complaint.activities} />
        </div>
      </div>

      {/* Attachment Preview Modal */}
      <AttachmentPreviewModal
        attachment={previewAttachment}
        onClose={() => setPreviewAttachment(null)}
      />
    </div>
  );
}

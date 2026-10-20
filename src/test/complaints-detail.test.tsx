import { describe, expect, it, beforeEach } from "vitest";
import { complaintsStore } from "@/components/sb/complaints/complaintsStore";

describe("Screen 2 — Complaint Detail / Review Store & Logic", () => {
  beforeEach(() => {
    complaintsStore.reset();
  });

  it("loads sample ticket TCK-1039 with exact FRS details", () => {
    const tck = complaintsStore.getById("TCK-1039");
    expect(tck).toBeDefined();
    expect(tck?.ticketNo).toBe("TCK-1039");
    expect(tck?.category).toBe("Driver/Nanny Behavior");
    expect(tck?.studentName).toContain("Student 09");
    expect(tck?.route).toContain("Route 4B");
    expect(tck?.parentName).toBe("Sample parent contact");
    expect(tck?.description).toBe("The bus attendant was late during pickup, causing a delay.");
    expect(tck?.assignedTo).toBe("Ahmed K.");
    expect(tck?.status).toBe("In Progress");
    expect(tck?.attachments.length).toBeGreaterThan(0);
    expect(tck?.activities.length).toBeGreaterThan(0);
  });

  it("updates status and records status_change in activity history", () => {
    const initial = complaintsStore.getById("TCK-1039");
    const initialActs = initial?.activities.length || 0;

    const res = complaintsStore.updateStatus("TCK-1039", "Resolved", "Operations");
    expect(res).toBe(true);

    const updated = complaintsStore.getById("TCK-1039");
    expect(updated?.status).toBe("Resolved");
    expect(updated?.activities.length).toBe(initialActs + 1);
    expect(updated?.activities[0]?.type).toBe("status_change");
    expect(updated?.activities[0]?.action).toContain("Resolved");
  });

  it("assigns agent and records assignment in activity history", () => {
    const initial = complaintsStore.getById("TCK-1039");
    const initialActs = initial?.activities.length || 0;

    const res = complaintsStore.assignAgent("TCK-1039", "Fatima Al Mansoori", "Operations");
    expect(res).toBe(true);

    const updated = complaintsStore.getById("TCK-1039");
    expect(updated?.assignedTo).toBe("Fatima Al Mansoori");
    expect(updated?.activities.length).toBe(initialActs + 1);
    expect(updated?.activities[0]?.type).toBe("assigned");
    expect(updated?.activities[0]?.action).toBe("Assigned to Fatima Al Mansoori");
  });

  it("adds parent reply marked as parent-visible", () => {
    const res = complaintsStore.addParentReply(
      "TCK-1039",
      "We have addressed this issue with the transport coordinator.",
      "Ahmed K."
    );
    expect(res).toBe(true);

    const updated = complaintsStore.getById("TCK-1039");
    const latest = updated?.activities[0];
    expect(latest?.type).toBe("parent_reply");
    expect(latest?.message).toBe("We have addressed this issue with the transport coordinator.");
    expect(latest?.isParentVisible).toBe(true);
    expect(latest?.isInternal).toBeUndefined();
  });

  it("adds internal note marked as confidential/internal", () => {
    const res = complaintsStore.addInternalNote(
      "TCK-1039",
      "Driver warned for route deviation. Replacement nanny scheduled for tomorrow.",
      "Operations"
    );
    expect(res).toBe(true);

    const updated = complaintsStore.getById("TCK-1039");
    const latest = updated?.activities[0];
    expect(latest?.type).toBe("internal_note");
    expect(latest?.message).toBe("Driver warned for route deviation. Replacement nanny scheduled for tomorrow.");
    expect(latest?.isInternal).toBe(true);
    expect(latest?.isParentVisible).toBeUndefined();
  });

  it("allows unassigning an agent", () => {
    const res = complaintsStore.assignAgent("TCK-1039", "", "Operations");
    expect(res).toBe(true);

    const updated = complaintsStore.getById("TCK-1039");
    expect(updated?.assignedTo).toBe("");
  });

  it("ensures all complaints have dummy attachments by default in Screen 2", () => {
    const all = complaintsStore.getAll();
    expect(all.length).toBeGreaterThan(0);
    all.forEach((complaint) => {
      expect(complaint.attachments.length).toBeGreaterThan(0);
      expect(complaint.attachments[0]?.name).toBeDefined();
      expect(complaint.attachments[0]?.size).toBeDefined();
    });
  });

  it("allows adding a dummy attachment to a complaint", () => {
    const initial = complaintsStore.getById("TCK-1039");
    const initialCount = initial?.attachments.length || 0;

    const res = complaintsStore.addAttachment("TCK-1039", {
      id: "att-manual-1",
      name: "extra_evidence_photo.jpg",
      size: "1.2 MB",
      type: "image",
      url: "https://example.com/photo.jpg",
    });
    expect(res).toBe(true);

    const updated = complaintsStore.getById("TCK-1039");
    expect(updated?.attachments.length).toBe(initialCount + 1);
    expect(updated?.attachments.some((a) => a.name === "extra_evidence_photo.jpg")).toBe(true);
  });
});

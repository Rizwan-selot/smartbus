import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { routeTree } from "@/routeTree.gen";
import { MOCK_COMPLAINTS, CATEGORY_SLA_MAP, ALL_CATEGORIES } from "@/components/sb/complaints/mockData";
import { ComplaintStatusBadge } from "@/components/sb/complaints/ComplaintStatusBadge";

describe("Complaints Dashboard Routing & Data Integrity", () => {
  it("matches /complaints route properly in router", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes("/complaints");
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.at(-1)?.routeId).toBe("/complaints/");
  });

  it("matches /complaints/TCK-1042 detail route properly in router", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes("/complaints/TCK-1042");
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.at(-1)?.routeId).toBe("/complaints/$ticketId");
  });

  it("contains all 6 FRS complaint categories in mock dataset", () => {
    const datasetCategories = new Set(MOCK_COMPLAINTS.map((c) => c.category));
    ALL_CATEGORIES.forEach((cat) => {
      expect(datasetCategories.has(cat)).toBe(true);
    });
  });

  it("contains all required statuses in dataset (Open, In Progress, Resolved, Closed)", () => {
    const statuses = new Set(MOCK_COMPLAINTS.map((c) => c.status));
    expect(statuses.has("Open")).toBe(true);
    expect(statuses.has("In Progress")).toBe(true);
    expect(statuses.has("Resolved")).toBe(true);
    expect(statuses.has("Closed")).toBe(true);
  });

  it("identifies SLA breach accurately according to category SLA", () => {
    const breached = MOCK_COMPLAINTS.filter((c) => c.ageingDays > c.slaDays);
    const withinSla = MOCK_COMPLAINTS.filter((c) => c.ageingDays <= c.slaDays);

    expect(breached.length).toBeGreaterThan(0);
    expect(withinSla.length).toBeGreaterThan(0);

    // Verify SLA map values
    expect(CATEGORY_SLA_MAP["Bus Delay / Missed Trip"]).toBe(1);
    expect(CATEGORY_SLA_MAP["Student Pickup/Drop-off Notifications"]).toBe(2);
    expect(CATEGORY_SLA_MAP["Wrong Assigned Route"]).toBe(2);
    expect(CATEGORY_SLA_MAP["Driver/Nanny Behavior"]).toBe(3);
    expect(CATEGORY_SLA_MAP["Technical/System Issues"]).toBe(4);
    expect(CATEGORY_SLA_MAP["General Inquiries / Other"]).toBe(5);
  });

  it("has sample ticket numbers matching FRS specifications", () => {
    const ticketNos = MOCK_COMPLAINTS.map((c) => c.ticketNo);
    expect(ticketNos).toContain("TCK-1042");
    expect(ticketNos).toContain("TCK-1039");
    expect(ticketNos).toContain("TCK-1031");
  });

  it("renders status as bold colored text without pill backgrounds (matching live screen)", () => {
    const { rerender } = render(<ComplaintStatusBadge status="Open" />);
    const openEl = screen.getByText("Open");
    expect(openEl.className).toContain("text-[#FF9435]");
    expect(openEl.className).toContain("font-bold");
    expect(openEl.className).not.toContain("bg-");

    rerender(<ComplaintStatusBadge status="In Progress" />);
    const progressEl = screen.getByText("In Progress");
    expect(progressEl.className).toContain("text-[#2E7D32]");
    expect(progressEl.className).toContain("font-bold");
    expect(progressEl.className).not.toContain("bg-");

    rerender(<ComplaintStatusBadge status="Closed" />);
    const closedEl = screen.getByText("Closed");
    expect(closedEl.className).toContain("text-[#6B7280]");
    expect(closedEl.className).toContain("font-bold");
    expect(closedEl.className).not.toContain("bg-");

    rerender(<ComplaintStatusBadge status="Resolved" />);
    const resolvedEl = screen.getByText("Resolved");
    expect(resolvedEl.className).toContain("text-[#2E7D32]");
    expect(resolvedEl.className).toContain("font-bold");
    expect(resolvedEl.className).not.toContain("bg-");
  });
});

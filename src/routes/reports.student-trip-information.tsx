import { createFileRoute } from "@tanstack/react-router";
import { DataGrid, ReportHeader, ReportPagination } from "@/components/sb/DataGrid";

export const Route = createFileRoute("/reports/student-trip-information")({
  head: () => ({
    meta: [
      { title: "Student Trip Information — SmartBus Manager" },
      { name: "description", content: "Student trip assignments, pickup/drop points, schedules and vehicles." },
      { property: "og:title", content: "Student Trip Information — SmartBus Manager" },
      { property: "og:description", content: "Student trip assignments, pickup/drop points, schedules and vehicles." },
    ],
  }),
  component: StudentTripReport,
});

function StudentTripReport() {
  return (
    <div className="flex h-full w-full flex-col p-[10px] pb-[8px]">
      <ReportHeader title="Student Trip Information" />
      <DataGrid />
      <ReportPagination />
    </div>
  );
}

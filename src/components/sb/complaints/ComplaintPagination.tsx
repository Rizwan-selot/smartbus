import { RefreshCw, FileSpreadsheet, FileDown, ChevronLeft, ChevronRight, AlignJustify } from "lucide-react";
import type { Complaint } from "@/types/complaints";

interface Props {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onRefresh: () => void;
  dataToExport: Complaint[];
}

export function ComplaintPagination({
  currentPage,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  onRefresh,
  dataToExport,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startItem = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(totalRecords, currentPage * pageSize);

  // Export to Excel / CSV
  const handleExportExcel = () => {
    if (dataToExport.length === 0) return;

    const headers = [
      "Ticket No.",
      "Student Name",
      "Parent Name",
      "Route",
      "Category",
      "Date Raised",
      "Status",
      "Assigned To",
      "Ageing (Days)",
      "SLA (Days)",
      "SLA Breached",
    ];

    const rows = dataToExport.map((c) => [
      c.ticketNo,
      `"${c.studentName}"`,
      `"${c.parentName}"`,
      `"${c.route}"`,
      `"${c.category}"`,
      c.dateRaised,
      c.status,
      `"${c.assignedTo}"`,
      c.ageingDays,
      c.slaDays,
      c.ageingDays > c.slaDays ? "YES" : "NO",
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Complaints_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export to PDF / Print view
  const handleExportPDF = () => {
    if (dataToExport.length === 0) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Complaints Dashboard Report — SmartBus</title>
          <style>
            body { font-family: 'Open Sans', Arial, sans-serif; font-size: 11px; color: #333; margin: 20px; }
            h2 { font-size: 16px; margin-bottom: 4px; color: #1f4f4f; }
            .meta { font-size: 10px; color: #666; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background: #ececec; border: 1px solid #d9d9d9; padding: 6px 8px; text-align: left; font-size: 10.5px; font-weight: 600; }
            td { border: 1px solid #d9d9d9; padding: 5px 8px; font-size: 10.5px; }
            .badge-open { color: #FF9435; font-weight: bold; text-align: center; }
            .badge-inprogress, .badge-progress { color: #2E7D32; font-weight: bold; text-align: center; }
            .badge-resolved { color: #2E7D32; font-weight: bold; text-align: center; }
            .badge-closed { color: #6B7280; font-weight: bold; text-align: center; }
            .breach { color: #e01b1b; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>SmartBus Manager — Complaints Report</h2>
          <div class="meta">Generated: ${new Date().toLocaleString()} | Total Records: ${dataToExport.length}</div>
          <table>
            <thead>
              <tr>
                <th>Ticket No.</th>
                <th>Student / Parent</th>
                <th>Route</th>
                <th>Category</th>
                <th>Date Raised</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Ageing</th>
              </tr>
            </thead>
            <tbody>
              ${dataToExport
                .map(
                  (c) => `
                <tr>
                  <td><strong>${c.ticketNo}</strong></td>
                  <td>${c.studentName} <br/><small style="color:#666">${c.parentName}</small></td>
                  <td>${c.route}</td>
                  <td>${c.category}</td>
                  <td>${c.dateRaised}</td>
                  <td class="badge-${c.status.toLowerCase().replace(" ", "")}">${c.status}</td>
                  <td>${c.assignedTo}</td>
                  <td class="${c.ageingDays > c.slaDays ? "breach" : ""}">${c.ageingDays} day${c.ageingDays > 1 ? "s" : ""}${c.ageingDays > c.slaDays ? " (SLA Breach)" : ""}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="flex h-[40px] shrink-0 items-center gap-4 border-t border-sb-grid-line bg-sb-panel px-3 text-[12px]">
      {/* Refresh */}
      <button
        type="button"
        onClick={onRefresh}
        className="flex items-center text-sb-text hover:text-sb-link"
        title="Refresh data"
      >
        <RefreshCw className="h-4 w-4" />
      </button>

      {/* XLS Export */}
      <button
        type="button"
        onClick={handleExportExcel}
        className="flex flex-col items-center text-sb-ok hover:opacity-80 transition-opacity"
        title="Export filtered complaints to Excel (CSV)"
      >
        <FileSpreadsheet className="h-4 w-4" />
        <span className="text-[7.5px] font-bold leading-none">XLS</span>
      </button>

      {/* PDF Export */}
      <button
        type="button"
        onClick={handleExportPDF}
        className="flex flex-col items-center text-sb-fail hover:opacity-80 transition-opacity"
        title="Export filtered complaints to PDF"
      >
        <FileDown className="h-4 w-4" />
        <span className="text-[7.5px] font-bold leading-none">PDF</span>
      </button>

      {/* Spacer to right pagination controls */}
      <div className="ml-auto flex items-center gap-2">
        {/* Rows per page selector */}
        <div className="flex items-center gap-1">
          <AlignJustify className="h-4 w-4 text-sb-text-dim" />
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="h-[24px] border border-sb-grid-line bg-sb-panel px-1 text-[12px] text-sb-text outline-none"
            title="Rows per page"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Prev Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex h-[24px] w-[24px] items-center justify-center border border-sb-grid-line bg-sb-panel text-sb-text disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sb-workspace"
          title="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {/* Current Page Select */}
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="h-[24px] border border-sb-grid-line bg-sb-panel px-1 text-[12px] text-sb-text outline-none"
          title="Select page"
        >
          {Array.from({ length: totalPages }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        {/* Next Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex h-[24px] w-[24px] items-center justify-center border border-sb-grid-line bg-sb-panel text-sb-text disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sb-workspace"
          title="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* Counter label: exact SmartBus format e.g. "1-25 (36)" */}
        <span className="min-w-[70px] text-right font-medium text-sb-text">
          {startItem}-{endItem} ({totalRecords})
        </span>
      </div>
    </div>
  );
}

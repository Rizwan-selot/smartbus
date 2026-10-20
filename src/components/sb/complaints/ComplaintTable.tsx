import { ArrowUp, ArrowDown, ArrowUpDown, AlertTriangle } from "lucide-react";
import type { Complaint, SortColumn, SortDirection } from "@/types/complaints";
import { ComplaintStatusBadge } from "./ComplaintStatusBadge";

interface Props {
  complaints: Complaint[];
  selectedTicketId: string | null;
  onSelectTicket: (ticketNo: string) => void;
  onOpenDetail: (ticketNo: string) => void;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  isLoading?: boolean;
  onResetFilters?: () => void;
  isFiltered?: boolean;
}

const COLUMNS: { key: SortColumn; label: string; width: string; align: "left" | "center" | "right" }[] = [
  { key: "ticketNo", label: "Ticket No.", width: "110px", align: "left" },
  { key: "parentStudent", label: "Parent / Student", width: "220px", align: "left" },
  { key: "route", label: "Route", width: "210px", align: "left" },
  { key: "category", label: "Category", width: "230px", align: "left" },
  { key: "dateRaised", label: "Date Raised", width: "135px", align: "center" },
  { key: "status", label: "Status", width: "110px", align: "center" },
  { key: "assignedTo", label: "Assigned To", width: "150px", align: "left" },
  { key: "ageingDays", label: "Ageing", width: "115px", align: "center" },
];

export function ComplaintTable({
  complaints,
  selectedTicketId,
  onSelectTicket,
  onOpenDetail,
  sortColumn,
  sortDirection,
  onSort,
  isLoading,
  onResetFilters,
  isFiltered,
}: Props) {
  const thBase =
    "border-r border-b border-sb-grid-line px-2 text-[12px] font-semibold leading-[17px] text-sb-text select-none cursor-pointer hover:bg-[#E2E2E2] transition-colors";
  const tdBase =
    "border-r border-b border-sb-grid-line px-2 text-[12px] leading-[17px] align-middle transition-colors";

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-sb-panel p-8 text-[12px] text-sb-text-dim">
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-sb-link border-t-transparent" />
          <span>Loading complaints data...</span>
        </div>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-sb-panel p-8 text-[12px] text-sb-text-dim">
        {isFiltered ? (
          <div className="text-center">
            <p className="text-[13px] font-medium text-sb-text">No complaints found matching the selected filters.</p>
            <p className="mt-1 text-sb-text-dim">Try adjusting your filters or search terms.</p>
            {onResetFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="mt-3 inline-flex items-center rounded-xs border border-sb-grid-line bg-sb-panel px-3 py-1 text-[11.5px] font-medium text-sb-link hover:bg-sb-workspace shadow-2xs"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-[13px] font-medium text-sb-text">No complaints available.</p>
            <p className="mt-1 text-sb-text-dim">There are currently no registered complaint tickets in the system.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="sb-scroll flex-1 overflow-auto bg-sb-panel">
      <table className="w-full min-w-[1080px] table-fixed border-collapse">
        <colgroup>
          {COLUMNS.map((c) => (
            <col key={c.key} style={{ width: c.width }} />
          ))}
        </colgroup>

        <thead className="sticky top-0 z-10 bg-sb-grid-head shadow-2xs">
          <tr className="h-[34px]">
            {COLUMNS.map((col) => {
              const isSorted = sortColumn === col.key;
              return (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key)}
                  className={`${thBase} ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}`}
                  title={`Sort by ${col.label}`}
                >
                  <div
                    className={`inline-flex items-center gap-1 ${
                      col.align === "center" ? "justify-center" : col.align === "right" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{col.label}</span>
                    {isSorted ? (
                      sortDirection === "asc" ? (
                        <ArrowUp className="h-3.5 w-3.5 text-sb-link" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5 text-sb-link" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => {
            const isSelected = selectedTicketId === c.ticketNo;
            const isSlaBreached = c.ageingDays > c.slaDays;

            return (
              <tr
                key={c.id}
                onClick={() => onSelectTicket(c.ticketNo)}
                onDoubleClick={() => onOpenDetail(c.ticketNo)}
                className={`h-[42px] cursor-pointer ${
                  isSelected ? "bg-sb-row-sel" : "hover:bg-[#F4F6F9] odd:bg-sb-panel even:bg-[#FCFCFD]"
                }`}
              >
                {/* 1. Ticket No. */}
                <td className={`${tdBase} text-left`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetail(c.ticketNo);
                    }}
                    className="font-semibold text-sb-link hover:underline focus:outline-none"
                    title="Click to view complaint details"
                  >
                    {c.ticketNo}
                  </button>
                </td>

                {/* 2. Parent / Student */}
                <td className={`${tdBase} text-left overflow-hidden`}>
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-sb-text truncate">{c.studentName}</span>
                    <span className="text-[11px] text-sb-text-dim truncate">
                      Parent: {c.parentName}
                    </span>
                  </div>
                </td>

                {/* 3. Route */}
                <td className={`${tdBase} text-left truncate`} title={c.route}>
                  <span className="text-sb-text truncate block">{c.route}</span>
                </td>

                {/* 4. Category */}
                <td className={`${tdBase} text-left truncate`} title={c.category}>
                  <span className="text-sb-text truncate block">{c.category}</span>
                </td>

                {/* 5. Date Raised */}
                <td className={`${tdBase} text-center whitespace-nowrap text-sb-text text-[11.5px]`}>
                  {c.dateRaised}
                </td>

                {/* 6. Status */}
                <td className={`${tdBase} text-center`}>
                  <ComplaintStatusBadge status={c.status} />
                </td>

                {/* 7. Assigned To */}
                <td className={`${tdBase} text-left truncate text-sb-text`} title={c.assignedTo}>
                  <span className="truncate block">{c.assignedTo || "--"}</span>
                </td>

                {/* 8. Ageing */}
                <td className={`${tdBase} text-center whitespace-nowrap`}>
                  {isSlaBreached ? (
                    <div className="inline-flex flex-col items-center">
                      <span className="font-bold text-sb-fail flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-sb-fail shrink-0" />
                        {c.ageingDays} {c.ageingDays === 1 ? "day" : "days"}
                      </span>
                      <span className="text-[9.5px] font-semibold text-sb-fail leading-none">
                        (SLA: {c.slaDays}d)
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex flex-col items-center">
                      <span className="text-sb-text">
                        {c.ageingDays} {c.ageingDays === 1 ? "day" : "days"}
                      </span>
                      <span className="text-[9.5px] text-sb-text-dim leading-none">
                        (SLA: {c.slaDays}d)
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

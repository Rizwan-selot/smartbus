import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
import { Star, Search, Filter, Settings, HelpCircle, CalendarClock } from "lucide-react";
import type { ComplaintFilterState, SortColumn, SortDirection } from "@/types/complaints";
import { useComplaints } from "@/components/sb/complaints/complaintsStore";
import { ComplaintFilterToolbar } from "@/components/sb/complaints/ComplaintFilterToolbar";
import { ComplaintTable } from "@/components/sb/complaints/ComplaintTable";
import { ComplaintPagination } from "@/components/sb/complaints/ComplaintPagination";

export const Route = createFileRoute("/complaints/")({
  head: () => ({
    meta: [
      { title: "Complaints Dashboard — SmartBus Manager" },
      { name: "description", content: "SmartBus Complaint Management Dashboard (ETSB-1047)." },
      { property: "og:title", content: "Complaints Dashboard — SmartBus Manager" },
      { property: "og:description", content: "SmartBus Complaint Management Dashboard (ETSB-1047)." },
    ],
  }),
  component: ComplaintsDashboardPage,
});

const INITIAL_FILTERS: ComplaintFilterState = {
  category: "",
  status: "",
  dateRange: "",
  route: "",
  assignedTo: "",
  search: "",
};

function ComplaintsDashboardPage() {
  const navigate = useNavigate();
  const allComplaints = useComplaints();

  // State
  const [filters, setFilters] = useState<ComplaintFilterState>(INITIAL_FILTERS);
  const [sortColumn, setSortColumn] = useState<SortColumn>("dateRaised");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter complaints with AND logic
  const filteredComplaints = useMemo(() => {
    return allComplaints.filter((c) => {
      // 1. Category filter
      if (filters.category && c.category !== filters.category) {
        return false;
      }

      // 2. Status filter
      if (filters.status && c.status !== filters.status) {
        return false;
      }

      // 3. Route filter
      if (filters.route && c.route !== filters.route) {
        return false;
      }

      // 4. Assigned Agent filter
      if (filters.assignedTo && c.assignedTo !== filters.assignedTo) {
        return false;
      }

      // 5. Date Range filter (using ageing/days relative logic)
      if (filters.dateRange) {
        if (filters.dateRange === "today" && c.ageingDays > 1) {
          return false;
        }
        if (filters.dateRange === "last3days" && c.ageingDays > 3) {
          return false;
        }
        if (filters.dateRange === "last7days" && c.ageingDays > 7) {
          return false;
        }
        if (filters.dateRange === "last30days" && c.ageingDays > 30) {
          return false;
        }
      }

      // 6. Search filter: search by ticket number, student name, or parent name
      if (filters.search.trim()) {
        const query = filters.search.trim().toLowerCase();
        const matchesTicket = c.ticketNo.toLowerCase().includes(query);
        const matchesStudent = c.studentName.toLowerCase().includes(query);
        const matchesParent = c.parentName.toLowerCase().includes(query);
        if (!matchesTicket && !matchesStudent && !matchesParent) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  // Sort complaints
  const sortedComplaints = useMemo(() => {
    const list = [...filteredComplaints];
    list.sort((a, b) => {
      let valA: string | number = "";
      let valB: string | number = "";

      switch (sortColumn) {
        case "ticketNo":
          valA = a.ticketNo;
          valB = b.ticketNo;
          break;
        case "parentStudent":
          valA = a.studentName.toLowerCase();
          valB = b.studentName.toLowerCase();
          break;
        case "route":
          valA = a.route.toLowerCase();
          valB = b.route.toLowerCase();
          break;
        case "category":
          valA = a.category.toLowerCase();
          valB = b.category.toLowerCase();
          break;
        case "dateRaised":
          valA = a.dateRaised;
          valB = b.dateRaised;
          break;
        case "status":
          valA = a.status.toLowerCase();
          valB = b.status.toLowerCase();
          break;
        case "assignedTo":
          valA = (a.assignedTo || "").toLowerCase();
          valB = (b.assignedTo || "").toLowerCase();
          break;
        case "ageingDays":
          valA = a.ageingDays;
          valB = b.ageingDays;
          break;
        default:
          return 0;
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredComplaints, sortColumn, sortDirection]);

  // Pagination slice
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedComplaints.slice(start, start + pageSize);
  }, [sortedComplaints, currentPage, pageSize]);

  // Reset page when filters change
  const handleFilterChange = useCallback((updater: (prev: ComplaintFilterState) => ComplaintFilterState) => {
    setFilters(updater);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, []);

  const handleSort = useCallback(
    (col: SortColumn) => {
      if (sortColumn === col) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortColumn(col);
        setSortDirection("asc");
      }
    },
    [sortColumn]
  );

  const handleOpenDetail = useCallback(
    (ticketNo: string) => {
      navigate({
        to: "/complaints/$ticketId",
        params: { ticketId: ticketNo },
      });
    },
    [navigate]
  );

  const isFiltered =
    Boolean(filters.category) ||
    Boolean(filters.status) ||
    Boolean(filters.dateRange) ||
    Boolean(filters.route) ||
    Boolean(filters.assignedTo) ||
    Boolean(filters.search.trim());

  return (
    <div className="flex h-full w-full flex-col p-[10px] pb-[8px]">
      {/* 1. Header (Exact SmartBus ReportHeader pattern) */}
      <div className="flex h-[40px] shrink-0 items-center bg-sb-header px-2 text-sb-header-fg">
        <Star className="mr-3 h-4 w-4" />
        <h1 className="text-[16px] font-normal">Complaints Dashboard</h1>
        <div className="ml-auto flex gap-3 text-sb-header-fg/80">
          <Search className="h-4 w-4 cursor-pointer hover:text-white" />
          <Star className="h-4 w-4 cursor-pointer hover:text-white" />
          <Filter className="h-4 w-4 cursor-pointer hover:text-white" />
          <CalendarClock className="h-4 w-4 cursor-pointer hover:text-white" />
          <Settings className="h-4 w-4 cursor-pointer hover:text-white" />
          <HelpCircle className="h-4 w-4 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* 2. Compact Filter Toolbar */}
      <ComplaintFilterToolbar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
        onRefresh={handleRefresh}
        totalFiltered={filteredComplaints.length}
        totalAll={allComplaints.length}
      />

      {/* 3. Complaint Data Table */}
      <ComplaintTable
        complaints={paginatedComplaints}
        selectedTicketId={selectedTicketId}
        onSelectTicket={setSelectedTicketId}
        onOpenDetail={handleOpenDetail}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        isLoading={isLoading}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* 4. Pagination & Export */}
      <ComplaintPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={filteredComplaints.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        onRefresh={handleRefresh}
        dataToExport={sortedComplaints}
      />
    </div>
  );
}

import { Search, RefreshCw, X, Filter } from "lucide-react";
import type { ComplaintFilterState } from "@/types/complaints";
import { ALL_CATEGORIES, ALL_STATUSES, ALL_ROUTES, ALL_AGENTS } from "./mockData";

interface Props {
  filters: ComplaintFilterState;
  onChange: (updater: (prev: ComplaintFilterState) => ComplaintFilterState) => void;
  onReset: () => void;
  onRefresh: () => void;
  totalFiltered: number;
  totalAll: number;
}

export function ComplaintFilterToolbar({
  filters,
  onChange,
  onReset,
  onRefresh,
  totalFiltered,
  totalAll,
}: Props) {
  const isFiltered =
    Boolean(filters.category) ||
    Boolean(filters.status) ||
    Boolean(filters.dateRange) ||
    Boolean(filters.route) ||
    Boolean(filters.assignedTo) ||
    Boolean(filters.search.trim());

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-sb-grid-line bg-sb-workspace/60 px-3 py-2 text-[12px]">
      {/* Search Input */}
      <div className="flex h-[28px] min-w-[240px] flex-1 items-center border border-sb-grid-line bg-sb-panel px-2 shadow-xs">
        <Search className="mr-1.5 h-3.5 w-3.5 text-sb-text-dim shrink-0" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange((prev) => ({ ...prev, search: e.target.value }))}
          placeholder="Search ticket, student or parent"
          className="w-full bg-transparent text-[12px] text-sb-text outline-none placeholder:text-sb-text-dim"
        />
        {filters.search && (
          <button
            type="button"
            onClick={() => onChange((prev) => ({ ...prev, search: "" }))}
            className="text-sb-text-dim hover:text-sb-text"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="flex items-center">
        <select
          value={filters.category}
          onChange={(e) => onChange((prev) => ({ ...prev, category: e.target.value }))}
          className="h-[28px] max-w-[210px] border border-sb-grid-line bg-sb-panel px-2 text-[12px] text-sb-text shadow-xs outline-none"
          title="Filter by Category"
        >
          <option value="">All Categories</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Status Dropdown */}
      <div className="flex items-center">
        <select
          value={filters.status}
          onChange={(e) => onChange((prev) => ({ ...prev, status: e.target.value }))}
          className="h-[28px] border border-sb-grid-line bg-sb-panel px-2 text-[12px] text-sb-text shadow-xs outline-none"
          title="Filter by Status"
        >
          <option value="">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Dropdown */}
      <div className="flex items-center">
        <select
          value={filters.dateRange}
          onChange={(e) => onChange((prev) => ({ ...prev, dateRange: e.target.value }))}
          className="h-[28px] border border-sb-grid-line bg-sb-panel px-2 text-[12px] text-sb-text shadow-xs outline-none"
          title="Filter by Date Range"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="last3days">Last 3 Days</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>
      </div>

      {/* Route / Branch Dropdown */}
      <div className="flex items-center">
        <select
          value={filters.route}
          onChange={(e) => onChange((prev) => ({ ...prev, route: e.target.value }))}
          className="h-[28px] max-w-[200px] border border-sb-grid-line bg-sb-panel px-2 text-[12px] text-sb-text shadow-xs outline-none"
          title="Filter by Route / Branch"
        >
          <option value="">All Routes / Branches</option>
          {ALL_ROUTES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Assigned Agent Dropdown */}
      <div className="flex items-center">
        <select
          value={filters.assignedTo}
          onChange={(e) => onChange((prev) => ({ ...prev, assignedTo: e.target.value }))}
          className="h-[28px] border border-sb-grid-line bg-sb-panel px-2 text-[12px] text-sb-text shadow-xs outline-none"
          title="Filter by Assigned Agent"
        >
          <option value="">All Assigned Agents</option>
          {ALL_AGENTS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Actions: Refresh & Clear */}
      <div className="flex items-center gap-1.5 ml-auto">
        <button
          type="button"
          onClick={onRefresh}
          className="flex h-[28px] w-[28px] items-center justify-center border border-sb-grid-line bg-sb-panel text-sb-text hover:bg-sb-workspace transition-colors"
          title="Refresh complaints list"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="flex h-[28px] items-center gap-1 border border-sb-grid-line bg-sb-panel px-2.5 text-[11.5px] text-sb-fail hover:bg-sb-workspace transition-colors"
            title="Reset all active filters"
          >
            <Filter className="h-3 w-3" />
            <span>Clear Filters</span>
          </button>
        )}

        <div className="ml-1 text-[11px] text-sb-text-dim whitespace-nowrap">
          {isFiltered ? (
            <span>
              Showing <strong className="text-sb-text">{totalFiltered}</strong> of {totalAll}
            </span>
          ) : (
            <span>Total: <strong className="text-sb-text">{totalAll}</strong></span>
          )}
        </div>
      </div>
    </div>
  );
}

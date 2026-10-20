import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Search, RefreshCw, Filter, ArrowDownUp, Route, Bus, User, Users, LayoutGrid, UserRound, Video, Star, Map as MapIcon, Spline, TrafficCone, Share2, Plus, Minus, ChevronsRight, Tag } from "lucide-react";

export type Counter = { label: string; value: number; tone: "ok" | "done" | "warn" | "fail" | "total" | "inactive" };
const toneCls: Record<Counter["tone"], string> = {
  ok: "bg-sb-ok-bg text-sb-ok",
  done: "bg-sb-done-bg text-sb-done",
  warn: "bg-sb-warn-bg text-sb-warn",
  fail: "bg-sb-fail-bg text-sb-fail",
  total: "bg-sb-total-bg text-sb-text",
  inactive: "bg-sb-inactive-bg text-sb-inactive",
};

export function ModuleTabBar({ active }: { active: "Trips" | "Video" }) {
  const icons = [Bus, User, Users, LayoutGrid, UserRound];
  return (
    <div className="flex h-[34px] items-end bg-sb-header px-1 text-sb-header-fg">
      {active === "Trips" ? (
        <div className="mb-[-1px] flex h-[28px] items-center gap-1 rounded-t-sm bg-sb-panel px-2 text-[12px] text-sb-text"><Route className="h-3.5 w-3.5" />Trips</div>
      ) : (
        <Link to="/" className="flex h-[28px] w-[26px] items-center justify-center"><Route className="h-3.5 w-3.5" /></Link>
      )}
      {icons.map((I, i) => (
        <div key={i} className="flex h-[28px] w-[26px] items-center justify-center"><I className="h-3.5 w-3.5" /></div>
      ))}
      {active === "Video" ? (
        <div className="mb-[-1px] flex h-[28px] items-center gap-1 rounded-t-sm bg-sb-panel px-2 text-[12px] text-sb-text"><Video className="h-3.5 w-3.5 fill-current" />Video</div>
      ) : (
        <Link to="/video" className="flex h-[28px] w-[26px] items-center justify-center"><Video className="h-3.5 w-3.5 fill-current" /></Link>
      )}
    </div>
  );
}

export function SummaryStatusCounter({ items }: { items: Counter[] }) {
  return (
    <div className="flex px-[5px] pt-[5px]">
      {items.map((c) => (
        <div key={c.label} className={`flex h-[32px] flex-1 flex-col items-center justify-center leading-[13px] ${toneCls[c.tone]} ${c.label === "Running" ? "border-b-2 border-sb-ok" : ""}`}>
          <span className="text-[11px]">{c.value}</span>
          <span className="text-[9.5px]">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

export function SearchBar({ withCheckbox, extra }: { withCheckbox?: boolean; extra?: ReactNode }) {
  return (
    <div className="flex items-center gap-1 px-[5px] py-[5px]">
      {withCheckbox && <input type="checkbox" className="mx-1 h-3.5 w-3.5" />}
      <div className="flex h-[28px] flex-1 items-center border border-sb-grid-line bg-sb-panel px-2">
        <input placeholder="Search" className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-sb-text-dim" />
        <Search className="h-4 w-4" />
      </div>
      <FilterToolbar extra={extra} />
    </div>
  );
}

export function FilterToolbar({ extra }: { extra?: ReactNode }) {
  const btn = "flex h-[28px] w-[28px] items-center justify-center border border-sb-grid-line bg-sb-panel";
  return (
    <>
      <button className={btn}><RefreshCw className="h-4 w-4" /></button>
      <button className={btn}><Filter className="h-4 w-4" /></button>
      {extra}
    </>
  );
}
export const SortButton = () => (
  <button className="flex h-[28px] w-[28px] items-center justify-center border border-sb-grid-line bg-sb-panel"><ArrowDownUp className="h-4 w-4" /></button>
);

export function StatusBadge({ tone, children }: { tone: "ok" | "fail" | "stopped"; children: ReactNode }) {
  const cls = tone === "ok" ? "bg-sb-badge-ok" : "bg-sb-badge-fail";
  return <span className={`inline-block whitespace-nowrap rounded-[2px] px-1 text-[10.5px] leading-[15px] text-sb-header-fg ${cls}`}>{children}</span>;
}

export function MapToolbar({ top = 58, right = 168 }: { top?: number; right?: number }) {
  const btn = "flex h-[30px] w-[30px] items-center justify-center bg-sb-panel border-b border-sb-grid-line";
  return (
    <div className="absolute z-10 flex flex-col items-center gap-2" style={{ top, right }}>
      <button className={`${btn} shadow`}><Search className="h-4 w-4" /></button>
      <div className="flex flex-col shadow">
        {[Star, Spline, MapIcon, TrafficCone, Share2, Tag].map((I, i) => (
          <button key={i} className={btn}><I className="h-3.5 w-3.5" /></button>
        ))}
      </div>
      <div className="flex flex-col shadow">
        <button className={btn}><Plus className="h-4 w-4" /></button>
        <button className={btn}><Minus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

export const CollapseToggle = () => (
  <button className="flex h-[28px] w-[28px] items-center justify-center bg-sb-header text-sb-header-fg"><ChevronsRight className="h-4 w-4" /></button>
);

export function GroupRow({ name, count, sub }: { name: string; count?: number; sub?: boolean }) {
  return (
    <div className={`flex h-[25px] items-center gap-1.5 border-b border-sb-panel px-[6px] text-[11.5px] ${sub ? "bg-sb-subgroup" : "bg-sb-group font-medium"}`}>
      <input type="checkbox" className="h-3 w-3" />
      <span className="flex-1">{name}</span>
      {count !== undefined && <span className="tracking-[2px]">[{count}]</span>}
    </div>
  );
}

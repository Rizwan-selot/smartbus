import { Fragment } from "react";
import { PersonStanding, CheckSquare, SquareArrowRight, FolderOpen, XSquare, Clock, UserRound, MoreHorizontal, CircleDot } from "lucide-react";
import { ModuleTabBar, SummaryStatusCounter, SearchBar, SortButton, StatusBadge, GroupRow } from "./common";

type Trip = { route: string; status: "Start On Time" | "Start Delayed"; ago: string; vehicle: string; time: string; kind: "D" | "P"; c: number[]; sel?: boolean };
type School = { school: string; branch: string; trips: Trip[] };

const t = (route: string, vehicle: string, ago: string, time: string, kind: "D" | "P", c: number[], status: Trip["status"] = "Start On Time", sel = false): Trip => ({ route, vehicle, ago, time, kind, c, status, sel });

export const SCHOOLS: School[] = [
  { school: "Centre Point School Nagpur", branch: "Mothers Pet Kindergarten Chaoni", trips: [t("Route K3 D...", "MH49J1101", "0h 0m ago - 12:00 PM", "20-10-2026 12:00:28 PM", "D", [0, 0, 9, 0, 0, 14])] },
  { school: "Centre Point School Wardhaman Nagar", branch: "", trips: [] },
  { school: "Podar Prep School Varthur", branch: "Podar Prep School Varthur", trips: [t("Route 1 De...", "KA01AT6502 School Van", "0h 0m ago - 12:00 PM", "20-10-2026 12:00:13 PM", "D", [1, 0, 6, 0, 0, 13])] },
  { school: "Pawar Public School", branch: "Pawar Public School", trips: [
    t("Route 1 Dr...", "MH12YB7926 RFID", "0h 30m ago - 11:30 AM", "20-10-2026 12:00:29 PM", "D", [0, 0, 15, 0, 0, 14], "Start On Time", true),
    t("Route 9 Dr...", "MH12QW4814 RFID", "0h 30m ago - 11:30 AM", "20-10-2026 12:00:25 PM", "D", [0, 0, 8, 0, 0, 6]),
    t("Route 10 D...", "MH12VF8144 RFID", "0h 30m ago - 11:30 AM", "20-10-2026 12:00:30 PM", "D", [0, 0, 7, 0, 0, 7]),
    t("Route 7 Dr...", "MH12QG5106 RFID", "0h 30m ago - 11:30 AM", "20-10-2026 12:00:29 PM", "D", [0, 0, 4, 0, 0, 2]),
  ] },
  { school: "Yadnya Enterprises", branch: "Yadnya Enterprises", trips: [
    t("Route 18 Pi...", "MH14MH8602 School Bus-...", "0h 43m ago - 11:17 AM", "20-10-2026 11:32:39 AM", "P", [1, 0, 9, 0, 0, 46]),
    t("Route 2 Pic...", "MH14HG8602 School Bus-2", "0h 36m ago - 11:24 AM", "20-10-2026 11:40:07 AM", "P", [0, 0, 6, 0, 0, 63]),
    t("Route 7 Pic...", "MH14HG7029 School Bus-7", "0h 45m ago - 11:15 AM", "20-10-2026 11:41:41 AM", "P", [0, 0, 14, 0, 0, 26]),
    t("Route 13 Pi...", "MH14CW2737 School Bus-...", "0h 21m ago - 11:38 AM", "20-10-2026 11:40:58 AM", "P", [0, 0, 13, 0, 0, 33], "Start Delayed"),
    t("Route 24 Pi...", "MH14LX6382 School Bus-24", "0h 42m ago - 11:17 AM", "20-10-2026 11:18:59 AM", "P", [0, 0, 19, 0, 0, 50]),
    t("Route 12 Pi...", "MH14GU2440 School Bus-12", "0h 22m ago - 11:37 AM", "20-10-2026 11:40:51 AM", "P", [0, 0, 8, 0, 0, 18], "Start Delayed"),
    t("Route 8 Pic...", "MH14CW0731 School Bus-8", "0h 42m ago - 11:17 AM", "20-10-2026 11:36:35 AM", "P", [0, 0, 20, 0, 0, 40]),
    t("Route Van ...", "MH14CW3628 School Van", "0h 40m ago - 11:20 AM", "20-10-2026 11:30:12 AM", "P", [0, 0, 5, 0, 0, 12], "Start Delayed"),
  ] },
];

const colTone = ["text-sb-ok", "text-sb-warn", "text-sb-warn", "text-sb-fail", "text-sb-done", "text-sb-done"];

function TripRow({ trip }: { trip: Trip }) {
  return (
    <div className={`flex h-[42px] items-center border-b border-sb-grid-line px-[6px] ${trip.sel ? "bg-sb-row-sel" : "bg-sb-panel"}`}>
      <input type="checkbox" className="mr-2 h-3 w-3" />
      <CircleDot className="mr-2 h-4 w-4 fill-sb-ok text-sb-ok" />
      <div className="w-[170px] leading-[16px]">
        <div className="flex items-center gap-1.5"><span className="text-sb-link">{trip.route}</span><StatusBadge tone={trip.status === "Start On Time" ? "ok" : "fail"}>{trip.status}</StatusBadge></div>
        <div className="text-[11px] text-sb-text-dim">{trip.ago}</div>
      </div>
      <span className="mr-1.5 h-2 w-2 rounded-full bg-sb-fail" />
      <div className="w-[160px] truncate leading-[16px]"><div className="truncate">{trip.vehicle}</div><div className="text-[11px] text-sb-text-dim">{trip.time}</div></div>
      <span className={`mx-1 flex h-[14px] w-[14px] items-center justify-center rounded-full text-[8px] font-bold text-sb-header-fg ${trip.kind === "D" ? "bg-sb-fail/70" : "bg-sb-checkpoint"}`}>{trip.kind}</span>
      {trip.c.map((v, i) => <span key={i} className={`w-[24px] text-center text-[11px] ${colTone[i]}`}>{v}</span>)}
      <MoreHorizontal className="ml-1 h-4 w-4 rounded-full border border-sb-text-dim" />
    </div>
  );
}

export function TrackingListPanel() {
  return (
    <div className="absolute left-[10px] top-[16px] bottom-0 z-10 flex w-[590px] flex-col rounded-t-sm bg-sb-panel shadow-lg">
      <ModuleTabBar active="Trips" />
      <SummaryStatusCounter items={[
        { label: "Running", value: 41, tone: "ok" }, { label: "Completed", value: 5, tone: "done" },
        { label: "Upcoming", value: 574, tone: "warn" }, { label: "Fail", value: 483, tone: "fail" }, { label: "Total", value: 1103, tone: "total" },
      ]} />
      <div className="mx-[5px] mt-[5px] bg-sb-subgroup"><SearchBar extra={<SortButton />} /></div>
      <div className="mx-[5px] flex h-[34px] items-center border-b border-sb-grid-line text-[12px]">
        <span className="w-[230px] text-center">Trip</span><span className="w-[130px] text-center">Vehicle</span>
        <div className="ml-auto mr-8 flex gap-3">
          <PersonStanding className="h-3.5 w-3.5" /><CheckSquare className="h-3.5 w-3.5 text-sb-ok" /><SquareArrowRight className="h-3.5 w-3.5 text-sb-warn" />
          <FolderOpen className="h-3.5 w-3.5 text-sb-warn" /><XSquare className="h-3.5 w-3.5 text-sb-fail" /><Clock className="h-3.5 w-3.5 text-sb-done" /><UserRound className="h-3.5 w-3.5 text-sb-done" />
        </div>
      </div>
      <div className="sb-scroll mx-[5px] flex-1 overflow-y-auto">
        {SCHOOLS.map((s) => (
          <Fragment key={s.school}>
            <GroupRow name={s.school} />
            {s.branch && <GroupRow name={s.branch} sub />}
            {s.trips.map((tr) => <TripRow key={tr.route + tr.vehicle} trip={tr} />)}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

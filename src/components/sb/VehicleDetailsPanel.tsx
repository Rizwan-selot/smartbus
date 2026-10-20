import { Settings, Eye, Share2, Navigation, ZoomIn, ChevronUp, ChevronRight, Play, MapPin } from "lucide-react";
import bus from "@/assets/bus.png";
import { StatusBadge, CollapseToggle } from "./common";

const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex min-h-[20px] items-start justify-between gap-1 py-[1px] text-[10.5px] leading-[14px]"><span className="w-[58px] shrink-0 text-sb-text-dim">{k}</span><span className="min-w-0 flex-1 truncate text-right">{v}</span></div>
);

export function VehicleDetailsPanel() {
  return (
    <div className="absolute right-[10px] top-[16px] bottom-0 z-10 flex gap-2">
      <div className="pt-1"><CollapseToggle /></div>
      <div className="sb-scroll flex w-[172px] flex-col gap-2 overflow-y-auto">
        <div className="bg-sb-panel shadow">
          <div className="flex h-[26px] items-center justify-between bg-sb-header px-2 text-sb-header-fg"><MapPin className="h-3.5 w-3.5" /><Settings className="h-3.5 w-3.5" /></div>
          <div className="px-2 pt-2 text-[12px]">MH12YB7926</div>
          <img src={bus} alt="School bus" width={992} height={672} className="mx-auto my-1 h-[80px] w-auto" />
          <div className="flex items-center justify-between bg-sb-fail-bg px-2 py-0.5"><StatusBadge tone="stopped">Stopped</StatusBadge><span className="text-[11px]">20:06</span></div>
          <div className="flex justify-center gap-[2px] py-2">{"0009974".split("").map((d, i) => <span key={i} className="w-[14px] border border-sb-grid-line text-center text-[11px]">{d}</span>)}</div>
          <div className="px-2 pb-1"><Row k="Driver" v="Narshing Kangule -" /><Row k="Mobile" v="8149198809" /><Row k="Seat Capacity" v="--" /></div>
          <div className="flex justify-around border-t border-sb-grid-line py-1.5 text-sb-done"><Eye className="h-3.5 w-3.5" /><Share2 className="h-3.5 w-3.5" /><Navigation className="h-3.5 w-3.5" /><ZoomIn className="h-3.5 w-3.5" /></div>
        </div>
        <div className="bg-sb-panel px-2 py-2 shadow">
          <div className="mb-1 flex items-center justify-between text-[12px]">Trip Info<StatusBadge tone="ok">Running</StatusBadge></div>
          <Row k="Trip Information" v="Route 1 Drop 1" />
          <Row k="Trip Start Status" v={<StatusBadge tone="ok">Start On Time</StatusBadge>} />
          <Row k="Trip Type" v="DROP" />
          <Row k="Driver" v={<span className="inline-flex items-center">Narshing K...<ChevronRight className="h-3 w-3" /></span>} />
          <Row k="Attendant" v={<span className="inline-flex items-center">Sunita Bho...<ChevronRight className="h-3 w-3" /></span>} />
          <Row k="Est Start" v="20-10-2026 11:30 AM" />
          <Row k="Est End" v="20-10-2026 01:00 PM" />
          <Row k="Actual Start" v="20-10-2026 11:30 AM" />
          <Row k="Actual End" v="--" /><Row k="Trip Duration" v="00:00" /><Row k="Total Distance" v="0.0 km" /><Row k="Validity" v="--" /><Row k="Seat Utilisation" v="--" />
          <button className="mt-2 flex w-full items-center justify-center gap-1 text-[11px] text-sb-done"><Play className="h-3 w-3 fill-current" />Show Checkpoint List</button>
        </div>
        <div className="bg-sb-panel shadow">
          <div className="flex h-[34px] items-center justify-between px-2 text-[12px]">Number Of Trips 4<ChevronUp className="h-4 w-4" /></div>
          {[{ n: "Route 1 Drop 1", s: "Running", tone: "ok" as const, ty: "DROP", e: "11:30 AM", a: "11:30 AM", r: "01:00 PM", r2: "12:00 PM" },
            { n: "Route 1 Pickup", s: "Fail", tone: "fail" as const, ty: "PICKUP", e: "08:05 AM", a: "--", r: "11:00 AM", r2: "--" }].map((x) => (
            <div key={x.n} className="border-t border-sb-grid-line px-1.5 py-1 text-[10px]">
              <div className="flex items-center justify-between"><span>{x.n}</span><StatusBadge tone={x.tone}>{x.s}</StatusBadge></div>
              <div className="font-semibold text-sb-fail">{x.ty}</div>
              <div className="mt-1 flex items-center justify-between"><div className="text-sb-done">EST {x.e}<br />ACT {x.a}</div><img src={bus} alt="" className="h-4 w-auto" /><div className="text-right">{x.r}<br />{x.r2}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Fragment } from "react";
import { Video, PlayCircle, History, Camera, MapPin, LayoutGrid, X, PlugZap } from "lucide-react";
import ch1 from "@/assets/cam-ch1.jpg";
import ch2 from "@/assets/cam-ch2.jpg";
import { ModuleTabBar, SummaryStatusCounter, SearchBar, GroupRow } from "./common";

type V = { name: string; time: string; online?: boolean | undefined };
const GROUPS: { g: string; b: string; n: number; v: V[] }[] = [
  { g: "", b: "", n: 0, v: [{ name: "MH12NX4145 - Dashcam", time: "19-10-2026 06:20:55 PM" }] },
  { g: "Canary The School", b: "Canary The School", n: 1, v: [{ name: "TS07UM0233 - dashcam", time: "20-10-2026 12:00:41 PM", online: true }] },
  { g: "Cognibot-The School", b: "Dashcam", n: 4, v: [
    { name: "TG15U5248 - Dashcam", time: "17-10-2026 12:44:09 PM" }, { name: "TG15U5249 - Dashcam", time: "17-10-2026 12:44:46 PM" },
    { name: "TG15U5250 - Dashcam", time: "17-10-2026 12:42:53 PM" }, { name: "TG15U5251 - Dashcam", time: "17-10-2026 12:43:23 PM" }] },
  { g: "Delhi Public School HYD", b: "Santosh Nagar", n: 1, v: [] },
];

function VideoChannelRow({ ch, online }: { ch: string; online?: boolean | undefined }) {
  const c = online ? "text-sb-ok" : "text-sb-fail";
  return (
    <div className="flex h-[35px] items-center pl-[28px] pr-[40px] text-[12px]">
      <span className="mr-2 h-[1px] w-[8px] bg-sb-text-dim" />{ch}
      <div className="ml-auto flex gap-4">
        <Video className={`h-4 w-4 fill-current ${c}`} /><PlayCircle className={`h-4 w-4 ${c}`} /><History className={`h-4 w-4 ${c}`} /><Camera className="h-4 w-4 text-sb-text-dim" />
      </div>
    </div>
  );
}

function VehicleRow({ v }: { v: V }) {
  return (
    <div className="border-b border-sb-grid-line bg-sb-panel">
      <div className="flex items-start px-[10px] pt-[6px]">
        <input type="checkbox" className="mr-4 mt-0.5 h-3 w-3" />
        <span className={`mr-3 mt-1 h-2.5 w-2.5 rounded-full ${v.online ? "bg-sb-fail" : "bg-sb-done"}`} />
        <div className="flex-1 leading-[18px]"><div className="text-sb-done">{v.name}</div><div className="text-[11px] text-sb-text-dim">{v.time}</div></div>
        <PlugZap className={`h-4 w-4 ${v.online ? "text-sb-ok" : "text-sb-fail"}`} />
      </div>
      <VideoChannelRow ch="CH1" online={v.online} /><VideoChannelRow ch="CH2" online={v.online} />
    </div>
  );
}

export function VideoListPanel() {
  return (
    <div className="absolute left-[10px] top-[14px] bottom-[14px] z-10 flex w-[410px] flex-col rounded-t-sm bg-sb-panel shadow-lg">
      <ModuleTabBar active="Video" />
      <SummaryStatusCounter items={[
        { label: "Running", value: 0, tone: "ok" }, { label: "Idle", value: 17, tone: "warn" }, { label: "Stopped", value: 34, tone: "fail" },
        { label: "Inactive", value: 173, tone: "inactive" }, { label: "Total", value: 224, tone: "total" },
      ]} />
      <SearchBar withCheckbox />
      <div className="sb-scroll mx-[5px] flex-1 overflow-y-auto">
        {GROUPS.map((g, i) => (
          <Fragment key={i}>
            {g.g && <GroupRow name={g.g} count={g.n} />}
            {g.b && <GroupRow name={g.b} count={g.n} sub />}
            {g.v.map((v) => <VehicleRow key={v.name} v={v} />)}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function Feed({ ch, img, stat, status }: { ch: string; img: string; stat: string; status: "Active" | "Idle" }) {
  return (
    <div className="relative h-[256px] overflow-hidden bg-sb-video-bg font-semibold text-sb-header-fg [text-shadow:0_1px_2px_#000]">
      <img src={img} alt={`${ch} camera`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="relative flex justify-between px-2 pt-2 text-[12px]"><span>TS07UM0233 | {ch}</span><span>{stat}</span></div>
      <div className="relative truncate px-2 text-[12px]">Canary The School International School &amp; CBSE School Madinaguda, I</div>
      <div className="relative flex justify-between px-2 text-[12px]"><span className="flex items-center gap-1"><span className={`h-1.5 w-1.5 rounded-full ${status === "Active" ? "bg-sb-ok" : "bg-sb-logo"}`} />{status}</span><span>960x544 px</span></div>
      <div className="absolute bottom-1 left-2 right-2 flex justify-between font-mono text-[10px] font-normal"><span>{ch} 20-10-2026 12:02:19</span><span>E78.347029,N17.498734</span></div>
    </div>
  );
}

export function VideoPlayerPanel() {
  return (
    <div className="absolute right-[10px] top-[24px] z-10 w-[440px] bg-sb-panel p-[10px] pt-0 shadow-lg">
      <div className="-mx-[10px] mb-2 flex h-[32px] items-end bg-sb-header pl-2 pr-3 text-sb-header-fg">
        <div className="flex h-[28px] items-center gap-1 rounded-t-sm bg-sb-panel px-2 text-[12px] text-sb-text"><MapPin className="h-3.5 w-3.5" />Map + Video</div>
        <LayoutGrid className="mb-1.5 ml-4 h-4 w-4" />
        <X className="mb-1.5 ml-auto h-4 w-4" />
      </div>
      <div className="flex flex-col gap-3">
        <Feed ch="CH1" img={ch1} stat="25 fps | 0.25 MB | 527.52 kbps" status="Active" />
        <Feed ch="CH2" img={ch2} stat="25 fps | 0 Bytes | 0 mb/s" status="Idle" />
      </div>
    </div>
  );
}

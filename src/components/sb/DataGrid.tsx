import { Star, Search, Filter, Settings, HelpCircle, CalendarClock, RefreshCw, FileSpreadsheet, FileDown, Plus, ChevronLeft, ChevronRight, AlignJustify } from "lucide-react";

type Row = { cls: string; gr: string; name: string; type: "Drop" | "Pickup"; addr: string; point: string; coord: string; from: string; to: string };
const R: Row[] = [
  { cls: "VI", gr: "AHS0017", name: "K. VERNIKA -", type: "Drop", addr: "Srinivasa Heights", point: "Srinivasa Heights -Chilkanagar Road Indo Golden Avenue", coord: "17.41180169928840", from: "15:45:00", to: "16:30:00" },
  { cls: "VI", gr: "AHS0017", name: "K. VERNIKA -", type: "Pickup", addr: "Indo Golden Avenue", point: "Indo Golden Avenue", coord: "17.41105847503580", from: "07:00:00", to: "08:15:00" },
  { cls: "IX", gr: "AHS0016", name: "P. NAGA SAI LAKSHMI PRASANNA -", type: "Drop", addr: "Swaroop Nagar", point: "Swaroop Nagar", coord: "17.41400678460870", from: "15:45:00", to: "16:30:00" },
  { cls: "IX", gr: "AHS0016", name: "P. NAGA SAI LAKSHMI PRASANNA -", type: "Pickup", addr: "Swaroop Nagar", point: "Swaroop Nagar", coord: "17.41514309955300", from: "07:00:00", to: "08:15:00" },
  { cls: "III", gr: "AHS0019", name: "V HARSHIK REDDY -", type: "Drop", addr: "Ganesh Nagar", point: "Ganesh Nagar", coord: "17.40871412548220", from: "15:45:00", to: "16:30:00" },
  { cls: "III", gr: "AHS0019", name: "V HARSHIK REDDY -", type: "Pickup", addr: "Chilkanagar Main", point: "Ganesh Nagar", coord: "17.40823637931750", from: "07:00:00", to: "08:15:00" },
  { cls: "V", gr: "AHS0018", name: "V. LIKITH REDDY -", type: "Drop", addr: "Ganesh Nagar", point: "Ganesh Nagar", coord: "17.40871412548220", from: "15:45:00", to: "16:30:00" },
  { cls: "V", gr: "AHS0018", name: "V. LIKITH REDDY -", type: "Pickup", addr: "Chilkanagar Main", point: "Ganesh Nagar", coord: "17.40823637931750", from: "07:00:00", to: "08:15:00" },
  { cls: "VI", gr: "AHS0021", name: "K. HIMA SRI -", type: "Drop", addr: "Srinivasa Heights", point: "Srinivasa Heights -Chilkanagar Road Indo Golden Avenue", coord: "17.41180169928840", from: "15:45:00", to: "16:30:00" },
  { cls: "VI", gr: "AHS0021", name: "K. HIMA SRI -", type: "Pickup", addr: "Indo Golden Avenue", point: "Indo Golden Avenue", coord: "17.41105847503580", from: "07:00:00", to: "08:15:00" },
];

const COLS: [string, number][] = [["", 28], ["School", 55], ["Branch", 55], ["Class", 55], ["Div", 55], ["GR Number", 55], ["Student Name", 55], ["Gender", 70], ["RFID Tag", 55], ["Trip Type", 65], ["Trip Name", 70], ["Point Address", 100], ["Point Name", 105], ["Point Coordination", 105], ["Validity", 80], ["Schedule Type", 105], ["From", 68], ["To", 68], ["Valid From", 96], ["Valid To", 90], ["Vehicle Name", 96], ["Plate Number", 96], ["Schedule Days", 132]];

export function ReportHeader({ title }: { title: string }) {
  return (
    <div className="flex h-[40px] items-center bg-sb-header px-2 text-sb-header-fg">
      <Star className="mr-3 h-4 w-4" /><h1 className="text-[16px] font-normal">{title}</h1>
      <div className="ml-auto flex gap-3"><Search className="h-4 w-4" /><Star className="h-4 w-4" /><Filter className="h-4 w-4" /><CalendarClock className="h-4 w-4" /><Settings className="h-4 w-4" /><HelpCircle className="h-4 w-4" /></div>
    </div>
  );
}

const th = "border-r border-sb-grid-line px-1 text-center text-[12px] font-semibold leading-[17px]";
const td = "border-r border-sb-panel px-1 align-middle text-[12px] leading-[17px]";

export function DataGrid() {
  return (
    <div className="sb-scroll flex-1 overflow-auto bg-sb-panel">
      <table className="w-full min-w-max table-fixed border-collapse">
        <colgroup>{COLS.map(([k, w], i) => <col key={i + k} style={{ width: w }} />)}</colgroup>
        <thead className="sticky top-0 z-10 bg-sb-grid-head">
          <tr className="h-[32px]">
            {COLS.slice(0, 16).map(([k], i) => <th key={i} rowSpan={2} className={th}>{k === "GR Number" ? <>GR<br />Number</> : k === "Student Name" ? <>Student<br />Name</> : k === "Point Coordination" ? <>Point<br />Coordination</> : k}</th>)}
            <th colSpan={2} className={`${th} border-b`}>Schedule Time</th>
            {COLS.slice(18).map(([k]) => <th key={k} rowSpan={2} className={th}>{k}</th>)}
          </tr>
          <tr className="h-[32px]"><th className={th}>From</th><th className={th}>To</th></tr>
        </thead>
        <tbody>
          {Array.from({ length: 2 }).flatMap((_, rep) => R.map((r, i) => (
            <tr key={`${rep}-${i}`} className="h-[78px]">
              <td className={td}><Plus className="mx-auto h-3.5 w-3.5 bg-sb-done text-sb-header-fg" strokeWidth={3} /></td>
              <td className={`${td} overflow-hidden`}>Academic Heights Public School</td>
              <td className={`${td} overflow-hidden`}>Academic Heights Public School</td>
              <td className={td}>{r.cls}</td><td className={`${td} text-center`}>-</td>
              <td className={`${td} overflow-hidden whitespace-nowrap`}>{r.gr}</td>
              <td className={`${td} overflow-hidden`}>{r.name}</td>
              <td className={td}>--</td><td className={`${td} text-center`}>--</td>
              <td className={td}>{r.type}</td><td className={td} />
              <td className={`${td} overflow-hidden whitespace-nowrap pl-2`}>{r.addr}</td>
              <td className={td}>{r.point}</td>
              <td className={`${td} overflow-hidden whitespace-nowrap text-sb-link`}>{r.coord}</td>
              <td className={`${td} text-sb-ok`}>Valid</td>
              <td className={`${td} text-sb-link`}>Permanent</td>
              <td className={`${td} text-center`}>{r.from}</td><td className={`${td} text-center`}>{r.to}</td>
              <td className={td} /><td className={`${td} text-center`}>{r.type === "Pickup" ? "--" : ""}</td>
              <td className={`${td} pl-2`}>School Bus</td><td className={`${td} pl-2`}>TS08UA0147</td>
              <td className={td}><div className="flex justify-center">{["M", "T", "W", "T", "F", "S", "S"].map((d, j) => (
                <span key={j} className={`flex h-[20px] w-[17px] items-center justify-center border border-sb-text text-[11px] ${j < 6 ? "bg-sb-day" : "bg-sb-panel"}`}>{d}</span>))}</div></td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
}

export function ReportPagination() {
  return (
    <div className="flex h-[40px] items-center gap-4 border-t border-sb-grid-line bg-sb-panel px-3">
      <RefreshCw className="h-4 w-4" />
      <span className="flex flex-col items-center text-sb-ok"><FileSpreadsheet className="h-4 w-4" /><span className="text-[7px] font-bold leading-none">XLS</span></span>
      <span className="flex flex-col items-center text-sb-fail"><FileDown className="h-4 w-4" /><span className="text-[7px] font-bold leading-none">PDF</span></span>
      <div className="ml-auto mr-auto flex items-center">
        <input className="h-[24px] w-[170px] border border-sb-grid-line" />
        <select className="h-[24px] w-[160px] border border-sb-grid-line text-[12px]"><option>All</option></select>
        <Search className="ml-1 h-4 w-4" />
      </div>
      <div className="flex items-center gap-2 text-[12px]">
        <AlignJustify className="h-5 w-5" /><select className="h-[24px] border border-sb-grid-line"><option>20</option><option>50</option></select>
        <ChevronLeft className="h-4 w-4" /><select className="h-[24px] border border-sb-grid-line"><option>1</option></select><ChevronRight className="h-4 w-4" />
        <span>1-20 (426)</span>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import type { Map as LMap } from "leaflet";

export type MapMode = "trips" | "video";

const ROUTE: [number, number][] = [
  [18.4855, 73.8075], [18.4862, 73.8105], [18.4858, 73.8160], [18.4870, 73.8190], [18.4835, 73.8215],
  [18.4815, 73.8240], [18.4840, 73.8300], [18.4870, 73.8330], [18.4880, 73.8395], [18.4800, 73.8420],
  [18.4740, 73.8410], [18.4700, 73.8445], [18.4690, 73.8470], [18.4720, 73.8520], [18.4710, 73.8610],
  [18.4650, 73.8640], [18.4600, 73.8600], [18.4580, 73.8560], [18.4620, 73.8500], [18.4670, 73.8480],
];
const CHECKPOINTS: [number, number][] = [
  [18.4835, 73.8215], [18.4740, 73.8410], [18.4700, 73.8445], [18.4720, 73.8475], [18.4730, 73.8500],
  [18.4740, 73.8530], [18.4680, 73.8500], [18.4660, 73.8580], [18.4700, 73.8600], [18.4620, 73.8645],
  [18.4600, 73.8600], [18.4710, 73.8670], [18.4820, 73.8440],
];

export function MapContainer({ mode }: { mode: MapMode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let map: LMap | undefined;
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !ref.current) return;
      map = L.map(ref.current, { zoomControl: false, attributionControl: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
      if (mode === "trips") {
        map.setView([18.4735, 73.838], 15);
        L.polyline(ROUTE, { color: "#5f5f5f", weight: 8, opacity: 0.85 }).addTo(map);
        L.polyline(ROUTE, { color: "#d0d0d0", weight: 2, dashArray: "6 6" }).addTo(map);
        CHECKPOINTS.forEach((c, i) =>
          L.marker(c, { icon: L.divIcon({ className: "", html: `<div class="sb-cp" style="width:26px;height:26px">${i + 1}</div>`, iconSize: [26, 26] }) }).addTo(map!),
        );
        L.circle([18.4715, 73.8435], { radius: 180, color: "#2f6fe0", weight: 2, fillOpacity: 0.25 }).addTo(map);
        L.circle([18.4860, 73.8075], { radius: 60, color: "#2f6fe0", weight: 2, fillOpacity: 0.25 }).addTo(map);
      } else {
        map.setView([17.4983, 78.3471], 19);
        L.marker([17.4985, 78.3466], { icon: L.divIcon({ className: "", html: `<div style="width:24px;height:24px;border-radius:50%;background:#fff;border:2px solid #556;display:flex;align-items:center;justify-content:center;font-size:12px">🚌</div>`, iconSize: [24, 24] }) }).addTo(map);
      }
      setTimeout(() => map?.invalidateSize(), 200);
      L.control.scale({ position: "bottomright", imperial: false }).addTo(map);
    });
    return () => { cancelled = true; map?.remove(); };
  }, [mode]);
  return <div ref={ref} className="absolute inset-0 z-0" />;
}

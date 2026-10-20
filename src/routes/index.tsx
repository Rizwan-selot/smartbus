import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { MapContainer } from "@/components/sb/MapContainer";
import { TrackingListPanel } from "@/components/sb/TrackingListPanel";
import { VehicleDetailsPanel } from "@/components/sb/VehicleDetailsPanel";
import { MapToolbar } from "@/components/sb/common";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tracking: Trips — SmartBus Manager" },
      { name: "description", content: "Live school trip tracking with route, checkpoints and vehicle details." },
      { property: "og:title", content: "Tracking: Trips — SmartBus Manager" },
      { property: "og:description", content: "Live school trip tracking with route, checkpoints and vehicle details." },
    ],
  }),
  component: TrackingTrips,
});

function TrackingTrips() {
  return (
    <div className="relative h-full w-full">
      <MapContainer mode="trips" />
      <div className="absolute left-1/2 top-[8px] z-10 flex h-[24px] items-center gap-2 bg-sb-header px-6 text-[12px] text-sb-header-fg [clip-path:polygon(8%_0,92%_0,100%_100%,0_100%)]"><Play className="h-3 w-3 fill-current" />Playback</div>
      <TrackingListPanel />
      <MapToolbar top={58} right={182} />
      <VehicleDetailsPanel />
      <div className="absolute bottom-[40px] right-[200px] z-10 flex gap-3 bg-sb-panel px-2 py-1 text-[11px] shadow">
        <span className="flex items-center gap-1"><span className="h-3 w-3 bg-sb-done" />Actual Path</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 bg-sb-header" />History Path</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 bg-sb-route" />Defined Path</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 border-x-2 border-sb-fail" />Route Deviation Path</span>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MapContainer } from "@/components/sb/MapContainer";
import { VideoListPanel, VideoPlayerPanel } from "@/components/sb/Video";
import { MapToolbar } from "@/components/sb/common";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Video Tracking — SmartBus Manager" },
      { name: "description", content: "Dashcam channels and live map + video for school vehicles." },
      { property: "og:title", content: "Video Tracking — SmartBus Manager" },
      { property: "og:description", content: "Dashcam channels and live map + video for school vehicles." },
    ],
  }),
  component: VideoTracking,
});

function VideoTracking() {
  return (
    <div className="relative h-full w-full">
      <MapContainer mode="video" />
      <VideoListPanel />
      <MapToolbar top={54} right={460} />
      <VideoPlayerPanel />
    </div>
  );
}

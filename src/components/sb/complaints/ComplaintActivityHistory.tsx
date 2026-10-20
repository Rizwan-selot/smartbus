import { History, MessageSquare, FileText, User, RefreshCw, PlusCircle, Clock } from "lucide-react";
import type { ComplaintActivity } from "@/types/complaints";

interface Props {
  activities: ComplaintActivity[];
}

export function ComplaintActivityHistory({ activities }: Props) {
  const getBadgeAndIcon = (act: ComplaintActivity) => {
    if (act.type === "parent_reply") {
      return {
        icon: <MessageSquare className="h-4 w-4 fill-[#2563EB] text-[#2563EB] shrink-0" />,
        bgClass: "bg-[#F0F5FF]",
      };
    }

    if (act.type === "internal_note") {
      return {
        icon: <FileText className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B] shrink-0" />,
        bgClass: "bg-[#FFFDE8]",
      };
    }

    if (act.type === "assigned") {
      return {
        icon: <User className="h-4 w-4 fill-[#374151] text-[#374151] shrink-0" />,
        bgClass: "bg-white",
      };
    }

    if (act.type === "status_change") {
      return {
        icon: <RefreshCw className="h-4 w-4 text-[#2563EB] stroke-[2.2] shrink-0" />,
        bgClass: "bg-white",
      };
    }

    return {
      icon: <PlusCircle className="h-4 w-4 fill-[#16A34A] text-white shrink-0" />,
      bgClass: "bg-white",
    };
  };

  return (
    <div className="flex flex-col border border-sb-grid-line bg-sb-panel shadow-2xs">
      {/* Header */}
      <div className="flex h-[32px] items-center border-b border-sb-grid-line bg-sb-grid-head px-3 text-[12px] font-semibold text-sb-text">
        <div className="flex items-center gap-1.5">
          <History className="h-3.5 w-3.5 text-sb-text-dim" />
          <span>Activity / History</span>
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-sb-grid-line/60">
        {activities.map((act) => {
          const { icon, bgClass } = getBadgeAndIcon(act);

          return (
            <div key={act.id} className={`flex flex-col p-2.5 text-[12px] ${bgClass}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="font-semibold text-sb-text">{act.action}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-sb-text-dim shrink-0">
                  <span className="font-medium text-sb-text">
                    By: <strong>{act.actor || "Operations"}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 fill-[#374151] text-white shrink-0" />
                    <span>{act.timestamp}</span>
                  </span>
                </div>
              </div>

              {/* Message content for replies and notes */}
              {act.message && act.type !== "created" && (
                <div className="mt-1 ml-6 text-[12px] text-sb-text leading-relaxed select-text">
                  {act.message}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

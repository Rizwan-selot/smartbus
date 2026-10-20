import { History, MessageSquare, Lock, UserCheck, RefreshCw, PlusCircle, Clock, Shield } from "lucide-react";
import type { ComplaintActivity } from "@/types/complaints";

interface Props {
  activities: ComplaintActivity[];
}

export function ComplaintActivityHistory({ activities }: Props) {
  const getBadgeAndIcon = (act: ComplaintActivity) => {
    if (act.type === "parent_reply") {
      return {
        icon: <MessageSquare className="h-3.5 w-3.5 text-sb-done shrink-0" />,
        badge: (
          <span className="inline-flex items-center gap-1 rounded-xs bg-sb-done-bg px-1.5 py-0.5 text-[10px] font-semibold text-sb-done">
            Parent Visible
          </span>
        ),
        bgClass: "bg-[#F7F9FF]",
      };
    }

    if (act.type === "internal_note") {
      return {
        icon: <Lock className="h-3.5 w-3.5 text-sb-warn shrink-0" />,
        badge: (
          <span className="inline-flex items-center gap-1 rounded-xs bg-sb-warn-bg px-1.5 py-0.5 text-[10px] font-semibold text-sb-warn">
            Internal Note
          </span>
        ),
        bgClass: "bg-[#FFFDF4]",
      };
    }

    if (act.type === "assigned") {
      return {
        icon: <UserCheck className="h-3.5 w-3.5 text-sb-text-dim shrink-0" />,
        badge: null,
        bgClass: "bg-sb-panel",
      };
    }

    if (act.type === "status_change") {
      return {
        icon: <RefreshCw className="h-3.5 w-3.5 text-sb-link shrink-0" />,
        badge: null,
        bgClass: "bg-sb-panel",
      };
    }

    return {
      icon: <PlusCircle className="h-3.5 w-3.5 text-sb-ok shrink-0" />,
      badge: null,
      bgClass: "bg-sb-panel",
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
          const { icon, badge, bgClass } = getBadgeAndIcon(act);

          return (
            <div key={act.id} className={`flex flex-col p-2.5 text-[12px] ${bgClass}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {icon}
                  <span className="font-semibold text-sb-text">{act.action}</span>
                  {badge}
                </div>

                <div className="flex items-center gap-3 text-[11px] text-sb-text-dim shrink-0">
                  <span className="font-medium text-sb-text">
                    By: <strong>{act.actor}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {act.timestamp}
                  </span>
                </div>
              </div>

              {/* Message content for replies and notes, excluding repeated created description */}
              {act.message && act.type !== "created" && (
                <div className="mt-1.5 ml-5 rounded-xs border border-sb-grid-line/80 bg-sb-panel p-2 text-[11.5px] text-sb-text leading-relaxed select-text">
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

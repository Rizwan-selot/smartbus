import type { ComplaintStatus } from "@/types/complaints";

interface Props {
  status: ComplaintStatus;
}

export function ComplaintStatusBadge({ status }: Props) {
  // Live SmartBus status styling (matching reference screenshot):
  // Open — #FF9435 (Vibrant Orange), bold text, centered, no pill background
  // In Progress — #2E7D32 (Forest Green), bold text, centered, no pill background
  // Resolved — #2E7D32 (Forest Green), bold text, centered, no pill background
  // Closed — #6B7280 (Slate Grey), bold text, centered, no pill background
  let colorClass = "text-[#6B7280]"; // Closed: Grey
  if (status === "Open") {
    colorClass = "text-[#FF9435]"; // Vibrant Orange
  } else if (status === "In Progress") {
    colorClass = "text-[#2E7D32]"; // Forest Green
  } else if (status === "Resolved") {
    colorClass = "text-[#2E7D32]"; // Green
  }

  return (
    <span
      className={`inline-block text-center text-[12px] font-bold leading-[17px] tracking-normal whitespace-nowrap select-text ${colorClass}`}
    >
      {status}
    </span>
  );
}

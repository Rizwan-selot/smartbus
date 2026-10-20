import { FileText, Eye, Download, Paperclip, Clock, Plus } from "lucide-react";
import type { Complaint, ComplaintAttachment } from "@/types/complaints";

interface Props {
  complaint: Complaint;
  onPreviewAttachment: (attachment: ComplaintAttachment) => void;
  onAddDummyAttachment?: () => void;
}

export function ComplaintDetailsPanel({
  complaint,
  onPreviewAttachment,
  onAddDummyAttachment,
}: Props) {
  const handleDownload = (att: ComplaintAttachment) => {
    const link = document.createElement("a");
    link.href = att.url || `data:text/plain;charset=utf-8,SmartBus%20Attachment%20Evidence%20for%20${encodeURIComponent(att.name)}`;
    link.download = att.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col border border-sb-grid-line bg-sb-panel shadow-2xs">
      {/* Panel Header */}
      <div className="flex h-[32px] items-center border-b border-sb-grid-line bg-sb-grid-head px-3 text-[12px] font-semibold text-sb-text">
        <div className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-sb-text-dim" />
          <span>Complaint Details</span>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-3 text-[12px]">
        {/* Key-Value Fields */}
        <div className="flex flex-col">
          {/* Category */}
          <div className="flex items-start border-b border-sb-grid-line/60 py-1.5">
            <span className="w-[125px] shrink-0 text-sb-text-dim text-[11.5px]">Complaint Category</span>
            <span className="font-semibold text-sb-text">{complaint.category}</span>
          </div>

          {/* Student Name */}
          <div className="flex items-start border-b border-sb-grid-line/60 py-1.5">
            <span className="w-[125px] shrink-0 text-sb-text-dim text-[11.5px]">Student Name</span>
            <span className="font-semibold text-sb-text">{complaint.studentName}</span>
          </div>

          {/* Route & Branch */}
          <div className="flex items-start border-b border-sb-grid-line/60 py-1.5">
            <span className="w-[125px] shrink-0 text-sb-text-dim text-[11.5px]">Route</span>
            <span className="text-sb-text">
              <strong className="font-medium text-sb-text">{complaint.route}</strong>
              {complaint.branch && (
                <span className="ml-1 text-[11px] text-sb-text-dim">• {complaint.branch}</span>
              )}
            </span>
          </div>

          {/* Parent Contact */}
          <div className="flex items-start border-b border-sb-grid-line/60 py-1.5">
            <span className="w-[130px] shrink-0 text-sb-text-dim text-[11.5px]">Parent Contact:</span>
            <span className="text-sb-text">
              {complaint.parentName}
              {complaint.parentPhone && (
                <span className="text-[#1F4591] font-medium ml-1">| {complaint.parentPhone}</span>
              )}
            </span>
          </div>

          {/* Raised Date & Time */}
          <div className="flex items-start border-b border-sb-grid-line/60 py-1.5">
            <span className="w-[130px] shrink-0 text-sb-text-dim text-[11.5px]">Raised Date & Time:</span>
            <span className="text-sb-text font-normal">{complaint.dateRaised}</span>
          </div>
        </div>

        {/* Complaint Description */}
        <div className="mt-3">
          <span className="mb-1 block text-[11.5px] font-semibold text-sb-text-dim">
            Complaint Description:
          </span>
          <div className="rounded-[4px] border border-[#E5E7EB] bg-[#F9F9F9] p-2.5 text-[12px] text-sb-text leading-relaxed select-text">
            {complaint.description || "No description provided."}
          </div>
        </div>

        {/* Attachments */}
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[11.5px] font-semibold text-sb-text-dim">
            <div className="flex items-center gap-1.5">
              <Paperclip className="h-3.5 w-3.5" />
              <span>Attachment ({complaint.attachments.length})</span>
            </div>
            {onAddDummyAttachment && (
              <button
                type="button"
                onClick={onAddDummyAttachment}
                className="flex items-center gap-1 text-[11px] font-medium text-[#1F4591] hover:underline cursor-pointer"
                title="Add a dummy attachment"
              >
                <Plus className="h-3 w-3" />
                <span>Add Dummy File</span>
              </button>
            )}
          </div>

          {complaint.attachments.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-[3px] border border-dashed border-sb-grid-line p-4 text-center text-[11px] text-sb-text-dim bg-[#FAFAFA]">
              <span>No attachments provided with this complaint.</span>
              {onAddDummyAttachment && (
                <button
                  type="button"
                  onClick={onAddDummyAttachment}
                  className="inline-flex items-center gap-1 rounded-[3px] border border-sb-grid-line bg-sb-panel px-2.5 py-1 text-[11px] font-medium text-[#1F4591] hover:bg-sb-workspace shadow-2xs cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Dummy File</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {complaint.attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center justify-between rounded-[3px] border border-[#E5E7EB] bg-white px-2.5 py-1.5"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 text-[#6B7280] shrink-0" />
                    <span className="truncate text-[12px] font-medium text-sb-text">{att.name}</span>
                    <span className="text-[10.5px] text-sb-text-dim shrink-0">({att.size})</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => onPreviewAttachment(att)}
                      className="flex items-center gap-1 text-[11px] font-medium text-[#1F4591] hover:underline cursor-pointer"
                      title="Preview attachment"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(att)}
                      className="flex items-center text-[#1F4591] hover:opacity-80 cursor-pointer"
                      title="Download attachment"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

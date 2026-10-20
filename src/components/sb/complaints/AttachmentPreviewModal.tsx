import { X, Download, FileText, Image as ImageIcon } from "lucide-react";
import type { ComplaintAttachment } from "@/types/complaints";

interface Props {
  attachment: ComplaintAttachment | null;
  onClose: () => void;
}

export function AttachmentPreviewModal({ attachment, onClose }: Props) {
  if (!attachment) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = attachment.url || `data:text/plain;charset=utf-8,SmartBus%20Attachment%20Evidence%20for%20${encodeURIComponent(attachment.name)}`;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xs border border-sb-grid-line bg-sb-panel shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex h-[36px] items-center justify-between border-b border-sb-grid-line bg-sb-header px-3 text-sb-header-fg">
          <div className="flex items-center gap-2 truncate text-[12px] font-medium">
            {attachment.type === "image" ? (
              <ImageIcon className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            <span className="truncate">{attachment.name}</span>
            <span className="text-[10px] text-white/70">({attachment.size})</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1 text-[11px] text-white/90 hover:text-white"
              title="Download attachment"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-white/80 hover:text-white"
              title="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center overflow-auto bg-[#F4F4F4] p-4">
          {attachment.type === "image" ? (
            <img
              src={attachment.url}
              alt={attachment.name}
              className="max-h-[60vh] max-w-full rounded-xs object-contain border border-sb-grid-line shadow-xs"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 p-8 text-center text-sb-text">
              <FileText className="h-12 w-12 text-sb-text-dim" />
              <div>
                <p className="text-[13px] font-semibold">{attachment.name}</p>
                <p className="text-[11px] text-sb-text-dim">{attachment.size} • Document File</p>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="mt-2 inline-flex items-center gap-1.5 rounded-xs border border-sb-grid-line bg-sb-panel px-3 py-1.5 text-[12px] font-medium text-sb-link hover:bg-sb-workspace shadow-2xs"
              >
                <Download className="h-3.5 w-3.5" />
                Download Document
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex h-[32px] items-center justify-between border-t border-sb-grid-line bg-sb-panel px-3 text-[11px] text-sb-text-dim">
          <span>SmartBus Attachment Viewer</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xs border border-sb-grid-line px-2 py-0.5 text-sb-text hover:bg-sb-workspace"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

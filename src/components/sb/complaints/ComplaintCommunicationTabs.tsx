import { useState } from "react";
import { Send, Lock, MessageSquare, Check } from "lucide-react";

interface Props {
  ticketNo: string;
  onSendReply: (reply: string) => void;
  onAddNote: (note: string) => void;
}

export function ComplaintCommunicationTabs({ ticketNo, onSendReply, onAddNote }: Props) {
  const [activeTab, setActiveTab] = useState<"reply" | "internal">("reply");
  const [replyText, setReplyText] = useState("");
  const [noteText, setNoteText] = useState("");
  const [feedback, setFeedback] = useState<{ message: string; type: "reply" | "note" } | null>(null);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onSendReply(replyText);
    setReplyText("");
    setFeedback({
      message: "Reply sent successfully. Push notification dispatched to Parent Mobile App.",
      type: "reply",
    });

    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    onAddNote(noteText);
    setNoteText("");
    setFeedback({
      message: "Internal remark recorded in ticket activity history.",
      type: "note",
    });

    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  return (
    <div className="flex flex-col border border-sb-grid-line bg-sb-panel shadow-2xs">
      {/* Tab Navigation (Exact SmartBus Tab pattern) */}
      <div className="flex h-[34px] items-end border-b border-sb-grid-line bg-sb-header px-1 text-sb-header-fg">
        <button
          type="button"
          onClick={() => {
            setActiveTab("reply");
            setFeedback(null);
          }}
          className={`flex h-[28px] items-center gap-1.5 rounded-t-xs px-3 text-[12px] font-medium transition-colors ${
            activeTab === "reply"
              ? "bg-sb-panel text-sb-text border-t-2 border-sb-link"
              : "text-white/80 hover:text-white"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5 text-sb-link" />
          <span>Reply to Parent</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("internal");
            setFeedback(null);
          }}
          className={`flex h-[28px] items-center gap-1.5 rounded-t-xs px-3 text-[12px] font-medium transition-colors ${
            activeTab === "internal"
              ? "bg-sb-panel text-sb-text border-t-2 border-sb-warn"
              : "text-white/80 hover:text-white"
          }`}
        >
          <Lock className="h-3.5 w-3.5 text-sb-warn" />
          <span>Internal Notes</span>
        </button>
      </div>

      {/* Tab 1: Reply to Parent */}
      {activeTab === "reply" && (
        <form onSubmit={handleSendReply} className="flex flex-1 flex-col p-3">
          <label htmlFor="reply-text" className="mb-1 text-[11.5px] font-semibold text-sb-text-dim">
            Response Message:
          </label>
          <textarea
            id="reply-text"
            rows={5}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply to the parent regarding ticket resolution or updates..."
            className="w-full resize-y rounded-xs border border-sb-grid-line bg-sb-panel p-2.5 text-[12px] text-sb-text outline-none focus:border-sb-link placeholder:text-sb-text-dim"
          />

          <div className="mt-2.5 flex items-center justify-end">
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="flex h-[28px] items-center gap-1.5 rounded-xs bg-sb-done px-3.5 text-[11.5px] font-medium text-white shadow-2xs hover:bg-[#1E1EB8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Reply</span>
            </button>
          </div>

          {feedback && feedback.type === "reply" && (
            <div className="mt-2.5 flex items-center gap-1.5 rounded-xs border border-sb-ok bg-sb-ok-bg px-2.5 py-1.5 text-[11.5px] text-sb-ok">
              <Check className="h-3.5 w-3.5 shrink-0" />
              <span>{feedback.message}</span>
            </div>
          )}
        </form>
      )}

      {/* Tab 2: Internal Notes */}
      {activeTab === "internal" && (
        <form onSubmit={handleAddNote} className="flex flex-1 flex-col p-3">
          {/* FRS Banner */}
          <div className="mb-2 flex items-center gap-1.5 rounded-xs border border-[#FFF0C2] bg-[#FFFBEA] px-2.5 py-1.5 text-[11px] text-sb-warn">
            <Lock className="h-3.5 w-3.5 shrink-0" />
            <span>
              <strong>Confidential:</strong> Internal notes are visible only to the ET Operations team and never shown to parents.
            </span>
          </div>

          <label htmlFor="note-text" className="mb-1 text-[11.5px] font-semibold text-sb-text-dim">
            Internal Note / Remarks:
          </label>
          <textarea
            id="note-text"
            rows={5}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Record internal investigation remarks, driver coordination notes, or escalation status..."
            className="w-full resize-y rounded-xs border border-sb-grid-line bg-sb-panel p-2.5 text-[12px] text-sb-text outline-none focus:border-sb-warn placeholder:text-sb-text-dim"
          />

          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[10.5px] text-sb-text-dim">
              Internal notes are strictly restricted to ET Operations personnel.
            </span>
            <button
              type="submit"
              disabled={!noteText.trim()}
              className="flex h-[28px] items-center gap-1.5 rounded-xs bg-[#4A4A4A] px-3.5 text-[11.5px] font-medium text-white shadow-2xs hover:bg-[#333333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Add Internal Note</span>
            </button>
          </div>

          {feedback && feedback.type === "note" && (
            <div className="mt-2.5 flex items-center gap-1.5 rounded-xs border border-sb-link bg-[#F0F2FF] px-2.5 py-1.5 text-[11.5px] text-sb-link">
              <Check className="h-3.5 w-3.5 shrink-0" />
              <span>{feedback.message}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

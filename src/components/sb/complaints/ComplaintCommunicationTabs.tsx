import { useState } from "react";
import { Send, Lock, MessageSquare, Check, CalendarDays } from "lucide-react";

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
      {/* Tab Navigation (Exact SmartBus Tab pattern from screenshots) */}
      <div className="flex h-[34px] items-end border-b border-sb-grid-line bg-sb-header px-1 text-sb-header-fg">
        {activeTab === "reply" ? (
          <div className="flex h-[30px] items-center gap-1.5 rounded-t-[3px] bg-white px-3.5 text-[12px] font-semibold text-[#274289] shadow-2xs">
            <MessageSquare className="h-4 w-4 fill-[#274289] text-[#274289]" />
            <span>Reply to Parent</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setActiveTab("reply");
              setFeedback(null);
            }}
            className="flex h-[30px] items-center px-3 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Reply to Parent"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
        )}

        {activeTab === "internal" ? (
          <div className="flex h-[30px] items-center gap-1.5 rounded-t-[3px] bg-white px-3.5 text-[12px] font-semibold text-[#274289] shadow-2xs">
            <CalendarDays className="h-4 w-4 fill-[#274289] text-white" />
            <span>Internal Notes</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setActiveTab("internal");
              setFeedback(null);
            }}
            className="flex h-[30px] items-center px-3 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Internal Notes"
          >
            <CalendarDays className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tab 1: Reply to Parent */}
      {activeTab === "reply" && (
        <form onSubmit={handleSendReply} className="flex flex-1 flex-col p-3">
          <label htmlFor="reply-text" className="mb-1.5 text-[12px] font-semibold text-sb-text">
            Response Message:
          </label>
          <textarea
            id="reply-text"
            rows={5}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply to the parent regarding ticket resolution or updates..."
            className="w-full resize-y rounded-[3px] border border-[#D9D9D9] bg-white p-2.5 text-[12px] text-sb-text outline-none focus:border-[#274289] placeholder:text-[#999999]"
          />

          <div className="mt-3 flex items-center justify-end">
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="flex h-[32px] items-center gap-2 rounded-[4px] bg-[#274289] px-4 text-[12px] font-medium text-white shadow-2xs hover:bg-[#1E356F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4 fill-white text-white" />
              <span>Send Reply</span>
            </button>
          </div>

          {feedback && feedback.type === "reply" && (
            <div className="mt-2.5 flex items-center gap-1.5 rounded-[3px] border border-sb-ok bg-sb-ok-bg px-2.5 py-1.5 text-[11.5px] text-sb-ok">
              <Check className="h-3.5 w-3.5 shrink-0" />
              <span>{feedback.message}</span>
            </div>
          )}
        </form>
      )}

      {/* Tab 2: Internal Notes */}
      {activeTab === "internal" && (
        <form onSubmit={handleAddNote} className="flex flex-1 flex-col p-3">
          {/* Confidential Banner */}
          <div className="mb-3 flex items-center gap-2 rounded-[3px] border border-[#FEEBC8] bg-[#FCF5D8] px-3 py-2 text-[12px]">
            <Lock className="h-4 w-4 fill-[#C29726] text-[#C29726] shrink-0" />
            <span className="text-[#92400E]">
              <strong className="font-bold text-[#B45309]">Confidential:</strong> Internal notes are visible only to the ET Operations team and never shown to parents.
            </span>
          </div>

          <label htmlFor="note-text" className="mb-1.5 text-[12px] font-semibold text-sb-text">
            Internal Note / Remarks:
          </label>
          <textarea
            id="note-text"
            rows={5}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Record internal investigation remarks, driver coordination notes, or escalation status..."
            className="w-full resize-y rounded-[3px] border border-[#D9D9D9] bg-white p-2.5 text-[12px] text-sb-text outline-none focus:border-[#274289] placeholder:text-[#999999]"
          />

          <div className="mt-3 flex items-center justify-end">
            <button
              type="submit"
              disabled={!noteText.trim()}
              className="flex h-[32px] items-center gap-2 rounded-[4px] bg-[#274289] px-4 text-[12px] font-medium text-white shadow-2xs hover:bg-[#1E356F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4 fill-white text-white" />
              <span>Add Internal Note</span>
            </button>
          </div>

          {feedback && feedback.type === "note" && (
            <div className="mt-2.5 flex items-center gap-1.5 rounded-[3px] border border-sb-link bg-[#F0F2FF] px-2.5 py-1.5 text-[11.5px] text-sb-link">
              <Check className="h-3.5 w-3.5 shrink-0" />
              <span>{feedback.message}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

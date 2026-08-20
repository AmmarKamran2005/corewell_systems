"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hello — I'm Corewell's software architect assistant. Tell me two things: what industry is your business in, and what's the main problem you'd like software to solve?",
};

const UNAVAILABLE_MESSAGE =
  "The assistant isn't available right now — but a real conversation is even better. Use the button below to book a free consultation.";

/**
 * "Ask Our Software Architect" — spec Section 8. Persistent bottom-corner
 * launcher; history lives in component state only (per-session, nothing
 * stored). The Book a Consultation handoff is a permanent footer button, so
 * the primary CTA survives even when the model is unavailable.
 */
export function ConsultantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, open]);

  // The panel overlays the page, so it needs dialog behaviour: Escape closes
  // it, focus moves in on open, and focus returns to the trigger on close —
  // otherwise a keyboard user has no way out and lands back at <body>.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages(history);
    setBusy(true);

    try {
      const res = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only — send the real exchange.
        body: JSON.stringify({ messages: history.slice(1) }),
      });

      if (!res.ok || !res.body) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: UNAVAILABLE_MESSAGE },
        ]);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          next[next.length - 1] = {
            ...last,
            content: last.content + chunk,
          };
          return next;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: UNAVAILABLE_MESSAGE },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          ref={panelRef}
          id="consultant-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Ask Our Software Architect"
          className="flex max-h-[70vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_8px_40px_rgb(27_36_48/0.14)] sm:w-96"
        >
          <div className="flex items-center justify-between border-b border-line bg-canvas-subtle px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink">
                Ask Our Software Architect
              </p>
              <p className="text-xs text-faint">
                AI assistant · general guidance, never a fixed quote
              </p>
            </div>
            <button type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-soft hover:bg-canvas-subtle hover:text-ink"
            >
              <svg
                aria-hidden
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  message.role === "user"
                    ? "ml-auto bg-accent text-white"
                    : "bg-canvas-subtle text-ink"
                )}
              >
                {message.content ||
                  (busy && index === messages.length - 1 ? "…" : "")}
              </div>
            ))}
          </div>

          <div className="border-t border-line p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                ref={inputRef}
                placeholder="Type your question…"
                aria-label="Your question"
                className="flex-1 rounded-full border border-line bg-canvas px-4 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              />
              <button type="button"
                onClick={send}
                disabled={busy || input.trim().length === 0}
                className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <Link
              href="/book-consultation"
              className="mt-2.5 block rounded-full border border-line px-4 py-2 text-center text-sm font-medium text-accent transition-colors hover:border-accent/50"
              onClick={() => setOpen(false)}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="consultant-panel"
        className="flex items-center gap-2 rounded-full bg-ink-strong px-5 py-3 text-sm font-medium text-white shadow-[0_4px_20px_rgb(27_36_48/0.25)] transition-colors hover:bg-ink"
      >
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 10a2 2 0 0 1-2 2H6l-4 3V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6z" />
        </svg>
        Ask Our Software Architect
      </button>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

type Message = { role: "user" | "assistant"; content: string };
const suggestions = ["What services do you offer?", "Show me relevant projects", "I need a Shopify store"];

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const panel = useRef<HTMLElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  const sending = useRef(false);

  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => { if (open) end.current?.scrollIntoView({ block: "nearest" }); }, [messages, busy, open]);
  useEffect(() => () => controller.current?.abort(), []);
  function close() { setOpen(false); launcher.current?.focus(); }
  async function send(value: string) {
    const content = value.trim();
    if (!content || sending.current) return;
    const history: Message[] = [...messages, { role: "user", content }];
    sending.current = true; setBusy(true); setError(""); setDraft(""); setMessages(history);
    controller.current = new AbortController();
    const timeout = setTimeout(() => controller.current?.abort(), 30000);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.slice(-11) }), signal: controller.current.signal });
      const data = await response.json();
      if (!response.ok || typeof data.message !== "string") throw new Error(data.error || "Unable to send. Please try again.");
      setMessages([...history, { role: "assistant", content: data.message }]);
    } catch (failure) {
      setMessages(history.slice(0, -1)); setDraft(content);
      setError(failure instanceof Error && failure.name !== "AbortError" ? failure.message : "The request timed out. Please try again.");
    } finally { clearTimeout(timeout); sending.current = false; setBusy(false); input.current?.focus(); }
  }

  return <>
    <button ref={launcher} type="button" onClick={() => open ? close() : setOpen(true)} aria-expanded={open} aria-controls="portfolio-chat" className="fixed bottom-24 right-5 z-40 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ultra md:bottom-28 md:right-8">Ask AI <span aria-hidden="true">↗</span></button>
    {open && <section ref={panel} id="portfolio-chat" role="dialog" aria-label="Tayyaba's AI portfolio assistant" onKeyDown={event => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key === "Tab") {
        const elements = panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], textarea');
        const first = elements?.[0], last = elements?.[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }} className="fixed bottom-24 right-4 z-50 flex max-h-[calc(100dvh-7rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-ink/20 bg-paper text-ink shadow-xl md:bottom-28 md:right-8">
      <header className="flex items-center justify-between border-b border-ink/15 px-4 py-3">
        <div><p className="font-display text-lg font-semibold">Ask about my work</p><p className="text-xs">Tayyaba’s AI assistant</p></div>
        <button type="button" onClick={close} aria-label="Close assistant" className="h-11 w-11 rounded hover:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ultra">✕</button>
      </header>
      <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-sm leading-relaxed">Hi! I can help you explore Tayyaba’s services and projects. What are you planning to build?</p>
        {!messages.length && <div className="flex flex-col gap-2">{suggestions.map(question => <button key={question} disabled={busy} onClick={() => send(question)} className="rounded border border-ink/20 px-3 py-3 text-left text-sm hover:bg-lilac focus-visible:outline focus-visible:outline-2 focus-visible:outline-ultra">{question} <span aria-hidden="true">↗</span></button>)}</div>}
        <div role="log" aria-live="polite" aria-relevant="additions text" className="space-y-3">{messages.map((message, index) => <div key={index} className={`rounded-lg px-3 py-3 text-sm ${message.role === "user" ? "ml-6 bg-ink text-paper" : "mr-3 bg-white"}`}><span className="mb-1 block text-xs font-semibold">{message.role === "user" ? "You" : "AI assistant"}</span><p className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</p></div>)}</div>
        {busy && <p role="status" className="mt-3 text-sm">Thinking…</p>}
        {error && <p role="alert" className="mt-3 rounded border border-ink/30 p-3 text-sm">{error}</p>}
        <div ref={end} />
      </div>
      <footer className="border-t border-ink/15 p-4">
        <form onSubmit={event => { event.preventDefault(); send(draft); }}>
          <label htmlFor="chat-message" className="sr-only">Your question</label>
          <textarea ref={input} id="chat-message" value={draft} onChange={event => setDraft(event.target.value)} maxLength={2000} rows={2} placeholder="Tell me about your project…" className="w-full resize-none rounded border border-ink/30 bg-white p-3 text-base focus:outline focus:outline-2 focus:outline-ultra" />
          <div className="mt-2 flex justify-between gap-2"><button type="button" disabled={busy || !messages.length} onClick={() => { setMessages([]); setError(""); setDraft(""); input.current?.focus(); }} className="px-2 text-sm underline disabled:opacity-40">New chat</button><button disabled={busy || !draft.trim()} className="rounded bg-ultra px-5 py-3 text-sm font-medium text-white disabled:opacity-50">{busy ? "Sending…" : "Send"}</button></div>
        </form>
        <p className="mt-3 text-xs leading-relaxed">AI can make mistakes. Messages are sent to Google Gemini and may be used to improve Google products. Please don’t share sensitive details.</p>
        <div className="mt-2 flex gap-4 text-sm underline"><a href={`mailto:${profile.contact.email}`}>Email Tayyaba</a><a href={profile.contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div>
      </footer>
    </section>}
  </>;
}

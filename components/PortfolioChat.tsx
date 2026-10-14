"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

type Message = { role: "user" | "assistant"; content: string };
const suggestions = [
  { title: "Build a website", detail: "Structure, platform & launch", prompt: "Help me plan a business website. Ask me the most useful first question." },
  { title: "Grow an online store", detail: "Shopify & WooCommerce", prompt: "I need help with an online store. Help me define the requirements." },
  { title: "Automate my business", detail: "AI assistants & connected workflows", prompt: "I want an AI assistant or automation for my business. Help me identify a useful workflow." },
  { title: "Explore the portfolio", detail: "Find work relevant to my project", prompt: "Help me find relevant portfolio projects. Ask what kind of business I have." },
];

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const assistantText = messages.filter(message => message.role === "assistant").map(message => message.content).join(" ").toLowerCase();
  const recommended = projects.filter(project => assistantText.includes(project.name.toLowerCase())).slice(0, 3);
  const brief = messages.map(message => `${message.role === "user" ? "Client" : "Assistant"}: ${message.content}`).join("\n\n");
  const emailLink = `mailto:${profile.contact.email}?subject=${encodeURIComponent("Project inquiry from your portfolio")}&body=${encodeURIComponent(brief.slice(-6000))}`;
  async function copyBrief() { try { await navigator.clipboard.writeText(brief); setCopied(true); } catch { setError("Copy is unavailable. You can select the conversation text or use Email project details."); } }
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
      setCopied(false); setMessages([...history, { role: "assistant", content: data.message }]);
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
    }} className={`fixed bottom-24 right-4 z-50 flex h-[min(44rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] ${expanded ? "max-w-2xl" : "max-w-md"} flex-col overflow-hidden rounded-2xl border border-ink/20 bg-paper text-ink shadow-2xl md:bottom-28 md:right-8`}>
      <header className="flex items-center justify-between bg-ink px-5 py-4 text-paper">
        <div className="flex items-center gap-3"><span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl border border-paper/30 font-display text-lg">TA</span><div><p className="font-display text-lg font-semibold">Project concierge</p><p className="text-xs text-paper/80">Tayyaba Akmal · AI assistant</p></div></div>
        <div className="flex"><button type="button" onClick={() => setExpanded(!expanded)} aria-label={expanded ? "Compact chat" : "Expand chat"} className="hidden h-11 w-11 rounded hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper sm:block">{expanded ? "↙" : "↗"}</button><button type="button" onClick={close} aria-label="Close assistant" className="h-11 w-11 rounded hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper">✕</button></div>
      </header>
      <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        {!messages.length && <div><p className="mb-2 text-xs font-medium uppercase tracking-widest text-ultra">From idea to a clear next step</p><p className="font-display text-3xl leading-tight">What would you<br />like to build?</p><p className="mb-5 mt-3 text-sm leading-relaxed">Explore services, find relevant work, or shape your project requirements. I’ll help you prepare for a conversation with Tayyaba.</p><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{suggestions.map(question => <button key={question.title} disabled={busy} onClick={() => send(question.prompt)} className="rounded-xl border border-ink/20 bg-white p-4 text-left transition-colors hover:border-ultra hover:bg-lilac/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ultra"><span className="block text-sm font-semibold">{question.title} ↗</span><span className="mt-1 block text-xs leading-relaxed">{question.detail}</span></button>)}</div></div>}
        <div role="log" aria-live="polite" aria-relevant="additions text" className="space-y-3">{messages.map((message, index) => <div key={index} className={`rounded-xl px-4 py-4 text-sm ${message.role === "user" ? "ml-6 bg-ink text-paper" : "mr-3 bg-white"}`}><span className="mb-1 block text-xs font-semibold">{message.role === "user" ? "You" : "Project concierge"}</span><p className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</p></div>)}</div>
        {busy && <p role="status" className="mt-3 text-sm">Preparing your answer…</p>}
        {error && <p role="alert" className="mt-3 rounded border border-ink/30 p-3 text-sm">{error}</p>}
        {!busy && recommended.length > 0 && <nav aria-label="Recommended portfolio projects" className="mt-5 border-t border-ink/15 pt-4"><p className="mb-2 text-xs font-semibold uppercase tracking-wider">Explore this work</p>{recommended.map(project => <a key={project.slug} href={`/projects/${project.slug}`} className="mb-2 flex items-center justify-between rounded-lg border border-ink/20 bg-white p-3 text-sm hover:border-ultra"><span><span className="block font-semibold">{project.name}</span><span className="text-xs">{project.category}</span></span><span aria-hidden="true">↗</span></a>)}</nav>}
        <div ref={end} />
      </div>
      <footer className="border-t border-ink/15 p-4">
        <form onSubmit={event => { event.preventDefault(); send(draft); }}>
          <label htmlFor="chat-message" className="sr-only">Your question</label>
          <textarea ref={input} id="chat-message" value={draft} onChange={event => setDraft(event.target.value)} maxLength={2000} rows={2} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(draft); } }} placeholder="Tell me about your project…" className="w-full resize-none rounded border border-ink/30 bg-white p-3 text-base focus:outline focus:outline-2 focus:outline-ultra" />
          <div className="mt-2 flex justify-between gap-2"><button type="button" disabled={busy || !messages.length} onClick={() => { setMessages([]); setError(""); setDraft(""); setCopied(false); input.current?.focus(); }} className="px-2 text-sm underline disabled:opacity-40">New chat</button><button disabled={busy || !draft.trim()} className="rounded bg-ultra px-5 py-3 text-sm font-medium text-white disabled:opacity-50">{busy ? "Sending…" : "Send"}</button></div>
        </form>
        {messages.length > 1 && <div className="mt-3 flex flex-wrap gap-3 text-xs"><button type="button" disabled={busy} onClick={() => send("Summarize my project requirements so far as a concise English project brief. Include only details I have supplied, list open questions, and do not invent a budget or deadline.")} className="underline disabled:opacity-40">Create project brief</button><button type="button" onClick={copyBrief} className="underline">{copied ? "Conversation copied" : "Copy conversation"}</button><a href={emailLink} className="underline">Email project details</a></div>}
        <p className="mt-3 text-xs leading-relaxed">AI can make mistakes. Messages are sent to Google Gemini and may be used to improve Google products. Please don’t share sensitive details.</p>
        <div className="mt-2 flex flex-wrap gap-4 text-sm underline"><a href={profile.contact.calendly} target="_blank" rel="noopener noreferrer">Book a call ↗</a><a href={`mailto:${profile.contact.email}`}>Email Tayyaba</a><a href={profile.contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div>
      </footer>
    </section>}
  </>;
}

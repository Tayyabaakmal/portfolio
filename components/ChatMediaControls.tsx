"use client";
import { useEffect, useRef, useState } from "react";

type Recognition = { lang: string; continuous: boolean; interimResults: boolean; onresult: ((event: { results: { transcript: string }[][] }) => void) | null; onerror: (() => void) | null; onend: (() => void) | null; start: () => void; stop: () => void };
type Props = { files: File[]; onFiles: (files: File[]) => void; onTranscript: (text: string) => void; lastReply: string; disabled: boolean };
export default function ChatMediaControls({ files, onFiles, onTranscript, lastReply, disabled }: Props) {
  const picker = useRef<HTMLInputElement>(null);
  const recognition = useRef<Recognition | null>(null);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  useEffect(() => { const urls = files.map(file => file.type.startsWith("image/") ? URL.createObjectURL(file) : ""); setPreviews(urls); return () => urls.forEach(url => { if (url) URL.revokeObjectURL(url); }); }, [files]);
  useEffect(() => () => { recognition.current?.stop(); if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);
  function voice() {
    if (listening) { recognition.current?.stop(); return; }
    const Constructor = (window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: new () => Recognition }).webkitSpeechRecognition;
    if (!Constructor) { setNotice("Voice input is unavailable in this browser. Please type your message."); return; }
    const engine = new Constructor(); recognition.current = engine; engine.lang = "en-US"; engine.continuous = false; engine.interimResults = false;
    engine.onresult = event => { onTranscript(event.results[0][0].transcript); setNotice("Review the transcript, then press Send. Your browser may process voice remotely; audio is not saved with your inquiry."); };
    engine.onerror = () => { setListening(false); setNotice("Microphone access or recognition failed. Please check browser permissions or type your message."); };
    engine.onend = () => setListening(false);
    try { engine.start(); setListening(true); setNotice("Listening in English… Speak, then review your message before sending."); } catch { setNotice("Voice input could not start. Please try again."); }
  }
  function read() {
    if (!("speechSynthesis" in window)) { setNotice("Spoken replies are unavailable in this browser."); return; }
    window.speechSynthesis.cancel(); if (speaking) { setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(lastReply); utterance.lang = "en-US"; utterance.onend = () => setSpeaking(false); utterance.onerror = () => setSpeaking(false); window.speechSynthesis.speak(utterance); setSpeaking(true);
  }
  const button = "flex h-9 items-center gap-1.5 rounded-lg border border-ink/20 bg-white px-3 text-xs font-medium transition-colors hover:border-ultra focus-visible:outline focus-visible:outline-2 focus-visible:outline-ultra disabled:opacity-40";
  return <div className="mb-2">
    <div className="flex flex-wrap gap-2"><button type="button" className={button} disabled={disabled} onClick={() => picker.current?.click()} title="Attach screenshots or project documents"><span aria-hidden="true">＋</span> Attach</button><button type="button" className={button} disabled={disabled} onClick={voice} aria-pressed={listening}><svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/></svg>{listening ? "Stop recording" : "Voice"}</button><button type="button" className={button} disabled={!lastReply} onClick={read} aria-pressed={speaking}><span aria-hidden="true">◖</span>{speaking ? "Stop reading" : "Read reply"}</button></div>
    <input ref={picker} type="file" multiple accept="image/png,image/jpeg,image/webp,application/pdf,.doc,.docx,.txt" className="sr-only" tabIndex={-1} onChange={event => {
      const next = [...files, ...Array.from(event.target.files || [])]; event.target.value = "";
      if (next.length > 3 || next.reduce((total, file) => total + file.size, 0) > 9 * 1024 * 1024) { setNotice("Choose up to 3 files, with a combined size under 9 MB."); return; }
      if (next.some(file => !/\.(png|jpe?g|webp|pdf|docx?|txt)$/i.test(file.name))) { setNotice("Supported files: PNG, JPG, WebP, PDF, Word and TXT."); return; }
      onFiles(next); setNotice("Files are attached for human follow-up. The AI does not read them. They are uploaded only when you submit the contact form.");
    }} />
    {files.length > 0 && <ul className="mt-2 space-y-1">{files.map((file, index) => <li key={`${file.name}-${index}`} className="flex items-center gap-2 rounded-lg border border-ink/15 bg-white p-2 text-xs">{previews[index] && <img src={previews[index]} alt={`Attachment preview: ${file.name}`} className="h-9 w-9 rounded object-cover" />}<span className="min-w-0 flex-1 truncate">{file.name} · {(file.size / 1024).toFixed(0)} KB</span><button type="button" aria-label={`Remove ${file.name}`} className="h-8 w-8" onClick={() => onFiles(files.filter((_, i) => i !== index))}>✕</button></li>)}</ul>}
    {notice && <p role="status" className="mt-2 text-xs leading-relaxed">{notice}</p>}
  </div>;
}

"use client";
import { useState } from "react";

export default function ChatContactForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const field = "mt-1 w-full rounded-lg border border-ink/30 bg-white px-3 py-2 text-base focus:outline focus:outline-2 focus:outline-ultra";
  return <div className="mt-3 border-t border-ink/15 pt-3">
    <button type="button" aria-expanded={open} aria-controls="chat-contact-form" onClick={() => setOpen(!open)} className="w-full rounded-lg border border-ink/30 px-4 py-3 text-left text-sm font-semibold hover:bg-lilac/30">{open ? "Close contact form −" : "Leave your contact details ↗"}</button>
    {open && <form id="chat-contact-form" action="https://formsubmit.co/tkcreators01@gmail.com" method="POST" target="_blank" onSubmit={event => {
      if (!email.trim() && !phone.trim()) { event.preventDefault(); setError("Please enter an email address or a phone number so Tayyaba can contact you."); return; }
      if (phone.trim() && phone.replace(/\D/g, "").length < 7) { event.preventDefault(); setError("Please enter a valid phone number, including your country code."); return; }
      setError("");
    }} className="mt-3 space-y-3 rounded-xl border border-ink/15 bg-white/60 p-4">
      <p className="text-sm leading-relaxed">Share your project and preferred contact details. Tayyaba will receive your inquiry by email.</p>
      <input type="hidden" name="_subject" value="New portfolio chatbot inquiry" />
      <input type="hidden" name="_template" value="table" />
      <label className="block text-xs font-medium" htmlFor="lead-name">Name<input id="lead-name" name="name" required maxLength={100} autoComplete="name" className={field} /></label>
      <label className="block text-xs font-medium" htmlFor="lead-email">Email<input id="lead-email" name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} autoComplete="email" className={field} /></label>
      <label className="block text-xs font-medium" htmlFor="lead-phone">Phone / WhatsApp<input id="lead-phone" name="phone" type="tel" value={phone} onChange={event => setPhone(event.target.value)} maxLength={40} autoComplete="tel" placeholder="Include country code" className={field} /></label>
      <label className="block text-xs font-medium" htmlFor="lead-project">Project details<textarea id="lead-project" name="project" required maxLength={3000} rows={3} className={field} placeholder="What would you like help with?" /></label>
      <label className="flex gap-2 text-xs leading-relaxed"><input type="checkbox" name="contact_permission" value="I agree to be contacted about my inquiry" required className="mt-1" /><span>I agree to Tayyaba contacting me about this inquiry. My details will be processed by FormSubmit to deliver the email.</span></label>
      {error && <p role="alert" className="text-sm">{error}</p>}
      <button type="submit" className="w-full rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-paper">Submit inquiry ↗</button>
      <p className="text-xs leading-relaxed">Continue in the secure submission tab to complete verification and see confirmation. Your chat transcript is not included.</p>
    </form>}
  </div>;
}

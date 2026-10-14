"use client";
import { useState } from "react";

const types = ["Website", "Online store", "AI & automation", "Support & fixes", "Other"];

export default function ChatContactForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("Website");
  const [contactMethod, setContactMethod] = useState("Email");
  const field = "mt-1.5 w-full rounded-lg border border-ink/25 bg-white px-3 py-2.5 text-base text-ink placeholder:text-ink/50 focus:outline focus:outline-2 focus:outline-ultra";
  return <div className="mt-5 border-t border-ink/15 pt-4">
    <button type="button" aria-expanded={open} aria-controls="chat-contact-form" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-xl bg-ink px-4 py-4 text-left text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra"><span><span className="block text-sm font-semibold">Let’s discuss your project</span><span className="mt-1 block text-xs text-paper/80">Leave your details for a personal follow-up</span></span><span aria-hidden="true" className="text-xl">{open ? "−" : "↗"}</span></button>
    {open && <form id="chat-contact-form" action="https://formsubmit.co/tkcreators01@gmail.com" method="POST" target="_blank" onSubmit={event => {
      if (!email.trim() && !phone.trim()) { event.preventDefault(); setError("Please enter an email address or phone number."); return; }
      if (contactMethod === "Email" && !email.trim()) { event.preventDefault(); setError("Enter your email address or choose phone / WhatsApp as your preferred contact method."); return; }
      if (contactMethod === "Phone / WhatsApp" && !phone.trim()) { event.preventDefault(); setError("Enter your phone number or choose email as your preferred contact method."); return; }
      if (phone.trim() && phone.replace(/\D/g, "").length < 7) { event.preventDefault(); setError("Please enter a valid phone number, including your country code."); return; }
      setError("");
    }} className="mt-4 space-y-5 rounded-xl border border-ink/15 bg-white/70 p-4">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-ultra">Project inquiry</p><p className="mt-2 font-display text-xl">A few details. A clearer start.</p><p className="mt-2 text-xs leading-relaxed">Tell Tayyaba what you need. Budget and timeline are optional, and estimates are confirmed after reviewing your requirements.</p></div>
      <input type="hidden" name="_subject" value="New portfolio project inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="project_type" value={projectType} />
      <fieldset><legend className="mb-2 text-xs font-semibold">What can I help you with?</legend><div className="flex flex-wrap gap-2">{types.map(type => <button key={type} type="button" aria-pressed={projectType === type} onClick={() => setProjectType(type)} className={`rounded-full border px-3 py-2 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-ultra ${projectType === type ? "border-ink bg-ink text-paper" : "border-ink/25 bg-white hover:border-ultra"}`}>{type}</button>)}</div></fieldset>
      <label className="block text-xs font-semibold" htmlFor="lead-name">Your name <span aria-hidden="true">*</span><input id="lead-name" name="name" required maxLength={100} autoComplete="name" placeholder="Full name" className={field} /></label>
      <fieldset><legend className="mb-2 text-xs font-semibold">How would you like to be contacted?</legend><div className="grid grid-cols-2 gap-2">{["Email", "Phone / WhatsApp"].map(method => <label key={method} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-xs ${contactMethod === method ? "border-ultra bg-lilac/30" : "border-ink/25 bg-white"}`}><input type="radio" name="preferred_contact" value={method} checked={contactMethod === method} onChange={() => { setContactMethod(method); setError(""); }} />{method}</label>)}</div></fieldset>
      <div className="space-y-3">
        <label className="block text-xs font-semibold" htmlFor="lead-email">Email {contactMethod === "Email" ? "*" : "(optional)"}<input id="lead-email" name="email" type="email" required={contactMethod === "Email"} value={email} onChange={event => setEmail(event.target.value)} maxLength={254} autoComplete="email" placeholder="you@company.com" className={field} /></label>
        <label className="block text-xs font-semibold" htmlFor="lead-phone">Phone / WhatsApp {contactMethod === "Phone / WhatsApp" ? "*" : "(optional)"}<input id="lead-phone" name="phone" type="tel" required={contactMethod === "Phone / WhatsApp"} value={phone} onChange={event => setPhone(event.target.value)} maxLength={40} autoComplete="tel" placeholder="Include country code" className={field} /></label>
      </div>
      <label className="block text-xs font-semibold" htmlFor="lead-site">Existing website (optional)<input id="lead-site" name="existing_website" maxLength={300} placeholder="Your domain, if you have one" className={field} /></label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-xs font-semibold" htmlFor="lead-budget">Budget (USD, optional)<select id="lead-budget" name="budget_usd" className={field} defaultValue="Not decided"><option>Not decided</option><option>Under $500</option><option>$500–$1,000</option><option>$1,000–$3,000</option><option>$3,000–$5,000</option><option>$5,000+</option></select></label>
        <label className="block text-xs font-semibold" htmlFor="lead-timeline">Timeline (optional)<select id="lead-timeline" name="desired_timeline" className={field} defaultValue="Flexible"><option>Flexible</option><option>As soon as possible</option><option>Within 2 weeks</option><option>Within a month</option><option>1–3 months</option></select></label>
      </div>
      <label className="block text-xs font-semibold" htmlFor="lead-project">What would you like to achieve? *<textarea id="lead-project" name="project_details" required maxLength={3000} rows={4} className={field} placeholder="Describe your goals, required features, or the issue you want solved." /></label>
      <label className="flex items-start gap-2 text-xs leading-relaxed"><input type="checkbox" name="contact_permission" value="I agree to be contacted about my inquiry" required className="mt-1" /><span>I agree to be contacted about this inquiry. FormSubmit processes these details to deliver the email. My chat transcript is not included.</span></label>
      {error && <p role="alert" className="rounded-lg border border-ink/25 p-3 text-sm">{error}</p>}
      <button type="submit" className="flex w-full items-center justify-between rounded-lg bg-ultra px-4 py-3.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra"><span>Send project inquiry</span><span aria-hidden="true">↗</span></button>
      <p className="text-xs leading-relaxed text-ink/75">Opens a verification tab. Complete that step to submit your inquiry and see confirmation.</p>
    </form>}
  </div>;
}

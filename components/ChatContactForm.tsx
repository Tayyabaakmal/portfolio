"use client";
import { useEffect, useState } from "react";

const countries = [
  ["PK", "Pakistan", "+92"], ["US", "United States", "+1"], ["CA", "Canada", "+1"],
  ["GB", "United Kingdom", "+44"], ["AE", "United Arab Emirates", "+971"], ["SA", "Saudi Arabia", "+966"],
  ["IN", "India", "+91"], ["BD", "Bangladesh", "+880"], ["AU", "Australia", "+61"], ["NZ", "New Zealand", "+64"],
  ["DE", "Germany", "+49"], ["FR", "France", "+33"], ["NL", "Netherlands", "+31"], ["CH", "Switzerland", "+41"],
  ["IT", "Italy", "+39"], ["ES", "Spain", "+34"], ["IE", "Ireland", "+353"], ["SG", "Singapore", "+65"],
  ["MY", "Malaysia", "+60"], ["ZA", "South Africa", "+27"], ["NG", "Nigeria", "+234"], ["KE", "Kenya", "+254"],
  ["QA", "Qatar", "+974"], ["KW", "Kuwait", "+965"], ["BH", "Bahrain", "+973"], ["OM", "Oman", "+968"],
  ["TR", "Turkey", "+90"], ["EG", "Egypt", "+20"], ["IL", "Israel", "+972"], ["CN", "China", "+86"],
  ["JP", "Japan", "+81"], ["KR", "South Korea", "+82"], ["BR", "Brazil", "+55"], ["MX", "Mexico", "+52"],
  ["PH", "Philippines", "+63"], ["ID", "Indonesia", "+62"], ["TH", "Thailand", "+66"], ["VN", "Vietnam", "+84"],
] as const;
const timeZoneCountries: Record<string, string> = {
  "Asia/Karachi": "PK", "Europe/London": "GB", "Asia/Dubai": "AE", "Asia/Riyadh": "SA",
  "Asia/Kolkata": "IN", "Asia/Calcutta": "IN", "Asia/Dhaka": "BD", "Pacific/Auckland": "NZ",
  "Europe/Berlin": "DE", "Europe/Paris": "FR", "Europe/Amsterdam": "NL", "Europe/Zurich": "CH",
  "Europe/Rome": "IT", "Europe/Madrid": "ES", "Europe/Dublin": "IE", "Asia/Singapore": "SG",
  "Asia/Kuala_Lumpur": "MY", "Africa/Johannesburg": "ZA", "Africa/Lagos": "NG", "Africa/Nairobi": "KE",
  "Asia/Qatar": "QA", "Asia/Kuwait": "KW", "Asia/Bahrain": "BH", "Asia/Muscat": "OM",
  "Europe/Istanbul": "TR", "Africa/Cairo": "EG", "Asia/Jerusalem": "IL", "Asia/Shanghai": "CN",
  "Asia/Tokyo": "JP", "Asia/Seoul": "KR", "America/Sao_Paulo": "BR", "America/Mexico_City": "MX",
  "Asia/Manila": "PH", "Asia/Jakarta": "ID", "Asia/Bangkok": "TH", "Asia/Ho_Chi_Minh": "VN",
  "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US", "America/Los_Angeles": "US",
  "America/Phoenix": "US", "America/Anchorage": "US", "Pacific/Honolulu": "US",
  "America/Toronto": "CA", "America/Vancouver": "CA", "America/Edmonton": "CA", "America/Halifax": "CA",
};
const types = ["Website", "Online store", "AI & automation", "Support & fixes", "Other"];

export default function ChatContactForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [dialCode, setDialCode] = useState("");
  useEffect(() => {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const detected = timeZoneCountries[zone] || (zone.startsWith("Australia/") ? "AU" : "");
      const match = countries.find(item => item[0] === detected);
      if (match) { setCountry(match[0]); setDialCode(match[2]); }
    } catch { /* Leave code unselected when the browser cannot provide a time zone. */ }
  }, []);
  const internationalPhone = phone.trim() ? (phone.trim().startsWith("+") ? phone.trim() : `${dialCode} ${phone.trim()}`) : "";
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
      if (phone.trim() && !phone.trim().startsWith("+") && !/^\+[1-9]\d{0,3}$/.test(dialCode)) { event.preventDefault(); setError("Select or enter your country calling code."); return; }
      const digits = internationalPhone.replace(/\D/g, "");
      if (phone.trim() && (digits.length < 8 || digits.length > 15)) { event.preventDefault(); setError("Please check your international phone number (8–15 digits including country code)."); return; }
      setError("");
    }} className="mt-4 space-y-5 rounded-xl border border-ink/15 bg-white/70 p-4">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-ultra">Project inquiry</p><p className="mt-2 font-display text-xl">A few details. A clearer start.</p><p className="mt-2 text-xs leading-relaxed">Tell Tayyaba what you need. Budget and timeline are optional, and estimates are confirmed after reviewing your requirements.</p></div>
      <input type="hidden" name="_subject" value="New portfolio project inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="phone" value={internationalPhone} />
      <input type="hidden" name="phone_country" value={countries.find(item => item[0] === country)?.[1] || "Other / manually entered"} />
      <input type="hidden" name="project_type" value={projectType} />
      <fieldset><legend className="mb-2 text-xs font-semibold">What can I help you with?</legend><div className="flex flex-wrap gap-2">{types.map(type => <button key={type} type="button" aria-pressed={projectType === type} onClick={() => setProjectType(type)} className={`rounded-full border px-3 py-2 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-ultra ${projectType === type ? "border-ink bg-ink text-paper" : "border-ink/25 bg-white hover:border-ultra"}`}>{type}</button>)}</div></fieldset>
      <label className="block text-xs font-semibold" htmlFor="lead-name">Your name <span aria-hidden="true">*</span><input id="lead-name" name="name" required maxLength={100} autoComplete="name" placeholder="Full name" className={field} /></label>
      <fieldset><legend className="mb-2 text-xs font-semibold">How would you like to be contacted?</legend><div className="grid grid-cols-2 gap-2">{["Email", "Phone / WhatsApp"].map(method => <label key={method} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-xs ${contactMethod === method ? "border-ultra bg-lilac/30" : "border-ink/25 bg-white"}`}><input type="radio" name="preferred_contact" value={method} checked={contactMethod === method} onChange={() => { setContactMethod(method); setError(""); }} />{method}</label>)}</div></fieldset>
      <div className="space-y-3">
        <label className="block text-xs font-semibold" htmlFor="lead-email">Email {contactMethod === "Email" ? "*" : "(optional)"}<input id="lead-email" name="email" type="email" required={contactMethod === "Email"} value={email} onChange={event => setEmail(event.target.value)} maxLength={254} autoComplete="email" placeholder="you@company.com" className={field} /></label>
        <fieldset><legend className="text-xs font-semibold">Phone / WhatsApp {contactMethod === "Phone / WhatsApp" ? "*" : "(optional)"}</legend>
          <label htmlFor="lead-country" className="sr-only">Phone country</label>
          <select id="lead-country" value={country} onChange={event => { const match = countries.find(item => item[0] === event.target.value); setCountry(event.target.value); setDialCode(match?.[2] || ""); }} className={field}><option value="">Select country / other</option>{countries.map(([code, name, dial]) => <option key={code} value={code}>{name} ({dial})</option>)}</select>
          <div className="flex gap-2"><label htmlFor="lead-dial-code" className="sr-only">Country calling code</label><input id="lead-dial-code" aria-label="Country calling code" type="tel" value={dialCode} onChange={event => { setDialCode(event.target.value.replace(/[^+0-9]/g, "")); setCountry(""); }} maxLength={5} placeholder="+code" autoComplete="tel-country-code" className={`${field} max-w-[6rem]`} /><label htmlFor="lead-phone" className="sr-only">Phone number</label><input id="lead-phone" type="tel" required={contactMethod === "Phone / WhatsApp"} value={phone} onChange={event => setPhone(event.target.value)} maxLength={40} autoComplete="tel-national" placeholder="Phone number" className={field} /></div>
          <p className="mt-2 text-xs font-normal leading-relaxed text-ink/75">Country code is suggested from your browser time zone. Please check it before submitting. You can also paste a full number beginning with +.</p>
        </fieldset>
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

"use client";
import { useEffect, useRef, useState } from "react";
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";

const countries = getCountries();
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const flag = (country: string) => String.fromCodePoint(...[...country].map(letter => 127397 + letter.charCodeAt(0)));
const timeZones: Record<string, CountryCode> = { "Asia/Karachi": "PK", "Asia/Dubai": "AE", "Asia/Riyadh": "SA", "Europe/London": "GB", "Asia/Kolkata": "IN", "Asia/Calcutta": "IN", "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US", "America/Los_Angeles": "US", "America/Toronto": "CA", "America/Vancouver": "CA", "Europe/Paris": "FR", "Europe/Berlin": "DE", "Europe/Amsterdam": "NL", "Asia/Singapore": "SG" };

type Props = { openRequest: number; onSubmitted: () => void };
export default function ChatContactForm({ openRequest, onSubmitted }: Props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<CountryCode>("PK");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sending = useRef(false);
  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localeCountry = navigator.language.split("-").pop()?.toUpperCase() as CountryCode;
    setCountry(timeZones[zone] || (zone.startsWith("Australia/") ? "AU" : countries.includes(localeCountry) ? localeCountry : "PK"));
  }, []);
  useEffect(() => { if (openRequest > 0) { setOpen(true); setSent(false); } }, [openRequest]);
  useEffect(() => { if (open) { firstField.current?.focus(); formRef.current?.scrollIntoView({ block: "nearest" }); } }, [open, openRequest]);
  const field = "mt-1 w-full rounded-lg border border-ink/25 bg-white px-3 py-2.5 text-base focus:outline focus:outline-2 focus:outline-ultra";
  return <div className="mt-4 border-t border-ink/15 pt-3">
    {open && <form ref={formRef} id="chat-contact-form" className="mt-3 space-y-3" onSubmit={async event => {
      event.preventDefault(); if (sending.current) return;
      if (!email.trim() && !phone.trim()) { setError("Please leave your email or phone number."); return; }
      const parsed = phone.trim() ? parsePhoneNumberFromString(phone.trim(), country) : undefined;
      if (phone.trim() && !parsed?.isPossible()) { setError("Please check your phone number and country code."); return; }
      const values = new FormData(event.currentTarget);
      const message = String(values.get("message") || "").trim();
      sending.current = true; setBusy(true); setError("");
      try {
        const response = await fetch("https://formsubmit.co/ajax/tkcreators01@gmail.com", {
          method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, signal: AbortSignal.timeout(20000),
          body: JSON.stringify({ email: email.trim(), phone: parsed?.number || "", message: message || "Please contact me about my project.", contact_permission: "Visitor consented to follow-up about this inquiry", _subject: "Portfolio request for human follow-up", _template: "table" }),
        });
        const result = await response.json();
        if (!response.ok || ![true, "true"].includes(result.success)) throw new Error("We could not submit your request. Please try again or use the direct contact links.");
        if (/activat|confirm.*email|check.*email|verify.*email/i.test(String(result.message || ""))) throw new Error("Email delivery is awaiting activation by Tayyaba. Please use the direct email or WhatsApp link for now.");
        setSent(true); setOpen(false); setEmail(""); setPhone(""); onSubmitted();
      } catch (failure) { setError(failure instanceof Error && failure.name !== "TimeoutError" ? failure.message : "The request timed out. Please try again."); }
      finally { sending.current = false; setBusy(false); }
    }}>
      <p className="text-xs leading-relaxed">Leave an email or phone number so Tayyaba can follow up personally. Either one is enough.</p>
      <label htmlFor="lead-email" className="block text-xs font-semibold">Email<input ref={firstField} id="lead-email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} placeholder="you@example.com" className={field} /></label>
      <fieldset><legend className="text-xs font-semibold">Phone / WhatsApp</legend><div className="mt-1 flex overflow-hidden rounded-lg border border-ink/25 bg-white focus-within:outline focus-within:outline-2 focus-within:outline-ultra">
        <label htmlFor="lead-country" className="sr-only">Country calling code</label><select id="lead-country" value={country} onChange={event => setCountry(event.target.value as CountryCode)} className="w-28 shrink-0 border-r border-ink/15 bg-white px-2 text-sm" aria-label="Country calling code">{[...countries].sort((a,b) => (countryNames.of(a)||a).localeCompare(countryNames.of(b)||b)).map(code => <option key={code} value={code}>{flag(code)} +{getCountryCallingCode(code)} {countryNames.of(code)}</option>)}</select>
        <label htmlFor="lead-phone" className="sr-only">Phone number</label><input id="lead-phone" type="tel" autoComplete="tel-national" value={phone} onChange={event => setPhone(event.target.value)} maxLength={40} placeholder="Phone number" className="min-w-0 flex-1 bg-white px-3 py-2.5 text-base focus:outline-none" />
      </div></fieldset>
      <label htmlFor="lead-message" className="block text-xs font-semibold">Message (optional)<textarea id="lead-message" name="message" maxLength={2000} rows={2} placeholder="Anything you’d like Tayyaba to know?" className={field} /></label>
      <label className="flex items-start gap-2 text-xs leading-relaxed"><input type="checkbox" required className="mt-1" /><span>I agree to be contacted about this inquiry. FormSubmit processes my details to deliver the email.</span></label>
      {error && <p role="alert" className="text-sm leading-relaxed">{error}</p>}
      <button disabled={busy} className="w-full rounded-lg bg-ultra px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Submitting…" : "Request human follow-up"}</button>
    </form>}
    {sent && <p role="status" className="mt-2 text-xs">Thanks! Your request has been submitted. Tayyaba will get back to you within 24 hours.</p>}
  </div>;
}

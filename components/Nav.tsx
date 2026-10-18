"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";
import { profile } from "@/data/profile";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector("main");
    const wasInert = main?.inert;
    if (main) main.inert = true;
    document.body.style.overflow = "hidden";
    document.body.dataset.mobileMenuOpen = "true";
    window.__lenis?.stop();
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const items = [toggle.current, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a[href]") || [])].filter((item): item is HTMLButtonElement | HTMLAnchorElement => !!item);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.mobileMenuOpen;
      if (main) main.inert = !!wasInert;
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
      toggle.current?.focus();
    };
  }, [open]);
  function closeMenu() { window.__lenis?.start(); setOpen(false); }

  return (
    <>
      <header className={`site-header fixed inset-x-0 top-0 ${open ? "z-[70]" : "z-50"} flex items-center justify-between px-5 py-5 text-white mix-blend-difference md:px-10`}>
        <TransitionLink href="/" className="display text-xl" aria-label={`${profile.name}, home`}>
          Tayyaba Akmal
        </TransitionLink>
        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-8">
          {links.map((l) => (
            <TransitionLink key={l.href} href={l.href} className="link-wipe text-[15px] font-medium">
              {l.label}
            </TransitionLink>
          ))}
          <a
            href={profile.contact.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-current px-4 py-2 text-[15px] font-medium"
          >
            Book a call
          </a>
        </nav>
        <button
          ref={toggle}
          type="button"
          className="min-h-11 min-w-11 text-[15px] font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <div
        ref={menu}
        id="mobile-menu"
        className={`mobile-navigation on-ink fixed inset-0 z-[60] flex flex-col justify-end overflow-y-auto bg-ink px-5 pb-12 pt-24 text-paper transition-[clip-path] duration-500 lg:hidden ${
          open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        {...(!open ? { inert: "" as unknown as boolean } : {})}
      >
        {links.map((l) => (
          <TransitionLink key={l.href} href={l.href} onClick={closeMenu} className="display py-2 text-[clamp(2rem,7vh,3.75rem)]">
            {l.label}
          </TransitionLink>
        ))}
        <a
          href={profile.contact.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="display py-2 text-[clamp(2rem,7vh,3.75rem)]"
        >
          Book a call
        </a>
      </div>
    </>
  );
}

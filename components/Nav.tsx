"use client";
import { useEffect, useState } from "react";
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
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-white mix-blend-difference md:px-10">
        <TransitionLink href="/" className="display text-xl" aria-label={`${profile.name}, home`}>
          Tayyaba Akmal
        </TransitionLink>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
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
          className="text-[15px] font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <div
        id="mobile-menu"
        className={`on-ink fixed inset-0 z-40 flex flex-col justify-end bg-ink px-5 pb-12 text-paper transition-[clip-path] duration-500 md:hidden ${
          open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        {...(!open ? { inert: "" as unknown as boolean } : {})}
      >
        {links.map((l) => (
          <TransitionLink key={l.href} href={l.href} className="display py-2 text-6xl">
            {l.label}
          </TransitionLink>
        ))}
        <a
          href={profile.contact.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="display py-2 text-6xl"
        >
          Book a call
        </a>
      </div>
    </>
  );
}

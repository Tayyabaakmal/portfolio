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
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      try {
        if (localStorage.getItem("portfolio-theme")) return;
      } catch {}
      document.documentElement.dataset.theme = scheme.matches
        ? "dark"
        : "light";
    };
    scheme.addEventListener("change", syncTheme);
    const media = window.matchMedia("(min-width: 1100px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => {
      media.removeEventListener("change", resize);
      scheme.removeEventListener("change", syncTheme);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const items =
        menu.current?.querySelectorAll<HTMLElement>("a[href], button");
      const first = items?.[0],
        last = items?.[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
      trigger.current?.focus();
    };
  }, [open]);
  function toggleTheme() {
    const theme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
  }
  return (
    <>
      <header className="site-nav">
        <div className="nav-inner section-wrap">
          <TransitionLink
            href="/"
            className="wordmark"
            aria-label={`${profile.name}, home`}
          >
            Tayyaba Akmal
          </TransitionLink>
          <nav aria-label="Primary" className="desktop-nav">
            {links.map((l) => (
              <TransitionLink key={l.href} href={l.href} className="nav-link">
                {l.label}
              </TransitionLink>
            ))}
            <a
              href={profile.contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-call"
            >
              Book a call <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Switch light or dark theme"
              title="Switch light or dark theme"
            >
              <span aria-hidden="true">◐</span>
            </button>
            <button
              ref={trigger}
              type="button"
              className="mobile-menu-trigger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              Menu <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div
          ref={menu}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="mobile-menu"
          data-lenis-prevent
        >
          <div className="mobile-menu-top">
            <span>Navigation</span>
            <button
              ref={close}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              Close ×
            </button>
          </div>
          <nav aria-label="Mobile">
            {links.map((l) => (
              <TransitionLink
                key={l.href}
                href={l.href}
                onClick={() => {
                  window.__lenis?.start();
                  setOpen(false);
                }}
              >
                {l.label}
                <span aria-hidden="true">↗</span>
              </TransitionLink>
            ))}
          </nav>
          <a
            href={profile.contact.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="action action-primary"
          >
            Book a call <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </>
  );
}

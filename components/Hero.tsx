"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./TransitionLink";
import { profile } from "@/data/profile";

const lines = ["Tayyaba", "Akmal"];
const ticker = profile.expertise.map((e) => e.title);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current!;
    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el.querySelectorAll("[data-fade]"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(chars, { yPercent: 115, rotate: 4, duration: 1.3, ease: "expo.out", stagger: 0.05, delay: 0.15 })
        .to("[data-fade]", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }, "-=0.7")
        .from("[data-ticker]", { opacity: 0, duration: 1 }, "-=0.4");

      // Services strip loops forever.
      gsap.to("[data-track]", { xPercent: -50, ease: "none", duration: 26, repeat: -1 });

      gsap.to("[data-drift]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    // Glow follows the pointer on fine-pointer devices.
    const glow = el.querySelector<HTMLElement>("[data-glow]");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        if (glow) {
          glow.style.setProperty("--x", `${e.clientX - r.left}px`);
          glow.style.setProperty("--y", `${e.clientY - r.top}px`);
        }
        chars.forEach((c) => {
          const cr = c.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (cr.left + cr.width / 2), e.clientY - (cr.top + cr.height / 2));
          const t = Math.max(0, 1 - d / (window.innerWidth * 0.22));
          c.style.fontVariationSettings = `"wght" ${Math.round(300 + 500 * t)}, "wdth" ${Math.round(80 + 20 * t)}`;
        });
      });
    };
    const onLeave = () => chars.forEach((c) => (c.style.fontVariationSettings = ""));
    if (fine) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    }

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={root}
      className="on-blue relative flex min-h-[100svh] flex-col overflow-hidden bg-ultra text-paper"
    >
      {/* Soft light that follows the cursor */}
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 70%) var(--y, 30%), rgba(201,198,255,0.22), transparent 60%)",
        }}
      />

      {/* Top label */}
      <div data-fade className="relative z-10 flex items-center justify-between px-5 pt-28 text-sm opacity-0 md:px-10 md:pt-32">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-lilac" />
          Web Developer &amp; AI Automation
        </span>
        <span className="hidden md:block">Since {profile.since}</span>
      </div>

      <div data-drift className="relative z-10 flex flex-1 flex-col justify-center px-5 md:px-10">
        <h1 aria-label={profile.name} className="display">
          {lines.map((line, i) => (
            <span
              key={line}
              aria-hidden
              className={`block overflow-hidden pb-[0.06em] text-[clamp(4rem,19vw,20rem)] ${i === 1 ? "md:pl-[14vw]" : ""}`}
            >
              {line.split("").map((ch, j) => (
                <span key={j} data-char className="vf inline-block" style={{ fontVariationSettings: '"wght" 300, "wdth" 80' }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p
            data-fade
            className="translate-y-4 text-[clamp(1.6rem,3.6vw,3.5rem)] font-semibold leading-[1.05] opacity-0 md:col-span-7"
          >
            {profile.title}
          </p>
          <div data-fade className="flex translate-y-4 flex-col gap-6 opacity-0 md:col-span-5 md:items-end">
            <p className="max-w-sm text-base leading-relaxed md:text-right md:text-lg">{profile.intro}</p>
            <div className="flex flex-wrap gap-3">
              <TransitionLink
                href="/#projects"
                className="rounded-full bg-paper px-6 py-3 font-medium text-ink transition-transform hover:-translate-y-0.5"
              >
                See projects
              </TransitionLink>
              <a
                href={profile.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-paper/60 px-6 py-3 font-medium transition-colors hover:bg-paper hover:text-ink"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services ticker */}
         <div data-ticker className="relative overflow-hidden border-y border-paper/25 bg-ink py-4">
        <div data-track className="flex w-max gap-10 whitespace-nowrap text-lg font-medium uppercase tracking-wide">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t}
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-lilac" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

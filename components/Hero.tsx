"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./TransitionLink";
import { profile } from "@/data/profile";

const lines = ["Tayyaba", "Akmal"];

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
        .from(chars, { yPercent: 115, rotate: 4, duration: 1.3, ease: "expo.out", stagger: 0.055, delay: 0.15 })
        .to("[data-fade]", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }, "-=0.7");

      gsap.to("[data-drift]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    let raf = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const reach = window.innerWidth * 0.22;
        chars.forEach((c) => {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          const t = Math.max(0, 1 - d / reach);
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
      className="on-blue relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ultra px-5 pb-8 pt-28 text-paper md:px-10 md:pb-10"
    >
      <div data-drift>
        <h1 aria-label={profile.name} className="display">
          {lines.map((line, i) => (
            <span
              key={line}
              aria-hidden
              className={`block overflow-hidden pb-[0.08em] text-[clamp(4.5rem,24vw,22rem)] ${i === 1 ? "md:pl-[18vw]" : ""}`}
            >
              {line.split("").map((ch, j) => (
                <span key={j} data-char className="vf inline-block" style={{ fontVariationSettings: '"wght" 300, "wdth" 80' }}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
        <p data-fade className="translate-y-4 text-[clamp(1.75rem,4vw,3.75rem)] font-semibold leading-[1.05] opacity-0 md:col-span-7">
          {profile.title}
        </p>
        <div data-fade className="flex translate-y-4 flex-col gap-6 opacity-0 md:col-span-5 md:items-end">
          <p className="max-w-sm md:text-right md:text-lg">{profile.intro}</p>
          <div className="flex flex-wrap gap-3">
            <TransitionLink href="/#projects" className="rounded-full bg-paper px-6 py-3 font-medium text-ink transition-transform hover:-translate-y-0.5">
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
    </section>
  );
}

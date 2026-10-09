"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";

const roles = ["Creative Web Developer", "AI Solutions Specialist", "E-commerce Developer", "Automation Expert"];
const headlineLines = ["Crafting Digital", "Experiences", "Beyond the", "Ordinary."];
const nameLetters = profile.name.split("");

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return; // everything stays visible, nothing moves

      // 1. Opening sequence: name rises out of its mask, then the headline, then the rest.
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-letter]", { yPercent: 120, rotate: 4, duration: 1.2, stagger: 0.045, delay: 0.2 })
        .from("[data-line] > span", { yPercent: 110, duration: 1.1, stagger: 0.12 }, "-=0.7")
        .from("[data-fade]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=0.8")
        .from("[data-float]", { opacity: 0, scale: 0.6, duration: 1.8, stagger: 0.2, ease: "power2.out" }, 0);

      // 2. Floating depth shapes drift gently forever.
      gsap.to("[data-float]", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(5, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.6, from: "random" },
      });

      // 3. Parallax on scroll.
      gsap.to("[data-parallax]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      // 4. Magnetic buttons (fine pointers only).
      if (fine) {
        el.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
          btn.addEventListener("pointermove", (e) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.3);
            yTo((e.clientY - r.top - r.height / 2) * 0.3);
          });
          btn.addEventListener("pointerleave", () => {
            xTo(0);
            yTo(0);
          });
        });
      }
    }, el);

    // 5. Rotating role line.
    let index = 0;
    const roleEl = el.querySelector<HTMLElement>("[data-role]");
    const timer = reduced || !roleEl
      ? undefined
      : window.setInterval(() => {
          gsap.to(roleEl, {
            yPercent: -110,
            opacity: 0,
            duration: 0.45,
            ease: "power2.in",
            onComplete: () => {
              index = (index + 1) % roles.length;
              roleEl.textContent = roles[index];
              gsap.fromTo(roleEl, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.out" });
            },
          });
        }, 2600);

    // 6. Pointer: moving light and depth layers.
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      el.querySelectorAll<HTMLElement>("[data-depth]").forEach((d) => {
        const k = Number(d.dataset.depth);
        gsap.to(d, { x: nx * k, y: ny * k, duration: 1.2, ease: "power3.out", overwrite: "auto" });
      });
    };
    if (fine && !reduced) el.addEventListener("pointermove", onMove);

    return () => {
      ctx.revert();
      if (timer) window.clearInterval(timer);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="on-blue relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ultra px-5 pb-10 pt-28 text-paper md:px-10"
    >
      {/* Light that follows the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(640px circle at var(--x, 70%) var(--y, 30%), rgba(201,198,255,0.2), transparent 60%)",
        }}
      />

      {/* Depth shapes */}
      <div aria-hidden data-parallax data-depth="40" className="pointer-events-none absolute -right-28 top-1/5 h-[30rem] w-[30rem]">
        <div data-float className="h-full w-full rounded-full bg-lilac/25 blur-3xl" />
      </div>
      <div aria-hidden data-depth="-30" className="pointer-events-none absolute -left-24 bottom-24 h-80 w-80">
        <div data-float className="h-full w-full rounded-full bg-paper/10 blur-2xl" />
      </div>

      {/* Top row */}
      <div data-fade className="relative flex items-center justify-between text-xs uppercase tracking-[0.25em] md:text-sm">
        <span>Hello, I&apos;m {profile.name}</span>
        <span className="hidden md:block">Working with clients since {profile.since}</span>
      </div>

      {/* Name wordmark, revealed letter by letter */}
      <div className="relative mt-10 md:mt-16" aria-hidden>
        <div className="display text-[clamp(3.2rem,11vw,11rem)] leading-none">
          {nameLetters.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-top">
              <span data-letter className="inline-block whitespace-pre">{ch}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Headline and details */}
      <div data-parallax className="relative mt-auto grid gap-12 pt-16 md:grid-cols-12 md:items-end">
        <h1 id="hero-title" className="display md:col-span-8 text-[clamp(2.8rem,7.2vw,7.5rem)] leading-[0.95]">
          {headlineLines.map((line, i) => (
            <span
              key={line}
              data-line
              className={`block overflow-hidden pb-[0.04em] ${i === 2 ? "md:pl-[10vw]" : i === 1 ? "md:pl-[4vw]" : ""}`}
            >
              <span className="inline-block">{line}</span>
            </span>
          ))}
        </h1>

        <div className="flex flex-col gap-8 md:col-span-4">
          <p data-fade className="flex items-center gap-3 text-lg font-medium">
            <span aria-hidden className="h-px w-8 bg-paper/60" />
            <span className="overflow-hidden">
              <span data-role className="inline-block">{roles[0]}</span>
            </span>
          </p>

          <p data-fade className="max-w-md text-base leading-relaxed md:text-lg">
            I combine creative development, intelligent technology, and innovative thinking to build exceptional websites,
            powerful e-commerce experiences, and AI-driven solutions.
          </p>

          <div data-fade className="flex flex-wrap gap-4">
            <a
              href="#projects"
              data-magnetic
              className="group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 font-medium text-ink"
            >
              Explore My Work
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              data-magnetic
              className="group inline-flex items-center gap-3 rounded-full border border-paper/60 px-7 py-4 font-medium transition-colors hover:bg-paper hover:text-ink"
            >
              Let&apos;s Work Together
              <span aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";

const roles = ["Creative Web Developer", "AI Solutions Specialist", "E-commerce Developer", "Automation Expert"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-intro]", { y: 20, opacity: 0, duration: 0.9, delay: 0.1 })
        .from("[data-line] > span", { yPercent: 105, duration: 1.2, stagger: 0.1 }, "-=0.5")
        .from("[data-accent]", { backgroundSize: "0% 100%", duration: 1, ease: "power3.inOut" }, "-=0.6")
        .from("[data-fade]", { y: 28, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=0.9")
        .from("[data-ticker]", { opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");

      gsap.to("[data-track]", { xPercent: -50, ease: "none", duration: 24, repeat: -1 });

      gsap.to("[data-headline]", {
        yPercent: -12,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-glow-deep]", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to("[data-orb]", {
        x: "random(-40, 40)",
        y: "random(-30, 30)",
        duration: "random(6, 9)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.8, from: "random" },
      });

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

    let index = 0;
    const roleEl = el.querySelector<HTMLElement>("[data-role]");
    const timer =
      reduced || !roleEl
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

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      el.querySelectorAll<HTMLElement>("[data-depth]").forEach((d) => {
        const k = Number(d.dataset.depth);
        gsap.to(d, { x: nx * k, y: ny * k, duration: 1.4, ease: "power3.out", overwrite: "auto" });
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
      className="on-blue relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ultra px-5 pt-28 text-paper md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px circle at var(--x, 70%) var(--y, 30%), rgba(201,198,255,0.22), transparent 60%)",
        }}
      />

      <div aria-hidden data-glow-deep className="pointer-events-none absolute inset-0">
        <div data-depth="40" className="absolute -right-32 top-16 h-[34rem] w-[34rem]">
          <div data-orb className="h-full w-full rounded-full bg-lilac/25 blur-3xl" />
        </div>
        <div data-depth="-30" className="absolute -left-28 bottom-40 h-96 w-96">
          <div data-orb className="h-full w-full rounded-full bg-paper/10 blur-2xl" />
        </div>
      </div>

      {/* Name appears once, here, folded into the intro line */}
      <div data-intro className="relative flex items-center justify-between border-b border-paper/20 pb-5 text-xs uppercase tracking-[0.25em] md:text-sm">
        <span>Hello, I&apos;m {profile.name}</span>
        <span className="hidden md:block">Working with clients since {profile.since}</span>
      </div>

      {/* Headline is the one dominant visual */}
      <div data-headline className="relative mt-auto grid gap-12 pb-16 pt-20 md:grid-cols-12 md:items-end">
        <h1 id="hero-title" className="display md:col-span-8 text-[clamp(3rem,8.5vw,9rem)] leading-[0.95]">
          <span data-line className="block overflow-hidden pb-[0.05em]">
            <span className="inline-block">Crafting Digital</span>
          </span>
          <span data-line className="block overflow-hidden pb-[0.05em] md:pl-[6vw]">
            <span
              data-accent
              className="inline-block bg-[linear-gradient(transparent_62%,rgba(201,198,255,0.55)_62%)] bg-no-repeat bg-[length:100%_100%]"
            >
              Experiences
            </span>
          </span>
          <span data-line className="block overflow-hidden pb-[0.05em] md:pl-[12vw]">
            <span className="inline-block">Beyond the Ordinary.</span>
          </span>
        </h1>

        <div className="flex flex-col gap-8 pb-2 md:col-span-4">
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

      <div data-ticker className="relative overflow-hidden border-y border-paper/25 py-4">
        <div data-track className="flex w-max gap-10 whitespace-nowrap text-lg font-medium uppercase tracking-wide">
          {[...roles, ...roles].map((t, i) => (
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

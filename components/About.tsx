"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="bg-paper px-5 py-24 md:px-10 md:py-40">
      <h2 className="sr-only">About</h2>
      <p data-statement className="display max-w-[18ch] text-[clamp(2.4rem,7.5vw,7.5rem)] [font-variation-settings:'wght'_500,'wdth'_92]">
        {profile.about.statement.split(" ").map((w, i) => (
          <span key={i} data-word className="mr-[0.22em] inline-block">{w}</span>
        ))}
      </p>
      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
        <p className="text-xl font-medium md:col-span-4 md:text-2xl">
          {profile.name}, working with international clients since {profile.since}.
        </p>
        <ul className="space-y-5 text-lg md:col-span-5 md:col-start-8">
          {profile.about.points.map((p) => (
            <li key={p} className="border-t border-ink/20 pt-4">{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

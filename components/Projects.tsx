"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";
import Cover from "./Cover";
import type { Project } from "@/data/projects";

type Props = { projects: Project[]; covers: Record<string, string | null> };

export default function Projects({ projects, covers }: Props) {
  const [active, setActive] = useState(0);
  const preview = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const node = preview.current!;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    gsap.set(node, { xPercent: -50, yPercent: -50, scale: 0.8, opacity: 0 });
    const x = gsap.quickTo(node, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(node, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => { x(e.clientX + 120); y(e.clientY); };
    const enter = () => gsap.to(node, { scale: 1, opacity: 1, duration: 0.45, ease: "expo.out" });
    const leave = () => gsap.to(node, { scale: 0.8, opacity: 0, duration: 0.35, ease: "power2.out" });
    const ul = list.current!;
    ul.addEventListener("pointermove", move);
    ul.addEventListener("pointerenter", enter);
    ul.addEventListener("pointerleave", leave);
    return () => { ul.removeEventListener("pointermove", move); ul.removeEventListener("pointerenter", enter); ul.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <section id="projects" className="px-5 py-24 md:px-10 md:py-40">
      <h2 className="display mb-12 text-[clamp(3.5rem,14vw,13rem)] md:mb-20">Projects</h2>

      <ul ref={list} className="group/list border-t border-ink/20">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-ink/20">
            <TransitionLink
              href={`/projects/${p.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group/row block py-5 transition-opacity md:py-7 md:group-hover/list:opacity-30 md:hover:!opacity-100 md:focus-visible:!opacity-100"
            >
              <div className="flex items-baseline justify-between gap-6">
                <span className="display vf text-[clamp(2rem,6.2vw,6rem)] [font-variation-settings:'wght'_350,'wdth'_85] group-hover/row:[font-variation-settings:'wght'_750,'wdth'_100] group-focus-visible/row:[font-variation-settings:'wght'_750,'wdth'_100]">
                  {p.name}
                </span>
                <span className="hidden shrink-0 text-right text-base md:block">
                  {p.category}
                  <span className="ml-6 tabular-nums opacity-50">{String(i + 1).padStart(2, "0")}</span>
                </span>
              </div>
              {/* Touch devices have no hover, so the cover sits inline. */}
              <div className="mt-4 hidden max-w-md [@media(hover:none)]:block">
                <Cover src={covers[p.slug]} name={p.name} color={p.color} sizes="90vw" hint={`public/projects/${p.slug}/cover.jpg`} />
                <p className="mt-2 text-sm">{p.description ?? p.category} · View project</p>
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>

      <div ref={preview} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 w-[min(32vw,520px)] shadow-2xl [@media(hover:none)]:hidden">
        <div className="relative">
          {projects.map((p, i) => (
            <div key={p.slug} className={`transition-opacity duration-300 ${i === active ? "relative opacity-100" : "absolute inset-0 opacity-0"}`}>
              <Cover src={covers[p.slug]} name={p.name} color={p.color} sizes="32vw" hint={`public/projects/${p.slug}/cover.jpg`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

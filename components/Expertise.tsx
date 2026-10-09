"use client";
import { useState } from "react";
import { profile } from "@/data/profile";

export default function Expertise() {
  const [open, setOpen] = useState(0);
  return (
    <section id="expertise" className="on-ink bg-ink px-5 py-24 text-paper md:px-10 md:py-40">
      <h2 className="display mb-12 text-[clamp(3.5rem,14vw,13rem)] md:mb-20">Expertise</h2>
      <div className="border-t border-paper/25">
        {profile.expertise.map((e, i) => {
          const isOpen = open === i;
          return (
            <div key={e.title} className="border-b border-paper/25">
              <h3>
                <button
                  className="flex w-full items-baseline gap-4 py-6 text-left md:gap-10 md:py-8"
                  aria-expanded={isOpen}
                  aria-controls={`exp-${i}`}
                  onClick={() => setOpen(i)}
                  onPointerEnter={(ev) => ev.pointerType === "mouse" && setOpen(i)}
                >
                  <span className="w-8 shrink-0 text-lg tabular-nums opacity-60 md:w-16">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`display vf text-[clamp(2rem,6vw,5.5rem)] ${isOpen ? "[font-variation-settings:'wght'_750,'wdth'_100]" : "[font-variation-settings:'wght'_300,'wdth'_82] opacity-60"}`}>{e.title}</span>
                </button>
              </h3>
              <div id={`exp-${i}`} role="region" aria-label={e.title} className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-10 pl-12 md:grid-cols-12 md:pl-[6.5rem]">
                    <p className="max-w-sm text-xl md:col-span-5">{e.summary}</p>
                    <ul className="flex flex-wrap gap-2 md:col-span-7">
                      {e.items.map((it) => (<li key={it} className="rounded-full border border-paper/40 px-4 py-2 text-[15px]">{it}</li>))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

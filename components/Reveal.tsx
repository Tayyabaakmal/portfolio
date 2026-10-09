"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Image wipe: the frame opens upward while the picture settles from a slight zoom. */
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(frame.current, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: frame.current, start: "top 85%", once: true } });
      gsap.fromTo(inner.current, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: frame.current, start: "top 85%", once: true } });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={frame} className={className}>
      <div ref={inner}>{children}</div>
    </div>
  );
}

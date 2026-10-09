"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global { interface Window { __lenis?: Lenis } }

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = undefined; };
  }, []);
  return null;
}

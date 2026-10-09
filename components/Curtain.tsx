"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { curtain } from "@/lib/transition";

export default function Curtain() {
  const el = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const covered = useRef(false);

  useEffect(() => {
    const node = el.current!;
    gsap.set(node, { scaleY: 0, transformOrigin: "50% 100%" });
    curtain.cover = () =>
      new Promise<void>((resolve) => {
        covered.current = true;
        gsap.set(node, { transformOrigin: "50% 100%" });
        gsap.to(node, { scaleY: 1, duration: 0.6, ease: "expo.inOut", onComplete: resolve });
        window.setTimeout(() => curtain.reveal?.(), 3000); // safety net
      });
    curtain.reveal = () => {
      if (!covered.current) return;
      covered.current = false;
      gsap.set(node, { transformOrigin: "50% 0%" });
      gsap.to(node, { scaleY: 0, duration: 0.7, ease: "expo.inOut", delay: 0.1 });
    };
    return () => { curtain.cover = undefined; curtain.reveal = undefined; };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (window.__lenis) window.__lenis.scrollTo(hash || 0, { immediate: true });
    else if (!hash) window.scrollTo(0, 0);
    curtain.reveal?.();
  }, [pathname]);

  return <div ref={el} aria-hidden className="pointer-events-none fixed inset-0 z-[100] bg-ultra" style={{ transform: "scaleY(0)" }} />;
}

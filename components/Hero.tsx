"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";
import { profile } from "@/data/profile";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-copy]", {
        y: 28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "all",
      });
      gsap.from("[data-hero-art]", {
        y: 24,
        opacity: 0,
        rotate: -5,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "all",
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={root}
      className="hero section-wrap"
      aria-labelledby="hero-heading"
    >
      <div className="hero-copy">
        <p data-hero-copy className="eyebrow">
          Independent web developer & AI specialist
        </p>
        <h1 data-hero-copy id="hero-heading" className="hero-heading">
          Better websites.<span>Smarter business.</span>
        </h1>
        <p data-hero-copy className="hero-intro">
          I design and build websites, online stores and AI automations that
          make running your business easier.
        </p>
        <div data-hero-copy className="button-row">
          <TransitionLink href="/#projects" className="action action-primary">
            See projects <span aria-hidden="true">↗</span>
          </TransitionLink>
          <a
            href={profile.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="action action-secondary"
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div data-hero-art className="hero-art">
        <Image
          src="/images/blue-silver-sculpture.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 43vw, (min-width: 768px) 40vw, 72vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}

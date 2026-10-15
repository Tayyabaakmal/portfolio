"use client";
import { useState } from "react";
import { profile } from "@/data/profile";
import TransitionLink from "./TransitionLink";
const descriptions = [
  "A new website, a thoughtful redesign, or a technical problem that needs solving. Built around how your business works.",
  "A store that makes products easy to discover and shopping easy to finish, with the right payments, shipping and integrations.",
  "Useful AI assistants that answer questions, help visitors and turn conversations into clear next steps for your team.",
  "Connect your website, CRM and everyday tools so leads, follow-ups and information move without the manual work.",
];
export default function Expertise() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="expertise"
      className="services-section"
      aria-labelledby="services-heading"
    >
      <div className="section-wrap services-layout">
        <div className="services-heading">
          <h2 id="services-heading">
            Good ideas.
            <br />
            Built properly.
          </h2>
          <p>From the website people see to the systems working behind it.</p>
          <TransitionLink href="/#contact" className="text-link">
            Start a conversation <span aria-hidden="true">↗</span>
          </TransitionLink>
        </div>
        <div className="service-list">
          {profile.expertise.map((e, i) => (
            <div
              key={e.title}
              className={`service-item ${open === i ? "is-open" : ""}`}
            >
              <h3>
                <button
                  type="button"
                  id={`service-trigger-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`service-panel-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{e.title}</span>
                  <span aria-hidden="true" className="service-toggle">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={`service-panel-${i}`}
                role="region"
                aria-labelledby={`service-trigger-${i}`}
                hidden={open !== i}
              >
                <p>{descriptions[i]}</p>
                <ul>
                  {e.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

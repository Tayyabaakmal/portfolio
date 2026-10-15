"use client";
import { useState } from "react";
import TransitionLink from "./TransitionLink";
import Cover from "./Cover";
import Reveal from "./Reveal";
import type { Project } from "@/data/projects";

type Props = { projects: Project[]; covers: Record<string, string | null> };
const featuredSlugs = [
  "mediamovez",
  "mediolie",
  "poseidon-offshore-energy",
  "usports-nation",
];
const filters = ["All work", "Business websites", "Online stores"] as const;
export default function Projects({ projects, covers }: Props) {
  const [filter, setFilter] = useState<string>("All work");
  const featured = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => !!p);
  const visible = featured.filter(
    (p) =>
      filter === "All work" ||
      (filter === "Online stores"
        ? ["mediolie", "usports-nation"].includes(p.slug)
        : !["mediolie", "usports-nation"].includes(p.slug)),
  );
  const more = projects.filter((p) => !featuredSlugs.includes(p.slug));
  return (
    <section
      id="projects"
      className="section-wrap work-section"
      aria-labelledby="work-heading"
    >
      <div className="section-heading">
        <h2 id="work-heading">
          A closer look
          <br />
          at my work<span className="accent">.</span>
        </h2>
        <p>
          Real businesses. Different challenges. Websites designed and developed
          with care.
        </p>
      </div>
      <div
        className="work-filters"
        role="group"
        aria-label="Filter featured projects"
      >
        {filters.map((label) => (
          <button
            type="button"
            key={label}
            aria-pressed={filter === label}
            onClick={() => setFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite" aria-atomic="true">
        {visible.map((p) => (
          <article key={p.slug} className="project-card">
            <TransitionLink
              href={`/projects/${p.slug}`}
              className="project-link"
              aria-label={`View ${p.name} project`}
            >
              <Reveal className={`project-image project-image-${p.slug}`}>
                <div className="project-browser">
                  <div className="browser-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span className="browser-domain">
                      {new URL(p.url).hostname}
                    </span>
                  </div>
                  <Cover
                    src={covers[p.slug]}
                    name={p.name}
                    color={p.color}
                    aspect="aspect-[16/10]"
                    sizes="(min-width: 1440px) 600px, (min-width: 768px) 44vw, 90vw"
                  />
                </div>
              </Reveal>
              <div className="project-caption">
                <div>
                  <p className="project-category">{p.category}</p>
                  <h3>{p.name}</h3>
                </div>
                <span className="project-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </TransitionLink>
            <p className="project-description">{p.description}</p>
          </article>
        ))}
      </div>
      <details className="more-projects">
        <summary>
          Explore more projects <span>({more.length})</span>
          <span aria-hidden="true">+</span>
        </summary>
        <ul>
          {more.map((p) => (
            <li key={p.slug}>
              <TransitionLink href={`/projects/${p.slug}`}>
                <span>{p.name}</span>
                <span className="more-category">{p.category}</span>
                <span aria-hidden="true">↗</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

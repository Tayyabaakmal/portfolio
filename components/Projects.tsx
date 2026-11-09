"use client";

import TransitionLink from "./TransitionLink";
import Cover from "./Cover";
import type { Project } from "@/data/projects";

type Props = { projects: Project[]; covers: Record<string, string | null> };

const caseStudySlugs = ["the-carrot-cartel", "poseidon-offshore-energy", "tat-ming"];

function Feature({
  project,
  cover,
  number,
  size,
}: {
  project: Project;
  cover: string | null;
  number: number;
  size: "large" | "small";
}) {
  const large = size === "large";

  return (
    <article className={large ? "lg:col-span-7" : "lg:col-span-5"}>
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ultra"
      >
        <div
          className={`relative overflow-hidden bg-paper p-3 transition-colors duration-500 group-hover:bg-white md:p-5 ${large ? "aspect-[1.16/1]" : "aspect-[1.08/1]"}`}
          style={{ backgroundColor: `${project.color}12` }}
        >
          <div className="h-full w-full overflow-hidden">
            <Cover
              src={cover}
              name={project.name}
              color={project.color}
              sizes={large ? "(min-width:1024px) 55vw, 100vw" : "(min-width:1024px) 40vw, 100vw"}
              aspect="h-full w-full"
              fit="contain"
              hint={`public/projects/${project.slug}/cover.jpg`}
            />
          </div>
          <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-paper text-sm text-ink transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-ultra group-hover:text-white md:right-7 md:top-7">
            ↗
          </span>
        </div>
      </TransitionLink>

      <div className="mt-5 flex items-start justify-between gap-4 border-t border-ink/20 pt-4">
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.17em] opacity-55">
            {String(number).padStart(2, "0")} <span className="mx-2 opacity-50">/</span> {project.category}
          </p>
          <TransitionLink href={`/projects/${project.slug}`} className="group/title">
            <h3 className={`display leading-[0.95] transition-colors group-hover/title:text-ultra ${large ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>
              {project.name}
            </h3>
          </TransitionLink>
        </div>
        <span className="pt-1 text-right text-xs uppercase tracking-[0.12em] opacity-45">
          Full case<br />study
        </span>
      </div>
    </article>
  );
}

function ArchiveRow({ project, number }: { project: Project; number: number }) {
  return (
    <article className="group border-t border-ink/20">
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="grid min-h-20 gap-2 py-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra md:grid-cols-[3rem_1fr_14rem_2rem] md:items-center md:gap-5 md:py-5"
      >
        <span className="text-xs tabular-nums opacity-45">{String(number).padStart(2, "0")}</span>
        <span className="display text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ultra md:text-3xl">{project.name}</span>
        <span className="text-sm opacity-55">{project.category}</span>
        <span aria-hidden="true" className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
      </TransitionLink>
    </article>
  );
}

export default function Projects({ projects, covers }: Props) {
  const featured = caseStudySlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const archive = projects.filter((project) => !caseStudySlugs.includes(project.slug));

  return (
    <section id="projects" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mb-12 flex items-center justify-between border-y border-ink/20 py-3 text-[11px] font-medium uppercase tracking-[0.16em] md:mb-16">
        <span>Selected work <span className="mx-2 opacity-40">/</span> Portfolio</span>
        <span>{String(projects.length).padStart(2, "0")} projects <span className="ml-2 opacity-40">2026</span></span>
      </div>

      <header className="mb-14 grid gap-7 md:mb-24 md:grid-cols-12 md:items-end">
        <h2 className="display text-[clamp(4.5rem,15vw,14rem)] leading-[0.72] tracking-[-0.065em] md:col-span-8">
          Projects<span className="text-ultra">.</span>
        </h2>
        <p className="max-w-sm text-base leading-relaxed md:col-span-4 md:justify-self-end md:pb-1 md:text-lg">
          Websites and digital experiences, made with care for the people and brands behind them.
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between border-b border-ink/20 pb-3 text-[11px] font-medium uppercase tracking-[0.16em]">
        <span>Featured case studies</span>
        <span>01 — {String(featured.length).padStart(2, "0")}</span>
      </div>

      <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12 lg:gap-y-24">
        {featured.map((project, index) => (
          <Feature
            key={project.slug}
            project={project}
            cover={covers[project.slug]}
            number={projects.findIndex((item) => item.slug === project.slug) + 1}
            size={index === 0 ? "large" : "small"}
          />
        ))}
      </div>

      {archive.length > 0 && (
        <div className="mt-24 md:mt-36">
          <div className="mb-8 flex items-end justify-between border-b border-ink/20 pb-4">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] opacity-55">The archive</p>
              <h3 className="display text-4xl leading-none md:text-6xl">More work</h3>
            </div>
            <span className="text-xs tabular-nums opacity-50">{String(archive.length).padStart(2, "0")} projects</span>
          </div>
          <div className="grid md:grid-cols-2 md:gap-x-10">
            {archive.map((project) => (
              <ArchiveRow
                key={project.slug}
                project={project}
                number={projects.findIndex((item) => item.slug === project.slug) + 1}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

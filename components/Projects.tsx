"use client";

import TransitionLink from "./TransitionLink";
import Cover from "./Cover";
import type { Project } from "@/data/projects";

type Props = { projects: Project[]; covers: Record<string, string | null> };

const featuredSlugs = ["the-carrot-cartel", "poseidon-offshore-energy", "tat-ming"];

const projectLabels: Record<string, string> = {
  "the-carrot-cartel": "Brand website · Design & development",
  "poseidon-offshore-energy": "Offshore engineering · 24-section case study",
  "tat-ming": "Wallcoverings & interiors · 25-section case study",
};

function FeaturedProject({
  project,
  cover,
  number,
  reverse,
}: {
  project: Project;
  cover: string | null;
  number: number;
  reverse: boolean;
}) {
  const pdfUrl = `/projects/${project.slug}/case-study.pdf`;

  return (
    <article className="grid items-center gap-7 border-t border-paper/15 py-9 md:gap-10 md:py-14 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <TransitionLink
          href={`/projects/${project.slug}`}
          aria-label={`Read the ${project.name} case study`}
          className="group block overflow-hidden rounded-[3px] border border-paper/10 bg-paper/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
        >
          <Cover
            src={cover}
            name={project.name}
            color={project.color}
            sizes="(min-width:1024px) 58vw, 100vw"
            aspect="aspect-[4/3]"
            fit="contain"
            hint={`public/projects/${project.slug}/cover.jpg`}
          />
        </TransitionLink>
      </div>

      <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <p className="mb-5 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em] text-paper/60">
          <span className="display text-5xl leading-none text-paper/30 md:text-6xl">{String(number).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-ultra" />
          <span>{projectLabels[project.slug] ?? project.category}</span>
        </p>

        <TransitionLink href={`/projects/${project.slug}`} className="group/title">
          <h3 className="display max-w-xl text-4xl leading-[0.92] text-paper transition-colors group-hover/title:text-ultra md:text-5xl xl:text-6xl">
            {project.name}
          </h3>
        </TransitionLink>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/65 md:text-lg">
          {project.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ultra px-5 text-xs font-medium uppercase tracking-[0.13em] text-paper transition-colors hover:bg-paper hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            View full case study <span aria-hidden="true">↗</span>
          </a>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="link-wipe inline-flex min-h-10 items-center gap-2 text-xs font-medium uppercase tracking-[0.13em] text-paper/75 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            View live website <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function ArchiveLink({ project, number }: { project: Project; number: number }) {
  return (
    <article className="border-t border-paper/15">
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="group grid min-h-20 grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:grid-cols-[3rem_1fr_14rem_2rem] md:gap-5 md:py-5"
      >
        <span className="text-xs tabular-nums text-paper/40">{String(number).padStart(2, "0")}</span>
        <span className="display text-xl leading-tight text-paper transition-colors group-hover:text-ultra md:text-2xl">{project.name}</span>
        <span className="hidden text-xs uppercase tracking-[0.1em] text-paper/50 md:block">{project.category}</span>
        <span aria-hidden="true" className="text-lg text-paper/55 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
      </TransitionLink>
    </article>
  );
}

export default function Projects({ projects, covers }: Props) {
  const featured = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
  const archive = projects.filter((project) => !featuredSlugs.includes(project.slug));

  return (
    <section id="projects" className="on-ink bg-ink px-5 py-24 text-paper md:px-10 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 flex items-center justify-between border-y border-paper/15 py-3 text-[11px] font-medium uppercase tracking-[0.17em] md:mb-20">
          <span>Selected work <span className="mx-2 text-paper/35">/</span> {String(projects.length).padStart(2, "0")} projects</span>
          <span>Websites <span className="mx-2 text-paper/35">·</span> Digital experiences</span>
        </div>

        <header className="mb-16 max-w-5xl md:mb-24">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.17em] text-ultra">Designed around the work</p>
          <h2 className="display max-w-5xl text-[clamp(3.5rem,10vw,9rem)] leading-[0.82] tracking-[-0.055em] text-paper">
            Digital work,<br className="hidden sm:block" /> made for people.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/60 md:text-lg">
            A selection of websites and online experiences for brands, retailers and service businesses.
          </p>
        </header>

        <div className="mb-7 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-paper/55">
          <span>Featured case studies</span>
          <span>01 <span className="mx-1 text-paper/35">—</span> {String(featured.length).padStart(2, "0")}</span>
        </div>

        <div>
          {featured.map((project, index) => (
            <FeaturedProject
              key={project.slug}
              project={project}
              cover={covers[project.slug]}
              number={index + 1}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        {archive.length > 0 && (
          <div className="mt-20 md:mt-28">
            <div className="mb-5 flex items-end justify-between border-b border-paper/15 pb-4">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-ultra">Also in the portfolio</p>
                <h3 className="display text-3xl leading-none text-paper md:text-5xl">More selected work</h3>
              </div>
              <span className="text-xs tabular-nums text-paper/45">{String(archive.length).padStart(2, "0")} projects</span>
            </div>
            <div className="grid gap-x-10 md:grid-cols-2">
              {archive.map((project, index) => (
                <ArchiveLink key={project.slug} project={project} number={featured.length + index + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

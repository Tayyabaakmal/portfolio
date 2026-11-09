"use client";

import { useMemo, useState } from "react";
import TransitionLink from "./TransitionLink";
import Cover from "./Cover";
import type { Project } from "@/data/projects";

type Filter = "all" | "commerce" | "business" | "engineering";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "commerce", label: "Commerce" },
  { id: "business", label: "Business & content" },
  { id: "engineering", label: "Engineering" },
];

const commerceCategories = new Set([
  "Brand website",
  "Organic products",
  "Watch retail",
  "Online shop",
  "Wallcoverings and interiors",
]);
const engineeringCategories = new Set(["Offshore engineering"]);

function matchesFilter(project: Project, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "commerce") return commerceCategories.has(project.category);
  if (filter === "engineering") return engineeringCategories.has(project.category);
  return !commerceCategories.has(project.category) && !engineeringCategories.has(project.category);
}

function ProjectFeature({
  project,
  cover,
  index,
  variant,
}: {
  project: Project;
  cover: string | null;
  index: number;
  variant: "primary" | "secondary";
}) {
  const primary = variant === "primary";

  return (
    <article className={primary ? "lg:col-span-7" : "lg:col-span-5 lg:mt-24"}>
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ultra"
      >
        <div className="relative overflow-hidden border border-ink/10 bg-paper">
          <Cover
            src={cover}
            name={project.name}
            color={project.color}
            sizes={primary ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 42vw, 100vw"}
            aspect="aspect-[4/3]"
            fit="contain"
            hint={`public/projects/${project.slug}/cover.jpg`}
          />
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-ink">
            {project.category}
          </span>
          {project.slug === "the-carrot-cartel" && (
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/90 px-3 py-1.5 text-xs font-medium text-paper">
              Complete 25-slide case study
            </span>
          )}
        </div>
      </TransitionLink>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] opacity-50">
            {String(index).padStart(2, "0")} / Selected project
          </p>
          <TransitionLink href={`/projects/${project.slug}`} className="group">
            <h3 className={`display leading-[0.94] transition-colors group-hover:text-ultra ${primary ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"}`}>
              {project.name}
            </h3>
          </TransitionLink>
          <p className="mt-4 max-w-xl text-base leading-relaxed md:text-lg">{project.description}</p>
        </div>
        <span aria-hidden="true" className="mt-8 hidden text-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:block">
          ↗
        </span>
      </div>
    </article>
  );
}

function ProjectIndexRow({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group border-t border-ink/20 py-5 md:py-6">
      <TransitionLink
        href={`/projects/${project.slug}`}
        className="grid gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ultra md:grid-cols-12 md:items-baseline md:gap-4"
      >
        <span className="text-sm tabular-nums opacity-45 md:col-span-1">{String(index).padStart(2, "0")}</span>
        <span className="display text-3xl leading-none transition-colors group-hover:text-ultra md:col-span-5 md:text-4xl">{project.name}</span>
        <span className="text-sm md:col-span-2">{project.category}</span>
        <span className="text-sm leading-relaxed opacity-65 md:col-span-3">{project.description}</span>
        <span aria-hidden="true" className="hidden text-xl transition-transform group-hover:translate-x-1 md:col-span-1 md:block">↗</span>
      </TransitionLink>
    </article>
  );
}

type Props = { projects: Project[]; covers: Record<string, string | null> };

export default function Projects({ projects, covers }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => projects.filter((project) => matchesFilter(project, filter)), [projects, filter]);

  const showEditorial = filter === "all";
  const featured = showEditorial ? visible.find((project) => project.slug === "the-carrot-cartel") : undefined;
  const secondarySlugs = new Set(["poseidon-offshore-energy", "tat-ming"]);
  const secondary = featured ? visible.filter((project) => secondarySlugs.has(project.slug)) : [];
  const featuredSlugs = new Set([featured?.slug, ...secondary.map((project) => project.slug)]);
  const indexProjects = featured ? visible.filter((project) => !featuredSlugs.has(project.slug)) : visible;

  return (
    <section id="projects" className="px-5 py-24 md:px-10 md:py-40">
      <div className="mb-10 flex items-center justify-between border-b border-ink/20 pb-4 text-xs font-medium uppercase tracking-[0.16em] md:mb-14">
        <span>Selected work / 2026</span>
        <span>{String(projects.length).padStart(2, "0")} projects</span>
      </div>

      <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
        <h2 className="display text-[clamp(4rem,14vw,13rem)] leading-[0.78] md:col-span-8">Projects</h2>
        <p className="max-w-sm text-lg leading-relaxed md:col-span-4 md:justify-self-end">
          A selection of websites and digital experiences for brands, shops and service businesses.
        </p>
      </header>

      <nav aria-label="Filter projects" className="mb-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-ink/20 pb-4">
        {filters.map((item) => {
          const count = projects.filter((project) => matchesFilter(project, item.id)).length;
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              className={`py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra ${active ? "text-ultra" : "opacity-55 hover:opacity-100"}`}
            >
              {item.label} <span className="ml-1 tabular-nums opacity-55">{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </nav>

      {featured && (
        <>
          <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
            <ProjectFeature
              project={featured}
              cover={covers[featured.slug]}
              index={projects.findIndex((p) => p.slug === featured.slug) + 1}
              variant="primary"
            />
            {secondary.map((project) => (
              <ProjectFeature
                key={project.slug}
                project={project}
                cover={covers[project.slug]}
                index={projects.findIndex((p) => p.slug === project.slug) + 1}
                variant="secondary"
              />
            ))}
          </div>
          {indexProjects.length > 0 && (
            <div className="mt-24">
              <div className="mb-3 flex items-end justify-between">
                <h3 className="display text-3xl md:text-4xl">More projects</h3>
                <span className="text-xs uppercase tracking-[0.14em] opacity-50">Selected index</span>
              </div>
              {indexProjects.map((project) => (
                <ProjectIndexRow
                  key={project.slug}
                  project={project}
                  index={projects.findIndex((p) => p.slug === project.slug) + 1}
                />
              ))}
            </div>
          )}
        </>
      )}

      {!featured && (
        <div>
          <div className="mb-3 flex items-end justify-between">
            <h3 className="display text-3xl md:text-4xl">{filters.find((item) => item.id === filter)?.label}</h3>
            <span className="text-xs uppercase tracking-[0.14em] opacity-50">{String(visible.length).padStart(2, "0")} projects</span>
          </div>
          {visible.map((project) => (
            <ProjectIndexRow
              key={project.slug}
              project={project}
              index={projects.findIndex((p) => p.slug === project.slug) + 1}
            />
          ))}
          {visible.length === 0 && (
            <p role="status" className="border-t border-ink/20 py-8 text-lg">No projects match this category yet.</p>
          )}
        </div>
      )}
    </section>
  );
}

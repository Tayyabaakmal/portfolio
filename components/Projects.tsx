"use client";

import { useMemo, useState } from "react";
import TransitionLink from "./TransitionLink";
import Cover from "./Cover";
import type { Project } from "@/data/projects";

type Filter = "all" | "commerce" | "business" | "engineering";
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "commerce", label: "Commerce & retail" },
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

function ProjectCard({
  project,
  cover,
  index,
  variant = "standard",
}: {
  project: Project;
  cover: string | null;
  index: number;
  variant?: "featured" | "compact" | "standard";
}) {
  const featured = variant === "featured";
  const compact = variant === "compact";

  return (
    <article className="min-w-0">
      <TransitionLink href={\`/projects/\${project.slug}\`} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ultra">
        <div className="relative overflow-hidden">
          <Cover
            src={cover}
            name={project.name}
            color={project.color}
            sizes={featured ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 33vw, 100vw"}
            aspect="aspect-[4/3]"
            fit="contain"
            hint={\`public/projects/\${project.slug}/cover.jpg\`}
          />
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-ink backdrop-blur-sm">
            {project.category}
          </span>
          {project.slug === "the-carrot-cartel" && (
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/90 px-3 py-1.5 text-xs font-medium text-paper">
              Full 25-slide case study
            </span>
          )}
        </div>

        <div className={compact ? "pt-4" : "pt-5"}>
          <div className="flex items-start justify-between gap-4">
            <h3 className={\`display leading-[0.98] \${featured ? "text-4xl md:text-6xl" : compact ? "text-3xl md:text-4xl" : "text-3xl md:text-4xl"}\`}>
              {project.name}
            </h3>
            <span aria-hidden="true" className="mt-1 text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </div>
          <p className={\`mt-3 max-w-xl text-base leading-relaxed \${compact ? "line-clamp-2" : "line-clamp-3"}\`}>
            {project.description}
          </p>
          {!compact && (
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.1em]">
              View case study <span aria-hidden="true">↗</span>
              <span className="ml-3 tabular-nums opacity-40">{String(index).padStart(2, "0")}</span>
            </p>
          )}
        </div>
      </TransitionLink>
    </article>
  );
}

type Props = { projects: Project[]; covers: Record<string, string | null> };

export default function Projects({ projects, covers }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => projects.filter((project) => matchesFilter(project, filter)), [projects, filter]);
  const featured = filter === "all" ? visible.find((project) => project.slug === "the-carrot-cartel") : undefined;
  const sideSlugs = new Set(["poseidon-offshore-energy", "tat-ming"]);
  const sideProjects = featured ? visible.filter((project) => sideSlugs.has(project.slug)) : [];
  const featuredSlugs = new Set([featured?.slug, ...sideProjects.map((project) => project.slug)]);
  const remaining = featured ? visible.filter((project) => !featuredSlugs.has(project.slug)) : visible;

  return (
    <section id="projects" className="px-5 py-24 md:px-10 md:py-40">
      <header className="mb-10 flex flex-col justify-between gap-6 border-b border-ink/20 pb-8 md:mb-12 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em]">Selected work</p>
          <h2 className="display text-[clamp(3.5rem,14vw,13rem)] leading-[0.85]">
            Projects <span className="align-top font-sans text-base font-normal tracking-normal opacity-50">{projects.length}</span>
          </h2>
        </div>
        <p className="max-w-sm text-lg leading-relaxed">
          Websites and digital experiences built for brands, shops and service businesses.
        </p>
      </header>

      <nav aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {filters.map((item) => {
          const count = projects.filter((project) => matchesFilter(project, item.id)).length;
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              className={\`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ultra \${active ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink/60"}\`}
            >
              {item.label} <span className={active ? "ml-1 opacity-60" : "ml-1 opacity-40"}>{count}</span>
            </button>
          );
        })}
      </nav>

      {featured && (
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProjectCard project={featured} cover={covers[featured.slug]} index={projects.findIndex((p) => p.slug === featured.slug) + 1} variant="featured" />
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {sideProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} cover={covers[project.slug]} index={projects.findIndex((p) => p.slug === project.slug) + 1} variant="compact" />
            ))}
          </div>
        </div>
      )}

      {remaining.length > 0 && (
        <div className={featured ? "mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"}>
          {remaining.map((project) => (
            <ProjectCard key={project.slug} project={project} cover={covers[project.slug]} index={projects.findIndex((p) => p.slug === project.slug) + 1} />
          ))}
        </div>
      )}

      {visible.length === 0 && (
        <p role="status" className="border-t border-ink/20 py-8 text-lg">
          No projects match this category yet.
        </p>
      )}
    </section>
  );
}

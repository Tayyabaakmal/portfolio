import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNeighbours, getProject, projects } from "@/data/projects";
import { getShots } from "@/lib/images";
import Cover from "@/components/Cover";
import Reveal from "@/components/Reveal";
import Contact from "@/components/Contact";
import TransitionLink from "@/components/TransitionLink";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProject(params.slug);
  return p
    ? {
        title: p.name,
        description: p.description,
        openGraph: { title: p.name, description: p.description },
      }
    : {};
}
function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-6 space-y-5">
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}
export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const { cover } = getShots(p.slug),
    { prev, next } = getNeighbours(p.slug);
  return (
    <article className="case-study">
      <header className="section-wrap case-header">
        <p>{p.category}</p>
        <h1 className="display">{p.name}</h1>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="action action-primary"
        >
          Visit live website <span aria-hidden="true">↗</span>
        </a>
      </header>
      <Reveal className="section-wrap case-image">
        <Cover
          src={cover}
          name={p.name}
          color={p.color}
          sizes="(min-width:1440px) 1360px, 92vw"
          priority
          aspect="aspect-[16/10] md:aspect-[16/8]"
        />
      </Reveal>
      <section className="section-wrap case-content">
        <div>
          <h2>Overview</h2>
          <Paragraphs items={p.overview} />
          <h2 className="case-heading">Approach</h2>
          <Paragraphs items={p.approach} />
          <h2 className="case-heading">Objective</h2>
          <Paragraphs items={p.objective} />
        </div>
        <aside>
          <h2>My contribution</h2>
          <ul>
            {p.contribution.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </aside>
      </section>
      <nav aria-label="More projects" className="section-wrap case-neighbours">
        <TransitionLink href={`/projects/${prev.slug}`}>
          <span>Previous project</span>
          <strong>{prev.name}</strong>
        </TransitionLink>
        <TransitionLink href={`/projects/${next.slug}`}>
          <span>Next project</span>
          <strong>{next.name}</strong>
        </TransitionLink>
      </nav>
      <Contact />
    </article>
  );
}

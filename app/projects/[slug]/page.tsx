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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return { title: p.name, description: p.description, openGraph: { title: p.name, description: p.description } };
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-6 max-w-xl space-y-6 text-lg leading-relaxed">
      {items.map((t) => (
        <p key={t}>{t}</p>
      ))}
    </div>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const { cover } = getShots(p.slug);
  const { prev, next } = getNeighbours(p.slug);

  return (
    <article>
      <header className="px-5 pb-10 pt-32 md:px-10 md:pt-44">
        <p className="text-lg">{p.category}</p>
        <h1 className="display mt-4 text-[clamp(3rem,12vw,12rem)]">{p.name}</h1>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-ultra px-7 py-3.5 font-medium text-paper transition-transform hover:-translate-y-0.5"
        >
          Visit live website
        </a>
      </header>

      <Reveal className="px-5 md:px-10">
        <Cover src={cover} name={p.name} color={p.color} sizes="100vw" priority aspect="aspect-[16/10] md:aspect-[16/8]" hint={`public/projects/${p.slug}/cover.jpg`} />
      </Reveal>

      <section className="grid gap-16 px-5 py-20 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-7">
          <h2 className="display text-4xl">Overview</h2>
          <Paragraphs items={p.overview} />
          <h2 className="display mt-16 text-4xl">Approach</h2>
          <Paragraphs items={p.approach} />
          <h2 className="display mt-16 text-4xl">Objective</h2>
          <Paragraphs items={p.objective} />
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <h2 className="display text-4xl">My contribution</h2>
          <ul className="mt-6 text-lg">
            {p.contribution.map((c) => (
              <li key={c} className="border-t border-ink/20 py-4">
                {c}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <nav aria-label="More projects" className="grid border-t border-ink/20 md:grid-cols-2">
        <TransitionLink href={`/projects/${prev.slug}`} className="group border-b border-ink/20 px-5 py-10 md:border-b-0 md:border-r md:px-10 md:py-16">
          <span className="text-base">Previous project</span>
          <span className="display vf mt-2 block text-[clamp(2rem,5vw,4.5rem)] [font-variation-settings:'wght'_400,'wdth'_88] group-hover:[font-variation-settings:'wght'_750,'wdth'_100]">
            {prev.name}
          </span>
        </TransitionLink>
        <TransitionLink href={`/projects/${next.slug}`} className="group px-5 py-10 md:px-10 md:py-16 md:text-right">
          <span className="text-base">Next project</span>
          <span className="display vf mt-2 block text-[clamp(2rem,5vw,4.5rem)] [font-variation-settings:'wght'_400,'wdth'_88] group-hover:[font-variation-settings:'wght'_750,'wdth'_100]">
            {next.name}
          </span>
        </TransitionLink>
      </nav>
      <Contact />
    </article>
  );
}

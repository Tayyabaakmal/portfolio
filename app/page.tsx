import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { projects } from "@/data/projects";
import { getShots } from "@/lib/images";

export default function Home() {
  const covers = Object.fromEntries(projects.map((p) => [p.slug, getShots(p.slug).cover]));
  return (
    <>
      <Hero />
      <Projects projects={projects} covers={covers} />
      <About />
      <Expertise />
      <Experience />
      <Contact />
    </>
  );
}

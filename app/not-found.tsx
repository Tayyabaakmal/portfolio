import TransitionLink from "@/components/TransitionLink";
export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-start justify-center px-5 md:px-10">
      <h1 className="display text-[18vw]">Lost.</h1>
      <p className="mt-6 max-w-md text-lg">That page does not exist. The projects are a better place to start.</p>
      <TransitionLink href="/#projects" className="link-wipe mt-8 text-xl font-medium">Back to projects</TransitionLink>
    </section>
  );
}

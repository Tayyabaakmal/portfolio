import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 className="display text-[clamp(3rem,8vw,8rem)]">Experience</h2>
            <p className="mt-6 max-w-sm text-xl">Freelance, with clients in different countries, since {profile.since}.</p>
          </div>
        </div>
        <ol className="md:col-span-7">
          {profile.experience.map((x) => (
            <li key={x.title} className="group border-t border-ink/20 py-6 last:border-b md:py-8">
              <h3 className="display vf text-[clamp(1.6rem,3.2vw,3rem)] [font-variation-settings:'wght'_450,'wdth'_90] transition-transform group-hover:translate-x-2 group-hover:[font-variation-settings:'wght'_750,'wdth'_100]">
                {x.title}
              </h3>
              <p className="mt-2 max-w-md text-lg">{x.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

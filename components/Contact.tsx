import { profile } from "@/data/profile";

export default function Contact() {
  const c = profile.contact;

  const social = [
    { label: "GitHub", href: c.github },
    { label: "Behance", href: c.behance },
    { label: "LinkedIn", href: c.linkedin },
  ];

  return (
    <section
      id="contact"
      className="on-blue flex min-h-[90svh] flex-col justify-between bg-ultra px-5 py-24 text-paper md:px-10 md:py-32"
    >
      <div>
        <h2 className="display max-w-[14ch] text-[clamp(3rem,10vw,10rem)]">
          Have a site, store or chatbot in mind?
        </h2>
        <a
          href={`mailto:${c.email}`}
          className="link-wipe mt-10 inline-block break-all text-[clamp(1.5rem,4vw,3.5rem)] font-medium"
        >
          {c.email}
        </a>
      </div>

      <div className="mt-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-xl">
          {social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-wipe">
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <a
            href={c.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full border border-paper/60 px-7 py-3.5 text-lg font-medium transition-colors hover:bg-paper hover:text-ink"
          >
            Book a call
          </a>
          <a
            href={c.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full bg-paper px-7 py-3.5 text-lg font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
          </a>
        </div>
      </div>

      <p className="mt-16 text-sm opacity-70">© {new Date().getFullYear()} {profile.name}</p>
    </section>
  );
}

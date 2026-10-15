import { profile } from "@/data/profile";
import TransitionLink from "./TransitionLink";
export default function Contact() {
  const c = profile.contact;
  return (
    <footer id="contact" className="contact-section">
      <div className="section-wrap">
        <div className="contact-top">
          <p className="eyebrow">Let’s make it happen</p>
          <h2>
            Have a good idea?
            <br />
            <span>Let’s build it.</span>
          </h2>
          <div className="button-row">
            <a
              href={c.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="action action-primary"
            >
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
            <a
              href={c.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="action action-secondary"
            >
              Book a call <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a className="contact-email" href={`mailto:${c.email}`}>
            {c.email} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <TransitionLink href="/" className="footer-name">
            {profile.name}
          </TransitionLink>
          <div className="footer-socials">
            {[
              { label: "GitHub", href: c.github },
              { label: "Behance", href: c.behance },
              { label: "LinkedIn", href: c.linkedin },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

import { profile } from "@/data/profile";
import TransitionLink from "./TransitionLink";
export default function About() {
  return (
    <section
      id="about"
      className="section-wrap about-section"
      aria-labelledby="about-heading"
    >
      <div className="about-introduction">
        <p className="eyebrow">The person behind the projects</p>
        <h2 id="about-heading">
          Hi, I’m Tayyaba.
          <br />
          Your ideas,
          <br />
          <span className="accent">my next challenge.</span>
        </h2>
        <TransitionLink href="/#contact" className="text-link">
          Start a conversation <span aria-hidden="true">↗</span>
        </TransitionLink>
      </div>
      <div className="about-content">
        <p className="about-lead">
          I build, improve and connect the digital tools your business runs on.
        </p>
        <p>
          From a first website to a growing online store, I bring design,
          development and technical problem-solving together. I work directly
          with businesses and agencies, keeping communication clear from the
          first idea to launch.
        </p>
        <p>
          Need something beyond a website? I also build AI chatbots and connect
          websites, CRMs and automations to take repetitive work off your hands.
        </p>
        <div className="about-facts">
          <div>
            <span className="fact-value">Since {profile.since}</span>
            <span>Working with international clients</span>
          </div>
          <div>
            <span className="fact-value">One partner</span>
            <span>Design, development & ongoing support</span>
          </div>
        </div>
      </div>
    </section>
  );
}

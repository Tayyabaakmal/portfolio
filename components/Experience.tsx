import { profile } from "@/data/profile";
const process = [
  {
    title: "Understand the business",
    text: "We talk through your goals, your customers and what the website or system needs to do.",
  },
  {
    title: "Design with a purpose",
    text: "I shape the structure and visual direction, with room for your feedback before development.",
  },
  {
    title: "Build, test & refine",
    text: "The design becomes a working experience, checked across screen sizes and key user journeys.",
  },
  {
    title: "Launch with support",
    text: "I help you get comfortable with the finished work and stay available for ongoing improvements.",
  },
];
export default function Experience() {
  return (
    <section
      id="experience"
      className="section-wrap experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="section-heading">
        <h2 id="experience-heading">
          A clear process.
          <br />A better partnership.
        </h2>
        <p>
          Independent development for international clients since{" "}
          {profile.since}. Here’s what working together looks like.
        </p>
      </div>
      <ol className="process-grid">
        {process.map((item, index) => (
          <li key={item.title}>
            <span className="process-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
      <details className="experience-details">
        <summary>
          More about my experience <span aria-hidden="true">+</span>
        </summary>
        <div>
          {profile.experience.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}

// Edit text here. Each paragraph is one item in the array.
// Screenshots: public/projects/<slug>/cover.jpg (one card image per project).
export type Project = {
  slug: string;
  name: string;
  url: string;
  category: string;
  color: string;
  description: string;
  overview: string[];
  approach: string[];
  objective: string[];
  contribution: string[];
};

const contribution = [
  "Complete website design, from layout to final pages",
  "Website development and build",
  "Page structure and navigation",
  "Responsive design for desktop, tablet and mobile",
  "Typography, spacing and visual hierarchy",
];

export const projects: Project[] = [
  {
    slug: "the-public-relationship",
    name: "The Public Relationship",
    url: "https://thepublicrelationship.com/",
    category: "Public relations",
    color: "#3A2BFF",
    description: "A website for a public relations business.",
    overview: [
      "The Public Relationship is a website for a public relations business. In this line of work, the website is often the first thing a prospective client sees, long before a conversation begins. It has to communicate professionalism and credibility within seconds, and I designed and developed the complete site with that first impression in mind.",
      "A PR business sells trust and judgement, so the site avoids noise. The layout gives each message room to breathe, and the navigation is kept simple so a visitor can understand what the company offers without searching for it.",
    ],
    approach: [
      "I started by shaping the page structure around the questions a potential client is likely to ask: what the business does, who it works with, and how to begin. Each section was then arranged to lead naturally into the next, so the page reads as one continuous story rather than a set of disconnected blocks.",
      "The visual language is restrained: a clear typographic hierarchy, generous spacing and a consistent rhythm between sections. I checked the layout across desktop and mobile throughout, so the mobile version is a considered layout in its own right and not a shrunken copy of the desktop page.",
    ],
    objective: [
      "The goal is to present the business with confidence and make the next step obvious. The site is built to help a first-time visitor understand the company and feel comfortable enough to get in touch.",
    ],
    contribution,
  },
  {
    slug: "emcs-content",
    name: "EMCS Content",
    url: "https://emcscontent.com/",
    category: "Content services",
    color: "#15112B",
    description: "A website for a content services business.",
    overview: [
      "EMCS Content is a website for a business that offers content services. Content work is hard to picture from the outside, so the website has to explain the offer quickly and in plain language. I designed and developed the full site to make that explanation easy to follow.",
      "The page is built for people who are comparing providers. It helps them see what is included, how the service is delivered and how to take the next step, without needing to read every line of every page.",
    ],
    approach: [
      "The structure was planned from the visitor's side: first the service, then the reasons to trust it, then a clear way to make contact. Headings are written to be scanned, so the main message is clear even to someone who only skims the page.",
      "Visually, I kept the palette calm and the layout uncluttered, letting the content carry the page. Spacing and type sizes were tuned so the site stays easy to read on a phone, where many prospective clients first look.",
    ],
    objective: [
      "The website is designed to communicate the content services clearly and give visitors a simple, direct way to get in touch. Its job is to make a potential client feel confident about what they would receive before they send a message.",
    ],
    contribution,
  },
  {
    slug: "sheaskyn-organics",
    name: "Sheaskyn Organics",
    url: "https://sheaskynorganics.com/",
    category: "Organic products",
    color: "#7A5CFF",
    description: "A website for an organic products brand.",
    overview: [
      "Sheaskyn Organics is an online home for an organic products brand. A product brand's website has to do two things at once: present the brand's identity and make the products easy to explore. I designed and developed the complete website, shaping the layout around how visitors browse and learn about what the brand offers.",
      "Natural and organic products are often chosen on trust and story. The site gives the brand space to speak for itself, so the personality of the business comes through without the page feeling crowded.",
    ],
    approach: [
      "I organised the pages so visitors move from understanding the brand to exploring its products in a logical order. Navigation was kept clear and consistent, so returning visitors can find their way back to a product without effort.",
      "The design favours soft, natural spacing and a clean typographic system, supporting the brand's character. The layout was built to adapt properly across screen sizes, so the experience feels complete on a phone as well as a large monitor.",
    ],
    objective: [
      "The website is built to present the brand and its products in an appealing, trustworthy way. It helps visitors learn about the range, understand what makes the brand different, and find their way to more information.",
    ],
    contribution,
  },
  {
    slug: "xirfadlay",
    name: "Xirfadlay",
    url: "https://xirfadlay.com/",
    category: "Business website",
    color: "#2A1E6B",
    description: "A business website I designed and developed.",
    overview: [
      "Xirfadlay is a business website that I designed and developed from start to finish. A good business website is mostly about clarity: visitors should understand who the business is and what it does within moments of arriving, and find the rest without effort.",
      "Every page was planned as part of one system, so the site feels coherent from the first visit to the last page. The focus is on helping visitors reach what they need quickly and confidently.",
    ],
    approach: [
      "I began with the information hierarchy: what is most important to say first, what supports it, and where the visitor should go next. The layout was then built around that hierarchy, with consistent spacing and headings that make the page easy to scan.",
      "The site was developed to be responsive from the start, so the same content is arranged thoughtfully on tablets and phones rather than simply stacked. The result is a site that remains straightforward to use on any device.",
    ],
    objective: [
      "The website is built to present the business professionally and make it simple for visitors to find what they need. The aim is a site that represents the business well and makes a strong first impression for anyone who arrives on it.",
    ],
    contribution,
  },
  {
    slug: "usports-nation",
    name: "USports Nation",
    url: "https://usportsnation.com/",
    category: "Sports content",
    color: "#4D3FFF",
    description: "A website for a sports content platform.",
    overview: [
      "USports Nation is a sports-focused website. Sports audiences move quickly and browse on many devices, so the site has to be easy to scan and fast to use. I designed and developed the full website, organising its content so visitors can find what interests them without a lot of searching.",
      "Content-led sites live or die by how easily a reader can move from one piece to the next. The structure was planned with that movement in mind, so the site invites the visitor to keep exploring.",
    ],
    approach: [
      "I grouped the content into clear sections and built the layout around scanning: strong headings, consistent card structure and visible calls to action. The aim was to let a reader decide quickly what to open next.",
      "The responsive layout was a priority, since much sports browsing happens on mobile. Pages were checked at several screen widths so that navigation and reading stay comfortable on touch devices.",
    ],
    objective: [
      "The website is built to give sports fans a clear, engaging place to read and browse content. It is designed to keep visitors moving through the site and returning to it, with a structure that makes sense at a glance.",
    ],
    contribution,
  },
  {
    slug: "the-carrot-cartel",
    name: "The Carrot Cartel",
    url: "https://thecarrotcartel.com/",
    category: "Brand website",
    color: "#6B5BFF",
    description: "A brand website I designed and developed.",
    overview: [
      "The Carrot Cartel is a brand website that I designed and developed. A brand site has a particular job: it needs to feel like the brand itself while still being simple to use. The layout gives the brand a clear and distinctive presence online, from the first screen through to the final page.",
      "The site is the central point of the brand's online presence, so it had to hold the personality of the business without sacrificing usability.",
    ],
    approach: [
      "The work balanced personality with function. Typography, spacing and page flow were chosen to make the brand memorable, while navigation stays predictable so visitors never have to work out where they are.",
      "I built the site to be responsive from the outset, so the brand's character carries through on phones and tablets as well as on desktop screens.",
    ],
    objective: [
      "The website is built to introduce the brand, showcase what it offers, and make it easy for visitors to take the next step. It works as the place where people can understand the brand and find their way forward.",
    ],
    contribution,
  },
  {
    slug: "getwatch",
    name: "GetWatch",
    url: "https://getwatch.it/",
    category: "Watch retail",
    color: "#1D1550",
    description: "A website for a watch retail business.",
    overview: [
      "GetWatch is a watch-focused website. Watches are visual products, so the site is built to give them room and make browsing feel calm and deliberate. I designed and developed the complete website, arranging its pages so visitors can explore the offer and move toward an enquiry or purchase.",
      "Shoppers who are considering a watch tend to compare options carefully, so the site is organised to make comparison and decision-making feel straightforward rather than overwhelming.",
    ],
    approach: [
      "I structured the pages around the shopper's path: browse, compare, then act. Visual hierarchy keeps the products at the centre, with supporting information arranged so it is available without crowding the page.",
      "Spacing and imagery were treated carefully, and the layout was tested across screen sizes. A phone is often where a shopper first looks, so the mobile experience was designed with the same care as the desktop one.",
    ],
    objective: [
      "The website is designed to present the watches clearly and guide visitors from browsing to action. Its job is to make the offer easy to understand and the path to a decision as short and straightforward as possible.",
    ],
    contribution,
  },
  {
    slug: "shop-do-not-disturb",
    name: "Shop Do Not Disturb",
    url: "https://shopdonotdisturb.com/",
    category: "Online shop",
    color: "#5A49F5",
    description: "An online shop I designed and developed.",
    overview: [
      "Shop Do Not Disturb is an online store that I designed and developed. An online shop succeeds or fails on how easy it is to browse and buy, so the site was built around the shopper's journey, from finding a product to reaching the checkout.",
      "A store has to feel organised and trustworthy at every step. The design keeps the page structure predictable, so shoppers always know where they are and what comes next.",
    ],
    approach: [
      "The layout was planned around clear product browsing and consistent page templates, so the store feels orderly as shoppers move between sections. Calls to action are placed where a decision is most likely to happen.",
      "Mobile shopping was a central consideration. The responsive layout keeps product information readable and actions easy to reach with a thumb, so browsing on a small screen feels just as natural as on a computer.",
    ],
    objective: [
      "The store is built to present its products clearly and make the path to purchase simple. The goal is a shopping experience that feels effortless, so visitors can find what they want and move forward without friction.",
    ],
    contribution,
  },
  {
    slug: "mediolie",
    name: "Mediolie",
    url: "https://mediolie.nl/",
    category: "Business website",
    color: "#33268F",
    description: "A business website for an international client.",
    overview: [
      "Mediolie is a business website that I designed and developed as part of my work with international clients. The site presents the business professionally and gives visitors a clear understanding of what it offers.",
      "Working with clients across borders means the website has to make sense to visitors from different backgrounds, so the structure and language were kept direct and easy to follow.",
    ],
    approach: [
      "Each page was considered as part of the whole site, so the experience feels consistent from the first visit to the last page. The layout prioritises clarity, with a structure that is easy to follow and a design that performs well across screen sizes.",
      "Communication with the client shaped the decisions along the way, keeping the final site focused on what the business needs to say.",
    ],
    objective: [
      "The website is built to present the business professionally and help visitors understand its services at a glance. It is designed to give a strong first impression and make getting in touch straightforward.",
    ],
    contribution,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNeighbours = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};

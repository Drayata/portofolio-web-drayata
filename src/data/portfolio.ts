import type { MiniProject, Project, SocialLink, TimelineItem } from "@/types/portfolio";

// TODO: replace before launch — email, usernames, timezone, and canonical domain.
export const profile = {
  name: "Indra Surya Adinata",
  monogram: "ISA",
  role: "Web Developer",
  supportingRole: "Informatics Engineering Student",
  location: "Indonesia",
  timezone: "Western Indonesia Time (UTC+7)",
  availability: "Open to internship and junior web development opportunities",
  eyebrow: "Web Developer · Indonesia",
  headline: "I build thoughtful digital experiences for the modern web.",
  description:
    "I turn ideas into responsive, accessible, and reliable web products—with equal attention to interface details and the engineering behind them.",
  email: "indra.portfolio@example.com",
  about:
    "I’m an Informatics Engineering student at Universitas Jenderal Soedirman who enjoys turning open-ended problems into clear, structured products. I learn best by building: mapping a user flow, shaping the interface, then working through the data and implementation details that make it dependable. My projects span modern web applications, relational database design, and an early-stage mobile productivity concept. I care about thoughtful UI, accessible interactions, and code that remains understandable as a product grows. I’m currently looking for an internship or junior web development opportunity where I can contribute, learn from a strong team, and keep improving through real product work.",
  education: "Informatics Engineering — Universitas Jenderal Soedirman",
  exploring: ["Full-stack development", "Product engineering", "Applied AI"],
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/USERNAME" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/USERNAME" },
];

export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Mini Projects", href: "/#mini-projects" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
] as const;

export const seo = {
  // TODO: replace before launch with the final production domain.
  url: "https://example.com",
  title: "Indra Surya Adinata — Web Developer",
  description:
    "Portfolio of Indra Surya Adinata, a web developer and Informatics Engineering student in Indonesia.",
} as const;

export const projects: Project[] = [
  {
    slug: "ruang-usaha-kita",
    title: "Ruang Usaha Kita",
    shortTitle: "RUK",
    summary:
      "A digital-services marketplace connecting small businesses with content creators for promotional work.",
    role: "Full-stack Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    year: "In development",
    status: "Academic Project",
    accent: "cyan",
    preview: "marketplace",
    liveUrl: null,
    sourceUrl: null,
    context:
      "Small businesses often need accessible promotional support, while emerging creators need a clear way to package and present their services. Ruang Usaha Kita explores a two-sided marketplace designed around those distinct needs.",
    objective:
      "Design and build a coherent marketplace foundation where business owners can discover services and creators can manage their offers without the two roles becoming tangled in one generic experience.",
    responsibilities: [
      "Mapped role-specific journeys for business owners and creators.",
      "Built responsive catalogue, service detail, cart, and checkout flows.",
      "Integrated Supabase authentication and relational application data.",
      "Debugged state and data-flow issues across client and server boundaries.",
    ],
    constraints: [
      "Academic scope and an evolving product definition.",
      "Two user roles with different permissions and interface needs.",
      "No production usage data yet; decisions are validated through flow testing.",
    ],
    approach: [
      {
        title: "Separate the journeys",
        body: "I began with the decisions each role needs to make, then structured navigation and screens around those moments instead of mirroring the database model in the UI.",
      },
      {
        title: "Build the transaction spine",
        body: "The catalogue, service details, cart, and checkout were treated as one connected system so pricing, selected services, and ownership stayed consistent across steps.",
      },
      {
        title: "Tighten the data boundary",
        body: "Authentication and Row Level Security rules were considered alongside UI states, making authorization a product behavior rather than a late infrastructure task.",
      },
    ],
    features: [
      "Role-based onboarding and workspaces",
      "Searchable digital-service catalogue",
      "Cart and structured checkout journey",
      "Supabase Auth session handling",
      "Row Level Security for scoped data access",
    ],
    decisions: [
      {
        title: "Role-aware access",
        body: "Authorization is enforced at the data layer with RLS, while the interface exposes only the actions relevant to the active role. This keeps the experience clearer without treating hidden UI as security.",
      },
      {
        title: "Explicit checkout state",
        body: "Cart state and order creation are handled as separate stages. That makes intermediate states visible and easier to debug when a request or session fails.",
      },
    ],
    reflection:
      "The hardest part was keeping user role, session state, and related records aligned. It reinforced the value of tracing data from interface action to database policy and back, instead of debugging each layer in isolation.",
    outcome:
      "The project currently provides the core role-based marketplace flows and a working Supabase-backed foundation. It remains in development; usability refinement and broader end-to-end validation are the next priorities.",
    gallery: [
      { title: "Service discovery", caption: "Catalogue composition prioritizing service type, creator, and price context.", variant: "catalogue" },
      { title: "Role workspace", caption: "A focused dashboard concept that changes emphasis for each user role.", variant: "dashboard" },
      { title: "Checkout flow", caption: "A deliberately linear review flow with visible order state.", variant: "checkout" },
    ],
  },
  {
    slug: "online-bus-ticketing-database",
    title: "Online Bus Ticketing Database",
    shortTitle: "BusDB",
    summary:
      "A relational database system for structured bus booking flows and dependable data integrity.",
    role: "Database Designer & Developer",
    stack: ["Oracle SQL", "PL/SQL", "Relational Database Design"],
    year: "Academic project",
    status: "Academic Project",
    accent: "violet",
    preview: "database",
    liveUrl: null,
    sourceUrl: null,
    context:
      "A ticketing system depends on relationships that remain valid as schedules, passengers, routes, seats, and transactions change. This project focused on modeling that domain before building queries around it.",
    objective:
      "Create a normalized Oracle database that represents a booking lifecycle clearly, prevents invalid relationships, and supports useful operational queries.",
    responsibilities: [
      "Translated the ticketing domain into an entity-relationship model.",
      "Defined primary keys, foreign keys, constraints, and user roles.",
      "Wrote joins, aggregation queries, views, and PL/SQL routines.",
      "Tested expected operations and deliberate integrity violations.",
    ],
    constraints: [
      "Database-focused academic deliverable rather than a public application.",
      "Schema needed to support different users without duplicating core records.",
      "Correctness and traceability took priority over visual presentation.",
    ],
    approach: [
      {
        title: "Model the lifecycle",
        body: "I mapped the journey from route and schedule creation through passenger booking and payment, looking for entities with independent lifecycles and stable identifiers.",
      },
      {
        title: "Encode the rules",
        body: "Relationships and constraints were moved into the schema wherever possible so invalid states would be rejected consistently, regardless of the calling interface.",
      },
      {
        title: "Query real questions",
        body: "Views, joins, and aggregation were designed around questions a ticketing operation would need to answer, rather than existing only as isolated SQL exercises.",
      },
    ],
    features: [
      "Normalized route, schedule, passenger, and booking entities",
      "Primary and foreign key relationships",
      "Validation constraints and integrity tests",
      "Operational joins and aggregate reporting",
      "Views and role-aware database access",
    ],
    decisions: [
      {
        title: "Integrity belongs in the schema",
        body: "Required relationships and valid values use database constraints. Application checks can improve feedback, but the database remains the final guard against inconsistent records.",
      },
      {
        title: "Readable query surfaces",
        body: "Views collect common joins into stable, named query surfaces, reducing repetition and clarifying which fields are intended for reporting use.",
      },
    ],
    reflection:
      "Balancing normalization with query readability was the central tradeoff. The exercise showed that a clean model still needs deliberate views and naming to be practical for the people querying it.",
    outcome:
      "The resulting schema supports the planned booking relationships, common queries, and integrity checks. The outcome is an academic database implementation, not a deployed consumer ticketing service.",
    gallery: [
      { title: "Entity map", caption: "A visual abstraction of the route, schedule, booking, and passenger relationships.", variant: "schema" },
      { title: "Query surface", caption: "A compact representation of joined operational data exposed through a view.", variant: "query" },
      { title: "Integrity checks", caption: "Constraint tests covering valid creation and rejected relationships.", variant: "integrity" },
    ],
  },
  {
    slug: "focusflow-productivity-app",
    title: "FocusFlow Productivity App",
    shortTitle: "FocusFlow",
    summary:
      "A mobile productivity concept combining flexible habits, focus sessions, alarms, and notes.",
    role: "Mobile App Developer",
    stack: ["Flutter", "Dart"],
    year: "In progress",
    status: "Concept / In progress",
    accent: "amber",
    preview: "focus",
    liveUrl: null,
    sourceUrl: null,
    context:
      "Productivity tools often split related routines across multiple apps. FocusFlow explores whether a small, coherent set of daily tools can share context without becoming an overloaded dashboard.",
    objective:
      "Define a credible MVP and interaction model for habit tracking, focus timing, reminders, and quick notes within one calm mobile experience.",
    responsibilities: [
      "Prioritized the first-release feature set and deferred nonessential ideas.",
      "Mapped navigation and shared state between daily tools.",
      "Built early Flutter interface and component explorations.",
      "Iterated on hierarchy, interaction clarity, and empty states.",
    ],
    constraints: [
      "Early-stage concept with no production users or impact metrics.",
      "Several useful features compete for limited mobile screen space.",
      "Architecture needs to stay flexible while product assumptions evolve.",
    ],
    approach: [
      {
        title: "Start with the daily loop",
        body: "I organized the concept around a simple rhythm: choose an intention, focus, record progress, and capture anything that should be revisited later.",
      },
      {
        title: "Reduce the MVP",
        body: "Feature ideas were tested against that loop. Customization remains, but deeper analytics and social mechanics sit outside the first scope.",
      },
      {
        title: "Design state intentionally",
        body: "Timer lifecycle, habit completion, reminders, and notes each have different persistence needs, so state boundaries are planned around feature ownership rather than one global store.",
      },
    ],
    features: [
      "Customizable habit tracker",
      "Focused work timer",
      "Alarm and reminder concepts",
      "Fast notes capture",
      "Unified daily overview",
    ],
    decisions: [
      {
        title: "Modular feature boundaries",
        body: "Each primary tool owns its local state and data concerns, while the daily overview consumes a small shared summary. This limits coupling as the concept changes.",
      },
      {
        title: "Calm over dense",
        body: "The interface favors one primary action and progressive detail per screen, even when that means an extra deliberate navigation step.",
      },
    ],
    reflection:
      "The key lesson has been that combining tools is easy; giving the combined product a clear reason to exist is harder. The MVP now centers on a shared daily loop rather than a checklist of unrelated features.",
    outcome:
      "The project has a defined MVP, feature architecture, and early interface direction. It remains a concept in progress, with implementation and user feedback still needed before its assumptions can be validated.",
    gallery: [
      { title: "Today view", caption: "A calm overview connecting habits, the next focus session, and quick capture.", variant: "today" },
      { title: "Focus session", caption: "A distraction-light timer state with a single primary action.", variant: "timer" },
      { title: "Habit builder", caption: "A concise setup flow for schedule and completion preferences.", variant: "habit" },
    ],
  },
];

export const miniProjects: MiniProject[] = [
  {
    id: "mini-project-template",
    title: "Mini Project Title",
    description: "A short description of what this project does and why it was built.",
    imageUrl: "/mini-project-placeholder.svg",
    tags: ["Technology", "Tool"],
  },
];

export const skills = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { category: "Backend & Data", items: ["Supabase", "SQL", "Oracle Database"] },
  { category: "Tools", items: ["Git", "GitHub", "Figma"] },
  { category: "Exploring", items: ["Flutter", "Applied AI"] },
] as const;

// TODO: replace or expand these entries when professional experience is available.
export const timeline: TimelineItem[] = [
  {
    period: "Present",
    title: "Informatics Engineering",
    description: "Studying at Universitas Jenderal Soedirman and building a foundation across software, data, and product thinking.",
    type: "Education",
  },
  {
    period: "Selected work",
    title: "Academic product projects",
    description: "Applying coursework through a full-stack marketplace, a relational ticketing database, and a mobile product concept.",
    type: "Practice",
  },
  {
    period: "Current focus",
    title: "From implementation to product engineering",
    description: "Deepening full-stack patterns, accessible frontend craft, and practical uses of applied AI.",
    type: "Learning",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

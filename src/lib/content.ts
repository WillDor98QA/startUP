import {
  FileSpreadsheet,
  MessageCircle,
  FileText,
  Stamp,
  Phone,
  Mails,
  LayoutGrid,
  Workflow,
  Brain,
  Gauge,
  Plug,
  Smartphone,
  Search,
  Microscope,
  PenTool,
  Code2,
  Rocket,
  LifeBuoy,
  ShoppingBag,
  HeartPulse,
  ShieldCheck,
  GraduationCap,
  Factory,
  HardHat,
  Hotel,
  HandHeart,
  Briefcase,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Trust                                                             */
/* ------------------------------------------------------------------ */
export const CLIENTS = [
  "Brightleaf Retail",
  "Vero Clinics",
  "Harbour Insurance",
  "Lumen Academy",
  "Forge Manufacturing",
  "Northside Build",
  "Coastline Hospitality",
  "Open Hands NGO",
];

/* ------------------------------------------------------------------ */
/*  The Problem — the manual tools businesses outgrow                  */
/* ------------------------------------------------------------------ */
export const MANUAL_TOOLS = [
  { icon: FileSpreadsheet, label: "Spreadsheets", note: "Versioned by email, broken by one typo." },
  { icon: MessageCircle, label: "WhatsApp", note: "Decisions buried in endless threads." },
  { icon: FileText, label: "Paper records", note: "Unsearchable, unbackable, easily lost." },
  { icon: Stamp, label: "Manual approvals", note: "Work waits days for a signature." },
  { icon: Phone, label: "Phone calls", note: "No record, no follow-up, no data." },
  { icon: Mails, label: "Email chains", note: "Context scattered across inboxes." },
];

export const PAIN_POINTS = [
  "Hours lost to copy-paste and double entry",
  "Costly errors no one catches until it's late",
  "No real-time view of what's actually happening",
  "Growth capped by how much your team can manually handle",
];

/* ------------------------------------------------------------------ */
/*  The Transformation — homepage story beats (drive the WebGL scene)  */
/* ------------------------------------------------------------------ */
export type StoryBeat = {
  phase: string;
  title: string;
  body: string;
};

export const STORY_BEATS: StoryBeat[] = [
  {
    phase: "Today",
    title: "Manual work",
    body: "Your team holds the business together with spreadsheets, messages, and memory. It works — until it doesn't scale.",
  },
  {
    phase: "The cost",
    title: "Disconnected",
    body: "Every tool lives on its own island. Data is re-typed, context is lost, and no one sees the whole picture.",
  },
  {
    phase: "The shift",
    title: "Connected",
    body: "We replace the chaos with one connected system. Information flows automatically, from first touch to final report.",
  },
  {
    phase: "The lift",
    title: "Automated",
    body: "The busywork runs itself. Approvals, alerts, and updates happen instantly — your team focuses on the work that matters.",
  },
  {
    phase: "The result",
    title: "Growth",
    body: "Clear visibility, fewer errors, and capacity to grow without adding headcount. Technology finally working for you.",
  },
];

/* ------------------------------------------------------------------ */
/*  Solutions                                                          */
/* ------------------------------------------------------------------ */
export type Solution = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  outcome: string;
  icon: typeof Workflow;
  features: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "custom-saas",
    index: "01",
    title: "Custom Software",
    tagline: "Software that fits how you actually work.",
    problem:
      "Off-the-shelf tools force your business to bend around their rules — so teams fall back to spreadsheets and workarounds.",
    solution:
      "We design and build software around your exact workflow: the screens, rules, and reports your team needs, and nothing they don't.",
    outcome: "One source of truth your whole team adopts — because it was built for them.",
    icon: LayoutGrid,
    features: ["Tailored workflows", "Role-based access", "Built-in reporting", "Scales with you"],
  },
  {
    slug: "process-automation",
    index: "02",
    title: "Process Automation",
    tagline: "Let the repetitive work run itself.",
    problem:
      "Approvals, data entry, reminders, and reports eat hours every week and stall the moment someone's away.",
    solution:
      "We map your manual processes and automate the steps that don't need a human — with the right checks built in.",
    outcome: "Days of recurring busywork recovered every month, with fewer errors.",
    icon: Workflow,
    features: ["Approval flows", "Auto data capture", "Smart reminders", "Scheduled reports"],
  },
  {
    slug: "ai-solutions",
    index: "03",
    title: "AI Solutions",
    tagline: "Practical AI, not science projects.",
    problem:
      "AI feels out of reach — expensive, risky, and hard to connect to the way your business really runs.",
    solution:
      "We apply AI where it pays off: drafting documents, answering customers, classifying data, and surfacing insight you'd otherwise miss.",
    outcome: "Faster responses and smarter decisions, without hiring a data-science team.",
    icon: Brain,
    features: ["Document drafting", "Support assistants", "Data classification", "Forecasting"],
  },
  {
    slug: "business-dashboards",
    index: "04",
    title: "Business Dashboards",
    tagline: "See your whole business at a glance.",
    problem:
      "Numbers live in five places and the monthly report is already out of date by the time it's compiled.",
    solution:
      "We bring your data together into clear, live dashboards — the few numbers that actually drive decisions.",
    outcome: "Real-time visibility, so you act on what's happening now, not last month.",
    icon: Gauge,
    features: ["Live KPIs", "Unified data", "Custom views", "Mobile-ready"],
  },
  {
    slug: "systems-integration",
    index: "05",
    title: "Systems Integration",
    tagline: "Make your tools talk to each other.",
    problem:
      "Your accounting, CRM, store, and ops tools don't connect — so people become the integration, moving data by hand.",
    solution:
      "We connect your existing systems so data flows automatically between them, end to end.",
    outcome: "No more double entry — your tools work as one connected system.",
    icon: Plug,
    features: ["API integrations", "Data sync", "Legacy bridges", "Single sign-on"],
  },
  {
    slug: "mobile-applications",
    index: "06",
    title: "Mobile Applications",
    tagline: "Your business, in your team's pocket.",
    problem:
      "Field teams, drivers, and frontline staff are stuck with paper or can't access the systems back at the office.",
    solution:
      "We build fast, simple mobile apps so work gets captured and updated wherever it happens — even offline.",
    outcome: "Accurate data from the field in real time, with no trips back to the desk.",
    icon: Smartphone,
    features: ["iOS & Android", "Offline-first", "Field data capture", "Push updates"],
  },
];

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */
export const PROCESS = [
  {
    no: "01",
    title: "Discover",
    icon: Search,
    body: "We sit with your team and learn how the business really runs — the workarounds, the bottlenecks, and the outcome you're actually after.",
    deliverables: ["Stakeholder interviews", "Workflow map", "Opportunity list"],
  },
  {
    no: "02",
    title: "Analyse",
    icon: Microscope,
    body: "We quantify where time and money leak, then prioritise the changes that pay back fastest. You get a clear, costed roadmap.",
    deliverables: ["ROI analysis", "Prioritised roadmap", "Success metrics"],
  },
  {
    no: "03",
    title: "Design",
    icon: PenTool,
    body: "We design the system around your people — clear screens, sensible defaults, and flows your team will actually adopt.",
    deliverables: ["UX prototypes", "System design", "Approval to build"],
  },
  {
    no: "04",
    title: "Develop",
    icon: Code2,
    body: "We build in short, visible increments. You see working software every week — never a black box, never a surprise at the end.",
    deliverables: ["Working software", "Weekly demos", "Quality automation"],
  },
  {
    no: "05",
    title: "Deploy",
    icon: Rocket,
    body: "We roll out carefully, migrate your data, and train your team — so the switch from old to new feels like an upgrade, not a disruption.",
    deliverables: ["Data migration", "Team training", "Go-live support"],
  },
  {
    no: "06",
    title: "Support",
    icon: LifeBuoy,
    body: "We stay on as your technology partner — monitoring, improving, and evolving the system as your business grows.",
    deliverables: ["Monitoring & SLAs", "Continuous improvement", "A real human to call"],
  },
];

/* ------------------------------------------------------------------ */
/*  Projects — transformation case studies                             */
/* ------------------------------------------------------------------ */
export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
  before: string;
  pains: string[];
  solution: string;
  tech: string[];
  results: { value: string; label: string }[];
  outcome: string;
  tags: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "brightleaf-retail",
    client: "Brightleaf Retail",
    industry: "Retail",
    title: "From 40 spreadsheets to one live operations platform",
    metric: "12 hrs",
    metricLabel: "Saved per week",
    summary:
      "A 9-store retailer ran inventory, staff rotas, and ordering across dozens of spreadsheets and a busy WhatsApp group.",
    before:
      "Stock counts were emailed nightly, re-keyed by head office, and often wrong by morning. Reordering was guesswork.",
    pains: ["Daily double data-entry", "Frequent stockouts", "No view across stores"],
    solution:
      "We built a single retail operations platform with live stock, automated reordering, and a mobile app for store managers.",
    tech: ["Custom Software", "Mobile App", "Dashboards", "Integration"],
    results: [
      { value: "12 hrs", label: "Saved weekly" },
      { value: "−64%", label: "Stockouts" },
      { value: "9", label: "Stores unified" },
    ],
    outcome:
      "Head office now sees every store in real time, and managers reorder in two taps instead of a nightly spreadsheet.",
    tags: ["Retail", "Operations"],
  },
  {
    slug: "vero-clinics",
    client: "Vero Clinics",
    industry: "Healthcare",
    title: "Replacing paper intake for 30,000 patients",
    metric: "−70%",
    metricLabel: "Admin time",
    summary:
      "A growing clinic group handled patient intake and follow-ups on paper forms and phone calls.",
    before:
      "Front-desk staff re-typed paper forms into three systems; follow-ups slipped through the cracks.",
    pains: ["Paper forms re-keyed by hand", "Missed follow-ups", "No audit trail"],
    solution:
      "We delivered a HIPAA-conscious intake and scheduling system with automated reminders and a unified patient record.",
    tech: ["Custom Software", "Automation", "Integration"],
    results: [
      { value: "−70%", label: "Admin time" },
      { value: "+38%", label: "Kept appointments" },
      { value: "0", label: "Lost records" },
    ],
    outcome:
      "Staff spend their time with patients instead of paperwork, and nothing falls through the cracks.",
    tags: ["Healthcare", "Automation"],
  },
  {
    slug: "northside-build",
    client: "Northside Build",
    industry: "Construction",
    title: "Bringing the job site online for 14 crews",
    metric: "+31%",
    metricLabel: "On-time jobs",
    summary:
      "A construction firm coordinated 14 crews by phone, paper dockets, and a whiteboard in the office.",
    before:
      "Daily progress and material requests came in by call and text, then got transcribed by an office manager each evening.",
    pains: ["Paper dockets lost on site", "Delayed material orders", "No live job status"],
    solution:
      "We built an offline-first mobile app for crews plus a live operations dashboard for the office.",
    tech: ["Mobile App", "Dashboards", "Automation"],
    results: [
      { value: "+31%", label: "On-time jobs" },
      { value: "−5 days", label: "Order lead time" },
      { value: "14", label: "Crews connected" },
    ],
    outcome:
      "The office sees every site live, and crews log progress from their phones — even with no signal.",
    tags: ["Construction", "Mobile"],
  },
];

/* ------------------------------------------------------------------ */
/*  Industries                                                         */
/* ------------------------------------------------------------------ */
export type Industry = {
  slug: string;
  name: string;
  icon: typeof ShoppingBag;
  challenge: string;
  opportunity: string;
  outcome: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "retail",
    name: "Retail",
    icon: ShoppingBag,
    challenge: "Stock, staff, and orders tracked across spreadsheets and group chats.",
    opportunity: "Live inventory, automated reordering, and one view across every store.",
    outcome: "Fewer stockouts, less shrink, and hours back every week.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    challenge: "Paper intake, phone bookings, and follow-ups that slip through.",
    opportunity: "Digital intake, automated reminders, and a unified patient record.",
    outcome: "More time with patients and a complete, compliant audit trail.",
  },
  {
    slug: "insurance",
    name: "Insurance",
    icon: ShieldCheck,
    challenge: "Quotes and claims managed in email chains and disconnected files.",
    opportunity: "Guided quoting, automated claims routing, and live pipeline visibility.",
    outcome: "Faster quotes, fewer leaks, and happier policyholders.",
  },
  {
    slug: "education",
    name: "Education",
    icon: GraduationCap,
    challenge: "Enrolment, attendance, and fees managed by hand each term.",
    opportunity: "Self-service portals and automated admin for staff and families.",
    outcome: "Less paperwork and a better experience for everyone.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    challenge: "Production and inventory tracked on whiteboards and clipboards.",
    opportunity: "Live production tracking and connected inventory and ordering.",
    outcome: "Less downtime and a real-time view of the floor.",
  },
  {
    slug: "construction",
    name: "Construction",
    icon: HardHat,
    challenge: "Job sites coordinated by call, text, and paper dockets.",
    opportunity: "Offline mobile capture and a live operations dashboard.",
    outcome: "More on-time jobs and fewer costly delays.",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: Hotel,
    challenge: "Bookings, rosters, and suppliers juggled across tools.",
    opportunity: "Unified bookings, automated rostering, and connected suppliers.",
    outcome: "Smoother service and tighter margins.",
  },
  {
    slug: "ngos",
    name: "NGOs",
    icon: HandHeart,
    challenge: "Beneficiary data and grant reporting kept in scattered files.",
    opportunity: "Secure case management and automated impact reporting.",
    outcome: "More time on mission, and reporting funders trust.",
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: Briefcase,
    challenge: "Projects, time, and billing tracked across spreadsheets.",
    opportunity: "Connected project, time, and billing in one system.",
    outcome: "Faster billing and clearer project profitability.",
  },
];

/* ------------------------------------------------------------------ */
/*  Stats / Team / Testimonials                                        */
/* ------------------------------------------------------------------ */
export const STATS = [
  { value: 120, suffix: "+", label: "Businesses modernised" },
  { value: 38000, suffix: "+", label: "Manual hours eliminated / yr" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Average client rating" },
  { value: 6, suffix: "wks", label: "From kickoff to first launch" },
];

export const VALUES = [
  { title: "Outcomes over output", body: "We're measured by the hours you save and the growth you unlock — not lines of code." },
  { title: "Plain language", body: "No jargon, no mystery. You'll always understand what we're building and why." },
  { title: "Built to be owned", body: "Clean, documented systems you fully own — never locked to us." },
  { title: "Start small, prove value", body: "We ship something useful fast, then expand from real results." },
];

export const TEAM = [
  { name: "Maya Okafor", role: "Founder & CEO", initials: "MO" },
  { name: "Daniel Reyes", role: "Head of Engineering", initials: "DR" },
  { name: "Sofia Lindqvist", role: "Head of Design", initials: "SL" },
  { name: "Arjun Mehta", role: "Head of Delivery", initials: "AM" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Kova didn't sell us software — they understood our business first. We got back a full day every week and finally see all nine stores in one place.",
    name: "Hannah Brightleaf",
    role: "Owner, Brightleaf Retail",
  },
  {
    quote:
      "They replaced our paper intake without disrupting a single clinic day. The team actually uses it — that never happened with our old tools.",
    name: "Dr. Tomas Vero",
    role: "Director, Vero Clinics",
  },
  {
    quote:
      "For the first time I can see every job site live from my phone. It paid for itself in the first two months.",
    name: "Greg Northcote",
    role: "MD, Northside Build",
  },
];

/* ------------------------------------------------------------------ */
/*  Insights                                                           */
/* ------------------------------------------------------------------ */
export const INSIGHTS = [
  {
    slug: "spreadsheets-to-systems",
    category: "Digital Transformation",
    title: "When to graduate from spreadsheets to a real system",
    excerpt: "Five signs your business has outgrown the spreadsheet — and what to do before it costs you.",
    readingTime: "6 min read",
    date: "Jun 2026",
  },
  {
    slug: "automation-roi",
    category: "Automation",
    title: "How to find the automation that actually pays back",
    excerpt: "A simple framework to spot which manual tasks are worth automating first.",
    readingTime: "5 min read",
    date: "May 2026",
  },
  {
    slug: "practical-ai-for-sme",
    category: "AI",
    title: "Practical AI for small businesses (without the hype)",
    excerpt: "Where AI quietly earns its keep for growing companies — and where it doesn't.",
    readingTime: "7 min read",
    date: "May 2026",
  },
  {
    slug: "real-time-visibility",
    category: "Business Efficiency",
    title: "Why real-time visibility changes how you run a business",
    excerpt: "The difference between last month's report and knowing what's happening right now.",
    readingTime: "4 min read",
    date: "Apr 2026",
  },
  {
    slug: "buy-vs-build",
    category: "Technology Trends",
    title: "Buy, build, or both? A decision guide for SMEs",
    excerpt: "How to choose between off-the-shelf tools and custom software — without overspending.",
    readingTime: "8 min read",
    date: "Apr 2026",
  },
  {
    slug: "change-management",
    category: "Digital Transformation",
    title: "Getting your team to actually adopt new software",
    excerpt: "The human side of transformation, and why most rollouts fail without it.",
    readingTime: "6 min read",
    date: "Mar 2026",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export const FAQS = [
  {
    q: "We're a small business — can we really afford custom software?",
    a: "Yes. We start small and target the change that pays back fastest, so the first system often funds the next. You get enterprise-grade tools at a fraction of enterprise cost, built only with what you need.",
  },
  {
    q: "How long until we see something working?",
    a: "Most clients see working software within about six weeks. We build in short, visible increments and demo every week, so you're never waiting in the dark.",
  },
  {
    q: "Will this disrupt our day-to-day operations?",
    a: "We plan rollouts carefully — migrating data, training your team, and switching over in stages. The goal is for the change to feel like an upgrade, not a disruption.",
  },
  {
    q: "Do we own what you build?",
    a: "Completely. We deliver clean, documented systems that you own outright. You're never locked in to us — though most clients choose to stay on for support and improvements.",
  },
  {
    q: "What if we don't know exactly what we need?",
    a: "That's exactly what the discovery session is for. We help you uncover where the real friction is and what's worth solving first — no commitment required.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Almost always. We connect and extend your existing tools wherever it makes sense, so you keep what works and replace only what holds you back.",
  },
];

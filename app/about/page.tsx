"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Download, GraduationCap, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";

// ---------------------------------------------------------------------------
// Inline shared UI (SectionHeading, SkillTag, Button) — self-contained
// ---------------------------------------------------------------------------

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm text-[var(--foreground)]/80 transition-colors duration-300 hover:border-amber-400/40 hover:text-[var(--foreground)]">
      {label}
    </span>
  );
}

function Button({
  href,
  children,
  variant = "primary",
  icon,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";
  const styles =
    variant === "primary"
      ? "bg-amber-400 text-black shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(251,191,36,0.5)] hover:bg-amber-300 hover:-translate-y-0.5"
      : "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-amber-400/40 hover:-translate-y-0.5";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
      {icon}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Inline mock data
// ---------------------------------------------------------------------------

interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  description: string;
  kind: "work" | "education";
}

const TIMELINE: TimelineEntry[] = [
  {
    period: "2022 — Present",
    title: "Principal Product Designer",
    org: "Fieldstone Studio",
    description:
      "Leading design systems and front-end architecture for a portfolio of fintech and climate-tech clients. Built a component library adopted across six product teams, cutting design-to-ship time by half.",
    kind: "work",
  },
  {
    period: "2019 — 2022",
    title: "Senior Product Designer",
    org: "Northlight Software",
    description:
      "Owned the end-to-end design and front-end implementation of the flagship analytics dashboard, from research through motion polish. Partnered directly with engineering to keep design and code in lockstep.",
    kind: "work",
  },
  {
    period: "2017 — 2019",
    title: "Product Designer",
    org: "Kettle & Co.",
    description:
      "Designed and coded marketing sites and onboarding flows for early-stage startups. Shipped over twenty production builds, several still live and largely unchanged years later.",
    kind: "work",
  },
  {
    period: "2013 — 2017",
    title: "B.F.A., Graphic Design",
    org: "Rhode Island School of Design",
    description:
      "Focused on typography and interaction design. Senior thesis explored how motion timing changes perceived trust in digital interfaces, later the seed for a career bridging design and code.",
    kind: "education",
  },
];

interface SkillItem {
  name: string;
  level: number;
}

interface SkillGroup {
  category: string;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Design",
    skills: [
      { name: "Interaction Design", level: 96 },
      { name: "Design Systems", level: 92 },
      { name: "Motion & Prototyping", level: 88 },
      { name: "Visual Identity", level: 80 },
    ],
  },
  {
    category: "Front-end Engineering",
    skills: [
      { name: "TypeScript & React", level: 90 },
      { name: "Next.js", level: 87 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Framer Motion", level: 84 },
    ],
  },
  {
    category: "Tools & Workflow",
    skills: [
      { name: "Figma", level: 95 },
      { name: "Git & Code Review", level: 85 },
      { name: "Accessibility Auditing", level: 82 },
    ],
  },
];

const SKILL_TAGS = [
  "Design Systems",
  "Prototyping",
  "TypeScript",
  "React",
  "Next.js",
  "Motion Design",
  "Accessibility",
  "Design Ops",
  "User Research",
  "Figma",
];

const barVariant: Variants = {
  hidden: { width: 0 },
  visible: (level: number) => ({
    width: `${level}%`,
    transition: { duration: 0.9, ease: "easeOut" },
  }),
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* AboutHero */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-[var(--border)] px-6 pt-28 pb-20 md:pt-36 md:pb-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-amber-400/10 blur-3xl"
          />
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-400"
              >
                About {BRAND.shortName}
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight text-balance"
              >
                Design that survives contact with real engineering.
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty"
              >
                I&apos;m {BRAND.name}, a product designer and front-end
                engineer. For over a decade I&apos;ve worked at the seam
                between the two disciplines, where good intentions usually
                fall apart, and made sure they don&apos;t.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                  Start a project
                </Button>
                <Button href="/projects" variant="secondary">
                  View my work
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.3),0_24px_48px_-24px_rgba(0,0,0,0.6)]"
            >
              <Image
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c35e092652f44bda85de858761a5609d.jpg"
                alt={`Portrait of ${BRAND.name}`}
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* BioSection */}
      <Reveal>
        <section className="border-b border-[var(--border)] px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div className="relative order-2 mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.3),0_24px_48px_-24px_rgba(0,0,0,0.6)] md:order-1">
              <Image
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/396d3d6ac6b64a7397b02a0ae2ad947d.JPG"
                alt={`${BRAND.name} working at a desk`}
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <SectionHeading eyebrow="Biography" title="A career built on the seam between design and code" />
              <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
                <p>
                  I started as a graphic designer with an unhealthy curiosity
                  about how things actually got built. That curiosity turned
                  into a decade of shipping interfaces where I owned both the
                  Figma file and the pull request, which taught me that the
                  best design decisions are the ones that hold up once real
                  data, real latency, and real constraints show up.
                </p>
                <p>
                  My practice sits across product design, design systems, and
                  front-end engineering. I care most about the details that
                  compound: type rhythm, motion timing, the exact easing on a
                  hover state. Individually small, together they&apos;re the
                  difference between a product that feels considered and one
                  that feels assembled.
                </p>
                <p>
                  These days I split my time between hands-on client work at
                  Fieldstone Studio and building small, opinionated design
                  systems that let teams move fast without the interface
                  falling apart under pressure. When I&apos;m not at a
                  keyboard, I&apos;m usually rebuilding something in my
                  workshop that didn&apos;t strictly need rebuilding.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ExperienceTimeline */}
      <Reveal>
        <section className="border-b border-[var(--border)] bg-[var(--card)]/40 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="Experience"
              title="Where the work happened"
              description="A working history across studios, product teams, and the design school that started it all."
            />
            <ol className="relative mt-14 space-y-10 border-l border-[var(--border)] pl-8">
              {TIMELINE.map((entry, i) => (
                <motion.li
                  key={entry.period + entry.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-amber-400"
                  >
                    {entry.kind === "work" ? (
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
                    {entry.period}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                    {entry.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-amber-400">{entry.org}</p>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)] text-pretty">
                    {entry.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      {/* SkillsDetailed */}
      <Reveal>
        <section className="border-b border-[var(--border)] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Capabilities"
              title="Skills, honestly rated"
              description="A breakdown of where my hands are most experienced, from interface design through to production code."
            />
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
              {SKILL_GROUPS.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: gi * 0.1 }}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                    {group.category}
                  </h3>
                  <div className="mt-6 space-y-5">
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[var(--foreground)]/90">{skill.name}</span>
                          <span className="text-[var(--muted-foreground)]">{skill.level}%</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
                          <motion.div
                            custom={skill.level}
                            variants={barVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="h-full rounded-full bg-amber-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {SKILL_TAGS.map((tag) => (
                <SkillTag key={tag} label={tag} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ResumeDownload */}
      <Reveal>
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] px-8 py-14 text-center shadow-[0_1px_2px_rgba(0,0,0,0.2),0_24px_48px_-24px_rgba(0,0,0,0.5)] md:px-16">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-400">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Full resume
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Want the complete history in one document?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base md:text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">
              Download a formatted CV covering my full work history, tools,
              and education, for reviewers, recruiters, and anyone who wants
              a version that doesn&apos;t require scrolling.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/resume-mara-solberg.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-medium text-black shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download resume (PDF)
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
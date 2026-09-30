"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Layout, FileCode, Terminal, Sparkles, Star, Calendar, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, Circle } from 'lucide-react';
import { BRAND, Project, Testimonial } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SkillCategory {
  category: string;
  items: string[];
}

interface ExperienceEntry {
  period: string;
  title: string;
  description: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    title: "Northbeam Analytics Rebuild",
    description:
      "Redesigned a data-dense analytics dashboard from the ground up, cutting time-to-insight and giving the front-end team a component library that shipped features twice as fast.",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/387e8983af8c4086892a955e0d759efd.png",
    tags: ["Product Design", "Design Systems", "Next.js"],
    href: "/projects",
    featured: true,
  },
  {
    title: "Fieldnote Design Language",
    description:
      "A token-based design system spanning web, iOS, and internal tools, built to keep a fast-moving product team visually consistent without slowing anyone down.",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/206a0406bd07423a811580d5506cedca.jpg",
    tags: ["Design Tokens", "Figma", "Documentation"],
    href: "/projects",
  },
  {
    title: "Loft & Co. Storefront",
    description:
      "A commerce experience built around editorial photography and restrained motion, tuned for conversion without feeling like a template.",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0ce1eea8263745c9ad9557db4c460d4a.webp",
    tags: ["E-commerce", "Art Direction", "Motion"],
    href: "/projects",
  },
];

const SKILLS: (SkillCategory & { icon: typeof Layout })[] = [
  {
    category: "Product Design",
    icon: Layout,
    items: ["Interaction design", "Design systems", "Rapid prototyping", "User research"],
  },
  {
    category: "Front-end Engineering",
    icon: FileCode,
    items: ["React & Next.js", "TypeScript", "Motion & interaction", "Accessibility"],
  },
  {
    category: "Systems & Tooling",
    icon: Terminal,
    items: ["Design tokens", "Component libraries", "CI/CD pipelines", "Technical documentation"],
  },
  {
    category: "Craft & Direction",
    icon: Sparkles,
    items: ["Art direction", "Brand systems", "Design critique", "Team mentorship"],
  },
];

const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "2022 — Present",
    title: "Principal Product Designer, Fieldnote Studio",
    description:
      "Leading design and front-end architecture for a portfolio of client products, from early concept through shipped, maintained systems.",
  },
  {
    period: "2019 — 2022",
    title: "Senior Design Engineer, Northbeam",
    description:
      "Owned the design-to-code pipeline for a B2B analytics product, pairing closely with engineering to keep design intent intact in production.",
  },
  {
    period: "2016 — 2019",
    title: "UI Designer, Loft & Co.",
    description:
      "Designed retail and e-commerce experiences with a focus on typography, photography, and restrained, purposeful motion.",
  },
  {
    period: "2014 — 2016",
    title: "Front-end Developer, Freelance",
    description:
      "Built and maintained marketing sites and small web apps for independent studios and early-stage founders.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mara is the rare designer who can also ship the code. Our design system finally holds together because one person understood both sides of it.",
    author: "Elin Kastrup",
    role: "VP Product, Northbeam",
  },
  {
    quote:
      "She pushed back on scope in the right places and the product was better for it. Every handoff was clean, documented, and ready to build.",
    author: "Devon Marsh",
    role: "Founder, Loft & Co.",
  },
  {
    quote:
      "Rare to find someone who treats craft and deadlines as equally non-negotiable. The work speaks for itself.",
    author: "Priya Chandran",
    role: "Head of Design, Fieldnote Studio",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(email ?? "").trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm text-[var(--muted-foreground)]"
          >
            <Circle className="h-2 w-2 fill-[var(--primary)] text-[var(--primary)]" aria-hidden="true" />
            Available for select projects
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-balance text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl"
          >
            {BRAND?.name ?? "Portfolio"}, product designer and front-end builder.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]"
          >
            {BRAND?.tagline ?? "Designing and building thoughtful digital products."} I partner with founders and product teams to design and ship interfaces that hold up in production.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none"
            >
              View work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none"
            >
              Get in touch
            </Link>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--foreground)] focus-visible:outline-none"
            >
              Download résumé
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
          <Reveal>
            <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Selected work
                </h2>
                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-[var(--muted-foreground)]">
                  A few projects that show the range between systems thinking and finished, shipped detail.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-transform duration-300 hover:translate-x-0.5"
              >
                All projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {(FEATURED_PROJECTS ?? []).map((project, index) => (
              <Reveal key={project?.title ?? index} delay={index * 0.1}>
                <Link
                  href={project?.href ?? "/projects"}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/40",
                    project?.featured ? "md:col-span-1" : ""
                  )}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={project?.image ?? "/placeholder.png"}
                      alt={project?.title ?? "Project image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      {project?.title ?? "Untitled project"}
                    </h3>
                    <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {project?.description ?? ""}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(project?.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted-foreground)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="mb-14 max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Skills & tools
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-[var(--muted-foreground)]">
              A working toolkit built across design and engineering, kept sharp on real client work.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(SKILLS ?? []).map((skill, index) => {
            const Icon = skill?.icon ?? Layout;
            return (
              <Reveal key={skill?.category ?? index} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {skill?.category ?? "Skill"}
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {(skill?.items ?? []).map((item) => (
                      <li key={item} className="text-sm text-[var(--muted-foreground)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
          <Reveal>
            <div className="mb-14 max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Experience
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-[var(--muted-foreground)]">
                A decade of studio and in-house work, moving between hands-on design and technical delivery.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-col divide-y divide-[var(--border)]">
            {(EXPERIENCE ?? []).map((entry, index) => (
              <Reveal key={entry?.title ?? index} delay={index * 0.06}>
                <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[200px_1fr]">
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)]">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {entry?.period ?? ""}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">
                      {entry?.title ?? ""}
                    </h3>
                    <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {entry?.description ?? ""}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="mb-14 max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              What people say
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-[var(--muted-foreground)]">
              Feedback from partners and teams I've worked closely with.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {(TESTIMONIALS ?? []).map((testimonial, index) => (
            <Reveal key={testimonial?.author ?? index} delay={index * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="mb-4 flex gap-1 text-[var(--primary)]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="flex-1 text-pretty text-sm leading-relaxed text-[var(--foreground)]">
                  &ldquo;{testimonial?.quote ?? ""}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-[var(--foreground)]">
                    {testimonial?.author ?? "Anonymous"}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {testimonial?.role ?? ""}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter / Contact CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-10 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                  Get occasional updates
                </h2>
                <p className="mt-3 max-w-md text-pretty leading-relaxed text-[var(--muted-foreground)]">
                  New case studies and writing on design systems, sent a few times a year. No spam.
                </p>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email ?? ""}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Subscribe
                </button>
              </form>
            </div>
            {submitted && (
              <p className="mt-4 text-sm text-[var(--primary)]">
                Thanks for subscribing.
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}

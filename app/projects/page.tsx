"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, SlidersHorizontal, Check, Star, Layers, Compass, Hammer, Rocket, Quote } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  year: number;
  href: string;
  featured?: boolean;
  size: "lg" | "md" | "sm";
}

const PROJECTS: ProjectItem[] = [
  {
    id: "northwind-banking",
    title: "Northwind Banking App",
    description:
      "A full redesign of a retail banking app, rebuilt around clarity in a category full of visual noise.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/f3d6e92e1cc941b298be2374ac55130a.webp",
    category: "Product Design",
    tags: ["Mobile", "Fintech", "Design System"],
    year: 2024,
    href: "#northwind-banking",
    featured: true,
    size: "lg",
  },
  {
    id: "atlas-analytics",
    title: "Atlas Analytics Dashboard",
    description: "A data-dense dashboard for operations teams, tuned for fast scanning under pressure.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/387e8983af8c4086892a955e0d759efd.png",
    category: "Web App",
    tags: ["Dashboard", "B2B", "Data Viz"],
    year: 2024,
    href: "#atlas-analytics",
    size: "md",
  },
  {
    id: "fieldnote-brand",
    title: "Fieldnote Identity",
    description: "Brand identity and packaging system for an independent stationery studio.",
    image: "https://picsum.photos/seed/0d8ff9abba62/800/600",
    category: "Brand Identity",
    tags: ["Logo", "Print", "Packaging"],
    year: 2023,
    href: "#fieldnote-brand",
    size: "sm",
  },
  {
    id: "loom-design-system",
    title: "Loom Design System",
    description: "A component library and token set shared across four internal product teams.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/cc76b200f24e4335b2bb75651089f4c0.webp",
    category: "Design System",
    tags: ["Components", "Tokens", "Documentation"],
    year: 2023,
    href: "#loom-design-system",
    size: "md",
  },
  {
    id: "harbor-marketplace",
    title: "Harbor Marketplace",
    description: "A two-sided marketplace redesign focused on trust signals and faster checkout.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a1f836c51aea4709bff65081757195a8.png",
    category: "Web App",
    tags: ["E-commerce", "Web", "Checkout"],
    year: 2022,
    href: "#harbor-marketplace",
    size: "sm",
  },
  {
    id: "pace-fitness",
    title: "Pace Fitness Companion",
    description: "A training companion app for endurance athletes, built with a coach in the loop.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/24e7fa0f8e88444599678542cb36657d.jpg",
    category: "Product Design",
    tags: ["Mobile", "iOS", "Health"],
    year: 2022,
    href: "#pace-fitness",
    size: "md",
  },
  {
    id: "solstice-editorial",
    title: "Solstice Editorial Site",
    description: "An editorial publication redesign, rebuilt for long-form reading on any device.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0564d01c24054867a9f49ca1b48636e3.jpg",
    category: "Web App",
    tags: ["Editorial", "Web", "Typography"],
    year: 2021,
    href: "#solstice-editorial",
    size: "sm",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))] as const;
type Category = (typeof CATEGORIES)[number];

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "az", label: "A to Z" },
] as const;
type SortKey = (typeof SORT_OPTIONS)[number]["key"];

const SIZE_CLASSES: Record<ProjectItem["size"], string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:row-span-2",
  sm: "sm:row-span-1",
};

const IMAGE_HEIGHT: Record<ProjectItem["size"], string> = {
  lg: "h-72 sm:h-full",
  md: "h-56 sm:h-full",
  sm: "h-48 sm:h-full",
};

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
      {label}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty leading-relaxed text-[hsl(var(--muted-foreground))]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_16px_36px_-12px_rgba(0,0,0,0.35)]",
        SIZE_CLASSES[project.size],
      )}
    >
      <Link href={project.href} className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
        <div className={cn("relative w-full overflow-hidden", IMAGE_HEIGHT[project.size])}>
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          {project.featured ? (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-black">
              <Star className="h-3 w-3" aria-hidden="true" />
              Featured
            </span>
          ) : null}
          <span className="absolute right-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {project.year}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
              {project.title}
            </h3>
            <ArrowUpRight
              className="mt-1 h-5 w-5 shrink-0 text-[hsl(var(--muted-foreground))] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <SkillTag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const PROCESS_STEPS = [
  {
    icon: Compass,
    title: "Discovery",
    description:
      "Sat with the support team for a week to log every account holder complaint about the old app, then mapped the friction points to redesign priorities.",
  },
  {
    icon: Layers,
    title: "Design",
    description:
      "Rebuilt the information hierarchy around three tasks people actually do daily: check balance, move money, review activity. Everything else moved a layer down.",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Paired with two engineers to translate the new component set into a token-based library, so the visual language and the codebase stayed in lockstep.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "Shipped in a phased rollout to a subset of account holders first, collected feedback directly in-app, and refined the transfer flow before the full release.",
  },
];

const OUTCOMES = [
  "The transfer flow went from five screens to two, removing the steps people most often abandoned midway.",
  "Support tickets referencing 'can't find' dropped noticeably after the navigation rebuild, based on the support team's own tagging.",
  "The new component library became the default starting point for two other teams inside the bank within the same quarter.",
];

const GALLERY_IMAGES = [
  { src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/19e5953d17c64804994f0eda768ff2e3.webp", alt: "Northwind Banking home screen redesign" },
  { src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c743fe7aca5747f890e2cbe4f3363ca4.png", alt: "Northwind Banking money transfer flow" },
  { src: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ec4c0ca2658d42b4b11bb6b53da34670.png", alt: "Northwind Banking dark mode account view" },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortKey>("featured");

  const filteredProjects = useMemo(() => {
    const scoped =
      activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

    const sorted = [...scoped];
    if (sortBy === "featured") {
      sorted.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.year - a.year);
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => b.year - a.year);
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [activeCategory, sortBy]);

  const caseStudy = PROJECTS.find((p) => p.id === "northwind-banking") ?? PROJECTS[0];

  return (
    <main className="bg-[hsl(var(--background))]">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-[hsl(var(--border))] px-6 py-24 sm:px-10 md:py-32">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-40"
            style={{
              background:
                "radial-gradient(600px circle at 15% 20%, var(--accent), transparent 60%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-5xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Selected work
            </span>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl md:text-6xl">
              Projects built to survive contact with real users
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              A working record of {BRAND.name.split(" ")[0]}&apos;s product design and front-end
              engineering, spanning fintech, tooling, and editorial work. Filter by discipline or
              sort to browse chronologically.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Filter + sort controls */}
      <Reveal delay={0.05}>
        <section className="border-b border-[hsl(var(--border))] px-6 py-8 sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 ease-out",
                    activeCategory === category
                      ? "border-transparent bg-[var(--accent)] text-black"
                      : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[hsl(var(--muted-foreground))]" aria-hidden="true" />
              <div
                className="flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-1"
                role="group"
                aria-label="Sort projects"
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setSortBy(option.key)}
                    aria-pressed={sortBy === option.key}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ease-out",
                      sortBy === option.key
                        ? "bg-[var(--accent)] text-black"
                        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Masonry-style project grid */}
      <section className="px-6 py-20 sm:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-6 sm:auto-rows-[14rem] sm:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 ? (
            <p className="mt-12 text-center text-[hsl(var(--muted-foreground))]">
              No projects match this filter yet. Try a different category.
            </p>
          ) : null}
        </div>
      </section>

      {/* Inline case study detail */}
      <Reveal>
        <section className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-24 sm:px-10 md:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Case study"
              title={caseStudy.title}
              description={caseStudy.description}
            />

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.3)]">
                  <img
                    src={caseStudy.image}
                    alt={`${caseStudy.title} primary screen`}
                    className="h-72 w-full object-cover sm:h-96"
                  />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {GALLERY_IMAGES.map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-xl border border-[hsl(var(--border))]"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-24 w-full object-cover sm:h-32"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    Outcomes
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {OUTCOMES.map((outcome) => (
                      <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-[hsl(var(--foreground))]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6">
                  <Quote className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-[hsl(var(--foreground))]">
                    &ldquo;The redesign made our support queue quieter in the best possible way, people
                    stopped needing to ask us how to do things.&rdquo;
                  </p>
                  <footer className="mt-4 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                    Head of Digital Banking, Northwind
                  </footer>
                </blockquote>

                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
                >
                  Discuss a project like this
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={index * 0.08}>
                    <div className="h-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/15">
                        <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                      </div>
                      <h4 className="mt-4 text-base font-semibold text-[hsl(var(--foreground))]">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
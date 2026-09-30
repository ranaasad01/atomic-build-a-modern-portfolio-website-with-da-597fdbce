import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Layout, FileCode, Terminal, Sparkles, Star, Calendar, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, Circle } from 'lucide-react';
import { BRAND, Project, Testimonial } from "@/lib/data";
type SkillCategory = any;
const SkillCategory: any = [];
type ExperienceEntry = any;
const ExperienceEntry: any = [];
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const FEATURED_PROJECTS: Project[] = [
  {
    title: "Northbeam Analytics Rebuild",
    description:
      "Redesigned a data-dense analytics dashboard from the ground up, cutting time-to-insight and giving the front-end team a component library that shipped features twice as fast.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/387e8983af8c4086892a955e0d759efd.png",
    tags: ["Product Design", "Design Systems", "Next.js"],
    href: "/projects",
    featured: true,
  },
  {
    title: "Fieldnote Design Language",
    description:
      "A token-based design system spanning web, iOS, and internal tools, built to keep a fast-moving product team visually consistent without slowing anyone down.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/206a0406bd07423a811580d5506cedca.jpg",
    tags: ["Design Tokens", "Figma", "Documentation"],
    href: "/projects",
  },
  {
    title: "Loft & Co. Storefront",
    description:
      "A commerce experience built around editorial photography and restrained motion, tuned for conversion without feeling like a template.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0ce1eea8263745c9ad9557db4c460d4a.webp",
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
      "She pushed back on scope in the right places and the product was better for it. Deadlines never slipped and quality never dropped.",
    author: "Theo Marsh",
    role: "Founder, Fieldnote Studio",
  },
  {
    quote:
      "Working with Mara felt like adding a design lead and a front-end engineer at once. The handoff friction we used to fight just disappeared.",
    author: "Priya Anand",
    role: "Head of Engineering, Loft & Co.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-zinc-950 text-zinc-100">
      {/* HERO */}
      <Reveal>
        <section
          id="hero"
          className="relative overflow-hidden border-b border-white/10 bg-zinc-950 px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-amber-400/10 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
          />
          <div className="relative mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start gap-6"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-zinc-300"
              >
                <Circle className="h-2 w-2 fill-amber-400 text-amber-400" aria-hidden="true" />
                Available for new projects
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl md:text-6xl"
              >
                {BRAND.name}, product designer and front-end engineer.
              </motion.h1>

              <motion.p variants={fadeInUp} className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
                {BRAND.tagline}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-all duration-300 ease-out hover:bg-amber-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(251,191,36,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  View projects
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-zinc-100 transition-all duration-300 ease-out hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  Start a project
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-4 text-zinc-500">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="transition-colors duration-300 hover:text-zinc-100"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter profile"
                  className="transition-colors duration-300 hover:text-zinc-100"
                >
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="transition-colors duration-300 hover:text-zinc-100"
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.3),0_24px_48px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/5">
                <Image
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c35e092652f44bda85de858761a5609d.jpg"
                  alt={`Portrait of ${BRAND.name}`}
                  width={480}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/90 px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.3),0_16px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-medium text-zinc-400">Currently building</p>
                  <p className="text-sm font-semibold text-zinc-100">Fieldnote Design Language</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* FEATURED WORK */}
      <section id="work" className="border-b border-white/10 bg-zinc-950 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-amber-400">Selected work</p>
              <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                Products shaped end to end, from first sketch to shipped code.
              </h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:text-amber-400"
            >
              See all projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {FEATURED_PROJECTS.map((project, i) => (
              <Reveal
                key={project.title}
                delay={i * 0.1}
                className={cn(project.featured ? "md:col-span-2" : "md:col-span-1")}
              >
                <Link
                  href={project.href}
                  className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_20px_40px_-12px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <div className={cn("relative w-full overflow-hidden", project.featured ? "aspect-[21/9]" : "aspect-[16/10]")}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent" />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-50">{project.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-400">{project.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS / APPROACH */}
      <section id="skills" className="border-b border-white/10 bg-zinc-900/40 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-amber-400">How I work</p>
            <h2 className="mt-3 max-w-md text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Design and engineering under one roof, not handed off between teams.
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-zinc-400">
              Most gaps between a mockup and a shipped feature come from a handoff. I close that gap by doing both, so
              the details survive contact with real code.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <Reveal key={skill.category} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-zinc-950/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:border-white/20">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-zinc-50">{skill.category}</h3>
                    <ul className="mt-3 flex flex-col gap-2">
                      {skill.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                          <Circle className="h-1.5 w-1.5 fill-zinc-600 text-zinc-600" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section id="experience" className="border-b border-white/10 bg-zinc-950 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-amber-400">Path so far</p>
            <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              A decade moving between design tools and a code editor.
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col">
            {EXPERIENCE.map((entry, i) => (
              <Reveal key={entry.title} delay={i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 py-8 first:border-t-0 sm:grid-cols-[180px_1fr]">
                  <div className="flex items-start gap-2 text-sm font-medium text-zinc-500">
                    <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{entry.period}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-50">{entry.title}</h3>
                    <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-zinc-400">{entry.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="border-b border-white/10 bg-zinc-900/40 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-amber-400">What people say</p>
            <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Feedback from the people I've shipped with.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal key={testimonial.author} delay={i * 0.1} className="h-full">
                <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-zinc-950/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.35)]">
                  <div>
                    <div className="flex gap-1 text-amber-400">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-pretty leading-relaxed text-zinc-300">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  <figcaption className="border-t border-white/10 pt-4">
                    <p className="text-sm font-semibold text-zinc-50">{testimonial.author}</p>
                    <p className="text-sm text-zinc-500">{testimonial.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact-cta" className="relative overflow-hidden bg-zinc-950 px-6 py-24 md:px-10 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[120px]"
        />
        <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-zinc-300">
            <Mail className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            Currently booking Q3 projects
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Have a product that needs design and code to move together?
          </h2>
          <p className="max-w-xl text-pretty leading-relaxed text-zinc-400">
            Tell me about the problem you're solving. I'll reply within a couple of days with honest thoughts on scope
            and fit.
          </p>
          <Link
            href="/contact"
            className="group mt-2 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(251,191,36,0.5)] transition-all duration-300 ease-out hover:bg-amber-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_32px_-8px_rgba(251,191,36,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
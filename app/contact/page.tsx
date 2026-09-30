"use client";

import { useState, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, Clock, Info, ArrowRight, Check, AlertTriangle, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// ---------------------------------------------------------------------------
// Local data
// ---------------------------------------------------------------------------

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@marasolberg.design",
    href: "mailto:hello@marasolberg.design",
  },
  {
    icon: Info,
    label: "Location",
    value: "Oslo, Norway — remote friendly",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Usually within one business day",
    href: undefined,
  },
] as const;

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
] as const;

const FAQ_ITEMS = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "Product design systems, front-end builds for launches, and short embedded stints with in-house teams that need an extra senior hand.",
  },
  {
    question: "What's the typical timeline?",
    answer:
      "Most engagements run four to ten weeks depending on scope. I'll give you a realistic estimate after a short scoping call, not before.",
  },
  {
    question: "Do you work with early-stage teams?",
    answer:
      "Yes. I keep a couple of slots open each quarter for smaller teams and founders who need design and build work done properly the first time.",
  },
  {
    question: "Are you open to remote-only collaboration?",
    answer:
      "Entirely. I've worked with teams across four time zones and default to async-first communication with a weekly sync call.",
  },
] as const;

const SUBJECT_OPTIONS = [
  "New project inquiry",
  "Collaboration",
  "Speaking or writing",
  "Something else",
] as const;

// ---------------------------------------------------------------------------
// Form types & helpers
// ---------------------------------------------------------------------------

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm(values: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please share your name.";
  }

  if (!values.email.trim()) {
    errors.email = "An email address is required.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Pick a subject so I know where to start.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell me a little about the project.";
  } else if (values.message.trim().length < 20) {
    errors.message = "A few more details would help (20 characters minimum).";
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Small shared building blocks (self-contained to this page)
// ---------------------------------------------------------------------------

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
      <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-pretty leading-relaxed text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  onClick,
}: {
  children: ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "ghost";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-60";
  const variants: Record<string, string> = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:brightness-110",
    ghost:
      "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--card)]",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

function FormInput({
  id,
  label,
  error,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
          error ? "border-red-400/60" : "border-[var(--border)]"
        }`}
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </span>
      ) : null}
    </div>
  );
}

function FormTextarea({
  id,
  label,
  error,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        rows={6}
        className={`w-full resize-none rounded-xl border bg-[var(--background)] px-4 py-3 text-sm leading-relaxed text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
          error ? "border-red-400/60" : "border-[var(--border)]"
        }`}
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </span>
      ) : null}
    </div>
  );
}

function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-3">
      {SOCIAL_LINKS.map((social) => {
        const IconComponent = social.icon;
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-all duration-300 ease-out hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
            >
              <IconComponent className="h-4.5 w-4.5" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const heroText: Variants = fadeInUp;

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange =
    (field: keyof ContactFormState) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const nextValue = event.target.value;
      setValues((prev) => ({ ...prev, [field]: nextValue }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-[var(--border)] px-6 py-24 md:py-32">
          <div
            className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[var(--accent)]/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-5xl">
            <motion.span
              variants={heroText}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              Currently booking Q3 projects
            </motion.span>
            <motion.h1
              variants={heroText}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
            >
              Let&apos;s talk about the work you want built well.
            </motion.h1>
            <motion.p
              variants={heroText}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.16 }}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]"
            >
              Whether it&apos;s a new product to design from scratch, a front-end build that
              needs a steady hand, or just a question about how something was made, the form
              below reaches me directly. No account managers in between.
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* Split: form + info */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                Fill in the details below. The more context you give, the faster I can give
                you a useful answer.
              </p>

              {status === "success" ? (
                <div className="mt-8 flex flex-col items-start gap-3 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-base font-medium text-[var(--foreground)]">
                    Message sent. Thank you.
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                    I&apos;ll reply from hello@marasolberg.design within one business day.
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setValues({ name: "", email: "", subject: "", message: "" });
                      setStatus("idle");
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormInput
                      id="contact-name"
                      label="Name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jordan Avery"
                      value={values.name}
                      onChange={handleChange("name")}
                      error={errors.name}
                    />
                    <FormInput
                      id="contact-email"
                      label="Email"
                      type="email"
                      autoComplete="email"
                      placeholder="jordan@studio.com"
                      value={values.email}
                      onChange={handleChange("email")}
                      error={errors.email}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-subject" className="text-sm font-medium text-[var(--foreground)]">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      value={values.subject}
                      onChange={handleChange("subject")}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                      className={`w-full rounded-xl border bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                        errors.subject ? "border-red-400/60" : "border-[var(--border)]"
                      }`}
                    >
                      <option value="" disabled>
                        Choose a subject
                      </option>
                      {SUBJECT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.subject ? (
                      <span
                        id="contact-subject-error"
                        className="flex items-center gap-1.5 text-xs text-red-400"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.subject}
                      </span>
                    ) : null}
                  </div>

                  <FormTextarea
                    id="contact-message"
                    label="Message"
                    placeholder="A little about your project, timeline, and budget range."
                    value={values.message}
                    onChange={handleChange("message")}
                    error={errors.message}
                  />

                  <div className="mt-2 flex items-center gap-4">
                    <Button type="submit" disabled={status === "submitting"}>
                      {status === "submitting" ? "Sending…" : "Send message"}
                      {status !== "submitting" ? (
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      ) : null}
                    </Button>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      Fields marked are required.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Direct details</h2>
                <ul className="mt-5 flex flex-col gap-4">
                  {CONTACT_INFO.map((info) => {
                    const IconComponent = info.icon;
                    const content = (
                      <span className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--accent)]">
                          <IconComponent className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                            {info.label}
                          </span>
                          <span className="text-sm font-medium text-[var(--foreground)]">
                            {info.value}
                          </span>
                        </span>
                      </span>
                    );
                    return (
                      <li key={info.label}>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="block rounded-xl transition-colors duration-300 ease-out hover:text-[var(--accent)]"
                          >
                            {content}
                          </a>
                        ) : (
                          content
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="border-t border-[var(--border)] pt-8">
                <h2 className="text-xl font-semibold tracking-tight">Find me elsewhere</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Code, writing, and the occasional case study breakdown.
                </p>
                <div className="mt-5">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <Reveal>
        <section className="border-t border-[var(--border)] bg-[var(--card)] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="Before you write in"
              title="A few things people usually ask"
              description="Quick answers to the questions that come up most before a first call."
            />
            <motion.dl
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-12 grid gap-8 sm:grid-cols-2"
            >
              {FAQ_ITEMS.map((item) => (
                <motion.div
                  key={item.question}
                  variants={fadeInUp}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
                >
                  <dt className="text-base font-semibold text-[var(--foreground)]">
                    {item.question}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {item.answer}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
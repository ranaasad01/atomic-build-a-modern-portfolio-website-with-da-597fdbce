"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, Circle, Square, ArrowUp, Mail, type LucideIcon } from 'lucide-react';
import { navLinks, socialLinks, BRAND } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Dribbble: Circle,
  Instagram: Square,
};

function getSocialIcon(label: string): LucideIcon {
  return ICONS[label] ?? Circle;
}

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const navT = (t.raw("nav") ?? {}) as Record<string, string>;

  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6 py-16 md:px-8"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--primary)]"
            >
              {navT.brand ?? BRAND.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
              {t("footer.description")}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t("footer.contactCta")}
            </Link>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              {t("footer.quickLinksHeading")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={resolveHref(link.href)}
                    onClick={
                      link.href.startsWith("#")
                        ? (event) => handleAnchorClick(event, link.href)
                        : undefined
                    }
                    className="text-sm text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--primary)]"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              {t("footer.socialHeading")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {socialLinks.map((social) => {
                const Icon = getSocialIcon(social.label);
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--primary)]"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--muted-foreground)]">
            &copy; {navT.brand ?? BRAND.name}. {t("footer.rights")}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t("footer.backToTop")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--muted-foreground)] transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            {t("footer.backToTop")}
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
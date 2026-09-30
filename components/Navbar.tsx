"use client";
import { MouseEvent, useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <Link
          href="/"
          className="rounded-sm text-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--primary)] focus-visible:outline-none"
        >
          {navT.brand ?? BRAND.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isSection = link.href.startsWith("#");
            const resolvedHref = resolveHref(link.href);
            const isActive =
              !isSection &&
              (pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href)));
            return (
              <li key={link.key}>
                <Link
                  href={resolvedHref}
                  onClick={
                    isSection
                      ? (event) => handleAnchorClick(event, link.href)
                      : undefined
                  }
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none ${
                    isActive
                      ? "text-[var(--background)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--primary)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {navT[link.key] ?? link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none md:inline-flex"
        >
          {navT.contact ?? "Contact"}
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? navT.closeMenu ?? "Close menu" : navT.openMenu ?? "Open menu"}
          aria-expanded={mobileOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => {
                const isSection = link.href.startsWith("#");
                const resolvedHref = resolveHref(link.href);
                return (
                  <li key={link.key}>
                    <Link
                      href={resolvedHref}
                      onClick={
                        isSection
                          ? (event) => handleAnchorClick(event, link.href)
                          : undefined
                      }
                      className="block rounded-lg px-3 py-3 text-base font-medium text-[var(--foreground)] transition-colors duration-300 hover:bg-[var(--card)] hover:text-[var(--primary)]"
                    >
                      {navT[link.key] ?? link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a modern portfolio website with dark mode

## Goal
Build a modern minimal-editorial portfolio website with dark mode, featuring a homepage, projects, about, and contact pages.

## Project type
portfolio

## Design system — match this exactly
- Color tokens: `--background: #0E0F0C`, `--foreground: #F3F2EC`, `--card: #17180F`, `--border: #2B2C21`, `--muted-foreground: #A6A899`, `--primary: #D9FF66`, `--accent: #FF6A3D`
- Fonts: Inter

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`footer`, `nav`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.

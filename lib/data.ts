export interface NavLink {
  label: string;
  href: string;
  key: string;
}

/**
 * Single source of truth for site navigation. Both Navbar and Footer
 * map over this array. Each entry's `key` is used ONLY for i18n lookups
 * against the `nav` namespace in messages/<locale>.json.
 */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: "Dribbble", handle: "@studio.noir", href: "https://dribbble.com/studio.noir" },
  { label: "GitHub", handle: "github.com/studionoir", href: "https://github.com/studionoir" },
  { label: "LinkedIn", handle: "linkedin.com/in/studionoir", href: "https://linkedin.com/in/studionoir" },
  { label: "Instagram", handle: "@studio.noir.works", href: "https://instagram.com/studio.noir.works" },
];

export const BRAND = {
  name: "Studio Noir",
  tagline: "Product design & front-end craft, shipped with care.",
  email: "hello@studio-noir.dev",
};

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}
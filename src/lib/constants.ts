export const SITE_CONFIG = {
  name: "M3 Consultants",
  url: "https://m3-consultants.net",
  address: {
    street: "Cocody-Riviera III",
    city: "Abidjan",
    country: "Côte d'Ivoire",
  },
  phones: ["+225 07 08 64 29 66", "+225 01 43 72 41 41", "(225) 27 22 55 48 70"],
  emails: ["cabinet@m3-consultants.net", "marmao@m3-consultants.net"],
  socials: {
    linkedin: "#",
  },
} as const;

export const NAV_LINKS = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "team", href: "/team" },
  // { key: "blog", href: "/blog" }, // feature-flagged off
  { key: "contact", href: "/contact" },
] as const;

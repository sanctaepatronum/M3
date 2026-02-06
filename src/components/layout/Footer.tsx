"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");

  return (
    <footer className="bg-primary text-neutral-200">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo light />
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-white">
              {t("quick_links")}
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors duration-300 hover:text-accent-light"
                  >
                    {navT(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-white">
              {t("contact_us")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm text-neutral-400">
                  {SITE_CONFIG.address.street}
                  <br />
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-accent" />
                <div className="space-y-1">
                  {SITE_CONFIG.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-sm text-neutral-400 transition-colors hover:text-accent-light"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
                <div className="space-y-1">
                  {SITE_CONFIG.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-sm text-neutral-400 transition-colors hover:text-accent-light"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-white">
              {t("newsletter.heading")}
            </h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="rounded-sm border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-neutral-400 focus:border-accent focus:ring-0"
              />
              <button
                type="submit"
                className="rounded-sm bg-gradient-to-r from-magenta to-accent px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              >
                {t("newsletter.button")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-neutral-400">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </Container>
    </footer>
  );
}

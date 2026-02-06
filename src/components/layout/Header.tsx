"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-colors duration-500",
          isScrolled
            ? "bg-primary/95 shadow-lg backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo light />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "relative text-[15px] font-medium tracking-wide uppercase transition-colors duration-300",
                  isScrolled
                    ? "text-neutral-200 hover:text-white"
                    : "text-neutral-200 hover:text-white",
                  "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right side: Language switcher + CTA + Mobile menu */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <LanguageSwitcher light />
            </div>
            <div className="hidden lg:block">
              <Button href="/contact" variant="primary" size="sm" magnetic={false}>
                {t("cta")}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white transition-colors hover:text-accent-light lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

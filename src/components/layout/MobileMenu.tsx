"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-80 flex-col bg-primary p-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="mb-12 self-end text-neutral-200 transition-colors hover:text-white"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 font-heading text-2xl font-semibold text-neutral-200 transition-colors hover:text-accent-light"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Language switcher */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 border-t border-white/10 pt-6"
            >
              <LanguageSwitcher light />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

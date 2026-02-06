"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-mesh-dark">
      {/* Decorative thin gradient line */}
      <div className="absolute top-1/4 right-0 h-[400px] w-[1px] bg-gradient-to-b from-transparent via-magenta/15 to-transparent" />
      <div className="absolute top-0 right-[15%] h-[1px] w-[200px] bg-gradient-to-r from-transparent via-purple/10 to-transparent" />

      <Container className="relative z-10 py-32 lg:py-0">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Content */}
          <div>
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="h-[1px] w-12 bg-champagne" />
              <span className="text-sm font-medium tracking-widest uppercase text-champagne">
                M3 Consultants
              </span>
            </motion.div>

            {/* Headline */}
            <TextReveal
              text={t("title")}
              as="h1"
              className="font-heading text-5xl font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
              delay={0.4}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-200/80 lg:text-xl"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button href="/services" variant="primary" size="lg">
                {t("cta_primary")}
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                {t("cta_secondary")}
              </Button>
            </motion.div>
          </div>

          {/* Right: Ghosted M3 */}
          <div className="pointer-events-none hidden select-none justify-end lg:flex">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-accent text-[20rem] leading-none font-light text-champagne/[0.03]"
            >
              M3
            </motion.span>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-champagne/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

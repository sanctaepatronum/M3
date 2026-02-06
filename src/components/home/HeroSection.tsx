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
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/50 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-magenta)_0%,_transparent_50%)] opacity-[0.08]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-accent)_0%,_transparent_50%)] opacity-[0.06]" />

      {/* Decorative geometric elements */}
      <div className="absolute top-1/4 right-0 h-[500px] w-[1px] bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
      <div className="absolute top-0 right-[15%] h-[1px] w-[200px] bg-gradient-to-r from-transparent via-magenta/20 to-transparent" />
      <div className="absolute bottom-[20%] right-[10%] h-64 w-64 rounded-full border border-accent/10" />
      <div className="absolute bottom-[25%] right-[12%] h-48 w-48 rounded-full border border-magenta/5" />

      <Container className="relative z-10 py-32 lg:py-0">
        <div className="max-w-3xl">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-sm font-medium tracking-widest uppercase text-accent">
              M3 Consultants
            </span>
          </motion.div>

          {/* Headline */}
          <TextReveal
            text={t("title")}
            as="h1"
            className="font-heading text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
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
          <ChevronDown size={24} className="text-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

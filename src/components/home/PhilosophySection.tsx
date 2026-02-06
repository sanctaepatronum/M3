"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";

export default function PhilosophySection() {
  const t = useTranslations("home.philosophy");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-mesh-light py-24 lg:py-32">
      <Container className="text-center">
        {/* Decorative quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 text-[10rem] leading-none font-light text-champagne/20 select-none"
        >
          &ldquo;
        </motion.div>

        {/* Quote */}
        <FadeIn delay={0.2}>
          <blockquote className="mx-auto max-w-3xl">
            <p className="font-accent text-2xl leading-relaxed font-light italic text-neutral-700 md:text-3xl lg:text-[2rem]">
              {t("quote")}
            </p>
            <footer className="mt-6">
              <span className="text-sm font-medium tracking-wider uppercase text-champagne">
                — {t("attribution")}
              </span>
            </footer>
          </blockquote>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.4}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-neutral-400">
            {t("description")}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}

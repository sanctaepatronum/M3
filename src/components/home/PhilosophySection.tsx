"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import SlideIn from "@/components/animations/SlideIn";

export default function PhilosophySection() {
  const t = useTranslations("home.philosophy");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-mesh-light py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left: Image */}
          <SlideIn from="left">
            <div className="relative">
              <img
                src="/images/about/philosophy.jpg"
                alt="M3 Consultants — Excellence"
                className="aspect-[3/4] w-full rounded-sm object-cover object-[70%_center]"
                loading="lazy"
              />
              {/* Decorative accent frame */}
              <div className="absolute -top-4 -right-4 h-full w-full rounded-sm border-2 border-champagne/15 pointer-events-none" />
              {/* Magenta accent */}
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-sm bg-magenta/10 pointer-events-none" />
            </div>
          </SlideIn>

          {/* Right: Quote */}
          <div className="text-center lg:text-left">
            {/* Decorative quote mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 text-[10rem] leading-none font-light text-champagne/20 select-none lg:mx-0 mx-auto w-fit"
            >
              &ldquo;
            </motion.div>

            {/* Quote */}
            <FadeIn delay={0.2}>
              <blockquote>
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
              <p className="mt-8 text-lg text-neutral-400">
                {t("description")}
              </p>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

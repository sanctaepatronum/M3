"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import { motion } from "framer-motion";

export default function StatsSection() {
  const t = useTranslations("home.stats");

  const stats = [
    { value: 2021, label: t("since"), prefix: t("since") + " ", isYear: true },
    { value: 50, label: t("clients"), suffix: "+" },
    { value: 200, label: t("missions"), suffix: "+" },
    { value: 4, label: t("expertise") },
  ];

  return (
    <section className="relative bg-mesh-dark py-20 lg:py-28">
      <Container className="relative z-10">
        <StaggerChildren className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItemVariants}
              className="relative text-center"
            >
              {/* Champagne divider between stats on desktop */}
              {i > 0 && (
                <div className="absolute top-1/2 left-0 hidden h-12 w-[1px] -translate-y-1/2 bg-champagne/15 lg:block" />
              )}

              <div className="font-heading text-4xl font-bold text-white lg:text-5xl">
                {stat.isYear ? (
                  <span>{stat.value}</span>
                ) : (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <p className="mt-2 text-sm tracking-wider uppercase text-champagne/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

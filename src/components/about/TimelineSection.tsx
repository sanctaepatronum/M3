"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const years = ["2021", "2022", "2023", "2024"] as const;

export default function TimelineSection() {
  const t = useTranslations("about.timeline");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <Container>
        <SectionHeading title={t("heading")} align="center" />

        <div ref={containerRef} className="relative mt-16 max-w-3xl mx-auto">
          {/* Timeline line background */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-neutral-200 md:left-1/2 md:-translate-x-1/2" />

          {/* Animated gold line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-[2px] bg-accent md:left-1/2 md:-translate-x-1/2"
          />

          {/* Timeline entries */}
          <div className="space-y-12">
            {years.map((year, i) => (
              <TimelineEntry
                key={year}
                year={year}
                title={t(`${year}.title`)}
                description={t(`${year}.description`)}
                isLeft={i % 2 === 0}
                index={i}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function TimelineEntry({
  year,
  title,
  description,
  isLeft,
  index,
}: {
  year: string;
  title: string;
  description: string;
  isLeft: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-8 pl-16 md:pl-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="absolute left-[18px] top-1 h-5 w-5 rounded-full border-[3px] border-accent bg-neutral-50 md:left-1/2 md:-translate-x-1/2"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`md:w-[calc(50%-2rem)] ${
          isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
        }`}
      >
        <span className="font-heading text-3xl font-bold text-accent">
          {year}
        </span>
        <h3 className="mt-1 font-heading text-xl font-semibold text-neutral-900">
          {title}
        </h3>
        <p className="mt-2 text-neutral-400">{description}</p>
      </motion.div>
    </div>
  );
}

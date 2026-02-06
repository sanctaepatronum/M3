"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import SectionDivider from "@/components/ui/SectionDivider";

const categories = ["all", "hr", "recruitment", "training", "ip"] as const;
const postKeys = ["post1", "post2", "post3"] as const;

export default function BlogPage() {
  const t = useTranslations("blog");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <>
      {/* Page Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-mesh-dark">
        <Container className="relative z-10 py-32 text-center">
          <TextReveal
            text={t("hero.title")}
            as="h1"
            className="justify-center font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          />
          <FadeIn delay={0.6}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-200/80">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider />

      {/* Blog Content */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <Container>
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors"
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full border border-magenta/40 bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeCategory === cat
                      ? "text-magenta"
                      : "text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  {t(`categories.${cat}`)}
                </span>
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <StaggerChildren className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {postKeys.map((postKey, i) => {
              const category = t(`sample_posts.${postKey}.category`);
              if (
                activeCategory !== "all" &&
                category !== activeCategory
              ) {
                return null;
              }

              return (
                <motion.article
                  key={postKey}
                  variants={staggerItemVariants}
                  whileHover={{ y: -6 }}
                  className={`group rounded-sm border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-xl ${
                    i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Image placeholder */}
                  <div className="aspect-[16/10] bg-neutral-200/50" />

                  <div className="p-6">
                    <span className="inline-block rounded-full bg-magenta/10 px-3 py-1 text-xs font-medium text-magenta">
                      {t(`categories.${category}`)}
                    </span>

                    <h3 className="mt-3 font-heading text-xl font-semibold text-neutral-900">
                      {t(`sample_posts.${postKey}.title`)}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {t(`sample_posts.${postKey}.excerpt`)}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-neutral-400">
                        <Clock size={12} />
                        {t(`sample_posts.${postKey}.date`)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-champagne transition-colors hover:text-accent">
                        {t("read_more")}
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </StaggerChildren>
        </Container>
      </section>
    </>
  );
}

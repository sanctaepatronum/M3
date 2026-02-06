"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import SectionDivider from "@/components/ui/SectionDivider";

export default function TeamPage() {
  const t = useTranslations("team");

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

      {/* Team Members */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <Container>
          <StaggerChildren className="grid gap-8 lg:grid-cols-2">
            {/* Dr. MAR Mao */}
            <motion.div variants={staggerItemVariants} className="group">
              <div className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-champagne/30 hover:shadow-xl">
                {/* Photo placeholder */}
                <div className="mb-6 h-48 w-full rounded-sm bg-neutral-200/60" />

                <h3 className="font-heading text-xl font-bold text-neutral-900">
                  {t("members.mao.name")}
                </h3>
                <p className="mt-1 text-sm font-medium tracking-wider uppercase text-champagne">
                  {t("members.mao.title")}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-400">
                  {t("members.mao.bio")}
                </p>

                {/* Expertise tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {(
                    t.raw("members.mao.expertise") as string[]
                  ).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-champagne/20 px-3 py-1 text-xs font-medium text-champagne"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* MAR Mamadou-Kader */}
            <motion.div variants={staggerItemVariants} className="group">
              <div className="flex h-full flex-col rounded-sm border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-champagne/30 hover:shadow-xl">
                {/* Photo placeholder */}
                <div className="mb-6 h-48 w-full rounded-sm bg-neutral-200/60" />

                <h3 className="font-heading text-xl font-bold text-neutral-900">
                  {t("members.kader.name")}
                </h3>
                <p className="mt-1 text-sm font-medium tracking-wider uppercase text-champagne">
                  {t("members.kader.title")}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-400">
                  {t("members.kader.bio")}
                </p>

                {/* Expertise tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {(
                    t.raw("members.kader.expertise") as string[]
                  ).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-champagne/20 px-3 py-1 text-xs font-medium text-champagne"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Expert Network */}
            <motion.div
              variants={staggerItemVariants}
              className="lg:col-span-2"
            >
              <div className="rounded-sm border border-neutral-200 bg-neutral-100 p-8 text-center lg:p-12">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-champagne/10 p-4 text-champagne">
                  <Users size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-neutral-900">
                  {t("experts.title")}
                </h3>
                <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-400">
                  {t("experts.description")}
                </p>
              </div>
            </motion.div>
          </StaggerChildren>
        </Container>
      </section>
    </>
  );
}

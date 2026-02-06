"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Lock, Heart, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";

const values = [
  { key: "expertise", icon: Award },
  { key: "confidentiality", icon: Lock },
  { key: "responsibility", icon: Heart },
  { key: "excellence", icon: Star },
];

export default function ValuesSection() {
  const t = useTranslations("about.values");

  return (
    <section className="bg-neutral-100 py-24 lg:py-32">
      <Container>
        <SectionHeading title={t("heading")} align="center" />

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.key}
                variants={staggerItemVariants}
                className="group rounded-sm border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex text-accent">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-neutral-900">
                  {t(`${value.key}.title`)}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-400">
                  {t(`${value.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}

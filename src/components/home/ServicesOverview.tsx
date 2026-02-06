"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  GraduationCap,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";

const services = [
  { key: "hr_consulting", icon: Users },
  { key: "recruitment", icon: Search },
  { key: "training", icon: GraduationCap },
  { key: "ip_consulting", icon: Shield },
];

export default function ServicesOverview() {
  const t = useTranslations("home.services");

  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                variants={staggerItemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group rounded-sm border border-neutral-200 bg-white p-8 transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-sm bg-accent/10 p-3 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <h3 className="font-heading text-xl font-semibold text-neutral-900">
                  {t(`${service.key}.title`)}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {t(`${service.key}.description`)}
                </p>

                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-light"
                >
                  {t("learn_more")}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}

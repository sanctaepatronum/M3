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
    <section className="bg-mesh-light py-24 lg:py-32">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />

        <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                variants={staggerItemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group border-l-2 border-champagne/20 py-6 pl-8 transition-all duration-300 hover:border-magenta"
              >
                <div className="mb-5 text-champagne transition-colors duration-300 group-hover:text-accent">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <h3 className="font-heading text-xl font-semibold text-neutral-900">
                  {t(`${service.key}.title`)}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {t(`${service.key}.description`)}
                </p>

                <Link
                  href={`/services#${service.key.replace("_", "-")}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-champagne transition-colors hover:text-magenta"
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

"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  GraduationCap,
  Shield,
  ChevronDown,
} from "lucide-react";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import SlideIn from "@/components/animations/SlideIn";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/Button";

const serviceKeys = [
  "hr_consulting",
  "recruitment",
  "training",
  "ip_consulting",
] as const;
const serviceIcons = [Users, Search, GraduationCap, Shield];

const serviceImages: Record<string, { src: string; alt: string }> = {
  hr_consulting: {
    src: "/images/services/hr-consulting.jpg",
    alt: "Strategic HR consulting — professionals reviewing business analytics",
  },
  recruitment: {
    src: "/images/services/recruitment.jpg",
    alt: "Talent recruitment — professionals shaking hands in modern office",
  },
  training: {
    src: "/images/services/training.jpg",
    alt: "Professional training — strategy whiteboard with business frameworks",
  },
  ip_consulting: {
    src: "/images/services/ip-consulting.jpg",
    alt: "Intellectual property consulting — M3 Consultants branded portfolio",
  },
};

export default function ServicesPage() {
  const t = useTranslations("services");

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

      {/* Service Detail Sections */}
      {serviceKeys.map((key, i) => {
        const isEven = i % 2 === 0;
        const bgClass = isEven ? "bg-neutral-50" : "bg-neutral-100";
        return (
          <section key={key} id={key.replace("_", "-")} className={`${bgClass} py-20 lg:py-28 scroll-mt-20`}>
            <Container>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  !isEven ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Content Side */}
                <SlideIn from={isEven ? "left" : "right"}>
                  <div className={!isEven ? "lg:[direction:ltr]" : ""}>
                    <span className="font-heading text-6xl font-bold text-champagne/15">
                      {t(`${key}.number`)}
                    </span>
                    <h2 className="mt-2 font-heading text-3xl font-bold text-neutral-900">
                      {t(`${key}.title`)}
                    </h2>
                    <div className="mt-3 h-px w-16 bg-gradient-to-r from-champagne to-transparent" />
                    <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                      {t(`${key}.description`)}
                    </p>

                    <ServiceSubList serviceKey={key} />
                  </div>
                </SlideIn>

                {/* Visual Side */}
                <SlideIn
                  from={isEven ? "right" : "left"}
                  delay={0.2}
                >
                  <div className={`relative ${!isEven ? "lg:[direction:ltr]" : ""}`}>
                    {serviceImages[key] ? (
                      <img
                        src={serviceImages[key].src}
                        alt={serviceImages[key].alt}
                        className="aspect-[4/3] w-full rounded-sm object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-[4/3] rounded-sm bg-neutral-200/50" />
                    )}
                    <div className="absolute -bottom-4 -right-4 h-full w-full rounded-sm border-2 border-champagne/10" />
                  </div>
                </SlideIn>
              </div>
            </Container>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="bg-neutral-100 py-24 lg:py-32">
        <Container className="text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-neutral-900 sm:text-4xl">
              {t("cta.heading")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
              {t("cta.description")}
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                {t("cta.button")}
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

function ServiceSubList({
  serviceKey,
}: {
  serviceKey: (typeof serviceKeys)[number];
}) {
  const t = useTranslations("services");
  const [isOpen, setIsOpen] = useState(false);

  const subServices: string[] = t.raw(`${serviceKey}.sub_services`);

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-sm font-medium text-champagne transition-colors hover:text-magenta"
      >
        {isOpen ? "Masquer les détails" : "Voir les détails"}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2 border-l-2 border-champagne/20 pl-4">
              {subServices.map((item: string, j: number) => (
                <li key={j} className="text-sm text-neutral-400">
                  {item}
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

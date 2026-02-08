"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Users, Search, GraduationCap, Shield } from "lucide-react";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
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

const detailItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
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

      {/* Service Sections — Sticky Scroll */}
      {serviceKeys.map((key, i) => (
        <StickyServiceSection key={key} serviceKey={key} index={i} />
      ))}

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

/* ── Sticky Service Section ── */
function StickyServiceSection({
  serviceKey,
  index,
}: {
  serviceKey: (typeof serviceKeys)[number];
  index: number;
}) {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;
  const bgClass = isEven ? "bg-neutral-50" : "bg-neutral-100";

  const subServices: { title: string; description: string }[] = t.raw(
    `${serviceKey}.sub_services`
  );

  // Track scroll progress through this section for fade-in/out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0]
  );

  const sectionOpacityStatic = prefersReducedMotion ? 1 : undefined;

  return (
    <section
      ref={sectionRef}
      id={serviceKey.replace("_", "-")}
      className={`${bgClass} relative scroll-mt-20`}
    >
      <motion.div
        style={{ opacity: sectionOpacityStatic ?? sectionOpacity }}
      >
        <Container className="py-16 lg:py-24">
          <div
            className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-20 ${
              !isEven ? "lg:[direction:rtl]" : ""
            }`}
          >
            {/* ── Sticky side: Image + Title + Description ── */}
            <div
              className={`lg:sticky lg:top-24 ${
                !isEven ? "lg:[direction:ltr]" : ""
              }`}
            >
              <div className="relative">
                {serviceImages[serviceKey] ? (
                  <img
                    src={serviceImages[serviceKey].src}
                    alt={serviceImages[serviceKey].alt}
                    className="aspect-[4/3] w-full rounded-sm object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-[4/3] rounded-sm bg-neutral-200/50" />
                )}
                <div className="absolute -bottom-4 -right-4 h-full w-full rounded-sm border-2 border-champagne/10 pointer-events-none" />
              </div>

              <div className="mt-8">
                <span className="font-heading text-6xl font-bold text-champagne/15">
                  {t(`${serviceKey}.number`)}
                </span>
                <h2 className="mt-2 font-heading text-3xl font-bold text-neutral-900">
                  {t(`${serviceKey}.title`)}
                </h2>
                <div className="mt-3 h-px w-16 bg-gradient-to-r from-champagne to-transparent" />
                <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                  {t(`${serviceKey}.description`)}
                </p>
              </div>
            </div>

            {/* ── Scrolling side: Detail Cards ── */}
            <div
              className={`space-y-5 ${!isEven ? "lg:[direction:ltr]" : ""}`}
            >
              {subServices.map((item, j) => (
                <DetailCard
                  key={j}
                  title={item.title}
                  description={item.description}
                  index={j}
                />
              ))}
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}

/* ── Detail Card with scroll-triggered animation ── */
function DetailCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="rounded-lg border border-neutral-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
        <p className="font-heading text-sm font-semibold text-neutral-900">
          {title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          {description}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="rounded-lg border border-neutral-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
      variants={detailItemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.05 }}
    >
      <p className="font-heading text-sm font-semibold text-neutral-900">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
    </motion.div>
  );
}

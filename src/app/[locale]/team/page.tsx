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
import SlideIn from "@/components/animations/SlideIn";
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

      {/* Dr. MAR Mao */}
      <section className="bg-neutral-50 py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Photo — takes 2 of 5 cols */}
            <SlideIn from="left" className="lg:col-span-2">
              <div className="relative">
                <img
                  src="/images/team/dr-mar-mao.jpg"
                  alt="Dr. MAR Mao"
                  className="aspect-[3/4] w-full rounded-sm object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute -bottom-3 -right-3 h-full w-full rounded-sm border-2 border-champagne/10" />
              </div>
            </SlideIn>

            {/* Bio — takes 3 of 5 cols */}
            <SlideIn from="right" delay={0.15} className="lg:col-span-3">
              <div>
                <h3 className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
                  {t("members.mao.name")}
                </h3>
                <p className="mt-1 text-sm font-medium tracking-wider uppercase text-champagne">
                  {t("members.mao.title")}
                </p>
                <div className="mt-3 h-px w-16 bg-gradient-to-r from-champagne to-transparent" />
                <p className="mt-6 text-base leading-relaxed text-neutral-600">
                  {t("members.mao.bio")}
                </p>

                {/* Expertise tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {(t.raw("members.mao.expertise") as string[]).map(
                    (tag: string) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-champagne/20 bg-champagne/5 px-3 py-1.5 text-xs font-medium text-champagne"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* MAR Mamadou-Kader — reversed layout */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Bio — takes 3 of 5 cols (shows first on desktop via order) */}
            <SlideIn
              from="left"
              delay={0.15}
              className="order-2 lg:order-1 lg:col-span-3"
            >
              <div>
                <h3 className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
                  {t("members.kader.name")}
                </h3>
                <p className="mt-1 text-sm font-medium tracking-wider uppercase text-champagne">
                  {t("members.kader.title")}
                </p>
                <div className="mt-3 h-px w-16 bg-gradient-to-r from-champagne to-transparent" />
                <p className="mt-6 text-base leading-relaxed text-neutral-600">
                  {t("members.kader.bio")}
                </p>

                {/* Expertise tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {(t.raw("members.kader.expertise") as string[]).map(
                    (tag: string) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-champagne/20 bg-champagne/5 px-3 py-1.5 text-xs font-medium text-champagne"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </SlideIn>

            {/* Photo placeholder — takes 2 of 5 cols */}
            <SlideIn
              from="right"
              className="order-1 lg:order-2 lg:col-span-2"
            >
              <div className="relative">
                <img
                  src="/images/team/mar-kader.jpg"
                  alt="MAR Mamadou-Kader"
                  className="aspect-[3/4] w-full rounded-sm object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-3 -left-3 h-full w-full rounded-sm border-2 border-champagne/10" />
              </div>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* Expert Network */}
      <section className="bg-neutral-50 py-24 lg:py-32">
        <Container>
          <FadeIn>
            <div className="text-center">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-champagne">
                {t("experts.title")}
              </p>
              <h3 className="mt-3 font-heading text-3xl font-bold text-neutral-900 sm:text-4xl">
                {t("experts.subtitle")}
              </h3>
              <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-champagne to-transparent" />
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-500">
                {t("experts.description")}
              </p>
            </div>
          </FadeIn>

          {/* Network Diagram */}
          <FadeIn delay={0.3}>
            <div className="mx-auto mt-16 max-w-3xl">
              <svg
                viewBox="0 0 600 420"
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#C9A96E" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#C9A96E" stopOpacity="0.15" />
                  </linearGradient>
                  <radialGradient id="centerGlow">
                    <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Center glow */}
                <circle cx="300" cy="210" r="100" fill="url(#centerGlow)" />

                {/* Connection lines from center to each node */}
                {[
                  { x: 300, y: 62 },
                  { x: 478, y: 105 },
                  { x: 530, y: 270 },
                  { x: 420, y: 370 },
                  { x: 180, y: 370 },
                  { x: 70, y: 270 },
                  { x: 122, y: 105 },
                ].map((node, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1="300"
                    y1="210"
                    x2={node.x}
                    y2={node.y}
                    stroke="#C9A96E"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  />
                ))}

                {/* Outer ring — dashed */}
                <circle
                  cx="300"
                  cy="210"
                  r="175"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="0.5"
                  strokeDasharray="3 6"
                  opacity="0.2"
                />

                {/* Inner ring */}
                <circle
                  cx="300"
                  cy="210"
                  r="60"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="0.5"
                  opacity="0.15"
                />

                {/* Expert nodes around the circle */}
                {[
                  { x: 300, y: 62, label: "Droit Social", sub: "& Conformité" },
                  { x: 478, y: 105, label: "Audit", sub: "& Diagnostic RH" },
                  { x: 530, y: 270, label: "Chasse", sub: "de Têtes" },
                  { x: 420, y: 370, label: "Formation", sub: "Continue" },
                  { x: 180, y: 370, label: "Stratégie", sub: "Organisationnelle" },
                  { x: 70, y: 270, label: "Gestion", sub: "des Talents" },
                  { x: 122, y: 105, label: "Propriété", sub: "Intellectuelle" },
                ].map((node, i) => (
                  <motion.g
                    key={`node-${i}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.6 + i * 0.12,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Node dot */}
                    <circle cx={node.x} cy={node.y} r="6" fill="#C9A96E" opacity="0.8" />
                    <circle cx={node.x} cy={node.y} r="10" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.3" />

                    {/* Label — positioned well above the dot */}
                    <text
                      x={node.x}
                      y={node.y - 26}
                      textAnchor="middle"
                      className="fill-neutral-700 text-[11px] font-semibold"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x}
                      y={node.y - 15}
                      textAnchor="middle"
                      className="fill-neutral-400 text-[9px]"
                    >
                      {node.sub}
                    </text>
                  </motion.g>
                ))}

                {/* Center hub — M3 logo */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <circle cx="300" cy="210" r="42" fill="white" />
                  <circle cx="300" cy="210" r="42" fill="none" stroke="#C9A96E" strokeWidth="1.5" opacity="0.4" />
                  <image
                    href="/images/logo-m3.png"
                    x="265"
                    y="182"
                    width="70"
                    height="56"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </motion.g>
              </svg>
            </div>
          </FadeIn>

        </Container>
      </section>
    </>
  );
}

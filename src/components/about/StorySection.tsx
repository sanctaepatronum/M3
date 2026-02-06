"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SlideIn from "@/components/animations/SlideIn";
import FadeIn from "@/components/animations/FadeIn";

export default function StorySection() {
  const t = useTranslations("about.story");

  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Left: Editorial text */}
          <SlideIn from="left">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                {t("heading")}
              </h2>
              <div className="mt-3 h-[3px] w-16 bg-gradient-to-r from-magenta to-accent" />

              <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-700">
                <p>{t("paragraph1")}</p>
                <p>{t("paragraph2")}</p>
                <p>{t("paragraph3")}</p>
              </div>
            </div>
          </SlideIn>

          {/* Right: Decorative element */}
          <FadeIn delay={0.3} className="hidden lg:block">
            <div className="relative">
              <div className="aspect-[3/4] rounded-sm bg-neutral-100" />
              {/* Decorative accent frame */}
              <div className="absolute -top-4 -right-4 h-full w-full rounded-sm border-2 border-accent/20" />
              {/* Gold accent */}
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-sm bg-accent/10" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

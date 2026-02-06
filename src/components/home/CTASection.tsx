"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SlideIn from "@/components/animations/SlideIn";

export default function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section className="bg-mesh-dark py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
          {/* Left: Statement text */}
          <SlideIn from="left">
            <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {t("heading")}
            </h2>
          </SlideIn>

          {/* Right: Description + CTA */}
          <SlideIn from="right" delay={0.2}>
            <div>
              <p className="text-lg leading-relaxed text-neutral-400">
                {t("description")}
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="outline" size="lg">
                  {t("button")}
                </Button>
              </div>
            </div>
          </SlideIn>
        </div>
      </Container>
    </section>
  );
}

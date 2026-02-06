import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/animations/TextReveal";
import FadeIn from "@/components/animations/FadeIn";
import StorySection from "@/components/about/StorySection";
import ValuesSection from "@/components/about/ValuesSection";
import TimelineSection from "@/components/about/TimelineSection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function AboutPage() {
  const t = useTranslations("about.hero");

  return (
    <>
      {/* Page Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-mesh-dark">
        <Container className="relative z-10 py-32 text-center">
          <TextReveal
            text={t("title")}
            as="h1"
            className="justify-center font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          />
          <FadeIn delay={0.6}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-200/80">
              {t("subtitle")}
            </p>
          </FadeIn>
        </Container>
      </section>

      <SectionDivider />
      <StorySection />
      <ValuesSection />
      <SectionDivider />
      <TimelineSection />
    </>
  );
}

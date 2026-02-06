import HeroSection from "@/components/home/HeroSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider
        variant="curve"
        from="fill-primary"
        to="fill-neutral-100"
      />
      <PhilosophySection />
      <SectionDivider
        variant="wave"
        from="fill-neutral-100"
        to="fill-neutral-50"
      />
      <ServicesOverview />
      <StatsSection />
      <SectionDivider
        variant="curve"
        from="fill-primary"
        to="fill-neutral-100"
      />
      <CTASection />
    </>
  );
}

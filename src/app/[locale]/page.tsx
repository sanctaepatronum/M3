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
      <SectionDivider />
      <PhilosophySection />
      <SectionDivider />
      <ServicesOverview />
      <StatsSection />
      <SectionDivider />
      <CTASection />
    </>
  );
}

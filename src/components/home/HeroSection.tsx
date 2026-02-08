"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/ui/neural-network-hero"), {
  ssr: false,
});

export default function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <Hero
      title={t("title")}
      description={t("subtitle")}
      badgeLabel={t("badge_label")}
      badgeText={t("badge_text")}
      ctaButtons={[
        { text: t("cta_primary"), href: "/services", primary: true },
        { text: t("cta_secondary"), href: "/contact" },
      ]}
      microDetails={[t("micro_1"), t("micro_2"), t("micro_3")]}
      scrollIndicator={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="text-champagne/40" />
          </motion.div>
        </motion.div>
      }
    />
  );
}

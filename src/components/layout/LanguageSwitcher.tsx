"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  light?: boolean;
}

export default function LanguageSwitcher({
  className,
  light = false,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = locale === "fr" ? "en" : "fr";

  const handleSwitch = () => {
    router.replace(pathname, { locale: switchTo });
  };

  return (
    <button
      onClick={handleSwitch}
      className={cn(
        "relative flex items-center gap-1 text-sm font-medium tracking-wider uppercase transition-colors duration-300",
        light
          ? "text-neutral-200 hover:text-white"
          : "text-neutral-400 hover:text-neutral-900",
        className
      )}
      aria-label={`Switch to ${switchTo === "fr" ? "French" : "English"}`}
    >
      <span
        className={cn(
          "transition-colors",
          locale === "fr"
            ? light
              ? "text-white"
              : "text-neutral-900"
            : ""
        )}
      >
        FR
      </span>
      <span className="text-neutral-400">/</span>
      <span
        className={cn(
          "transition-colors",
          locale === "en"
            ? light
              ? "text-white"
              : "text-neutral-900"
            : ""
        )}
      >
        EN
      </span>
    </button>
  );
}

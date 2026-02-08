import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className, light = true }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-m3.png"
        alt="M3 Consultants"
        className={cn(
          "h-12 w-auto object-contain sm:h-14",
          !light && "brightness-90"
        )}
      />
    </div>
  );
}

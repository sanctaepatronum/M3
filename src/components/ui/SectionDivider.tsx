import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "wave" | "slope" | "curve";
  from?: string;
  to?: string;
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({
  variant = "wave",
  from = "fill-neutral-50",
  to = "fill-neutral-100",
  flip = false,
  className,
}: SectionDividerProps) {
  const paths = {
    wave: "M0,64 C200,20 400,100 600,64 C800,28 1000,100 1200,64 L1200,120 L0,120 Z",
    slope: "M0,80 L1200,20 L1200,120 L0,120 Z",
    curve: "M0,80 Q600,0 1200,80 L1200,120 L0,120 Z",
  };

  return (
    <div
      className={cn(
        "relative -mt-px h-16 w-full overflow-hidden md:h-20 lg:h-24",
        flip && "rotate-180",
        className
      )}
    >
      {/* Background color of the next section */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 h-full w-full", to)}
      >
        <rect width="1200" height="120" />
      </svg>
      {/* Curved shape from previous section */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={cn("absolute inset-0 h-full w-full", from)}
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}

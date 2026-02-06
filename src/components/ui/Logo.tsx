import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className, light = true }: LogoProps) {
  const textColor = light ? "text-white" : "text-neutral-900";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* M3 with gradient */}
      <svg
        viewBox="0 0 48 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-auto"
      >
        <defs>
          <linearGradient
            id="logo-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF0AA3" />
            <stop offset="50%" stopColor="#A325D4" />
            <stop offset="100%" stopColor="#20B2FF" />
          </linearGradient>
        </defs>
        {/* M */}
        <path
          d="M2 28V4h4.5l7 14 7-14H25v24h-4V11L14.5 23h-3L5 11v17H2z"
          fill="url(#logo-gradient)"
        />
        {/* 3 */}
        <path
          d="M29 7.5C29 5.5 30.5 4 33 4h8c2.5 0 4 1.2 5 3s1.5 3.5 1.5 5.5c0 1.5-.4 2.8-1.2 4 1 1.2 1.5 2.8 1.5 4.5 0 2.5-.8 4.5-2.2 6S42 30 40 30h-8c-2.5 0-4-1.5-4-3.5h3.5c0 .5.3.8.5 1h7c1.2 0 2.2-.5 3-1.5s1.2-2.2 1.2-3.5c0-1.5-.4-2.5-1.2-3.2s-1.8-1-3-1H34v-3h5c1 0 1.8-.4 2.5-1.2S42.5 13 42.5 12s-.4-2-1-2.7S40 8 39 8h-6.5c-.5 0-.8.2-1 .5H29v-1z"
          fill="url(#logo-gradient)"
        />
      </svg>
      <span
        className={cn(
          "hidden text-[11px] font-semibold tracking-[0.2em] uppercase sm:block",
          textColor
        )}
      >
        Consultants
      </span>
    </div>
  );
}

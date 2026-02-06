import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div className={cn("relative py-8", className)}>
      <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
    </div>
  );
}

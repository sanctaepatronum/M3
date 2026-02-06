"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  magnetic?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
  magnetic = true,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-body font-medium tracking-[0.15em] uppercase transition-all duration-500 rounded-sm cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-champagne border border-champagne/30 hover:bg-champagne hover:text-primary hover:border-champagne hover:shadow-lg hover:shadow-magenta/15",
    secondary:
      "bg-transparent text-neutral-900 border border-neutral-300 hover:border-champagne hover:text-champagne transition-all duration-500",
    outline:
      "border border-neutral-200 text-neutral-200 hover:border-magenta hover:text-champagne transition-all duration-500",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[12px]",
    md: "px-7 py-3 text-[13px]",
    lg: "px-9 py-4 text-[13px]",
  };

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex"
    >
      {href ? (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={combinedClassName}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return inner;
}

"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsTouch } from "@/lib/hooks";

type Variant = "primary" | "forest" | "ghost" | "ghost-dark";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ember text-cream hover:bg-ember-bright",
  forest: "bg-forest-deep text-cream hover:bg-forest",
  ghost:
    "bg-transparent text-forest-deep ring-1 ring-inset ring-forest/20 hover:ring-forest/40 hover:bg-forest/[0.03]",
  "ghost-dark":
    "bg-transparent text-cream ring-1 ring-inset ring-cream/25 hover:ring-cream/50 hover:bg-cream/[0.06]",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  icon = true,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const touch = useIsTouch();

  const handleMove = (e: React.MouseEvent) => {
    if (touch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(ref.current, { x: x * 0.25, y: y * 0.35, duration: 0.6, ease: "power3.out" });
  };
  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5",
    "text-sm font-medium tracking-tight transition-colors duration-300 will-change-transform",
    VARIANTS[variant],
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  const shared = {
    ref: ref as React.Ref<never>,
    className: classes,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    "data-cursor-hover": true as const,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <Link href={href} {...shared}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} {...shared}>
      {inner}
    </button>
  );
}

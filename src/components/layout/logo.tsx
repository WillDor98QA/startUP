import { BRAND } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M13 1.5 24.5 23H1.5L13 1.5Z"
          stroke={dark ? "#f3eee3" : "#1d3124"}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="13" cy="15.5" r="3.2" fill="#d36135" />
      </svg>
      <span
        className={cn(
          "font-serif text-[1.4rem] leading-none tracking-tight",
          dark ? "text-cream" : "text-forest-deep",
        )}
      >
        {BRAND.name}
      </span>
    </span>
  );
}

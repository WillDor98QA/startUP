import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        dark ? "text-sage" : "text-ember",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-px w-7", dark ? "bg-sage/50" : "bg-ember/50")}
      />
      {children}
    </span>
  );
}

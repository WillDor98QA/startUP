import { Eyebrow } from "@/components/ui/eyebrow";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <TextReveal
        as="h2"
        text={title}
        className={cn(
          "max-w-[20ch] text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02]",
          dark ? "text-cream" : "text-forest-deep",
          align === "center" && "max-w-[24ch]",
          titleClassName,
        )}
      />
      {intro && (
        <Reveal>
          <p
            className={cn(
              "max-w-[52ch] text-pretty text-base leading-relaxed sm:text-lg",
              dark ? "text-sage" : "text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

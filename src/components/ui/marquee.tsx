"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  speed = 38,
  className,
  reverse = false,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className="flex shrink-0 items-center motion-reduce:animate-none"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .group:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

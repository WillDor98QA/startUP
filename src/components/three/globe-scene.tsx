"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { InView } from "./in-view";

const GlobeField = dynamic(() => import("./globe-field"), { ssr: false });

function GlobeFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="relative size-[70%] rounded-full border border-sage/20 bg-[radial-gradient(circle_at_35%_30%,rgba(43,61,46,0.9),rgba(20,33,25,1))]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_60%_60%,rgba(211,97,53,0.25),transparent_60%)]" />
      </div>
    </div>
  );
}

export function GlobeScene() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (reduced) return <GlobeFallback />;

  return (
    <InView className="h-full w-full">
      <GlobeField />
    </InView>
  );
}

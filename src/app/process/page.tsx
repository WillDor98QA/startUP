import type { Metadata } from "next";
import { Process } from "@/components/sections/process";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Kova works: a six-step method — Discover, Analyse, Design, Develop, Deploy, Support — that removes risk and proves value early.",
};

export default function ProcessPage() {
  return (
    <>
      <Process />
      <CtaBanner
        title="Let's map your first step."
        sub="The whole process starts with a conversation. Book a discovery session and we'll show you what your transformation roadmap could look like."
        secondaryLabel="Explore solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}

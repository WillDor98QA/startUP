import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Seo } from "@/components/seo";
import { Reveal } from "@/components/ui/reveal";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you're looking for doesn't exist or has moved." />
      <section className="relative overflow-hidden pb-24 pt-40 md:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(211,97,53,0.08),transparent_70%)]"
        />
        <div className="shell relative">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-ember">404</p>
            <h1 className="mt-4 max-w-[20ch] font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-forest-deep">
              This page seems to have gone <em className="italic text-ember">off the map</em>.
            </h1>
            <p className="mt-6 max-w-[52ch] leading-relaxed text-muted">
              The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
              somewhere useful.
            </p>
            <Link
              to="/"
              data-cursor-hover
              className="mt-9 inline-flex items-center gap-2 font-medium text-forest-deep transition-colors hover:text-ember"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

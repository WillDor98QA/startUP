import { lazy, Suspense, useEffect, useState } from "react";
import { Mail, MapPin, Phone, ArrowRight, Check, CalendarDays } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextReveal } from "@/components/ui/text-reveal";
import { InView } from "@/components/three/in-view";
import { useReducedMotion } from "@/lib/hooks";
import { BRAND } from "@/lib/site";

const CoreField = lazy(() => import("@/components/three/core-field"));

const NEXT_STEPS = [
  "A 30-minute call to understand how your business runs today.",
  "We map where time and money are leaking — live, with you.",
  "You leave with a clear, costed view of what's worth fixing first.",
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-forest-deep pb-24 pt-32 text-cream md:pb-32 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-70">
        {mounted && !reduced ? (
          <InView className="h-full w-full">
            <Suspense fallback={null}>
              <CoreField />
            </Suspense>
          </InView>
        ) : (
          <div className="grid h-full place-items-center">
            <div className="size-56 rounded-full bg-[radial-gradient(circle,rgba(211,97,53,0.4),transparent_70%)]" />
          </div>
        )}
      </div>

      <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow dark className="mb-6">
            Book a discovery session
          </Eyebrow>
          <TextReveal
            as="h1"
            text="Let&rsquo;s find your first *quick win*."
            className="max-w-[15ch] text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] text-cream"
          />
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-sage">
            Tell us how your business runs today. In 30 minutes we&rsquo;ll show you where
            you&rsquo;re losing time and what&rsquo;s worth fixing first. No pitch, no obligation.
          </p>

          <ol className="mt-10 flex flex-col gap-4">
            {NEXT_STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ember/20 font-mono text-xs text-ember">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-cream/85">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col gap-4">
            <a
              href={`mailto:${BRAND.email}`}
              data-cursor-hover
              className="group flex items-center gap-4 text-cream/90 transition-colors hover:text-ember"
            >
              <span className="grid size-11 place-items-center rounded-full border border-cream/15">
                <Mail className="size-4" strokeWidth={1.75} />
              </span>
              {BRAND.email}
            </a>
            <a
              href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`}
              data-cursor-hover
              className="group flex items-center gap-4 text-cream/90 transition-colors hover:text-ember"
            >
              <span className="grid size-11 place-items-center rounded-full border border-cream/15">
                <Phone className="size-4" strokeWidth={1.75} />
              </span>
              {BRAND.phone}
            </a>
            <div className="flex items-center gap-4 text-cream/90">
              <span className="grid size-11 place-items-center rounded-full border border-cream/15">
                <MapPin className="size-4" strokeWidth={1.75} />
              </span>
              {BRAND.location}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-cream/10 bg-cream/[0.04] p-7 backdrop-blur-sm sm:p-9">
          {sent ? (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
              <span className="mb-5 grid size-14 place-items-center rounded-full bg-ember text-cream">
                <Check className="size-6" strokeWidth={2.5} />
              </span>
              <h2 className="font-serif text-3xl text-cream">Request received.</h2>
              <p className="mt-3 max-w-xs text-sage">
                Thanks — we&rsquo;ll be in touch within one business day to find a time that suits you.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-5"
            >
              <div className="mb-1 flex items-center gap-2 text-sm text-sage">
                <CalendarDays className="size-4 text-ember" />
                Prefer to book directly? We&rsquo;ll send a calendar link.
              </div>
              <Field label="Full name" name="name" placeholder="Jane Doe" required />
              <Field
                label="Work email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
              />
              <Field label="Company" name="company" placeholder="Company Inc." />
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-wider text-sage">
                  What&rsquo;s slowing your business down?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="A few sentences on the manual work or bottleneck you'd love to fix."
                  className="resize-none rounded-xl border border-cream/15 bg-forest-deep/40 px-4 py-3 text-cream placeholder:text-sage/50 focus:border-ember focus:outline-none"
                />
              </div>
              <button
                type="submit"
                data-cursor-hover
                className="group mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-ember px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ember-bright"
              >
                Request my discovery session
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-xs uppercase tracking-wider text-sage">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-cream/15 bg-forest-deep/40 px-4 py-3 text-cream placeholder:text-sage/50 focus:border-ember focus:outline-none"
      />
    </div>
  );
}

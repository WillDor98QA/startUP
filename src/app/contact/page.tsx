import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute discovery session. We'll map where your business is losing time to manual work and show you what's worth fixing first.",
};

export default function ContactPage() {
  return (
    <>
      <Contact />
      <Faq />
    </>
  );
}

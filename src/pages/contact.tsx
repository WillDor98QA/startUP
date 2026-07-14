import { Seo } from "@/components/seo";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact" description="Book a free 30-minute discovery session. We'll map where your business is losing time to manual work and show you what's worth fixing first." />
      <Contact />
      <Faq />
    </>
  );
}

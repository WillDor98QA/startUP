import { Seo } from "@/components/seo";
import { Story } from "@/components/sections/story";
import { Problem } from "@/components/sections/problem";
import { Trusted } from "@/components/sections/trusted";
import { Capabilities } from "@/components/sections/capabilities";
import { FeaturedCase } from "@/components/sections/featured-case";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      <Seo />
      <Story />
      <Problem />
      <Trusted />
      <Capabilities />
      <FeaturedCase />
      <Testimonials />
      <CtaBanner />
    </>
  );
}

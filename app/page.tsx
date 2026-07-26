import { Hero } from "@/components/home/Hero";
import { IndustryGrid } from "@/components/home/IndustryGrid";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ProofSection } from "@/components/home/ProofSection";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { CtaBand } from "@/components/home/CtaBand";

// Home page section order per docs/spec.md Section 5.
export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustryGrid />
      <ProcessSection />
      <FeaturedProducts />
      <ProofSection />
      <InsightsPreview />
      <CtaBand />
    </>
  );
}

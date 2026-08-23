import { Hero } from "@/components/Hero";
import { WhoWeAre } from "@/components/WhoWeAre";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { PropertyShowcase } from "@/components/home/PropertyShowcase";
import { WhyAbundance } from "@/components/home/WhyAbundance";
import { Process } from "@/components/Process";
import { DueDiligence } from "@/components/DueDiligence";
import { Testimonials } from "@/components/Testimonials";
import { KnowledgeStrip } from "@/components/home/KnowledgeStrip";
import { ConsultationBand } from "@/components/home/ConsultationBand";
import {
  getFeaturedProperties,
  getPropertiesByCategory,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, homes, land] = await Promise.all([
    getFeaturedProperties(3),
    getPropertiesByCategory("home", 3),
    getPropertiesByCategory("land", 3),
  ]);

  return (
    <>
      <Hero />
      <WhoWeAre />
      <FeaturedProperties properties={featured} />
      <PropertyShowcase
        id="homes"
        label="Residences"
        title="Homes Selected for Quality & Value"
        description="From apartments and family homes to luxury residences, every listing meets our standards for quality, location, documentation, and long-term value."
        properties={homes}
        browseHref="/properties?type=home"
        browseLabel="Browse all homes"
      />
      <PropertyShowcase
        id="land"
        label="Verified Land"
        title="Land Opportunities You Can Trust"
        description="Residential, commercial, and estate land — each with documentation we have personally examined, so you can build today or invest for tomorrow with confidence."
        properties={land}
        browseHref="/properties?type=land"
        browseLabel="Browse all land"
        onDark
      />
      <WhyAbundance />
      <Process />
      <DueDiligence />
      <Testimonials />
      <KnowledgeStrip />
      <ConsultationBand />
    </>
  );
}

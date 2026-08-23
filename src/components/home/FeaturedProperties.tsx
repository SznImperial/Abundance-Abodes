import Link from "next/link";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FeaturedPropertiesProps = {
  properties: Property[];
};

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  if (properties.length === 0) return null;
  return (
    <section
      id="featured"
      className="section-padding bg-brand-white"
      aria-labelledby="featured-heading"
    >
      <div className="container-site">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Featured"
              title="Handpicked Opportunities"
              description="A shortlist of verified homes and land our advisors are presenting right now."
            />
            <Link href="/properties" className="btn-secondary shrink-0">
              View all properties
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {properties.map((property, index) => (
            <Reveal key={property.id} delay={index * 90}>
              <PropertyCard property={property} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

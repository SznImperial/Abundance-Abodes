import Link from "next/link";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PropertyShowcaseProps = {
  id: string;
  label: string;
  title: string;
  description: string;
  properties: Property[];
  browseHref: string;
  browseLabel: string;
  onDark?: boolean;
};

/** Reusable "browse by category" band used for Homes and Land on the homepage. */
export function PropertyShowcase({
  id,
  label,
  title,
  description,
  properties,
  browseHref,
  browseLabel,
  onDark = false,
}: PropertyShowcaseProps) {
  if (properties.length === 0) return null;
  return (
    <section
      id={id}
      className={onDark ? "section-padding bg-brand-forest" : "section-padding bg-brand-cream"}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-site">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label={label}
              title={title}
              description={description}
              id={`${id}-heading`}
              onDark={onDark}
            />
            <Link
              href={browseHref}
              className={onDark ? "btn-ghost-dark shrink-0" : "btn-secondary shrink-0"}
            >
              {browseLabel}
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {properties.map((property, index) => (
            <Reveal key={property.id} delay={index * 90}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

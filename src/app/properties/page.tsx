import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ConsultationBand } from "@/components/home/ConsultationBand";
import { Reveal } from "@/components/ui/Reveal";
import { getAllProperties } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Properties — Verified Homes & Land in Nigeria",
  description:
    "Browse verified homes, apartments, duplexes, and land plots across Lagos, Ibadan and Ogun State. Every listing is documentation-checked by Abundance Abodes.",
  alternates: { canonical: "/properties" },
};

export const revalidate = 60;

type Filter = "all" | "home" | "land";

const filters: { key: Filter; label: string; href: string }[] = [
  { key: "all", label: "All Properties", href: "/properties" },
  { key: "home", label: "Homes", href: "/properties?type=home" },
  { key: "land", label: "Land", href: "/properties?type=land" },
];

function parseFilter(value?: string): Filter {
  return value === "home" || value === "land" ? value : "all";
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const filter = parseFilter(params.type);
  const all = await getAllProperties();
  const properties =
    filter === "all" ? all : all.filter((p) => p.category === filter);

  const homesCount = all.filter((p) => p.category === "home").length;
  const landCount = all.filter((p) => p.category === "land").length;

  return (
    <>
      <section className="border-b border-brand-sand bg-brand-cream">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Properties" }]} />
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {filter === "home"
              ? "Homes for Sale"
              : filter === "land"
                ? "Verified Land for Sale"
                : "Verified Properties"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
            Every property below has passed our documentation and verification
            review before being presented. Homes are listed with full
            specifications; land comes with clear title status.
          </p>

          {/* Filter pills */}
          <nav aria-label="Filter properties" className="mt-7 flex flex-wrap gap-2">
            {filters.map((f) => (
              <Link
                key={f.key}
                href={f.href}
                aria-current={filter === f.key ? "true" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  filter === f.key
                    ? "border-brand-forest bg-brand-forest text-brand-white"
                    : "border-brand-stone/70 bg-brand-white text-brand-forest hover:border-brand-gold hover:bg-brand-sand/40"
                )}
              >
                {f.label}
                <span className="ml-1.5 text-xs opacity-70">
                  ({f.key === "home" ? homesCount : f.key === "land" ? landCount : all.length})
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="section-padding !pt-12" aria-label="Property listings">
        <div className="container-site">
          {properties.length === 0 ? (
            <div className="card-surface mx-auto max-w-xl p-10 text-center">
              <h2 className="font-serif text-xl font-semibold">
                Nothing here yet
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                We don&apos;t have properties matching this view at the moment.
                Our Land Desk can source specific requirements that aren&apos;t
                publicly listed.
              </p>
              <Link href="/consultation" className="btn-primary mt-6">
                Ask our advisors
              </Link>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {properties.map((property, index) => (
                <li key={property.id} className="list-none">
                  <Reveal delay={(index % 3) * 80}>
                    <PropertyCard
                      property={property}
                      priority={index < 3}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ConsultationBand />
    </>
  );
}

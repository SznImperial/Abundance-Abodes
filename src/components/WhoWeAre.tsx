import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function WhoWeAre() {
  return (
    <section
      id="about"
      className="section-padding bg-brand-sand/40"
      aria-labelledby="who-we-are-heading"
    >
      <div className="container-site">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label mb-3 flex items-center justify-center gap-3 after:h-px after:w-8 after:bg-brand-gold">
              Who We Are
            </p>
            <h2
              id="who-we-are-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Built on Trust. Driven by Opportunity.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-muted sm:text-lg">
              Abundance Abodes is a client-first real estate brokerage helping
              people make confident property decisions. We represent buyers,
              sellers, developers, and investors — providing verified
              opportunities, strategic guidance, and professional brokerage
              services.
            </p>
            <p className="mt-5 text-base italic leading-relaxed text-brand-ink/80">
              Whether you&apos;re buying your first plot, acquiring a family
              home, or expanding an investment portfolio, every opportunity we
              recommend is selected for its integrity, potential, and long-term
              value.
            </p>
            <Link href="/about" className="btn-secondary mt-8">
              More About Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const diligenceItems = [
  {
    title: "Title verification",
    description:
      "We confirm that title documents are authentic and that the seller has the legal right to transfer ownership.",
  },
  {
    title: "Survey review",
    description:
      "Survey plans are checked for accuracy, boundaries, and consistency with the land being offered.",
  },
  {
    title: "Governor's Consent guidance",
    description:
      "We guide you through consent requirements and what they mean for a secure transfer in your state.",
  },
  {
    title: "Deed review",
    description:
      "Deeds of assignment and related instruments are reviewed so you understand every clause before signing.",
  },
  {
    title: "Allocation confirmation",
    description:
      "For estate and government allocations, we confirm status, conditions, and any outstanding obligations.",
  },
  {
    title: "Investment assessment",
    description:
      "Beyond legality, we weigh location, growth potential, and long-term value against your goals.",
  },
];

export function DueDiligence() {
  return (
    <section
      id="due-diligence"
      className="section-padding bg-brand-white"
      aria-labelledby="due-diligence-heading"
    >
      <div className="container-site">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow-rule section-label mb-3">Due Diligence</p>
            <h2
              id="due-diligence-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Verification Before Recommendation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted sm:text-lg">
              In the Nigerian property market, documentation is everything. We
              do not recommend a property until the essentials have been
              examined — so you move forward with clarity, not guesswork.
            </p>
            <Link href="/due-diligence" className="btn-secondary mt-7">
              Read the Due Diligence Guide
            </Link>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {diligenceItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <li className="h-full rounded-xl border border-brand-sand bg-brand-cream/70 p-5 transition-colors duration-300 hover:border-brand-gold/50 hover:bg-brand-cream">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-forest text-brand-cream"
                      aria-hidden="true"
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-brand-forest">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

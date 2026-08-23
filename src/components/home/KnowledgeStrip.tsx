import Link from "next/link";
import { faqs } from "@/lib/data/content";
import { insights } from "@/lib/data/content";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/** Homepage teaser combining the two most useful content surfaces: FAQs + Insights. */
export function KnowledgeStrip() {
  const topFaqs = faqs.slice(0, 4);
  const latest = insights.slice(0, 2);

  return (
    <section
      id="knowledge"
      className="section-padding bg-brand-cream"
      aria-labelledby="knowledge-heading"
    >
      <div className="container-site">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow-rule section-label mb-3">Knowledge</p>
              <h2
                id="knowledge-heading"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Informed Buyers Make Better Decisions
              </h2>
            </div>
            <Link href="/faq" className="btn-secondary shrink-0">
              All FAQs
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          {/* FAQ accordion — native details/summary, zero JS, accessible */}
          <Reveal>
            <div className="divide-y divide-brand-sand rounded-2xl border border-brand-sand bg-brand-white">
              {topFaqs.map((faq) => (
                <details key={faq.id} className="group px-5 py-4 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-forest transition-colors hover:text-brand-gold-dark [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-stone/60 text-brand-forest transition-transform duration-300 group-open:rotate-45 group-open:border-brand-gold group-open:text-brand-gold-dark"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>

          {/* Latest insights */}
          <Reveal delay={120}>
            <div>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="font-serif text-lg font-semibold">Latest Insights</h3>
                <Link
                  href="/insights"
                  className="link-underline group text-sm"
                >
                  View all
                </Link>
              </div>
              <ul className="space-y-4">
                {latest.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/insights/${post.slug}`}
                      className="group card-surface block p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-lift)"
                    >
                      <span className="rounded-full bg-brand-forest/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">
                        {post.tag}
                      </span>
                      <h4 className="mt-3 font-serif text-base font-semibold leading-snug text-brand-forest transition-colors group-hover:text-brand-gold-dark sm:text-lg">
                        {post.title}
                      </h4>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-brand-muted">
                        {post.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-brand-stone">
                        {formatDate(post.publishedAt)} • {post.readMinutes} min read
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

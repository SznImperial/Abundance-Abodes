import { isSupabaseConfigured } from "@/lib/supabase";

/** Shared banner explaining the data backend state in admin screens. */
export function SupabaseBanner() {
  if (isSupabaseConfigured()) {
    return (
      <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Connected to Supabase — changes are saved to the live database.
      </div>
    );
  }
  return (
    <div className="mb-8 rounded-xl border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-sm leading-relaxed text-brand-gold-dark">
      <strong className="font-semibold">Preview mode:</strong> Supabase isn&apos;t
      connected yet, so you&apos;re viewing seed data and saves are disabled.
      Once{" "}
      <code className="rounded bg-brand-forest/10 px-1.5 py-0.5 font-mono text-xs">
        NEXT_PUBLIC_SUPABASE_URL
      </code>{" "}
      and{" "}
      <code className="rounded bg-brand-forest/10 px-1.5 py-0.5 font-mono text-xs">
        NEXT_PUBLIC_SUPABASE_ANON_KEY
      </code>{" "}
      are set (schema in <code className="font-mono text-xs">supabase/schema.sql</code>),
      full editing activates automatically.
    </div>
  );
}

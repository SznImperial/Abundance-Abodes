export const site = {
  name: "Abundance Abodes",
  tagline: "Trusted Property Brokerage",
  description:
    "Client-first real estate brokerage helping Nigerians buy, sell, and invest in verified property with confidence.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "",
  keywords: [
    "real estate Nigeria",
    "property brokerage Nigeria",
    "buy land Lagos",
    "verified property Nigeria",
    "houses for sale Lekki",
    "land for sale Ibadan",
    "Abundance Abodes",
  ],
} as const;

export function absoluteUrl(path: string): string {
  const base = site.url || "https://abundanceabodes.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

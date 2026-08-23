export type PropertyCategory = "home" | "land";
export type PropertyType =
  | "apartment"
  | "duplex"
  | "terrace"
  | "bungalow"
  | "villa"
  | "residential-land"
  | "commercial-land"
  | "mixed-use-land"
  | "estate-allocation";
export type PropertyStatus = "available" | "reserved" | "sold" | "coming-soon";
export type PropertyPurpose = "sale" | "rent";

export type PropertyImage = {
  url: string;
  alt: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  category: PropertyCategory;
  type: PropertyType;
  purpose: PropertyPurpose;
  /** Short one-liner shown on cards. */
  shortDescription: string;
  description: string[];
  price: number | null;
  currency: "NGN" | "USD";
  /** e.g. "₦120,000,000" or "Price on request". */
  priceNote?: string;
  location: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  toilets?: number;
  parkingSpaces?: number;
  /** Land size, e.g. "500 sqm" */
  landSize?: string;
  /** Built-up property size, e.g. "320 sqm" */
  propertySize?: string;
  status: PropertyStatus;
  featured: boolean;
  mainImage: PropertyImage;
  gallery: PropertyImage[];
  youtubeUrl?: string;
  amenities: string[];
  developerName?: string;
  developerNote?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt: string;
  updatedAt: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution?: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: { heading?: string; paragraphs: string[] }[];
  publishedAt: string;
  readMinutes: number;
  tag: string;
};

export type SiteContent = {
  phone?: string;
  whatsapp?: string;
  email?: string;
  addressLines?: string[];
  socials?: { label: string; href: string }[];
};

export type EnquiryStatus = "new" | "contacted" | "in-progress" | "completed";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertySlug?: string | null;
  propertyTitle?: string | null;
  preferredTime?: string | null;
  message?: string | null;
  status: EnquiryStatus;
  createdAt: string;
};

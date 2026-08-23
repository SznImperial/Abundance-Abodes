"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Property } from "@/lib/types";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { savePropertyAction, type SaveState } from "./actions";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-surface p-6 sm:p-7">
      <h2 className="mb-5 font-serif text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function TextField({
  name,
  label,
  value,
  hint,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  value?: string | number | null;
  hint?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="input-label">
        {label} {required ? <span className="text-brand-gold-dark">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={value ?? ""}
        required={required}
        placeholder={placeholder}
        className="input-field"
      />
      {hint ? <p className="mt-1 text-xs text-brand-muted">{hint}</p> : null}
    </div>
  );
}

function TextArea({
  name,
  label,
  value,
  rows = 4,
  hint,
}: {
  name: string;
  label: string;
  value?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={value ?? ""}
        className="input-field resize-y font-mono text-sm"
      />
      {hint ? <p className="mt-1 text-xs text-brand-muted">{hint}</p> : null}
    </div>
  );
}

export function PropertyEditor({ property }: { property?: Property }) {
  const [state, formAction, pending] = useActionState<SaveState, FormData>(
    savePropertyAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-6">
      {property ? (
        <input type="hidden" name="id" value={property.id} />
      ) : null}

      <Section title="Basics">
        <TextField name="title" label="Title" value={property?.title} required />
        <TextField
          name="slug"
          label="URL slug"
          value={property?.slug}
          required
          hint="Lowercase letters, numbers, hyphens. e.g. the-crest-4-bedroom-duplex-lekki"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="category" className="input-label">Category</label>
            <select id="category" name="category" defaultValue={property?.category ?? "home"} className="input-field">
              <option value="home">Home</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="input-label">Type</label>
            <select id="type" name="type" defaultValue={property?.type ?? "duplex"} className="input-field">
              <optgroup label="Homes">
                <option value="apartment">Apartment</option>
                <option value="duplex">Duplex</option>
                <option value="terrace">Terrace</option>
                <option value="bungalow">Bungalow</option>
                <option value="villa">Villa</option>
              </optgroup>
              <optgroup label="Land">
                <option value="residential-land">Residential land</option>
                <option value="commercial-land">Commercial land</option>
                <option value="mixed-use-land">Mixed-use land</option>
                <option value="estate-allocation">Estate allocation</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label htmlFor="purpose" className="input-label">Purpose</label>
            <select id="purpose" name="purpose" defaultValue={property?.purpose ?? "sale"} className="input-field">
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
            </select>
          </div>
        </div>
        <TextArea
          name="shortDescription"
          label="Short description (shown on cards)"
          value={property?.shortDescription}
          rows={2}
        />
      </Section>

      <Section title="Price & status">
        <div className="grid gap-4 sm:grid-cols-4">
          <TextField name="price" label="Price" value={property?.price ?? ""} type="number" hint="Leave blank for 'on application'" />
          <div>
            <label htmlFor="currency" className="input-label">Currency</label>
            <select id="currency" name="currency" defaultValue={property?.currency ?? "NGN"} className="input-field">
              <option value="NGN">NGN ₦</option>
              <option value="USD">USD $</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="input-label">Status</label>
            <select id="status" name="status" defaultValue={property?.status ?? "available"} className="input-field">
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
              <option value="coming-soon">Coming soon</option>
            </select>
          </div>
          <TextField name="priceNote" label="Price note" value={property?.priceNote} hint='e.g. "per plot"' />
        </div>
        <label className="flex items-center gap-3 text-sm font-medium text-brand-forest">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={property?.featured}
            className="h-5 w-5 rounded border-brand-stone accent-[#1a3c2e]"
          />
          Feature this property on the homepage
        </label>
      </Section>

      <Section title="Location & specifications">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="location" label="Location (area, city)" value={property?.location} required />
          <TextField name="address" label="Address note" value={property?.address} />
          <TextField name="bedrooms" label="Bedrooms" value={property?.bedrooms ?? ""} type="number" />
          <TextField name="bathrooms" label="Bathrooms" value={property?.bathrooms ?? ""} type="number" />
          <TextField name="toilets" label="Toilets" value={property?.toilets ?? ""} type="number" />
          <TextField name="parkingSpaces" label="Parking spaces" value={property?.parkingSpaces ?? ""} type="number" />
          <TextField name="landSize" label="Land size" value={property?.landSize} placeholder="e.g. 500 sqm" />
          <TextField name="propertySize" label="Property (built) size" value={property?.propertySize} placeholder="e.g. 320 sqm" />
        </div>
      </Section>

      <Section title="Photos & video">
        <ImageUploader
          name="mainImageUrl"
          label="Main photo"
          initial={
            property?.mainImage.url
              ? [{ url: property.mainImage.url, alt: property.mainImage.alt }]
              : []
          }
          hint="Shown on cards and as the property page hero."
        />
        <TextField name="mainImageAlt" label="Main image alt text" value={property?.mainImage.alt} />
        <ImageUploader
          name="gallery"
          label="Gallery photos"
          multiple
          initial={property?.gallery ?? []}
          hint="Drag the arrows to reorder. First image shows largest on the page."
        />
        <TextField
          name="youtubeUrl"
          label="YouTube walkthrough URL or video ID"
          value={property?.youtubeUrl}
          hint="watch?v=, youtu.be/, embed/ and shorts/ links are all accepted"
        />
      </Section>

      <Section title="Details">
        <TextArea
          name="description"
          label="Full description"
          value={property?.description.join("\n\n")}
          rows={7}
          hint="Separate paragraphs with a blank line."
        />
        <TextArea
          name="amenities"
          label="Features / amenities"
          value={property?.amenities.join("\n")}
          rows={6}
          hint="One per line."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="developerName" label="Developer / brand name" value={property?.developerName} />
          <TextField name="developerNote" label="Developer note" value={property?.developerNote} />
        </div>
      </Section>

      <Section title="SEO">
        <TextField name="seoTitle" label="SEO title" value={property?.seoTitle} hint="Aim for under 60 characters." />
        <TextArea name="seoDescription" label="SEO meta description" value={property?.seoDescription} rows={2} />
        <TextArea
          name="seoKeywords"
          label="SEO keywords"
          value={property?.seoKeywords?.join("\n")}
          rows={3}
          hint="One keyword phrase per line."
        />
      </Section>

      {state.error ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pb-10">
        <button type="submit" className="btn-primary min-w-44" disabled={pending}>
          {pending ? "Saving…" : property ? "Save changes" : "Create property"}
        </button>
        <Link href="/admin/properties" className="btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}

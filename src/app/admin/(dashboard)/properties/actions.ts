"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Property } from "@/lib/types";
import { dbDeleteProperty, dbUpsertProperty, isSupabaseConfigured } from "@/lib/supabase";
import { getAllProperties } from "@/lib/data";
import { parsePropertyForm } from "@/lib/property-form";

export type SaveState = { error?: string; ok?: boolean };

export async function savePropertyAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "Saving requires Supabase. Connect the database (NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY) to enable edits.",
    };
  }

  const property = parsePropertyForm(formData);

  if (!property.title || !property.location) {
    return { error: "Title and location are required." };
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(property.slug)) {
    return {
      error: "Slug may only contain lowercase letters, numbers and hyphens.",
    };
  }

  const slugTaken = (await getAllProperties()).some(
    (p) => p.slug === property.slug && p.id !== property.id
  );
  if (slugTaken) {
    return { error: "That slug is already in use by another property." };
  }

  const saved = await dbUpsertProperty(property);
  if (!saved) {
    return { error: "Could not save right now. Please try again." };
  }

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath(`/properties/${property.slug}`);
  redirect("/admin/properties?saved=1");
}

export async function deletePropertyAction(formData: FormData) {
  if (!isSupabaseConfigured()) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await dbDeleteProperty(id);
  revalidatePath("/admin/properties");
  revalidatePath("/properties");
}

export async function duplicatePropertyAction(formData: FormData) {
  if (!isSupabaseConfigured()) return;
  const id = String(formData.get("id") ?? "");
  const all = await getAllProperties();
  const source = all.find((p) => p.id === id);
  if (!source) return;
  const copy: Property = {
    ...source,
    id: `prop-${Date.now().toString(36)}`,
    slug: `${source.slug}-copy-${Date.now().toString(36).slice(-4)}`,
    title: `${source.title} (Copy)`,
    status: "coming-soon",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await dbUpsertProperty(copy);
  revalidatePath("/admin/properties");
}

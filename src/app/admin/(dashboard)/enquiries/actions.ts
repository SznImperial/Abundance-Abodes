"use server";

import { revalidatePath } from "next/cache";
import { dbUpdateEnquiryStatus, isSupabaseConfigured } from "@/lib/supabase";
import type { EnquiryStatus } from "@/lib/types";

const VALID: EnquiryStatus[] = ["new", "contacted", "in-progress", "completed"];

export async function updateEnquiryStatusAction(formData: FormData) {
  if (!isSupabaseConfigured()) return;
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as EnquiryStatus;
  if (!id || !VALID.includes(status)) return;
  await dbUpdateEnquiryStatus(id, status);
  revalidatePath("/admin/enquiries");
}

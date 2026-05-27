"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

type State = { error?: string } | null;

export async function createEvent(formData: FormData): Promise<State> {
  const type = formData.get("type") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) ?? "";
  const cover_image_url = (formData.get("cover_image_url") as string) ?? "";
  const galleryJson = (formData.get("gallery_json") as string) ?? "[]";

  let gallery: string[] = [];
  try {
    gallery = JSON.parse(galleryJson);
  } catch {
    gallery = [];
  }

  const { error } = await supabase.from("events").insert({
    type,
    title,
    description,
    cover_image_url,
    gallery,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(formData: FormData): Promise<State> {
  const id = formData.get("id") as string;
  const type = formData.get("type") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) ?? "";
  const cover_image_url = (formData.get("cover_image_url") as string) ?? "";
  const galleryJson = (formData.get("gallery_json") as string) ?? "[]";

  let gallery: string[] = [];
  try {
    gallery = JSON.parse(galleryJson);
  } catch {
    gallery = [];
  }

  const { error } = await supabase
    .from("events")
    .update({
      type,
      title,
      description,
      cover_image_url,
      gallery,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

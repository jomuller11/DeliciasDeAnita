"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

type State = { error?: string } | null;

export async function createProduct(formData: FormData): Promise<State> {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) ?? "";
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const tags = formData.getAll("tags") as string[];
  const image_url = (formData.get("image_url") as string) ?? "";

  const { error } = await supabase.from("products").insert({
    title,
    description,
    price,
    category,
    tags,
    image_url,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData): Promise<State> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) ?? "";
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const tags = formData.getAll("tags") as string[];
  const image_url = (formData.get("image_url") as string) ?? "";

  const { error } = await supabase
    .from("products")
    .update({ title, description, price, category, tags, image_url, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

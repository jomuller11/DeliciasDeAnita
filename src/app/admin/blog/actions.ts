"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { ContentBlock } from "@/lib/types";

type State = { error?: string } | null;

function parseContent(json: string): ContentBlock[] {
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

export async function createPost(formData: FormData): Promise<State> {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const cover_image_url = (formData.get("cover_image_url") as string) ?? "";
  const contentJson = (formData.get("content_json") as string) ?? "[]";
  const publishedAt = formData.get("published_at") as string | null;

  if (!slug) return { error: "El slug es obligatorio" };

  const { error } = await supabase.from("blog_posts").insert({
    title,
    slug,
    excerpt,
    cover_image_url,
    content: parseContent(contentJson),
    published_at: publishedAt || null,
  });

  if (error) {
    if (error.code === "23505") return { error: "Ya existe un post con ese slug" };
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(formData: FormData): Promise<State> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const cover_image_url = (formData.get("cover_image_url") as string) ?? "";
  const contentJson = (formData.get("content_json") as string) ?? "[]";
  const publishedAt = formData.get("published_at") as string | null;

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      excerpt,
      cover_image_url,
      content: parseContent(contentJson),
      published_at: publishedAt || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") return { error: "Ya existe un post con ese slug" };
    return { error: error.message };
  }

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

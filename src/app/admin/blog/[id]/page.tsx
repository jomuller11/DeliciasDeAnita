import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BlogForm from "../_components/BlogForm";
import { updatePost } from "../actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/blog"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver al blog
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Editar: {post.title}
        </h1>
      </div>
      <BlogForm
        action={updatePost}
        defaultValues={post}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}

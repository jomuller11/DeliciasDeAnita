import BlogForm from "../_components/BlogForm";
import { createPost } from "../actions";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/blog"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver al blog
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Nueva nota</h1>
      </div>
      <BlogForm action={createPost} submitLabel="Publicar nota" />
    </div>
  );
}

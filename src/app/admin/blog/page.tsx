import { supabase } from "@/lib/supabase";
import { PageHeader } from "../_components/PageHeader";
import { DeleteForm } from "../_components/DeleteForm";
import { deletePost } from "./actions";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <PageHeader
        title="Blog"
        action={{ label: "+ Nueva nota", href: "/admin/blog/new" }}
      />

      {!posts?.length ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No hay notas todavía.</p>
          <p className="text-sm mt-1">
            Hacé clic en &quot;Nueva nota&quot; para empezar.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Portada
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Título
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Slug
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Estado
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(posts as BlogPost[]).map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                    /blog/{post.slug}
                  </td>
                  <td className="px-4 py-3">
                    {post.published_at ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Publicado
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                        Borrador
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3 justify-end">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-green-700 hover:text-green-900 font-medium"
                      >
                        Editar
                      </Link>
                      <DeleteForm action={deletePost} id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { supabase } from "@/lib/supabase";
import { PageHeader } from "../_components/PageHeader";
import { DeleteForm } from "../_components/DeleteForm";
import { deleteProduct } from "./actions";
import Link from "next/link";
import type { DbProduct } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <PageHeader
        title="Productos"
        action={{ label: "+ Nuevo producto", href: "/admin/products/new" }}
      />

      {!products?.length ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No hay productos todavía.</p>
          <p className="text-sm mt-1">
            Hacé clic en &quot;Nuevo producto&quot; para empezar.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Foto
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Título
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Categoría
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Precio
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Etiquetas
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(products as DbProduct[]).map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {p.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.category}</td>
                  <td className="px-4 py-3 text-gray-600">{p.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3 justify-end">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-green-700 hover:text-green-900 font-medium"
                      >
                        Editar
                      </Link>
                      <DeleteForm action={deleteProduct} id={p.id} />
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

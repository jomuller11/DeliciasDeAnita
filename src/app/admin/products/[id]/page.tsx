import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductForm from "../_components/ProductForm";
import { updateProduct } from "../actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver a productos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Editar: {product.title}
        </h1>
      </div>
      <ProductForm
        action={updateProduct}
        defaultValues={product}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}

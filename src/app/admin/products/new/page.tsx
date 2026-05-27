import ProductForm from "../_components/ProductForm";
import { createProduct } from "../actions";
import Link from "next/link";

export default function NewProductPage() {
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
          Nuevo producto
        </h1>
      </div>
      <ProductForm action={createProduct} submitLabel="Crear producto" />
    </div>
  );
}

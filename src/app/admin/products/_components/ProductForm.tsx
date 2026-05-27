"use client";
import { useTransition, useState } from "react";
import { uploadFile } from "@/lib/upload";
import type { DbProduct } from "@/lib/types";

const CATEGORIES = [
  "Tortas",
  "Box Dulce",
  "Eventos",
  "Alfajores",
  "Brownies",
  "Cookies",
  "Personalizado",
  "Sin TACC",
];

const TAGS = ["Novedad", "Promo", "Sin TACC", "Destacado", "Personalizado"];

type Props = {
  action: (formData: FormData) => Promise<{ error?: string } | null>;
  defaultValues?: Partial<DbProduct>;
  submitLabel?: string;
};

export default function ProductForm({
  action,
  defaultValues = {},
  submitLabel = "Guardar producto",
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultValues.tags ?? []
  );
  const [preview, setPreview] = useState<string | null>(
    defaultValues.image_url || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Upload image if a new one was selected
    let imageUrl = (formData.get("existing_image_url") as string) ?? "";
    if (imageFile) {
      try {
        imageUrl = await uploadFile(imageFile, "products");
      } catch (err) {
        setError("Error al subir la imagen. Intentá de nuevo.");
        return;
      }
    }
    formData.set("image_url", imageUrl);

    // Pass selected tags
    formData.delete("tags");
    selectedTags.forEach((tag) => formData.append("tags", tag));

    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-100">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título *
          </label>
          <input
            name="title"
            type="text"
            required
            defaultValue={defaultValues.title}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio *
          </label>
          <input
            name="price"
            type="text"
            required
            placeholder="ej: $18.500 o desde $9.200"
            defaultValue={defaultValues.price}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues.description}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoría *
        </label>
        <select
          name="category"
          required
          defaultValue={defaultValues.category ?? "Tortas"}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Etiquetas
        </label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white text-gray-600 border-gray-300 hover:border-green-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto
        </label>
        <div className="flex gap-4 items-start">
          {preview && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
              <img
                src={preview}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
        </div>
        {defaultValues.image_url && (
          <input
            type="hidden"
            name="existing_image_url"
            value={defaultValues.image_url}
          />
        )}
      </div>

      {defaultValues.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div className="pt-2 flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Guardando..." : submitLabel}
        </button>
        <a
          href="/admin/products"
          className="px-6 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 transition-colors"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}

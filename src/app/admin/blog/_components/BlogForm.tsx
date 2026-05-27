"use client";
import { useTransition, useState, useRef } from "react";
import { uploadFile } from "@/lib/upload";
import type { BlogPost, ContentBlock } from "@/lib/types";

type BlockWithMeta = {
  _id: string;
  _previewUrl?: string;
  type: "paragraph" | "image" | "quote";
  text?: string;
  url?: string;
  caption?: string;
  author?: string;
};

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type Props = {
  action: (formData: FormData) => Promise<{ error?: string } | null>;
  defaultValues?: Partial<BlogPost>;
  submitLabel?: string;
};

export default function BlogForm({
  action,
  defaultValues = {},
  submitLabel = "Guardar",
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(defaultValues.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!defaultValues.slug);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    defaultValues.cover_image_url ?? null
  );
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [blocks, setBlocks] = useState<BlockWithMeta[]>(
    (defaultValues.content ?? []).map((b) => ({ ...b, _id: makeId() })) as BlockWithMeta[]
  );

  // Map of block _id → selected File (for image blocks)
  const blockFilesRef = useRef<Map<string, File>>(new Map());

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugEdited) setSlug(toSlug(e.target.value));
  }

  function addBlock(type: ContentBlock["type"]) {
    const _id = makeId();
    const newBlock: BlockWithMeta =
      type === "paragraph"
        ? { _id, type: "paragraph", text: "" }
        : type === "image"
        ? { _id, type: "image", url: "", caption: "" }
        : { _id, type: "quote", text: "", author: "" };
    setBlocks((prev) => [...prev, newBlock]);
  }

  function updateBlock(id: string, updates: Partial<BlockWithMeta>) {
    setBlocks((prev) =>
      prev.map((b) => (b._id === id ? { ...b, ...updates } : b))
    );
  }

  function removeBlock(id: string) {
    blockFilesRef.current.delete(id);
    setBlocks((prev) => prev.filter((b) => b._id !== id));
  }

  function moveBlock(id: string, dir: "up" | "down") {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b._id === id);
      if (idx < 0) return prev;
      const swap = dir === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next as BlockWithMeta[];
    });
  }

  function handleBlockImageFile(blockId: string, file: File) {
    blockFilesRef.current.set(blockId, file);
    updateBlock(blockId, { _previewUrl: URL.createObjectURL(file) });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Upload cover image
    let coverUrl = (formData.get("existing_cover_url") as string) ?? "";
    if (coverFile) {
      setUploading(true);
      try {
        coverUrl = await uploadFile(coverFile, "blog");
      } catch {
        setError("Error al subir la portada. Intentá de nuevo.");
        setUploading(false);
        return;
      }
    }

    // Upload image blocks
    const finalBlocks: ContentBlock[] = [];
    setUploading(true);
    try {
      for (const block of blocks) {
        if (block.type === "paragraph") {
          finalBlocks.push({ type: "paragraph", text: block.text ?? "" });
        } else if (block.type === "quote") {
          finalBlocks.push({ type: "quote", text: block.text ?? "", author: block.author ?? "" });
        } else if (block.type === "image") {
          let url = block.url ?? "";
          if (!url) {
            const file = blockFilesRef.current.get(block._id);
            if (file) url = await uploadFile(file, "blog");
          }
          finalBlocks.push({ type: "image", url, caption: block.caption ?? "" });
        }
      }
    } catch {
      setError("Error al subir imágenes del contenido. Intentá de nuevo.");
      setUploading(false);
      return;
    }
    setUploading(false);

    formData.set("cover_image_url", coverUrl);
    formData.set("content_json", JSON.stringify(finalBlocks));
    formData.set("slug", slug);

    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) setError(result.error);
    });
  }

  const busy = isPending || uploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-100">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título *
        </label>
        <input
          name="title"
          type="text"
          required
          defaultValue={defaultValues.title}
          onChange={handleTitleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL del post
        </label>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400 whitespace-nowrap">/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugEdited(true);
            }}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="mi-post"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resumen
        </label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={defaultValues.excerpt}
          placeholder="Breve descripción para la lista de posts"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen de portada
        </label>
        <div className="flex gap-4 items-start">
          {coverPreview && (
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src={coverPreview}
                alt="Portada"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setCoverFile(f);
                setCoverPreview(URL.createObjectURL(f));
              }
            }}
            className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>
        {defaultValues.cover_image_url && (
          <input
            type="hidden"
            name="existing_cover_url"
            value={defaultValues.cover_image_url}
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de publicación
        </label>
        <input
          name="published_at"
          type="date"
          defaultValue={
            defaultValues.published_at
              ? new Date(defaultValues.published_at).toISOString().split("T")[0]
              : ""
          }
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <p className="text-xs text-gray-500 mt-1">
          Dejá vacío para guardar como borrador
        </p>
      </div>

      {/* Content block editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Contenido
        </label>

        <div className="space-y-3">
          {blocks.map((block, index) => (
            <div
              key={block._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {block.type === "paragraph"
                    ? "Párrafo"
                    : block.type === "image"
                    ? "Imagen"
                    : "Cita"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveBlock(block._id, "up")}
                    disabled={index === 0}
                    className="px-1.5 py-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 text-base leading-none"
                    title="Subir"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(block._id, "down")}
                    disabled={index === blocks.length - 1}
                    className="px-1.5 py-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 text-base leading-none"
                    title="Bajar"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeBlock(block._id)}
                    className="ml-1 px-1.5 py-0.5 text-gray-400 hover:text-red-500 text-lg leading-none"
                    title="Eliminar bloque"
                  >
                    ×
                  </button>
                </div>
              </div>

              {block.type === "paragraph" && (
                <textarea
                  rows={4}
                  value={block.text ?? ""}
                  onChange={(e) =>
                    updateBlock(block._id, { text: e.target.value })
                  }
                  placeholder="Escribí el párrafo..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none bg-white"
                />
              )}

              {block.type === "quote" && (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={block.text ?? ""}
                    onChange={(e) =>
                      updateBlock(block._id, { text: e.target.value })
                    }
                    placeholder="Texto de la cita..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none bg-white"
                  />
                  <input
                    type="text"
                    value={block.author ?? ""}
                    onChange={(e) =>
                      updateBlock(block._id, { author: e.target.value })
                    }
                    placeholder="Autor (opcional)"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                  />
                </div>
              )}

              {block.type === "image" && (
                <div className="space-y-2">
                  {block.url ? (
                    <div className="relative">
                      <img
                        src={block.url}
                        alt=""
                        className="w-full max-h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => updateBlock(block._id, { url: "" })}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : block._previewUrl ? (
                    <div className="relative">
                      <img
                        src={block._previewUrl}
                        alt=""
                        className="w-full max-h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          blockFilesRef.current.delete(block._id);
                          updateBlock(block._id, { _previewUrl: undefined });
                        }}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleBlockImageFile(block._id, f);
                      }}
                      className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700"
                    />
                  )}
                  <input
                    type="text"
                    value={block.caption ?? ""}
                    onChange={(e) =>
                      updateBlock(block._id, { caption: e.target.value })
                    }
                    placeholder="Descripción de la imagen (opcional)"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          {(["paragraph", "image", "quote"] as ContentBlock["type"][]).map(
            (type) => (
              <button
                key={type}
                type="button"
                onClick={() => addBlock(type)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                +{" "}
                {type === "paragraph"
                  ? "Párrafo"
                  : type === "image"
                  ? "Imagen"
                  : "Cita"}
              </button>
            )
          )}
        </div>
      </div>

      {defaultValues.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div className="pt-2 flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-800 disabled:opacity-50 transition-colors"
        >
          {uploading
            ? "Subiendo imágenes..."
            : isPending
            ? "Guardando..."
            : submitLabel}
        </button>
        <a
          href="/admin/blog"
          className="px-6 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 transition-colors"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}

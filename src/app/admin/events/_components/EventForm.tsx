"use client";
import { useTransition, useState } from "react";
import { uploadFile } from "@/lib/upload";
import type { DbEvent } from "@/lib/types";

const EVENT_TYPES = [
  "Cumpleaños",
  "Eventos Especiales",
  "Celebraciones",
  "XV Años",
  "Casamiento",
  "Infantil",
  "Otro",
];

type Props = {
  action: (formData: FormData) => Promise<{ error?: string } | null>;
  defaultValues?: Partial<DbEvent>;
  submitLabel?: string;
};

export default function EventForm({
  action,
  defaultValues = {},
  submitLabel = "Guardar evento",
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Existing gallery management
  const [existingGallery, setExistingGallery] = useState<string[]>(
    defaultValues.gallery ?? []
  );
  const [existingCover, setExistingCover] = useState(
    defaultValues.cover_image_url ?? ""
  );

  // New files
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [newCoverIndex, setNewCoverIndex] = useState(0);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewFiles(files);
    setNewPreviews(files.map((f) => URL.createObjectURL(f)));
    setNewCoverIndex(0);
    setExistingCover(""); // deselect existing cover when new files added
  }

  function removeExisting(url: string) {
    const updated = existingGallery.filter((u) => u !== url);
    setExistingGallery(updated);
    if (existingCover === url) setExistingCover(updated[0] ?? "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Upload new files
    let uploadedUrls: string[] = [];
    if (newFiles.length > 0) {
      setUploading(true);
      try {
        uploadedUrls = await Promise.all(
          newFiles.map((f) => uploadFile(f, "events"))
        );
      } catch {
        setError("Error al subir imágenes. Intentá de nuevo.");
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const finalGallery = [...existingGallery, ...uploadedUrls];
    const coverUrl =
      uploadedUrls.length > 0
        ? uploadedUrls[newCoverIndex]
        : existingCover || finalGallery[0] || "";

    const formData = new FormData(e.currentTarget);
    formData.set("gallery_json", JSON.stringify(finalGallery));
    formData.set("cover_image_url", coverUrl);

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de evento *
          </label>
          <select
            name="type"
            required
            defaultValue={defaultValues.type ?? "Cumpleaños"}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          >
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={defaultValues.description}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
        />
      </div>

      {/* Existing gallery */}
      {existingGallery.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Galería actual — clic para elegir portada
          </label>
          <div className="grid grid-cols-4 gap-2">
            {existingGallery.map((url) => (
              <div
                key={url}
                onClick={() => {
                  setExistingCover(url);
                  setNewFiles([]);
                  setNewPreviews([]);
                }}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  existingCover === url && newPreviews.length === 0
                    ? "border-green-600 ring-2 ring-green-200"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {existingCover === url && newPreviews.length === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs text-center py-0.5 font-medium">
                    Portada
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExisting(url);
                  }}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {existingGallery.length > 0
            ? "Agregar más imágenes"
            : "Galería de imágenes"}
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFiles}
          className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {newPreviews.length > 0 && (
          <>
            <p className="text-xs text-gray-500 mt-2 mb-2">
              Clic en una imagen para marcarla como portada
            </p>
            <div className="grid grid-cols-4 gap-2">
              {newPreviews.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setNewCoverIndex(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    newCoverIndex === i
                      ? "border-green-600 ring-2 ring-green-200"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {newCoverIndex === i && (
                    <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs text-center py-0.5 font-medium">
                      Portada
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
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
          href="/admin/events"
          className="px-6 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 transition-colors"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}

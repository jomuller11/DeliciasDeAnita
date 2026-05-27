export async function uploadFile(
  file: File,
  bucket: "products" | "events" | "blog"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucket);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Error al subir la imagen");
  return data.url as string;
}

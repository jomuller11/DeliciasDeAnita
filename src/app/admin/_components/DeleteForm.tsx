"use client";

export function DeleteForm({
  action,
  id,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("¿Eliminar? Esta acción no se puede deshacer."))
          e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
      >
        Eliminar
      </button>
    </form>
  );
}

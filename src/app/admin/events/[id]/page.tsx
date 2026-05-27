import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EventForm from "../_components/EventForm";
import { updateEvent } from "../actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/events"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver a eventos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Editar: {event.title}
        </h1>
      </div>
      <EventForm
        action={updateEvent}
        defaultValues={event}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}

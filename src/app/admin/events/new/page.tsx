import EventForm from "../_components/EventForm";
import { createEvent } from "../actions";
import Link from "next/link";

export default function NewEventPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          href="/admin/events"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver a eventos
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Nuevo evento</h1>
      </div>
      <EventForm action={createEvent} submitLabel="Crear evento" />
    </div>
  );
}

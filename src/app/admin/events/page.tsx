import { supabase } from "@/lib/supabase";
import { PageHeader } from "../_components/PageHeader";
import { DeleteForm } from "../_components/DeleteForm";
import { deleteEvent } from "./actions";
import Link from "next/link";
import type { DbEvent } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <PageHeader
        title="Eventos"
        action={{ label: "+ Nuevo evento", href: "/admin/events/new" }}
      />

      {!events?.length ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No hay eventos todavía.</p>
          <p className="text-sm mt-1">
            Hacé clic en &quot;Nuevo evento&quot; para empezar.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Portada
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Título
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Tipo
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Imágenes
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(events as DbEvent[]).map((ev) => (
                <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {ev.cover_image_url ? (
                      <img
                        src={ev.cover_image_url}
                        alt={ev.title}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {ev.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{ev.type}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {ev.gallery.length} foto{ev.gallery.length !== 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3 justify-end">
                      <Link
                        href={`/admin/events/${ev.id}`}
                        className="text-green-700 hover:text-green-900 font-medium"
                      >
                        Editar
                      </Link>
                      <DeleteForm action={deleteEvent} id={ev.id} />
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

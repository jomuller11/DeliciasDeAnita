import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/lib/events";

export function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/eventos/${event.slug}`}
      className="group relative block rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-azul-dk/90 via-azul-dk/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="eyebrow !text-verde mb-1.5">{event.category}</div>
          <h3 className="font-display text-[19px] font-semibold text-white leading-tight">
            {event.title}
          </h3>
          <span className="inline-block mt-3 font-body text-[12px] font-semibold tracking-[0.5px] text-white/75 border-b border-white/30 pb-0.5 group-hover:text-verde group-hover:border-verde transition-colors">
            Ver más →
          </span>
        </div>
      </div>
    </Link>
  );
}

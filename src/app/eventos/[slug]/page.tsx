import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EVENTS, getEvent } from "@/lib/events";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return {
    title: `${event.title} · Delicias de Anita`,
    description: event.description,
  };
}

export default async function EventoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <>
      <Header />

      <main className="bg-marfil min-h-screen">
        <section className="relative overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-azul-dk/70" />
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-20 min-h-[380px] flex items-end pb-14">
            <div>
              <div className="eyebrow !text-verde mb-3">{event.category}</div>
              <h1 className="font-display text-[38px] sm:text-[52px] font-semibold leading-tight text-white">
                {event.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-14">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <p className="font-body text-[15px] text-azul/85 leading-relaxed max-w-[620px]">
              {event.description}
            </p>
            <a
              href="https://wa.me/541163063039"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "shrink-0 inline-flex items-center justify-center",
                "font-body font-semibold text-[13px] tracking-[0.5px]",
                "bg-verde text-azul-dk",
                "px-6 py-3 rounded-md shadow-[var(--shadow-sm)]",
                "hover:brightness-95 transition-all whitespace-nowrap",
              ].join(" ")}
            >
              Consultar por este evento
            </a>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-20">
          <div className="eyebrow mb-6">Galería</div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {event.gallery.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-xs)]"
              >
                <Image
                  src={src}
                  alt={`${event.title} - foto ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-16">
          <Link
            href="/eventos"
            className="font-body text-[13px] text-azul-dk/70 hover:text-verde transition-colors"
          >
            ← Volver a todos los eventos
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

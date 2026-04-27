import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { EVENTS } from "@/lib/events";

export const metadata = {
  title: "Eventos · Delicias de Anita",
  description:
    "Galería de eventos especiales: cumpleaños, bodas, baby showers, mesas dulces corporativas y más. Cada celebración, hecha con amor.",
};

export default function EventosPage() {
  return (
    <>
      <Header />

      <main className="bg-marfil min-h-screen">
        <section className="relative overflow-hidden">
          <Image
            src={EVENTS[0].coverImage}
            alt="Eventos Delicias de Anita"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-azul-dk/75" />
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-20 lg:py-28 min-h-[420px] flex items-center">
            <div className="max-w-[620px]">
              <div className="eyebrow !text-verde mb-4">
                Galería de Eventos · Buenos Aires
              </div>
              <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[62px] font-semibold leading-[1.05] text-white">
                Cada celebración,
                <br />
                <em className="font-accent text-verde">una obra de arte.</em>
              </h1>
              <p className="font-body text-[16px] text-white/85 leading-relaxed max-w-[480px] mt-6">
                Cumpleaños, bodas, baby showers, comuniones y todo lo que quieras
                celebrar. Mirá algunos de los eventos que creamos con amor.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20">
          <div className="mb-10">
            <div className="eyebrow mb-2">Nuestros eventos</div>
            <h2 className="font-display text-[28px] sm:text-[34px] font-semibold text-azul-dk">
              Momentos que creamos juntos
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>

        <section className="bg-azul-dk py-16">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
            <div className="eyebrow !text-verde mb-3">¿Tenés un evento?</div>
            <h2 className="font-display text-[28px] sm:text-[34px] font-semibold text-white mb-4">
              Contanos tu idea, la hacemos realidad
            </h2>
            <p className="font-body text-[15px] text-white/80 max-w-[480px] mx-auto mb-8">
              Cada evento es único. Escribinos por WhatsApp y armamos juntos la
              propuesta perfecta para tu celebración.
            </p>
            <a
              href="https://wa.me/541163063039"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center justify-center",
                "font-body font-semibold text-[13px] tracking-[0.5px]",
                "bg-verde text-azul-dk",
                "px-7 py-3.5 rounded-md shadow-[var(--shadow-sm)]",
                "hover:brightness-95 transition-all",
              ].join(" ")}
            >
              Pedir por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

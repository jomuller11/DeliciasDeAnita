import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/SectionTitle";
import { CatalogGrid } from "@/components/CatalogGrid";

/* ─── /catalogo ──────────────────────────────────────────── */
export default function CatalogoPage() {
  return (
    <>
      <Header />

      <main className="bg-marfil min-h-screen">
        {/* Hero band — crema background, with decorative seal */}
        <section className="bg-crema/60 border-b border-azul-dk/10 overflow-hidden">
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <SectionTitle
                eyebrow="Catálogo · Hecho con amor"
                title="Nuestras Delicias"
                lede="Cada pieza es única, elaborada con dedicación y los mejores ingredientes. Pedís lo que querés por WhatsApp y te lo llevamos."
              />
              <Image
                src="/logos/sello-verde.png"
                alt=""
                width={916}
                height={916}
                priority
                className="hidden md:block w-[180px] h-[180px] rounded-full shadow-[var(--shadow-md)] rotate-[6deg]"
              />
            </div>
          </div>
        </section>

        {/* Catalog */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
          <CatalogGrid />
        </section>

        {/* CTA band — Impacto combo §03 */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-20">
          <div
            className={[
              "bg-azul-dk text-white",
              "rounded-[var(--radius-lg)]",
              "px-8 lg:px-12 py-12 lg:py-14",
              "flex flex-col md:flex-row md:items-center md:justify-between gap-6",
            ].join(" ")}
          >
            <div className="max-w-xl">
              <div className="eyebrow !text-verde mb-2">¿No encontrás lo tuyo?</div>
              <h3 className="font-display text-[28px] leading-tight">
                Hacemos pedidos personalizados para tu celebración.
              </h3>
              <p className="font-accent italic text-[15px] text-white/60 mt-3">
                Contanos qué imaginás y lo hacemos realidad ♡
              </p>
            </div>
            <a
              href="https://wa.me/541163063039?text=¡Hola!%20Quiero%20hacer%20un%20pedido%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center justify-center",
                "font-body font-semibold text-[13px] tracking-[0.5px]",
                "bg-verde text-azul-dk",
                "px-6 py-3.5 rounded-md",
                "shadow-[var(--shadow-sm)]",
                "hover:brightness-95 transition-all whitespace-nowrap",
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

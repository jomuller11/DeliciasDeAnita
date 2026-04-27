import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CatalogGrid } from "@/components/CatalogGrid";

export default function CatalogoPage() {
  return (
    <>
      <Header />

      <main className="bg-marfil min-h-screen">
        <section className="relative border-b border-azul-dk/10 overflow-hidden">
          <Image
            src="/products/121212.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_44%]"
          />
          <div className="absolute inset-0 bg-azul-dk/70" />
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <header className="max-w-[680px]">
              <div className="eyebrow !text-verde !font-bold mb-2">
                Catálogo · Hecho con amor
              </div>
              <h1 className="font-display text-[42px] lg:text-[52px] font-semibold leading-[1.05] text-white">
                Nuestras Delicias
              </h1>
              <p className="font-body text-[16px] text-white/85 mt-5 leading-relaxed max-w-[560px]">
                Cada pieza es única, elaborada con dedicación y los mejores
                ingredientes. Pedís lo que querés por WhatsApp y te lo llevamos.
              </p>
            </header>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
          <CatalogGrid />
        </section>

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-20">
          <div
            className={[
              "bg-azul-dk text-white",
              "rounded-[var(--radius-lg)]",
              "px-8 lg:px-12 py-10 lg:py-12",
              "flex flex-col md:flex-row md:items-center md:justify-between gap-6",
            ].join(" ")}
          >
            <div className="max-w-xl">
              <div className="eyebrow !text-verde !text-[25px] !tracking-0 !normal-case mb-1">
                ¿No encontrás lo tuyo?
              </div>
              <h3 className="font-display text-[30px] lg:text-[34px] leading-[1.08] text-crema">
                Hacemos pedidos personalizados para tu celebración.
              </h3>
              <p className="font-accent italic text-[20px] text-white/75 mt-2">
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

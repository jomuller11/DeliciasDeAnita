import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { brand } from "@/lib/tokens";

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-marfil min-h-screen">
        <section className="relative overflow-hidden">
          <Image
            src="/products/Highend_professional_product_2k_202602111349.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_42%]"
          />
          <div className="absolute inset-0 bg-azul-dk/72" />
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-20 lg:py-28 min-h-[560px] flex items-center">
            <div className="max-w-[680px]">
              <div className="eyebrow !text-verde mb-4">
                Pastelería Artesanal · Buenos Aires
              </div>
              <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[68px] font-semibold leading-[1.05] text-white">
                Endulzamos tu día,
                <br />
                <em className="font-accent text-verde">
                  celebramos tus momentos.
                </em>
              </h1>
              <p className="font-body text-[16px] text-white/85 leading-relaxed max-w-[520px] mt-7">
                {brand.essence}
              </p>

              <div className="flex flex-wrap gap-3 mt-9">
                <Link
                  href="/catalogo"
                  className={[
                    "inline-flex items-center justify-center",
                    "font-body font-semibold text-[13px] tracking-[0.5px]",
                    "bg-verde text-azul-dk",
                    "px-[22px] py-3 rounded-md shadow-[var(--shadow-sm)]",
                    "hover:brightness-95 transition-all",
                  ].join(" ")}
                >
                  Ver catálogo
                </Link>
                <a
                  href={brand.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "inline-flex items-center justify-center",
                    "font-body font-semibold text-[13px] tracking-[0.5px]",
                    "bg-transparent text-white border-2 border-white/80",
                    "px-[22px] py-[10px] rounded-md",
                    "hover:bg-white hover:text-azul-dk transition-all",
                  ].join(" ")}
                >
                  Pedir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "♡",
                title: "Hecho con Amor",
                desc: "Cada pieza es única, elaborada con dedicación y cariño genuino. No hay producción en serie.",
              },
              {
                icon: "⌘",
                title: "Recetas Artesanales",
                desc: "Fórmulas propias y tradicionales que preservan el sabor auténtico. Sin atajos.",
              },
              {
                icon: "✦",
                title: "Ingredientes de Calidad",
                desc: "Solo lo mejor entra en cada preparación. Materias primas seleccionadas cuidadosamente.",
              },
            ].map((p) => (
              <article
                key={p.title}
                className={[
                  "bg-white rounded-[var(--radius-lg)]",
                  "p-6 shadow-[var(--shadow-xs)]",
                  "border-t-[3px] border-verde",
                ].join(" ")}
              >
                <div className="text-2xl text-azul-dk mb-3">{p.icon}</div>
                <h3 className="font-display text-[16px] font-semibold text-azul-dk mb-2">
                  {p.title}
                </h3>
                <p className="font-body text-[12px] text-azul/85 leading-relaxed">
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

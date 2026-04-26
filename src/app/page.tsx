import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { brand } from "@/lib/tokens";

/* ─── / · Home ───────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-marfil min-h-screen">
        {/* Hero */}
        <section className="relative max-w-[1200px] mx-auto px-6 lg:px-10 py-20 lg:py-28 overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <div className="max-w-[640px]">
              <div className="eyebrow mb-4">Pastelería Artesanal · Buenos Aires</div>
              <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[68px] font-semibold leading-[1.05] text-azul-dk">
                Endulzamos tu día,
                <br />
                <em className="font-accent text-verde">
                  celebramos tus momentos.
                </em>
              </h1>
              <p className="font-body text-[16px] text-azul/90 leading-relaxed max-w-[520px] mt-7">
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
                    "bg-transparent text-azul-dk border-2 border-azul-dk",
                    "px-[22px] py-[10px] rounded-md",
                    "hover:bg-azul-dk hover:text-white transition-all",
                  ].join(" ")}
                >
                  Pedir por WhatsApp
                </a>
              </div>
            </div>

            {/* Brand seal — decorative */}
            <div className="hidden lg:block relative">
              <Image
                src="/logos/sello-crema.png"
                alt={`${brand.name} sello`}
                width={1936}
                height={1936}
                priority
                className="w-[420px] h-[420px] rounded-full shadow-[var(--shadow-lg)] rotate-[-4deg]"
              />
              {/* Decorative offset accent */}
              <div
                aria-hidden
                className="absolute -bottom-3 -left-3 w-24 h-24 rounded-full bg-lima -z-10 blur-sm opacity-70"
              />
            </div>
          </div>
        </section>

        {/* Pillars — taken verbatim from Design System §01 */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-20">
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

import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/tokens";

/* ─── Footer ─────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="bg-azul-dk text-white/70 mt-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Image
              src="/logos/logo-full.png"
              alt={`${brand.name} isologo`}
              width={192}
              height={194}
              className="w-16 h-auto mb-5 brightness-[10] opacity-90"
            />
            <div className="eyebrow !text-verde mb-2">Pastelería Artesanal</div>
            <h3 className="font-display text-[24px] text-white leading-tight">
              {brand.name}
            </h3>
            <p className="font-accent italic text-[15px] text-white/70 mt-3 max-w-[280px]">
              {brand.slogan}
            </p>
          </div>

          {/* Contact */}
          <div>
            <div className="label-tag text-white/60 mb-3">Contacto</div>
            <ul className="space-y-2 font-body text-[13px]">
              <li>
                <a
                  href="https://instagram.com/deliciasdeanitaok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-verde transition-colors"
                >
                  Instagram · {brand.contact.instagram}
                </a>
              </li>
              <li>
                <a
                  href={brand.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-verde transition-colors"
                >
                  WhatsApp · {brand.contact.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          {/* Sitio */}
          <div>
            <div className="label-tag text-white/60 mb-3">Navegación</div>
            <ul className="space-y-2 font-body text-[13px]">
              <li><Link href="/" className="hover:text-verde transition-colors">Inicio</Link></li>
              <li><Link href="/catalogo" className="hover:text-verde transition-colors">Catálogo</Link></li>
              <li><Link href="#" className="hover:text-verde transition-colors">Eventos</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <p className="font-accent italic text-[14px] text-white/60">
            Hecho con amor, para momentos inolvidables ♡
          </p>
          <p className="font-body text-[11px] text-white/50 tracking-wider">
            © {new Date().getFullYear()} Delicias de Anita
          </p>
        </div>
      </div>
    </footer>
  );
}

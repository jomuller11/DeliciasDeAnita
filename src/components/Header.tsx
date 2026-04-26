import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/tokens";

/* ─── Header ─────────────────────────────────────────────── */
export function Header() {
  return (
    <header
      className={[
        "sticky top-0 z-30",
        "bg-marfil/90 backdrop-blur-md",
        "border-b border-azul-dk/10",
      ].join(" ")}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between gap-6">
        {/* Logo lockup */}
        <Link
          href="/"
          aria-label={`${brand.name} · Inicio`}
          className="flex items-center gap-3 group"
        >
          <Image
            src="/logos/isologo-contorno.png"
            alt=""
            width={285}
            height={288}
            priority
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="eyebrow !text-[10px]">Pastelería Artesanal</span>
            <span className="font-display text-[18px] text-azul-dk -mt-0.5">
              Delicias <em className="font-accent text-verde">de</em> Anita
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 font-body text-[13px] text-azul-dk/75">
          <Link href="/" className="hover:text-verde transition-colors">
            Inicio
          </Link>
          <Link href="/catalogo" className="hover:text-verde transition-colors">
            Catálogo
          </Link>
          <Link href="#" className="hover:text-verde transition-colors">
            Eventos
          </Link>
          <Link href="#" className="hover:text-verde transition-colors">
            Sobre Anita
          </Link>
        </nav>

        <a
          href={brand.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "font-body font-semibold text-[12px] tracking-[0.5px]",
            "bg-verde text-azul-dk",
            "px-4 py-2.5 rounded-md",
            "shadow-[var(--shadow-sm)]",
            "hover:brightness-95 transition-all whitespace-nowrap",
          ].join(" ")}
        >
          Pedir por WhatsApp
        </a>
      </div>
    </header>
  );
}

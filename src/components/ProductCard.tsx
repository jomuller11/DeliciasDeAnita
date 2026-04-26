import Link from "next/link";
import Image from "next/image";
import { Badge, BadgeVariant } from "./Badge";
import { brand } from "@/lib/tokens";

/* ─── ProductCard — Design System §06 ───────────────────── */
export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  /** Background color for the image area when no real image is provided. */
  imageBg: "verde" | "crema" | "lima";
  /** Optional product photo. If set, replaces the color block. */
  imageSrc?: string;
  badge?: { label: string; variant: BadgeVariant };
  /** Optional href — falls back to a WhatsApp link with a prefilled message. */
  href?: string;
};

const BG_CLASSES: Record<Product["imageBg"], string> = {
  verde: "bg-verde",
  crema: "bg-crema",
  lima: "bg-lima",
};

export function ProductCard({ product }: { product: Product }) {
  const whatsappHref = `${brand.contact.whatsappLink}?text=${encodeURIComponent(
    `¡Hola! Quiero consultar por ${product.name} ♡`
  )}`;

  return (
    <article
      className={[
        "group flex flex-col",
        "bg-white rounded-[var(--radius-lg)] overflow-hidden",
        "shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
        "transition-all duration-300 hover:-translate-y-0.5",
      ].join(" ")}
    >
      {/* Image area */}
      <div
        className={[
          "relative h-[160px] flex items-center justify-center overflow-hidden",
          !product.imageSrc && BG_CLASSES[product.imageBg],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-accent italic text-[13px] text-azul-dk/50 select-none">
            foto del producto
          </span>
        )}
        {product.badge && (
          <Badge
            variant={product.badge.variant}
            className="absolute top-2.5 right-2.5 !text-[10px] !px-2 !py-[3px] z-10"
          >
            {product.badge.label}
          </Badge>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        <span className="label-tag text-azul mb-1">{product.category}</span>
        <h3 className="font-display text-[15px] font-semibold text-azul-dk mb-2 leading-snug">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-body font-bold text-[15px] text-azul-dk">
            {product.price}
          </span>
          <Link
            href={product.href ?? whatsappHref}
            target={product.href ? undefined : "_blank"}
            rel={product.href ? undefined : "noopener noreferrer"}
            className={[
              "font-body font-semibold text-[11px]",
              "px-3 py-1.5 rounded-[6px]",
              "bg-verde text-azul-dk",
              "hover:brightness-95 transition-all",
            ].join(" ")}
          >
            Pedir
          </Link>
        </div>
      </div>
    </article>
  );
}

import { HTMLAttributes } from "react";

/* ─── Badge — Design System §06 ──────────────────────────── */
export type BadgeVariant =
  | "nuevo"
  | "destacado"
  | "sin-tacc"
  | "personalizado"
  | "agotado";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  nuevo: "bg-verde text-azul-dk",
  destacado: "bg-azul-dk text-white",
  "sin-tacc": "bg-lima text-azul-dk",
  personalizado: "bg-crema text-azul-dk",
  agotado: "bg-gris text-azul/50",
};

export function Badge({
  variant = "nuevo",
  className = "",
  ...rest
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "font-body font-bold text-[11px] tracking-[1px] uppercase",
        "px-3 py-1 rounded-[var(--radius-pill)]",
        VARIANT_STYLES[variant],
        className,
      ].join(" ")}
      {...rest}
    />
  );
}

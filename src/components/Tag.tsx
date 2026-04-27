"use client";

import { HTMLAttributes } from "react";

/* ─── Tag — outlined chip used for category filters ──────── */
interface TagProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  /** Border/text color tone. Design system alternates between these. */
  tone?: "verde" | "azul";
}

export function Tag({
  active = false,
  tone = "azul",
  className = "",
  ...rest
}: TagProps) {
  const isVerde = tone === "verde";
  const filled = active
    ? isVerde
      ? "bg-verde text-azul-dk border-verde"
      : "bg-azul-dk text-white border-azul-dk"
    : "bg-transparent text-azul-dk border-azul-dk/40 hover:border-azul-dk hover:bg-azul-dk/5";

  return (
    <button
      type="button"
      className={[
        "font-body text-[12px]",
        "px-[14px] py-[6px] rounded-[var(--radius-pill)]",
        "border-[1.5px] cursor-pointer transition-all duration-200",
        filled,
        className,
      ].join(" ")}
      {...rest}
    />
  );
}

"use client";

import { useState, useMemo } from "react";
import { Tag } from "@/components/Tag";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";

export function CatalogGrid() {
  const [active, setActive] = useState<Category>("Todos");

  const filtered = useMemo(() => {
    if (active === "Todos") return PRODUCTS;
    return PRODUCTS.filter((p) => {
      if (active === "Sin TACC") {
        return p.badge?.variant === "sin-tacc";
      }
      if (active === "Personalizado") {
        return p.category === "Personalizado";
      }
      return p.category === active;
    });
  }, [active]);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filtros de categoría"
        className="flex flex-wrap gap-2 mb-10"
      >
        {CATEGORIES.map((cat, i) => (
          <Tag
            key={cat}
            role="tab"
            aria-selected={active === cat}
            tone={i % 2 === 0 ? "verde" : "azul"}
            active={active === cat}
            onClick={() => setActive(cat)}
          >
            {cat}
          </Tag>
        ))}
      </div>

      <p className="font-accent italic text-[18px] text-azul-dk/75 mb-6">
        {filtered.length === 0
          ? "Sin productos en esta categoría - pronto sumaremos novedades ♡"
          : `Mostrando ${filtered.length} ${
              filtered.length === 1 ? "delicia" : "delicias"
            }`}
      </p>

      {filtered.length > 0 && (
        <div
          className={[
            "grid gap-5",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          ].join(" ")}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}

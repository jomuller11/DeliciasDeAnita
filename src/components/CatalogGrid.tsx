import { supabase } from "@/lib/supabase";
import { CatalogGridClient } from "@/components/CatalogGridClient";
import type { DbProduct } from "@/lib/types";
import type { Product } from "@/components/ProductCard";
import type { BadgeVariant } from "@/components/Badge";

const TAG_TO_BADGE: Record<
  string,
  { label: string; variant: BadgeVariant }
> = {
  Novedad: { label: "Novedad", variant: "nuevo" },
  Promo: { label: "Promo", variant: "destacado" },
  "Sin TACC": { label: "Sin TACC", variant: "sin-tacc" },
  Destacado: { label: "Destacado", variant: "destacado" },
  Personalizado: { label: "Personalizado", variant: "personalizado" },
};

const CATEGORY_BG: Record<string, "verde" | "crema" | "lima"> = {
  Tortas: "verde",
  "Box Dulce": "crema",
  Alfajores: "lima",
  Brownies: "verde",
  Cookies: "lima",
  Personalizado: "crema",
  "Sin TACC": "lima",
  Eventos: "crema",
};

const BG_CYCLE = ["verde", "crema", "lima"] as const;

function toCard(p: DbProduct, i: number): Product {
  const badge = p.tags.map((t) => TAG_TO_BADGE[t]).find(Boolean);
  const imageBg = CATEGORY_BG[p.category] ?? BG_CYCLE[i % 3];

  return {
    id: p.id,
    name: p.title,
    category: p.category,
    price: p.price,
    imageBg,
    imageSrc: p.image_url || undefined,
    badge,
  };
}

export async function CatalogGrid() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error cargando productos:", error.message);
  }

  const products = ((data ?? []) as DbProduct[]).map((p, i) => toCard(p, i));

  return <CatalogGridClient products={products} />;
}

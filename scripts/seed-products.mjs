// scripts/seed-products.mjs
// Migra los productos estáticos a Supabase.
// Uso: node scripts/seed-products.mjs

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── Leer .env.local ──────────────────────────────────────────
const envPath = path.join(ROOT, ".env.local");
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Mapeo de productos ────────────────────────────────────────
const PRODUCTS = [
  {
    title: "Torta Tres Chocolates",
    description: "",
    category: "Tortas",
    price: "$18.500",
    tags: ["Destacado"],
    imagePath: null, // foto pendiente
  },
  {
    title: "Box Dulce Regalo",
    description: "",
    category: "Box Dulce",
    price: "desde $9.200",
    tags: ["Novedad"],
    imagePath: "products/Image_202512171607.jpeg",
  },
  {
    title: "Alfajor Premium x6",
    description: "",
    category: "Alfajores",
    price: "$4.800",
    tags: ["Sin TACC"],
    imagePath: "products/Image_202512171629.jpeg",
  },
  {
    title: "Torta Vainilla & Frutos Rojos",
    description: "",
    category: "Tortas",
    price: "$16.900",
    tags: [],
    imagePath: "products/121212.jpeg",
  },
  {
    title: "Brownies Artesanales x9",
    description: "",
    category: "Brownies",
    price: "$5.400",
    tags: [],
    imagePath: "products/Image_202512171601.jpeg",
  },
  {
    title: "Cookies Chocochip x12",
    description: "",
    category: "Cookies",
    price: "$4.200",
    tags: [],
    imagePath: "products/cookies03.jpeg",
  },
  {
    title: "Torta Personalizada Temática",
    description: "",
    category: "Personalizado",
    price: "Consultar",
    tags: ["Personalizado"],
    imagePath: "products/Highend_professional_product_2k_202602111349.jpeg",
  },
  {
    title: "Mesa Dulce para Eventos",
    description: "",
    category: "Eventos",
    price: "desde $45.000",
    tags: ["Destacado"],
    imagePath: null, // foto pendiente
  },
  {
    title: "Alfajor Clásico de Maicena",
    description: "",
    category: "Alfajores",
    price: "$3.600",
    tags: [],
    imagePath: "products/Image_202512171613.jpeg",
  },
  {
    title: "Box Cumpleaños Sorpresa",
    description: "",
    category: "Box Dulce",
    price: "$12.800",
    tags: ["Novedad"],
    imagePath: "products/Image_202512171633.jpeg",
  },
  {
    title: "Cookies de Avena Sin TACC",
    description: "",
    category: "Sin TACC",
    price: "$4.500",
    tags: ["Sin TACC"],
    imagePath: "products/cookies04.jpeg",
  },
  {
    title: "Brownie Relleno de DDL",
    description: "",
    category: "Brownies",
    price: "$6.200",
    tags: [],
    imagePath: null, // foto pendiente
  },
];

// ── Helpers ───────────────────────────────────────────────────
async function uploadImage(relativePath) {
  const fullPath = path.join(ROOT, "public", relativePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Archivo no encontrado: ${relativePath}`);
    return "";
  }

  const filename = path.basename(fullPath);
  const buffer = fs.readFileSync(fullPath);

  const { error } = await supabase.storage
    .from("products")
    .upload(filename, buffer, { contentType: "image/jpeg", upsert: true });

  if (error) {
    console.warn(`  ⚠ Error subiendo ${filename}: ${error.message}`);
    return "";
  }

  const { data } = supabase.storage.from("products").getPublicUrl(filename);
  return data.publicUrl;
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
  console.log("Conectando a Supabase...");

  // Verificar que las tablas existan
  const { error: checkErr } = await supabase
    .from("products")
    .select("id")
    .limit(1);
  if (checkErr) {
    console.error(
      "\n❌ No se pudo acceder a la tabla 'products'.",
      "\n   Asegurate de haber ejecutado el SQL en el dashboard de Supabase primero.",
      "\n   Archivo: project/supabase-setup.sql\n"
    );
    process.exit(1);
  }

  console.log(`\nMigrando ${PRODUCTS.length} productos...\n`);

  let ok = 0;
  let errors = 0;

  for (const product of PRODUCTS) {
    process.stdout.write(`  ${product.title}... `);

    let image_url = "";
    if (product.imagePath) {
      image_url = await uploadImage(product.imagePath);
    }

    const { error } = await supabase.from("products").insert({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      tags: product.tags,
      image_url,
    });

    if (error) {
      console.log(`❌ ${error.message}`);
      errors++;
    } else {
      console.log(image_url ? "✓ (con imagen)" : "✓ (sin imagen)");
      ok++;
    }
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`✓ ${ok} productos insertados`);
  if (errors) console.log(`✗ ${errors} errores`);
  console.log(
    `\nAbrí el admin en http://localhost:3000/admin/products para verificar.`
  );
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});

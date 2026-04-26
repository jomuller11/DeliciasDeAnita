# Delicias de Anita

Sitio web de la pastelería artesanal **Delicias de Anita**, construido sobre el design system v1.0 (Abril 2026).

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS 4** (con CSS-first config vía `@theme`)
- **TypeScript**
- Fuentes vía `next/font/google`: Playfair Display, Montserrat, Cormorant Garamond

## Cómo arrancar

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
├── app/
│   ├── globals.css          ← Design tokens (CSS vars + Tailwind 4 @theme)
│   ├── layout.tsx           ← Root layout + carga de fuentes
│   ├── page.tsx             ← Home
│   └── catalogo/page.tsx    ← Página de catálogo de productos
├── components/
│   ├── Button.tsx           ← 4 variantes (primary, outline, dark, soft)
│   ├── Badge.tsx            ← 5 variantes de estado
│   ├── Tag.tsx              ← Chip filtrable (verde / azul)
│   ├── ProductCard.tsx      ← Tarjeta de producto + CTA WhatsApp
│   ├── SectionTitle.tsx     ← Eyebrow Cormorant + heading Playfair
│   ├── CatalogGrid.tsx      ← Grid filtrable (client component)
│   ├── Header.tsx
│   └── Footer.tsx
└── lib/
    ├── tokens.ts            ← Tokens en TS (colores, fuentes, datos de marca)
    └── products.ts          ← Catálogo mock de productos
```

## Design tokens

Los tokens viven en **dos lugares sincronizados**:

1. `src/app/globals.css` — `@theme { ... }` define los tokens como CSS variables y a su vez se exponen como utilities de Tailwind (`bg-verde`, `text-azul-dk`, `font-display`, etc.).
2. `src/lib/tokens.ts` — los mismos valores expuestos como objeto TypeScript, para usar desde JS (estilos dinámicos, gráficos, valores que se copian al portapapeles, etc.).

### Paleta

| Token | Hex | Rol |
|-|-|-|
| `verde` | `#B7C78E` | Principal · Verde Salvia |
| `azul` | `#2F3D63` | Tipografía · Azul Profundo |
| `azul-dk` | `#1E2A45` | Fondos profundos |
| `crema` | `#DCCFC8` | Secundario · Crema Rosado |
| `lima` | `#DDE4A7` | Acento · Lima Pastel |
| `marfil` | `#F7F5F0` | Fondo base (nunca blanco puro) |
| `gris` | `#D9D9D9` | Bordes y separadores |

### Tipografía

| Familia | Uso | Token |
|-|-|-|
| Playfair Display | Títulos, nombres de productos | `font-display` |
| Montserrat | Cuerpo, UI, precios | `font-body` |
| Cormorant Garamond Italic | Eyebrows, frases poéticas | `font-accent` |

## Componentes

Todos los componentes están tipados y son cliente o servidor según corresponda (los que usan estado están marcados con `"use client"`).

```tsx
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Tag } from "@/components/Tag";
import { ProductCard } from "@/components/ProductCard";

<Button variant="primary">Pedir por WhatsApp</Button>
<Button variant="outline">Ver catálogo</Button>
<Badge variant="nuevo">Nuevo</Badge>
<Tag tone="verde" active>Tortas</Tag>
```

## Próximos pasos sugeridos

- [ ] Reemplazar el mock de `src/lib/products.ts` con datos reales (CMS, JSON, etc.)
- [ ] Agregar fotos reales de productos. El `ProductCard` ya soporta una prop opcional `imageSrc` — cuando esté, reemplaza el bloque de color por la foto. Sin foto, queda el placeholder del design system.
- [ ] Página `/sobre-anita` y `/eventos`
- [ ] Formulario de pedido personalizado con validación
- [ ] Configurar metadata + Open Graph con imagen propia (puede usarse `sello-verde.png`)

## Assets de logo

Las variantes oficiales viven en `public/logos/`:

| Archivo | Uso | Dónde se aplica |
|-|-|-|
| `isologo-contorno.png` | Logo completo (sello+wordmark), fondo transparente, mejor resolución | Header |
| `logo.png` | Logo compacto, fondo transparente, baja res | Reserva |
| `logo-alt.png` | Wordmark horizontal mini | Reserva |
| `logo-full.png` | Solo isologo (torta+sello), fondo transparente | Footer (con `brightness(10)` para invertir sobre fondo oscuro) |
| `isologo.png` / `isologo-mini.png` | Isologo solo, varios tamaños | Favicon (vía `src/app/icon.png`) |
| `sello-verde.png` | Sello completo sobre verde, alta res | Hero del catálogo |
| `sello-crema.png` | Sello completo sobre crema, alta res | Hero de la home |
| `sello-lima.png` | Sello completo sobre lima, alta res | Disponible para social/promos |

## Notas de implementación

- **Marfil, no blanco puro**: el background base es `#F7F5F0` por norma del design system.
- **Sombras tintadas en azul**: nunca grises neutras — usá las custom properties `--shadow-xs/sm/md/lg`.
- **Un único acento verde**: el verde salvia es protagonista, no decorativo. Mantenelo en CTAs principales y eyebrows.
- **Italic Cormorant para "voz humana"**: cualquier copy emotivo o frase de marca va en `font-accent italic`.

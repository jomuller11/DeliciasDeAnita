# Delicias de Anita - Documentación del Proyecto

> Registro oficial del sitio web de la pastelería artesanal **Delicias de Anita**.
> Última actualización: Abril 2026

---

## Índice

1. [Datos del proyecto](#1-datos-del-proyecto)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Design System](#3-design-system)
4. [Estructura del proyecto](#4-estructura-del-proyecto)
5. [Componentes](#5-componentes)
6. [Páginas](#6-páginas)
7. [Catálogo de productos](#7-catálogo-de-productos)
8. [Assets de marca](#8-assets-de-marca)
9. [Historial de trabajo](#9-historial-de-trabajo)
10. [Despliegue](#10-despliegue)
11. [Pendientes](#11-pendientes)

---

## 1. Datos del proyecto

| Campo | Valor |
|---|---|
| Nombre del sitio | Delicias de Anita |
| Tipo | Sitio web de pastelería artesanal (catálogo + contacto) |
| Instagram | @deliciasdeanitaok |
| WhatsApp | 1163063039 |
| Link WA | https://wa.me/541163063039 |
| Repositorio | https://github.com/jomuller11/DeliciasDeAnita |
| URL producción | AWS Amplify (branch `main`) |

---

## 2. Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| Next.js | 15.1.0 | Framework React (App Router) |
| React | 19 | UI |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 4 | Estilos (CSS-first config vía `@theme`) |
| Playfair Display | Google Fonts | Tipografía display / títulos |
| Montserrat | Google Fonts | Tipografía cuerpo / UI |
| Cormorant Garamond | Google Fonts | Tipografía accent / eyebrows |
| AWS Amplify | - | Hosting y CI/CD |
| GitHub | - | Control de versiones |

> **Nota de seguridad:** `next@15.1.0` tiene CVE-2025-66478. Actualizar a versión parcheada cuando se estabilice el proyecto.

---

## 3. Design System

El design system v1.0 vive en dos lugares sincronizados:

- `src/app/globals.css` - tokens como CSS variables + utilities Tailwind 4 (`@theme`)
- `src/lib/tokens.ts` - mismos valores como objeto TypeScript para uso en JS
- `D:\AI Apps\Delicias de Anita\Canva\Design System Bundle.html` - referencia visual exportada desde Canva

### Paleta de colores

| Token | Hex | Rol |
|---|---|---|
| `verde` | `#B7C78E` | Verde Salvia · Principal · CTAs |
| `azul` | `#2F3D63` | Azul Profundo · Tipografía cuerpo |
| `azul-dk` | `#1E2A45` | Azul Oscuro · Fondos, títulos |
| `azul-lt` | `#3D5080` | Azul Claro · Variante |
| `crema` | `#DCCFC8` | Crema Rosado · Secundario |
| `lima` | `#DDE4A7` | Lima Pastel · Acento |
| `marfil` | `#F7F5F0` | Fondo base (nunca blanco puro) |
| `gris` | `#D9D9D9` | Bordes y separadores |
| `white` | `#FDFCFA` | Blanco cálido |

### Tipografía

| Familia | Token | Uso |
|---|---|---|
| Playfair Display | `font-display` | Títulos, nombres de productos, headings |
| Montserrat | `font-body` | Cuerpo, UI, precios, botones |
| Cormorant Garamond Italic | `font-accent` | Eyebrows, frases poéticas, "voz humana" |

### Escala tipográfica

| Nombre | Tamaño | Uso |
|---|---|---|
| `text-display` | 48px | Hero |
| `text-h1` | 36px | Títulos principales |
| `text-h2` | 28px | Secciones |
| `text-h3` | 22px | Subsecciones |
| `text-h4` | 18px | Cards / títulos menores |
| `text-body` | 15px | Párrafos |
| `text-small` | 13px | Secundario |
| `text-label` | 11px | Labels/tags |

### Sombras

Siempre tintadas en azul, nunca grises neutras:

| Token | Valor |
|---|---|
| `--shadow-xs` | `0 1px 4px rgba(47,61,99,0.07)` |
| `--shadow-sm` | `0 2px 6px rgba(47,61,99,0.10)` |
| `--shadow-md` | `0 2px 8px rgba(47,61,99,0.09)` |
| `--shadow-lg` | `0 4px 16px rgba(47,61,99,0.12)` |

### Utilidades CSS personalizadas

- `.eyebrow` - Cormorant italic uppercase, letra espaciada, color `azul-dk` por defecto; en fondos oscuros se sobreescribe con `!text-verde`.
- `.label-tag` - Montserrat 10px bold uppercase tracked; el color se asigna por contexto.

---

## 4. Estructura del proyecto

```text
delicias-de-anita/
├── public/
│   ├── logos/              <- Assets de marca (ver sección 8)
│   └── products/           <- Fotos de productos
├── src/
│   ├── app/
│   │   ├── globals.css     <- Design tokens + Tailwind @theme
│   │   ├── layout.tsx      <- Root layout + fuentes + metadata
│   │   ├── page.tsx        <- Home (hero con fondo + pilares)
│   │   └── catalogo/
│   │       └── page.tsx    <- Página catálogo
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CatalogGrid.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── Badge.tsx
│   │   ├── Tag.tsx
│   │   └── Button.tsx
│   └── lib/
│       ├── products.ts     <- Catálogo de productos (mock)
│       └── tokens.ts       <- Design tokens en TS
├── project/
│   ├── Design System.html  <- Design system fuente (referencia)
│   └── PROYECTO.md         <- Este documento
└── package.json
```

---

## 5. Componentes

### Header

- Sticky, `bg-marfil/90` con `backdrop-blur-md`.
- Logo actual: `public/logos/logo_top.svg`.
- Header compacto de `72px`.
- Nav: Inicio, Catálogo, Eventos, Sobre Anita.
- CTA: botón "Pedir por WhatsApp" con `bg-verde text-azul-dk`.

### Footer

- `bg-azul-dk`, 3 columnas: Brand + Contacto + Navegación.
- Logo actual: `public/logos/logo_bottom.svg`, preparado en color crema para fondo oscuro.
- Debajo del logo se conserva el eyebrow "Pastelería artesanal" en verde.
- Slogan en Cormorant italic.
- Links: Instagram + WhatsApp.

### ProductCard

- Soporta `imageSrc` (foto real) o `imageBg` (bloque de color placeholder).
- Imagen con hover `scale-105`, badges posicionados absolute.
- CTA "Pedir" -> link a WhatsApp con mensaje prefillado con el nombre del producto.

### Badge

- 5 variantes: `nuevo`, `destacado`, `sin-tacc`, `personalizado`, `agotado`.
- Pill shape, Montserrat bold uppercase.

### Tag

- Chip filtrable, 2 tonos: `verde` (borde verde, texto `azul-dk`) / `azul` (borde+texto `azul-dk`).
- Estado activo: fondo sólido.

### SectionTitle

- Eyebrow + heading Playfair + lede opcional.
- Sigue disponible como componente compartido, aunque el hero de catálogo ahora tiene composición custom con fondo fotográfico.

### Button

- 4 variantes: `primary` (verde), `outline` (borde azul-dk), `dark` (azul-dk), `soft`.

### CatalogGrid

- `"use client"` - filtros por categoría con estado.
- Usa `Tag` para filtros y `ProductCard` para cada ítem.

---

## 6. Páginas

### `/` - Home

- **Hero:** foto de producto a pantalla ancha como fondo (`Highend_professional_product_2k_202602111349.jpeg`) con overlay `bg-azul-dk/72`.
- Copy en blanco y verde para contraste sobre fondo oscuro.
- CTAs: "Ver catálogo" y "Pedir por WhatsApp".
- **Pilares:** 3 cards (Hecho con Amor / Recetas Artesanales / Ingredientes de Calidad).

### `/catalogo` - Catálogo

- **Hero band:** foto de producto como fondo (`121212.jpeg`) con overlay `bg-azul-dk/70`.
- Se removió el sello decorativo lateral para evitar duplicación de marca.
- Eyebrow "Catálogo · Hecho con amor" en bold.
- Lede descriptivo en bold para reforzar legibilidad.
- **Grid:** `CatalogGrid` con filtros por categoría.
- **CTA band:** `bg-azul-dk`, pedido personalizado por WhatsApp.
  - "¿No encontrás lo tuyo?" en 25px.
  - "Hacemos pedidos personalizados para tu celebración." en `text-crema` (`#DCCFC8`).
  - "Contanos qué imaginás y lo hacemos realidad ♡" en 20px.

---

## 7. Catálogo de productos

| ID | Nombre | Categoría | Precio | Foto |
|---|---|---|---|---|
| torta-tres-chocolates | Torta Tres Chocolates | Tortas | $18.500 | - |
| box-dulce-regalo | Box Dulce Regalo | Box Dulce | desde $9.200 | Image_202512171607.jpeg |
| alfajor-premium-x6 | Alfajor Premium x6 | Alfajores | $4.800 | Image_202512171629.jpeg |
| torta-vainilla-frutos-rojos | Torta Vainilla & Frutos Rojos | Tortas | $16.900 | 121212.jpeg |
| brownies-x9 | Brownies Artesanales x9 | Brownies | $5.400 | Image_202512171601.jpeg |
| cookies-chocochip | Cookies Chocochip x12 | Cookies | $4.200 | cookies03.jpeg |
| torta-personalizada | Torta Personalizada Temática | Personalizado | Consultar | Highend_professional_product_2k_202602111349.jpeg |
| mesa-dulce | Mesa Dulce para Eventos | Eventos | desde $45.000 | - |
| alfajor-clasico | Alfajor Clásico de Maicena | Alfajores | $3.600 | Image_202512171613.jpeg |
| box-cumple | Box Cumpleaños Sorpresa | Box Dulce | $12.800 | Image_202512171633.jpeg |
| cookies-sin-tacc | Cookies de Avena Sin TACC | Sin TACC | $4.500 | cookies04.jpeg |
| brownie-relleno | Brownie Relleno de DDL | Brownies | $6.200 | - |

**Fotos extra disponibles sin asignar:** `cookies06.jpeg`, `cookies07.jpeg`, `cookies08.jpeg` (cookies rellenas de chocolate/DDL y red velvet).

---

## 8. Assets de marca

Ubicación: `public/logos/`

| Archivo | Descripción | Dónde se usa |
|---|---|---|
| `logo_top.svg` | Logo horizontal azul para fondos claros | Header |
| `logo_bottom.svg` | Logo horizontal crema para fondos oscuros | Footer |
| `Iso_Delicias.svg` | Isotipo azul | Favicon vía `metadata.icons` |
| `IsoLogo_Delicias_Top.svg` | Lockup vertical azul | Disponible / reserva |
| `isologo-contorno.png` | Logo completo sello+wordmark, fondo transparente | Reserva |
| `logo-full.png` | Solo isologo (torta+sello), fondo transparente | Reserva |
| `sello-crema.png` | Sello completo sobre fondo crema | Reserva |
| `sello-verde.png` | Sello completo sobre fondo verde | Reserva |
| `sello-lima.png` | Sello completo sobre fondo lima | Disponible para social/promos |
| `isologo.png` / `isologo-mini.png` | Isologo solo, varios tamaños | Reserva |
| `logo.png` / `logo-alt.png` | Variantes compactas | Reserva |

### Favicon

- Antes: `src/app/icon.png`.
- Ahora: `metadata.icons.icon = "/logos/Iso_Delicias.svg"` en `src/app/layout.tsx`.
- Motivo: evitar que Next compile `src/app/icon.svg` como ruta especial y reducir problemas de chunks en desarrollo.

---

## 9. Historial de trabajo

### Sesión 1 - Abril 2026 · Setup inicial

- Instalación de dependencias (`npm install`).
- Levantamiento del servidor de desarrollo (`npm run dev`).
- Identificación de vulnerabilidad en `next@15.1.0` (CVE-2025-66478).

### Sesión 2 - Abril 2026 · Auditoría y corrección de contraste

Análisis WCAG AA completo. Se identificaron y corrigieron problemas de contraste en eyebrows, categorías de producto, tags, badges, pilares, hero y footer.

### Sesión 3 - Abril 2026 · Imágenes y re-fixes

- Integración de logo en Header (`isologo-contorno.png`) y Footer (`logo-full.png`).
- Integración de sellos decorativos en heros (Home y Catálogo).
- Soporte de `imageSrc` en `ProductCard` para fotos reales.
- Re-aplicación de fixes de contraste revertidos por cambios externos.

### Sesión 4 - Abril 2026 · Fotos de productos

Identificación y asignación de fotos al catálogo:

| Foto | Producto asignado |
|---|---|
| cookies03.jpeg | Cookies Chocochip x12 |
| cookies04.jpeg | Cookies de Avena Sin TACC |
| Image_202512171629.jpeg | Alfajor Premium x6 |
| Image_202512171613.jpeg | Alfajor Clásico de Maicena |
| Image_202512171633.jpeg | Box Cumpleaños Sorpresa |
| Image_202512171607.jpeg | Box Dulce Regalo |
| Image_202512171601.jpeg | Brownies Artesanales x9 |
| 121212.jpeg | Torta Vainilla & Frutos Rojos |
| Highend_professional_product_2k_202602111349.jpeg | Torta Personalizada Temática |

### Sesión 5 - Abril 2026 · Deploy inicial

- Inicialización del repositorio Git.
- Primer commit: 49 archivos, todo el proyecto.
- Push a GitHub: `https://github.com/jomuller11/DeliciasDeAnita`.
- Configuración de AWS Amplify conectado al branch `main`.
- CI/CD activo: cada push a `main` dispara un nuevo deploy automático.

### Sesión 6 - Abril 2026 · Branding, heroes y deploy visual

- Reemplazo del favicon por `public/logos/Iso_Delicias.svg` vía `metadata.icons`.
- Reemplazo del header por `public/logos/logo_top.svg`.
- Reemplazo del footer por `public/logos/logo_bottom.svg`.
- Recuperación del eyebrow "Pastelería artesanal" debajo del logo del footer.
- Reemplazo del hero de Home por imagen de fondo de producto con overlay azul.
- Reemplazo del hero de Catálogo por imagen de fondo de producto con overlay azul.
- Eliminación de sellos decorativos duplicados en Home/Catálogo.
- Ajustes tipográficos del CTA de pedido personalizado en catálogo.
- Limpieza de textos con problemas de encoding en archivos tocados.
- Build limpio validado con `npm run build`.
- Commit desplegado: `946b465 Update branding and hero visuals`.
- Push a `origin/main` para disparar deploy en AWS Amplify.

---

## 10. Despliegue

### Arquitectura

```text
Desarrollador -> GitHub (main) -> AWS Amplify -> URL pública
```

### Configuración de build (Amplify)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Flujo de trabajo

1. Editar código localmente.
2. Si `next dev` está corriendo, detenerlo antes de ejecutar `npm run build` o borrar `.next`.
3. Validar con `npm run build`.
4. `git add . && git commit -m "descripción"`.
5. `git push origin main`.
6. Amplify detecta el push y despliega automáticamente (~3 min).

### Nota operativa sobre `.next`

Durante desarrollo se observaron errores de chunks (`Cannot find module './638.js'`, `__webpack_modules__[moduleId] is not a function`) cuando se mezcló `next dev` activo con limpieza/build de `.next`.

Regla práctica:

- No correr `npm run build` ni borrar `.next` mientras `next dev` esté activo.
- Para limpiar estado local: detener el proceso Node del puerto, borrar `.next`, y levantar de nuevo `next dev`.

---

## 11. Pendientes

### Alta prioridad

- [ ] Actualizar Next.js a versión sin CVE-2025-66478.
- [ ] Agregar dominio personalizado en Amplify.
- [ ] Configurar metadata y Open Graph (título, descripción, imagen para WhatsApp/redes).

### Catálogo

- [ ] Foto para **Torta Tres Chocolates**.
- [ ] Foto para **Mesa Dulce para Eventos**.
- [ ] Foto para **Brownie Relleno de DDL**.
- [ ] Decidir destino de `cookies06.jpeg`, `cookies07.jpeg`, `cookies08.jpeg` (¿nuevos productos o variantes?).
- [ ] Reemplazar precios mock con precios reales.

### Páginas nuevas

- [ ] `/sobre-anita` - Historia y equipo.
- [ ] `/eventos` - Servicios para eventos y mesas dulces.

### Funcionalidad

- [ ] Formulario de pedido personalizado con validación.
- [ ] Integración con CMS para gestionar productos sin tocar código.

---

*Documento actualizado con Codex · Delicias de Anita · 2026*

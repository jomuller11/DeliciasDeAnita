/**
 * DELICIAS DE ANITA — Design Tokens (TS)
 * v1.0 · Abril 2026
 *
 * Mirror of the CSS tokens in `globals.css`. Use these whenever a value
 * needs to live in JS (chart colors, dynamic styles, copy paste in the UI…).
 * Single source of truth: keep this file and `globals.css` in sync.
 */

export const colors = {
  verde: "#B7C78E",     // Principal · Verde Salvia
  azul: "#2F3D63",      // Tipografía · Azul Profundo
  azulDk: "#1E2A45",    // Fondos profundos
  azulLt: "#3D5080",    // Variante clara
  crema: "#DCCFC8",     // Secundario · Crema Rosado
  lima: "#DDE4A7",      // Acento · Lima Pastel
  marfil: "#F7F5F0",    // Fondo base
  gris: "#D9D9D9",      // Bordes y separadores
  white: "#FDFCFA",     // Blanco cálido
} as const;

export const fonts = {
  display: '"Playfair Display", Georgia, serif',
  body: '"Montserrat", system-ui, sans-serif',
  accent: '"Cormorant Garamond", Georgia, serif',
} as const;

export const brand = {
  name: "Delicias de Anita",
  slogan: "Endulzamos tu día, celebramos tus momentos.",
  essence:
    "Pastelería artesanal que transforma ingredientes simples en momentos especiales. Cada receta está hecha con amor, dedicación y los mejores ingredientes.",
  contact: {
    instagram: "@deliciasdeanitaok",
    whatsapp: "1163063039",
    whatsappLink: "https://wa.me/541163063039",
  },
} as const;

export type BrandColor = keyof typeof colors;

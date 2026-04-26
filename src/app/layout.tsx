import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/* ─── Fonts ──────────────────────────────────────────────── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Delicias de Anita — Pastelería Artesanal",
  description:
    "Tortas, box dulce, alfajores y mesas dulces hechas con amor. Pedidos por WhatsApp.",
  openGraph: {
    title: "Delicias de Anita",
    description: "Endulzamos tu día, celebramos tus momentos.",
    type: "website",
  },
};

/* ─── Root layout ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

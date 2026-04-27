export type Event = {
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  gallery: string[];
};

function ev(time: string): string {
  return `/eventos/${encodeURIComponent(`WhatsApp Image 2026-04-26 at ${time}`)}.jpeg`;
}

export const EVENTS: Event[] = [
  {
    slug: "cumpleanos-glamour",
    title: "Cumpleaños Glamour",
    description:
      "Una celebración llena de elegancia y brillo. Tortas, cupcakes y mesas dulces coordinados en tonos rosas y dorados, pensados para hacer de cada cumpleaños un momento de ensueño. Personalizamos cada detalle para que sea único e irrepetible.",
    category: "Cumpleaños",
    coverImage: ev("19.18.00"),
    gallery: [
      ev("19.18.00"),
      ev("19.18.01"),
      ev("19.18.02"),
      ev("19.18.02 (1)"),
      ev("19.18.02 (2)"),
      ev("19.18.02 (3)"),
      ev("19.18.03 (18)"),
      ev("19.18.03 (19)"),
      ev("19.18.03 (20)"),
      ev("19.18.03 (21)"),
      ev("19.18.03 (22)"),
    ],
  },
  {
    slug: "cumpleanos-batman",
    title: "Cumpleaños Temático Batman",
    description:
      "¡Al rescate del mejor cumpleaños! Tortas y dulces con temática Batman para los fans del superhéroe. Trabajamos cada figura y decoración con masa fondant para lograr un resultado digno de Gotham.",
    category: "Cumpleaños",
    coverImage: ev("19.18.03"),
    gallery: [
      ev("19.18.03"),
      ev("19.18.03 (1)"),
      ev("19.18.03 (2)"),
      ev("19.18.03 (3)"),
      ev("19.18.03 (4)"),
      ev("19.18.03 (5)"),
    ],
  },
  {
    slug: "evento-mascarada",
    title: "Noche de Mascarada",
    description:
      "Elegancia en negro y dorado para eventos temáticos y veladas especiales. Tortas de varios pisos con detalles de antifaces, flores y dorado, ideales para XV años, aniversarios o cualquier celebración sofisticada.",
    category: "Eventos Especiales",
    coverImage: ev("19.18.03 (6)"),
    gallery: [
      ev("19.18.03 (6)"),
      ev("19.18.03 (7)"),
      ev("19.18.03 (8)"),
      ev("19.18.03 (9)"),
    ],
  },
  {
    slug: "primera-comunion",
    title: "Primera Comunión",
    description:
      "Un día sagrado merece una mesa dulce a la altura. Tortas y bocaditos en tonos blancos y dorados que acompañan uno de los momentos más importantes en la vida de los más chicos.",
    category: "Celebraciones",
    coverImage: ev("19.18.03 (10)"),
    gallery: [ev("19.18.03 (10)"), ev("19.18.03 (11)")],
  },
  {
    slug: "cumpleanos-infantil",
    title: "Cumpleaños Infantil",
    description:
      "Colores vibrantes, figuritas personalizadas y mucha fantasía. Creamos tortas y dulces que hacen brillar los ojos de los más pequeños, con personajes y temáticas a medida.",
    category: "Cumpleaños",
    coverImage: ev("19.18.03 (12)"),
    gallery: [ev("19.18.03 (12)"), ev("19.18.03 (13)")],
  },
  {
    slug: "dog-party",
    title: "Dog Party · Temático Mascotas",
    description:
      "¡La fiesta también es para los peludos! Mesas dulces con temática de mascotas para celebraciones originales y llenas de ternura. Desde huesos de azúcar hasta figuritas de perros en fondant.",
    category: "Eventos Especiales",
    coverImage: ev("19.18.03 (14)"),
    gallery: [
      ev("19.18.03 (14)"),
      ev("19.18.03 (15)"),
      ev("19.18.03 (16)"),
      ev("19.18.03 (17)"),
    ],
  },
];

export function getEvent(slug: string): Event | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

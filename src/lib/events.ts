export type Event = {
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  gallery: string[];
};

function img(name: string): string {
  return `/eventos/${name}.jpeg`;
}

export const EVENTS: Event[] = [
  {
    slug: "cumpleanos-glamour",
    title: "Cumpleaños Glamour",
    description:
      "Una celebración llena de elegancia y brillo. Tortas, cupcakes y mesas dulces coordinados en tonos rosas y dorados, pensados para hacer de cada cumpleaños un momento de ensueño. Personalizamos cada detalle para que sea único e irrepetible.",
    category: "Cumpleaños",
    coverImage: img("cumpleanos-glamour-01"),
    gallery: [
      img("cumpleanos-glamour-01"),
      img("cumpleanos-glamour-02"),
      img("cumpleanos-glamour-03"),
      img("cumpleanos-glamour-04"),
      img("cumpleanos-glamour-05"),
      img("cumpleanos-glamour-06"),
      img("cumpleanos-glamour-07"),
      img("cumpleanos-glamour-08"),
      img("cumpleanos-glamour-09"),
      img("cumpleanos-glamour-10"),
      img("cumpleanos-glamour-11"),
    ],
  },
  {
    slug: "cumpleanos-batman",
    title: "Cumpleaños Temático Batman",
    description:
      "¡Al rescate del mejor cumpleaños! Tortas y dulces con temática Batman para los fans del superhéroe. Trabajamos cada figura y decoración con masa fondant para lograr un resultado digno de Gotham.",
    category: "Cumpleaños",
    coverImage: img("cumpleanos-batman-01"),
    gallery: [
      img("cumpleanos-batman-01"),
      img("cumpleanos-batman-02"),
      img("cumpleanos-batman-03"),
      img("cumpleanos-batman-04"),
      img("cumpleanos-batman-05"),
      img("cumpleanos-batman-06"),
    ],
  },
  {
    slug: "evento-mascarada",
    title: "Noche de Mascarada",
    description:
      "Elegancia en negro y dorado para eventos temáticos y veladas especiales. Tortas de varios pisos con detalles de antifaces, flores y dorado, ideales para XV años, aniversarios o cualquier celebración sofisticada.",
    category: "Eventos Especiales",
    coverImage: img("evento-mascarada-01"),
    gallery: [
      img("evento-mascarada-01"),
      img("evento-mascarada-02"),
      img("evento-mascarada-03"),
      img("evento-mascarada-04"),
    ],
  },
  {
    slug: "primera-comunion",
    title: "Primera Comunión",
    description:
      "Un día sagrado merece una mesa dulce a la altura. Tortas y bocaditos en tonos blancos y dorados que acompañan uno de los momentos más importantes en la vida de los más chicos.",
    category: "Celebraciones",
    coverImage: img("primera-comunion-01"),
    gallery: [img("primera-comunion-01"), img("primera-comunion-02")],
  },
  {
    slug: "cumpleanos-infantil",
    title: "Cumpleaños Infantil",
    description:
      "Colores vibrantes, figuritas personalizadas y mucha fantasía. Creamos tortas y dulces que hacen brillar los ojos de los más pequeños, con personajes y temáticas a medida.",
    category: "Cumpleaños",
    coverImage: img("cumpleanos-infantil-01"),
    gallery: [img("cumpleanos-infantil-01"), img("cumpleanos-infantil-02")],
  },
  {
    slug: "dog-party",
    title: "Dog Party · Temático Mascotas",
    description:
      "¡La fiesta también es para los peludos! Mesas dulces con temática de mascotas para celebraciones originales y llenas de ternura. Desde huesos de azúcar hasta figuritas de perros en fondant.",
    category: "Eventos Especiales",
    coverImage: img("dog-party-01"),
    gallery: [
      img("dog-party-01"),
      img("dog-party-02"),
      img("dog-party-03"),
      img("dog-party-04"),
    ],
  },
];

export function getEvent(slug: string): Event | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

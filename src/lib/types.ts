export type DbProduct = {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type DbEvent = {
  id: string;
  type: string;
  title: string;
  description: string;
  cover_image_url: string;
  gallery: string[];
  created_at: string;
  updated_at: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; caption: string }
  | { type: "quote"; text: string; author: string };

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  content: ContentBlock[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

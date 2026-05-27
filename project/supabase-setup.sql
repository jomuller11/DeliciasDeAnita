-- ============================================================
-- Delicias de Anita — Supabase Setup
-- Correr en: Supabase Dashboard > SQL Editor
-- ============================================================

-- Tablas
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null default '',
  price text not null,
  image_url text not null default '',
  category text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  type text not null,
  title text not null,
  description text not null default '',
  cover_image_url text not null default '',
  gallery text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  cover_image_url text not null default '',
  content jsonb not null default '[]',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security (lectura pública, escritura solo service_role)
alter table products enable row level security;
alter table events enable row level security;
alter table blog_posts enable row level security;

create policy "public_read_products" on products for select using (true);
create policy "public_read_events" on events for select using (true);
create policy "public_read_blog_posts" on blog_posts for select using (true);

-- Storage buckets (imágenes públicas)
insert into storage.buckets (id, name, public)
values
  ('products', 'products', true),
  ('events', 'events', true),
  ('blog', 'blog', true)
on conflict (id) do nothing;

-- Políticas de storage (lectura pública)
create policy "public_read_products_storage" on storage.objects
  for select using (bucket_id = 'products');

create policy "public_read_events_storage" on storage.objects
  for select using (bucket_id = 'events');

create policy "public_read_blog_storage" on storage.objects
  for select using (bucket_id = 'blog');

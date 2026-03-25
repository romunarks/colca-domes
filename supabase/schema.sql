-- Colca Star Domes schema
-- Run this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.domes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text not null default '',
  capacity int not null default 2 check (capacity > 0 and capacity <= 12),
  price_per_night int not null default 420 check (price_per_night > 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  check_in date not null,
  check_out date not null,
  domes_booked int not null default 1 check (domes_booked > 0),
  status text not null check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  constraint reservations_date_range check (check_out > check_in)
);

create table if not exists public.booking_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  check_in date not null,
  check_out date not null,
  guests int not null check (guests > 0 and guests <= 8),
  notes text,
  availability_snapshot jsonb,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now(),
  constraint booking_leads_date_range check (check_out > check_in)
);

create index if not exists idx_reservations_date_range on public.reservations (check_in, check_out);
create index if not exists idx_reservations_status on public.reservations (status);
create index if not exists idx_booking_leads_created_at on public.booking_leads (created_at desc);

-- Basic hardening: block accidental public access.
-- Note: service role bypasses RLS and will keep working for server-side endpoints.
alter table public.domes enable row level security;
alter table public.reservations enable row level security;
alter table public.booking_leads enable row level security;

create policy "read domes (public)" on public.domes
for select
using (active = true);

-- No public insert/select on leads/reservations by default.

-- Seed domes (adjust quantity as needed)
insert into public.domes (code, name, description, capacity, price_per_night, active)
values
  ('DOME-01', 'Domo Andino', 'Vista al cañón, cama queen, calefacción.', 2, 420, true),
  ('DOME-02', 'Domo Astral', 'Cúpula panorámica, fogata privada, desayuno.', 2, 520, true),
  ('DOME-03', 'Domo Familiar', 'Más espacio, ideal para grupos pequeños.', 4, 620, true),
  ('DOME-04', 'Domo Premium', 'Amenities premium, mejor ubicación.', 2, 720, true),
  ('DOME-05', 'Domo Eco', 'Minimalista y sostenible, gran relación calidad-precio.', 2, 380, true),
  ('DOME-06', 'Domo Suite', 'Experiencia tope de gama con extras incluidos.', 2, 850, true)
on conflict (code) do nothing;

-- Optional sample reservations for testing
insert into public.reservations (check_in, check_out, domes_booked, status)
values
  ('2026-03-10', '2026-03-12', 2, 'confirmed'),
  ('2026-03-11', '2026-03-13', 1, 'pending')
on conflict do nothing;


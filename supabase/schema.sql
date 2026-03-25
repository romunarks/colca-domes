-- Colca Star Domes schema
-- Run this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

-- Create base tables (first run)
create table if not exists public.domes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  created_at timestamptz not null default now()
);

-- Make migrations safe to re-run (upgrades existing tables)
alter table public.domes add column if not exists code text;
alter table public.domes add column if not exists name text;
alter table public.domes add column if not exists description text;
alter table public.domes add column if not exists capacity int;
alter table public.domes add column if not exists price_per_night int;
alter table public.domes add column if not exists active boolean;

-- Backfill required identifiers safely
update public.domes
set code = coalesce(code, 'DOME-' || substr(coalesce(id::text, gen_random_uuid()::text), 1, 8))
where code is null or code = '';

alter table public.domes alter column name set default '';
alter table public.domes alter column description set default '';
alter table public.domes alter column capacity set default 2;
alter table public.domes alter column price_per_night set default 420;
alter table public.domes alter column active set default true;

update public.domes
set name = coalesce(nullif(name, ''), nullif(code, ''), 'Domo')
where name is null or name = '';
update public.domes set description = coalesce(description, '') where description is null;
update public.domes set capacity = coalesce(capacity, 2) where capacity is null;
update public.domes set price_per_night = coalesce(price_per_night, 420) where price_per_night is null;
update public.domes set active = coalesce(active, true) where active is null;

-- Enforce uniqueness without breaking re-runs
create unique index if not exists domes_code_unique_idx on public.domes (code);

alter table public.domes alter column name set not null;
alter table public.domes alter column description set not null;
alter table public.domes alter column capacity set not null;
alter table public.domes alter column price_per_night set not null;
alter table public.domes alter column active set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'domes_capacity_check'
  ) then
    alter table public.domes
      add constraint domes_capacity_check check (capacity > 0 and capacity <= 12);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'domes_price_per_night_check'
  ) then
    alter table public.domes
      add constraint domes_price_per_night_check check (price_per_night > 0);
  end if;
end $$;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid,
  check_in date not null,
  check_out date not null,
  domes_booked int not null default 1 check (domes_booked > 0),
  status text not null check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  constraint reservations_date_range check (check_out > check_in)
);

alter table public.reservations add column if not exists lead_id uuid;
create index if not exists idx_reservations_lead_id on public.reservations (lead_id);

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

do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'booking_leads')
     and exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'reservations')
     and not exists (select 1 from pg_constraint where conname = 'reservations_lead_id_fkey')
  then
    alter table public.reservations
      add constraint reservations_lead_id_fkey foreign key (lead_id) references public.booking_leads(id) on delete set null;
  end if;
end $$;

create index if not exists idx_reservations_date_range on public.reservations (check_in, check_out);
create index if not exists idx_reservations_status on public.reservations (status);
create index if not exists idx_booking_leads_created_at on public.booking_leads (created_at desc);

-- Assign specific domes to a reservation (optional but recommended for operations).
create table if not exists public.reservation_domes (
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  dome_id uuid not null references public.domes(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (reservation_id, dome_id)
);

create index if not exists idx_reservation_domes_dome_id on public.reservation_domes (dome_id);
create index if not exists idx_reservation_domes_reservation_id on public.reservation_domes (reservation_id);

-- Basic hardening: block accidental public access.
-- Note: service role bypasses RLS and will keep working for server-side endpoints.
alter table public.domes enable row level security;
alter table public.reservations enable row level security;
alter table public.booking_leads enable row level security;
alter table public.reservation_domes enable row level security;

drop policy if exists "read domes (public)" on public.domes;
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


-- Colca Star Domes schema
-- Run this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.domes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
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

-- Seed domes (adjust quantity as needed)
insert into public.domes (code, active)
values
  ('DOME-01', true),
  ('DOME-02', true),
  ('DOME-03', true),
  ('DOME-04', true),
  ('DOME-05', true),
  ('DOME-06', true)
on conflict (code) do nothing;

-- Optional sample reservations for testing
insert into public.reservations (check_in, check_out, domes_booked, status)
values
  ('2026-03-10', '2026-03-12', 2, 'confirmed'),
  ('2026-03-11', '2026-03-13', 1, 'pending')
on conflict do nothing;


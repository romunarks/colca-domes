# Colca Domes

## Español

Plataforma de landing + operación de reservas para un negocio de glamping en domos en el Valle del Colca (Arequipa, Perú).

Incluye:
- landing pública con paquetes y pre-reserva
- flujo de venta asistido por WhatsApp
- dashboard admin para leads y reservas
- disponibilidad y datos en Supabase

### Stack
- Astro (server output con `@astrojs/node`)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + API)

### Instalación rápida

```bash
npm install
cp .env.example .env
npm run dev
```

### Base de datos (Supabase)

En Supabase → SQL Editor ejecuta:
- `supabase/schema.sql`

### Flujo operativo
1. El cliente hace pre-reserva → se guarda un `booking_lead` → se abre WhatsApp.
2. Cierras la venta en WhatsApp.
3. En `/admin/leads` actualizas el status y conviertes a reserva.
4. Asignas domos específicos (ej. `DOME-01,DOME-03`) y el sistema valida conflictos.

---

## English

Landing + booking operations platform for a dome glamping business in Colca Valley (Arequipa, Peru).

It includes:
- public landing page with packages and pre-booking flow
- WhatsApp-assisted sales flow
- admin dashboard to manage leads and reservations
- Supabase-backed availability and booking data

## Stack

- `Astro` (server output with `@astrojs/node`)
- `TypeScript`
- `Tailwind CSS`
- `Supabase` (PostgreSQL + API via `@supabase/supabase-js`)

## Main Features

- **Interactive pre-booking flow**
  - date-range calendar (airline-style interaction)
  - availability check + estimated pricing
  - lead creation before opening WhatsApp

- **Admin operations**
  - view and update lead status (`new`, `contacted`, `qualified`, `closed`)
  - convert lead to reservation (`pending` or `confirmed`, with domes count)
  - cancel reservation (recommended operational flow)
  - delete reservation (hard delete, use only when needed)
  - assign specific dome codes to reservations (e.g. `DOME-01`, `DOME-03`)
  - conflict validation to avoid assigning the same dome in overlapping dates

- **Resilience / demo mode**
  - public flows keep working in demo mode if DB is not ready
  - useful for first-time setup and UI testing

## Project Structure (important paths)

- `src/pages/index.astro` - landing entry
- `src/components/PreBooking.astro` - pre-booking UI + calendar
- `src/pages/admin/leads.astro` - admin dashboard
- `src/pages/api/availability.ts` - availability API
- `src/pages/api/prebook.ts` - pre-book API
- `src/pages/api/calendar.ts` - per-day availability for calendar
- `src/pages/api/admin/*` - admin APIs
- `src/lib/server/booking.ts` - booking domain logic
- `src/lib/server/supabase.ts` - Supabase client/config helpers
- `supabase/schema.sql` - database schema and migrations

## Setup

### 1) Clone

```bash
git clone https://github.com/romunarks/colca-domes.git
cd colca-domes
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Copy `.env.example` to `.env` and fill values:

```env
# Required (server-side)
SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"

# Optional server config
TOTAL_DOMES="6"
BASE_RATE_PEN="420"

# Admin auth (HTTP Basic)
ADMIN_BASIC_USER="admin"
ADMIN_BASIC_PASS="change-me"

# Public variable (safe for browser)
PUBLIC_WHATSAPP_NUMBER="51999999999"
```

### 4) Apply database schema (required)

Open Supabase SQL Editor and run all SQL from:

- `supabase/schema.sql`

This creates/updates:
- `domes`
- `booking_leads`
- `reservations`
- `reservation_domes` (specific dome assignment per reservation)

> Important: if schema changes, re-run `supabase/schema.sql` (it is idempotent).

### 5) Run locally

```bash
npm run dev
```

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run typecheck` - Astro type checking

## Admin Usage Flow

1. Open `/admin/leads` and authenticate using `ADMIN_BASIC_USER` + `ADMIN_BASIC_PASS`.
2. Review incoming leads and update status.
3. Convert qualified lead to reservation.
4. Assign concrete dome codes to the reservation.
5. If needed:
   - use **Cancel** for operational cancellation (keeps history)
   - use **Delete** only for wrong/duplicate records

## API Reference

### Public APIs

- `POST /api/availability`
  - body: `{ checkInRaw, checkOutRaw, guests }`
  - returns availability + estimate

- `POST /api/prebook`
  - body: `{ fullName, checkInRaw, checkOutRaw, guests, notes?, availabilitySnapshot? }`
  - stores lead and returns `leadId`

- `GET /api/calendar?year=YYYY&month=M`
  - returns day-by-day availability for calendar UI

### Admin APIs (Basic Auth protected)

- `POST /api/admin/leads/status`
- `GET /api/admin/reservations`
- `POST /api/admin/reservations` (create from lead)
- `POST /api/admin/reservations/cancel`
- `POST /api/admin/reservations/delete`
- `POST /api/admin/reservations/assign`
- `GET /api/admin/domes`

## Security Notes

- Never commit real secrets. Keep secrets only in `.env`.
- `.env.example` must contain placeholders only.
- If any key was exposed, rotate it immediately in Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed to client code.

## Known Operational Recommendation

- Prefer **canceling** reservations over deleting to preserve audit/history.
- Assign domes as soon as reservation is confirmed to avoid manual overbooking.

## Author

**Rodrigo Prieto Munar**  
GitHub: [@romunarks](https://github.com/romunarks)

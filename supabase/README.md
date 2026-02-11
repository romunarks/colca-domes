# Supabase Setup

This project now uses Supabase for:

- Availability checks (`reservations` + `domes`)
- Lead capture (`booking_leads`)

## 1) Create environment variables

Copy `.env.example` to `.env` and fill values:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TOTAL_DOMES` (fallback if `domes` table has no active rows)
- `BASE_RATE_PEN`
- `ADMIN_DASHBOARD_KEY` (optional, protects `/admin/leads`)

Do not expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code.

## 2) Create database schema

Run `supabase/schema.sql` in Supabase SQL Editor.

## 3) Endpoints

- `POST /api/availability`
  - Input:
    - `checkInRaw` (`YYYY-MM-DD`)
    - `checkOutRaw` (`YYYY-MM-DD`)
    - `guests` (number)
  - Output:
    - `available`, `availableDomes`, `nights`, `nightlyRate`, `totalEstimate`

- `POST /api/prebook`
  - Input:
    - `fullName`, `checkInRaw`, `checkOutRaw`, `guests`
    - optional: `notes`, `availabilitySnapshot`
  - Output:
    - `leadId`, `createdAt`

## 4) Current frontend flow

`PreBooking.astro` now:

1. Calls `/api/availability`
2. If available, calls `/api/prebook`
3. Opens WhatsApp with the reservation details and internal lead id

## 5) Internal admin view

- Route: `/admin/leads`
- If `ADMIN_DASHBOARD_KEY` is configured, access with:
  - `/admin/leads?key=YOUR_VALUE`
- Shows:
  - lead counters by status
  - table with lead details, stay dates, estimated price and notes


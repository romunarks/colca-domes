/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SUPABASE_URL?: string;
  readonly SUPABASE_SERVICE_ROLE_KEY?: string;
  readonly TOTAL_DOMES?: string;
  readonly BASE_RATE_PEN?: string;
  readonly ADMIN_DASHBOARD_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


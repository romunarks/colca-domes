/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SUPABASE_URL?: string;
  readonly SUPABASE_SERVICE_ROLE_KEY?: string;
  readonly TOTAL_DOMES?: string;
  readonly BASE_RATE_PEN?: string;
  readonly ADMIN_BASIC_USER?: string;
  readonly ADMIN_BASIC_PASS?: string;
  readonly PUBLIC_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


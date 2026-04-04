import { createClient } from '@supabase/supabase-js';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_WHATSAPP_NUMBER": "51976251408", "SITE": undefined, "SSR": true};
let supabaseAdminClient = null;
const getRequiredEnv = (name) => {
  const value = Object.assign(__vite_import_meta_env__, { SUPABASE_URL: "https://eqcgstlmfgxsetursflm.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxY2dzdGxtZmd4c2V0dXJzZmxtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ0OTQ0OSwiZXhwIjoyMDkwMDI1NDQ5fQ.jNb9RtbZO8keUVF0aZHkh7QYNdCelD0vvCpMk-djMy4" })[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};
const getSupabaseAdmin = () => {
  if (supabaseAdminClient) {
    return supabaseAdminClient;
  }
  const supabaseUrl = getRequiredEnv("SUPABASE_URL");
  const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  supabaseAdminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
  return supabaseAdminClient;
};
const tryGetSupabaseAdmin = () => {
  try {
    return getSupabaseAdmin();
  } catch {
    return null;
  }
};
const getConfigNumber = (key, fallback) => {
  const raw = Object.assign(__vite_import_meta_env__, { SUPABASE_URL: "https://eqcgstlmfgxsetursflm.supabase.co", SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxY2dzdGxtZmd4c2V0dXJzZmxtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ0OTQ0OSwiZXhwIjoyMDkwMDI1NDQ5fQ.jNb9RtbZO8keUVF0aZHkh7QYNdCelD0vvCpMk-djMy4" })[key];
  if (!raw) {
    return fallback;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export { getConfigNumber as a, getSupabaseAdmin as g, tryGetSupabaseAdmin as t };

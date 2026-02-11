import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseAdminClient: SupabaseClient | null = null;

const getRequiredEnv = (name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY"): string => {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const getSupabaseAdmin = (): SupabaseClient => {
  if (supabaseAdminClient) {
    return supabaseAdminClient;
  }

  const supabaseUrl = getRequiredEnv("SUPABASE_URL");
  const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

  supabaseAdminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return supabaseAdminClient;
};

export const getConfigNumber = (key: "TOTAL_DOMES" | "BASE_RATE_PEN", fallback: number): number => {
  const raw = import.meta.env[key];
  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};


import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "placeholder-anon-key";

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
);

export const WEDDING_CAPACITY = 1000;
export const MAX_PLACES = 10;

export const COUPLE_NAMES_FR = "Hamza & Yosser";
export const COUPLE_NAMES_AR = "حمزة و يسر";

export const GROOM_FATHER_AR = "مبروك بن صالح";
export const BRIDE_FATHER_AR = "صالح الشنيتي";

export const WEDDING_DATE =
  process.env.NEXT_PUBLIC_WEDDING_DATE ?? "2026-07-27T17:00:00";

export const WEDDING_DATE_FR = "27 Juillet 2026";
export const WEDDING_DATE_AR = "27 جويلية 2026";

export const WEDDING_LAT = Number(
  process.env.NEXT_PUBLIC_WEDDING_LAT ?? "36.7205"
);
export const WEDDING_LNG = Number(
  process.env.NEXT_PUBLIC_WEDDING_LNG ?? "10.1860"
);

export const WEDDING_VENUE =
  process.env.NEXT_PUBLIC_WEDDING_VENUE ??
  "Villa Omnia — فضاء أمنية للأفراح";

export const WEDDING_ADDRESS_FR =
  "Mghira, en face de la zone industrielle — Fouchana";

export const WEDDING_ADDRESS_AR =
  "منطقة صناعية المغيرة — فوشانة، بن عروس";

export const WEDDING_CITY = "Fouchana, Ben Arous — Tunisie";

export const WEDDING_MAPS_QUERY =
  "Villa Omnia, El Mghira, Zone Industrielle, Fouchana, Tunisia";

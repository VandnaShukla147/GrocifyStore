import { createClient } from "@supabase/supabase-js";

// Get values from .env file
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create a single supabase client for the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

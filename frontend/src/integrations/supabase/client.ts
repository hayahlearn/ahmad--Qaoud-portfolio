
import { createClient } from '@supabase/supabase-js';

// Access environment variables directly from Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://tulmgyeamuolaawfmwpy.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1bG1neWVhbXVvbGFhd2Ztd3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjU4ODgsImV4cCI6MjA4MjcwMTg4OH0.Lyp5cBGQir2VXJSbacB05VkX2mXpRwjMyR-MdYpuQCA";

export const supabase = createClient(supabaseUrl, supabaseKey);
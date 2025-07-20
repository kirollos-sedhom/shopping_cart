import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wztpytmlwlvqlkruorzo.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6dHB5dG1sd2x2cWxrcnVvcnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NTk4NjMsImV4cCI6MjA2ODQzNTg2M30.Ec1u0_BjoRwOCMYxcIbs7B2HDw1bMckuCSolF9fRqx4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

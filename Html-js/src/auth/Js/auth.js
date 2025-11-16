import { supabase } from "./supabaseClient.js";

export async function verificarLogin() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

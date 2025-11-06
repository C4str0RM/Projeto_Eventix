import { supabase } from "../config/supabaseClient";

export const verificarAdmin = async (usuario) => {
  if (!usuario) return false;

  const { data, error } = await supabase
    .from("profiles")
    .select("isAdmin")
    .eq("id", usuario.id)
    .single();

  return data?.isAdmin === true;
};

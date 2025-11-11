import { useEffect } from "react";
import { supabase } from "../config/supabaseClient";

export function useVerificarUsuario(navigate) {
  useEffect(() => {
    const verificarUsuario = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: perfilExistente } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id);

        if (!perfilExistente || perfilExistente.length === 0) {
          const { error } = await supabase.from("profiles").insert([
            {
              id: user.id,
              name: user.user_metadata?.name || "",
              email: user.email,
              usuario: user.user_metadata?.email?.split("@")[0] || "",
              created_at: new Date(),
              updated_at: new Date(),
            },
          ]);

          if (!error) navigate("/");
        } else {
          navigate("/");
        }
      }
    };

    verificarUsuario();
  }, [navigate]);
}

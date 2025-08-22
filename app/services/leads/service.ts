import { createClient } from "@/app/utils/supabase/server";

export async function createLead({ email }: { email: string }) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert([{ email }]);

    if (error) {
      if (error.code === "23505")
        return { success: false, message: "E-mail já cadastrado" };

      return {
        success: false,
        message: "Erro ao cadastrar e-mail: " + error.message,
      };
    }

    return { success: true, message: null };
  } catch (error) {
    return {
      success: false,
      message: "Erro ao cadastrar e-mail: " + error,
    };
  }
}

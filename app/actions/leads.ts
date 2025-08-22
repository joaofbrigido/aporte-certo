"use server";

import z from "zod";
import { createLead } from "../services/leads/service";

export async function createLeadAction(data: FormData) {
  // Verifica honeypot
  const fullName = data.get("fullName");
  if (fullName && String(fullName).trim() !== "") {
    return {
      success: false,
      message: "Detecção de spam.",
      fieldErrors: null,
    };
  }

  const schema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
  });

  const result = schema.safeParse(Object.fromEntries(data));
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return { success: false, message: "", fieldErrors };
  }

  const createResult = await createLead(result.data);

  if (!createResult.success) {
    return { success: false, message: createResult.message, fieldErrors: null };
  }

  return {
    success: true,
    message: "E-mail cadastrado com sucesso!",
    fieldErrors: null,
  };
}

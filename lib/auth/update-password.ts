"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthState } from "@/lib/auth/auth-state";
import { redirect } from "next/navigation";

export const updatePassword = async (
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const supabase = await createClient();
  const response: AuthState = {
    ...prevState,
  };

  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;
  if (!password || !repeatPassword || password !== repeatPassword) {
    response.error = "Passwords do not match";
    return response;
  }

  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      response.error = error.message;
      return response;
    }
  } catch (error: unknown) {
    response.error =
      error instanceof Error ? error.message : "An error occurred";
    return response;
  }

  redirect("/profile");
};

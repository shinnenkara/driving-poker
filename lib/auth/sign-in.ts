"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthState } from "@/lib/auth/auth-state";

export async function signIn(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response: AuthState = {
    ...prevState,
  };

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
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
}

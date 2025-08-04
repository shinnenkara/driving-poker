"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthState } from "@/lib/auth/auth-state";

export async function signOut(prevState: AuthState): Promise<AuthState> {
  const supabase = await createClient();
  const response: AuthState = {
    ...prevState,
  };

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      response.error = error.message;
      return response;
    }
  } catch (error: unknown) {
    response.error =
      error instanceof Error ? error.message : "An error occurred";
    return response;
  }

  redirect("/auth/login");
}

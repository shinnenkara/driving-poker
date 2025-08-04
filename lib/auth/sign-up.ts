"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthState } from "@/lib/auth/auth-state";

export async function signUp(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const response: AuthState = {
    ...prevState,
  };

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;
  const redirectLocation = formData.get("redirectLocation") as string;

  if (!password || !repeatPassword || password !== repeatPassword) {
    response.error = "Passwords do not match";
    return response;
  }

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${redirectLocation}/profile`,
      },
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

  redirect("/auth/sign-up-success");
}

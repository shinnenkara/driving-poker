"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthState } from "@/lib/auth/auth-state";
import { redirect } from "next/navigation";

export async function googleAuth(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const response: AuthState = {
    ...prevState,
  };

  const redirectLocation = formData.get("redirectLocation") as string;
  if (!redirectLocation) {
    response.error = "An error occurred";
    return response;
  }

  let redirectTo = "/auth/login";
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${redirectLocation}/auth/callback?next=/profile`,
      },
    });
    if (error) {
      response.error = error.message;
      return response;
    }

    redirectTo = data?.url ?? redirectTo;
  } catch (error: unknown) {
    response.error =
      error instanceof Error ? error.message : "An error occurred";
    return response;
  }

  redirect(redirectTo);
}

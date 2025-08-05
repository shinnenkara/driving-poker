"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthDataState } from "@/lib/auth/auth-data-state";

export const resetPassword = async (
  prevState: AuthDataState<boolean>,
  formData: FormData,
): Promise<AuthDataState<boolean>> => {
  const supabase = await createClient();
  const response: AuthDataState<boolean> = {
    ...prevState,
  };

  const email = formData.get("email") as string;
  const redirectLocation = formData.get("redirectLocation") as string;
  if (!redirectLocation || !email) {
    response.error = "An error occurred";
    return response;
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${redirectLocation}/auth/update-password`,
    });
    if (error) {
      response.error = error.message;
      return response;
    }

    response.data = true;
  } catch (error: unknown) {
    response.error =
      error instanceof Error ? error.message : "An error occurred";
    return response;
  }

  return response;
};

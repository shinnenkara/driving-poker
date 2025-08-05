import { SupabaseClient } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

export const userRedirectUrl = async (
  request: NextRequest,
  supabase: SupabaseClient,
): Promise<NextURL | undefined> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const pathName = request.nextUrl.pathname;

  const ifHome = pathName == "/";
  if (ifHome) {
    return;
  }

  const isNotLoggedIn = !session;
  const isNotAuthPath = !pathName.startsWith("/auth");
  if (isNotLoggedIn && isNotAuthPath) {
    return redirectToLogin(request);
  }

  const isLoggedIn = !!session;
  const isAuthPath = pathName.startsWith("/auth");
  const isNotUpdatePassword = !pathName.startsWith("/auth/update-password");
  if (isLoggedIn && isAuthPath && isNotUpdatePassword) {
    return redirectToHome(request);
  }

  return;
};

const redirectToLogin = (request: NextRequest): NextURL => {
  const url = request.nextUrl.clone();
  url.pathname = "/auth/login";

  return url;
};

const redirectToHome = (request: NextRequest): NextURL => {
  const url = request.nextUrl.clone();
  url.pathname = "/";

  return url;
};

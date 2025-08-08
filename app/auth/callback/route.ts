import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { CodeVerifier } from "@/lib/supabase/code-verifier";

export async function GET(request: Request) {
  const verifier = new CodeVerifier(request);
  const code = verifier.getCode();
  const next = verifier.getNext();
  const origin = verifier.getOrigin();

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/auth/error`);
  }

  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}

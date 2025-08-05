import type { NextRequest } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextURL } from "next/dist/server/web/next-url";

export class CodeSession {
  private readonly supabase: SupabaseClient;
  private readonly url: NextURL;

  constructor(request: NextRequest, supabase: SupabaseClient) {
    this.url = request.nextUrl;
    this.supabase = supabase;
  }

  async createOrRedirect(): Promise<NextURL | undefined> {
    const code = this.getCode();
    if (!code) {
      return;
    }

    try {
      await this.auth(code);
    } catch (error: unknown) {
      console.error(error);
      this.removeCode();

      return this.url;
    }
  }

  private async auth(code: string): Promise<void> {
    const response = await this.supabase.auth.exchangeCodeForSession(code);
    if (response.error) {
      throw response.error;
    }
  }

  private getCode() {
    const searchParams = this.url.searchParams;
    const code = searchParams.get("code");

    return code ?? undefined;
  }

  private removeCode() {
    this.url.searchParams.delete("code");
  }
}

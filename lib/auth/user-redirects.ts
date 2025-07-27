import {SupabaseClient} from "@supabase/supabase-js";
import {type NextRequest, NextResponse} from "next/server";

export const userRedirects = async (request: NextRequest, supabase: SupabaseClient): Promise<NextResponse | undefined> => {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const ifHome = request.nextUrl.pathname == '/';
    if (ifHome) {
        return;
    }

    const isNotLoggedIn = !user;
    const isNotAuthPath = !request.nextUrl.pathname.startsWith('/auth');
    if (isNotLoggedIn && (isNotAuthPath)) {
        return redirectToLogin(request);
    }

    const isLoggedIn = !!user;
    const isAuthPath = request.nextUrl.pathname.startsWith('/auth');
    if (isLoggedIn && isAuthPath) {
        return redirectToHome(request);
    }

    return;
};

const redirectToLogin = (request: NextRequest) => {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'

    return NextResponse.redirect(url)
}

const redirectToHome = (request: NextRequest) => {
    const url = request.nextUrl.clone()
    url.pathname = '/'

    return NextResponse.redirect(url);
}
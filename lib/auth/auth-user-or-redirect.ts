import {User} from "@supabase/auth-js";
import {getAuthUser} from "@/lib/auth/get-auth-user";
import {redirect} from "next/navigation";

export async function authUserOrRedirect(): Promise<User> {
    const user = await getAuthUser()

    return user ?? redirect('/auth/login');
}

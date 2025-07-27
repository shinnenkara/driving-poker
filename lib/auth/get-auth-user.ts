import {createClient} from "@/lib/supabase/server";
import {User} from "@supabase/auth-js";

export async function getAuthUser(): Promise<User | undefined> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error) {
        if (error.status === 400) {
            return;
        }

        console.error("Error getting auth user");
        console.error(error);
    }

    return data?.user ?? undefined;
}

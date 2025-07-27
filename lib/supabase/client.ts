import { createBrowserClient } from "@supabase/ssr";
import {supabaseKey, supabaseUrl} from "@/lib/supabase/env";

export const createClient = () => {
    return createBrowserClient(
        supabaseUrl!,
        supabaseKey!,
    );
};

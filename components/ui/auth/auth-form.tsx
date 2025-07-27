'use client'

import Link from "next/link";
import {Spade} from "lucide-react";
import {Auth} from "@supabase/auth-ui-react";
import {createClient} from "@/lib/supabase/client";
import {ThemeSupa} from "@supabase/auth-ui-shared";

export default function AuthForm() {
    const supabase = createClient()

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="w-full max-w-md p-8 rounded-3xl shadow-xl">
                <Link href={"/"}>
                    <div className="flex items-center justify-center mb-8">
                        {/*<Activity className="h-12 w-12" />*/}
                        <Spade className="h-12 w-12" size={18} />
                        <h1 className="text-3xl font-bold ml-3">Driving Poker</h1>
                    </div>
                </Link>
                {/*<GoogleOneTap />*/}
                <Auth
                    providers={['google']}
                    // view={view as any}
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                />
            </div>
        </div>
    )
}


// const GoogleOneTap = dynamic(
//     () => import("../../components/ui/google/one-tap"),
//     {
//         loading: () => <p>Loading...</p>,
//         ssr: false,
//     },
// );

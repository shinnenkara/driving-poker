import Script from "next/script";
import {createClient} from "@/lib/supabase/client";

export default function GoogleSingIn() {
    const supabase = createClient();

    async function handleSignInWithGoogle(response: { credential: string }) {
        const { error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.credential,
        });
        console.log(error);
    }

    const googleWindow: Window & any = window;
    googleWindow.handleSignInWithGoogle = handleSignInWithGoogle;

    return (
        <div className={"mt-2 flex flex-col"}>
            <div className={"flex justify-center"}>
                <Script
                    strategy={"afterInteractive"}
                    src={"https://accounts.google.com/gsi/client"}
                />
                <div
                    id="g_id_onload"
                    data-client_id="845121372353-skl5udc7mia1jkvutmlmreind05d11u3.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-callback="handleSignInWithGoogle"
                    // data-auto_select="true"
                    data-itp_support="true"
                    data-use_fedcm_for_prompt="true"
                ></div>
                <div
                    className="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="outline"
                    data-text="continue_with"
                    data-size="large"
                    data-logo_alignment="left"
                ></div>
            </div>
        </div>
    );
}

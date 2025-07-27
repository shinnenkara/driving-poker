import {AuthForm} from "@/components/ui/auth/auth-form";

export default async function LoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <AuthForm />
            </div>
        </div>
    )
}

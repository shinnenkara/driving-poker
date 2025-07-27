import Link from "next/link";
import {Button} from "@/components/ui/button";

export async function LoginButton() {
    return (
        <Button asChild variant="outline" size="sm">
            <Link className="rounded-full" href="/auth/login">
                Log In
            </Link>
        </Button>
    )
}

import {Button} from "@/components/ui/button";
import Link from "next/link";

function BackToHome({}) {
    return (
        <Button asChild variant="outline">
            <Link href="/" className="rounded-full">
                Back to Home
            </Link>
        </Button>
    );
}

export { BackToHome };

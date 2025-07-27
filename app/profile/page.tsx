import {LogoutButton} from '@/components/ui/auth/logout-button'
import {authUserOrRedirect} from "@/lib/auth/auth-user-or-redirect";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {HomeIcon} from "lucide-react";

export default async function ProfilePage() {
    const user = await authUserOrRedirect();

    return (
        <div className="flex min-h-svh w-full flex-col p-4">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            <HomeIcon className="h-4 w-4" />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/profile">
                            Profile
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-1 items-center justify-center gap-2">
                <p>
                    Hello <span>{user.email}</span>
                </p>
                <LogoutButton />
            </div>
        </div>
    )
}

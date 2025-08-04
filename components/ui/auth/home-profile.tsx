import { getAuthUser } from "@/lib/auth/get-auth-user";
import { LoginButton } from "@/components/ui/auth/login-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function HomeProfile() {
  const user = await getAuthUser();
  if (!user) {
    return <LoginButton />;
  }

  const userName = user.email?.split("@")[0] || "User";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <Button asChild variant="outline" size="sm">
      <Link className="rounded-full flex items-center gap-2" href="/profile">
        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
          {initial}
        </div>
        {userName}
      </Link>
    </Button>
  );
}

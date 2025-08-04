"use client";

import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { googleAuth } from "@/lib/auth/google-auth";

function GoogleSignIn() {
  return (
    <div className={"flex gap-2"}>
      <Image
        src="/google.svg"
        alt="Google"
        width={16}
        height={16}
        className="mr-2 invert"
      />
      <span>Continue with Google</span>
    </div>
  );
}

export function GoogleForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, action, pending] = useActionState(googleAuth, {});
  let userLocation = "";
  if (typeof window !== "undefined") {
    userLocation = window.location.origin;
  }

  return (
    <form action={action}>
      <div className="flex flex-col gap-6">
        <Input
          type="hidden"
          name="redirectLocation"
          value={userLocation}
          required
        />
        {state?.error && (
          <p className="text-sm text-destructive-500">{state?.error}</p>
        )}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Logging in..." : <GoogleSignIn />}
        </Button>
      </div>
    </form>
  );
}

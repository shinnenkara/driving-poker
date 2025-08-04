"use client";

import { Button } from "@/components/ui/button";
import { startTransition, useActionState } from "react";
import { signOut } from "@/lib/auth/sign-out";

export function LogoutButton() {
  const [state, action, pending] = useActionState(signOut, {});

  return (
    <div>
      <Button onClick={() => startTransition(action)} disabled={pending}>
        {pending ? "Logging out..." : "Logout"}
      </Button>
      {state?.error && (
        <p className="text-sm text-destructive-500">{state?.error}</p>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";
import { resetPassword } from "@/lib/auth/reset-password";
import { useSearchParams } from "next/navigation";

function PasswordResetSentForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Check Your Email</CardTitle>
        <CardDescription>Password reset instructions sent</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          If you registered using your email and password, you will receive a
          password reset email.
        </p>
      </CardContent>
    </Card>
  );
}

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [state, action, pending] = useActionState(resetPassword, {
    data: false,
  });
  const success = !!state?.data;
  let userLocation = "";
  if (typeof window !== "undefined") {
    userLocation = window.location.origin;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <PasswordResetSentForm />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Type in your email and we&apos;ll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={action}>
              <div className="flex flex-col gap-6">
                <Input
                  type="hidden"
                  name="redirectLocation"
                  value={userLocation}
                  required
                />
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                {state?.error && (
                  <p className="text-sm text-red-500">{state?.error}</p>
                )}
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? "Sending..." : "Send reset email"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

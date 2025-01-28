"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button
        variant="outline"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </Button>
    );
  } else {
    return (
      <Button
        variant="outline"
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    );
  }
}
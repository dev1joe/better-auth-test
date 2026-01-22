"use client";
import { BetterAuthActionButton } from "@/components/auth/BetterAuthActionButton";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession()

  if (loading) {
    return (<div>loading...</div>);
  }

  return (
    <main className="min-h-full p-24 mt-3 flex flex-col items-center justify-start gap-3 outline-4 outline-babyblue-200">

      {session === null ? (
        <>
          <h1 className="text-4xl font-bold">Welcome to our App</h1>
          <Button asChild size="lg">
            <Link href="/auth">Sign In / Sign Up</Link>
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Welcome {session.user.name}</h1>

          <div className="flex gap-4 justify-center">
            <Button size='lg' variant='outline' className="cursor-pointer">
              <Link href="/profile">
                Profile
              </Link>
            </Button>
            <BetterAuthActionButton
              className="cursor-pointer"
              variant="destructive"
              size="lg"
              action={() => authClient.signOut()}
            >
              Sign Out
            </BetterAuthActionButton>
          </div>
        </>
      )
      }
    </main>
  );
}

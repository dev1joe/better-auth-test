import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-full p-24 mt-3 flex flex-col items-center justify-start gap-3 outline-4 outline-babyblue-200">
      <h1 className="text-4xl font-bold">Welcome to our App</h1>
      <Button asChild size="lg">
        <Link href="/auth/login">Sign In / Sign Up</Link>
      </Button>
    </main>
  );
}

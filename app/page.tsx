"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  if (session.data?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify betwen p-24">
        <h1>Welcome {session.data.user.name}</h1>
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center ">
        {
          <Button
            onClick={() => {
              signIn("google");
              console.log("sign in");
            }}
          >
            Sign in with Google
          </Button>
        }
      </div>
    </div>
  );
}

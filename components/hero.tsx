import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function Hero() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Secure, Fast, and Effortless Payments with Sol-pe
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Revolutionize your payment experience with Sol-pe, the
                    UPI-like platform that offers secure authentication, instant
                    transactions, and no need to manage public/private keys.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    onClick={() => {
                      if (session.data?.user) {
                        router.push("/dashboard");
                      } else {
                        signIn();
                      }
                    }}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {session.data?.user ? "Dashboard" : "Sign in"}
                  </Button>
                </div>
              </div>
              <img
                src="/landing.webp"
                width="550"
                height="550"
                alt="Sol-pe Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col justify-center gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; Made with &hearts; , by{" "}
          <Link
            href={"https://github.com/dorkydhruv"}
            className="font-semibold "
          >
            Dhruv Sharma
          </Link>
        </p>
      </footer>
    </div>
  );
}

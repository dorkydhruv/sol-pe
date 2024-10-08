import Balance from "@/components/balance";
import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "../lib/authconfig";
import prisma from "../lib/db";
import Transactions from "@/components/transaction";
import Payments from "@/components/payment";
import Swap from "@/components/swap";

async function getUserWallet() {
  const session = await getServerSession(authConfig);
  const userWallet = await prisma.solWallet?.findFirst({
    where: {
      userId: session?.user.uid,
    },
    select: {
      publicKey: true,
    },
  });
  if (!userWallet) {
    return {
      error: "No wallet found for user",
    };
  }
  return { error: null, userWallet };
}

//route unavailable [on reload] if not authenticated

const Page = async () => {
  const session = await getServerSession(authConfig);
  const userWallet = await getUserWallet();
  if (userWallet.error || !userWallet.userWallet?.publicKey) {
    return <div>{userWallet.error}</div>;
  }

  if (!session?.user.uid) {
    return (
      <div className="flex justify-center h-screen">Not authenticated</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 lg:p-8">
        <Balance publicKey={userWallet.userWallet.publicKey} />
        <Payments publicKey={userWallet.userWallet.publicKey} />
        <Swap publicKey={userWallet.userWallet.publicKey} />
        <Transactions />
      </main>
    </div>
  );
};

export default Page;

"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTokens } from "@/app/api/hooks/useTokens";
import { useToast } from "./ui/use-toast";
import { loader } from "./loader";
import { WalletModel } from "./walletModel";

const Balance = ({ publicKey }: { publicKey: string }) => {
  const [copied, setCopied] = useState(false);
  const { tokenBalances, loading } = useTokens({ address: publicKey });
  const { toast } = useToast();
  const [showWalletModel, setShowWalletModel] = useState(false);
  if (loading) {
    return loader();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Balances</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <div className="text-4xl font-bold">
          ${tokenBalances?.totalBalance.toFixed(2)}
        </div>
        {tokenBalances?.tokens.map((token) => (
          <div key={token.name} className="text-muted-foreground">
            <span className="font-medium">{token.name}:</span> {token.balance}{" "}
            {token.name}
          </div>
        ))}
        <div
          onClick={() => setShowWalletModel(true)}
          className="border bg-blue-500 shadow-sm text-white cursor-pointer flex gap-3 shadow-blue-900 p-3 rounded-xl border-white"
        >
          Your Wallet
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
            />
          </svg>
        </div>
        <WalletModel
          isOpen={showWalletModel}
          publicKey={publicKey}
          onClose={() => setShowWalletModel(false)}
        />
      </CardContent>
    </Card>
  );
};

export default Balance;

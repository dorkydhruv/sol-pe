"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTokens } from "@/app/api/hooks/useTokens";
import { useToast } from "./ui/use-toast";
import { loader } from "./loader";

const Balance = ({ publicKey }: { publicKey: string }) => {
  const [copied, setCopied] = useState(false);
  const { tokenBalances, loading } = useTokens({ address: publicKey });
  const { toast } = useToast();
  if (loading) {
    return loader();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">Balances</CardTitle>
        <div
          onClick={() => {
            navigator.clipboard.writeText(publicKey);
            toast({
              title: "Copied",
              description: "Public key copied to clipboard",
            });
          }}
          className="truncate cursor-pointer text-sm text-muted-foreground"
        >
          {publicKey}
        </div>
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
      </CardContent>
    </Card>
  );
};

export default Balance;

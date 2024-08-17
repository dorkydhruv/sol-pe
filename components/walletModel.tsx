"use client";
import { Dialog, DialogContent } from "./ui/dialog";
import { loader } from "./loader";
import { useRef, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { createQR, encodeURL } from "@solana/pay";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
interface WalletModelProps {
  isOpen: boolean;
  publicKey: string;
  onClose: () => void;
}

export const WalletModel = ({
  isOpen,
  publicKey,
  onClose,
}: WalletModelProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  //Check if this causing error

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex border w-full max-w-[520px] flex-col gap-6 border-none bg-blue-100 px-6 py-9 text-black">
          <div className="text-2xl text-slate-900 font-bold">
            Wallet Address
          </div>
          <div
            className="flex-col cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              toast({
                title: "Copied",
                description: "Public key copied to clipboard",
              });
            }}
          >
            <div className="text-lg font-medium">Public Key</div>
            <div className="text-slate-600 font-mono">{publicKey}</div>
          </div>
          {!qrRef.current && (
            <Button
              onClick={() => {
                const recipent = new PublicKey(publicKey);
                const amount = new BigNumber(0.1);
                const url = encodeURL({
                  recipient: recipent,
                  amount: amount,
                  label: "Payment Service",
                });
                console.log("URL", url);
                const qrCode = createQR(url, 400, "transparent");
                if (qrRef.current) {
                  qrRef.current.innerHTML = "";
                  qrCode.append(qrRef.current);
                }
              }}
            >
              Generate QR
            </Button>
          )}
          <div className="flex justify-center" ref={qrRef}></div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useTokens } from "@/app/api/hooks/useTokens";
import { loader } from "./loader";
import { DialogTitle } from "@radix-ui/react-dialog";
import { on } from "events";
interface PaymentModelProps {
  isOpen: boolean;
  title: string;
  recievingPublicKey?: string;
  name: string;
  sendingPublicKey?: string;
  onClose: () => void;
}

const PaymentModel: React.FC<PaymentModelProps> = ({
  isOpen,
  title,
  recievingPublicKey,
  name,
  sendingPublicKey,
  onClose,
}) => {
  const [amount, setAmount] = React.useState<string>("");
  const { toast } = useToast();
  const { tokenBalances, loading } = useTokens({
    address: sendingPublicKey ?? "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  if (!isOpen) return null;
  if (loading) {
    return loader();
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          aria-describedby="dialog-description"
          className="flex border w-full max-w-[520px] flex-col gap-6 border-none bg-blue-100 px-6 py-9 text-black"
        >
          <DialogDescription></DialogDescription>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <div id="dialog-description" className="sr-only">
            This dialog allows you to make a payment by entering the amount and
            confirming the transaction.
          </div>
          <div className="flex border items-center justify-center">
            <div className="flex-1">
              <div>Sender Address</div>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(sendingPublicKey ?? "");
                  toast({
                    title: "Copied",
                    description: "Sender public key copied to clipboard",
                  });
                }}
                className="text-sm cursor-pointer text-muted-foreground w-40 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {sendingPublicKey}
              </div>
            </div>
            <div className="w-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div>Recieving Address</div>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(recievingPublicKey ?? "");
                  toast({
                    title: "Copied",
                    description: "Reciever public key copied to clipboard",
                  });
                }}
                className="text-sm text-muted-foreground cursor-pointer w-40 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {recievingPublicKey}
              </div>
            </div>
          </div>
          <Input
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            value={amount}
            className="border"
            prefix="SOL"
          />
          <div className="text-muted-foreground">
            Balance: {tokenBalances?.tokens[0].balance} SOL
          </div>
          <Button
            disabled={Number(tokenBalances?.tokens[0].balance) < Number(amount)}
            onClick={async () => {
              console.log("Transfering...");
              setIsSubmitting(true);
              if (!sendingPublicKey || !recievingPublicKey || !amount) {
                toast({
                  title: "Error",
                  description: "Please fill all the fields",
                });
                setIsSubmitting(false);
                return;
              }
              try {
                const res = await axios.post(
                  "/api/transaction",
                  {
                    sender: sendingPublicKey,
                    reciever: recievingPublicKey,
                    amount: amount,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                const { message, signature } = res.data;
                toast({
                  title: message,
                  description: `View transaction on Solana explorer : https://explorer.solana.com/tx/${signature}?cluster=devnet`,
                });
                setIsSubmitting(false);
                onClose();
              } catch (e) {
                toast({
                  title: `Error : ${e}`,
                  description: "Something went wrong",
                });
                setIsSubmitting(false);
                onClose();
              }
            }}
          >
            {isSubmitting ? "Transfering..." : "Transfer"}
          </Button>
          {Number(tokenBalances?.tokens[0].balance) < Number(amount) && (
            <div>
              <p className="text-red-500">Insufficient Balance</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentModel;

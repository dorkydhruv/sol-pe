"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

import { SUPPORTED_TOKENS, TokenDetails } from "@/app/lib/tokens";
import { useTokens } from "@/app/api/hooks/useTokens";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const Swap = ({ publicKey }: { publicKey: string }) => {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);
  const [baseAmount, setBaseAmount] = useState<string>();
  const [quoteAmount, setQuoteAmount] = useState<string>();
  const { tokenBalances, loading } = useTokens({ address: publicKey });
  const [fetchingQuote, setFetchingQuote] = useState<boolean>(false);
  const [quoteResponse, setQuoteResponse] = useState<any>();
  const { toast } = useToast();
  useEffect(() => {
    if (!baseAmount || Number(baseAmount) === 0) {
      setQuoteAmount("");
      return;
    }
    if (fetchingQuote) return;
    try {
      axios
        .get(
          `https://quote-api.jup.ag/v6/quote?inputMint=${
            baseAsset.mint
          }&outputMint=${quoteAsset.mint}&amount=${
            Number(baseAmount) * 10 ** baseAsset.decimals
          }&slippageBps=50`
        )
        .then((res) => {
          setQuoteAmount(
            Number(res.data.outAmount / 10 ** quoteAsset.decimals).toString()
          );
          setQuoteResponse(res.data);
          setFetchingQuote(false);
        });
    } catch (e) {
      console.log(e);
      setFetchingQuote(false);
    }
  }, [baseAmount, baseAsset, quoteAsset, fetchingQuote]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex-col flex justify-center items-center rounded-lg overflow-hidden">
          <SwapInputRow
            onSelect={(asset) => {
              setBaseAsset(asset);
            }}
            onAmounChange={(amount) => {
              setBaseAmount(amount);
            }}
            selectedToken={baseAsset}
            title="You send"
            topBorderEnabled={true}
            bottomBorderEnabled={false}
            subtitle={`Current balance : ${
              tokenBalances?.tokens.find((x) => x.name === baseAsset.name)
                ?.balance
            } ${baseAsset.name}`}
            amount={baseAmount?.toString()}
          ></SwapInputRow>
          <div className="flex justify-center relative">
            <div
              onClick={() => {
                let baseAssetTemp = baseAsset;
                setBaseAsset(quoteAsset);
                setQuoteAsset(baseAssetTemp);
              }}
              className="cursor-pointer rounded-full flex justify-center items-center w-10 h-10 border absolute mt-[-20px] bg-white"
            >
              <SwapIcon />
            </div>
          </div>
          <SwapInputRow
            onSelect={(asset) => {
              setQuoteAsset(asset);
            }}
            inputLoading={fetchingQuote}
            selectedToken={quoteAsset}
            onAmounChange={(amount) => {}}
            title="You recieve"
            topBorderEnabled={false}
            bottomBorderEnabled={true}
            amount={quoteAmount?.toString()}
          ></SwapInputRow>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                // swap logic
                toast({
                  title: `Swapping ${baseAmount} ${baseAsset.name} for ${quoteAmount} ${quoteAsset.name}`,
                  description: "Please wait while we process your transaction",
                });
                if (!quoteResponse) return;
                axios.post(
                  "/api/swap",
                  { quoteResponse },
                  {
                    withCredentials: true,
                  }
                );
              }}
              className="bg-blue-500 text-white rounded-xl mx-4 p-4 mt-4"
            >
              Swap
            </Button>
          </div>
        </div>
        <div>
          <div className="text-xs text-red-300 mt-4">
            *Slippage tolerance is set to 50 bps <br />
            *Transaction fee will be charged <br />
            *Only works on main-net
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Swap;

function SwapInputRow({
  onSelect,
  selectedToken,
  topBorderEnabled,
  bottomBorderEnabled,
  subtitle,
  inputLoading,
  title,
  onAmounChange,
  amount,
}: {
  onSelect: (asset: TokenDetails) => void;
  selectedToken: TokenDetails;
  topBorderEnabled: boolean;
  bottomBorderEnabled: boolean;
  title: string;
  subtitle?: string;
  inputLoading?: boolean;
  amount?: string;
  onAmounChange?: (amount: string) => void;
}) {
  return (
    <div
      className={`border flex-col justify-center items-center py-2 px-1 ${
        topBorderEnabled ? "rounded-t-xl" : ""
      } ${bottomBorderEnabled ? "rounded-b-xl" : ""}`}
    >
      <div className="px-3 text-sm font-bold">{title}</div>
      <div className="flex justify-evenly items-center">
        <div>
          <AssetSelector
            selectedToken={selectedToken}
            onSelect={onSelect}
          ></AssetSelector>
          {subtitle && (
            <div className="text-gray-500 text-xs mx-3 overflow-ellipsis">
              {subtitle}
            </div>
          )}
        </div>
        <div>
          {!inputLoading ? (
            <Input
              disabled={bottomBorderEnabled}
              onChange={(e) => {
                onAmounChange?.(e.target.value);
              }}
              value={amount}
              placeholder="0"
              type="text"
              className="  outline-none bg-white text-xl"
              dir="rtl"
            ></Input>
          ) : (
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          )}
        </div>
      </div>
    </div>
  );
}

function AssetSelector({
  selectedToken,
  onSelect,
}: {
  selectedToken: TokenDetails;
  onSelect: (asset: TokenDetails) => void;
}) {
  return (
    <div>
      <select
        onChange={(e) => {
          const selectedToken = SUPPORTED_TOKENS.find(
            (token) => token.name === e.target.value
          );
          if (selectedToken) onSelect(selectedToken);
        }}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-auto p-1 m-2 "
      >
        {SUPPORTED_TOKENS.map((token) => (
          <option
            key={token.mint}
            selected={selectedToken.name === token.name ? true : false}
          >
            {token.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function SwapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
      />
    </svg>
  );
}

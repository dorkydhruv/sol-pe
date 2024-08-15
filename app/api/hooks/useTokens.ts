import { TokenDetails } from "@/app/lib/tokens";
import axios from "axios";
import { useEffect, useState } from "react";

export interface TokenWithBalance extends TokenDetails {
  balance: string;
  usdBalance: string;
}

export const useTokens = ({ address }: { address: string }) => {
  const [tokenBalances, setTokens] = useState<{
    totalBalance: number;
    tokens: TokenWithBalance[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`api/tokens?address=${address}`).then((res) => {
      setTokens(res.data);
      setLoading(false);
    });
  }, []);

  return { tokenBalances, loading };
};

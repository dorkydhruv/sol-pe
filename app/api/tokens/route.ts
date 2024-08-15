import { connection, getSupportedTokens } from "@/app/lib/constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
} from "@solana/spl-token";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address") as unknown as string;
    const supportedToken = await getSupportedTokens();
    const balances = await Promise.all(
      supportedToken.map(async (token) => getAccountBalance(token, address))
    );
    const tokens = supportedToken.map((token, index) => ({
      ...token,
      balance: balances[index],
      usdBalance: balances[index] * Number(token.price),
    }));
    return NextResponse.json({
      tokens,
      totalBalance: tokens.reduce((acc, val) => acc + val.usdBalance, 0),
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}

async function getAccountBalance(
  token: {
    name: string;
    mint: string;
    native: boolean;
    decimals: number;
  },
  address: string
) {
  try {
    if (token.native) {
      let balance = await connection.getBalance(new PublicKey(address));
      return balance / LAMPORTS_PER_SOL;
    }
    const ata = await getAssociatedTokenAddress(
      new PublicKey(token.mint),
      new PublicKey(address)
    );

    const account = await getAccount(connection, ata);
    return Number(account.amount) / 10 ** token.decimals;
  } catch (e) {
    console.log("insufficient balance");
    return 0;
  }
}

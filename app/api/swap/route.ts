import { authConfig } from "@/app/lib/authconfig";
import prisma from "@/app/lib/db";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=5935eb6e-9c4e-4031-b4b6-f1290106d2d6"
  );

  const data: {
    quoteResponse: any;
  } = await req.json();

  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const solWallet = await prisma.solWallet.findFirst({
    where: {
      userId: session.user.uid,
    },
  });

  if (!solWallet) {
    return NextResponse.json({ error: "No wallet found", status: 400 });
  }

  const { swapTransaction } = await (
    await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // quoteResponse from /quote api
        quoteResponse: data.quoteResponse,
        // user public key to be used for the swap
        userPublicKey: solWallet.publicKey,
        // auto wrap and unwrap SOL. default is true
        wrapAndUnwrapSol: true,
        // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
        // feeAccount: "fee_account_public_key"
      }),
    })
  ).json();
  // deserialize the transaction
  const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
  var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
  console.log(transaction);
  const privateKey = getPrivateKeyfromDb(solWallet.privateKey);
  // sign the transaction
  transaction.sign([privateKey]);
  // get the latest block hash
  console.log("Getting latest block hash");
  const latestBlockHash = await connection.getLatestBlockhash();
  console.log("Got latest block hash");
  // Execute the transaction
  const rawTransaction = transaction.serialize();
  try {
    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 2,
    });
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txid,
    });
    console.log(`https://solscan.io/tx/${txid}`);
    return NextResponse.json({ txid });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Transaction failed", status: 400 });
  }
}

const getPrivateKeyfromDb = (privateKey: string) => {
  const arr = privateKey.split(",").map((x) => Number(x));
  const privateKeyUint8Arr = new Uint8Array(arr);
  const keypair = Keypair.fromSecretKey(privateKeyUint8Arr);
  return keypair;
};

import { authConfig } from "@/app/lib/authconfig";
import { connection } from "@/app/lib/constants";
import prisma from "@/app/lib/db";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {}

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  console.log(req.body);
  const data = await req.json();
  const { sender, reciever, amount } = data;
  if (!sender || !reciever || !amount) {
    return NextResponse.json(
      { error: "Invalid request, missing required fields" },
      { status: 400 }
    );
  }
  const senderPubkey = new PublicKey(sender);
  const receiverPubkey = new PublicKey(reciever);
  const transaction = new Transaction();
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderPubkey,
    toPubkey: receiverPubkey,
    lamports: Number(amount) * LAMPORTS_PER_SOL,
  });
  transaction.add(sendSolInstruction);
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }
  const solWallet = await prisma.solWallet.findFirst({
    where: {
      userId: session.user.uid,
    },
  });
  if (!solWallet) {
    return NextResponse.json({ message: "No wallet found", status: 400 });
  }
  const senderKeyPair = getPrivateKeyfromDb(solWallet.privateKey);
  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      senderKeyPair,
    ]);
    console.log("Transaction Signature", signature);
    return NextResponse.json({
      message: "Transaction Successful",
      signature: signature,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Transaction Failed", status: 500 });
  }
}

const getPrivateKeyfromDb = (privateKey: string) => {
  const arr = privateKey.split(",").map((x) => Number(x));
  const privateKeyUint8Arr = new Uint8Array(arr);
  const keypair = Keypair.fromSecretKey(privateKeyUint8Arr);
  return keypair;
};

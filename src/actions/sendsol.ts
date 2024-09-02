"use server";

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

import { GetSolPrivateKey } from "./getPrivateKey";

export async function sendSol(
  Receiver_publicKey: string,
  Amount: number,
  Sender_publicKey: string,
  mnemonics: string,
  network: string,
) {
  console.log("secrate is ", mnemonics);

  const connection =
    network === "devnet"
      ? new Connection(process.env.SOLANA_DEVNET_RPC || "", "confirmed")
      : new Connection(process.env.SOLANA_MAINNET_RPC || "", "confirmed");

  const sender = await GetSolPrivateKey(Sender_publicKey, mnemonics);
  const txn = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(Sender_publicKey),
      toPubkey: new PublicKey(Receiver_publicKey),
      lamports: Amount * LAMPORTS_PER_SOL,
    }),
  );

  if (!sender) {
    console.error("Sender is undefined. Transaction cannot be sent.");
    return;
  }
  const senderKeypair = Keypair.fromSecretKey(sender.secretKey);
  
  try {
    const res = await sendAndConfirmTransaction(connection, txn, [
      senderKeypair,
    ]);
  
  } catch (error) {
  return
  }
  return {
    message: "txn is successful",
  };
}

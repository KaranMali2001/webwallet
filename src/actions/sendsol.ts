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
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { GetUserWallets } from "./GetWallets";
import { useSecret } from "@/lib/secrateContextProvider";

export async function sendSol(
  Receiver_publicKey: string,
  Amount: number,
  walletNumber: number,
  mnemonics:string
) {
 
 console.log("secrate is ",mnemonics)
    const seed = mnemonicToSeedSync(mnemonics);
 
  const DerivedPath = `m/44'/501'/${walletNumber}'/0'`;
  console.log("afer derived path");
  const derivedSeed = derivePath(DerivedPath, seed.toString("hex")).key;
  const connection = new Connection("https://api.devnet.solana.com");
  const sender = Keypair.fromSeed(derivedSeed);
  console.log("sender public key is", sender.publicKey);
  console.log(
    "sender privet key is",
    Buffer.from(sender.secretKey).toString("hex")
  );
  console.log("pbulic key is",sender.publicKey)
  const txn = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: new PublicKey(Receiver_publicKey),
      lamports: Amount * LAMPORTS_PER_SOL,
    })
  );
  console.log("after creating txn", txn);
  const res = await sendAndConfirmTransaction(connection, txn, [sender]);
  console.log("afet sending txn");
  console.log("res from send sol testing is", res);
  return {
    "message":"txn is successful"
  }
}

"use server";
import prisma from "@/lib/db";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { NextResponse } from "next/server";

export async function New_wallet(data: string) {


  const totalCreatedWallet = await prisma.wallet.count({
    where: {
      User_Mnemonics: data,
    },
  });

  const seed = mnemonicToSeedSync(data);
  const DerivedPath = `m/44'/501'/${totalCreatedWallet + 1}'/0'`;

  const derivedSeed = derivePath(DerivedPath, seed.toString("hex")).key;
  const solKeyPair = Keypair.fromSeed(derivedSeed);
  const res = await prisma.wallet.create({
    data: {
      wallet_address: solKeyPair.publicKey.toBase58(),
      User_Mnemonics: data,
    },
  });

  return {
    publicKey: solKeyPair.publicKey.toBase58(),
    secretKey: new Uint8Array(solKeyPair.secretKey),
  };
}

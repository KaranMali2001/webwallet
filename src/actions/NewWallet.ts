"use server";
import prisma from "@/lib/db";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { NextResponse } from "next/server";
export async function EthWallet(data: string) {
  const totalCreatedWallet = await prisma.wallet.count({
    where: {
      User_Mnemonics: data,
    },
  });
  const seed = mnemonicToSeedSync(data);
  const DerivedPath = `m/44'/60'/${totalCreatedWallet + 1}'/0'`;

  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(DerivedPath);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);

  const res = await prisma.wallet.create({
    data: {
      wallet_address: wallet.address.toString(),
      User_Mnemonics: data,
      EthWalletIndex: totalCreatedWallet + 1,
      SolWalletIndex: 0,
    },
  });
  return {
    PublicKey: wallet.address.toString(),
    PrivateKey: privateKey,
  };
}
export async function SolWallet(data: string) {
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
      SolWalletIndex: totalCreatedWallet + 1,
      EthWalletIndex: 0,
    },
  });

  return {
    publicKey: solKeyPair.publicKey.toBase58(),
    secretKey: new Uint8Array(solKeyPair.secretKey),
  };
}

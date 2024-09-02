"use server";
import prisma from "@/lib/db";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";
export async function GetEthPrivateKey(publicKey: string, data: string) {
  const res = await prisma.wallet.findFirst({
    where: {
      wallet_address: publicKey,
    },
  });
  const seed = mnemonicToSeedSync(data);
  const DerivedPath = `m/44'/60'/${res?.EthWalletIndex}'/0'`;
 
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(DerivedPath);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);
  return {
    PublicKey: wallet.address.toString(),
    PrivateKey: privateKey,
  };
}
export async function GetSolPrivateKey(publicKey: string, data: string) {
  const res = await prisma.wallet.findFirst({
    where: {
      wallet_address: publicKey,
    },
  });
  const seed = mnemonicToSeedSync(data);
  const DerivedPath = `m/44'/501'/${res?.SolWalletIndex}'/0'`;
  const derivedSeed = derivePath(DerivedPath, seed.toString("hex")).key;
  const solKeyPair = Keypair.fromSeed(derivedSeed);
  return {
    publicKey: solKeyPair.publicKey.toBase58(),
    secretKey: new Uint8Array(solKeyPair.secretKey),
  };
}

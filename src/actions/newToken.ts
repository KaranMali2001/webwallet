'use server'
import {
  createMint,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";

export async function CreateNewToken(mnemonics: string, walletNumber: number) {
console.log("inside Create new token server side function")
    const seed = mnemonicToSeedSync(mnemonics);

  const DerivedPath = `m/44'/501'/${walletNumber}'/0'`;
  console.log("afer derived path");
  const derivedSeed = derivePath(DerivedPath, seed.toString("hex")).key;
  const connection = new Connection("https://api.devnet.solana.com");
  const payer = Keypair.fromSeed(derivedSeed);
  const DefaultKeyPair = Keypair.generate();
  const mintAuth = payer;
  console.log("before mint")
  const mint = await createMint(
    connection,
    payer,
    mintAuth.publicKey,
    null,
    8,
    DefaultKeyPair,
    undefined,
    TOKEN_2022_PROGRAM_ID
  );
return{
  Message:"token created successfully",
  "Token Address":mint.toBase58()
}
}

"use server";
import prisma from "@/lib/db";

export async function GetSolanaWallets(data: string) {
  const res = await prisma.wallet.findMany({
    where: {
      User_Mnemonics: data,
      wallet_address: {
        not: {
          startsWith: "0x",
        },
      },
    },
  });
  return res;
}
export async function GetEthWallets(data: string) {
  const res = await prisma.wallet.findMany({
    where: {
      User_Mnemonics: data,
      wallet_address: {
        startsWith: "0x",
      },
    },
  });
  return res;
}

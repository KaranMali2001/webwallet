"use server";
import prisma from "@/lib/db";

export async function GetUserWallets(data: string) {
  const res = await prisma.wallet.findMany({
    where: {
      User_Mnemonics: data,
    },
  });
  return res;
}

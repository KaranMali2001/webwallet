"use server";

import prisma from "@/lib/db";

export async function FindUser(Pharse: string) {
  const res = await prisma.user.findUnique({
    where: {
      hashed_mnemonics: Pharse,
    },
  });
  return res;
}

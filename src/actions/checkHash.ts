"use server";
import prisma from "@/lib/db";

import bcrypt from "bcryptjs";
export async function CheckHash(mnemonics: string) {
  var salt = bcrypt.genSaltSync(10);
  const hashedMnemonic = await bcrypt.hash(mnemonics.toString(), salt);
  const userdata = prisma.user.findUnique({
    where: {
      hashed_mnemonics: hashedMnemonic,
    },
  });
  if (!userdata) {
    
    return false;
  }
  
  return true;
}

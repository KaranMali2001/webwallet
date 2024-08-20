"use server";
import bcrypt from "bcryptjs";
import { generateMnemonic } from "bip39";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  const mnemonic = generateMnemonic(128);

  
  const hashedMnemonic = await bcrypt.hash(mnemonic.toString(), 0);
  try {
    const res = await prisma.user.create({
      data: {
        hashed_mnemonics: mnemonic,
      },
    });

    console.log("res that saved inside",res)  
} catch (error: any) {
    return {
      error: error,
    };
  }
  return NextResponse.json(mnemonic);
}

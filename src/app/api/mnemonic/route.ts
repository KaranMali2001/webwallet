'use server'
import bcrypt from 'bcryptjs';
import { generateMnemonic} from "bip39"
import prisma from "@/lib/db";
import { NextResponse } from 'next/server';


export async function POST() {
  

  const mnemonic=generateMnemonic(128)
  

  var salt = bcrypt.genSaltSync(10);
  const hashedMnemonic=await bcrypt.hash(mnemonic.toString(),salt)
  try {
      
     const res= await prisma.user.create({
          data:{
              hashed_mnemonics:hashedMnemonic,
          }
      })
      
   
  } catch (error:any) {
      return {
          "error":error,
      }
  }
 
  return NextResponse.json(mnemonic)
}
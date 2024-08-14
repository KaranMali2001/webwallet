'use server'
import { Keypair } from "@solana/web3.js"
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';
export const New_wallet=async (seed:Buffer,index:number)=>{
    
 
    const DerivedPath=`m/44'/501'/1'/0'`
    const derivedSeed=derivePath(DerivedPath,seed.toString('hex')).key
    const solKeyPair=Keypair.fromSeed(derivedSeed)
    return{
      
        "public Key":solKeyPair.publicKey,
        "private key":solKeyPair.secretKey,
    }

}
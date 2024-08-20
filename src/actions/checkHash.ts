'use server'
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
export async function CheckHash(mnemonics:string){
    var salt = bcrypt.genSaltSync(10);
    const hashedMnemonic=await bcrypt.hash(mnemonics.toString(),salt)
    const userdata=prisma.user.findUnique({
        where:{
            hashed_mnemonics:hashedMnemonic,
        }
    })
    if(!userdata){
        console.log("user not found")
        return false
    }
    console.log(userdata)
    return true
}
'use server'

import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"


export default async function GetWalletBalence(pubKey:string){
    console.log("inside get wallet Function")
    const connection=new Connection(clusterApiUrl('devnet'))
    const publicKey=new PublicKey(pubKey)
    const balence=await connection.getBalance(publicKey)
    console.log("the balence of account",balence)
    
}
export async function AirDrop(pubKey:string){
    console.log("inside airDrop")
    let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const AirDropAddress=new PublicKey(pubKey)
    const signature=await connection.requestAirdrop(AirDropAddress,LAMPORTS_PER_SOL)
    console.log("signature ",signature)
    const confirm= await connection.confirmTransaction(signature)
    console.log(confirm)
}
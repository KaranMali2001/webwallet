'use server'

import {  Connection, PublicKey } from "@solana/web3.js"


export default async function GetWalletBalence(pubKey:string,network:string){
    console.log("inside get wallet balence Function")
    if(network==="devnet"){
        const connection=new Connection(process.env.SOLANA_DEVNET_RPC || "")
    
        const publicKey=new PublicKey(pubKey)
        const balence=await connection.getBalance(publicKey)
        return balence
        
    }else if(network==="mainnet"){
        const connection=new Connection(process.env.SOLANA_MAINNET_RPC || "")
    
        const publicKey=new PublicKey(pubKey)
        const balence=await connection.getBalance(publicKey)
        return balence
        
    }else{
        return {
            "select network":"dev or main",
        }
    }
    
    
}

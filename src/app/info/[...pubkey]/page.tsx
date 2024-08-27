'use client'
import GetWalletBalence from "@/actions/GetWalletBalence";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function (){
    const param=useParams()
    const [netWork, setNetWork] = useState<string>('devnet');
    const [walletBalence,setWalletBalence]=useState<number >(0)
    useEffect(()=>{
        const fetchWalletBalence=async()=>{
            const res=await GetWalletBalence(param.pubkey.toString(),netWork)
            if(typeof res=="number"){
                setWalletBalence(res/LAMPORTS_PER_SOL)
        
            }
         }
         fetchWalletBalence()
    },[param,netWork])
 return <div>
    <RadioGroup value={netWork} onValueChange={setNetWork} defaultValue="comfortable" className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="devnet" id="r1" className="w-6 h-6 text-blue-600 focus:ring-blue-500 checked:bg-blue-500 justify-self-end"/>
        <Label htmlFor="r1" className="text-lg font-semibold text-blue-700">Devnet</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="mainnet" id="r2" className="w-6 h-6 text-blue-600 focus:ring-blue-500 checked:bg-blue-500 justify-self-end" />
        <Label htmlFor="r2 "className="text-lg font-semibold text-blue-700">Mainnet</Label>
      </div>
    </RadioGroup>
 Wallet Balence is : {walletBalence}
 <br />
    will add swap, send , receive of public key:{param.pubkey}
 </div>
}
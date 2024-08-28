'use client'
import GetWalletBalence from "@/actions/GetWalletBalence";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendSol } from "@/actions/sendsol";
import { GetUserWallets } from "@/actions/GetWallets";

export default function (){

    const param=useParams()
    const pubkeyArray = param.pubkey || [];
    const walletIndex = pubkeyArray[0]; // Access the first element for index
    const walletAddress = pubkeyArray[1]
    console.log("param is ",param)
    const [netWork, setNetWork] = useState<string>('devnet');
    const [walletBalence,setWalletBalence]=useState<number >(0)
    const [ReceiversAdd,setReceiversAdd]=useState('')
    const [Amount,setAmount]=useState<string>('0')
    useEffect(()=>{
        const fetchWalletBalence=async()=>{
            const res=await GetWalletBalence(walletAddress.toString(),netWork)
            if(typeof res=="number"){
                setWalletBalence(res/LAMPORTS_PER_SOL)
        
            }
         }
         fetchWalletBalence()
    },[param,netWork])
    const handleSend=async ()=>{
        const res=await sendSol(ReceiversAdd,parseFloat(Amount),Number(walletIndex))
        
        console.log("res from send sol function is ",res)
    }
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
 
 <div className="flex w-full max-w-sm items-center space-x-2">
      <Input 
      type="text" 
      placeholder="Receivers Address"
      value={ReceiversAdd}
      onChange={(e)=>{setReceiversAdd(e.target.value)}}
      />
         <Input 
      type="text" 
      placeholder="Amount"
      value={Amount}
      onChange={(e)=>{setAmount((e.target.value))}}
      />
      <Button variant='outline' onClick={handleSend}>Send</Button>
    </div>

    will add swap, send , receive of public key:{walletAddress}
 </div>
}
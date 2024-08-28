"use client";
import GetWalletBalence from "@/actions/GetWalletBalence";
import { New_wallet } from "@/actions/NewWallet";

import { useEffect, useState } from "react";
import { GetUserWallets } from "@/actions/GetWallets";
import { Wallet } from "@prisma/client";

import Link from "next/link";


interface WalletKeys {
  publicKey: string;
  secretKey: string;
}
export function DashboardComponent({ pharses }: { pharses: string }){
  const [newKeyPair, setNewKeyPair] = useState<WalletKeys | null>(null);
  const [Wallets, setWallets] = useState<Wallet[] | null>(null);
  const [mnemonics, setMnemoics] = useState("");
  
  const [walletBalence, setWalletBalence] = useState<{
    [key: string]: string | number;
  }>({});
  useEffect(() => {
    if (pharses) {
      setMnemoics(pharses);
    }
  }, [pharses]);
  
  useEffect(()=>{
    const fetchUserWallets = async () => {
      if (mnemonics) {
        try {
          const data = await GetUserWallets(mnemonics);
          setWallets(data);
        } catch (error) {
          console.log("Error fetching wallets", error);
        }
      } else {
        console.log("No mnemonics to fetch wallets");
      }
    };

    fetchUserWallets();
  }, [newKeyPair,mnemonics])

  const ButtonForNewWallet = async () => {
    const res = await New_wallet(mnemonics);
    const publicKey=res.publicKey
    const secrateString=Buffer.from(res.secretKey).toString('hex')
    const res2={
      publicKey,
      secretKey:secrateString
    }
    setNewKeyPair(res2);
    
  };
 
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white ">
<div className="grid grid-cols-2 justify-end">
  <div className="ml-auto col-span-2">
    
  </div>
</div>
    
      <div className="grid grid-cols-2 gap-4">
        <ul className=" col-span-1">
          {Wallets && Wallets.length > 0 ? (
            Wallets.map((wallet, index) => (
              <li key={index}>
                <Link href={`/info/${index+1}/${wallet.wallet_address}`}>
                Wallet Number {index + 1}: {wallet.wallet_address}
                 </Link>
              </li>
            ))
          ) : (
            <li>No wallet addresses found.</li>
          )}
        </ul>
      </div>
      <div className="bg-blue-700 text-white ">
        <button onClick={ButtonForNewWallet}>Create New Wallet</button> <br />
      </div>
      New Key pair generated for wallet is <br />
      Public Key:{newKeyPair?.publicKey} <br />
      Private Key:{newKeyPair?.secretKey} <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      </div>
  );
}

"use client";
import GetWalletBalence from "@/actions/GetWalletBalence";

import { useEffect, useState } from "react";
import { GetUserWallets } from "@/actions/GetWallets";
import { Wallet } from "@prisma/client";

import Link from "next/link";
import { EthWallet, SolWallet } from "@/actions/NewWallet";

interface WalletKeys {
  publicKey: string;
  secretKey: string;
}
export function DashboardComponent({ pharses }: { pharses: string }) {
  const [newKeyPair, setNewKeyPair] = useState<WalletKeys | null>(null);
  const [NewEthPair,setNewEthPair]=useState({
    PublicKey:"",
    PrivateKey:""
  })
  const [Wallets, setWallets] = useState<Wallet[] | null>(null);
  const [mnemonics, setMnemoics] = useState("");

  useEffect(() => {
    if (pharses) {
      setMnemoics(pharses);
    }
  }, [pharses]);

  useEffect(() => {
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
  }, [newKeyPair, mnemonics]);

  const SolanaWallet = async () => {
    const res = await SolWallet(mnemonics);
    const publicKey = res.publicKey;
    const secrateString = Buffer.from(res.secretKey).toString("hex");
    const res2 = {
      publicKey,
      secretKey: secrateString,
    };
    setNewKeyPair(res2);
  };
  const EthriumWallet = async () => {
    const res = await EthWallet(mnemonics);
    console.log("res from eth wallet is",res.PrivateKey,res.PublicKey)
    setNewEthPair({
      PublicKey:res.PublicKey,
      PrivateKey:res.PrivateKey
    })
    
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white ">
      <div className="grid grid-cols-2 justify-end">
        <div className="ml-auto col-span-2"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ul className=" col-span-1">
          {Wallets && Wallets.length > 0 ? (
            Wallets.map((wallet, index) => (
              <li key={index}>
                <Link href={`/info/${index + 1}/${wallet.wallet_address}`}>
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
        <button onClick={SolanaWallet}>Create New Solana Wallet</button> <br />
      </div>
      <div className="bg-pink-700 text-white ">
        <button onClick={EthriumWallet}>Create New Eth Wallet</button> <br />
      </div>
      {newKeyPair ? (
          <>
            <p>New Solana Key Pair Generated:</p>
            <p>Public Key: {newKeyPair.publicKey}</p>
            <p>Private Key: {newKeyPair.secretKey}</p>
          </>
        ) : NewEthPair ? (
          <>
            <p>New Ethereum Key Pair Generated:</p>
            <p>Public Key: {NewEthPair.PublicKey}</p>
            <p>Private Key: {NewEthPair.PrivateKey}</p>
          </>
        ) : (
          <p>No Key Pair Generated Yet.</p>
        )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

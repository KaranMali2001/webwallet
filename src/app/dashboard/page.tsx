"use client";
import GetWalletBalence, { AirDrop } from "@/actions/GetWalletBalence";
import { New_wallet } from "@/actions/NewWallet";
import { Keypair } from "@solana/web3.js";

import { useEffect, useState } from "react";

import { GetUserWallets } from "@/actions/GetWallets";
import { Wallet } from "@prisma/client";

interface WalletKeys {
  publicKey: string;
  secretKey: Uint8Array;
}
export default function DashboardComponent({ pharses }: { pharses: string }) {
  const [newKeyPair, setNewKeyPair] = useState<WalletKeys | null>(null);
  const [Wallets, setWallets] = useState<Wallet[] | null>(null);
  const [mnemonics, setMnemoics] = useState("");

  useEffect(() => {
    if (pharses) {
      setMnemoics(pharses);
    }
  }, [pharses]);
  const ButtonForWallets = async () => {
    if (mnemonics) {
      console.log("pharses", mnemonics);
      const data = await GetUserWallets(mnemonics);
      console.log("the data inside Button for wallets", data);
      setWallets(data);
    } else {
      console.log("No mnemonics to fetch wallets");
    }
  };
  const ButtonForNewWallet = async () => {
    const res = await New_wallet(mnemonics);
    setNewKeyPair(res);
    console.log(res);
  };
  return (
    <div className="text-white">
      <button onClick={ButtonForWallets}>Click here to get wallet</button>
      <ul className="bg-orange-700">
        {Wallets && Wallets.length > 0 ? (
          Wallets.map((wallet, index) => (
            <li key={index}>{wallet.wallet_address}</li>
          ))
        ) : (
          <li>No wallet addresses found.</li>
        )}
      </ul>
      <div className="bg-blue-700 text-white ">
        <button onClick={ButtonForNewWallet}>Create New Wallet</button> <br />
      </div>
      New Key pair generated for wallet is <br />
      Public Key:{newKeyPair?.publicKey} <br />
      Private Key:{newKeyPair?.secretKey} <br />
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          if (newKeyPair?.publicKey) {
            AirDrop(newKeyPair?.publicKey);
          }
        }}
      >
        Click here to get air drop
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          if (newKeyPair) {
            GetWalletBalence(newKeyPair.publicKey);
          }
        }}
      >
        Click here to get Balence
      </button>
    </div>
  );
}

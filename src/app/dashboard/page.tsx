"use client";
import GetWalletBalence from "@/actions/GetWalletBalence";
import { New_wallet } from "@/actions/NewWallet";

import { useEffect, useState } from "react";

import { GetUserWallets } from "@/actions/GetWallets";
import { Wallet } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface WalletKeys {
  publicKey: string;
  secretKey: Uint8Array;
}
export default function DashboardComponent({ pharses }: { pharses: string }) {
  const [newKeyPair, setNewKeyPair] = useState<WalletKeys | null>(null);
  const [Wallets, setWallets] = useState<Wallet[] | null>(null);
  const [mnemonics, setMnemoics] = useState("");
  const [netWork, setNetWork] = useState<string>('devnet');
  const [walletBalence, setWalletBalence] = useState<{
    [key: string]: string | number;
  }>({});
  useEffect(() => {
    if (pharses) {
      setMnemoics(pharses);
    }
  }, [pharses]);
  const handleWalletBalence = async (wallet_address: string) => {
    try {
      const res = await GetWalletBalence(wallet_address,netWork);
      setWalletBalence((prevBalence) => ({
        ...prevBalence,
        [wallet_address]: res,
      }));
    } catch (error: any) {
      console.log("error while fetching balence");
    }
  };
  const ButtonForWallets = async () => {
    if (mnemonics) {
      const data = await GetUserWallets(mnemonics);

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
  const handleNetworkChange=(netWork:string)=>{
setNetWork(netWork)
  }
  return (
    <div className="text-white">
      <div className="network-selection">
        <label>
          <input
            type="radio"
            name="network"
            value="mainnet"
            checked={netWork === 'mainnet'}
            onChange={() => handleNetworkChange('mainnet')}
          />
          Mainnet
        </label>
        <label>
          <input
            type="radio"
            name="network"
            value="devnet "
            checked={netWork === 'devnet'}
            onChange={() => handleNetworkChange('devnet')}
          />
          Testnet
        </label>
      </div>
      <button onClick={ButtonForWallets}>Click here to get wallet</button>
      <div className="grid grid-cols-2 gap-4">
        <ul className=" col-span-1">
          {Wallets && Wallets.length > 0 ? (
            Wallets.map((wallet, index) => (
              <li key={index}>
                {wallet.wallet_address}
                <div className=" col-span-1">
                  <Button
                    className="bg-black"
                    onClick={() => handleWalletBalence(wallet.wallet_address)}
                  >
                    {" "}
                    Click here to get Wallet Balence{" "}
                  </Button>
                  {walletBalence[wallet.wallet_address] !== undefined && (
                    <div>Balance: {walletBalence[wallet.wallet_address]}</div>
                  )}
                </div>
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

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { GetEthWallets, GetSolanaWallets } from "@/actions/GetWallets";
import { Wallet } from "@prisma/client";

import { EthWallet, SolWallet } from "@/actions/NewWallet";
import { PlusIcon } from "@radix-ui/react-icons";
import { Block } from "ethers";
import { GetEthPrivateKey, GetSolPrivateKey } from "@/actions/getPrivateKey";
import { ExternalLinkIcon, EyeIcon, EyeOffIcon } from "lucide-react";

interface WalletKeys {
  publicKey: string;
  secretKey: string;
}

export function DashboardComponentVercel({ pharses }: { pharses: string }) {
  const [newKeyPair, setNewKeyPair] = useState<WalletKeys | null>(null);
  const [NewEthPair, setNewEthPair] = useState({
    PublicKey: "",
    PrivateKey: "",
  });
  const [Wallets, setWallets] = useState<Wallet[] | null>(null);
  const [mnemonics, setMnemoics] = useState("");
  const [Blockchain, setBlockchain] = useState("solana");
  const [privateKeys, setPrivateKeys] = useState<Record<string, WalletKeys>>(
    {},
  );
  const [showPrivateKey, setShowPrivateKey] = useState({});
  useEffect(() => {
    if (pharses) {
      setMnemoics(pharses);
    }
  }, [pharses]);

  useEffect(() => {
    const fetchUserWallets = async () => {
      if (mnemonics) {
        try {
          if (Blockchain === "solana") {
            const data = await GetSolanaWallets(mnemonics);
            setWallets(data);
          } else if (Blockchain === "ethereum") {
            const res = await GetEthWallets(mnemonics);
            setWallets(res);
          }
        } catch (error) {
          console.log("Error fetching wallets", error);
        }
      } else {
        console.log("No mnemonics to fetch wallets");
      }
    };

    fetchUserWallets();
  }, [mnemonics, Blockchain, NewEthPair, newKeyPair]);
  const GetPrivateKey = async (walletAddress: string) => {
    try {
      let res, res2: any;
      if (Blockchain === "solana") {
        res = await GetSolPrivateKey(walletAddress, mnemonics);
        res2 = {
          publicKey: res.publicKey,
          secretKey: Buffer.from(res.secretKey).toString("hex"),
        };
      } else if (Blockchain === "ethereum") {
        res = await GetEthPrivateKey(walletAddress, mnemonics);
        res2 = {
          publicKey: res.PublicKey,
          secretKey: res.PrivateKey,
        };
      }

      setPrivateKeys((prevState) => ({
        ...prevState,
        [walletAddress]: res2,
      }));
    } catch (error) {
      console.error("Failed to fetch private key:", error);
    }
  };
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
  const EthereumWallet = async () => {
    const res = await EthWallet(mnemonics);
    console.log("res from eth wallet is", res.PrivateKey, res.PublicKey);
    setNewEthPair({
      PublicKey: res.PublicKey,
      PrivateKey: res.PrivateKey,
    });
  };
  const togglePrivateKeyVisibility = (address: any) => {
    setShowPrivateKey((prev) => ({
      ...prev,
      //@ts-ignore
      [address]: !prev[address],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 ">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <WalletIcon className="w-6 h-6" />
            <span>Web3 Wallet</span>
          </Link>
          <div className="relative text-black">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span>{Blockchain}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setBlockchain("ethereum")}>
                  <Link href="#" className="text-black" prefetch={false}>
                    Ethereum
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="#"
                    className="text-black"
                    onClick={() => setBlockchain("solana")}
                    prefetch={false}
                  >
                    Solana
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            <SettingsIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost">
            <UserIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r bg-purple-700">
            {Blockchain} Wallets
          </h1>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {Wallets?.map((wallet, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Wallet {index + 1}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-gray-100"
                    >
                      <CopyIcon className="w-5 h-5 text-gray-600" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">
                      {wallet.wallet_address}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      onClick={() => GetPrivateKey(wallet.wallet_address)}
                    >
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Show Private Key
                    </Button>
                    {privateKeys[wallet.wallet_address]?.secretKey && (
                      <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden">
                        <div className="font-mono text-sm break-all">
                          {privateKeys[wallet.wallet_address]
                            ? privateKeys[wallet.wallet_address].secretKey
                            : "••••••••••••••••••••••••••••••••"}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 hover:bg-gray-200"
                          onClick={() =>
                            togglePrivateKeyVisibility(wallet.wallet_address)
                          }
                        >
                          {privateKeys[wallet.wallet_address] ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    )}
                    <Link
                      href={`/dashboard/info/${Blockchain}/${index + 1}/${
                        wallet.wallet_address
                      }`}
                      className="flex items-center justify-center w-full p-2 text-sm text-primary hover:text-primary-foreground hover:bg-primary rounded-md transition-colors duration-300"
                      prefetch={false}
                    >
                      View wallet details
                      <ExternalLinkIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => {
                if (Blockchain === "ethereum") {
                  EthereumWallet();
                } else if (Blockchain === "solana") {
                  SolanaWallet();
                } else {
                  alert("Please select a Blockchain");
                }
              }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary bg-purple-700   text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Create New Wallet
            </Button>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <p className="text-sm">&copy; 2023 Web3 Wallet</p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CopyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

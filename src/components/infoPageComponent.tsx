import { useEffect, useState } from "react";
import {
  Copy,
  Send,
  Download,
  RefreshCw,
  CreditCard,
  Menu,
  AlertCircle,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import SolanaWalletBalence, {
  EthWalletBalence,
} from "@/actions/GetWalletBalence";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useSecret } from "@/lib/secrateContextProvider";
import { sendSol } from "@/actions/sendsol";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getRecentTxn } from "@/actions/getRecentTxn";
export default function InfoPageComponent() {
  const [address] = useState("0x1234...5678");

  const param = useParams();
  const [isMainnet, setIsMainnet] = useState(true);

  const pubkeyArray = param.pubkey || [];
  const Blokchain = pubkeyArray[0]; // Access the first element for index
  const walletIndex = pubkeyArray[1];
  const walletAddress = pubkeyArray[2];
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [ReceiversAdd, setReceiversAdd] = useState("");
  const [Amount, setAmount] = useState<string>("0");
  const [walletBalence, setWalletBalence] = useState<number>(0);
  const [txn, setTxn] = useState<any[]>([]);
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  

  useEffect(() => {
    if(walletAddress.startsWith('0x')){
      return
    }
    const fetchWalletBalence = async () => {
      if (Blokchain === "ethereum") {
        const res = await EthWalletBalence(walletAddress, "holesky");
        if (typeof res == "number") {
          setWalletBalence(res);
        }
      } else {
        const network = isMainnet ? "mainnet" : "devnet";
        const res = await SolanaWalletBalence(
          walletAddress.toString(),
          network,
        );
        if (typeof res == "number") {
          setWalletBalence(res / LAMPORTS_PER_SOL);
        }
      }
    };
    fetchWalletBalence();
    const GetTxn = async () => {
      const res: any = await getRecentTxn(
        walletAddress,
        isMainnet ? "mainnet" : "devnet",
      );
    
      if (res) {
        setTxn(res);
      } else {
        toast.info("failed to fetch recent txn", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
        });
      }
    };
    GetTxn();
  }, [param, isMainnet,Blokchain,walletAddress]);
  //@ts-ignore
  const { secret } = useSecret();
  const handleSend = async () => {
    const toastId = toast.info("Transaction in progress...", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
    });
    try {
      const res = await sendSol(
        ReceiversAdd,
        parseFloat(Amount),
        walletAddress,
        secret,
        isMainnet ? "mainnet" : "devnet",
      );
    } catch (error) {
      toast.update(toastId, {
        render: "Transaction failed",

        autoClose: 2000,
      });
    }
    toast.success("Transaction successful", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setIsSendModalOpen(false);
    setReceiversAdd("");
    setAmount("");
  };

  return (<div>
    {walletAddress.startsWith("0x") ? (
      <div className="special-div">
       <div className="min-h-screen bg-gradient-to-b bg-white flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ethereum Wallet</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Ethereum Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="text-lg font-medium mb-2 sm:mb-0">{walletAddress}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyAddress} 
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Address
              </Button>
            </div>
          </CardContent>
        </Card>

        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            We are excited to announce that Send and Swap functionality for Ethereum will be launching soon!
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Send className="h-6 w-6 mr-2 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Send ETH</h3>
                  <p className="text-sm text-muted-foreground">Easily send Ethereum to any address</p>
                </div>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-6 w-6 mr-2 text-green-500" />
                <div>
                  <h3 className="font-semibold">Swap Tokens</h3>
                  <p className="text-sm text-muted-foreground">Exchange Ethereum for other ERC-20 tokens</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      </div>
      </div>
    ) : (
    <div className="min-h-screen  bg-white flex flex-col">
      <header className="bg-grey-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-grey-200 shadow-sm">
            Web3 Wallet
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="network-switch"
                checked={isMainnet}
                onCheckedChange={setIsMainnet}
                className={`relative inline-flex items-center h-6 rounded-full w-11
            ${isMainnet ? "bg-red-500" : "bg-blue-500"}
          `}
              >
                <span className="sr-only">Toggle network</span>
                <span
                  className={`transform transition ease-in-out duration-200 inline-block w-4 h-4 bg-white rounded-full 
              ${isMainnet ? "translate-x-6" : "translate-x-1"}
            `}
                />
              </Switch>
              <Label htmlFor="network-switch">
                {isMainnet ? "Mainnet" : "Devnet"}
              </Label>
            </div>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black">
                  {walletBalence}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Current Balance ({isMainnet ? "Mainnet" : "Devnet"})
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyAddress}
                className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center text-xl"
              >
                <span className="mr-2">{walletAddress}</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button
                className="flex flex-col items-center justify-center h-24"
                onClick={() => setIsSendModalOpen(true)}
              >
                <Send className="h-8 w-8 mb-2" />
                Send
              </Button>
              <Button className="flex flex-col items-center justify-center h-24">
                <Download className="h-8 w-8 mb-2" />
                Receive
              </Button>
              <Button className="flex flex-col items-center justify-center h-24">
                <RefreshCw className="h-8 w-8 mb-2" />
                Swap
              </Button>
              <Button className="flex flex-col items-center justify-center h-24">
                <CreditCard className="h-8 w-8 mb-2" />
                Buy
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {txn.map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.balanceDifferences[0] / LAMPORTS_PER_SOL > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.balanceDifferences[0] / LAMPORTS_PER_SOL > 0
                        ? "+"
                        : "-"}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">
                        {index % 2 === 0 ? "Received" : "Sent"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          transaction.blockTime * 1000,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {transaction.balanceDifferences
                      ? `${transaction.balanceDifferences[0] / LAMPORTS_PER_SOL} SOL`
                      : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
       
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-muted-foreground">
          © 2023 Web3 Wallet. All rights reserved.
        </div>
      </footer>
      <Dialog open={isSendModalOpen} onOpenChange={setIsSendModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send ETH</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient" className="text-right">
                To
              </Label>
              <input
                id="recipient"
                value={ReceiversAdd}
                onChange={(e: any) => setReceiversAdd(e.target.value)}
                placeholder="Recipient's address"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <input
                id="amount"
                value={Amount}
                onChange={(e: any) => setAmount(e.target.value)}
                placeholder="Amount in ETH"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSend}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>)}
    </div>
  );
}

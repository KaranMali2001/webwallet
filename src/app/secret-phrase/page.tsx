"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function SecretPhrase() {
  const [data, setData] = useState("");
  const [phrases, setPhrases] = useState<string[]>([]);
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const res = await axios.post("/api/mnemonic");
      

        if (res.status == 200) {
          const array: string[] = res.data.mnemonic.split(" ");
          setPhrases(array);
          setData(res.data.mnemonic);
        }
      } catch (error: any) {
        console.error("Error:", error);
      }
    };
    Fetchdata();
  }, []);
  const downloadMnemonic = () => {
    let mnemonicString;
  
    if (Array.isArray(data)) {
      // If data is an array, join it into a string
      mnemonicString = data.join(" ");
    } else if (typeof data === "object") {
      // If data is an object, stringify it
      // You might want to customize this based on your data structure
      mnemonicString = JSON.stringify(data, null, 2);
    } else {
      // If data is already a string, use it as is
      mnemonicString = data;
    }

    const element = document.createElement("a");
    const file = new Blob([mnemonicString], { type: "text/plain" });
  
    element.href = URL.createObjectURL(file);
    element.download = "mnemonic.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 ">
        <div className="bg-[#1E293B] rounded-lg shadow-lg w-full max-w-4xl">
          <header className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="container mx-auto flex items-center justify-between">
              <div className="text-3xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#38BDF8] to-[#6366F1] bg-clip-text text-transparent">
                  Secret Phrase
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={downloadMnemonic}
                  className="rounded-md bg-[#475569] px-4 py-2 text-sm font-medium text-white hover:bg-[#64748B]"
                >
                  Download
                </Button>
                <Button className="rounded-md bg-[#38BDF8] px-4 py-2 text-sm font-medium text-white hover:bg-[#0EA5E9]">
                  <Link href="/"> Next</Link>
                </Button>
              </div>
            </div>
          </header>
          <main className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="container mx-auto grid grid-cols-3 gap-4">
              {phrases.map((pharse, index) => (
                <div
                  key={index}
                  className={`flex h-24 items-center justify-center rounded-lg bg-[#475569] text-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#64748B] ${
                    showSecretPhrase && index === 4
                      ? "hover:bg-[#64748B]"
                      : "hover:bg-[#64748B] backdrop-blur-sm"
                  }`}
                >
                  {pharse}
                </div>
              ))}
            </div>
          </main>
          <div className="bg-[#1E293B] py-6 rounded-b-lg">
            <div className="container mx-auto flex items-center justify-center text-2xl font-bold"></div>
          </div>
        </div>
      </div>
    </>

    // <div className="w-full md:h-[80vh] h-[90vh] flex justify-center items-center">
    //   <div className="flex flex-col justify-center items-center">
    //     <p className="text-white text-4xl font-bold">Secret Phrases</p>
    //     <p className="text-white text-sm md:py-4 py-2">
    //       save these phrases somewhere safe
    //     </p>
    //     <div className="w-full bg-[#111111] rounded-lg p-10 md:mx-0 mx-4 grid md:grid-cols-4 grid-cols-2 md:gap-12 gap-8 cursor-pointer">
    //       {phrases.map((phrase, index) => (
    //         <p key={index} className="text-[#ffffff]">
    //           <span className="text-[#888] mr-3">{index + 1}</span> {phrase}
    //         </p>
    //       ))}
    //     </div>
    //     <Link
    //       href="/"
    //       className="text-white bg-blue-600 px-8 py-2 md:my-3 my-1 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
    //     >
    //       Next
    //     </Link>
    //     <button
    //       onClick={downloadMnemonic}
    //       className="text-white bg-blue-600 px-8 py-2 md:my-3 my-1 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
    //     >
    //       Download
    //     </button>
    //   </div>
    // </div>
  );
}

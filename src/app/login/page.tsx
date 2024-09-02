"use client";

import { FindUser } from "@/actions/findUser";

import { Button } from "@/components/ui/button";
import { useSecret } from "@/lib/secrateContextProvider";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [showDashBoard, setShowDashBoard] = useState(false);
  const [fileData, setFileData] = useState("");
  const [phrases, setPhrases] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handlePhraseChange = (index: number, newValue: string) => {
    const newPhrases = [...phrases];
    newPhrases[index] = newValue;
    setPhrases(newPhrases);
  };
  //@ts-ignore
  const { secretKeeper, secret } = useSecret();
  useEffect(() => {
  }, [secret]);

  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  async function handleFileUpload(formData: FormData) {
    const file = formData.get("file") as File;
    const buffer = await file.arrayBuffer();
 
    const data = Buffer.from(buffer).toString();

    setFileData(data);
    
    const array: string[] = data.split(" ");
    setPhrases((prevPhrases) => {
      const newPhrases = [...prevPhrases];
      for (let i = 0; i < array.length; i++) {
        newPhrases[i] = array[i];
      }

      return newPhrases;
    });
  }
  function handleButtonClick() {
    const GetUser = async (fileData: string) => {
      const res = await FindUser(fileData);
      if (res?.hashed_mnemonics != null) {
        secretKeeper(fileData);
        router.push("/dashboard");
      } else {
      toast.info('incorrect pharse')
        setShowDashBoard(false);
      }
    };


    GetUser(fileData);
  }

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
                <form action={handleFileUpload}>
                  <input
                    className="rounded-md bg-[#475569] px-4 py-2 text-sm font-medium text-white hover:bg-[#64748B]"
                    type="file"
                    accept=".txt"
                    name="file"
                  />
                  <Button
                    variant="outline"
                    className="rounded-md bg-[#475569] px-4 py-2 text-sm font-medium text-white hover:bg-[#64748B]"
                  >
                    Upload
                  </Button>
                </form>
                <Button
                  onClick={handleButtonClick}
                  className="rounded-md bg-[#38BDF8] px-4 py-2 text-sm font-medium text-white hover:bg-[#0EA5E9]"
                >
                  Login
                </Button>
              </div>
            </div>
          </header>
          <main className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="container mx-auto grid grid-cols-3 gap-4">
              {phrases.map((pharse, index) => (
                <p key={index}>
                  <input
                    key={index}
                    className={` h-24 items-center justify-center rounded-lg bg-[#475569] text-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#64748B] container mx-auto grid grid-cols-3 gap-4" ${
                      showSecretPhrase && index === 4
                        ? "hover:bg-[#64748B]"
                        : "hover:bg-[#64748B] backdrop-blur-sm"
                    }`}
                    value={pharse}
                    onChange={(e) => handlePhraseChange(index, e.target.value)}
                  />
                </p>
              ))}
            </div>
          </main>
          <div className="bg-[#1E293B] py-6 rounded-b-lg">
            <div className="container mx-auto flex items-center justify-center text-2xl font-bold"></div>
          </div>
        </div>
      </div>
      {/* <div className="w-full md:h-[80vh] h-[90vh] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            
            <div className="w-full bg-[#111111] rounded-lg p-10 md:mx-0 mx-4 grid md:grid-cols-4 grid-cols-2 md:gap-12 gap-8 cursor-pointer">
              {phrases.map((phrase, index) => (
                <p key={index} className="text-[#ffffff]">
                  <span className="text-[#888] mr-3">{index + 1}</span>
                  <input
                    value={phrase}
                    onChange={(e) => handlePhraseChange(index, e.target.value)}
                    className="bg-transparent bg-slate-400"
                  />
                </p>
              ))}
            </div>
            
            <form action={handleFileUpload}>
              <input
                className="text-white bg-blue-600 px-8 py-2 md:my-3 my-1 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
                type="file"
                accept=".txt"
                name="file"
              />
              <button className="text-white bg-blue-600 px-8 py-2 md:my-3 my-1 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out">
                upload File
              </button>
            </form>

            <button
              onClick={handleButtonClick}
              className="text-white bg-blue-600 px-8 py-2 md:my-3 my-1 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Login
            </button>
          </div>
        </div>
       */}
    </>
  );
}

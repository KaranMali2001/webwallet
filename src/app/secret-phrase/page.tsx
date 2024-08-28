"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Link from "next/link";
export default function SecretPhrase() {
  const [data, setData] = useState("");
  const [phrases, setPhrases] = useState<string[]>([]);

  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const res = await axios.post("/api/mnemonic");
console.log("phasrse",res.data.mnemonic)
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
  console.log("data is lund",data)
    if (Array.isArray(data)) {
      // If data is an array, join it into a string
      mnemonicString = data.join(' ');
    } else if (typeof data === 'object') {
      // If data is an object, stringify it
      // You might want to customize this based on your data structure
      mnemonicString = JSON.stringify(data, null, 2);
    } else {
      // If data is already a string, use it as is
      mnemonicString = data;
    }
  
    const element = document.createElement("a");
    const file = new Blob([mnemonicString], { type: "text/plain" });
    console.log("download file", file);
    element.href = URL.createObjectURL(file);
    element.download = "mnemonic.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };
  return (
    <div className="w-full md:h-[80vh] h-[90vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className="text-white text-4xl font-bold">Secret Phrases</p>
        <p className="text-white text-sm md:py-4 py-2">
          save these phrases somewhere safe
        </p>
        <div className="w-full bg-[#111111] rounded-lg p-10 md:mx-0 mx-4 grid md:grid-cols-4 grid-cols-2 md:gap-12 gap-8 cursor-pointer">
          {phrases.map((phrase, index) => (
            <p key={index} className="text-[#ffffff]">
              <span className="text-[#888] mr-3">{index + 1}</span> {phrase}
            </p>
          ))}
        </div>
        <Link
          href="/"
          className="text-white bg-blue-600 px-8 py-2 md:my-3 my-1 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Next
        </Link>
        <button
          onClick={downloadMnemonic}
          className="text-white bg-blue-600 px-8 py-2 md:my-3 my-1 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Download
        </button>
      </div>
    </div>
  );
}

"use client";

import { FindUser } from "@/actions/findUser";
import { DashboardComponent } from "@/components/dashboard";
import { useRouter } from "next/navigation";

import { useState } from "react";


export default function Login() {
  const router=useRouter()
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
        setShowDashBoard(true);
      } else {
        console.log("incorrect pharse");
        setShowDashBoard(false);
      }
      localStorage.setItem('pharse',fileData)
   
   router.push('/dashboard')
    };
    if(showDashBoard){
    
    }
    GetUser(fileData);
  }
  console.log("fileData before dashBoard", fileData);
  return (
    <>
       
        <div className="w-full md:h-[80vh] h-[90vh] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-white text-4xl font-bold">
              Enter Secret Phrases
            </p>
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
      
    </>
  );
}

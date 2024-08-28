'use client'

import { DashboardComponent } from "@/components/dashboard"
import { useSecret } from "@/lib/secrateContextProvider"
import { useEffect } from "react";


export default function (){
const { secretKeeper, secret } = useSecret();
  useEffect(() => {
   
  }, [secret]); 
console.log("secrate from dashboard",secret)
    if(secret!=null){
        return <>
        <DashboardComponent pharses={secret}/>
        </>
    }else{
        return <>
    
    There is something wrong with pharse data
        </>
    }
    
}
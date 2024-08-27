'use client'

import { DashboardComponent } from "@/components/dashboard"

export default function (){
const data=    localStorage.getItem('pharse')?.toString()
    if(typeof data==='string'){
        return <>
        <DashboardComponent pharses={data}/>
        </>
    }else{
        return <>
    
    There is something wrong with pharse data
        </>
    }
    
}
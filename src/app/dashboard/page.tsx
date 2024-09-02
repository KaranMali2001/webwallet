"use client";


import { DashboardComponentVercel } from "@/components/dashboardcomponent";
import { useSecret } from "@/lib/secrateContextProvider";
import { useEffect } from "react";

export default function Dashboard() {
  //@ts-ignore
  const { secretKeeper, secret } = useSecret();
  useEffect(() => {}, [secret]);

  
  if (secret != null) {
    return (
      <>
        <DashboardComponentVercel pharses={secret} />
      </>
    );
  } else {
    return <>There is something wrong with pharse data</>;
  }
}

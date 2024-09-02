import * as React from "react";

import { Web3LandingPage } from "@/components/web3landingpage";

export default function Home() {
  return (
    <>
      <Web3LandingPage />
    </>
  );
}
//docker psql db=docker run -e POSTGRES_PASSWORD=password -e POSTGRES_DB=Wallet -p 5432:5432 -v Wallet:/var/lib/postgresql/data -d postgres

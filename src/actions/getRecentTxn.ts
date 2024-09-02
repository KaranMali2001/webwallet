"use server";
import { Connection, PublicKey } from "@solana/web3.js";
import { json } from "stream/consumers";

export async function getRecentTxn(publicKey: string, network: string) {

  const txns = [];

  const connection =
    network === "devnet"
      ? new Connection(
          process.env.SOLANA_DEVNET_RPC ||
            "https://solana-devnet.g.alchemy.com/v2/MlxWssruPqy6Q4nHIKIcBZ6gqLfB-EaG",
          "confirmed",
        )
      : new Connection(
          process.env.SOLANA_MAINNET_RPC ||
            "https://solana-mainnet.g.alchemy.com/v2/MlxWssruPqy6Q4nHIKIcBZ6gqLfB-EaG",
          "confirmed",
        );
  


  const { blockhash } = await connection.getLatestBlockhash();
  
  try {
    const signatures = await connection.getSignaturesForAddress(
      new PublicKey(publicKey),
    );
  
    for (const sign of signatures) {
      //@ts-ignore
      const txn = await connection.getTransaction(sign.signature, json);
      if (txn) {
        // Process the transaction data (e.g., print it)
        txns.push(txn);
      } else {
        console.error(`Failed to fetch transaction for signature: ${sign}`);
      }
    }
  } catch (error: any) {
    return error;
  }
  const balanceDifferences = txns.map((txn) => {
    const preBalances = txn.meta?.preBalances;
    const postBalances = txn.meta?.postBalances;

    if (preBalances?.length !== postBalances?.length) {
      throw new Error("Mismatched preBalances and postBalances length");
    }

    const differences = preBalances?.map((preBalance, index) => {
      if (postBalances) return postBalances[index] - preBalance;
    });

    return {
      slot: txn.slot,
      blockTime: txn.blockTime,
      balanceDifferences: differences,
    };
  });
  
  return balanceDifferences;
}

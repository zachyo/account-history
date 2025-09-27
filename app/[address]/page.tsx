"use client";

import { StxBalance } from "@/components/stx-balance";
import { TransactionsList } from "@/components/txns-list";
import { useNetwork } from "@/contexts/network-context";
import {
  fetchAddressBalance,
  FetchAddressBalanceResponse,
} from "@/lib/fetch-address-balance";
import {
  fetchAddressTransactions,
  FetchAddressTransactionsResponse,
} from "@/lib/fetch-address-transactions";
import { ExternalLinkIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { exportTransactions } from "@/lib/export-utils";

export default function Activity({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const [address, setAddress] = useState<string | null>(null);
  const { network, getApiUrl } = useNetwork();
  const [transactions, setTransactions] =
    useState<FetchAddressTransactionsResponse | null>(null);
  const [balance, setBalance] = useState<FetchAddressBalanceResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    params.then((p) => setAddress(p.address));
  }, [params]);

  const handleExport = async (format: "json" | "csv") => {
    if (!address) return;
    setIsExporting(true);
    await exportTransactions(address, getApiUrl(), format);
    setIsExporting(false);
  };
console.log({address, transactions})
  useEffect(() => {
    if (!address) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const apiUrl = getApiUrl();
      try {
        console.log("Fetching transactions for address:", address);
        const txs = await fetchAddressTransactions({ address, apiUrl });
        console.log("Fetched transactions:", txs);
        setTransactions(txs);

        console.log("Fetching balance for address:", address);
        const bal = await fetchAddressBalance({ address, apiUrl });
        console.log("Fetched balance:", bal);
        setBalance(bal);
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, network, getApiUrl]);

  if (!address || loading) {
    return (
      <main className="flex flex-col items-center gap-8 p-8">
        <span className="text-lg">Loading account data...</span>
      </main>
    );
  }

  const explorerLink =
    network === "mainnet"
      ? `https://explorer.hiro.so/address/${address}`
      : `https://explorer.hiro.so/address/${address}?chain=testnet`;

  return (
    <main className="flex h-fit flex-col p-4 md:p-8 gap-8">
      <div className="flex items-center gap-4 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-bold break-all">{address}</h1>
        <Link
          href={explorerLink}
          target="_blank"
          className="rounded-lg flex gap-1 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          View on Hiro
        </Link>
        <button
          onClick={() => handleExport("csv")}
          disabled={isExporting}
          className="rounded-lg flex gap-1 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-500"
        >
          <DownloadIcon className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export CSV"}
        </button>
        <button
          onClick={() => handleExport("json")}
          disabled={isExporting}
          className="rounded-lg flex gap-1 bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-500"
        >
          <DownloadIcon className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export JSON"}
        </button>
      </div>

      {balance && (
        <StxBalance
          balance={balance.stx.balance}
          locked={balance.stx.locked}
        />
      )}

      {transactions && (
        <TransactionsList address={address} initialTransactions={transactions} />
      )}
    </main>
  );
}

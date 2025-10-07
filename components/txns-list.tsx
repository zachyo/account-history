
"use client";

import {
  fetchAddressTransactions,
  type FetchAddressTransactionsResponse,
} from "@/lib/fetch-address-transactions";
import { TransactionDetail } from "./txn-details";
import { useEffect, useState } from "react";
import { useNetwork } from "@/contexts/network-context";

interface TransactionsListProps {
  address: string;
  initialTransactions: FetchAddressTransactionsResponse;
}

export function TransactionsList({
  address,
  initialTransactions,
}: TransactionsListProps) {
  const [allTxns, setAllTxns] = useState(initialTransactions);
  const { getApiUrl } = useNetwork();

  useEffect(() => {
    setAllTxns(initialTransactions);
  }, [initialTransactions]);

  // Load another 20 txns
  async function loadMoreTxns() {
    const apiUrl = getApiUrl();
    // The new offset to fetch transaction is the offset we used
    // in the last request + the number of txns we fetched previously
    // e.g. if initially we fetched offset = 0 with limit = 20
    // the new offset would be 0 + 20 = 20 to fetch transactions
    // 20 to 40
    const newTxns = await fetchAddressTransactions({
      address,
      offset: allTxns.offset + allTxns.limit,
      apiUrl,
    });

    setAllTxns({
      ...newTxns,
      results: [...allTxns.results, ...newTxns.results],
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col border rounded-md divide-y border-gray-800 divide-gray-800">
        {allTxns.results.map((tx) => (
          <div key={tx.tx.tx_id}>
            <TransactionDetail result={tx} />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="px-4 py-2 rounded-lg w-fit border border-gray-800 mx-auto text-center hover:bg-gray-900 transition-all"
        onClick={loadMoreTxns}
      >
        Load More
      </button>
    </div>
  );
}
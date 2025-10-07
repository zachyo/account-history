import {
  fetchAddressTransactions,
  FetchAddressTransactionsResponse,
  Transaction,
} from "./fetch-address-transactions";

type ExportableTransaction = {
  tx_id: string;
  block_height: number;
  timestamp: string;
  amount: string;
  sender: string;
  recipient: string;
  type: Transaction["tx_type"];
};

async function fetchAllTransactions(
  address: string,
  apiUrl: string
): Promise<FetchAddressTransactionsResponse["results"]> {
  let allTransactions: FetchAddressTransactionsResponse["results"] = [];
  let offset = 0;
  const limit = 50;
  let total = 0;

  const initialResponse = await fetchAddressTransactions({
    address,
    apiUrl,
    offset: 0,
    limit,
  });
  total = initialResponse.total;
  allTransactions = initialResponse.results;
  offset = allTransactions.length;

  const promises = [];
  while (offset < total) {
    promises.push(
      fetchAddressTransactions({ address, apiUrl, offset, limit })
    );
    offset += limit;
  }

  const responses = await Promise.all(promises);
  responses.forEach((res) => allTransactions.push(...res.results));

  return allTransactions;
}

function toExportable(
  txResult: FetchAddressTransactionsResponse["results"][number]
): ExportableTransaction {
  const { tx } = txResult;
  let amount = "N/A";
  let recipient = "N/A";

  if (tx.tx_type === "token_transfer") {
    amount = tx.token_transfer.amount;
    recipient = tx.token_transfer.recipient_address;
  } else if (tx.tx_type === "contract_call") {
    recipient = tx.contract_call.contract_id;
  } else if (tx.tx_type === "smart_contract") {
    recipient = tx.smart_contract.contract_id;
  }

  return {
    tx_id: tx.tx_id,
    block_height: tx.block_height,
    timestamp: new Date(tx.block_time * 1000).toISOString(),
    amount,
    sender: tx.sender_address,
    recipient,
    type: tx.tx_type,
  };
}

function downloadFile(content: string, fileName: string, contentType: string) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

export async function exportTransactions(
  address: string,
  apiUrl: string,
  format: "json" | "csv"
) {
  try {
    const allTxns = await fetchAllTransactions(address, apiUrl);
    const exportableTxns = allTxns.map(toExportable);

    if (format === "json") {
      const jsonContent = JSON.stringify(exportableTxns, null, 2);
      downloadFile(
        jsonContent,
        `${address}_transactions.json`,
        "application/json"
      );
    } else if (format === "csv") {
      if (exportableTxns.length === 0) {
        alert("No transactions to export.");
        return;
      }
      const header = Object.keys(exportableTxns[0]).join(",");
      const rows = exportableTxns.map((tx) =>
        Object.values(tx)
          .map((val) => `"${String(val).replace(/"/g, '""')}"`) // Corrected escaping for double quotes within CSV values
          .join(",")
      );
      const csvContent = [header, ...rows].join("\n"); // Corrected newline character for CSV content
      downloadFile(csvContent, `${address}_transactions.csv`, "text/csv");
    }
  } catch (error) {
    console.error("Failed to export transactions:", error);
    alert("Failed to export transactions. Please try again later.");
  }
}

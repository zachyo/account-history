// Input to our function
interface FetchAddressBalanceArgs {
  address: string;
  apiUrl: string;
}

// Output from our function
export interface FetchAddressBalanceResponse {
  stx: {
    balance: string;
    total_sent: string;
    total_received: string;
    total_fees_sent: string;
    total_miner_rewards_received: string;
    lock_height: number;
    locked: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export async function fetchAddressBalance({
  address,
  apiUrl,
}: FetchAddressBalanceArgs): Promise<FetchAddressBalanceResponse> {
  const url = `${apiUrl}/extended/v1/address/${address}/balances`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address balance");
  }

  const data = await response.json();
  return data as FetchAddressBalanceResponse;
}

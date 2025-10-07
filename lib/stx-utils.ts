export function abbreviateAddress(address: string) {
  return `${address.substring(0, 5)}...${address.substring(36)}`;
}

export function abbreviateTxnId(txnId: string) {
  return `${txnId.substring(0, 5)}...${txnId.substring(62)}`;
}

export function microStxToStx(microStx: string) {
  return (Number(microStx) / 1_000_000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

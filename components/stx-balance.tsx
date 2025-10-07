import { microStxToStx } from "@/lib/stx-utils";

interface StxBalanceProps {
  balance: string;
  locked: string;
}

export function StxBalance({ balance, locked }: StxBalanceProps) {
  const total = BigInt(balance) + BigInt(locked);

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-800 p-4 w-full md:w-96">
      <h2 className="text-lg font-bold">STX Balance</h2>
      <div className="flex justify-between">
        <span>Total</span>
        <span className="font-mono">{microStxToStx(total.toString())} STX</span>
      </div>
      <div className="flex justify-between text-gray-400">
        <span>Available</span>
        <span className="font-mono">{microStxToStx(balance)} STX</span>
      </div>
      <div className="flex justify-between text-gray-400">
        <span>Locked</span>
        <span className="font-mono">{microStxToStx(locked)} STX</span>
      </div>
    </div>
  );
}

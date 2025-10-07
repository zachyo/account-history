"use client";

import { useNetwork } from "@/contexts/network-context";

export function NetworkToggle() {
  const { network, setNetwork } = useNetwork();

  return (
    <div className="flex items-center gap-2">
      <span
        className={`cursor-pointer ${
          network === "mainnet" ? "font-bold text-white" : "text-gray-400"
        }`}
        onClick={() => setNetwork("mainnet")}
      >
        Mainnet
      </span>
      <div
        className="w-10 h-5 bg-gray-600 rounded-full flex items-center cursor-pointer p-1"
        onClick={() => setNetwork(network === "mainnet" ? "testnet" : "mainnet")}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-transform ${
            network === "testnet" ? "translate-x-4" : ""
          }`}
        />
      </div>
      <span
        className={`cursor-pointer ${
          network === "testnet" ? "font-bold text-white" : "text-gray-400"
        }`}
        onClick={() => setNetwork("testnet")}
      >
        Testnet
      </span>
    </div>
  );
}

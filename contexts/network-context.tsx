"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Network = "mainnet" | "testnet";

interface NetworkContextType {
  network: Network;
  setNetwork: (network: Network) => void;
  getApiUrl: () => string;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [network, setNetwork] = useState<Network>("testnet");

  useEffect(() => {
    const storedNetwork = localStorage.getItem("stacks-network") as Network | null;
    if (storedNetwork) {
      setNetwork(storedNetwork);
    }
  }, []);

  const handleSetNetwork = (newNetwork: Network) => {
    setNetwork(newNetwork);
    localStorage.setItem("stacks-network", newNetwork);
    window.location.reload();
  };

  const getApiUrl = () => {
    return network === "mainnet"
      ? "https://api.hiro.so"
      : "https://api.testnet.hiro.so";
  };

  return (
    <NetworkContext.Provider value={{ network, setNetwork: handleSetNetwork, getApiUrl }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
}

import { useSearchParams } from "react-router-dom";

export function getNetwork(params: URLSearchParams) {
  return "testnet";
}

export function useNetwork(): { network: "mainnet" | "testnet" } {
  const [params] = useSearchParams();

  return {
    network: "testnet",
  };
}

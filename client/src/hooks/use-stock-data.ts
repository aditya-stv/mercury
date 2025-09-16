import { useQuery } from "@tanstack/react-query";
import type { Stock } from "../types";

export function useStocks() {
  return useQuery<Stock[]>({
    queryKey: ["/api/stocks"],
    staleTime: 30000, // 30 seconds
  });
}

export function useStock(symbol: string) {
  return useQuery<Stock>({
    queryKey: ["/api/stocks", symbol],
    enabled: !!symbol,
    staleTime: 30000,
  });
}

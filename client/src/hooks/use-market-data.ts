import { useQuery } from "@tanstack/react-query";
import type { MarketOverview, News } from "../types";

export function useMarketOverview() {
  return useQuery<MarketOverview>({
    queryKey: ["/api/market/overview"],
    staleTime: 60000, // 1 minute
  });
}

export function useNews(limit: number = 10) {
  return useQuery<News[]>({
    queryKey: ["/api/news"],
    staleTime: 300000, // 5 minutes
  });
}

export function useStockNews(stockId: string) {
  return useQuery<News[]>({
    queryKey: ["/api/news/stock", stockId],
    enabled: !!stockId,
    staleTime: 300000,
  });
}

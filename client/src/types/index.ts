export interface MarketOverview {
  indices: {
    nifty50: MarketIndex;
    sensex: MarketIndex;
    bankNifty: MarketIndex;
    nasdaq: MarketIndex;
  };
  sectorPerformance: SectorPerformance[];
  topMovers: Stock[];
}

export interface MarketIndex {
  value: number;
  change: number;
  changePercent: number;
}

export interface SectorPerformance {
  sector: string;
  changePercent: number;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  sentiment: number;
  sentimentLabel: "bullish" | "bearish" | "neutral";
  updatedAt: Date;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  source: string;
  sentiment: "bullish" | "bearish" | "neutral";
  stockIds: string[];
  publishedAt: Date;
  createdAt: Date;
}

export interface Alert {
  id: string;
  userId: string;
  stockId: string;
  type: "price" | "sentiment" | "volume" | "news";
  condition: "above" | "below" | "change";
  value: number;
  isActive: boolean;
  isTriggered: boolean;
  emailNotification: boolean;
  createdAt: Date;
  triggeredAt: Date | null;
  stock?: Stock;
}

export interface Watchlist {
  id: string;
  userId: string;
  stockId: string;
  addedAt: Date;
  stock: Stock;
}

export type InvestorType = "conservative" | "balanced" | "aggressive";
export type Interest = "fundamental" | "technical" | "pattern";

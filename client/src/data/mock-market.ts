import type { MarketOverview } from "../types";

export const mockMarketOverview: MarketOverview = {
  indices: {
    nifty50: {
      value: 1967425,
      change: 15632,
      changePercent: 80,
    },
    sensex: {
      value: 6642809,
      change: 38990,
      changePercent: 60,
    },
    bankNifty: {
      value: 4523875,
      change: -14225,
      changePercent: -30,
    },
    nasdaq: {
      value: 1597352,
      change: 18934,
      changePercent: 120,
    },
  },
  sectorPerformance: [
    { sector: "IT Services", changePercent: 240 },
    { sector: "Banking", changePercent: 120 },
    { sector: "Energy", changePercent: -180 },
    { sector: "Auto", changePercent: -50 },
    { sector: "Pharma", changePercent: 30 },
    { sector: "FMCG", changePercent: 80 },
    { sector: "Metals", changePercent: -120 },
    { sector: "Realty", changePercent: 10 },
  ],
  topMovers: [],
};

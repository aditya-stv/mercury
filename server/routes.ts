import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertStockSchema, insertWatchlistSchema, insertAlertSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Stock routes
  app.get("/api/stocks", async (req, res) => {
    try {
      const stocks = await storage.getAllStocks();
      res.json(stocks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stocks" });
    }
  });

  app.get("/api/stocks/:symbol", async (req, res) => {
    try {
      const stock = await storage.getStockBySymbol(req.params.symbol);
      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }
      res.json(stock);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stock" });
    }
  });

  // Market data route
  app.get("/api/market/overview", async (req, res) => {
    try {
      const stocks = await storage.getAllStocks();
      
      // Calculate market indices (mock data for demonstration)
      const indices = {
        nifty50: { value: 1967425, change: 15632, changePercent: 80 },
        sensex: { value: 6642809, change: 38990, changePercent: 60 },
        bankNifty: { value: 4523875, change: -14225, changePercent: -30 },
        nasdaq: { value: 1597352, change: 18934, changePercent: 120 }
      };

      // Get sector performance
      const sectors = stocks.reduce((acc, stock) => {
        if (!acc[stock.sector]) {
          acc[stock.sector] = { stocks: [], totalChange: 0 };
        }
        acc[stock.sector].stocks.push(stock);
        acc[stock.sector].totalChange += stock.changePercent;
        return acc;
      }, {} as Record<string, { stocks: any[], totalChange: number }>);

      const sectorPerformance = Object.entries(sectors).map(([sector, data]) => ({
        sector,
        changePercent: Math.round(data.totalChange / data.stocks.length)
      }));

      res.json({
        indices,
        sectorPerformance,
        topMovers: stocks
          .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
          .slice(0, 4)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market overview" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const news = await storage.getRecentNews(limit);
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/news/stock/:stockId", async (req, res) => {
    try {
      const news = await storage.getNewsForStock(req.params.stockId);
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stock news" });
    }
  });

  // User routes (simplified for demo)
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Watchlist routes
  app.get("/api/watchlist/:userId", async (req, res) => {
    try {
      const watchlist = await storage.getUserWatchlist(req.params.userId);
      res.json(watchlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchlist" });
    }
  });

  app.post("/api/watchlist", async (req, res) => {
    try {
      const validatedData = insertWatchlistSchema.parse(req.body);
      const watchlist = await storage.addToWatchlist(validatedData);
      res.status(201).json(watchlist);
    } catch (error) {
      res.status(400).json({ message: "Invalid watchlist data" });
    }
  });

  app.delete("/api/watchlist/:userId/:stockId", async (req, res) => {
    try {
      const success = await storage.removeFromWatchlist(req.params.userId, req.params.stockId);
      if (!success) {
        return res.status(404).json({ message: "Watchlist item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from watchlist" });
    }
  });

  // Alert routes
  app.get("/api/alerts/:userId", async (req, res) => {
    try {
      const alerts = await storage.getUserAlerts(req.params.userId);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const validatedData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(validatedData);
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ message: "Invalid alert data" });
    }
  });

  app.delete("/api/alerts/:id", async (req, res) => {
    try {
      const success = await storage.deleteAlert(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete alert" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

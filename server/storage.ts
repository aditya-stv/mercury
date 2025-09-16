import { type User, type InsertUser, type Stock, type InsertStock, type Watchlist, type InsertWatchlist, type Alert, type InsertAlert, type News, type InsertNews } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Stock operations
  getAllStocks(): Promise<Stock[]>;
  getStock(id: string): Promise<Stock | undefined>;
  getStockBySymbol(symbol: string): Promise<Stock | undefined>;
  createStock(stock: InsertStock): Promise<Stock>;
  updateStock(id: string, updates: Partial<InsertStock>): Promise<Stock | undefined>;

  // Watchlist operations
  getUserWatchlist(userId: string): Promise<(Watchlist & { stock: Stock })[]>;
  addToWatchlist(watchlist: InsertWatchlist): Promise<Watchlist>;
  removeFromWatchlist(userId: string, stockId: string): Promise<boolean>;

  // Alert operations
  getUserAlerts(userId: string): Promise<(Alert & { stock: Stock })[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: string, updates: Partial<Alert>): Promise<Alert | undefined>;
  deleteAlert(id: string): Promise<boolean>;

  // News operations
  getRecentNews(limit?: number): Promise<News[]>;
  getNewsForStock(stockId: string): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private stocks: Map<string, Stock>;
  private watchlists: Map<string, Watchlist>;
  private alerts: Map<string, Alert>;
  private news: Map<string, News>;

  constructor() {
    this.users = new Map();
    this.stocks = new Map();
    this.watchlists = new Map();
    this.alerts = new Map();
    this.news = new Map();
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with Indian stocks
    const mockStocks: InsertStock[] = [
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        sector: "IT Services",
        price: 384725, // ₹3,847.25
        change: 8850,
        changePercent: 235,
        marketCap: "₹14.2L Cr",
        volume: "2.3M",
        sentiment: 72,
        sentimentLabel: "bullish"
      },
      {
        symbol: "HDFCBANK",
        name: "HDFC Bank Limited",
        sector: "Banking",
        price: 158945,
        change: 2860,
        changePercent: 183,
        marketCap: "₹8.7L Cr",
        volume: "1.8M",
        sentiment: 68,
        sentimentLabel: "bullish"
      },
      {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        sector: "Energy",
        price: 265480,
        change: -1325,
        changePercent: -50,
        marketCap: "₹17.9L Cr",
        volume: "3.2M",
        sentiment: 35,
        sentimentLabel: "bearish"
      },
      {
        symbol: "INFY",
        name: "Infosys Limited",
        sector: "IT Services",
        price: 143290,
        change: 1945,
        changePercent: 138,
        marketCap: "₹6.1L Cr",
        volume: "1.5M",
        sentiment: 52,
        sentimentLabel: "neutral"
      },
      {
        symbol: "ICICIBANK",
        name: "ICICI Bank Limited",
        sector: "Banking",
        price: 124580,
        change: 890,
        changePercent: 72,
        marketCap: "₹8.9L Cr",
        volume: "2.1M",
        sentiment: 61,
        sentimentLabel: "bullish"
      }
    ];

    mockStocks.forEach(stock => {
      const id = randomUUID();
      this.stocks.set(id, { ...stock, id, updatedAt: new Date() });
    });

    // Initialize mock news
    const mockNews: InsertNews[] = [
      {
        title: "TCS Reports Strong Q3 Earnings",
        summary: "Revenue growth of 12% YoY with margin expansion. Management optimistic about FY24 outlook.",
        source: "Economic Times",
        sentiment: "bullish",
        stockIds: [Array.from(this.stocks.values()).find(s => s.symbol === "TCS")?.id || ""],
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        title: "RBI Maintains Repo Rate at 6.5%",
        summary: "Central bank cites inflation concerns but acknowledges growth momentum in the economy.",
        source: "Reuters",
        sentiment: "neutral",
        stockIds: [],
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
      }
    ];

    mockNews.forEach(newsItem => {
      const id = randomUUID();
      this.news.set(id, { ...newsItem, id, createdAt: new Date() });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      interests: Array.isArray(insertUser.interests) ? insertUser.interests : []
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllStocks(): Promise<Stock[]> {
    return Array.from(this.stocks.values());
  }

  async getStock(id: string): Promise<Stock | undefined> {
    return this.stocks.get(id);
  }

  async getStockBySymbol(symbol: string): Promise<Stock | undefined> {
    return Array.from(this.stocks.values()).find(stock => stock.symbol === symbol);
  }

  async createStock(stock: InsertStock): Promise<Stock> {
    const id = randomUUID();
    const newStock: Stock = { ...stock, id, updatedAt: new Date() };
    this.stocks.set(id, newStock);
    return newStock;
  }

  async updateStock(id: string, updates: Partial<InsertStock>): Promise<Stock | undefined> {
    const stock = this.stocks.get(id);
    if (!stock) return undefined;
    
    const updatedStock = { ...stock, ...updates, updatedAt: new Date() };
    this.stocks.set(id, updatedStock);
    return updatedStock;
  }

  async getUserWatchlist(userId: string): Promise<(Watchlist & { stock: Stock })[]> {
    const userWatchlists = Array.from(this.watchlists.values()).filter(w => w.userId === userId);
    return userWatchlists.map(watchlist => {
      const stock = this.stocks.get(watchlist.stockId);
      if (!stock) throw new Error(`Stock not found: ${watchlist.stockId}`);
      return { ...watchlist, stock };
    });
  }

  async addToWatchlist(watchlist: InsertWatchlist): Promise<Watchlist> {
    const id = randomUUID();
    const newWatchlist: Watchlist = { ...watchlist, id, addedAt: new Date() };
    this.watchlists.set(id, newWatchlist);
    return newWatchlist;
  }

  async removeFromWatchlist(userId: string, stockId: string): Promise<boolean> {
    const watchlist = Array.from(this.watchlists.entries()).find(
      ([, w]) => w.userId === userId && w.stockId === stockId
    );
    if (!watchlist) return false;
    
    this.watchlists.delete(watchlist[0]);
    return true;
  }

  async getUserAlerts(userId: string): Promise<(Alert & { stock: Stock })[]> {
    const userAlerts = Array.from(this.alerts.values()).filter(a => a.userId === userId);
    return userAlerts.map(alert => {
      const stock = this.stocks.get(alert.stockId);
      if (!stock) throw new Error(`Stock not found: ${alert.stockId}`);
      return { ...alert, stock };
    });
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const newAlert: Alert = { 
      ...alert, 
      id, 
      isTriggered: false,
      createdAt: new Date(),
      triggeredAt: null
    };
    this.alerts.set(id, newAlert);
    return newAlert;
  }

  async updateAlert(id: string, updates: Partial<Alert>): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert = { ...alert, ...updates };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  async deleteAlert(id: string): Promise<boolean> {
    return this.alerts.delete(id);
  }

  async getRecentNews(limit: number = 10): Promise<News[]> {
    return Array.from(this.news.values())
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  async getNewsForStock(stockId: string): Promise<News[]> {
    return Array.from(this.news.values()).filter(news => 
      Array.isArray(news.stockIds) && news.stockIds.includes(stockId)
    );
  }

  async createNews(news: InsertNews): Promise<News> {
    const id = randomUUID();
    const newNews: News = { ...news, id, createdAt: new Date() };
    this.news.set(id, newNews);
    return newNews;
  }
}

export const storage = new MemStorage();

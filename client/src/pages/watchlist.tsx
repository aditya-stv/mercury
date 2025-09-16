import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Grid, List, Bell, ExternalLink, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SentimentIndicator } from "@/components/ui/sentiment-indicator";
import { useStocks } from "@/hooks/use-stock-data";

export default function Watchlist() {
  const [, setLocation] = useLocation();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filter, setFilter] = useState<"all" | "bullish" | "bearish">("all");
  
  const { data: stocks, isLoading } = useStocks();

  const filteredStocks = stocks?.filter(stock => {
    if (filter === "all") return true;
    return stock.sentimentLabel === filter;
  }) || [];

  const formatPrice = (price: number) => (price / 100).toFixed(2);
  const formatChange = (change: number) => (change / 100).toFixed(2);
  const formatChangePercent = (changePercent: number) => (changePercent / 100).toFixed(2);

  const getStockIcon = (symbol: string) => {
    const colors = {
      TCS: "bg-blue-500/20 text-blue-400",
      HDFCBANK: "bg-green-500/20 text-green-400",
      RELIANCE: "bg-purple-500/20 text-purple-400",
      INFY: "bg-orange-500/20 text-orange-400",
      ICICIBANK: "bg-indigo-500/20 text-indigo-400",
    };
    return colors[symbol as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-muted rounded" />
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8" data-testid="watchlist">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="watchlist-title">
              Watchlist
            </h1>
            <p className="text-muted-foreground">
              Track your favorite stocks with real-time sentiment analysis
            </p>
          </div>
          <Button data-testid="add-stock-button">
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>

        {/* Watchlist Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Stocks</CardTitle>
              <div className="flex items-center space-x-4">
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-32" data-testid="filter-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stocks</SelectItem>
                    <SelectItem value="bullish">Bullish Only</SelectItem>
                    <SelectItem value="bearish">Bearish Only</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    data-testid="grid-view-button"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    data-testid="list-view-button"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {viewMode === "list" ? (
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="watchlist-table">
                  <thead className="bg-muted/20">
                    <tr>
                      <th className="text-left p-4 font-medium text-muted-foreground">Stock</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Change</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Sentiment</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Volume</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Market Cap</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredStocks.map((stock) => (
                      <tr
                        key={stock.id}
                        className="hover:bg-muted/20 transition-colors"
                        data-testid={`watchlist-row-${stock.symbol}`}
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStockIcon(stock.symbol)}`}>
                              <span className="text-sm font-bold">{stock.symbol.slice(0, 3)}</span>
                            </div>
                            <div>
                              <div className="font-medium">{stock.name}</div>
                              <div className="text-sm text-muted-foreground">{stock.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">₹{formatPrice(stock.price)}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-1">
                            <span className={`font-medium ${stock.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                              {stock.change >= 0 ? "+" : ""}{formatChange(stock.change)}
                            </span>
                            <span className={stock.change >= 0 ? "text-bullish" : "text-bearish"}>
                              ({stock.change >= 0 ? "+" : ""}{formatChangePercent(stock.changePercent)}%)
                            </span>
                            {stock.change >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-bullish" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-bearish" />
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <SentimentIndicator
                            sentiment={stock.sentiment}
                            label={stock.sentimentLabel}
                            size="sm"
                          />
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{stock.volume}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{stock.marketCap}</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8"
                              data-testid={`alert-button-${stock.symbol}`}
                            >
                              <Bell className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => setLocation(`/stock/${stock.symbol}`)}
                              data-testid={`view-button-${stock.symbol}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-muted-foreground hover:text-destructive"
                              data-testid={`remove-button-${stock.symbol}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6" data-testid="watchlist-grid">
                {filteredStocks.map((stock) => (
                  <Card
                    key={stock.id}
                    className="cursor-pointer hover:shadow-md transition-all"
                    onClick={() => setLocation(`/stock/${stock.symbol}`)}
                    data-testid={`watchlist-card-${stock.symbol}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStockIcon(stock.symbol)}`}>
                            <span className="text-sm font-bold">{stock.symbol.slice(0, 3)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-muted-foreground">{stock.sector}</div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle remove from watchlist
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">₹{formatPrice(stock.price)}</span>
                          <SentimentIndicator
                            sentiment={stock.sentiment}
                            label={stock.sentimentLabel}
                            size="sm"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center space-x-1 ${stock.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                            <span className="font-medium">
                              {stock.change >= 0 ? "+" : ""}{formatChange(stock.change)}
                            </span>
                            <span>
                              ({stock.change >= 0 ? "+" : ""}{formatChangePercent(stock.changePercent)}%)
                            </span>
                            {stock.change >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{stock.volume}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Portfolio Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card data-testid="portfolio-performance">
            <CardHeader>
              <CardTitle className="text-base">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-bullish mb-2">+4.2%</div>
              <div className="text-sm text-muted-foreground">
                Overall sentiment-based performance
              </div>
            </CardContent>
          </Card>
          
          <Card data-testid="bullish-stocks">
            <CardHeader>
              <CardTitle className="text-base">Bullish Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {filteredStocks.filter(s => s.sentimentLabel === "bullish").length}/{filteredStocks.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Stocks with positive sentiment
              </div>
            </CardContent>
          </Card>
          
          <Card data-testid="alert-triggers">
            <CardHeader>
              <CardTitle className="text-base">Alert Triggers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400 mb-2">2</div>
              <div className="text-sm text-muted-foreground">
                Active alerts waiting
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

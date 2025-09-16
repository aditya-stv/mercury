import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Bell, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SentimentIndicator } from "@/components/ui/sentiment-indicator";
import { PriceChart } from "@/components/charts/price-chart";
import { SentimentChart } from "@/components/charts/sentiment-chart";
import { useStock } from "@/hooks/use-stock-data";
import { useStockNews } from "@/hooks/use-market-data";

export default function StockDetail() {
  const [location] = useLocation();
  const symbol = location.split("/").pop() || "";
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "1Y" | "5Y">("1D");

  const { data: stock, isLoading } = useStock(symbol);
  const { data: news } = useStockNews(stock?.id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-muted rounded-lg" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-96 bg-muted rounded-lg" />
                <div className="h-48 bg-muted rounded-lg" />
              </div>
              <div className="space-y-8">
                <div className="h-48 bg-muted rounded-lg" />
                <div className="h-32 bg-muted rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Stock Not Found</h1>
              <p className="text-muted-foreground">
                The stock symbol "{symbol}" was not found.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/30" data-testid="stock-detail">
      <div className="max-w-7xl mx-auto">
        {/* Stock Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getStockIcon(stock.symbol)}`}>
                  <span className="text-xl font-bold">{stock.symbol.slice(0, 3)}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold" data-testid={`stock-name-${stock.symbol}`}>
                    {stock.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <span data-testid={`stock-exchange-${stock.symbol}`}>NSE: {stock.symbol}</span>
                    <span>•</span>
                    <span data-testid={`stock-sector-${stock.symbol}`}>{stock.sector}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Button variant="outline" size="icon" data-testid="add-to-watchlist-button">
                  <Plus className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" data-testid="create-alert-button">
                  <Bell className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold" data-testid={`stock-price-${stock.symbol}`}>
                  ₹{formatPrice(stock.price)}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`font-medium ${stock.change >= 0 ? "text-bullish" : "text-bearish"}`}
                    data-testid={`stock-change-${stock.symbol}`}
                  >
                    {stock.change >= 0 ? "+" : ""}{formatChange(stock.change)} ({stock.change >= 0 ? "+" : ""}{formatChangePercent(stock.changePercent)}%)
                  </span>
                  <TrendingUp className={`w-4 h-4 ${stock.change >= 0 ? "text-bullish" : "text-bearish"}`} />
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Day Range</div>
                <div className="font-medium">₹3,758 - ₹3,865</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">52W Range</div>
                <div className="font-medium">₹2,890 - ₹4,125</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Market Cap</div>
                <div className="font-medium" data-testid={`stock-marketcap-${stock.symbol}`}>
                  {stock.marketCap}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Price Chart</CardTitle>
                  <div className="flex space-x-2">
                    {(["1D", "1W", "1M", "1Y", "5Y"] as const).map((period) => (
                      <button
                        key={period}
                        className={`px-3 py-1 text-sm rounded ${
                          timeframe === period
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => setTimeframe(period)}
                        data-testid={`timeframe-${period}`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PriceChart data={[]} timeframe={timeframe} />
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="financial-summary">
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">P/E Ratio</div>
                    <div className="text-xl font-bold">27.5</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">EPS</div>
                    <div className="text-xl font-bold">₹139.8</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">ROE</div>
                    <div className="text-xl font-bold text-bullish">46.2%</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">D/E Ratio</div>
                    <div className="text-xl font-bold">0.05</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Revenue Growth</div>
                    <div className="text-xl font-bold text-bullish">12.4%</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">P/B Ratio</div>
                    <div className="text-xl font-bold">12.7</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Debt</div>
                    <div className="text-xl font-bold">₹2,890 Cr</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-sm text-muted-foreground">Dividend Yield</div>
                    <div className="text-xl font-bold">2.1%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Sentiment Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Overall Sentiment */}
                <div className="text-center mb-6" data-testid="sentiment-analysis">
                  <div className="w-24 h-24 mx-auto bg-bullish/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-bullish">{stock.sentiment}</span>
                  </div>
                  <SentimentIndicator
                    sentiment={stock.sentiment}
                    label={stock.sentimentLabel}
                    size="lg"
                    showScore={false}
                  />
                  <div className="text-sm text-muted-foreground mt-2">High confidence</div>
                </div>

                {/* Source Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Source Breakdown</h3>
                  <div className="space-y-3" data-testid="sentiment-sources">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">News Media</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div className="w-12 h-2 bg-bullish rounded-full" />
                        </div>
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Social Media</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div className="w-8 h-2 bg-neutral rounded-full" />
                        </div>
                        <span className="text-sm text-muted-foreground">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Forums</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div className="w-6 h-2 bg-purple-400 rounded-full" />
                        </div>
                        <span className="text-sm text-muted-foreground">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Trend (7D)</CardTitle>
              </CardHeader>
              <CardContent>
                <SentimentChart data={[]} />
              </CardContent>
            </Card>

            {/* Recent News */}
            <Card>
              <CardHeader>
                <CardTitle>Recent News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="stock-news">
                  {news && news.length > 0 ? (
                    news.map((article) => (
                      <div key={article.id} className="pb-4 border-b border-border last:border-b-0">
                        <div className="flex items-start space-x-2 mb-2">
                          <Badge
                            variant={
                              article.sentiment === "bullish" ? "default" :
                              article.sentiment === "bearish" ? "destructive" : "secondary"
                            }
                            className="text-xs"
                          >
                            {article.sentiment}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="font-medium text-sm mb-2">{article.title}</div>
                        <div className="text-xs text-muted-foreground">{article.summary}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No recent news available for this stock.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Alert Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Set Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="alert-settings">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Alert</label>
                    <div className="flex space-x-2">
                      <Input type="number" placeholder="Price" className="flex-1" />
                      <Select>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Above" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="above">Above</SelectItem>
                          <SelectItem value="below">Below</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sentiment Alert</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-bullish">Sentiment {'>'} 80 (Very Bullish)</SelectItem>
                        <SelectItem value="very-bearish">Sentiment {'<'} 20 (Very Bearish)</SelectItem>
                        <SelectItem value="change">Sentiment Change {'>'} 20%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" data-testid="create-alert-submit">
                    Create Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

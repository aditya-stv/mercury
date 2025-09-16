import { TrendingUp, TrendingDown, Eye, Calendar, AlertTriangle, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StockCard } from "@/components/ui/stock-card";
import { SectorHeatmap } from "@/components/charts/sector-heatmap";
import { useMarketOverview, useNews } from "@/hooks/use-market-data";
import { useStocks } from "@/hooks/use-stock-data";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { data: marketData, isLoading: marketLoading } = useMarketOverview();
  const { data: stocks, isLoading: stocksLoading } = useStocks();
  const { data: news, isLoading: newsLoading } = useNews(5);

  if (marketLoading || stocksLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => (price / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const formatChange = (change: number) => (change / 100).toFixed(2);
  const formatChangePercent = (changePercent: number) => (changePercent / 100).toFixed(1);

  const indices = marketData?.indices;
  const sectorPerformance = marketData?.sectorPerformance || [];

  // Get top sentiment movers
  const sentimentMovers = stocks?.slice(0, 4) || [];

  return (
    <div className="p-4 md:p-8" data-testid="dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="dashboard-title">
            Market Dashboard
          </h1>
          <p className="text-muted-foreground">
            Live market sentiment and trending opportunities
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {indices && (
            <>
              <Card data-testid="index-nifty50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">NIFTY 50</span>
                    <Badge variant={indices.nifty50.change >= 0 ? "default" : "destructive"} className="text-xs">
                      {indices.nifty50.change >= 0 ? "+" : ""}{formatChangePercent(indices.nifty50.changePercent)}%
                    </Badge>
                  </div>
                  <div className="text-xl font-semibold">{formatPrice(indices.nifty50.value)}</div>
                  <div className={`text-sm ${indices.nifty50.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                    {indices.nifty50.change >= 0 ? "+" : ""}{formatChange(indices.nifty50.change)}
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="index-sensex">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">SENSEX</span>
                    <Badge variant={indices.sensex.change >= 0 ? "default" : "destructive"} className="text-xs">
                      {indices.sensex.change >= 0 ? "+" : ""}{formatChangePercent(indices.sensex.changePercent)}%
                    </Badge>
                  </div>
                  <div className="text-xl font-semibold">{formatPrice(indices.sensex.value)}</div>
                  <div className={`text-sm ${indices.sensex.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                    {indices.sensex.change >= 0 ? "+" : ""}{formatChange(indices.sensex.change)}
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="index-banknifty">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">BANK NIFTY</span>
                    <Badge variant={indices.bankNifty.change >= 0 ? "default" : "destructive"} className="text-xs">
                      {indices.bankNifty.change >= 0 ? "+" : ""}{formatChangePercent(indices.bankNifty.changePercent)}%
                    </Badge>
                  </div>
                  <div className="text-xl font-semibold">{formatPrice(indices.bankNifty.value)}</div>
                  <div className={`text-sm ${indices.bankNifty.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                    {indices.bankNifty.change >= 0 ? "+" : ""}{formatChange(indices.bankNifty.change)}
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="index-nasdaq">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">NASDAQ</span>
                    <Badge variant={indices.nasdaq.change >= 0 ? "default" : "destructive"} className="text-xs">
                      {indices.nasdaq.change >= 0 ? "+" : ""}{formatChangePercent(indices.nasdaq.changePercent)}%
                    </Badge>
                  </div>
                  <div className="text-xl font-semibold">{formatPrice(indices.nasdaq.value)}</div>
                  <div className={`text-sm ${indices.nasdaq.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                    {indices.nasdaq.change >= 0 ? "+" : ""}{formatChange(indices.nasdaq.change)}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Sentiment Movers */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle data-testid="sentiment-movers-title">Top Sentiment Movers</CardTitle>
                  <span className="text-sm text-muted-foreground">Last 24h</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4" data-testid="sentiment-movers-grid">
                  {sentimentMovers.map((stock) => (
                    <StockCard
                      key={stock.id}
                      stock={stock}
                      onClick={() => setLocation(`/stock/${stock.symbol}`)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sector Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="sector-performance-title">Sector Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <SectorHeatmap data={sectorPerformance} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* AI Daily Signals */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="ai-signals-title">AI Daily Signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-bullish/10 border border-bullish/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-bullish mt-0.5" />
                    <div>
                      <div className="font-medium text-bullish">Bullish Signal</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        TCS showing strong momentum after Q3 results beat. Consider entry at current levels.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-bearish/10 border border-bearish/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingDown className="w-5 h-5 text-bearish mt-0.5" />
                    <div>
                      <div className="font-medium text-bearish">Bearish Signal</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        TSLA appears overbought based on RSI and sentiment analysis. Consider profit booking.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neutral/10 border border-neutral/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-neutral mt-0.5" />
                    <div>
                      <div className="font-medium text-neutral">Watch List</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        3 stocks to watch today: HDFC Bank, Wipro, and Asian Paints showing unusual activity.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending News */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="trending-news-title">Trending News</CardTitle>
              </CardHeader>
              <CardContent>
                {newsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4" data-testid="news-list">
                    {news?.map((article) => (
                      <div
                        key={article.id}
                        className="pb-4 border-b border-border last:border-b-0"
                        data-testid={`news-item-${article.id}`}
                      >
                        <div className="font-medium mb-2">{article.title}</div>
                        <div className="text-sm text-muted-foreground">{article.summary}</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {new Date(article.publishedAt).toLocaleString()} • {article.source}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Watchlist */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle data-testid="watchlist-preview-title">Watchlist Preview</CardTitle>
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 text-sm p-0"
                    onClick={() => setLocation("/watchlist")}
                    data-testid="view-all-watchlist-button"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3" data-testid="watchlist-preview">
                  {sentimentMovers.slice(0, 3).map((stock) => (
                    <div
                      key={stock.id}
                      className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded p-2 -m-2"
                      onClick={() => setLocation(`/stock/${stock.symbol}`)}
                      data-testid={`watchlist-preview-${stock.symbol}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {stock.symbol.slice(0, 3)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{stock.symbol}</div>
                          <div className={`text-xs ${
                            stock.sentimentLabel === "bullish" ? "text-bullish" :
                            stock.sentimentLabel === "bearish" ? "text-bearish" : "text-neutral"
                          }`}>
                            {stock.sentimentLabel}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ₹{formatPrice(stock.price)}
                        </div>
                        <div className={`text-xs ${stock.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                          {stock.change >= 0 ? "+" : ""}{formatChangePercent(stock.changePercent)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

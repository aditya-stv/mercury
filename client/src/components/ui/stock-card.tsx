import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SentimentIndicator } from "./sentiment-indicator";
import type { Stock } from "../../types";

interface StockCardProps {
  stock: Stock;
  onClick?: () => void;
  showSentiment?: boolean;
}

export function StockCard({ stock, onClick, showSentiment = true }: StockCardProps) {
  const isPositive = stock.change >= 0;
  const price = (stock.price / 100).toFixed(2);
  const change = (stock.change / 100).toFixed(2);
  const changePercent = (stock.changePercent / 100).toFixed(2);

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
    <Card
      className={`transition-all hover:shadow-md ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      data-testid={`stock-card-${stock.symbol}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStockIcon(stock.symbol)}`}>
            <span className="text-sm font-bold">{stock.symbol.slice(0, 3)}</span>
          </div>
          
          <div className="flex-1">
            <div className="font-medium" data-testid={`stock-name-${stock.symbol}`}>
              {stock.name}
            </div>
            <div className="text-sm text-muted-foreground" data-testid={`stock-price-${stock.symbol}`}>
              ₹{price}
            </div>
          </div>
          
          <div className="text-right">
            {showSentiment && (
              <div className="mb-1">
                <SentimentIndicator
                  sentiment={stock.sentiment}
                  label={stock.sentimentLabel}
                  size="sm"
                />
              </div>
            )}
            
            <div className={`flex items-center space-x-1 ${isPositive ? "text-bullish" : "text-bearish"}`}>
              <span className="text-sm font-medium" data-testid={`stock-change-${stock.symbol}`}>
                {isPositive ? "+" : ""}{change}
              </span>
              <span className="text-sm" data-testid={`stock-change-percent-${stock.symbol}`}>
                ({isPositive ? "+" : ""}{changePercent}%)
              </span>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

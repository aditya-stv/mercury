import { cn } from "@/lib/utils";

interface SentimentIndicatorProps {
  sentiment: number;
  label: "bullish" | "bearish" | "neutral";
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
}

export function SentimentIndicator({
  sentiment,
  label,
  size = "md",
  showScore = true,
}: SentimentIndicatorProps) {
  const getSentimentColor = (label: string) => {
    switch (label) {
      case "bullish":
        return "bg-bullish/10 text-bullish border-bullish/20";
      case "bearish":
        return "bg-bearish/10 text-bearish border-bearish/20";
      default:
        return "bg-neutral/10 text-neutral border-neutral/20";
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs";
      case "lg":
        return "px-4 py-2 text-base";
      default:
        return "px-3 py-1 text-sm";
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={cn(
          "rounded-full font-medium border capitalize",
          getSentimentColor(label),
          getSizeClasses(size)
        )}
        data-testid={`sentiment-label-${label}`}
      >
        {label}
      </span>
      {showScore && (
        <span
          className="text-sm text-muted-foreground"
          data-testid={`sentiment-score-${sentiment}`}
        >
          {sentiment}
        </span>
      )}
    </div>
  );
}

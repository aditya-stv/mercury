import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceChartProps {
  data: Array<{
    time: string;
    price: number;
  }>;
  timeframe: "1D" | "1W" | "1M" | "1Y" | "5Y";
}

export function PriceChart({ data, timeframe }: PriceChartProps) {
  // Generate mock data since we don't have historical data
  const generateMockData = () => {
    const points = timeframe === "1D" ? 24 : timeframe === "1W" ? 7 : 30;
    const basePrice = 3847.25;
    
    return Array.from({ length: points }, (_, i) => {
      const variation = (Math.random() - 0.5) * 100;
      return {
        time: timeframe === "1D" ? `${i}:00` : `Day ${i + 1}`,
        price: basePrice + variation,
      };
    });
  };

  const chartData = data.length > 0 ? data : generateMockData();
  const isPositive = chartData[chartData.length - 1]?.price > chartData[0]?.price;

  return (
    <div className="w-full h-80" data-testid="price-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={['dataMin - 50', 'dataMax + 50']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "hsl(var(--bullish))" : "hsl(var(--bearish))"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: isPositive ? "hsl(var(--bullish))" : "hsl(var(--bearish))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

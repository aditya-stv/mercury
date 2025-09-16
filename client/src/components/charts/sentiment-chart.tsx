import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { themeColors } from "@/utils/colors";

interface SentimentChartProps {
  data: Array<{
    date: string;
    sentiment: number;
  }>;
}

export function SentimentChart({ data }: SentimentChartProps) {
  // Generate mock sentiment data for the last 7 days
  const generateMockData = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        sentiment: Math.floor(Math.random() * 40) + 50, // 50-90 range
      };
    });
  };

  const chartData = data.length > 0 ? data : generateMockData();

  return (
    <div className="w-full h-40" data-testid="sentiment-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={themeColors.border} />
          <XAxis
            dataKey="date"
            stroke={themeColors.mutedForeground}
            fontSize={12}
          />
          <YAxis
            stroke={themeColors.mutedForeground}
            fontSize={12}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: themeColors.card,
              border: `1px solid ${themeColors.border}`,
              borderRadius: "6px",
            }}
            labelStyle={{ color: themeColors.foreground }}
          />
          <Area
            type="monotone"
            dataKey="sentiment"
            stroke={themeColors.primary}
            fill={themeColors.primary}
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

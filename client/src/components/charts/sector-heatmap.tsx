import type { SectorPerformance } from "../../types";

interface SectorHeatmapProps {
  data: SectorPerformance[];
}

export function SectorHeatmap({ data }: SectorHeatmapProps) {
  const getSectorColor = (changePercent: number) => {
    if (changePercent > 150) return "bg-bullish/20 text-bullish";
    if (changePercent > 50) return "bg-bullish/10 text-bullish";
    if (changePercent > -50) return "bg-neutral/10 text-neutral";
    if (changePercent > -150) return "bg-bearish/10 text-bearish";
    return "bg-bearish/20 text-bearish";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="sector-heatmap">
      {data.map((sector) => {
        const changePercent = (sector.changePercent / 100).toFixed(1);
        return (
          <div
            key={sector.sector}
            className={`p-4 rounded-lg text-center transition-colors ${getSectorColor(sector.changePercent)}`}
            data-testid={`sector-${sector.sector.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="text-sm font-medium">{sector.sector}</div>
            <div className="text-lg font-bold">
              {sector.changePercent > 0 ? "+" : ""}{changePercent}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

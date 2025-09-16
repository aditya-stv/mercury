import { useState } from "react";
import { TrendingUp, TrendingDown, Eye, Calendar, AlertTriangle, Volume2, X, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useStocks } from "@/hooks/use-stock-data";

interface MockAlert {
  id: string;
  type: "price" | "sentiment" | "volume" | "news" | "earnings";
  title: string;
  message: string;
  time: string;
  isPositive: boolean;
  actionText?: string;
  additionalInfo?: string;
}

// Mock alerts data based on design reference
const mockAlerts: MockAlert[] = [
  {
    id: "1",
    type: "sentiment",
    title: "HDFC Bank Sentiment Alert",
    message: "HDFC Bank sentiment jumped 30% after earnings beat expectations. Stock price up 2.1% in response.",
    time: "2 hours ago",
    isPositive: true,
    actionText: "View Stock",
    additionalInfo: "Price: ₹1,589.45 (+1.83%)"
  },
  {
    id: "2",
    type: "price",
    title: "TCS Price Alert",
    message: "TCS stock price crossed your target of ₹3,800. Current price: ₹3,847.25",
    time: "4 hours ago",
    isPositive: false,
    actionText: "View Stock",
    additionalInfo: "Triggered: Above ₹3,800"
  },
  {
    id: "3",
    type: "earnings",
    title: "Earnings Calendar",
    message: "Earnings announcement tomorrow: ICICI Bank, State Bank of India, and L&T scheduled to report Q3 results.",
    time: "8 hours ago",
    isPositive: false,
    actionText: "View Calendar",
    additionalInfo: "Tomorrow 9:30 AM"
  },
  {
    id: "4",
    type: "news",
    title: "Goldman Sachs Downgrade",
    message: "TCS downgraded by Goldman Sachs from 'Buy' to 'Hold' citing valuation concerns and margin pressure.",
    time: "1 day ago",
    isPositive: false,
    actionText: "Read More",
    additionalInfo: "Source: Goldman Sachs"
  },
  {
    id: "5",
    type: "volume",
    title: "Volume Spike Alert",
    message: "Reliance Industries volume 250% above average. Unusual activity detected in the last hour.",
    time: "1 day ago",
    isPositive: false,
    actionText: "Analyze",
    additionalInfo: "Volume: 8.2M (Avg: 3.3M)"
  }
];

const mockActiveAlerts = [
  { id: "1", title: "TCS Price", condition: "Above ₹4,000" },
  { id: "2", title: "HDFC Sentiment", condition: "Change > 25%" },
  { id: "3", title: "Reliance Volume", condition: "200% above avg" }
];

export default function Alerts() {
  const [activeTab, setActiveTab] = useState<"all" | "price" | "sentiment" | "news">("all");
  const [visibleAlerts, setVisibleAlerts] = useState<string[]>(mockAlerts.map(a => a.id));
  const [newAlertSymbol, setNewAlertSymbol] = useState("");
  const [newAlertType, setNewAlertType] = useState("price");
  const [newAlertCondition, setNewAlertCondition] = useState("above");
  const [newAlertValue, setNewAlertValue] = useState("");
  const [emailNotification, setEmailNotification] = useState(false);

  const { data: stocks } = useStocks();

  const getAlertIcon = (type: string, isPositive: boolean) => {
    switch (type) {
      case "sentiment":
        return isPositive ? TrendingUp : TrendingDown;
      case "price":
        return isPositive ? TrendingUp : TrendingDown;
      case "earnings":
        return Calendar;
      case "news":
        return AlertTriangle;
      case "volume":
        return Volume2;
      default:
        return AlertTriangle;
    }
  };

  const getAlertColor = (type: string, isPositive: boolean) => {
    switch (type) {
      case "sentiment":
        return isPositive ? "border-bullish/20 bg-bullish/10" : "border-bearish/20 bg-bearish/10";
      case "price":
        return isPositive ? "border-bullish/20 bg-bullish/10" : "border-bearish/20 bg-bearish/10";
      case "earnings":
        return "border-neutral/20 bg-neutral/10";
      case "news":
        return "border-yellow-500/20 bg-yellow-500/10";
      case "volume":
        return "border-purple-500/20 bg-purple-500/10";
      default:
        return "border-muted bg-muted/10";
    }
  };

  const getIconColor = (type: string, isPositive: boolean) => {
    switch (type) {
      case "sentiment":
        return isPositive ? "text-bullish" : "text-bearish";
      case "price":
        return isPositive ? "text-bullish" : "text-bearish";
      case "earnings":
        return "text-neutral";
      case "news":
        return "text-yellow-400";
      case "volume":
        return "text-purple-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getTitleColor = (type: string, isPositive: boolean) => {
    switch (type) {
      case "sentiment":
        return isPositive ? "text-bullish" : "text-bearish";
      case "price":
        return isPositive ? "text-bullish" : "text-bearish";
      case "earnings":
        return "text-neutral";
      case "news":
        return "text-yellow-400";
      case "volume":
        return "text-purple-400";
      default:
        return "text-foreground";
    }
  };

  const dismissAlert = (alertId: string) => {
    setVisibleAlerts(prev => prev.filter(id => id !== alertId));
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    if (!visibleAlerts.includes(alert.id)) return false;
    if (activeTab === "all") return true;
    return alert.type === activeTab;
  });

  const handleCreateAlert = () => {
    // In a real app, this would make an API call
    console.log("Creating alert:", {
      symbol: newAlertSymbol,
      type: newAlertType,
      condition: newAlertCondition,
      value: newAlertValue,
      emailNotification
    });
    
    // Reset form
    setNewAlertSymbol("");
    setNewAlertValue("");
    setEmailNotification(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/30" data-testid="alerts-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="alerts-title">
              Alerts & Notifications
            </h1>
            <p className="text-muted-foreground">
              Stay informed with real-time market alerts and sentiment changes
            </p>
          </div>
          <Button data-testid="create-alert-button">
            <Plus className="w-4 h-4 mr-2" />
            Create Alert
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-6">
                  <CardTitle>Recent Alerts</CardTitle>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        activeTab === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveTab("all")}
                      data-testid="filter-all"
                    >
                      All
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        activeTab === "price" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveTab("price")}
                      data-testid="filter-price"
                    >
                      Price
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        activeTab === "sentiment" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveTab("sentiment")}
                      data-testid="filter-sentiment"
                    >
                      Sentiment
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded ${
                        activeTab === "news" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveTab("news")}
                      data-testid="filter-news"
                    >
                      News
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4" data-testid="alerts-list">
                  {filteredAlerts.map((alert) => {
                    const Icon = getAlertIcon(alert.type, alert.isPositive);
                    return (
                      <div
                        key={alert.id}
                        className={`p-4 border rounded-lg ${getAlertColor(alert.type, alert.isPositive)}`}
                        data-testid={`alert-${alert.id}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getAlertColor(alert.type, alert.isPositive)}`}>
                              <Icon className={`w-4 h-4 ${getIconColor(alert.type, alert.isPositive)}`} />
                            </div>
                            <div>
                              <div className={`font-medium ${getTitleColor(alert.type, alert.isPositive)}`}>
                                {alert.title}
                              </div>
                              <div className="text-sm text-muted-foreground">{alert.time}</div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:text-foreground"
                            onClick={() => dismissAlert(alert.id)}
                            data-testid={`dismiss-alert-${alert.id}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-sm mb-3">{alert.message}</div>
                        <div className="flex items-center space-x-4">
                          {alert.actionText && (
                            <Button
                              variant="link"
                              className="text-primary hover:underline text-sm p-0"
                              data-testid={`action-button-${alert.id}`}
                            >
                              {alert.actionText}
                            </Button>
                          )}
                          {alert.additionalInfo && (
                            <span className="text-xs text-muted-foreground">
                              {alert.additionalInfo}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alert Settings */}
          <div className="space-y-6">
            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3" data-testid="active-alerts-list">
                  {mockActiveAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                      data-testid={`active-alert-${alert.id}`}
                    >
                      <div>
                        <div className="font-medium text-sm">{alert.title}</div>
                        <div className="text-xs text-muted-foreground">{alert.condition}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-destructive"
                        data-testid={`delete-active-alert-${alert.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create New Alert */}
            <Card>
              <CardHeader>
                <CardTitle>Create Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" data-testid="create-alert-form">
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock Symbol</label>
                    <Input
                      type="text"
                      placeholder="e.g., TCS, HDFC"
                      value={newAlertSymbol}
                      onChange={(e) => setNewAlertSymbol(e.target.value)}
                      data-testid="input-stock-symbol"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Alert Type</label>
                    <Select value={newAlertType} onValueChange={setNewAlertType}>
                      <SelectTrigger data-testid="select-alert-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price Alert</SelectItem>
                        <SelectItem value="sentiment">Sentiment Alert</SelectItem>
                        <SelectItem value="volume">Volume Alert</SelectItem>
                        <SelectItem value="news">News Alert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Condition</label>
                    <div className="flex space-x-2">
                      <Select value={newAlertCondition} onValueChange={setNewAlertCondition}>
                        <SelectTrigger className="flex-1" data-testid="select-alert-condition">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="above">Above</SelectItem>
                          <SelectItem value="below">Below</SelectItem>
                          <SelectItem value="change">Change %</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Value"
                        className="flex-1"
                        value={newAlertValue}
                        onChange={(e) => setNewAlertValue(e.target.value)}
                        data-testid="input-alert-value"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email"
                      checked={emailNotification}
                      onCheckedChange={(checked) => setEmailNotification(checked as boolean)}
                      data-testid="checkbox-email-notification"
                    />
                    <label htmlFor="email" className="text-sm">
                      Email notification
                    </label>
                  </div>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handleCreateAlert}
                    data-testid="submit-create-alert"
                  >
                    Create Alert
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Alert Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="alert-stats">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Alerts</span>
                    <span className="font-medium" data-testid="stat-total-alerts">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Triggered Today</span>
                    <span className="font-medium" data-testid="stat-triggered-today">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="font-medium text-bullish" data-testid="stat-success-rate">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Stocks</span>
                    <span className="font-medium" data-testid="stat-active-stocks">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

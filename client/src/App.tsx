import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/layout/navigation";
import NotFound from "@/pages/not-found";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import StockDetail from "@/pages/stock-detail";
import Watchlist from "@/pages/watchlist";
import Alerts from "@/pages/alerts";
import Premium from "@/pages/premium";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Switch>
        <Route path="/" component={Onboarding} />
        <Route path="/onboarding" component={Onboarding} />
        <Route>
          <Navigation />
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/stock/:symbol" component={StockDetail} />
            <Route path="/watchlist" component={Watchlist} />
            <Route path="/alerts" component={Alerts} />
            <Route path="/premium" component={Premium} />
            <Route component={NotFound} />
          </Switch>
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

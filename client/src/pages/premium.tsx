import { Check, X, Target, Award, Brain, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "Forever",
    popular: false,
    features: [
      { text: "5 Watchlist stocks", included: true },
      { text: "Basic sentiment analysis", included: true },
      { text: "3 Price alerts", included: true },
      { text: "Daily market overview", included: true },
      { text: "Advanced charts", included: false },
      { text: "Backtesting", included: false },
    ],
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹999",
    period: "per month",
    popular: true,
    features: [
      { text: "50 Watchlist stocks", included: true },
      { text: "Advanced sentiment analysis", included: true },
      { text: "Unlimited alerts", included: true },
      { text: "Real-time market data", included: true },
      { text: "Advanced charting tools", included: true },
      { text: "Basic backtesting", included: true },
      { text: "Portfolio sync", included: true },
      { text: "AI strategy suggestions", included: false },
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
  },
  {
    id: "elite",
    name: "Elite",
    price: "₹1,999",
    period: "per month",
    popular: false,
    features: [
      { text: "Unlimited watchlist", included: true },
      { text: "AI-powered insights", included: true },
      { text: "Custom alerts & notifications", included: true },
      { text: "Premium market data", included: true },
      { text: "Advanced backtesting", included: true },
      { text: "AI strategy suggestions", included: true },
      { text: "Priority support", included: true },
      { text: "Long-term grading (A-F)", included: true },
    ],
    buttonText: "Upgrade to Elite",
    buttonVariant: "outline" as const,
  },
];

const premiumFeatures = [
  {
    icon: Target,
    title: "Advanced Backtesting",
    description: "Test your investment strategies using historical data and sentiment analysis. See how \"Buy when sentiment >70\" would have performed.",
    example: {
      label: "Sample Strategy: Sentiment-Based Trading",
      value: "Annual Return:",
      result: "+18.5%",
      resultColor: "text-bullish",
    },
  },
  {
    icon: Award,
    title: "Long-term Grading System",
    description: "Get comprehensive A-F grades for stocks based on fundamentals, sentiment, and market conditions.",
    example: {
      badges: [
        { text: "TCS: A", color: "bg-bullish/20 text-bullish" },
        { text: "HDFC: B+", color: "bg-neutral/20 text-neutral" },
        { text: "REL: C", color: "bg-yellow-500/20 text-yellow-400" },
      ],
    },
  },
  {
    icon: Brain,
    title: "AI Strategy Suggestions",
    description: "Get personalized investment suggestions based on your risk profile and market conditions.",
    example: {
      label: "Today's AI Suggestion:",
      suggestion: "\"Consider taking profits in IT sector as sentiment reaches oversold levels. Banking shows strong momentum.\"",
    },
  },
  {
    icon: Zap,
    title: "Unlimited Alerts",
    description: "Set unlimited price, sentiment, volume, and news alerts across your entire portfolio.",
    example: {
      stats: [
        { label: "Price Alerts", value: "Unlimited" },
        { label: "Sentiment Alerts", value: "Unlimited" },
        { label: "News Alerts", value: "Unlimited" },
      ],
    },
  },
];

export default function Premium() {
  return (
    <div className="min-h-screen p-4 md:p-8" data-testid="premium-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="premium-title">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-muted-foreground">
            Unlock advanced features and stay ahead of the market
          </p>
        </div>

        {/* Feature Comparison */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular ? "border-2 border-primary" : ""
              }`}
              data-testid={`plan-${plan.id}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="text-center mb-6">
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold mb-2" data-testid={`plan-price-${plan.id}`}>
                    {plan.price}
                  </div>
                  <div className="text-muted-foreground">{plan.period}</div>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2"
                      data-testid={`plan-feature-${plan.id}-${index}`}
                    >
                      {feature.included ? (
                        <Check className="w-4 h-4 text-bullish flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? "" : "text-muted-foreground"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={plan.buttonVariant}
                  className="w-full"
                  disabled={plan.id === "free"}
                  data-testid={`plan-button-${plan.id}`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Features Showcase */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {premiumFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} data-testid={`feature-showcase-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      
                      {feature.example && (
                        <div className="bg-muted/20 p-4 rounded-lg">
                          {/* Advanced Backtesting Example */}
                          {feature.example.label && feature.example.value && (
                            <>
                              <div className="text-sm text-muted-foreground mb-2">
                                {feature.example.label}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{feature.example.value}</span>
                                <span className={`font-medium ${feature.example.resultColor}`}>
                                  {feature.example.result}
                                </span>
                              </div>
                            </>
                          )}
                          
                          {/* Long-term Grading Example */}
                          {feature.example.badges && (
                            <div className="flex space-x-2">
                              {feature.example.badges.map((badge, badgeIndex) => (
                                <div
                                  key={badgeIndex}
                                  className={`px-3 py-2 rounded text-sm font-bold ${badge.color}`}
                                >
                                  {badge.text}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* AI Strategy Example */}
                          {feature.example.suggestion && (
                            <>
                              <div className="text-sm font-medium mb-2">
                                {feature.example.label}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {feature.example.suggestion}
                              </div>
                            </>
                          )}
                          
                          {/* Unlimited Alerts Example */}
                          {feature.example.stats && (
                            <div className="space-y-2">
                              {feature.example.stats.map((stat, statIndex) => (
                                <div key={statIndex} className="flex items-center justify-between text-sm">
                                  <span>{stat.label}</span>
                                  <span className="text-muted-foreground">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg p-8" data-testid="cta-section">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Ahead of Time?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of investors who trust Wyckoff for market insights
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="px-8 py-3" data-testid="start-trial-button">
              Start 7-Day Free Trial
            </Button>
            <Button variant="outline" className="px-8 py-3" data-testid="view-demo-button">
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

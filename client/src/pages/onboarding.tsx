import { useState } from "react";
import { useLocation } from "wouter";
import { Shield, BarChart2, Zap, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { InvestorType, Interest } from "../types";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [selectedType, setSelectedType] = useState<InvestorType>("balanced");
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(["fundamental", "pattern"]);

  const investorTypes = [
    {
      type: "conservative" as InvestorType,
      icon: Shield,
      title: "Conservative",
      description: "Low risk, steady returns",
      color: "blue",
    },
    {
      type: "balanced" as InvestorType,
      icon: BarChart2,
      title: "Balanced",
      description: "Moderate risk, balanced growth",
      color: "primary",
    },
    {
      type: "aggressive" as InvestorType,
      icon: Zap,
      title: "Aggressive",
      description: "High risk, high potential returns",
      color: "red",
    },
  ];

  const interests = [
    {
      id: "fundamental" as Interest,
      title: "Fundamental Analysis",
      description: "Company financials & metrics",
    },
    {
      id: "technical" as Interest,
      title: "Technical Analysis",
      description: "Charts & price patterns",
    },
    {
      id: "pattern" as Interest,
      title: "Pattern Recognition",
      description: "AI-powered market patterns",
    },
  ];

  const handleContinue = () => {
    // In a real app, this would save user preferences
    setLocation("/dashboard");
  };

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="welcome-title">
            Welcome to Wyckoff
          </h1>
          <p className="text-xl text-muted-foreground mb-2">Ahead of Time</p>
          <p className="text-muted-foreground">Let's personalize your investment experience</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6">Choose Your Investor Type</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {investorTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.type;
                
                return (
                  <button
                    key={type.type}
                    className={`p-6 border rounded-lg hover:border-primary hover:bg-primary/10 transition-all text-left ${
                      isSelected ? "border-primary bg-primary/10" : "border-border"
                    }`}
                    onClick={() => setSelectedType(type.type)}
                    data-testid={`investor-type-${type.type}`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      type.color === "blue" ? "bg-blue-500/20" :
                      type.color === "red" ? "bg-red-500/20" : "bg-primary/20"
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        type.color === "blue" ? "text-blue-400" :
                        type.color === "red" ? "text-red-400" : "text-primary"
                      }`} />
                    </div>
                    <h3 className="font-semibold mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </button>
                );
              })}
            </div>

            <h3 className="text-xl font-semibold mb-4">Select Your Interests</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {interests.map((interest) => (
                <label
                  key={interest.id}
                  className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`interest-${interest.id}`}
                >
                  <Checkbox
                    checked={selectedInterests.includes(interest.id)}
                    onCheckedChange={() => toggleInterest(interest.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div>
                    <span className="font-medium">{interest.title}</span>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <Button
              onClick={handleContinue}
              className="w-full"
              data-testid="continue-button"
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Link Your Brokerage Account</h3>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                Optional
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connect securely to sync your portfolio and get personalized insights
            </p>
            <Button
              variant="outline"
              className="w-full"
              data-testid="connect-brokerage-button"
            >
              <Link className="w-4 h-4 mr-2" />
              Connect with Plaid
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

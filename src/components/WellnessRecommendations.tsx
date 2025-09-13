import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Activity, Smile } from "lucide-react";

const RECOMMENDATIONS = {
  excellent: [
    {
      title: "Keep the momentum going",
      description: "You're feeling great! Share your positive energy with others.",
      action: "Practice gratitude",
      icon: Heart,
      category: "Mindfulness"
    },
    {
      title: "Celebrate your wins",
      description: "Take time to acknowledge what's going well in your life.",
      action: "Journal your achievements",
      icon: Smile,
      category: "Self-care"
    }
  ],
  good: [
    {
      title: "Maintain your routine",
      description: "You're doing well. Keep up with healthy habits that support you.",
      action: "Plan tomorrow",
      icon: Activity,
      category: "Planning"
    },
    {
      title: "Connect with others",
      description: "Reach out to friends or family for meaningful conversations.",
      action: "Schedule a call",
      icon: Heart,
      category: "Social"
    }
  ],
  neutral: [
    {
      title: "Try a mindfulness exercise",
      description: "Take 5 minutes for deep breathing or meditation.",
      action: "Start breathing exercise",
      icon: Brain,
      category: "Mindfulness"
    },
    {
      title: "Get some fresh air",
      description: "A short walk outside can help shift your perspective.",
      action: "Take a 10-minute walk",
      icon: Activity,
      category: "Movement"
    }
  ],
  low: [
    {
      title: "Practice self-compassion",
      description: "Be gentle with yourself. It's okay to have difficult days.",
      action: "Try self-compassion meditation",
      icon: Heart,
      category: "Self-care"
    },
    {
      title: "Reach out for support",
      description: "Consider talking to a trusted friend, family member, or counselor.",
      action: "Contact support",
      icon: Brain,
      category: "Support"
    }
  ],
  poor: [
    {
      title: "You're not alone",
      description: "Consider reaching out to a mental health professional or crisis helpline.",
      action: "Find resources",
      icon: Heart,
      category: "Crisis Support"
    },
    {
      title: "Focus on basics",
      description: "Prioritize sleep, nutrition, and staying hydrated today.",
      action: "Self-care checklist",
      icon: Activity,
      category: "Basics"
    }
  ]
};

interface WellnessRecommendationsProps {
  currentMood: string;
}

export const WellnessRecommendations = ({ currentMood }: WellnessRecommendationsProps) => {
  const recommendations = RECOMMENDATIONS[currentMood as keyof typeof RECOMMENDATIONS] || RECOMMENDATIONS.neutral;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Wellness Recommendations
        </CardTitle>
        <CardDescription>
          Personalized suggestions based on how you're feeling
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => {
          const IconComponent = rec.icon;
          return (
            <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">{rec.title}</h4>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {rec.category}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">{rec.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                {rec.action}
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
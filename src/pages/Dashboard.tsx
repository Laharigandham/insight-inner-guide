import { useState, useEffect } from "react";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";
import { MoodTrends } from "@/components/MoodTrends";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Brain, BarChart3, Calendar, Settings } from "lucide-react";

interface MoodEntry {
  value: number;
  label: string;
  emoji: string;
  notes: string;
  timestamp: string;
}

export default function Dashboard() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<string>("neutral");

  useEffect(() => {
    // Load mood history from localStorage
    const saved = localStorage.getItem("wellness-mood-history");
    if (saved) {
      const history = JSON.parse(saved);
      setMoodHistory(history);
      if (history.length > 0) {
        const latest = history[history.length - 1];
        setCurrentMood(latest.label.toLowerCase());
      }
    }
  }, []);

  const handleMoodSubmit = (moodData: MoodEntry) => {
    const updatedHistory = [...moodHistory, moodData];
    setMoodHistory(updatedHistory);
    setCurrentMood(moodData.label.toLowerCase());
    localStorage.setItem("wellness-mood-history", JSON.stringify(updatedHistory));
  };

  const todayCheckedIn = moodHistory.some(
    entry => new Date(entry.timestamp).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">StudentWell</h1>
                <p className="text-muted-foreground text-sm">Your mental health companion</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Welcome back! 👋
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a moment to check in with yourself and explore personalized wellness insights.
            Your mental health journey matters, and we're here to support you every step of the way.
          </p>
        </div>

        <Tabs defaultValue="checkin" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="checkin" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Check-in
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="wellness" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Wellness
            </TabsTrigger>
          </TabsList>

          <TabsContent value="checkin" className="space-y-6 mt-8">
            {!todayCheckedIn ? (
              <MoodCheckIn onMoodSubmit={handleMoodSubmit} />
            ) : (
              <Card className="shadow-wellness border-0 bg-gradient-secondary text-center">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="text-4xl">✅</div>
                    <h3 className="text-2xl font-semibold text-white">Check-in Complete!</h3>
                    <p className="text-white/80">
                      You've already checked in today. Come back tomorrow to continue tracking your wellness journey.
                    </p>
                    <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                      <Calendar className="h-4 w-4 mr-2" />
                      View My Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Your Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {moodHistory.length}
                    </div>
                    <p className="text-muted-foreground">Days tracked</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-secondary" />
                    Current Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="font-medium">Daily Self-Care</p>
                    <p className="text-muted-foreground text-sm">Building healthy habits</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-8">
            <MoodTrends moodHistory={moodHistory} />
          </TabsContent>

          <TabsContent value="wellness" className="mt-8">
            <WellnessRecommendations currentMood={currentMood} />
          </TabsContent>
        </Tabs>

        {/* Emergency Resources */}
        <Card className="shadow-card border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="text-warning">Crisis Support Resources</CardTitle>
            <CardDescription>
              If you're in crisis or having thoughts of self-harm, please reach out immediately
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Crisis Text Line</div>
                  <div className="text-sm text-muted-foreground">Text HOME to 741741</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">National Suicide Prevention Lifeline</div>
                  <div className="text-sm text-muted-foreground">Call 988</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
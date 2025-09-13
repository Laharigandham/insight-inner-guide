import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Calendar, Target } from "lucide-react";

interface MoodEntry {
  value: number;
  timestamp: string;
  label: string;
  emoji: string;
}

interface MoodTrendsProps {
  moodHistory: MoodEntry[];
}

export const MoodTrends = ({ moodHistory }: MoodTrendsProps) => {
  // Process data for charts
  const chartData = moodHistory.slice(-7).map((entry, index) => ({
    day: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
    mood: entry.value,
    label: entry.label,
    emoji: entry.emoji
  }));

  const averageMood = moodHistory.length > 0 
    ? (moodHistory.reduce((sum, entry) => sum + entry.value, 0) / moodHistory.length).toFixed(1)
    : 0;

  const weeklyAverage = chartData.length > 0
    ? (chartData.reduce((sum, day) => sum + day.mood, 0) / chartData.length).toFixed(1)
    : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border rounded-lg p-3 shadow-soft">
          <p className="font-medium">{label}</p>
          <p className="text-primary flex items-center gap-1">
            <span>{data.emoji}</span>
            <span>{data.label}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Average</p>
                <p className="text-2xl font-bold text-primary">{averageMood}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-secondary">{weeklyAverage}</p>
              </div>
              <Calendar className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Check-ins</p>
                <p className="text-2xl font-bold text-tertiary">{moodHistory.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-tertiary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mood Trend Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Weekly Mood Trend
          </CardTitle>
          <CardDescription>
            Your mood patterns over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis domain={[1, 5]} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Start tracking your mood to see trends here</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mood Distribution */}
      {moodHistory.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
            <CardDescription>
              How often you experience different mood levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: "Poor", value: moodHistory.filter(m => m.value === 1).length, fill: "hsl(var(--wellness-poor))" },
                { name: "Low", value: moodHistory.filter(m => m.value === 2).length, fill: "hsl(var(--wellness-low))" },
                { name: "Neutral", value: moodHistory.filter(m => m.value === 3).length, fill: "hsl(var(--wellness-neutral))" },
                { name: "Good", value: moodHistory.filter(m => m.value === 4).length, fill: "hsl(var(--wellness-good))" },
                { name: "Excellent", value: moodHistory.filter(m => m.value === 5).length, fill: "hsl(var(--wellness-excellent))" },
              ]}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
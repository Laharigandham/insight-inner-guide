import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MOOD_OPTIONS = [
  { emoji: "😄", label: "Excellent", value: 5, color: "wellness-excellent" },
  { emoji: "😊", label: "Good", value: 4, color: "wellness-good" },
  { emoji: "😐", label: "Neutral", value: 3, color: "wellness-neutral" },
  { emoji: "😕", label: "Low", value: 2, color: "wellness-low" },
  { emoji: "😢", label: "Poor", value: 1, color: "wellness-poor" },
];

export const MoodCheckIn = ({ onMoodSubmit }: { onMoodSubmit: (mood: any) => void }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedMood === null) return;
    
    const moodData = {
      value: selectedMood,
      label: MOOD_OPTIONS.find(m => m.value === selectedMood)?.label,
      emoji: MOOD_OPTIONS.find(m => m.value === selectedMood)?.emoji,
      notes,
      timestamp: new Date().toISOString(),
    };
    
    onMoodSubmit(moodData);
    setSelectedMood(null);
    setNotes("");
    
    toast({
      title: "Mood recorded",
      description: "Your daily check-in has been saved. Keep taking care of yourself! 💙",
    });
  };

  return (
    <Card className="shadow-wellness border-0 bg-gradient-wellness">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold text-white">How are you feeling today?</CardTitle>
        <CardDescription className="text-white/80">
          Take a moment to check in with yourself
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`
                flex flex-col items-center p-4 rounded-xl transition-all duration-300 
                hover:scale-105 hover:shadow-soft border-2
                ${
                  selectedMood === mood.value
                    ? "border-white bg-white/20 scale-105"
                    : "border-white/20 bg-white/10"
                }
              `}
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className="text-white text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-3">
          <label className="text-white font-medium">Any thoughts to share? (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 resize-none"
            rows={3}
          />
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="w-full bg-white text-primary hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Record My Mood
        </Button>
      </CardContent>
    </Card>
  );
};
import React, { useState, useEffect } from "react";
import { AppView } from "./types";
import type { MoodEntry } from "./types";
import { Layout } from "./components/layout";
import { ChatInterface } from "./components/chatInterface";
import { MoodTracker } from "./components/moodTracker";
import { WellnessExercises } from "./components/wellnessExercises";
import { Resources } from "./components/Resources";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  // Initialize some mock data for the chart if empty
  useEffect(() => {
    const savedMoods = localStorage.getItem("serenity_moods");
    if (savedMoods) {
      setMoods(JSON.parse(savedMoods));
    } else {
      // Mock historical data for visual appeal on first load
      const mockMoods: MoodEntry[] = [
        {
          date: new Date(Date.now() - 5 * 86400000).toISOString(),
          score: 4,
          label: "Meh",
        },
        {
          date: new Date(Date.now() - 4 * 86400000).toISOString(),
          score: 5,
          label: "Steady",
        },
        {
          date: new Date(Date.now() - 3 * 86400000).toISOString(),
          score: 7,
          label: "Happy",
        },
        {
          date: new Date(Date.now() - 2 * 86400000).toISOString(),
          score: 6,
          label: "Good",
        },
        {
          date: new Date(Date.now() - 1 * 86400000).toISOString(),
          score: 8,
          label: "Joyful",
        },
      ];
      setMoods(mockMoods);
      localStorage.setItem("serenity_moods", JSON.stringify(mockMoods));
    }
  }, []);

  const handleAddMood = (entry: MoodEntry) => {
    const updatedMoods = [...moods, entry];
    setMoods(updatedMoods);
    localStorage.setItem("serenity_moods", JSON.stringify(updatedMoods));
  };

  const renderView = () => {
    switch (activeView) {
      case AppView.CHAT:
        return <ChatInterface />;
      case AppView.MOOD:
        return <MoodTracker moods={moods} onAddMood={handleAddMood} />;
      case AppView.WELLNESS:
        return <WellnessExercises />;
      case AppView.RESOURCES:
        return <Resources />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;

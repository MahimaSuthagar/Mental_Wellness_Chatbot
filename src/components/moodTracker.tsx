import React, { useState } from "react";
import type { MoodEntry } from "../types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface MoodTrackerProps {
  moods: MoodEntry[];
  onAddMood: (entry: MoodEntry) => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({
  moods,
  onAddMood,
}) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const moodEmojis = [
    { score: 1, label: "Very Sad", emoji: "😢" },
    { score: 2, label: "Sad", emoji: "☹️" },
    { score: 3, label: "Low", emoji: "😔" },
    { score: 4, label: "Meh", emoji: "😐" },
    { score: 5, label: "Steady", emoji: "🙂" },
    { score: 6, label: "Good", emoji: "😊" },
    { score: 7, label: "Happy", emoji: "😄" },
    { score: 8, label: "Joyful", emoji: "✨" },
    { score: 9, label: "Radiant", emoji: "🌟" },
    { score: 10, label: "Amazing", emoji: "💖" },
  ];

  const handleSaveMood = () => {
    if (selectedScore === null) return;
    const entry: MoodEntry = {
      date: new Date().toISOString(),
      score: selectedScore,
      label: moodEmojis.find((m) => m.score === selectedScore)?.label || "",
      note: note.trim(),
    };
    onAddMood(entry);
    setSelectedScore(null);
    setNote("");
  };

  const chartData = moods.slice(-7).map((m) => ({
    date: new Date(m.date).toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    score: m.score,
    label: m.label,
  }));

  return (
    <div className="p-4 md:p-12 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <section>
        <header className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-slate-800">
            How are you today?
          </h2>
          <p className="text-slate-500">
            Take a moment to check in with yourself.
          </p>
        </header>

        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-8">
            {moodEmojis.map((m) => (
              <button
                key={m.score}
                onClick={() => setSelectedScore(m.score)}
                className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                  selectedScore === m.score
                    ? "bg-teal-600 text-white scale-110 shadow-lg shadow-teal-100"
                    : "bg-slate-50 hover:bg-teal-50 text-slate-600"
                }`}
              >
                <span className="text-2xl mb-1">{m.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">
                  {m.label}
                </span>
              </button>
            ))}
          </div>

          {selectedScore && (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <textarea
                placeholder="Optional: What's on your mind?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none text-sm"
                rows={3}
              />
              <button
                onClick={handleSaveMood}
                className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-md shadow-teal-100"
              >
                Save Daily Check-in
              </button>
            </div>
          )}
        </div>
      </section>

      {moods.length > 0 && (
        <section>
          <header className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-slate-800">
              Mood Trends
            </h2>
            <p className="text-slate-500">
              Your emotional journey over the past 7 entries.
            </p>
          </header>

          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  dy={10}
                />
                <YAxis
                  domain={[0, 10]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#0d9488", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#0d9488"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  dot={{
                    r: 6,
                    fill: "#0d9488",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}
    </div>
  );
};

export enum AppView {
  CHAT = "chat",
  MOOD = "mood",
  WELLNESS = "wellness",
  RESOURCES = "resources",
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: number;
}

export interface MoodEntry {
  date: string; // ISO string
  score: number; // 1-10
  label: string;
  note?: string;
}

export interface UserState {
  moods: MoodEntry[];
}

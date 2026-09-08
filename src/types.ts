export interface Game {
  id: string;
  title: string;
  image: string;
  category: string;
  categories: string[];
  platform: string;
  version: string;
  updated: string;
  buttonText: string;
  description: string;
  rating: number;
  downloads: string;
  size: string;
  features: string[];
}

export type CategoryFilter = 
  | "All"
  | "Action"
  | "Racing"
  | "Simulation"
  | "Casual"
  | "Adventure"
  | "Multiplayer";

export interface CPAConfig {
  lockerUrl: string;
  trackingEnabled: boolean;
  trackingParameter: string;
}

export interface NotificationItem {
  id: string;
  username: string;
  gameTitle: string;
  gameImage: string;
  timestamp: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
